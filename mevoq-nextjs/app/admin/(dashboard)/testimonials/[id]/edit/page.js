import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import TestimonialForm from '@/components/admin/TestimonialForm';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditTestimonialPage({ params }) {
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

    const { data: testimonial, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !testimonial) {
        if (error && error.code !== 'PGRST116') {
            console.error('Fetch testimonial error:', error);
        }
        return notFound();
    }

    return (
        <div className="max-w-7xl mx-auto">
            <TestimonialForm testimonial={testimonial} />
        </div>
    );
}
