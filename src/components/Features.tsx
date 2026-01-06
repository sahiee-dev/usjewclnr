'use client';

import React from 'react';
import { motion } from 'framer-motion';

const features = [
    {
        icon: (
            <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 8L28 16L24 24L20 16L24 8Z" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M24 24L28 32L24 40L20 32L24 24Z" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M16 12L20 16L16 20L12 16L16 12Z" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M32 12L36 16L32 20L28 16L32 12Z" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
        ),
        label: 'Ultrasonic Precision'
    },
    {
        icon: (
            <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="24" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
                <circle cx="32" cy="24" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
        ),
        label: 'Cleans Multiple Pieces'
    },
    {
        icon: (
            <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M24 16V24L30 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        label: 'Minutes to Shine'
    },
    {
        icon: (
            <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 8C24 8 32 16 32 24C32 32 24 40 24 40C24 40 16 32 16 24C16 16 24 8 24 8Z" stroke="currentColor" strokeWidth="2" fill="none" />
                <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
        ),
        label: 'Water-Only Safe'
    },
    {
        icon: (
            <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 20L24 12L36 20" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M12 28L24 36L36 28" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M16 24L24 20L32 24" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
        ),
        label: 'Gentle on Gems'
    },
    {
        icon: (
            <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="24" cy="24" rx="16" ry="10" stroke="currentColor" strokeWidth="2" fill="none" />
                <ellipse cx="24" cy="24" rx="8" ry="5" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
        ),
        label: 'Even Deep Clean'
    },
    {
        icon: (
            <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="2" fill="none" />
                <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M24 10V14M24 34V38M10 24H14M34 24H38" stroke="currentColor" strokeWidth="2" />
            </svg>
        ),
        label: 'Restores Brilliance'
    },
    {
        icon: (
            <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 16V32M24 12V36M28 16V32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M16 20V28M32 20V28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        label: 'One-Touch Safe'
    }
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.9
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 12,
        },
    },
};

const Features = () => {
    return (
        <section className="w-full px-4 sm:px-6 md:px-10 py-8 sm:py-10 md:py-12 bg-[#E6EFEA]">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center text-center group"
                            variants={itemVariants}
                        >
                            <motion.div
                                className="text-[#9FD3C7] mb-3 sm:mb-4"
                                whileHover={{
                                    scale: 1.1,
                                    color: '#2E7D5A',
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                {feature.icon}
                            </motion.div>
                            <p className="text-[#1F3D2B] text-xs sm:text-sm font-medium leading-tight">
                                {feature.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Features;
