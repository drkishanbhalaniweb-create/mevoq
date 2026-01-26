'use client';

import { LogOut, Menu } from 'lucide-react';
import { useSupabaseBrowser } from '@/lib/useSupabaseBrowser';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const Topbar = () => {
    const router = useRouter();
    const { supabase } = useSupabaseBrowser();

    const handleLogout = async () => {
        if (!supabase) {
            toast.error('Authentication system not ready. Please try again.');
            return;
        }

        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            toast.success('Logged out successfully');
            router.push('/admin/login');
            router.refresh(); // Refresh to clear server session state
        } catch (error) {
            toast.error('Error logging out');
            console.error(error);
        }
    };

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
                <button className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-md">
                    <Menu size={20} />
                </button>
                <h1 className="text-lg font-semibold text-gray-900 hidden md:block">
                    Admin Console
                </h1>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={handleLogout}
                    disabled={!supabase}
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-red-600 px-3 py-2 rounded-md hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <LogOut size={16} />
                    <span>Logout</span>
                </button>
            </div>
        </header>
    );
};

export default Topbar;
