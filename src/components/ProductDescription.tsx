'use client';

import React, { useRef, useEffect } from 'react';
import BeforeAfterSlider from './BeforeAfterSlider';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const ProductDescription = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const text1Ref = useRef<HTMLParagraphElement>(null);
    const text2Ref = useRef<HTMLParagraphElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!text1Ref.current || !text2Ref.current) return;

        const ctx = gsap.context(() => {
            // Simple fade in for text on mobile-friendly trigger
            gsap.fromTo(text1Ref.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: text1Ref.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    }
                }
            );

            gsap.fromTo(text2Ref.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: text2Ref.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    }
                }
            );

            // Slider entrance
            if (sliderRef.current) {
                gsap.fromTo(sliderRef.current,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: sliderRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        }
                    }
                );
            }

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full px-4 sm:px-6 md:px-10 py-4 sm:py-6 bg-[#F7F9F6]">
            <div className="max-w-5xl mx-auto">
                {/* Description Text */}
                <div className="mb-6 sm:mb-8">
                    <p
                        ref={text1Ref}
                        className="text-[#1F3D2B] text-base sm:text-lg md:text-xl font-medium leading-relaxed"
                    >
                        Deep cleaning for rings, necklaces, earrings, and more with no risk of scratches.
                    </p>
                    <p
                        ref={text2Ref}
                        className="text-[#1F3D2B] text-base sm:text-lg md:text-xl font-semibold mt-3 sm:mt-4"
                    >
                        Pure ultrasonic waves. Only water. Reveal brilliance in every fine detail.
                    </p>
                </div>

                {/* Before/After Slider */}
                <div ref={sliderRef}>
                    <BeforeAfterSlider />
                </div>
            </div>
        </section>
    );
};

export default ProductDescription;
