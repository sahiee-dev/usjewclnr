'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './animations';

const pricingPlans = [
    {
        name: "Essential Clean",
        price: "$89",
        features: [
            "For everyday jewelry",
            "Manual + warranty",
            "Elegant packaging"
        ],
        buttonText: "Buy Now",
        highlighted: false
    },
    {
        name: "Premium Set",
        price: "$109",
        features: [
            "Cleaner plus accessories",
            "Gold-finish tongs",
            "Extended support"
        ],
        buttonText: "Get Started",
        highlighted: true
    },
    {
        name: "Ultimate Shine",
        price: "$129",
        features: [
            "Full bundle & extras",
            "Protective case",
            "Exclusive gifts"
        ],
        buttonText: "Restore Shine",
        highlighted: false
    }
];

const Pricing = () => {
    return (
        <section id="pricing" className="w-full px-4 sm:px-6 md:px-10 py-8 sm:py-10 md:py-12 bg-[#E6EFEA]">
            <div className="max-w-6xl mx-auto">
                <FadeIn direction="up" delay={0}>
                    <div className="text-center mb-8 sm:mb-10 md:mb-12">
                        <h2 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl md:text-4xl font-bold text-[#1F3D2B] italic mb-2">
                            Pricing
                        </h2>
                        <p className="text-[#1F3D2B] text-sm sm:text-base md:text-lg font-semibold">
                            Professional care made simple.
                        </p>
                    </div>
                </FadeIn>

                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                    style={{ perspective: '1000px' }}
                >
                    {pricingPlans.map((plan, index) => (
                        <motion.div
                            key={index}
                            className={`relative backdrop-blur-xl rounded-xl sm:rounded-2xl p-5 sm:p-6 flex flex-col transition-colors duration-300 ${plan.highlighted
                                ? 'bg-gradient-to-br from-[#F7F9F6] to-white border-2 border-[#2E7D5A]/40 shadow-[0_8px_32px_rgba(31,61,43,0.12)] sm:shadow-[0_12px_48px_rgba(31,61,43,0.15)] sm:scale-[1.02] lg:scale-105 z-10 order-first sm:order-none'
                                : 'bg-gradient-to-br from-[#F7F9F6] to-[#F7F9F6]/90 border border-[#9FD3C7]/40 shadow-[0_4px_16px_rgba(31,61,43,0.08)] sm:shadow-[0_8px_32px_rgba(31,61,43,0.10)]'
                                }`}
                            initial={{ opacity: 0, y: 50, rotateX: -15 }}
                            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                            whileHover={{
                                y: -15,
                                rotateY: plan.highlighted ? 0 : (index === 0 ? 8 : -8),
                                rotateX: 5,
                                scale: 1.02,
                                boxShadow: '0 25px 60px rgba(31,61,43,0.22)',
                                transition: { duration: 0.3, ease: 'easeOut' }
                            }}
                            style={{
                                transformStyle: 'preserve-3d',
                                transformOrigin: 'center center'
                            }}
                        >
                            {/* Highlight glow for premium */}
                            {plan.highlighted && (
                                <motion.div
                                    className="absolute -inset-[2px] bg-gradient-to-br from-[#9FD3C7]/40 via-[#2E7D5A]/20 to-transparent rounded-xl sm:rounded-2xl blur-sm -z-10"
                                    animate={{
                                        opacity: [0.5, 0.9, 0.5],
                                        scale: [1, 1.01, 1],
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity,
                                        ease: 'easeInOut'
                                    }}
                                />
                            )}

                            {/* Hover shine effect */}
                            <motion.div
                                className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 pointer-events-none"
                                whileHover={{ opacity: 1 }}
                            />

                            <p className="text-[#1F3D2B] text-xs sm:text-sm font-medium mb-1 sm:mb-2 relative z-10">{plan.name}</p>
                            <motion.p
                                className="text-[#1F3D2B] text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 relative z-10"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                {plan.price}
                            </motion.p>

                            <ul className="flex-1 space-y-2 sm:space-y-3 mb-6 sm:mb-8 relative z-10">
                                {plan.features.map((feature, featureIndex) => (
                                    <motion.li
                                        key={featureIndex}
                                        className="flex items-center gap-2 text-[#1F3D2B] text-xs sm:text-sm"
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 + featureIndex * 0.1 }}
                                    >
                                        <motion.svg
                                            className="w-4 h-4 flex-shrink-0 text-[#2E7D5A]"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            whileHover={{ scale: 1.3, rotate: 360 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </motion.svg>
                                        {feature}
                                    </motion.li>
                                ))}
                            </ul>

                            <motion.button
                                className={`w-full py-2.5 sm:py-3 rounded-full font-medium text-xs sm:text-sm relative z-10 overflow-hidden ${plan.highlighted
                                    ? 'bg-[#2E7D5A] text-white shadow-lg'
                                    : 'bg-[#2E7D5A]/10 text-[#2E7D5A] border border-[#2E7D5A]/30'
                                    }`}
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: plan.highlighted
                                        ? '0 15px 40px rgba(46, 125, 90, 0.5)'
                                        : '0 8px 25px rgba(46, 125, 90, 0.25)'
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {/* Button shimmer effect */}
                                <motion.span
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full"
                                    whileHover={{ translateX: '200%' }}
                                    transition={{ duration: 0.6 }}
                                />
                                <span className="relative z-10">{plan.buttonText}</span>
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
