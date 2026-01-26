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
            className="py-32 bg-white border-y border-gray-100 relative overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="container px-4 mx-auto lg:px-8">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-6">
                    <div>
                        <span className="font-mono text-[10px] font-bold text-primary-teal uppercase tracking-[0.25em] block mb-4">
                            Client Testimonials
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl text-primary-navy">
                            Trusted Partnerships
                        </h2>
                    </div>
                    <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
                        Perspectives from regulatory leaders who have partnered with Mevoq on complex submissions.
                    </p>
                </div>

                {/* Testimonial Content */}
                <div className="max-w-5xl mx-auto relative">
                    {/* Quote Icon */}
                    <div className="absolute -top-4 -left-4 md:-left-12 opacity-10">
                        <Quote className="w-20 h-20 md:w-32 md:h-32 text-primary-teal" />
                    </div>

                    {/* Main Testimonial Card */}
                    <div
                        className={`
                            bg-gradient-to-br from-gray-50 to-white 
                            border border-gray-100 
                            p-8 md:p-12 lg:p-16 
                            relative z-10
                            transition-all duration-500 ease-out
                            ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
                        `}
                    >
                        {/* Content */}
                        <blockquote className="mb-10">
                            <p className="font-serif text-xl md:text-2xl lg:text-3xl text-primary-navy leading-relaxed">
                                "{currentTestimonial.content}"
                            </p>
                        </blockquote>

                        {/* Author */}
                        <div className="flex items-center gap-6">
                            {/* Avatar */}
                            {currentTestimonial.avatar_url ? (
                                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-gray-100 flex-shrink-0">
                                    <img
                                        src={currentTestimonial.avatar_url}
                                        alt={currentTestimonial.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary-teal/20 to-primary-navy/10 flex items-center justify-center flex-shrink-0">
                                    <span className="font-serif text-xl md:text-2xl text-primary-navy font-bold">
                                        {currentTestimonial.name?.charAt(0) || 'M'}
                                    </span>
                                </div>
                            )}

                            {/* Name & Role */}
                            <div>
                                <div className="font-bold text-primary-navy text-lg">
                                    {currentTestimonial.name}
                                </div>
                                <div className="text-gray-500 text-sm">
                                    {currentTestimonial.role}
                                    {currentTestimonial.company && (
                                        <span className="text-primary-teal"> · {currentTestimonial.company}</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary-teal/5 to-transparent pointer-events-none" />
                        <div className="absolute top-0 right-0 w-1 h-24 bg-gradient-to-b from-primary-teal/30 to-transparent" />
                    </div>

                    {/* Navigation */}
                    {testimonials.length > 1 && (
                        <div className="flex items-center justify-between mt-10">
                            {/* Dots */}
                            <div className="flex items-center gap-3">
                                {testimonials.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => goToIndex(idx)}
                                        className={`
                                            transition-all duration-300
                                            ${idx === currentIndex
                                                ? 'w-8 h-2 bg-primary-teal rounded-full'
                                                : 'w-2 h-2 bg-gray-300 hover:bg-gray-400 rounded-full'
                                            }
                                        `}
                                        aria-label={`Go to testimonial ${idx + 1}`}
                                    />
                                ))}
                            </div>

                            {/* Arrows */}
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={goToPrev}
                                    className="w-12 h-12 flex items-center justify-center border border-gray-200 text-gray-400 hover:text-primary-navy hover:border-primary-navy transition-all duration-300 rounded-sm"
                                    aria-label="Previous testimonial"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={goToNext}
                                    className="w-12 h-12 flex items-center justify-center border border-gray-200 text-gray-400 hover:text-primary-navy hover:border-primary-navy transition-all duration-300 rounded-sm"
                                    aria-label="Next testimonial"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Index Indicator */}
                    <div className="absolute -bottom-2 right-0 font-mono text-[10px] text-gray-300 tracking-widest">
                        [{String(currentIndex + 1).padStart(2, '0')}/{String(testimonials.length).padStart(2, '0')}]
                    </div>
                </div>
            </div>
        </section>
    );
}
