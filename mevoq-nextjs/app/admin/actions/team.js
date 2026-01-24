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

export async function createMember(prevState, formData) {
    const supabase = await createSupabaseServerClient();

    // Check auth
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: 'Unauthorized' };
    }

    const name = formData.get('name');
    const role = formData.get('role');
    const bio = formData.get('bio');
    const avatar_url = formData.get('avatar_url');
    const expertiseString = formData.get('expertise');

    // Basic validation
    if (!name || !role) {
        return { error: 'Name and Role are required.' };
    }

    const expertise = expertiseString
        ? expertiseString.split('\n').map(item => item.trim()).filter(item => item.length > 0)
        : [];

    const payload = {
        id: crypto.randomUUID(),
        name,
        role,
        bio,
        avatar_url,
        expertise,
        created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('team').insert([payload]);

    if (error) {
        console.error('Create Member Error:', error);
        return { error: error.message };
    }

    revalidatePath('/admin/team');
    revalidatePath('/about'); // Team is usually on About page
    redirect('/admin/team');
}

export async function updateMember(prevState, formData) {
    const supabase = await createSupabaseServerClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: 'Unauthorized' };
    }

    const id = formData.get('id');
    if (!id) return { error: 'Missing member ID' };

    const name = formData.get('name');
    const role = formData.get('role');
    const bio = formData.get('bio');
    const avatar_url = formData.get('avatar_url');
    const expertiseString = formData.get('expertise');

    const expertise = expertiseString
        ? expertiseString.split('\n').map(item => item.trim()).filter(item => item.length > 0)
        : [];

    const payload = {
        name,
        role,
        bio,
        avatar_url,
        expertise,
    };

    const { error } = await supabase
        .from('team')
        .update(payload)
        .eq('id', id);

    if (error) {
        console.error('Update Member Error:', error);
        return { error: error.message };
    }

    revalidatePath('/admin/team');
    revalidatePath('/about');
    redirect('/admin/team');
}

export async function deleteMember(id) {
    const supabase = await createSupabaseServerClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Unauthorized' };

    const { error } = await supabase.from('team').delete().eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin/team');
    revalidatePath('/about');
}
