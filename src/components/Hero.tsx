'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const Hero = () => {
    const headingRef = useRef<HTMLHeadingElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!headingRef.current) return;

        const ctx = gsap.context(() => {
            // Split text animation for "Spotless."
            const heading = headingRef.current;
            if (heading) {
                const text = 'Spotless.';
                heading.innerHTML = text.split('').map((char) =>
                    `<span class="hero-char inline-block" style="opacity: 0; transform: translateY(50px) rotateX(-90deg);">${char}</span>`
                ).join('');

                const chars = heading.querySelectorAll('.hero-char');

                gsap.to(chars, {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    stagger: 0.1,
                    duration: 1,
                    delay: 2.8,
                    ease: 'power4.out',
                });
            }

            // Image reveal animation
            if (imageContainerRef.current) {
                gsap.fromTo(imageContainerRef.current,
                    {
                        opacity: 0,
                        scale: 0.95,
                        y: 30,
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 1,
                        delay: 3.2,
                        ease: 'power3.out',
                    }
                );
            }

        }, headingRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="w-full px-4 sm:px-6 md:px-10 pt-6 sm:pt-8 pb-4 sm:pb-6 bg-[#F7F9F6]">
            <h1
                ref={headingRef}
                className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-[#1F3D2B] text-center mb-6 sm:mb-8 md:mb-12 italic"
                style={{ perspective: '1000px' }}
            >
                Spotless.
            </h1>

            <div className="max-w-5xl mx-auto">
                <motion.div
                    ref={imageContainerRef}
                    className="bg-[#E6EFEA] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_4px_16px_rgba(31,61,43,0.08)] sm:shadow-[0_8px_32px_rgba(31,61,43,0.10)]"
                    whileHover={{
                        boxShadow: '0 16px 48px rgba(31,61,43,0.15)',
                        scale: 1.01
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <Image
                        src="/img1.png"
                        alt="Ultrasonic Jewelry Cleaner"
                        width={1280}
                        height={720}
                        className="w-full h-auto object-cover"
                        priority
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
