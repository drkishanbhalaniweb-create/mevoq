'use client';

import Image from 'next/image';

export default function HeroBackground() {
    return (
        <>
            {/* Layer 1: Radial Light (Depth behind text) */}
            <div
                className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.4) 0%, rgba(248, 250, 252, 0) 60%)'
                }}
            />

            {/* Layer 2: Experimental Full-Viewport Background with Blur */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
                <Image
                    src="/images/regulatory_visual_anchor.png"
                    alt="Regulatory Process Schematic"
                    fill
                    className="object-cover blur-[5px] opacity-[0.6] grayscale contrast-125 mix-blend-darken"
                    priority
                />
            </div>

            {/* Layer 3: Subtle Paper Grain Overlay (Optional but adds to 'lift' feel) */}
            <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper.png')]" />
        </>
    );
}
