
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import Sidebar from '@/components/admin/Sidebar';
import Topbar from '@/components/admin/Topbar';

export default async function VerifiedAdminLayout({ children }) {
    const cookieStore = await cookies();

    // Create a Supabase client configured to use cookies
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    // Note: In Server Components (like this layout), we can read cookies but NOT write/set them directly 
                    // in the same request-response cycle easily without middleware.
                    // However, for pure READ/Verification, getAll() is enough.
                    // Middleware handles the "refreshing" of tokens.
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    );

    // Check auth state
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/admin/login');
    }

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            {/* Sidebar - Hidden on mobile, fixed width on desktop */}
            <Sidebar />

            <div className="flex flex-col flex-1 w-full relative">
                {/* Topbar - sticky top */}
                <Topbar />

                {/* Main Content Area - Scrollable */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
