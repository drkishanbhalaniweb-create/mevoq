'use client';

import { useEffect, useRef, useState } from 'react';

const systemSteps = [
    { id: '01', title: 'Diagnosis & Strategy', desc: 'We assess your data package against current agency thinking to identify gaps early.' },
    { id: '02', title: 'Submission Planning', desc: 'Detailed roadmap development for IND/CTA through to NDA/MAA filings.' },
    { id: '03', title: 'Agency Interaction', desc: 'Direct representation and meeting facilitation with FDA, EMA, and others.' },
    { id: '04', title: 'Post-Market Support', desc: 'Lifecycle management, labeling updates, and compliance auditing.' }
];

export default function RegulatorySystemCanvas() {
    const [visible, setVisible] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-full min-h-[600px] flex items-center">

            {/* 
               SYSTEM DIAGRAM (Technical Canvas)
               - Low contrast
               - Line-based
               - Oversized/Cropped feel
               - No decorative molecular art
            */}
            <div className={`absolute inset-0 transition-opacity duration-[1500ms] ease-linear ${visible ? 'opacity-100' : 'opacity-0'}`}>
                <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="overflow-visible">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" className="text-gray-900/[0.03]" strokeWidth="0.5" />
                        </pattern>
                    </defs>

                    {/* Background Grid - Very Subtle Engineering Graph Paper feel */}
                    <rect width="100%" height="100%" fill="url(#grid)" />

                    {/* Main Pathway Flow - Technical Lines */}
                    <g className="text-gray-300" stroke="currentColor" fill="none" strokeWidth="1">
                        {/* Central Spine */}
                        <path d="M 100 50 L 100 550" className="opacity-50" strokeDasharray="4 4" />

                        {/* Branching Logic Lines */}
                        <path d="M 100 120 L 250 120 L 250 180" />
                        <path d="M 100 240 L 350 240 L 350 300" />
                        <path d="M 100 360 L 200 360 L 200 500" />
                        <path d="M 100 480 L 450 480" />

                        {/* Nodes (Meaningful points only) */}
                        <circle cx="100" cy="120" r="2" fill="currentColor" />
                        <circle cx="250" cy="180" r="2" fill="currentColor" />
                        <circle cx="100" cy="240" r="2" fill="currentColor" />
                        <circle cx="350" cy="300" r="2" fill="currentColor" />
                        <circle cx="100" cy="360" r="2" fill="currentColor" />
                        <circle cx="100" cy="480" r="2" fill="currentColor" />
                    </g>

                    {/* Secondary Context Lines (Fainter) */}
                    <g className="text-gray-200" stroke="currentColor" fill="none" strokeWidth="0.5">
                        <path d="M 50 80 L 750 80" />
                        <path d="M 50 520 L 750 520" />
                        <path d="M 350 0 L 350 600" strokeDasharray="2 2" />
                    </g>
                </svg>
            </div>

            {/* 
               ANNOTATIONS (The Steps)
               - Vertically stacked
               - Aligned to left column edge (implied via padding)
               - Slight horizontal offset into canvas
            */}
            <div className="relative z-10 pl-8 lg:pl-16 space-y-16 py-12">
                {systemSteps.map((step, idx) => (
                    <div
                        key={step.id}
                        className={`group relative flex gap-6 max-w-lg transition-all duration-1000 ease-linear`}
                        style={{
                            transitionDelay: `${idx * 200 + 500}ms`,
                            opacity: visible ? 1 : 0,
                            transform: visible ? 'translateY(0)' : 'translateY(10px)'
                        }}
                    >
                        {/* Connector Line to Diagram Spacing */}
                        <div className="hidden lg:block absolute -left-8 top-5 w-8 h-[1px] bg-gray-300/50"></div>
                        <div className="hidden lg:block absolute -left-8 top-5 w-1 h-1 rounded-full bg-gray-400"></div>

                        {/* Step Number Marker */}
                        <div className="mt-1">
                            <span className="font-mono text-xs text-gray-400 tracking-tight">
                                {step.id}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="space-y-2">
                            <h4 className="font-sans font-medium text-lg text-primary-navy tracking-tight">
                                {step.title}
                            </h4>
                            <p className="text-sm text-gray-500 leading-relaxed font-light max-w-xs">
                                {step.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
