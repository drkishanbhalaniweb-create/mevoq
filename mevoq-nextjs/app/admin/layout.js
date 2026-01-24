export const metadata = {
    title: 'Mevoq Admin',
    description: 'Admin Control Panel',
    robots: {
        index: false,
        follow: false,
    },
};

export default function AdminLayout({ children }) {
    // This is the root layout for /admin
    // It applies the "no-index" rule globally
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            {children}
        </div>
    );
}
