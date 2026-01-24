'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * OrganicVectorField
 * 
 * A premium, calm visual anchor for document and content sections.
 * Creates flowing organic curves that subtly respond to cursor proximity.
 * 
 * REMOVAL INSTRUCTIONS:
 * 1. Delete this file: app/components/OrganicVectorField.js
 * 2. Remove import from usage files (e.g., app/page.js)
 * 3. Remove <OrganicVectorField /> JSX
 * 
 * Alternatively, set ENABLE_VECTOR_FIELD = false below.
 */

// Feature flag for easy disable
const ENABLE_VECTOR_FIELD = true;

// Curve generation - organic, asymmetric, grown-not-generated
function generateOrganicCurves(width, height, time, variant) {
    const curves = [];
    const curveCount = (variant === 'edge-left' || variant === 'edge-right') ? 6 : 8;

    // Position presets based on variant
    let centerX = width * 0.5;
    let centerY = height * 0.55;
    let radiusMultiplier = 1;

    switch (variant) {
        case 'hero':
            centerX = width * 0.6;
            centerY = height * 0.45;
            radiusMultiplier = 1.2;
            break;
        case 'document':
            centerX = width * 0.35;
            centerY = height * 0.65;
            radiusMultiplier = 0.9;
            break;
        case 'edge-left':
            centerX = width * 0.1;
            centerY = height * 0.5;
            radiusMultiplier = 1.4;
            break;
        case 'edge-right':
            centerX = width * 0.9;
            centerY = height * 0.5;
            radiusMultiplier = 1.4;
            break;
        default:
            centerX = width * 0.5;
            centerY = height * 0.55;
    }

    for (let i = 0; i < curveCount; i++) {
        const progress = i / (curveCount - 1);

        // Organic offset
        const phaseOffset = i * 0.7;
        const radiusBase = (100 + progress * 320) * radiusMultiplier;

        // Very slow drift
        const drift = time * 0.00008;

        // Generate control points for cubic bezier
        const points = [];
        const segments = 5; // Extra segment for smoother loop at large scale

        for (let j = 0; j <= segments; j++) {
            // Full 360 degree loop for closed shapes
            const angle = (j / segments) * Math.PI * 2;

            const radiusVar = radiusBase * (
                1 +
                0.12 * Math.sin(angle * 2.3 + phaseOffset + drift) +
                0.06 * Math.cos(angle * 3.7 + phaseOffset * 1.4 + drift * 0.7)
            );

            const x = centerX + Math.cos(angle) * radiusVar;
            const y = centerY + Math.sin(angle) * radiusVar * 0.9;

            points.push({ x, y });
        }

        curves.push({
            points,
            opacity: 0.08 - progress * 0.04, // Lowered opacity for text readability inside document
            strokeWidth: 1.1 - progress * 0.3
        });
    }

    return curves;
}

