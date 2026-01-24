/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://maglinc.vercel.app',
    generateRobotsTxt: false, // We have custom robots.txt
    generateIndexSitemap: false, // Not needed for small sites
    exclude: ['/admin', '/admin/*'],

    // Dynamic paths will be added here via additionalPaths
    additionalPaths: async (config) => {
        const result = [];
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (supabaseUrl && supabaseKey) {
            try {
                // Fetch published blog posts via REST API to avoid @supabase/supabase-js dependency
                // Endpoint: /rest/v1/blog_posts?select=slug,updated_at&published=eq.true
                const response = await fetch(
                    `${supabaseUrl}/rest/v1/blog_posts?select=slug,updated_at&published=eq.true`,
                    {
                        headers: {
                            'apikey': supabaseKey,
                            'Authorization': `Bearer ${supabaseKey}`
                        }
                    }
                );

                if (response.ok) {
                    const posts = await response.json();
                    if (Array.isArray(posts)) {
                        posts.forEach((post) => {
                            result.push({
                                loc: `/blog/${post.slug}`,
                                lastmod: post.updated_at || new Date().toISOString(),
                                changefreq: 'weekly',
                                priority: 0.8,
                            });
                        });
                    }
                } else {
                    console.warn('Sitemap fetch failed:', response.statusText);
                }
            } catch (error) {
                console.warn('Could not fetch blog posts for sitemap:', error.message);
                // Fail gracefully - static pages will still be in sitemap
            }
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
