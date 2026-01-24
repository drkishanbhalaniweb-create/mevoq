'use client';

import { useEffect, useState, useRef } from 'react';

export default function AnimatedCounter({ end, duration = 6000 }) {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect(); // Trigger once
                }
            },
            { threshold: 0.1 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isInView) return;

        let startTime = null;
        let animationFrameId;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;

            // Check if duration has elapsed
            if (progress >= duration) {
                setCount(end);
                return;
            }

            // Linear progress to ensure it takes exactly the full duration
            const percentage = progress / duration;

            const currentCount = Math.floor(percentage * end);
            setCount(currentCount);

            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [isInView, end, duration]);

    return <span ref={countRef}>{count}</span>;
}
