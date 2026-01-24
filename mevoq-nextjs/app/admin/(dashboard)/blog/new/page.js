import BlogForm from '@/components/admin/BlogForm';

export default function NewBlogPage() {
    return (
        <div className="max-w-7xl mx-auto">
            {/* Breadcrumbs or other header stuff could go here if needed, 
           but the form has its own header. */}
            <BlogForm />
        </div>
    );
}
