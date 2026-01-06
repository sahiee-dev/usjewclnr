'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
    children: ReactNode;
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    trigger?: {
        start?: string;
        end?: string;
        scrub?: boolean | number;
        markers?: boolean;
    };
    className?: string;
    stagger?: number;
    childSelector?: string;
}

const ScrollReveal = ({
    children,
    from = { opacity: 0, y: 60 },
    to = { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
    trigger = { start: 'top 80%', end: 'bottom 20%' },
    className = '',
    stagger = 0,
    childSelector,
}: ScrollRevealProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            const targets = childSelector
                ? containerRef.current!.querySelectorAll(childSelector)
                : containerRef.current;

            gsap.fromTo(targets, from, {
                ...to,
                stagger: stagger > 0 ? stagger : undefined,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: trigger.start,
                    end: trigger.end,
                    scrub: trigger.scrub,
                    markers: trigger.markers,
                    toggleActions: 'play none none reverse',
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, [from, to, trigger, stagger, childSelector]);

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
};

export default ScrollReveal;
