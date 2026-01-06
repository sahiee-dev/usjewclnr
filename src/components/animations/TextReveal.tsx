'use client';

import { motion, Variants } from 'framer-motion';

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
    staggerChildren?: number;
    type?: 'character' | 'word';
}

const TextReveal = ({
    text,
    className = '',
    delay = 0,
    staggerChildren = 0.05,
    type = 'character',
}: TextRevealProps) => {
    const elements = type === 'character' ? text.split('') : text.split(' ');

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren,
                delayChildren: delay,
            },
        },
    };

    const childVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 50,
            rotateX: -90,
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.span
            className={`inline-block ${className}`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            style={{ perspective: '1000px' }}
        >
            {elements.map((element, index) => (
                <motion.span
                    key={index}
                    className="inline-block"
                    variants={childVariants}
                    style={{ transformOrigin: 'center bottom' }}
                >
                    {element === ' ' ? '\u00A0' : element}
                    {type === 'word' && index < elements.length - 1 ? '\u00A0' : ''}
                </motion.span>
            ))}
        </motion.span>
    );
};

export default TextReveal;
