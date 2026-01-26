/**
 * Migration Script: Convert Plain Text Content to HTML
 * 
 * This script migrates existing blog post content from plain text
 * to semantic HTML format compatible with the new Tiptap rich text editor.
 * 
 * Usage: node scripts/migrate-content-to-html.mjs
 * 
 * Prerequisites:
 * - Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables
 * - Or ensure .env.local file exists with these values
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load environment variables from .env.local
function loadEnv() {
    try {
        const envPath = resolve(__dirname, '../.env.local');
        const envContent = readFileSync(envPath, 'utf-8');
        const lines = envContent.split('\n');

        for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#')) {
                const [key, ...valueParts] = trimmed.split('=');
                const value = valueParts.join('=').trim();
                if (key && value) {
                    process.env[key.trim()] = value;
                }
            }
        }
    } catch (error) {
        console.log('Note: Could not load .env.local, using existing env variables');
    }
}

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: Missing Supabase credentials');
    console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Escape HTML special characters to prevent XSS
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Check if content is already HTML
 */
function isHtml(content) {
    if (!content) return false;
    // Check for common HTML tags
    const htmlPattern = /<(p|h[1-6]|div|span|ul|ol|li|strong|em|a|img|blockquote)[^>]*>/i;
    return htmlPattern.test(content);
}

/**
 * Convert plain text to semantic HTML
 * - Double newlines become paragraph breaks
 * - Single newlines become <br> tags within paragraphs
 * - Lines starting with # become headings
 */
function convertToHtml(plainText) {
    if (!plainText || typeof plainText !== 'string') {
        return '';
    }

    // If already HTML, return as-is
    if (isHtml(plainText)) {
        console.log('  → Content is already HTML, skipping conversion');
        return plainText;
    }

    // Split by double newlines to get paragraphs
    const paragraphs = plainText.split(/\n\n+/);

    const htmlParts = paragraphs
        .filter(p => p.trim())
        .map(paragraph => {
            const trimmed = paragraph.trim();

            // Check for heading patterns (Markdown-style)
            if (trimmed.startsWith('### ')) {
                return `<h3>${escapeHtml(trimmed.slice(4))}</h3>`;
            }
            if (trimmed.startsWith('## ')) {
                return `<h2>${escapeHtml(trimmed.slice(3))}</h2>`;
            }
            if (trimmed.startsWith('# ')) {
                return `<h1>${escapeHtml(trimmed.slice(2))}</h1>`;
            }

            // Check for list items
            const lines = trimmed.split('\n');
            const isBulletList = lines.every(line => /^[-*]\s/.test(line.trim()) || line.trim() === '');
            const isNumberedList = lines.every(line => /^\d+\.\s/.test(line.trim()) || line.trim() === '');

            if (isBulletList && lines.some(line => line.trim())) {
                const items = lines
                    .filter(line => line.trim())
                    .map(line => `<li>${escapeHtml(line.replace(/^[-*]\s*/, ''))}</li>`)
                    .join('');
                return `<ul>${items}</ul>`;
            }

            if (isNumberedList && lines.some(line => line.trim())) {
                const items = lines
                    .filter(line => line.trim())
                    .map(line => `<li>${escapeHtml(line.replace(/^\d+\.\s*/, ''))}</li>`)
                    .join('');
                return `<ol>${items}</ol>`;
            }

            // Regular paragraph - preserve single line breaks as <br>
            const content = trimmed
                .split('\n')
                .map(line => escapeHtml(line.trim()))
                .join('<br>');

            return `<p>${content}</p>`;
        });

    return htmlParts.join('\n');
}

/**
 * Migrate all blog posts
 */
async function migrateBlogPosts() {
    console.log('\n📝 Migrating blog_posts...');

    const { data: posts, error } = await supabase
        .from('blog_posts')
        .select('id, title, content');

    if (error) {
        console.error('Error fetching blog posts:', error.message);
        return { migrated: 0, skipped: 0, failed: 0 };
    }

    if (!posts || posts.length === 0) {
        console.log('  No blog posts found');
        return { migrated: 0, skipped: 0, failed: 0 };
    }

    console.log(`  Found ${posts.length} posts`);

    let migrated = 0;
    let skipped = 0;
    let failed = 0;

    for (const post of posts) {
        console.log(`\n  Processing: "${post.title}" (${post.id})`);

        if (!post.content) {
            console.log('  → No content, skipping');
            skipped++;
            continue;
        }

        if (isHtml(post.content)) {
            console.log('  → Already HTML, skipping');
            skipped++;
            continue;
        }

        const htmlContent = convertToHtml(post.content);

        const { error: updateError } = await supabase
            .from('blog_posts')
            .update({ content: htmlContent })
            .eq('id', post.id);

        if (updateError) {
            console.error(`  ❌ Failed to update: ${updateError.message}`);
            failed++;
        } else {
            console.log('  ✅ Migrated successfully');
            migrated++;
        }
    }

    return { migrated, skipped, failed };
}

/**
 * Migrate services (description and case_study_snippet)
 */
