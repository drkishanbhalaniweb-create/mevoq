'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
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
            </div>
        </form>
    );
}
