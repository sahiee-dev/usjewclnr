'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const TraditionalComparison = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (!headingRef.current || !textRef.current) return;

        const ctx = gsap.context(() => {
            // Simple fade animations for mobile compatibility
            gsap.fromTo(headingRef.current,
                { opacity: 0, x: -30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    }
                }
            );

            gsap.fromTo(textRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    }
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full px-4 sm:px-6 md:px-10 py-4 sm:py-6 bg-[#F7F9F6]">
            <div className="max-w-5xl mx-auto">
                <div className="max-w-lg">
                    <h2
                        ref={headingRef}
                        className="text-[#1F3D2B] text-base sm:text-lg md:text-xl font-semibold mb-2"
                    >
                        Where Traditional Fails, Ultrasonic Prevails
                    </h2>
                    <p
                        ref={textRef}
                        className="text-[#1F3D2B] text-base sm:text-lg md:text-xl font-medium leading-relaxed"
                    >
                        Polishing cloths leave residue. Brushes skip tight settings. Harsh chemicals may harm stones and metals.
                        Our ultrasonic jewelry cleaner reaches under prongs, between links, and inside every setting, lifting away dirt, oil, and build-up.
                        Restore brilliance. Protect every cherished piece.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default TraditionalComparison;
