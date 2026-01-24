import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import ServiceForm from '@/components/admin/ServiceForm';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditServicePage({ params }) {
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

    const { data: service, error } = await supabase
        .from('services')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !service) {
        if (error && error.code !== 'PGRST116') {
            console.error('Fetch service error:', error);
        }
        return notFound();
    }

    return (
        <div className="max-w-7xl mx-auto">
            <ServiceForm service={service} />
        </div>
    );
}
