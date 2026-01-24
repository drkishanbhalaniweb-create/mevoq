'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

// Data Model (Services, Insights, Company)
const NAV_DATA = {
    Services: {
        id: '01',
        label: 'Services',
        href: '/services',
        description: 'Comprehensive regulatory and compliance solutions.',
        links: [
            { label: 'Regulatory Strategy', href: '/services' },
            { label: 'Compliance Audits', href: '/services' },
            { label: 'Submission Support', href: '/services' },
            { label: 'Medical Writing', href: '/services' },
        ]
    },
    Insights: { // Internally maps to Blog
        id: '02',
        label: 'Insights',
        href: '/blog',
        description: 'Analysis of regulatory shifts and industry trends.',
        links: [
            { label: 'Industry Insights', href: '/blog' },
            { label: 'Case Studies', href: '/blog' },
            { label: 'Regulatory Updates', href: '/blog' },
        ]
    },
    Company: { // Internally maps to About
        id: '03',
        label: 'Company',
        href: '/about',
        description: 'Operational philosophy and leadership structure.',
        links: [
            { label: 'Establisment', href: '/about' },
            { label: 'Leadership', href: '/about' },
            { label: 'Contact', href: '/contact' },
        ]
    }
};

export default function Navbar() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeTab, setActiveTab] = useState('Services'); // Default tab when expanded
    const [isScrolled, setIsScrolled] = useState(false);
    const containerRef = useRef(null);
    const pathname = usePathname();

    // Scroll Monitoring (For shrinking effect)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 30) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Outside Click Handler & Mouse Leave
    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsExpanded(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Dynamic Classes based on state
    // Refined Paddings for a balanced authority/compact feel.
    const containerClasses = isScrolled
        ? "py-[6px] px-6 max-w-[960px] rounded-[12px]" // Compact
        : "py-[16px] px-8 max-w-[1040px] rounded-[16px]"; // Expanded/Authority

    const ctaClasses = isScrolled
        ? "py-[8px] px-5 text-[10px]"
        : "py-[10px] px-7 text-[11px]";

    // The anchor remains fixed to reserve space in the DOM flow
    const navLayoutHeight = "h-[80px]";

    return (
        // Wrapper: Sticky and centered. pointer-events-none to allow clicking through the spacer.
        <div className="sticky top-6 z-50 w-full flex justify-center items-start pointer-events-none px-4">

            {/* The Layout Anchor: This stays in-flow and reserves space so content doesn't shift */}
            <div className={`relative w-full flex justify-center transition-all duration-500 overflow-visible ${navLayoutHeight} ${isScrolled ? 'max-w-[960px]' : 'max-w-[1040px]'}`}>

                {/* 
                    The Navigation Object: 
                    Absolute-positioned so it floats OVER the hero during expansion.
                    This fixes the "gray bars" because the container doesn't physically expand the layout width.
                */}
                <nav
                    ref={containerRef}
                    className={`
                        absolute top-0 left-0 w-full bg-[#FDFCFC] border border-[#E5E5E5] text-gray-900
                        shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)]
                        transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                        pointer-events-auto flex flex-col overflow-hidden origin-top
                        ${containerClasses}
                    `}
                    onMouseLeave={() => setIsExpanded(false)}
                >
                    {/* 1. Header Strip (Visible Always) */}
                    <div className="flex items-center justify-between w-full relative z-20 bg-[#FDFCFC]">

                        {/* Left: Hamburger Trigger */}
                        <div
                            className="flex-1 flex justify-start items-center relative z-40 h-full py-1 pr-6 cursor-pointer"
                            onMouseEnter={() => setIsExpanded(true)}
                            onClick={() => setIsExpanded((prev) => !prev)}
                        >
                            <button
                                className="group text-gray-400 hover:text-gray-900 transition-all duration-300 focus:outline-none relative w-6 h-6"
                                aria-label="Toggle Navigation"
                            >
                                <Menu className={`w-6 h-6 absolute top-0 left-0 transition-all duration-300 ${isExpanded ? 'rotate-90 opacity-0 scale-75' : 'rotate-0 opacity-100 scale-100'}`} />
                                <X className={`w-6 h-6 absolute top-0 left-0 transition-all duration-300 ${isExpanded ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-75'}`} />
                            </button>
                        </div>

                        {/* Center: Mevoq Wordmark */}
                        <div className="flex-none flex justify-center items-center h-full relative z-50">
                            <Link href="/" className="group block cursor-pointer" onClick={() => setIsExpanded(false)}>
                                <span className={`
                                    font-serif font-bold text-primary-navy tracking-tight 
                                    transition-all duration-300 leading-none inline-block
                                    hover:opacity-70
                                    ${isScrolled ? 'text-lg' : 'text-2xl'}
                                `}>
                                    Mevoq.
                                </span>
                            </Link>
                        </div>

                        {/* Right: CTA */}
                        <div className="flex-1 flex justify-end items-center z-30">
                            <Link
                                href="/contact"
                                className={`
                                    inline-flex items-center justify-center 
                                    font-bold uppercase tracking-[0.15em] text-white
                                    bg-[#0F172A] rounded-[4px] transition-all duration-300
                                    hover:bg-[#334155] hover:translate-y-[1px]
                                    active:translate-y-[2px] active:shadow-none
                                    ${ctaClasses}
                                `}
                            >
                                Consult With Us
                            </Link>
                        </div>
                    </div>

                    {/* 2. Expansion Panel Wrapper (CSS Grid Height Transition) */}
                    <div
                        className={`
                            grid transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                            ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'}
                        `}
                    >
                        <div className="overflow-hidden w-full relative z-10 bg-[#FDFCFC]">
                            <div className="w-full pt-8 pb-4 border-t border-gray-100 mt-2">
                                <div className={`grid grid-cols-12 gap-0 transition-all duration-500 delay-75 ${isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>

                                    {/* Column 1: Categories (Tabs) */}
                                    <div className="col-span-3 border-r border-gray-100 pr-2 flex flex-col gap-2">
                                        {Object.keys(NAV_DATA).map((key) => {
                                            const isActive = activeTab === key;
                                            const item = NAV_DATA[key];
                                            return (
                                                <Link
                                                    key={key}
                                                    href={item.rootHref || item.href}
                                                    onMouseEnter={() => setActiveTab(key)}
                                                    onClick={() => setIsExpanded(false)}
                                                    className={`
                                                    w-full text-left px-5 py-4 text-sm font-medium tracking-wide transition-all duration-200
                                                    rounded-lg block
                                                    ${isActive
                                                            ? 'bg-gray-50 text-primary-navy font-bold'
                                                            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50/50'
                                                        }
                                                `}
                                                >
                                                    {item.label}
                                                </Link>
                                            );
                                        })}
                                    </div>

                                    {/* Column 2: Content Area */}
                                    <div className="col-span-9 pl-10 pt-2 flex flex-col">
                                        {activeTab && NAV_DATA[activeTab] && (
                                            <div className="animate-in fade-in slide-in-from-right-4 duration-300 w-full" key={activeTab}>
                                                <div className="mb-10">
                                                    <span className="text-[10px] font-bold text-primary-teal uppercase tracking-widest block mb-3">
                                                        {NAV_DATA[activeTab].id} — {NAV_DATA[activeTab].label}
                                                    </span>
                                                    <h3 className="text-2xl font-serif text-primary-navy max-w-md leading-tight">
                                                        {NAV_DATA[activeTab].description}
                                                    </h3>
                                                </div>

                                                <div className="grid grid-cols-2 gap-x-16 gap-y-4 max-w-2xl">
                                                    {NAV_DATA[activeTab].links.map((link, idx) => (
                                                        <Link
                                                            key={idx}
                                                            href={link.href}
                                                            onClick={() => setIsExpanded(false)}
                                                            className="group flex items-center justify-between py-3 text-sm text-gray-600 hover:text-primary-navy transition-colors border-b border-gray-100 hover:border-gray-300"
                                                        >
                                                            <span className="font-medium">{link.label}</span>
                                                            <span className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 text-primary-teal">
                                                                <ArrowIcon />
                                                            </span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}

// Simple Arrow Component for local use
function ArrowIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
