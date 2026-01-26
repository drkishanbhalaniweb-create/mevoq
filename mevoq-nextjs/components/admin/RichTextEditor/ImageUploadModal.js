'use client';

import { useState, useRef } from 'react';
import { X, Upload, Link as LinkIcon, Loader2 } from 'lucide-react';

export default function ImageUploadModal({ isOpen, onClose, onInsert, onUpload }) {
    const [activeTab, setActiveTab] = useState('upload');
    const [url, setUrl] = useState('');
    const [altText, setAltText] = useState('');
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);

    if (!isOpen) return null;

    const handleFileChange = async (file) => {
        if (!file || !file.type.startsWith('image/')) {
            alert('Please select a valid image file');
            return;
        }

        setUploading(true);
        try {
            const uploadedUrl = await onUpload(file);
            if (uploadedUrl) {
                onInsert({ src: uploadedUrl, alt: altText || file.name });
                handleClose();
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        const file = e.dataTransfer.files[0];
        handleFileChange(file);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleUrlInsert = () => {
        if (!url.trim()) {
            alert('Please enter an image URL');
            return;
        }
        onInsert({ src: url.trim(), alt: altText || 'Image' });
        handleClose();
    };

    const handleClose = () => {
        setUrl('');
        setAltText('');
        setActiveTab('upload');
        onClose();
    };

    return (
        <div className="image-modal-overlay" onClick={handleClose}>
            <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Insert Image</h3>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="p-1 hover:bg-gray-100 rounded-full text-gray-500"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="image-modal-tabs">
                    <button
                        type="button"
                        onClick={() => setActiveTab('upload')}
                        className={`image-modal-tab ${activeTab === 'upload' ? 'active' : ''}`}
                    >
                        <Upload size={16} className="inline mr-2" />
                        Upload
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('url')}
                        className={`image-modal-tab ${activeTab === 'url' ? 'active' : ''}`}
                    >
                        <LinkIcon size={16} className="inline mr-2" />
                        URL
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'upload' ? (
                    <div
                        className={`image-upload-zone ${dragActive ? 'dragging' : ''}`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e.target.files?.[0])}
                            className="hidden"
                        />
                        {uploading ? (
                            <div className="flex flex-col items-center text-gray-500">
                                <Loader2 className="h-10 w-10 animate-spin mb-2" />
                                <span>Uploading...</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-gray-500">
                                <Upload className="h-10 w-10 mb-2" />
                                <span className="font-medium">Drop image here or click to upload</span>
                                <span className="text-sm text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</span>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                            <input
                                type="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://example.com/image.jpg"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            />
                        </div>
                    </div>
                )}

                {/* Alt Text (shared) */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text (for accessibility & SEO)</label>
                    <input
                        type="text"
                        value={altText}
                        onChange={(e) => setAltText(e.target.value)}
                        placeholder="Describe the image..."
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-50 text-gray-700"
                    >
                        Cancel
                    </button>
                    {activeTab === 'url' && (
                        <button
                            type="button"
                            onClick={handleUrlInsert}
                            disabled={!url.trim()}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
                        >
                            Insert Image
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
