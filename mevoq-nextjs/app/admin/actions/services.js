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

export async function createService(prevState, formData) {
    const supabase = await createSupabaseServerClient();

    // Check auth
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: 'Unauthorized' };
    }

    const title = formData.get('title');
    const description = formData.get('description');
    const icon = formData.get('icon');
    const case_study_snippet = formData.get('case_study_snippet');
    const featuresString = formData.get('features'); // Expecting newline separated string

    // Basic validation
    if (!title || !description || !icon) {
        return { error: 'Missing required fields' };
    }

    const features = featuresString
        ? featuresString.split('\n').map(f => f.trim()).filter(f => f.length > 0)
        : [];

    const slug = formData.get('slug');
    const content = formData.get('content');
    const featured_image = formData.get('featured_image');

    const payload = {
        id: crypto.randomUUID(),
        title,
        description,
        slug,
        content,
        featured_image,
        icon,
        case_study_snippet,
        features,
        created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('services').insert([payload]);

    if (error) {
        console.error('Create Service Error:', error);
        return { error: error.message };
    }

    revalidatePath('/admin/services');
    revalidatePath('/services');
    redirect('/admin/services');
}

export async function updateService(prevState, formData) {
    const supabase = await createSupabaseServerClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: 'Unauthorized' };
    }

    const id = formData.get('id');
    if (!id) return { error: 'Missing service ID' };

    const title = formData.get('title');
    const description = formData.get('description');
    const icon = formData.get('icon');
    const case_study_snippet = formData.get('case_study_snippet');
    const featuresString = formData.get('features');

    const features = featuresString
        ? featuresString.split('\n').map(f => f.trim()).filter(f => f.length > 0)
        : [];

    const slug = formData.get('slug');
    const content = formData.get('content');
    const featured_image = formData.get('featured_image');

    const payload = {
        title,
        description,
        slug,
        content,
        featured_image,
        icon,
        case_study_snippet,
        features,
    };

    const { error } = await supabase
        .from('services')
        .update(payload)
        .eq('id', id);

    if (error) {
        console.error('Update Service Error:', error);
        return { error: error.message };
    }

    revalidatePath('/admin/services');
    revalidatePath('/services');
    redirect('/admin/services');
}

export async function deleteService(id) {
    const supabase = await createSupabaseServerClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Unauthorized' };

    const { error } = await supabase.from('services').delete().eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin/services');
    revalidatePath('/services');
}
