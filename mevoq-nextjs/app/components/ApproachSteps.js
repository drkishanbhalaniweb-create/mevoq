'use client';

import { useEffect, useRef, useState } from 'react';

const steps = [
    { step: '01', title: 'Diagnosis & Strategy', desc: 'We assess your data package against current agency thinking to identify gaps early.' },
    { step: '02', title: 'Submission Planning', desc: 'Detailed roadmap development for IND/CTA through to NDA/MAA filings.' },
    { step: '03', title: 'Agency Interaction', desc: 'Direct representation and meeting facilitation with FDA, EMA, and others.' },
    { step: '04', title: 'Post-Market Support', desc: 'Lifecycle management, labeling updates, and compliance auditing.' }
];

export default function ApproachSteps() {
    const [visibleItems, setVisibleItems] = useState(new Set());
    const observerRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.dataset.index);
                        setVisibleItems((prev) => new Set(prev).add(index));
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: '0px 0px -80px 0px'
            }
        );

        observerRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="relative">
            {/* Procedural Spine - Mechanical Rail */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gray-200"></div>

            {/* Step System */}
            <div className="space-y-16">
                {steps.map((item, idx) => {
                    const isVisible = visibleItems.has(idx);
                    return (
                        <div
                            key={item.step}
                            data-index={idx}
                            ref={(el) => (observerRefs.current[idx] = el)}
                            className={`relative pl-12 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'
                                }`}
                            style={{ transitionDelay: `${idx * 100}ms` }}
                        >
                            {/* Mechanical Tick Marker */}
                            <div className="absolute left-0 top-[6px] w-[9px] h-[1px] bg-primary-navy"></div>
                            <div className="absolute left-[8px] top-[3px] w-[1px] h-[7px] bg-primary-navy"></div>

                            {/* Step Metadata */}
                            <div className="mb-3 flex items-baseline gap-4">
                                <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
                                    {item.step}
                                </span>
                                <div className="h-[1px] flex-1 bg-gray-100 max-w-[60px]"></div>
                            </div>

                            {/* Step Content */}
                            <h4 className="font-serif text-2xl text-primary-navy mb-3 leading-tight max-w-md">
                                {item.title}
                            </h4>
                            <p className="text-gray-600 text-base leading-relaxed max-w-md">
                                {item.desc}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
