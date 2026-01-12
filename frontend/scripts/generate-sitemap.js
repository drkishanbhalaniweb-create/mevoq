const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Try to load .env file
try {
    require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
} catch (e) {
    // dotenv might not be installed or needed if env vars are present
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY;

const BASE_URL = 'https://maglinc.vercel.app';
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const SITEMAP_PATH = path.join(PUBLIC_DIR, 'sitemap.xml');

// Static routes configuration
const STATIC_ROUTES = [
    { loc: '/', changefreq: 'weekly', priority: '1.0' },
    { loc: '/about', changefreq: 'monthly', priority: '0.8' },
    { loc: '/services', changefreq: 'monthly', priority: '0.9' },
    { loc: '/blog', changefreq: 'daily', priority: '0.9' },
    { loc: '/contact', changefreq: 'monthly', priority: '0.7' }
];

async function generateSitemap() {
    console.log('Generatig sitemap...');

    let blogPosts = [];

    // 1. Fetch data from Supabase if credentials exist
    if (SUPABASE_URL && SUPABASE_KEY) {
        try {
            const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

            const { data, error } = await supabase
                .from('blog_posts')
                .select('slug, created_at, updated_at') // Requesting updated_at as well, will fallback if missing
                .eq('published', true);

            if (error) {
                console.warn('Warning: Failed to fetch blog posts from Supabase:', error.message);
            } else {
                blogPosts = data || [];
                console.log(`Found ${blogPosts.length} published blog posts.`);
            }
        } catch (err) {
            console.warn('Warning: Error connecting to Supabase:', err.message);
        }
    } else {
        console.warn('Warning: Supabase credentials not found. Generating static sitemap only.');
    }

    // 2. Build XML content
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
    const urlSetStart = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    const urlSetEnd = '</urlset>';

    const today = new Date().toISOString().split('T')[0];

    const staticUrls = STATIC_ROUTES.map(route => `
  <url>
    <loc>${BASE_URL}${route.loc === '/' ? '' : route.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('');

    const dynamicUrls = blogPosts.map(post => {
        // Use updated_at if available, otherwise created_at, otherwise today
        const dateStr = post.updated_at || post.created_at || today;
        const lastmod = dateStr.split('T')[0];
        return `
  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    }).join('');

    const sitemapContent = `${xmlHeader}
${urlSetStart}${staticUrls}${dynamicUrls}
${urlSetEnd}`;

    // 3. Write to file
    try {
        fs.writeFileSync(SITEMAP_PATH, sitemapContent);
        console.log(`✅ Sitemap generated successfully at ${SITEMAP_PATH}`);
    } catch (err) {
        console.error('Error writing sitemap file:', err);
        process.exit(1);
    }
}

generateSitemap();
