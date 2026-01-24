import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export default async function DashboardPage() {
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

    // Fetch live counts
    const [postsRes, servicesRes, contactsRes] = await Promise.all([
        supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
        supabase.from('services').select('*', { count: 'exact', head: true }),
        supabase.from('contacts').select('*', { count: 'exact', head: true }),
    ]);

    const stats = [
        { label: 'Total Posts', value: postsRes.count || 0 },
        { label: 'Services', value: servicesRes.count || 0 },
        { label: 'Total Messages', value: contactsRes.count || 0 },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                        <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center py-20">
                <h3 className="text-lg font-medium text-gray-900">Welcome to Mevoq Admin</h3>
                <p className="mt-2 text-gray-500">Your operational nexus is live and synchronized with the database.</p>
            </div>
        </div>
    );
}
