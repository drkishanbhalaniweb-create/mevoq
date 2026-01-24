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

export async function createTestimonial(prevState, formData) {
    const supabase = await createSupabaseServerClient();

    // Check auth
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: 'Unauthorized' };
    }

    const name = formData.get('name');
    const role = formData.get('role');
    const company = formData.get('company');
    const content = formData.get('content');
    const avatar_url = formData.get('avatar_url');

    // Basic validation
    if (!name || !content) {
        return { error: 'Name and Content are required.' };
    }

    const payload = {
        id: crypto.randomUUID(),
        name,
        role,
        company,
        content,
        avatar_url,
        created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('testimonials').insert([payload]);

    if (error) {
        console.error('Create Testimonial Error:', error);
        return { error: error.message };
    }

    revalidatePath('/admin/testimonials');
    revalidatePath('/'); // Assumption: testimonials might be on home page
    redirect('/admin/testimonials');
}

export async function updateTestimonial(prevState, formData) {
    const supabase = await createSupabaseServerClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: 'Unauthorized' };
    }

    const id = formData.get('id');
    if (!id) return { error: 'Missing testimonial ID' };

    const name = formData.get('name');
    const role = formData.get('role');
    const company = formData.get('company');
    const content = formData.get('content');
    const avatar_url = formData.get('avatar_url');

    const payload = {
        name,
        role,
        company,
        content,
        avatar_url,
    };

    const { error } = await supabase
        .from('testimonials')
        .update(payload)
        .eq('id', id);

    if (error) {
        console.error('Update Testimonial Error:', error);
        return { error: error.message };
    }

    revalidatePath('/admin/testimonials');
    revalidatePath('/');
    redirect('/admin/testimonials');
}

export async function deleteTestimonial(id) {
    const supabase = await createSupabaseServerClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Unauthorized' };

    const { error } = await supabase.from('testimonials').delete().eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin/testimonials');
    revalidatePath('/');
}
