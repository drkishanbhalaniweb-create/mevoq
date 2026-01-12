/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://maglinc.vercel.app',
    generateRobotsTxt: false, // We have custom robots.txt
    generateIndexSitemap: false, // Not needed for small sites
    exclude: ['/admin', '/admin/*'],

    // Dynamic paths will be added here via additionalPaths
    additionalPaths: async (config) => {
        const result = [];

        try {
            // Import Supabase client
            const { createClient } = require('@supabase/supabase-js');
            const supabase = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
            );

            // Fetch published blog posts
            const { data: posts, error } = await supabase
                .from('blog_posts')
                .select('slug, updated_at')
                .eq('published', true);

            if (!error && posts) {
                posts.forEach((post) => {
                    result.push({
                        loc: `/blog/${post.slug}`,
                        lastmod: post.updated_at || new Date().toISOString(),
                        changefreq: 'weekly',
                        priority: 0.8,
                    });
                });
            }
        } catch (error) {
            console.warn('Could not fetch blog posts for sitemap:', error.message);
            // Fail gracefully - static pages will still be in sitemap
        }

        return result;
    },

    // Priority and change frequency for static pages
    transform: async (config, path) => {
        // Custom priorities
        const priorities = {
            '/': 1.0,
            '/blog': 0.9,
            '/services': 0.9,
            '/about': 0.8,
            '/contact': 0.7,
        };

        const changefreqs = {
            '/': 'weekly',
            '/blog': 'daily',
            '/services': 'monthly',
            '/about': 'monthly',
            '/contact': 'monthly',
        };

        return {
            loc: path,
            changefreq: changefreqs[path] || 'monthly',
            priority: priorities[path] || 0.7,
            lastmod: new Date().toISOString(),
        };
    },
};
