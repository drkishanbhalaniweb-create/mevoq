import { getServices, getBlogPosts } from '@/lib/supabase';

export default async function sitemap() {
    const baseUrl = 'https://mevoq.life'; // Update this to the actual production URL

    // 1. Fetch Dynamic Data
    const services = await getServices();
    const posts = await getBlogPosts(true);

    // 2. Generate URLs
    const serviceUrls = services.map((service) => ({
        url: `${baseUrl}/services#${service.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
    }));

    const blogUrls = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.published_at || post.created_at),
        changeFrequency: 'weekly',
        priority: 0.7,
    }));

    // 3. Static Pages
    const staticPages = [
        '',
        '/about',
        '/services',
        '/blog',
        '/contact',
        '/testimonials',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'monthly',
        priority: route === '' ? 1.0 : 0.8,
    }));

    return [...staticPages, ...serviceUrls, ...blogUrls];
}
