'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { createTestimonial, updateTestimonial } from '@/app/admin/actions/testimonials';
import { uploadContentImage } from '@/app/admin/actions/upload';
import Link from 'next/link';
import RichTextEditor from './RichTextEditor';

export default function TestimonialForm({ testimonial }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Form State
    const [name, setName] = useState(testimonial?.name || '');
    const [role, setRole] = useState(testimonial?.role || '');
    const [company, setCompany] = useState(testimonial?.company || '');
    const [content, setContent] = useState(testimonial?.content || '');
    const [avatarUrl, setAvatarUrl] = useState(testimonial?.avatar_url || '');

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
            if (testimonial?.id) formData.append('id', testimonial.id);

            formData.append('name', name);
            formData.append('role', role);
            formData.append('company', company);
            formData.append('content', content);
            formData.append('avatar_url', avatarUrl);

            const action = testimonial ? updateTestimonial : createTestimonial;

            // Invoke Server Action
            const result = await action(null, formData);

            if (result?.error) {
                toast.error(result.error);
            } else {
                toast.success(testimonial ? 'Testimonial updated!' : 'Testimonial created!');
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
                    <Link href="/admin/testimonials" className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        {testimonial ? 'Edit Testimonial' : 'Create New Testimonial'}
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/admin/testimonials" className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-50 text-gray-700">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin h-4 w-4" /> : <Save size={18} />}
                        <span>{testimonial ? 'Update' : 'Save'}</span>
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6 max-w-3xl">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="Client Name"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <input
                            type="text"
                            name="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="e.g. CEO, Director"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                        <input
                            type="text"
                            name="company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="Company Name"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial Content</label>
                    <RichTextEditor
                        value={content}
                        onChange={setContent}
                        placeholder="What did the client say?"
                        onImageUpload={handleContentImageUpload}
                        minHeight={120}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
                    <input
                        type="text"
                        name="avatar_url"
                        value={avatarUrl}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="https://example.com/avatar.jpg"
                    />
                    <p className="mt-1 text-xs text-gray-500">Enter a direct link to an image.</p>
                </div>
            </div>
        </form>
    );
}
