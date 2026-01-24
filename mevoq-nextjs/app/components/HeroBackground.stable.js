'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function HeroBackground() {
    const [isRevealed, setIsRevealed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Trigger reveal at ~25% of viewport height
            if (!isRevealed && window.scrollY > window.innerHeight * 0.25) {
                setIsRevealed(true);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isRevealed]);

    return (
        <>
            {/* Layer 1: Radial Light (Depth behind text) */}
            <div
                className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0) 60%)'
                }}
            />

            {/* Layer 2: Visual Anchor (Scroll-Revealed Regulatory Artifact) */}
            <div
                className="absolute top-[15%] right-[-5%] md:right-[5%] w-[50vw] md:w-[35vw] aspect-[4/5] z-0 pointer-events-none transition-transform duration-700 ease-out will-change-transform bg-white border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.08)]"
                style={{
                    transform: isRevealed ? 'translateX(0)' : 'translateX(120%)'
                }}
            >
                <div className="relative w-full h-full overflow-hidden">
                    <Image
                        src="/images/regulatory_visual_anchor.png"
                        alt="Regulatory Process Schematic"
                        fill
                        sizes="(max-width: 768px) 50vw, 35vw"
                        className="object-cover object-left"
                        priority
                    />
                </div>
            </div>

            {/* Layer 3: Directional Shadow (Right edge definition) */}
            <div className="absolute inset-y-0 right-0 w-[15%] bg-gradient-to-l from-[#00000005] to-transparent z-0 pointer-events-none" />
        </>
    );
}