async function migrateServices() {
    console.log('\n🔧 Migrating services...');

    const { data: services, error } = await supabase
        .from('services')
        .select('id, title, description, case_study_snippet');

    if (error) {
        console.error('Error fetching services:', error.message);
        return { migrated: 0, skipped: 0, failed: 0 };
    }

    if (!services || services.length === 0) {
        console.log('  No services found');
        return { migrated: 0, skipped: 0, failed: 0 };
    }

    console.log(`  Found ${services.length} services`);

    let migrated = 0;
    let skipped = 0;
    let failed = 0;

    for (const service of services) {
        console.log(`\n  Processing: "${service.title}" (${service.id})`);

        const updates = {};
        let needsUpdate = false;

        if (service.description && !isHtml(service.description)) {
            updates.description = convertToHtml(service.description);
            needsUpdate = true;
        }

        if (service.case_study_snippet && !isHtml(service.case_study_snippet)) {
            updates.case_study_snippet = convertToHtml(service.case_study_snippet);
            needsUpdate = true;
        }

        if (!needsUpdate) {
            console.log('  → Already HTML or empty, skipping');
            skipped++;
            continue;
        }

        const { error: updateError } = await supabase
            .from('services')
            .update(updates)
            .eq('id', service.id);

        if (updateError) {
            console.error(`  ❌ Failed to update: ${updateError.message}`);
            failed++;
        } else {
            console.log('  ✅ Migrated successfully');
            migrated++;
        }
    }

    return { migrated, skipped, failed };
}

/**
 * Migrate team members (bio)
 */
async function migrateTeamMembers() {
    console.log('\n👥 Migrating team_members...');

    const { data: members, error } = await supabase
        .from('team_members')
        .select('id, name, bio');

    if (error) {
        console.error('Error fetching team members:', error.message);
        return { migrated: 0, skipped: 0, failed: 0 };
    }

    if (!members || members.length === 0) {
        console.log('  No team members found');
        return { migrated: 0, skipped: 0, failed: 0 };
    }

    console.log(`  Found ${members.length} team members`);

    let migrated = 0;
    let skipped = 0;
    let failed = 0;

    for (const member of members) {
        console.log(`\n  Processing: "${member.name}" (${member.id})`);

        if (!member.bio || isHtml(member.bio)) {
            console.log('  → Already HTML or empty, skipping');
            skipped++;
            continue;
        }

        const htmlBio = convertToHtml(member.bio);

        const { error: updateError } = await supabase
            .from('team_members')
            .update({ bio: htmlBio })
            .eq('id', member.id);

        if (updateError) {
            console.error(`  ❌ Failed to update: ${updateError.message}`);
            failed++;
        } else {
            console.log('  ✅ Migrated successfully');
            migrated++;
        }
    }

    return { migrated, skipped, failed };
}

/**
 * Migrate testimonials (content)
 */
async function migrateTestimonials() {
    console.log('\n💬 Migrating testimonials...');

    const { data: testimonials, error } = await supabase
        .from('testimonials')
        .select('id, name, content');

    if (error) {
        console.error('Error fetching testimonials:', error.message);
        return { migrated: 0, skipped: 0, failed: 0 };
    }

    if (!testimonials || testimonials.length === 0) {
        console.log('  No testimonials found');
        return { migrated: 0, skipped: 0, failed: 0 };
    }

    console.log(`  Found ${testimonials.length} testimonials`);

    let migrated = 0;
    let skipped = 0;
    let failed = 0;

    for (const testimonial of testimonials) {
        console.log(`\n  Processing: "${testimonial.name}" (${testimonial.id})`);

        if (!testimonial.content || isHtml(testimonial.content)) {
            console.log('  → Already HTML or empty, skipping');
            skipped++;
            continue;
        }

        const htmlContent = convertToHtml(testimonial.content);

        const { error: updateError } = await supabase
            .from('testimonials')
            .update({ content: htmlContent })
            .eq('id', testimonial.id);

        if (updateError) {
            console.error(`  ❌ Failed to update: ${updateError.message}`);
            failed++;
        } else {
            console.log('  ✅ Migrated successfully');
            migrated++;
        }
    }

    return { migrated, skipped, failed };
}

/**
 * Main migration function
 */
async function main() {
    console.log('═══════════════════════════════════════════════════════════');
    console.log('       Content Migration: Plain Text → Semantic HTML        ');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`\nConnecting to: ${supabaseUrl}`);

    const results = {
        blogPosts: await migrateBlogPosts(),
        services: await migrateServices(),
        teamMembers: await migrateTeamMembers(),
        testimonials: await migrateTestimonials()
    };

    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('                     MIGRATION SUMMARY                       ');
    console.log('═══════════════════════════════════════════════════════════');

    let totalMigrated = 0;
    let totalSkipped = 0;
    let totalFailed = 0;

    for (const [table, result] of Object.entries(results)) {
        console.log(`\n${table}:`);
        console.log(`  ✅ Migrated: ${result.migrated}`);
        console.log(`  ⏭️  Skipped:  ${result.skipped}`);
        console.log(`  ❌ Failed:   ${result.failed}`);

        totalMigrated += result.migrated;
        totalSkipped += result.skipped;
        totalFailed += result.failed;
    }

    console.log('\n───────────────────────────────────────────────────────────');
    console.log(`TOTAL: ${totalMigrated} migrated, ${totalSkipped} skipped, ${totalFailed} failed`);
    console.log('═══════════════════════════════════════════════════════════\n');

    if (totalFailed > 0) {
        console.log('⚠️  Some migrations failed. Please check the errors above.');
        process.exit(1);
    }

    console.log('✅ Migration completed successfully!\n');
}

main().catch(console.error);
