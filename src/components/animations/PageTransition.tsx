'use client';

import { useRef, useCallback } from 'react';
import { gsap } from 'gsap';

interface PageTransitionProps {
    children: React.ReactNode;
}

export const usePageTransition = () => {
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const overlayRef2 = useRef<HTMLDivElement | null>(null);

    const createOverlays = () => {
        // Create first overlay (emerald green)
        if (!overlayRef.current) {
            const overlay = document.createElement('div');
            overlay.id = 'page-transition-overlay-1';
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

        // Create second overlay (cream/beige)
        if (!overlayRef2.current) {
            const overlay2 = document.createElement('div');
            overlay2.id = 'page-transition-overlay-2';
            overlay2.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: #F5F0E8;
                z-index: 9997;
                transform: scaleX(0);
                transform-origin: left center;
            `;
            document.body.appendChild(overlay2);
            overlayRef2.current = overlay2;
        }
    };

    const navigateWithTransition = useCallback((targetId: string, focusInput = true) => {
        createOverlays();

        const overlay1 = overlayRef.current;
        const overlay2 = overlayRef2.current;

        if (!overlay1 || !overlay2) return;

        const tl = gsap.timeline();

        // Phase 1: Cream wipe from left
        tl.set(overlay2, { transformOrigin: 'left center', scaleX: 0 });
        tl.to(overlay2, {
            scaleX: 1,
            duration: 0.3,
            ease: 'power2.inOut',
        });

        // Phase 2: Emerald green wipe follows
        tl.set(overlay1, { transformOrigin: 'left center', scaleX: 0 });
        tl.to(overlay1, {
            scaleX: 1,
            duration: 0.35,
            ease: 'power2.inOut',
        }, '-=0.15');

        // Phase 3: Scroll to target while covered
        tl.call(() => {
            const target = document.getElementById(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'instant' as ScrollBehavior,
                });

                if (focusInput) {
                    const firstInput = target.querySelector('input, textarea') as HTMLInputElement;
                    if (firstInput) {
                        setTimeout(() => firstInput.focus(), 600);
                    }
                }
            } else if (targetId === 'top') {
                window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
            }
        });

        // Phase 4: Emerald wipes off to right
        tl.set(overlay1, { transformOrigin: 'right center' });
        tl.to(overlay1, {
            scaleX: 0,
            duration: 0.35,
            ease: 'power2.inOut',
        });

        // Phase 5: Cream wipes off to right
        tl.set(overlay2, { transformOrigin: 'right center' });
        tl.to(overlay2, {
            scaleX: 0,
            duration: 0.3,
            ease: 'power2.inOut',
        }, '-=0.15');

    }, []);

    const navigateToTop = useCallback(() => {
        createOverlays();

        const overlay1 = overlayRef.current;
        const overlay2 = overlayRef2.current;

        if (!overlay1 || !overlay2) return;

        const tl = gsap.timeline();

        // Dual wipe in
        tl.set(overlay2, { transformOrigin: 'left center', scaleX: 0 });
        tl.set(overlay1, { transformOrigin: 'left center', scaleX: 0 });

        tl.to(overlay2, { scaleX: 1, duration: 0.3, ease: 'power2.inOut' });
        tl.to(overlay1, { scaleX: 1, duration: 0.35, ease: 'power2.inOut' }, '-=0.15');

        // Scroll to top
        tl.call(() => {
            window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        });

        // Dual wipe out
        tl.set(overlay1, { transformOrigin: 'right center' });
        tl.set(overlay2, { transformOrigin: 'right center' });

        tl.to(overlay1, { scaleX: 0, duration: 0.35, ease: 'power2.inOut' });
        tl.to(overlay2, { scaleX: 0, duration: 0.3, ease: 'power2.inOut' }, '-=0.15');

    }, []);

    return { navigateWithTransition, navigateToTop };
};

// Provider component (optional wrapper)
export const PageTransitionProvider = ({ children }: PageTransitionProps) => {
    return <>{children}</>;
};

export default PageTransitionProvider;
