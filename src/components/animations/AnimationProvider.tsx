'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface AnimationProviderProps {
    children: React.ReactNode;
}

const AnimationProvider = ({ children }: AnimationProviderProps) => {
    useEffect(() => {
        // Refresh ScrollTrigger after initial load
        const timeout = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);

        // Refresh ScrollTrigger on resize (debounced)
        let resizeTimeout: ReturnType<typeof setTimeout>;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 200);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearTimeout(timeout);
            clearTimeout(resizeTimeout);
            window.removeEventListener('resize', handleResize);
            ScrollTrigger.killAll();
        };
    }, []);

    return <>{children}</>;
};

export default AnimationProvider;

