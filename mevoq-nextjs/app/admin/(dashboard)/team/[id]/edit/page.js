import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import TeamForm from '@/components/admin/TeamForm';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditMemberPage({ params }) {
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

    const { data: member, error } = await supabase
        .from('team')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !member) {
        if (error && error.code !== 'PGRST116') {
            console.error('Fetch member error:', error);
        }
        return notFound();
    }

    return (
        <div className="max-w-7xl mx-auto">
            <TeamForm member={member} />
        </div>
    );
}
