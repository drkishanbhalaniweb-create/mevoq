import { createClient } from '@supabase/supabase-js';
import { mockBlogPosts, mockServices, mockTestimonials, mockTeam, mockStats } from './mock-data';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Only create client if environment variables are available
export const supabase = supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

// Stats
export const getStats = () => {
    return mockStats;
};

// Testimonials
export const getTestimonials = async () => {
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from('testimonials')
                .select('*');

            if (error) throw error;

            if (data && data.length > 0) {
                console.log('✅ Using Supabase testimonials');
                return data;
            }
        } catch (error) {
            console.warn('⚠️ Supabase unavailable, using mock testimonials:', error.message);
        }
    }

    return mockTestimonials;
};

// Services
export const getServices = async () => {
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from('services')
                .select('*');

            if (error) throw error;

            if (data && data.length > 0) {
                console.log('✅ Using Supabase services');
                return data;
            }
        } catch (error) {
            console.warn('⚠️ Supabase unavailable, using mock services:', error.message);
        }
    }

    return mockServices;
};

// Team
export const getTeam = async () => {
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from('team')
                .select('*');

            if (error) throw error;

            if (data && data.length > 0) {
                console.log('✅ Using Supabase team');
                return data;
            }
        } catch (error) {
            console.warn('⚠️ Supabase unavailable, using mock team:', error.message);
        }
    }

    return mockTeam;
};

// Blog Posts
export const getBlogPosts = async (publishedOnly = true) => {
    if (supabase) {
        try {
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
            console.warn('⚠️ Supabase unavailable, using mock blog posts:', error.message);
        }
    }

    return mockBlogPosts;
};

export const getBlogPost = async (slug) => {
    if (supabase) {
        try {
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
            console.warn('⚠️ Supabase unavailable, using mock blog post:', error.message);
        }
    }

    // Find in mock data
    const mockPost = mockBlogPosts.find(p => p.slug === slug);
    return mockPost || null;
};

// Contacts
export const submitContact = async (contactData) => {
    if (supabase) {
        try {
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
