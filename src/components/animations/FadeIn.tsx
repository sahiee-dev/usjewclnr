'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface FadeInProps {
    children: ReactNode;
    direction?: Direction;
    delay?: number;
    duration?: number;
    className?: string;
    once?: boolean;
    amount?: number;
}

const getDirectionOffset = (direction: Direction): { x: number; y: number } => {
    switch (direction) {
        case 'up':
            return { x: 0, y: 40 };
        case 'down':
            return { x: 0, y: -40 };
        case 'left':
            return { x: 40, y: 0 };
        case 'right':
            return { x: -40, y: 0 };
        case 'none':
        default:
            return { x: 0, y: 0 };
    }
};

const FadeIn = ({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.6,
    className = '',
    once = true,
    amount = 0.3,
}: FadeInProps) => {
    const { x, y } = getDirectionOffset(direction);

    const variants: Variants = {
        hidden: {
            opacity: 0,
            x,
            y,
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1], // Custom easing
            },
        },
    };

    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount }}
            variants={variants}
        >
            {children}
        </motion.div>
    );
};

export default FadeIn;
