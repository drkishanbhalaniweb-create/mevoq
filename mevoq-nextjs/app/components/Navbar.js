'use client'; // Client-side component for smooth scroll and interactions

import Link from 'next/link';

export default function Navbar() {
    return (
        // Fixed height wrapper to prevent layout shift
        <div className="h-20 w-full">
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-all duration-300">
                <div className="container mx-auto px-4 lg:px-6 h-20 flex items-center justify-between">

                    {/* Logo Placeholder */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                            <span className="text-white font-bold text-xl">M</span>
                        </div>
                        <span className="text-2xl font-bold text-primary-navy tracking-tight">
                            Mevoq<span className="text-primary">.</span>
                        </span>
                    </Link>

                    {/* Navigation Links - Desktop */}
                    <nav className="hidden md:flex items-center gap-8">
                        {['About', 'Services', 'Blog', 'Contact'].map((item) => (
                            <Link
                                key={item}
                                href={`/${item.toLowerCase()}`}
                                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-200"
                            >
                                {item}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Button Placeholder */}
                    <div className="hidden md:block">
                        <Link
                            href="/contact"
                            className="px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg shadow-primary hover:bg-primary-dark transition-all duration-200"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle Placeholder */}
                    <div className="md:hidden">
                        <button className="p-2 text-gray-600">
                            <span className="sr-only">Open Menu</span>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>
        </div>
    );
}
