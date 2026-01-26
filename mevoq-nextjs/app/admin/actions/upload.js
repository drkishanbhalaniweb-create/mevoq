'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

async function createSupabaseServerClient() {
    const cookieStore = await cookies();
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        );
                    } catch {
                        // The `setAll` method was called from a Server Component.
                    }
                },
            },
        }
    );
}

/**
 * Upload an image to Supabase storage
 * Used by the RichTextEditor for inline content images
 * 
 * @param {FormData} formData - FormData with 'file' field
 * @returns {Promise<{url?: string, error?: string}>}
 */
export async function uploadContentImage(formData) {
    const supabase = await createSupabaseServerClient();

    // Check auth
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Unauthorized' };

    const file = formData.get('file');
    if (!file) return { error: 'No file provided' };

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
        return { error: 'Invalid file type. Allowed: JPG, PNG, GIF, WebP' };
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
        return { error: 'File too large. Maximum size is 10MB' };
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `content/${Date.now()}_${Math.random().toString(36).substring(2, 10)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
        });

    if (uploadError) {
        console.error('Upload Error:', uploadError);
        return { error: 'Failed to upload image' };
    }

    const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName);

    return { url: publicUrl };
}
