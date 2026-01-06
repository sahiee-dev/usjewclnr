'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from './animations';

const LuxuryClean = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section className="w-full px-4 sm:px-6 md:px-10 py-8 sm:py-10 bg-[#F7F9F6]">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 items-center">
                    {/* Left side - Text content */}
                    <div className="flex-1 w-full lg:max-w-lg">
                        <FadeIn direction="left" delay={0}>
                            <h2 className="text-[#1F3D2B] text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4">
                                Luxury Clean. Trusted Care.
                            </h2>
                        </FadeIn>

                        <div className="space-y-3 sm:space-y-4 text-[#1F3D2B] text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-relaxed">
                            <FadeIn direction="left" delay={0.1}>
                                <p>
                                    Simply add water, place each piece, and press one button. Advanced vibrations
                                    reach where cloths and brushes can&apos;t, restoring every shine with confidence.
                                </p>
                            </FadeIn>

                            <FadeIn direction="left" delay={0.2}>
                                <p>
                                    Ideal for rings, necklaces, earrings, and watches. Protect your investment while
                                    enjoying professional care at home. Precision, safety, and simplicity every time.
                                </p>
                            </FadeIn>

                            <FadeIn direction="left" delay={0.3}>
                                <p>
                                    Effortlessly preserve the sparkle of your most valued jewelry.
                                    No harsh chemicals, just pure ultrasonic waves and water, safe for daily care of gold, silver, diamonds, and delicate heirlooms.
                                </p>
                            </FadeIn>
                        </div>

                        {/* Signature */}
                        <FadeIn direction="up" delay={0.4}>
                            <div className="mt-6 sm:mt-8">
                                <Image
                                    src="/signature.png"
                                    alt="Signature"
                                    width={60}
                                    height={60}
                                    className="opacity-80 w-12 sm:w-16 md:w-20 h-auto"
                                    style={{ filter: 'invert(36%) sepia(35%) saturate(748%) hue-rotate(109deg) brightness(92%) contrast(88%)' }}
                                />
                            </div>
                        </FadeIn>
                    </div>

                    {/* Right side - Glassmorphic Image Card */}
                    <div className="flex-1 w-full flex justify-center items-center">
                        <FadeIn direction="right" delay={0.2} duration={0.8} className="w-full max-w-sm sm:max-w-md lg:max-w-none lg:w-[85%]">
                            <motion.div
                                className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#E6EFEA] to-[#9FD3C7]/30 backdrop-blur-xl border border-[#9FD3C7]/50 shadow-[0_4px_16px_rgba(31,61,43,0.10)] sm:shadow-[0_8px_32px_rgba(31,61,43,0.15)] cursor-pointer"
                                whileHover={{
                                    scale: 1.02,
                                    boxShadow: '0 16px 48px rgba(31,61,43,0.20)'
                                }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                onTouchStart={() => setIsHovered(true)}
                                onTouchEnd={() => setTimeout(() => setIsHovered(false), 2000)}
                            >
                                {/* Image */}
                                <div className="relative aspect-[4/5] w-full">
                                    <Image
                                        src="/revimg.png"
                                        alt="Product Review"
                                        fill
                                        className="object-cover"
                                    />

                                    {/* Gradient overlay */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-t from-[#1F3D2B]/80 via-[#1F3D2B]/20 via-40% to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                                    />

                                    {/* Blur layer */}
                                    <div
                                        className={`absolute inset-0 backdrop-blur-md transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                                        style={{
                                            maskImage: 'linear-gradient(to top, black 0%, black 15%, transparent 45%)',
                                            WebkitMaskImage: 'linear-gradient(to top, black 0%, black 15%, transparent 45%)'
                                        }}
                                    />

                                    {/* Review content */}
                                    <AnimatePresence>
                                        {isHovered && (
                                            <motion.div
                                                className="absolute bottom-0 left-0 right-0 p-4 sm:p-5"
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: 20, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                            >
                                                {/* Stars */}
                                                <div className="flex gap-1 mb-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <motion.svg
                                                            key={i}
                                                            className="w-4 h-4 sm:w-5 sm:h-5 text-[#F5C842] fill-current drop-shadow-lg"
                                                            viewBox="0 0 20 20"
                                                            initial={{ opacity: 0, scale: 0 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{
                                                                duration: 0.2,
                                                                delay: i * 0.05,
                                                                ease: 'easeOut'
                                                            }}
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </motion.svg>
                                                    ))}
                                                </div>

                                                {/* Review text */}
                                                <p className="text-white text-xs sm:text-sm font-medium leading-snug drop-shadow-lg">
                                                    &ldquo;Perfect for personal use! Keeps all my jewelry sparkling clean.&rdquo;
                                                </p>
                                                <p className="text-white/80 text-xs mt-2 drop-shadow-md">
                                                    Verified Buyer
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LuxuryClean;
