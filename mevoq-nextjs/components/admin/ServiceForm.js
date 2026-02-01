'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Save, ArrowLeft, Image as ImageIcon, Link as LinkIcon, Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import { createService, updateService } from '@/app/admin/actions/services';
import { uploadContentImage } from '@/app/admin/actions/upload';
import Link from 'next/link';
import RichTextEditor from './RichTextEditor';
export default function ServiceForm({ service }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Form State
    const [title, setTitle] = useState(service?.title || '');
    const [description, setDescription] = useState(service?.description || '');
    const [icon, setIcon] = useState(service?.icon || 'map-pin');
    // Features come as array from DB, convert to newline string for editing
    const [features, setFeatures] = useState(
        service?.features && Array.isArray(service.features)
            ? service.features.join('\n')
            : ''
    );
    const [caseStudySnippet, setCaseStudySnippet] = useState(service?.case_study_snippet || '');
    const [slug, setSlug] = useState(service?.slug || '');
    const [content, setContent] = useState(service?.content || '');
    const [featuredImage, setFeaturedImage] = useState(service?.featured_image || '');
    const [imageInputType, setImageInputType] = useState('url'); // 'url' | 'upload'
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Client-side validation
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            toast.error('File size must be less than 10MB');
            e.target.value = '';
            return;
        }

        if (!file.type.startsWith('image/')) {
            toast.error('Please upload an image file');
            e.target.value = '';
            return;
        }

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('folder', 'services');

            const result = await uploadContentImage(formData);

            if (result.error) {
                toast.error(result.error);
            } else {
                setFeaturedImage(result.url);
                toast.success('Image uploaded successfully');
            }
        } catch (error) {
            console.error('Upload failed:', error);
            toast.error('Upload failed');
        } finally {
            setUploading(false);
            e.target.value = ''; // Reset input to allow re-uploading same file
        }
    };

    // Handler for uploading images in the content editor
    const handleContentImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const result = await uploadContentImage(formData);

        if (result.error) {
            toast.error(result.error);
            throw new Error(result.error);
        }

        return result.url;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            if (service?.id) formData.append('id', service.id);

            formData.append('title', title);
            formData.append('description', description);
            formData.append('icon', icon);
            formData.append('features', features);
            formData.append('case_study_snippet', caseStudySnippet);
            formData.append('slug', slug);
            formData.append('content', content);
            formData.append('featured_image', featuredImage);

            const action = service ? updateService : createService;

            // Invoke Server Action
            const result = await action(null, formData);

            if (result?.error) {
                toast.error(result.error);
            } else {
                toast.success(service ? 'Service updated!' : 'Service created!');
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
                    <Link href="/admin/services" className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        {service ? 'Edit Service' : 'Create New Service'}
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/admin/services" className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-50 text-gray-700">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin h-4 w-4" /> : <Save size={18} />}
                        <span>{service ? 'Update Service' : 'Save Service'}</span>
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6 max-w-3xl">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="Service Title"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Icon Key</label>
                        <select
                            name="icon"
                            value={icon}
                            onChange={(e) => setIcon(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        >
                            <option value="map-pin">Map Pin</option>
                            <option value="file-text">File Text</option>
                            <option value="shield-check">Shield Check</option>
                            <option value="pen-tool">Pen Tool</option>
                            <option value="alert-triangle">Alert Triangle</option>
                            <option value="folder">Folder</option>
                        </select>
                        <p className="mt-1 text-xs text-gray-500">Select an icon from the Lucide library set.</p>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <RichTextEditor
                        value={description}
                        onChange={setDescription}
                        placeholder="Brief description of the service..."
                        onImageUpload={handleContentImageUpload}
                        minHeight={150}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
                    <textarea
                        name="features"
                        value={features}
                        onChange={(e) => setFeatures(e.target.value)}
                        rows={5}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-mono text-sm"
                        placeholder="Feature 1&#10;Feature 2&#10;Feature 3 (One per line)"
                    />
                    <p className="mt-1 text-xs text-gray-500">Enter each feature on a new line.</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Case Study Snippet</label>
                    <RichTextEditor
                        value={caseStudySnippet}
                        onChange={setCaseStudySnippet}
                        placeholder="Optional success story snippet..."
                        onImageUpload={handleContentImageUpload}
                        minHeight={100}
                    />
                </div>

                <div className="border-t border-gray-200 pt-6 mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Service Page</h3>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
                        <input
                            type="text"
                            name="slug"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="regulatory-strategy-planning"
                        />
                        <p className="mt-1 text-xs text-gray-500">URL-friendly identifier (e.g., "regulatory-strategy-planning"). Auto-formatted.</p>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image URL</label>
                        <div className="flex items-center gap-4 mb-3">
                            <button
                                type="button"
                                onClick={() => setImageInputType('url')}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${imageInputType === 'url'
                                    ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200'
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <LinkIcon size={16} />
                                <span>Image URL</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setImageInputType('upload')}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${imageInputType === 'upload'
                                    ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200'
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <Upload size={16} />
                                <span>Upload Image</span>
                            </button>
                        </div>

                        {imageInputType === 'url' ? (
                            <input
                                type="url"
                                name="featured_image"
                                value={featuredImage}
                                onChange={(e) => setFeaturedImage(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                placeholder="https://images.unsplash.com/..."
                            />
                        ) : (
                            <div className="w-full">
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        {uploading ? (
                                            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mb-2" />
                                        ) : (
                                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                        )}
                                        <p className="mb-1 text-sm text-gray-500">
                                            <span className="font-semibold">Click to upload</span>
                                        </p>                                        <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 10MB)</p>
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={uploading}
                                    />
                                </label>
                            </div>
                        )}
                        <p className="mt-1 text-xs text-gray-500">URL for the hero image displayed on the service detail page.</p>
                        {featuredImage && (
                            <div className="mt-3 relative rounded-lg overflow-hidden border border-gray-200">
                                <img
                                    src={featuredImage}
                                    alt="Featured preview"
                                    className="w-full h-40 object-cover"
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                                <button
                                    type="button"
                                    onClick={() => setFeaturedImage('')}
                                    className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white text-gray-600 transition-colors shadow-sm"
                                    title="Remove image"
                                >
                                    <X size={16} />
                                </button>
                                <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 text-white text-xs rounded">
                                    {imageInputType === 'url' ? 'External URL' : 'Uploaded Image'}
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Content (HTML)</label>
                        <RichTextEditor
                            value={content}
                            onChange={setContent}
                            placeholder="Full page content for the service detail page..."
                            onImageUpload={handleContentImageUpload}
                            minHeight={300}
                        />
                        <p className="mt-1 text-xs text-gray-500">This content will appear on the dedicated service page.</p>
                    </div>
                </div>
            </div>
        </form>
    );
}
