'use client';

import {
    Bold,
    Italic,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Link as LinkIcon,
    Image as ImageIcon,
    Undo,
    Redo,
    Unlink
} from 'lucide-react';

export default function Toolbar({ editor, onImageClick }) {
    if (!editor) return null;

    const ToolbarButton = ({ onClick, isActive, disabled, children, title }) => (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            title={title}
            className={`toolbar-button ${isActive ? 'is-active' : ''}`}
        >
            {children}
        </button>
    );

    const handleLinkClick = () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('Enter URL:', previousUrl || 'https://');

        if (url === null) return; // Cancelled

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    return (
        <div className="editor-toolbar">
            {/* Text Formatting */}
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                isActive={editor.isActive('bold')}
                title="Bold (Ctrl+B)"
            >
                <Bold size={18} />
            </ToolbarButton>

            <ToolbarButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                isActive={editor.isActive('italic')}
                title="Italic (Ctrl+I)"
            >
                <Italic size={18} />
            </ToolbarButton>

            <div className="toolbar-divider" />

            {/* Headings */}
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                isActive={editor.isActive('heading', { level: 1 })}
                title="Heading 1"
            >
                <Heading1 size={18} />
            </ToolbarButton>

            <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                isActive={editor.isActive('heading', { level: 2 })}
                title="Heading 2"
            >
                <Heading2 size={18} />
            </ToolbarButton>

            <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                isActive={editor.isActive('heading', { level: 3 })}
                title="Heading 3"
            >
                <Heading3 size={18} />
            </ToolbarButton>

            <div className="toolbar-divider" />

            {/* Lists */}
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                isActive={editor.isActive('bulletList')}
                title="Bullet List"
            >
                <List size={18} />
            </ToolbarButton>

            <ToolbarButton
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                isActive={editor.isActive('orderedList')}
                title="Numbered List"
            >
                <ListOrdered size={18} />
            </ToolbarButton>

            <div className="toolbar-divider" />

            {/* Link */}
            <ToolbarButton
                onClick={handleLinkClick}
                isActive={editor.isActive('link')}
                title="Insert Link"
            >
                <LinkIcon size={18} />
            </ToolbarButton>

            {editor.isActive('link') && (
                <ToolbarButton
                    onClick={() => editor.chain().focus().unsetLink().run()}
                    title="Remove Link"
                >
                    <Unlink size={18} />
                </ToolbarButton>
            )}

            {/* Image */}
            <ToolbarButton
                onClick={onImageClick}
                title="Insert Image"
            >
                <ImageIcon size={18} />
            </ToolbarButton>

            <div className="toolbar-divider" />

            {/* Undo/Redo */}
            <ToolbarButton
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                title="Undo (Ctrl+Z)"
            >
                <Undo size={18} />
            </ToolbarButton>

            <ToolbarButton
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                title="Redo (Ctrl+Y)"
            >
                <Redo size={18} />
            </ToolbarButton>
        </div>
    );
}
