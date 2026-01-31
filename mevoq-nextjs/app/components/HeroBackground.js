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

            {/* Layer 2: Optimized Background Image */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
                <Image
                    src="/images/regulatory_visual_anchor.png"
                    alt="Regulatory Process Schematic"
                    fill
                    className="object-cover blur-[5px] opacity-[0.6] grayscale contrast-125 mix-blend-darken"
                    priority
                    quality={75}
                    sizes="100vw"
                />
            </div>

            {/* Layer 3: CSS-based Paper Texture (removed external CDN) */}
            <div 
                className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat'
                }}
            />
        </>
    );
}
