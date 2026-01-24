import Link from 'next/link';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { deletePost } from '@/app/admin/actions/blog';

export const dynamic = 'force-dynamic';

// Helper component for Delete Button to use Server Action
function DeleteButton({ id }) {
    return (
        <form action={async () => {
            'use server';
            await deletePost(id);
        }}>
            <button
                type="submit"
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                title="Delete"
            // Simple client-side confirm hook can be added if we make this a client component, 
            // but for now relying on form submission or we can enhance later.
            // Actually, for better UX let's stick to standard form submission.
            >
                <Trash2 size={18} />
            </button>
        </form>
    )
}

export default async function BlogIndexPage() {
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

    const { data: posts, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('updated_at', { ascending: false });

    if (error) {
        return <div className="text-red-500">Error loading posts: {error.message}</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Blog Posts</h1>
                    <p className="text-gray-500 mt-2">Manage your blog content and publications.</p>
                </div>
                <Link
                    href="/admin/blog/new"
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <Plus size={18} />
                    <span>New Post</span>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {posts?.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="inline-flex items-center justify-center p-4 bg-gray-50 rounded-full mb-4">
                            <EyeOff className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No posts found</h3>
                        <p className="mt-1 text-gray-500">Get started by creating your first blog post.</p>
                        <div className="mt-6">
                            <Link
                                href="/admin/blog/new"
                                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-500 font-medium"
                            >
                                Create new post &rarr;
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {posts.map((post) => (
                                    <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-gray-900">{post.title}</span>
                                                <span className="text-xs text-gray-500 max-w-md truncate">/{post.slug}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {post.published ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    Published
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                    Draft
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {post.category || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(post.updated_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/blog/${post.id}/edit`}
                                                    className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit size={18} />
                                                </Link>
                                                <DeleteButton id={post.id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
