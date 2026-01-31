'use client';

import { useState, useEffect, useRef } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * TestimonialsSection Component
 * 
 * A premium testimonials carousel that follows the Mevoq design system.
 * Features smooth animations, auto-rotation, and manual navigation.
 * 
 * @param {Object} props
 * @param {Array} props.testimonials - Array of testimonial objects
 */
export default function TestimonialsSection({ testimonials = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef(null);

    // Auto-rotate testimonials
    useEffect(() => {
        if (testimonials.length <= 1 || isPaused) return;

        intervalRef.current = setInterval(() => {
            goToNext();
        }, 6000); // 6 seconds per testimonial

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [testimonials.length, isPaused, currentIndex]);

    const goToNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const goToPrev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const goToIndex = (index) => {
        if (isAnimating || index === currentIndex) return;
        setIsAnimating(true);
        setCurrentIndex(index);
        setTimeout(() => setIsAnimating(false), 500);
    };

    if (!testimonials || testimonials.length === 0) {
        return null;
    }

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section
            className="py-24 md:py-32 bg-gray-50 border-y border-gray-200/50 relative overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-64 h-64 bg-primary-teal/5 rounded-full blur-3xl mix-blend-multiply" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-navy/5 rounded-full blur-3xl mix-blend-multiply" />
            </div>

            <div className="container px-4 mx-auto lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-px w-8 bg-primary-teal" />
                            <span className="font-mono text-xs font-bold text-primary-teal uppercase tracking-widest">
                                Client Testimonials
                            </span>
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary-navy leading-tight">
                            Trusted <span className="text-primary-teal">Partnerships</span>
                        </h2>
                    </div>
                    <div className="max-w-md">
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed border-l-2 border-gray-200 pl-6">
                            Perspectives from regulatory leaders who have partnered with Mevoq on complex submissions.
                        </p>
                    </div>
                </div>

                {/* Testimonial Content */}
                <div className="max-w-6xl mx-auto relative">
                    {/* Main Testimonial Card */}
                    <div
                        className={`
                            bg-white
                            rounded-[2rem]
                            shadow-[0_20px_50px_rgba(0,0,0,0.04)]
                            p-8 md:p-12 lg:p-20
                            relative
                            transition-all duration-700 ease-out
                            ${isAnimating ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}
                        `}
                    >
                        {/* Quote Decor */}
                        <Quote className="absolute top-8 left-8 md:top-12 md:left-12 w-12 h-12 md:w-16 md:h-16 text-primary-teal/10 rotate-180" />

                        <div className="relative z-10 flex flex-col items-start gap-10 md:gap-14">
                            <blockquote className="max-w-4xl relative">
                                <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-primary-navy leading-normal md:leading-relaxed indent-8 md:indent-12">
                                    {currentTestimonial.content}
                                </p>
                            </blockquote>

                            <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-8 border-t border-gray-100 pt-10">
                                {/* Author */}
                                <div className="flex items-center gap-5">
                                    {currentTestimonial.avatar_url ? (
                                        <div className="w-16 h-16 md:w-18 md:h-18 rounded-full overflow-hidden ring-4 ring-gray-50 shadow-sm">
                                            <img
                                                src={currentTestimonial.avatar_url}
                                                alt={currentTestimonial.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-16 h-16 md:w-18 md:h-18 rounded-full bg-primary-teal/5 flex items-center justify-center ring-4 ring-gray-50 text-primary-teal font-serif text-2xl font-bold">
                                            {currentTestimonial.name?.charAt(0) || 'M'}
                                        </div>
                                    )}

                                    <div>
                                        <div className="font-bold text-primary-navy text-lg md:text-xl">
                                            {currentTestimonial.name}
                                        </div>
                                        <div className="text-gray-500 text-sm md:text-base font-medium mt-1">
                                            {currentTestimonial.role}
                                            {currentTestimonial.company && (
                                                <>
                                                    <span className="text-gray-300 mx-2">|</span>
                                                    <span className="text-primary-teal">{currentTestimonial.company}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Controls */}
                                {testimonials.length > 1 && (
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={goToPrev}
                                            className="group w-14 h-14 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-primary-navy hover:border-primary-navy hover:text-white transition-all duration-300"
                                            aria-label="Previous testimonial"
                                        >
                                            <ChevronLeft className="w-6 h-6 transform group-hover:-translate-x-0.5 transition-transform" />
                                        </button>
                                        <button
                                            onClick={goToNext}
                                            className="group w-14 h-14 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-primary-navy hover:border-primary-navy hover:text-white transition-all duration-300"
                                            aria-label="Next testimonial"
                                        >
                                            <ChevronRight className="w-6 h-6 transform group-hover:translate-x-0.5 transition-transform" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Indicators (Centered Below) */}
                    {testimonials.length > 1 && (
                        <div className="flex justify-center mt-12 gap-3">
                            {testimonials.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => goToIndex(idx)}
                                    className={`
                                        h-1.5 rounded-full transition-all duration-500 ease-out
                                        ${idx === currentIndex
                                            ? 'w-12 bg-primary-teal'
                                            : 'w-2 bg-gray-300 hover:bg-gray-400'
                                        }
                                    `}
                                    aria-label={`Go to testimonial ${idx + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