// Smooth bezier path from points
function pointsToPath(points) {
    if (points.length < 2) return '';

    let path = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;

    for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const next = points[i + 1] || points[0]; // Loop back to start

        const cp1x = prev.x + (curr.x - (points[i - 2] || points[points.length - 2]).x) * 0.3;
        const cp1y = prev.y + (curr.y - (points[i - 2] || points[points.length - 2]).y) * 0.3;
        const cp2x = curr.x - (next.x - prev.x) * 0.3;
        const cp2y = curr.y - (next.y - prev.y) * 0.3;

        path += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${curr.x.toFixed(2)} ${curr.y.toFixed(2)}`;
    }

    return path + ' Z'; // Close the shape
}

// Apply cursor deformation - shallow, restrained
function applyDeformation(points, cursor, influence) {
    if (!cursor.active || influence < 0.01) return points;

    return points.map(p => {
        const dx = p.x - cursor.x;
        const dy = p.y - cursor.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Influence radius ~200px, gentle falloff
        const radius = 200;
        const strength = Math.max(0, 1 - dist / radius);
        const deform = strength * strength * 18 * influence; // Shallow deformation

        // Push away from cursor, slightly delayed feel via influence
        const angle = Math.atan2(dy, dx);

        return {
            x: p.x + Math.cos(angle) * deform,
            y: p.y + Math.sin(angle) * deform
        };
    });
}

export default function OrganicVectorField({ className = "", variant = "default" }) {
    const svgRef = useRef(null);
    const rafRef = useRef(null);
    const timeRef = useRef(0);
    const cursorRef = useRef({ x: 0, y: 0, active: false });
    const influenceRef = useRef(0); // Smoothed cursor influence
    const prefersReducedMotion = useRef(false);
    const rectRef = useRef({ width: 0, height: 0, isVisible: false });

    const render = useCallback(() => {
        const svg = svgRef.current;
        if (!svg || !rectRef.current.isVisible) return;

        const { width, height } = rectRef.current;

        // Extremely slow time progression for near-imperceptible drift
        timeRef.current += prefersReducedMotion.current ? 0 : 1;

        // Smooth influence transition (delayed response, slow recovery)
        const targetInfluence = cursorRef.current.active ? 1 : 0;
        const speed = cursorRef.current.active ? 0.03 : 0.008; // Faster engage, slower disengage
        influenceRef.current += (targetInfluence - influenceRef.current) * speed;

        // Generate base curves
        const curves = generateOrganicCurves(width, height, timeRef.current, variant);

        // Apply deformation
        const paths = svg.querySelectorAll('path');
        curves.forEach((curve, i) => {
            if (paths[i]) {
                const deformedPoints = applyDeformation(
                    curve.points,
                    cursorRef.current,
                    influenceRef.current
                );
                paths[i].setAttribute('d', pointsToPath(deformedPoints));
                paths[i].setAttribute('stroke-opacity', curve.opacity);
                paths[i].setAttribute('stroke-width', curve.strokeWidth.toString());
            }
        });

        rafRef.current = requestAnimationFrame(render);
    }, [variant]); // Variant determines the curve math, but render stays stable

    useEffect(() => {
        if (!ENABLE_VECTOR_FIELD) return;

        const svg = svgRef.current;
        if (!svg) return;

        // 1. Check reduced motion preference
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        prefersReducedMotion.current = mediaQuery.matches;
        const handleMotionChange = (e) => prefersReducedMotion.current = e.matches;
        mediaQuery.addEventListener('change', handleMotionChange);

        // 2. Optimized Dimensional Tracking (Avoid Layout Thrashing)
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                rectRef.current.width = width;
                rectRef.current.height = height;
            }
        });
        resizeObserver.observe(svg);

        // 3. Viewport Tracking (Battery Saving)
        const intersectionObserver = new IntersectionObserver((entries) => {
            const [entry] = entries;
            rectRef.current.isVisible = entry.isIntersecting;

            if (entry.isIntersecting) {
                // Restart animation loop when visible
                if (rafRef.current) cancelAnimationFrame(rafRef.current);
                rafRef.current = requestAnimationFrame(render);
            } else {
                // Pause loop when off-screen
                if (rafRef.current) cancelAnimationFrame(rafRef.current);
            }
        }, { threshold: 0.1 });
        intersectionObserver.observe(svg);

        // 4. Cursor Tracking
        const handleMouseMove = (e) => {
            if (!rectRef.current.isVisible) return;

            const rect = svg.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const margin = 100;
            const isNear =
                x > -margin && x < rectRef.current.width + margin &&
                y > -margin && y < rectRef.current.height + margin;

            cursorRef.current = { x, y, active: isNear };
        };

        const handleMouseLeave = () => {
            cursorRef.current.active = false;
        };

        document.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            mediaQuery.removeEventListener('change', handleMotionChange);
        };
    }, [render]);

    if (!ENABLE_VECTOR_FIELD) return null;

    // Initial paths (will be updated by render loop)
    // 7 curves for minimal geometry
    return (
        <svg
            ref={svgRef}
            className={`pointer-events-none ${className}`}
            style={{
                zIndex: 1, // Layered behind text but above container background
                overflow: 'visible',
                willChange: 'auto'
            }}
            preserveAspectRatio="xMidYMid slice"
        >
            {/* 8 organic curves - calm navy tone, very subtle */}
            {Array.from({ length: 8 }).map((_, i) => (
                <path
                    key={i}
                    d=""
                    fill="none"
                    stroke="#1E3A5F" // primary-navy with lower opacity
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            ))}
        </svg>
    );
}
