'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FadeIn } from './animations';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

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
    const sectionRef = useRef<HTMLElement>(null);

    return (
        <section ref={sectionRef} id="pricing" className="w-full px-4 sm:px-6 md:px-10 py-8 sm:py-10 md:py-12 bg-[#E6EFEA]">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {pricingPlans.map((plan, index) => (
                        <motion.div
                            key={index}
                            className={`relative backdrop-blur-xl rounded-xl sm:rounded-2xl p-5 sm:p-6 flex flex-col transition-colors duration-300 ${plan.highlighted
                                ? 'bg-gradient-to-br from-[#F7F9F6] to-white border-2 border-[#2E7D5A]/40 shadow-[0_8px_32px_rgba(31,61,43,0.12)] sm:shadow-[0_12px_48px_rgba(31,61,43,0.15)] sm:scale-[1.02] lg:scale-105 z-10 order-first sm:order-none'
                                : 'bg-gradient-to-br from-[#F7F9F6] to-[#F7F9F6]/90 border border-[#9FD3C7]/40 shadow-[0_4px_16px_rgba(31,61,43,0.08)] sm:shadow-[0_8px_32px_rgba(31,61,43,0.10)]'
                                }`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{
                                y: -8,
                                boxShadow: '0 20px 50px rgba(31,61,43,0.18)',
                            }}
                        >
                            {/* Highlight glow for premium */}
                            {plan.highlighted && (
                                <div className="absolute -inset-[1px] bg-gradient-to-br from-[#9FD3C7]/30 via-[#2E7D5A]/10 to-transparent rounded-xl sm:rounded-2xl blur-sm -z-10" />
                            )}

                            <p className="text-[#1F3D2B] text-xs sm:text-sm font-medium mb-1 sm:mb-2">{plan.name}</p>
                            <p className="text-[#1F3D2B] text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">{plan.price}</p>

                            <ul className="flex-1 space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                                {plan.features.map((feature, featureIndex) => (
                                    <li
                                        key={featureIndex}
                                        className="flex items-center gap-2 text-[#1F3D2B] text-xs sm:text-sm"
                                    >
                                        <svg className="w-4 h-4 flex-shrink-0 text-[#2E7D5A]" viewBox="0 0 16 16" fill="none">
                                            <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <motion.button
                                className={`w-full py-2.5 sm:py-3 rounded-full font-medium text-xs sm:text-sm ${plan.highlighted
                                    ? 'bg-[#2E7D5A] text-white shadow-lg'
                                    : 'bg-[#2E7D5A]/10 text-[#2E7D5A] border border-[#2E7D5A]/30'
                                    }`}
                                whileHover={{
                                    scale: 1.03,
                                    boxShadow: plan.highlighted
                                        ? '0 10px 30px rgba(46, 125, 90, 0.4)'
                                        : '0 5px 20px rgba(46, 125, 90, 0.2)'
                                }}
                                whileTap={{ scale: 0.97 }}
                            >
                                {plan.buttonText}
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
