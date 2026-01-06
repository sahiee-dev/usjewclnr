'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface SplitTextRevealProps {
    children: string;
    className?: string;
    type?: 'chars' | 'words' | 'lines';
    stagger?: number;
    duration?: number;
    scrub?: boolean | number;
    start?: string;
    end?: string;
    markers?: boolean;
}

const SplitTextReveal = ({
    children,
    className = '',
    type = 'chars',
    stagger = 0.03,
    duration = 0.8,
    scrub = false,
    start = 'top 80%',
    end = 'top 20%',
    markers = false,
}: SplitTextRevealProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!containerRef.current || hasAnimated.current) return;

        const container = containerRef.current;
        const text = children;

        // Split text based on type
        let elements: string[];
        if (type === 'chars') {
            elements = text.split('');
        } else if (type === 'words') {
            elements = text.split(' ');
        } else {
            elements = [text];
        }

        // Create spans for each element
        container.innerHTML = elements.map((el, i) => {
            const content = type === 'words' && i < elements.length - 1
                ? el + '\u00A0'
                : el === ' ' ? '\u00A0' : el;
            return `<span class="split-element inline-block" style="opacity: 0; transform: translateY(100px) rotateX(-80deg); transform-origin: center top;">${content}</span>`;
        }).join('');

        const splitElements = container.querySelectorAll('.split-element');

        const ctx = gsap.context(() => {
            if (scrub) {
                // Scrub animation - follows scroll position
                gsap.to(splitElements, {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    stagger: stagger,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: container,
                        start: start,
                        end: end,
                        scrub: typeof scrub === 'number' ? scrub : 1,
                        markers: markers,
                    }
                });
            } else {
                // Trigger-based animation
                gsap.to(splitElements, {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    stagger: stagger,
                    duration: duration,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: container,
                        start: start,
                        toggleActions: 'play none none reverse',
                        markers: markers,
                    }
                });
            }
            hasAnimated.current = true;
        }, containerRef);

        return () => ctx.revert();
    }, [children, type, stagger, duration, scrub, start, end, markers]);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{ perspective: '1000px' }}
        >
            {children}
        </div>
    );
};

export default SplitTextReveal;
