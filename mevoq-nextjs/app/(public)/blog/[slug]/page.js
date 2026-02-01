import { getBlogPost, getBlogPosts } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';

export const revalidate = 3600;

export async function generateStaticParams() {
    const posts = await getBlogPosts(true);
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: post.title,
        description: post.excerpt,
        alternates: {
            canonical: `/blog/${slug}`,
        },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.published_at,
            authors: ['Mevoq Team'],
            images: [
                {
                    url: post.featured_image,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
    };
}

export default async function BlogPost({ params }) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
        notFound();
    }

    const formattedDate = new Date(post.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // Sanitize HTML content for safe rendering
    const sanitizedContent = DOMPurify.sanitize(post.content || '', {
        ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre', 'br'],
        ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'rel', 'loading', 'class']
    });

    return (
        <article className="container mx-auto px-4 py-12 max-w-4xl">
            <header className="mb-12 text-center">
                <div className="mb-6">
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-primary bg-primary/10 rounded-full">
                        {post.category}
                    </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    {post.title}
                </h1>

                <div className="flex items-center justify-center gap-4 text-gray-600">
                    <div className="flex items-center gap-2">
                        <time dateTime={post.published_at}>{formattedDate}</time>
                    </div>
                </div>
            </header>

            {post.featured_image && (
                <div className="relative w-full aspect-video mb-12 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                        src={post.featured_image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    />
                </div>
            )}

            {/* Semantic HTML content rendered safely */}
            <div
                className="prose prose-lg prose-blue mx-auto max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-indigo-600 prose-strong:text-gray-900 prose-img:rounded-xl prose-img:shadow-lg"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />

            {post.tags && post.tags.length > 0 && (
                <section className="mt-16 pt-8 border-t border-gray-200">
                    <h3 className="text-xl font-bold mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </section>
            )}
        </article>
    );
}
