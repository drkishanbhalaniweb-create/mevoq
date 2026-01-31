import Link from 'next/link';
import { Award, Users, Globe, Target, ArrowRight } from 'lucide-react';
import OrganicVectorField from '@/app/components/OrganicVectorField';

// Enable ISR - Revalidate daily
export const revalidate = 86400;

export const metadata = {
    title: 'About Mevoq | Pharmaceutical Regulatory Consulting Experts',
    description: 'We are a team of industry experts dedicated to accelerating drug development and global regulatory approvals.',
    alternates: {
        canonical: '/about',
    },
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#F8FAFC]">

            {/* Hero Section: The Founding Intent */}
            <section className="relative py-24 sm:py-32 overflow-hidden border-b border-gray-200/50">
                <OrganicVectorField variant="hero" className="absolute top-0 right-0 w-2/3 h-full opacity-[0.3]" />

                <div className="container relative mx-auto px-4 lg:px-8">
                    <div className="max-w-4xl">
                        <div className="mb-6">
                            <span className="font-mono text-[10px] font-bold text-primary-teal uppercase tracking-[0.3em] border-l-2 border-primary-teal pl-4 py-1">
                                Institutional Background [EST. 2014]
                            </span>
                        </div>
                        <h1 className="text-4xl font-serif text-primary-navy sm:text-7xl mb-10 leading-[1.05]">
                            Advancing Global Health Through <br />
                            <span className="italic">Regulatory Excellence.</span>
                        </h1>
                        <p className="max-w-2xl text-xl text-gray-500 leading-relaxed">
                            We bridge the gap between scientific innovation and regulatory approval. With over 11 years of experience, Mevoq is the partner pharma companies trust to navigate the complex path to market.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision: The Executive Summary */}
            <section className="py-32">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
                        <div className="lg:col-span-7">
                            <span className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6 block">
                                MISSION STATEMENT
                            </span>
                            <h2 className="text-3xl md:text-5xl font-serif text-primary-navy mb-8 leading-tight">
                                To Accelerate the Availability of <br />
                                Life-Saving Therapies.
                            </h2>
                            <div className="space-y-6 text-lg text-gray-600 leading-relaxed max-w-2xl">
                                <p>
                                    At Mevoq, we believe that regulatory hurdles should never be the reason a patient waits for a cure. Our mission is to provide the strategic foresight and technical precision required to move drugs through the approval process efficiently, without compromising on safety or quality.
                                </p>
                                <p>
                                    Founded by a team of industry veterans, we bring a unique dual perspective to every project. We understand what regulators need to see, and we know the operational realities of drug development.
                                </p>
                            </div>
                        </div>

                        <div className="lg:col-span-1 hidden lg:block h-32 border-l border-gray-100 mt-20"></div>

                        <div className="lg:col-span-4 lg:pt-20">
                            <div className="space-y-12">
                                {[
                                    { icon: Award, title: 'Uncompromising Excellence', desc: 'Clinical quality in every submission and strategy.' },
                                    { icon: Users, title: 'Direct Partnership', desc: 'We operate as an extension of your primary team.' },
                                    { icon: Globe, title: 'Global Coverage', desc: 'Expertise across FDA, EMA, PMDA, and Health Canada.' }
                                ].map((item, idx) => (
                                    <div key={idx} className="group flex flex-col items-start">
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="font-mono text-[10px] font-bold text-primary-teal">
                                                0{idx + 1}
                                            </span>
                                            <h3 className="font-serif text-xl text-primary-navy">{item.title}</h3>
                                        </div>
                                        <p className="text-sm text-gray-400 leading-relaxed border-l border-gray-100 pl-6 ml-1.5">
                                            {item.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Engagement CTA */}
            <section className="py-32 bg-[#F1F3F5] border-t border-gray-200/50 relative overflow-hidden">
                <OrganicVectorField variant="edge-right" className="absolute top-0 right-0 w-1/2 h-full opacity-[0.2]" />

                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-4xl font-serif text-primary-navy mb-8">Ready to Accelerate Your Program?</h2>
                        <p className="text-lg text-gray-500 mb-10 leading-relaxed">
                            Whether you are in early discovery or preparing for an NDA submission, our team is ready to support your regulatory journey.
                        </p>
                        <Link
                            href="/contact"
                            className="btn-authority px-10 py-5 font-bold tracking-widest"
                        >
                            Request Expert Analysis
                        </Link>
                    </div>
                </div>
            </section>
        </main >
    );
}
