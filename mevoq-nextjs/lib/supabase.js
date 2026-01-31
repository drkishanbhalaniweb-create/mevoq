import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { mockBlogPosts, mockServices, mockTestimonials, mockTeam, mockStats } from './mock-data';

// Check if credentials exist
const isConfigured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// 1. Lazy Public Client (Prevents build-time crashes if ENVs are missing)
let _publicClient = null;
const getPublicClient = () => {
    if (!isConfigured) return null;
    if (!_publicClient) {
        _publicClient = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            {
                cookies: {
                    getAll() { return []; },
                    setAll(cookiesToSet) { },
                },
            }
        );
    }
    return _publicClient;
};

// Client for User Actions (Requires cookies, opts into Dynamic Rendering)
// Use this if you need to respect RLS policies based on the logged-in user
export const createSessionClient = async () => {
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

// Stats
export const getStats = cache(() => {
    return mockStats;
});

// Testimonials
export const getTestimonials = cache(async () => {
    if (isConfigured) {
        try {
            const supabase = getPublicClient();
            if (!supabase) throw new Error('Supabase client not initialized');
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
            const supabase = getPublicClient();
            if (!supabase) throw new Error('Supabase client not initialized');
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

export const getService = cache(async (slug) => {
    if (isConfigured) {
        try {
            const supabase = getPublicClient();
            if (!supabase) throw new Error('Supabase client not initialized');

            const { data, error } = await supabase
                .from('services')
                .select('*')
                .eq('slug', slug)
                .single();

            if (error) throw error;

            if (data) {
                console.log('✅ Using Supabase service (single)');
                return data;
            }
        } catch (error) {
            console.warn('⚠️ Supabase unavailable/error, using mock service:', error.message);
        }
    }
    return mockServices.find(s => s.slug === slug) || null;
});

// Team
export const getTeam = cache(async () => {
    if (isConfigured) {
        try {
            const supabase = getPublicClient();
            if (!supabase) throw new Error('Supabase client not initialized');
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
            const supabase = getPublicClient();
            if (!supabase) throw new Error('Supabase client not initialized');

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
            const supabase = getPublicClient();
            if (!supabase) throw new Error('Supabase client not initialized');

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
export const submitContact = async (contactData) => {
    if (isConfigured) {
        try {
            const supabase = getPublicClient();
            if (!supabase) throw new Error('Supabase client not initialized');

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
