import { getTestimonials } from '@/lib/supabase';
import TestimonialsSection from '@/app/components/TestimonialsSection';
import OrganicVectorField from '@/app/components/OrganicVectorField';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
    title: 'Client Stories | Mevoq Regulatory Consulting',
    description: 'Read how Mevoq has helped pharmaceutical and biotech companies navigate complex regulatory landscapes and achieve submission success.',
};

export default async function TestimonialsPage() {
    const testimonials = await getTestimonials();

    return (
        <main className="min-h-screen bg-white pb-24">
            {/* Header Section */}
            <section className="relative pt-48 pb-20 overflow-hidden bg-gray-50 border-b border-gray-100">
                <OrganicVectorField variant="edge-right" className="absolute top-0 right-0 w-1/2 h-full opacity-[0.2]" />

                <div className="container px-4 mx-auto lg:px-8 relative z-10">
                    <div className="max-w-3xl">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-primary-navy transition-colors mb-12 group"
                        >
                            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Back to Home
                        </Link>

                        <div className="mb-6">
                            <span className="font-mono text-[10px] font-bold text-primary-teal uppercase tracking-[0.3em] inline-block px-4 py-1 border border-primary-teal/20 rounded-full">
                                Experience & Trust
                            </span>
                        </div>

                        <h1 className="font-serif text-5xl md:text-6xl text-primary-navy mb-8 leading-tight">
                            Client <span className="italic">Stories</span>
                        </h1>

                        <p className="text-xl text-gray-600 leading-relaxed">
                            A record of precision, reliability, and successful regulatory outcomes across the global pharmaceutical landscape.
                        </p>
                    </div>
                </div>
            </section>

            {/* Testimonials Grid / List */}
            <section className="py-24">
                <div className="container px-4 mx-auto lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {testimonials.map((testimonial, idx) => (
                            <div
                                key={testimonial.id}
                                className="group bg-white border border-gray-100 p-8 md:p-10 hover:border-primary-teal/30 hover:shadow-lg transition-all duration-500 relative flex flex-col justify-between"
                            >
                                {/* Index */}
                                <span className="absolute top-6 right-8 font-mono text-[10px] text-gray-200 group-hover:text-primary-teal/30 transition-colors">
                                    REF: {String(idx + 1).padStart(2, '0')}
                                </span>

                                <div className="relative">
                                    <blockquote className="mb-10">
                                        <p className="font-serif text-lg md:text-xl text-primary-navy leading-relaxed italic">
                                            "{testimonial.content}"
                                        </p>
                                    </blockquote>
                                </div>

                                <div className="flex items-center gap-4 mt-auto pt-8 border-t border-gray-50">
                                    {testimonial.avatar_url ? (
                                        <div className="w-12 h-12 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                                            <img src={testimonial.avatar_url} alt={testimonial.name} className="w-full h-full object-cover" />
                                        </div>
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-primary-navy font-serif font-bold group-hover:bg-primary-teal/10 transition-colors">
                                            {testimonial.name?.charAt(0)}
                                        </div>
                                    )}
                                    <div>
                                        <div className="font-bold text-primary-navy text-sm uppercase tracking-wider">{testimonial.name}</div>
                                        <div className="text-gray-400 text-xs mt-1">
                                            {testimonial.role} <span className="text-primary-teal mx-1">/</span> {testimonial.company}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {testimonials.length === 0 && (
                        <div className="text-center py-20 bg-gray-50 border border-dashed border-gray-200 rounded-lg">
                            <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">Archive Currently Under Review</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Carousel Version (For visual variety) */}
            <TestimonialsSection testimonials={testimonials} />

            {/* Call to Action */}
            <section className="py-24 bg-primary-navy text-white relative overflow-hidden">
                <div className="container px-4 mx-auto lg:px-8 text-center relative z-10">
                    <h2 className="font-serif text-3xl md:text-4xl mb-8">Ready to secure your regulatory milestone?</h2>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center px-10 py-4 bg-white text-primary-navy font-bold uppercase tracking-widest text-xs hover:bg-primary-teal hover:text-white transition-all duration-300 rounded-sm"
                    >
                        Schedule a Consultation
                    </Link>
                </div>
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <OrganicVectorField variant="document" className="w-full h-full" />
                </div>
            </section>
        </main>
    );
}
