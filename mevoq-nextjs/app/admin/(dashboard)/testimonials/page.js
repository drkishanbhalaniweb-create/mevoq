import Link from 'next/link';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Plus, Edit, Trash2, EyeOff, Quote } from 'lucide-react';
import { deleteTestimonial } from '@/app/admin/actions/testimonials';

export const dynamic = 'force-dynamic';

function DeleteButton({ id }) {
    return (
        <form action={async () => {
            'use server';
            await deleteTestimonial(id);
        }}>
            <button
                type="submit"
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                title="Delete"
            >
                <Trash2 size={18} />
            </button>
        </form>
    )
}

export default async function TestimonialsIndexPage() {
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

    const { data: testimonials, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        return <div className="text-red-500">Error loading testimonials: {error.message}</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Testimonials</h1>
                    <p className="text-gray-500 mt-2">Manage client testimonials and reviews.</p>
                </div>
                <Link
                    href="/admin/testimonials/new"
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <Plus size={18} />
                    <span>New Testimonial</span>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {testimonials?.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="inline-flex items-center justify-center p-4 bg-gray-50 rounded-full mb-4">
                            <EyeOff className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No testimonials found</h3>
                        <p className="mt-1 text-gray-500">Get started by creating your first testimonial.</p>
                        <div className="mt-6">
                            <Link
                                href="/admin/testimonials/new"
                                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-500 font-medium"
                            >
                                Create new testimonial &rarr;
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role / Company</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {testimonials.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    {item.avatar_url ? (
                                                        <img className="h-10 w-10 rounded-full object-cover" src={item.avatar_url} alt="" />
                                                    ) : (
                                                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                                            <Quote size={18} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{item.role}</div>
                                            <div className="text-sm text-gray-500">{item.company}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-500 max-w-sm truncate" title={item.content}>
                                                {item.content}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/testimonials/${item.id}/edit`}
                                                    className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit size={18} />
                                                </Link>
                                                <DeleteButton id={item.id} />
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
