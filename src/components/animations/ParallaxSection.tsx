'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxSectionProps {
    children: ReactNode;
    className?: string;
    speed?: number;
    direction?: 'up' | 'down';
}

const ParallaxSection = ({
    children,
    className = '',
    speed = 0.5,
    direction = 'up'
}: ParallaxSectionProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !contentRef.current) return;

        const yValue = direction === 'up' ? -100 * speed : 100 * speed;

        const ctx = gsap.context(() => {
            gsap.fromTo(contentRef.current,
                { y: direction === 'up' ? 100 * speed : -100 * speed },
                {
                    y: yValue,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, [speed, direction]);

    return (
        <div ref={containerRef} className={`overflow-hidden ${className}`}>
            <div ref={contentRef}>
                {children}
            </div>
        </div>
    );
};

export default ParallaxSection;
