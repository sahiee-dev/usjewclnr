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
        // Enable smooth scroll behavior
        document.documentElement.style.scrollBehavior = 'smooth';

        // Refresh ScrollTrigger on resize
        const handleResize = () => {
            ScrollTrigger.refresh();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            ScrollTrigger.killAll();
        };
    }, []);

    return <>{children}</>;
};

export default AnimationProvider;
