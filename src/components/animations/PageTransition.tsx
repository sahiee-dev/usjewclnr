'use client';

import { useRef, useCallback } from 'react';
import { gsap } from 'gsap';

interface PageTransitionProps {
    children: React.ReactNode;
}

export const usePageTransition = () => {
    const overlayRef = useRef<HTMLDivElement | null>(null);

    const navigateWithTransition = useCallback((targetId: string) => {
        // Create overlay if it doesn't exist
        if (!overlayRef.current) {
            const overlay = document.createElement('div');
            overlay.id = 'page-transition-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: #2E7D5A;
                z-index: 9998;
                transform: scaleX(0);
                transform-origin: left center;
            `;
            document.body.appendChild(overlay);
            overlayRef.current = overlay;
        }

        const overlay = overlayRef.current;

        // GSAP Timeline for transition
        const tl = gsap.timeline();

        // Phase 1: Emerald green wipe from left to right
        tl.to(overlay, {
            scaleX: 1,
            duration: 0.4,
            ease: 'power3.inOut',
            transformOrigin: 'left center',
        });

        // Phase 2: Change color to white
        tl.to(overlay, {
            backgroundColor: '#F7F9F6',
            duration: 0.15,
            ease: 'none',
        });

        // Phase 3: Scroll to target while covered
        tl.call(() => {
            const target = document.getElementById(targetId);
            if (target) {
                // Scroll instantly (no animation since it's covered)
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'instant' as ScrollBehavior,
                });

                // Focus on first input if it's a form
                const firstInput = target.querySelector('input, textarea') as HTMLInputElement;
                if (firstInput) {
                    setTimeout(() => firstInput.focus(), 500);
                }
            }
        });

        // Phase 4: Reveal by wiping off to right
        tl.to(overlay, {
            scaleX: 0,
            duration: 0.4,
            ease: 'power3.inOut',
            transformOrigin: 'right center',
        });

        // Reset for next use
        tl.set(overlay, {
            backgroundColor: '#2E7D5A',
            transformOrigin: 'left center',
        });

    }, []);

    return { navigateWithTransition };
};

// Provider component (optional wrapper)
export const PageTransitionProvider = ({ children }: PageTransitionProps) => {
    return <>{children}</>;
};

export default PageTransitionProvider;
