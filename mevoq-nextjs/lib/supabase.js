import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { mockBlogPosts, mockServices, mockTestimonials, mockTeam, mockStats } from './mock-data';

// 1. Singleton Public Client (No cookies/auth session required, supports SSG)
const publicClient = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
        cookies: {
            getAll() { return []; },
            setAll(cookiesToSet) { },
        },
    }
);

// Client for User Actions (Requires cookies, opts into Dynamic Rendering)
// Use this if you need to respect RLS policies based on the logged-in user
const createSessionClient = async () => {
    const cookieStore = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        );
                    } catch (error) {
                        // Ignored in Server Components
                    }
                },
            },
        }
    );
};

// Check if credentials exist
const isConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Stats
export const getStats = cache(() => {
    return mockStats;
});

// Testimonials
export const getTestimonials = cache(async () => {
    if (isConfigured) {
        try {
            // Using public client for static content queries to enable SSG
            const supabase = createPublicClient();
            const { data, error } = await supabase
                .from('testimonials')
                .select('*');

            if (error) throw error;

            if (data && data.length > 0) {
                console.log('✅ Using Supabase testimonials');
                return data;
            }
        } catch (error) {
            console.warn('⚠️ Supabase unavailable/error, using mock testimonials:', error.message);
        }
    }
    return mockTestimonials;
});

// Services
export const getServices = cache(async () => {
    if (isConfigured) {
        try {
            const supabase = publicClient;
            const { data, error } = await supabase
                .from('services')
                .select('*');

            if (error) throw error;

            if (data && data.length > 0) {
                console.log('✅ Using Supabase services');
                return data;
            }
        } catch (error) {
            console.warn('⚠️ Supabase unavailable/error, using mock services:', error.message);
        }
    }
    return mockServices;
});

// Team
export const getTeam = cache(async () => {
    if (isConfigured) {
        try {
            const supabase = publicClient;
            const { data, error } = await supabase
                .from('team')
                .select('*');

            if (error) throw error;

            if (data && data.length > 0) {
                console.log('✅ Using Supabase team');
                return data;
            }
        } catch (error) {
            console.warn('⚠️ Supabase unavailable/error, using mock team:', error.message);
        }
    }
    return mockTeam;
});

// Blog Posts
export const getBlogPosts = cache(async (publishedOnly = true) => {
    if (isConfigured) {
        try {
            const supabase = publicClient;
            let query = supabase
                .from('blog_posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (publishedOnly) {
                query = query.eq('published', true);
            }

            const { data, error } = await query;

            if (error) throw error;

            if (data && data.length > 0) {
                console.log('✅ Using Supabase blog posts');
                return data;
            }
        } catch (error) {
            console.warn('⚠️ Supabase unavailable/error, using mock blog posts:', error.message);
        }
    }
    return mockBlogPosts;
});

export const getBlogPost = cache(async (slug) => {
    if (isConfigured) {
        try {
            const supabase = publicClient;
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('slug', slug)
                .eq('published', true)
                .single();

            if (error) throw error;

            if (data) {
                console.log('✅ Using Supabase blog post');
                return data;
            }
        } catch (error) {
            console.warn('⚠️ Supabase unavailable/error, using mock blog post:', error.message);
        }
    }

    // Find in mock data
    const mockPost = mockBlogPosts.find(p => p.slug === slug);
    return mockPost || null;
});

// Contacts
// Using public client for submission (assumes public insert access)
export const submitContact = async (contactData) => {
    if (isConfigured) {
        try {
            const supabase = publicClient;
            const { data, error } = await supabase
                .from('contacts')
                .insert([{
                    id: crypto.randomUUID(),
                    ...contactData,
                    timestamp: new Date().toISOString()
                }]);

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Error submitting contact form:', error);
            throw error;
        }
    }

    // Mock submission
    console.log('📝 Mock contact submission:', contactData);
    return { success: true, mock: true };
};
