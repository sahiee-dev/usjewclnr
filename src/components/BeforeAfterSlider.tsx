'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

const BeforeAfterSlider = () => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number | null>(null);
    const timeRef = useRef(0);

    // Auto-animation effect
    useEffect(() => {
        if (hasInteracted) return;

        const animate = () => {
            timeRef.current += 0.02;
            const newPosition = 50 + Math.sin(timeRef.current) * 15;
            setSliderPosition(newPosition);
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [hasInteracted]);

    const handleMove = useCallback((clientX: number) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setSliderPosition(percentage);
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setHasInteracted(true);
        handleMove(e.clientX);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        handleMove(e.clientX);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        setHasInteracted(true);
        handleMove(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        handleMove(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-video rounded-3xl overflow-hidden cursor-ew-resize select-none shadow-[0_8px_32px_rgba(31,61,43,0.15)]"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* After Image (Background) */}
            <div className="absolute inset-0">
                <Image
                    src="/after.png"
                    alt="After cleaning"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Before Image (Clipped) */}
            <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <Image
                    src="/before.png"
                    alt="Before cleaning"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Slider Line */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
                {/* Slider Handle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#2E7D5A]/20 backdrop-blur-md border border-white/60 flex items-center justify-center shadow-xl">
                    <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Before Label - Glassmorphic */}
            <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-[#1F3D2B]/20 backdrop-blur-md border border-white/30 shadow-lg">
                <span className="text-white text-sm font-semibold tracking-wide">BEFORE</span>
            </div>

            {/* After Label - Glassmorphic */}
            <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-[#2E7D5A]/30 backdrop-blur-md border border-white/30 shadow-lg">
                <span className="text-white text-sm font-semibold tracking-wide">AFTER</span>
            </div>

            {/* Instruction hint */}
            {!hasInteracted && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-[#1F3D2B]/40 backdrop-blur-md border border-white/20 animate-pulse">
                    <span className="text-white text-xs font-medium">Drag to compare</span>
                </div>
            )}
        </div>
    );
};

export default BeforeAfterSlider;
