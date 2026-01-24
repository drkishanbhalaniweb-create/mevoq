import { getBlogPosts } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export const revalidate = 3600;

export const metadata = {
    title: 'Insights & Regulatory Updates',
    description: 'Latest news, guidelines, and expert perspectives on pharmaceutical regulatory affairs, FDA approvals, and compliance strategies.',
};

export default async function BlogPage() {
    const posts = await getBlogPosts(true);

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20">
            <div className="container mx-auto px-4 lg:px-6">

                {/* Header */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h1 className="text-4xl font-bold text-primary-navy mb-4 sm:text-5xl">
                        Regulatory Insights
                    </h1>
                    <p className="text-gray-600 text-lg sm:text-xl leading-relaxed">
                        Expert analysis on the changing landscape of drug development and global compliance.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <article
                            key={post.id}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col border border-gray-100"
                        >
                            {/* Image */}
                            <Link href={`/blog/${post.slug}`} className="relative h-56 w-full overflow-hidden block">
                                <Image
                                    src={post.featured_image || 'https://placehold.co/800x600/png'}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/90 backdrop-blur-sm text-primary px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md shadow-sm">
                                        {post.category}
                                    </span>
                                </div>
                            </Link>

                            {/* Content */}
                            <div className="p-6 flex-grow flex flex-col">
                                <div className="mb-4">
                                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                                        <Link href={`/blog/${post.slug}`}>
                                            {post.title}
                                        </Link>
                                    </h2>
                                    <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                </div>

                                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between text-sm">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-900">{post.author}</span>
                                        <span className="text-gray-500 text-xs">
                                            {new Date(post.published_at).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="text-primary font-semibold flex items-center gap-1 group/btn hover:gap-2 transition-all"
                                    >
                                        Read <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No updates available at the moment.</p>
                    </div>
                )}

            </div>
        </div>
    );
}
