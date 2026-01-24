import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import BlogForm from '@/components/admin/BlogForm';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditBlogPage({ params }) {
    const { id } = await params;
    const cookieStore = await cookies();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
            },
        }
    );

    const { data: post, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !post) {
        if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
            console.error('Fetch post error:', error);
        }
        return notFound();
    }

    return (
        <div className="max-w-7xl mx-auto">
            <BlogForm post={post} />
        </div>
    );
}
