import Link from 'next/link';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Plus, Edit, Trash2, EyeOff, User } from 'lucide-react';
import { deleteMember } from '@/app/admin/actions/team';

export const dynamic = 'force-dynamic';

function DeleteButton({ id }) {
    return (
        <form action={async () => {
            'use server';
            await deleteMember(id);
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

export default async function TeamIndexPage() {
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

    const { data: team, error } = await supabase
        .from('team')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        return <div className="text-red-500">Error loading team: {error.message}</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Team</h1>
                    <p className="text-gray-500 mt-2">Manage your team members.</p>
                </div>
                <Link
                    href="/admin/team/new"
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <Plus size={18} />
                    <span>Add Member</span>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {team?.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="inline-flex items-center justify-center p-4 bg-gray-50 rounded-full mb-4">
                            <EyeOff className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No team members found</h3>
                        <p className="mt-1 text-gray-500">Get started by adding your first team member.</p>
                        <div className="mt-6">
                            <Link
                                href="/admin/team/new"
                                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-500 font-medium"
                            >
                                Add new member &rarr;
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expertise</th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {team.map((member) => (
                                    <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    {member.avatar_url ? (
                                                        <img className="h-10 w-10 rounded-full object-cover" src={member.avatar_url} alt="" />
                                                    ) : (
                                                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                                            <User size={18} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{member.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{member.role}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {member.expertise && Array.isArray(member.expertise) && member.expertise.slice(0, 3).map((exp, idx) => (
                                                    <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                                        {exp}
                                                    </span>
                                                ))}
                                                {member.expertise && member.expertise.length > 3 && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-50 text-gray-500">
                                                        +{member.expertise.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/team/${member.id}/edit`}
                                                    className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit size={18} />
                                                </Link>
                                                <DeleteButton id={member.id} />
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
