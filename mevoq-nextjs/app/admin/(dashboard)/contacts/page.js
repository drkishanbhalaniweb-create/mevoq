import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { EyeOff } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ContactsPage() {
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

    const { data: contacts, error } = await supabase
        .from('contacts')
        .select('id, name, email, phone, message, company, lead_type, timestamp')
        .order('timestamp', { ascending: false })
        .limit(200);

    if (error) {
        return <div className="text-red-500">Error loading messages: {error.message}</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Inbox</h1>
                    <p className="text-gray-500 mt-2">View contact form submissions.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {!contacts || contacts.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="inline-flex items-center justify-center p-4 bg-gray-50 rounded-full mb-4">
                            <EyeOff className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No messages yet</h3>
                        <p className="mt-1 text-gray-500">New contact submissions will appear here.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {contacts.map((contact) => {
                                    const timestamp = contact.timestamp ? new Date(contact.timestamp) : null;
                                    const isValidDate = timestamp && !isNaN(timestamp.getTime());
                                    const displayDate = isValidDate ? timestamp.toLocaleDateString() : '-';
                                    const displayTime = isValidDate ? timestamp.toLocaleTimeString() : '';

                                    const displayName = contact.name || 'Unknown';
                                    const displayInitial = displayName.charAt(0).toUpperCase() || '?';
                                    const displayEmail = contact.email || '-';
                                    const displayCompany = contact.company || '-';
                                    const displayLeadType = contact.lead_type || '-';
                                    const displayMessage = contact.message || '-';

                                    return (
                                        <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {displayDate}
                                                {isValidDate && (
                                                    <div className="text-xs text-gray-400">
                                                        {displayTime}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                                                        <span className="text-xs font-medium">{displayInitial}</span>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{displayName}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{displayEmail}</div>
                                                {contact.phone && <div className="text-sm text-gray-500">{contact.phone}</div>}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{displayCompany}</div>
                                                <div className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 mt-1">
                                                    {displayLeadType}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div
                                                    className="text-sm text-gray-500 max-w-sm truncate"
                                                    title={contact.message || 'No message'}
                                                >
                                                    {displayMessage}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
