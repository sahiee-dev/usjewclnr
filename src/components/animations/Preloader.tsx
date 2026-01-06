'use client';

import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
    onComplete?: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
    const [isComplete, setIsComplete] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    setIsComplete(true);
                    onComplete?.();
                }
            });

            // Animate counter from 0 to 100
            const counter = { value: 0 };
            tl.to(counter, {
                value: 100,
                duration: 2,
                ease: 'power2.inOut',
                onUpdate: () => {
                    if (counterRef.current) {
                        counterRef.current.textContent = Math.round(counter.value).toString();
                    }
                }
            }, 0);

            // Animate progress bar
            tl.to(progressRef.current, {
                width: '100%',
                duration: 2,
                ease: 'power2.inOut',
            }, 0);

            // Split and animate text characters
            if (textRef.current) {
                const text = 'Spotless.';
                textRef.current.innerHTML = text.split('').map(char =>
                    `<span class="char inline-block opacity-0 translate-y-8">${char}</span>`
                ).join('');

                const chars = textRef.current.querySelectorAll('.char');
                tl.to(chars, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.08,
                    duration: 0.5,
                    ease: 'back.out(1.7)',
                }, 0.3);
            }

            // Final reveal animation
            tl.to(containerRef.current, {
                yPercent: -100,
                duration: 0.8,
                ease: 'power4.inOut',
            }, 2.5);

        }, containerRef);

        return () => ctx.revert();
    }, [onComplete]);

    if (isComplete) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] bg-[#1F3D2B] flex flex-col items-center justify-center px-4"
        >
            {/* Animated background shapes */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-[#2E7D5A]/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-[#9FD3C7]/10 rounded-full blur-3xl animate-pulse delay-500" />
            </div>

            {/* Logo shapes */}
            <div className="flex items-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 relative z-10">
                <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-[#9FD3C7] rounded-sm animate-bounce" style={{ animationDelay: '0s' }} />
                <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-[#9FD3C7] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-0 h-0 border-l-[8px] sm:border-l-[10px] md:border-l-[12px] border-l-transparent border-r-[8px] sm:border-r-[10px] md:border-r-[12px] border-r-transparent border-b-[14px] sm:border-b-[17px] md:border-b-[21px] border-b-[#9FD3C7] animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>

            {/* Main text */}
            <div
                ref={textRef}
                className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white italic mb-6 sm:mb-8 relative z-10"
            />

            {/* Progress bar container */}
            <div className="w-32 sm:w-40 md:w-48 h-1 bg-white/20 rounded-full overflow-hidden relative z-10">
                <div
                    ref={progressRef}
                    className="h-full bg-gradient-to-r from-[#9FD3C7] to-[#2E7D5A] rounded-full"
                    style={{ width: '0%' }}
                />
            </div>

            {/* Counter */}
            <div className="mt-3 sm:mt-4 text-white/60 text-xs sm:text-sm font-mono relative z-10">
                <span ref={counterRef}>0</span>%
            </div>
        </div>
    );
};

export default Preloader;
