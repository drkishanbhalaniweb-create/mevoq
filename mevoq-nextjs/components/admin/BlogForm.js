'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Save, Upload, X, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { createPost, updatePost, uploadImage } from '@/app/admin/actions/blog';
import Link from 'next/link';

export default function BlogForm({ post }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Form State
    const [title, setTitle] = useState(post?.title || '');
    const [slug, setSlug] = useState(post?.slug || '');
    const [excerpt, setExcerpt] = useState(post?.excerpt || '');
    const [content, setContent] = useState(post?.content || '');
    const [category, setCategory] = useState(post?.category || 'General');
    const [tags, setTags] = useState(post?.tags ? post.tags.join(', ') : '');
    const [published, setPublished] = useState(post?.published || false);
    const [featuredImage, setFeaturedImage] = useState(post?.featured_image || '');

    const generateSlug = (val) => {
        return val
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleTitleChange = (e) => {
        const val = e.target.value;
        setTitle(val);
        if (!post) { // Only auto-generate slug for new posts
            setSlug(generateSlug(val));
        }
    };

    const handleFileUpload = async (e) => {
        try {
            setUploading(true);
            const file = e.target.files?.[0];
            if (!file) return;

            const formData = new FormData();
            formData.append('file', file);

            const result = await uploadImage(formData);

            if (result.error) {
                toast.error(result.error);
            } else {
                setFeaturedImage(result.url);
                toast.success('Image uploaded successfully');
            }
        } catch (error) {
            console.error('Upload handler error:', error);
            toast.error('Failed to trigger upload');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            if (post?.id) formData.append('id', post.id);

            formData.append('title', title);
            formData.append('slug', slug);
            formData.append('excerpt', excerpt);
            formData.append('content', content);
            formData.append('category', category);
            formData.append('tags', tags);
            formData.append('featured_image', featuredImage);
            formData.append('published', published.toString());

            const action = post ? updatePost : createPost;

            // Invoke Server Action
            const result = await action(null, formData);

            if (result?.error) {
                toast.error(result.error);
            } else {
                // If success, router.push is handled by redirect() in server action
                // But we can fallback to a toast if needed
                toast.success(post ? 'Post updated!' : 'Post created!');
            }
        } catch (error) {
            toast.error('Something went wrong');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 pb-12">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/blog" className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        {post ? 'Edit Post' : 'Create New Post'}
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/admin/blog" className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-50 text-gray-700">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={loading || uploading}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin h-4 w-4" /> : <Save size={18} />}
                        <span>{post ? 'Update Post' : 'Save Post'}</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={title}
                                onChange={handleTitleChange}
                                required
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                placeholder="Enter post title..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                            <div className="flex items-center">
                                <span className="bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg px-3 py-2 text-gray-500 text-sm">
                                    /blog/
                                </span>
                                <input
                                    type="text"
                                    name="slug"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    required
                                    className="flex-1 px-4 py-2 rounded-r-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    placeholder="post-url-slug"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                            <textarea
                                name="excerpt"
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                                rows={3}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                placeholder="Brief summary for the card view..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Content (Markdown)</label>
                            <textarea
                                name="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={15}
                                required
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-mono text-sm"
                                placeholder="# Header&#10;&#10;Write your content here..."
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
                        <h3 className="font-semibold text-gray-900">Publishing</h3>

                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Status</span>
                            <button
                                type="button"
                                onClick={() => setPublished(!published)}
                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${published ? 'bg-green-600' : 'bg-gray-200'}`}
                            >
                                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${published ? 'translate-x-5' : 'translate-x-0'}`} />
                            </button>
                            {/* Hidden input to ensure value is sent if standard form submission were used (though we manually append) */}
                            <input type="hidden" name="published" value={published.toString()} />
                        </div>
                        <p className="text-xs text-gray-500">
                            {published ? 'Post is visible to the public.' : 'Post is currently hidden.'}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
                        <h3 className="font-semibold text-gray-900">Organization</h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                name="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            >
                                <option value="General">General</option>
                                <option value="Regulatory">Regulatory</option>
                                <option value="Compliance">Compliance</option>
                                <option value="Quality">Quality</option>
                                <option value="Strategy">Strategy</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                            <input
                                type="text"
                                name="tags"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                placeholder="FDA, GMP, Audit"
                            />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
                        <h3 className="font-semibold text-gray-900">Featured Image</h3>
                        <input type="hidden" name="featured_image" value={featuredImage} />

                        {featuredImage ? (
                            <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-200">
                                <img src={featuredImage} alt="Featured" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => setFeaturedImage('')}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    disabled={uploading}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="flex flex-col items-center justify-center text-gray-500">
                                    {uploading ? (
                                        <Loader2 className="h-8 w-8 animate-spin mb-2" />
                                    ) : (
                                        <Upload className="h-8 w-8 mb-2" />
                                    )}
                                    <span className="text-sm">{uploading ? 'Uploading...' : 'Click to upload'}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
}
