'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './animations';

const testimonials = [
    {
        quote: "My rings look flawlessly new, no residue, just pure shine. Simple and safe.",
        name: "Jamie",
        title: "Jewelry Enthusiast"
    },
    {
        quote: "Finally a cleaner that's gentle and effortless. Every necklace sparkles.",
        name: "Chris",
        title: "Watch Collector"
    },
    {
        quote: "It's like professional care at home. My earrings have never looked brighter.",
        name: "Sam",
        title: "Gem Lover"
    },
    {
        quote: "I was skeptical at first, but the results are incredible. My diamond ring looks brand new!",
        name: "Maria",
        title: "Fashion Blogger"
    },
    {
        quote: "Best investment for my jewelry collection. Clean, safe, and effortless every time.",
        name: "Alex",
        title: "Collector"
    },
    {
        quote: "My grandmother's vintage pieces have never looked better. Truly gentle on delicate items.",
        name: "Emma",
        title: "Antique Enthusiast"
    },
    {
        quote: "Professional results without the professional price. My watches are spotless.",
        name: "David",
        title: "Watch Aficionado"
    },
    {
        quote: "The before and after difference is stunning. Worth every penny!",
        name: "Sophie",
        title: "Jewelry Designer"
    }
];

const TestimonialCard = ({ quote, name, title }: { quote: string; name: string; title: string }) => (
    <motion.div
        className="flex-shrink-0 w-[260px] sm:w-[300px] md:w-[350px] bg-gradient-to-br from-[#E6EFEA] to-[#E6EFEA]/80 backdrop-blur-xl border border-[#9FD3C7]/40 rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[150px] sm:min-h-[180px] shadow-[0_4px_16px_rgba(31,61,43,0.08)] sm:shadow-[0_8px_32px_rgba(31,61,43,0.10)] mx-2 sm:mx-3"
        whileHover={{
            scale: 1.02,
            boxShadow: '0 12px 40px rgba(31,61,43,0.15)',
        }}
        transition={{ duration: 0.3 }}
    >
        <p className="text-[#1F3D2B] text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
            &ldquo;{quote}&rdquo;
        </p>
        <div>
            <p className="text-[#1F3D2B] font-semibold text-xs sm:text-sm">{name}</p>
            <p className="text-[#1F3D2B]/70 text-xs">{title}</p>
        </div>
    </motion.div>
);

const Testimonials = () => {
    const duplicatedTestimonials = [...testimonials, ...testimonials];

    return (
        <section id="about" className="w-full py-8 sm:py-10 md:py-12 overflow-hidden bg-[#F7F9F6]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
                <FadeIn direction="up" delay={0}>
                    <div className="text-center mb-8 sm:mb-10 md:mb-12">
                        <h2 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl md:text-4xl font-bold text-[#1F3D2B] italic mb-2">
                            Refined Results
                        </h2>
                        <p className="text-[#1F3D2B] text-sm sm:text-base md:text-lg font-semibold">
                            What Our Customers Say
                        </p>
                    </div>
                </FadeIn>
            </div>

            {/* Carousel Container */}
            <div className="relative">
                {/* Left fade gradient */}
                <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-32 lg:w-48 bg-gradient-to-r from-[#F7F9F6] via-[#F7F9F6]/80 to-transparent z-10 pointer-events-none" />

                {/* Right fade gradient */}
                <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-32 lg:w-48 bg-gradient-to-l from-[#F7F9F6] via-[#F7F9F6]/80 to-transparent z-10 pointer-events-none" />

                {/* Scrolling track */}
                <div className="flex animate-scroll hover:pause-animation">
                    {duplicatedTestimonials.map((testimonial, index) => (
                        <TestimonialCard
                            key={index}
                            quote={testimonial.quote}
                            name={testimonial.name}
                            title={testimonial.title}
                        />
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                
                .animate-scroll {
                    animation: scroll 40s linear infinite;
                }
                
                @media (max-width: 640px) {
                    .animate-scroll {
                        animation: scroll 25s linear infinite;
                    }
                }
                
                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};

export default Testimonials;
