'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface HorizontalScrollProps {
    children: ReactNode;
    className?: string;
}

const HorizontalScroll = ({ children, className = '' }: HorizontalScrollProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !scrollerRef.current) return;

        const scrollWidth = scrollerRef.current.scrollWidth;
        const containerWidth = containerRef.current.offsetWidth;

        const ctx = gsap.context(() => {
            gsap.to(scrollerRef.current, {
                x: -(scrollWidth - containerWidth),
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 1,
                    start: 'top top',
                    end: () => `+=${scrollWidth - containerWidth}`,
                    invalidateOnRefresh: true,
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className={`overflow-hidden ${className}`}>
            <div ref={scrollerRef} className="flex">
                {children}
            </div>
        </div>
    );
};

export default HorizontalScroll;
