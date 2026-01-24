import Link from 'next/link';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Plus, Edit, Trash2, EyeOff } from 'lucide-react';
import { deleteService } from '@/app/admin/actions/services';

export const dynamic = 'force-dynamic';

function DeleteButton({ id }) {
    return (
        <form action={async () => {
            'use server';
            await deleteService(id);
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

export default async function ServicesIndexPage() {
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

    const { data: services, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        return <div className="text-red-500">Error loading services: {error.message}</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Services</h1>
                    <p className="text-gray-500 mt-2">Manage your service offerings.</p>
                </div>
                <Link
                    href="/admin/services/new"
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <Plus size={18} />
                    <span>New Service</span>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {services?.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="inline-flex items-center justify-center p-4 bg-gray-50 rounded-full mb-4">
                            <EyeOff className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No services found</h3>
                        <p className="mt-1 text-gray-500">Get started by creating your first service.</p>
                        <div className="mt-6">
                            <Link
                                href="/admin/services/new"
                                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-500 font-medium"
                            >
                                Create new service &rarr;
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Icon</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Features</th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {services.map((service) => (
                                    <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm font-medium text-gray-900">{service.title}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                {service.icon}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-500 max-w-sm truncate" title={service.description}>
                                                {service.description}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {Array.isArray(service.features) ? service.features.length : 0} features
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/services/${service.id}/edit`}
                                                    className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit size={18} />
                                                </Link>
                                                <DeleteButton id={service.id} />
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
