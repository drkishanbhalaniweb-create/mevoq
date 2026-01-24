'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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

// New Server Action for independent image upload
export async function uploadImage(formData) {
    const supabase = await createSupabaseServerClient();

    // Check auth
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Unauthorized' };

    const file = formData.get('file');
    if (!file) return { error: 'No file provided' };

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

    if (uploadError) {
        console.error('Upload Error:', uploadError);
        return { error: 'Failed to upload image' };
    }

    const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

    return { url: publicUrl };
}

export async function createPost(prevState, formData) {
    const supabase = await createSupabaseServerClient();

    // Check auth
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: 'Unauthorized' };
    }

    const title = formData.get('title');
    const slug = formData.get('slug');
    const excerpt = formData.get('excerpt');
    const content = formData.get('content');
    const category = formData.get('category');
    const featured_image = formData.get('featured_image');
    // Checkbox returns 'on' if checked, or nothing if unchecked. 
    // We can also rely on client sending 'true'/'false' string if we control it via hidden input,
    // but simpler for FormData is often checking existence or explicit value.
    // Client side is currently sending 'true' string via JS, so we parse it.
    const published = formData.get('published') === 'true';
    const tagsString = formData.get('tags');

    // Basic validation
    if (!title || !slug || !content) {
        return { error: 'Missing required fields' };
    }

    const tags = tagsString
        ? tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        : [];

    const payload = {
        id: crypto.randomUUID(),
        title,
        slug,
        excerpt,
        content,
        category,
        featured_image,
        published,
        tags,
        author: user.email,
        created_at: new Date().toISOString(),
        published_at: published ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('blog_posts').insert([payload]);

    if (error) {
        console.error('Create Post Error:', error);
        return { error: error.message };
    }

    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    redirect('/admin/blog');
}

export async function updatePost(prevState, formData) {
    const supabase = await createSupabaseServerClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: 'Unauthorized' };
    }

    const id = formData.get('id');
    if (!id) return { error: 'Missing post ID' };

    const title = formData.get('title');
    const slug = formData.get('slug');
    const excerpt = formData.get('excerpt');
    const content = formData.get('content');
    const category = formData.get('category');
    const featured_image = formData.get('featured_image');
    const published = formData.get('published') === 'true';
    const tagsString = formData.get('tags');

    const tags = tagsString
        ? tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        : [];

    const payload = {
        title,
        slug,
        excerpt,
        content,
        category,
        featured_image,
        published,
        tags,
        updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
        .from('blog_posts')
        .update(payload)
        .eq('id', id);

    if (error) {
        console.error('Update Post Error:', error);
        return { error: error.message };
    }

    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
    redirect('/admin/blog');
}

export async function deletePost(id) {
    const supabase = await createSupabaseServerClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Unauthorized' };

    const { error } = await supabase.from('blog_posts').delete().eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin/blog');
    revalidatePath('/blog');
}
