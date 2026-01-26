'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { useState, useEffect } from 'react';
import Toolbar from './Toolbar';
import ImageUploadModal from './ImageUploadModal';
import './styles.css';

/**
 * Rich Text Editor Component
 * 
 * @param {Object} props
 * @param {string} props.value - HTML content string
 * @param {function} props.onChange - Callback when content changes, receives HTML string
 * @param {string} props.placeholder - Placeholder text when editor is empty
 * @param {function} props.onImageUpload - Async function to upload image, receives File, returns URL
 * @param {string} props.className - Additional CSS classes
 * @param {number} props.minHeight - Minimum height in pixels (default: 200)
 */
export default function RichTextEditor({
    value = '',
    onChange,
    placeholder = 'Start writing...',
    onImageUpload,
    className = '',
    minHeight = 200
}) {
    const [imageModalOpen, setImageModalOpen] = useState(false);

    const editor = useEditor({
        immediatelyRender: false, // Required for Next.js SSR to prevent hydration mismatches
        extensions: [
            StarterKit.configure({
                // StarterKit includes: Bold, Italic, Strike, Code, Heading, BulletList, OrderedList, etc.
                heading: {
                    levels: [1, 2, 3]
                }
            }),
            Link.configure({
                openOnClick: false, // Don't navigate when clicking links in editor
                HTMLAttributes: {
                    target: '_blank',
                    rel: 'noopener noreferrer nofollow'
                }
            }),
            Image.configure({
                HTMLAttributes: {
                    loading: 'lazy'
                }
            }),
            Placeholder.configure({
                placeholder
            })
        ],
        content: value,
        editorProps: {
            attributes: {
                class: 'editor-content prose prose-sm sm:prose-base focus:outline-none'
            }
        },
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            // Don't emit empty paragraph as content
            const isEmpty = html === '<p></p>' || html === '';
            onChange?.(isEmpty ? '' : html);
        }
    });

    // Update editor content when value prop changes externally
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            // Only update if the value is different to avoid cursor jumping
            const currentContent = editor.getHTML();
            const isEmpty = currentContent === '<p></p>' || currentContent === '';
            if (value !== currentContent && !(isEmpty && value === '')) {
                editor.commands.setContent(value, false);
            }
        }
    }, [value, editor]);

    const handleImageInsert = ({ src, alt }) => {
        if (editor && src) {
            editor.chain().focus().setImage({ src, alt }).run();
        }
    };

    const handleImageUpload = async (file) => {
        if (onImageUpload) {
            return await onImageUpload(file);
        }
        throw new Error('No image upload handler provided');
    };

    return (
        <div className={`rich-text-editor ${className}`}>
            <Toolbar
                editor={editor}
                onImageClick={() => setImageModalOpen(true)}
            />
            <div style={{ minHeight: `${minHeight}px` }}>
                <EditorContent editor={editor} />
            </div>

            <ImageUploadModal
                isOpen={imageModalOpen}
                onClose={() => setImageModalOpen(false)}
                onInsert={handleImageInsert}
                onUpload={handleImageUpload}
            />
        </div>
    );
}
