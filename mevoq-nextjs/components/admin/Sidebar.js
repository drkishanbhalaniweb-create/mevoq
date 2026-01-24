'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Briefcase, Users, Settings } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming standard shadcn utils exist, or I will inline standard clsx

const Sidebar = () => {
    const pathname = usePathname();

    const links = [
        {
            href: '/admin/dashboard',
            label: 'Dashboard',
            icon: LayoutDashboard,
        },
        {
            href: '/admin/blog',
            label: 'Blog',
            icon: FileText,
        },
        {
            href: '/admin/services',
            label: 'Services',
            icon: Briefcase,
        },
        {
            href: '/admin/contacts',
            label: 'Contacts',
            icon: Users,
        },
    ];

    return (
        <aside className="w-64 bg-gray-900 text-white flex-shrink-0 hidden md:flex flex-col h-screen sticky top-0">
            <div className="h-16 flex items-center px-6 border-b border-gray-800">
                <span className="text-xl font-bold tracking-tight">Mevoq Admin</span>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname.startsWith(link.href);

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                isActive
                                    ? "bg-gray-800 text-white"
                                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                            )}
                        >
                            <Icon size={18} />
                            {link.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-800">
                <div className="flex items-center gap-3 px-3 py-2 text-sm text-gray-500">
                    <Settings size={18} />
                    <span>v1.0.0</span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
