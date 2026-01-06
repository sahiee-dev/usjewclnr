'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from './animations';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section id="contact" className="w-full px-4 sm:px-6 md:px-10 py-8 sm:py-10 md:py-12 bg-[#F7F9F6]">
            <div className="max-w-lg mx-auto">
                <FadeIn direction="up" delay={0}>
                    <div className="text-center mb-6 sm:mb-8">
                        <h2 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl md:text-4xl font-bold text-[#1F3D2B] italic mb-2">
                            Questions? We Care.
                        </h2>
                        <p className="text-[#1F3D2B] text-sm sm:text-base md:text-lg font-semibold">
                            Your jewelry is in expert hands.
                        </p>
                    </div>
                </FadeIn>

                <FadeIn direction="up" delay={0.15}>
                    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-[#1F3D2B] text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                                Name
                            </label>
                            <motion.input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('name')}
                                onBlur={() => setFocusedField(null)}
                                placeholder="John Doe"
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-[#E6EFEA] text-[#1F3D2B] text-sm sm:text-base placeholder-[#1F3D2B]/40 border border-[#9FD3C7]/40 focus:ring-2 focus:ring-[#2E7D5A]/30 focus:border-[#2E7D5A]/50 focus:outline-none transition-all"
                                animate={{
                                    scale: focusedField === 'name' ? 1.01 : 1,
                                    boxShadow: focusedField === 'name' ? '0 0 0 3px rgba(46, 125, 90, 0.15)' : '0 2px 8px rgba(31,61,43,0.04)'
                                }}
                                transition={{ duration: 0.2 }}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-[#1F3D2B] text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                                Email
                            </label>
                            <motion.input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                                placeholder="johndoe@gmail.com"
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-[#E6EFEA] text-[#1F3D2B] text-sm sm:text-base placeholder-[#1F3D2B]/40 border border-[#9FD3C7]/40 focus:ring-2 focus:ring-[#2E7D5A]/30 focus:border-[#2E7D5A]/50 focus:outline-none transition-all"
                                animate={{
                                    scale: focusedField === 'email' ? 1.01 : 1,
                                    boxShadow: focusedField === 'email' ? '0 0 0 3px rgba(46, 125, 90, 0.15)' : '0 2px 8px rgba(31,61,43,0.04)'
                                }}
                                transition={{ duration: 0.2 }}
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-[#1F3D2B] text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                                Message
                            </label>
                            <motion.textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('message')}
                                onBlur={() => setFocusedField(null)}
                                placeholder="Your message..."
                                rows={4}
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-[#E6EFEA] text-[#1F3D2B] text-sm sm:text-base placeholder-[#1F3D2B]/40 border border-[#9FD3C7]/40 focus:ring-2 focus:ring-[#2E7D5A]/30 focus:border-[#2E7D5A]/50 focus:outline-none resize-none transition-all"
                                animate={{
                                    scale: focusedField === 'message' ? 1.01 : 1,
                                    boxShadow: focusedField === 'message' ? '0 0 0 3px rgba(46, 125, 90, 0.15)' : '0 2px 8px rgba(31,61,43,0.04)'
                                }}
                                transition={{ duration: 0.2 }}
                            />
                        </div>

                        <motion.button
                            type="submit"
                            className="w-full py-2.5 sm:py-3 bg-[#2E7D5A] text-white text-sm sm:text-base font-medium rounded-full shadow-lg relative overflow-hidden"
                            whileHover={{
                                scale: 1.02,
                                boxShadow: '0 10px 30px rgba(46, 125, 90, 0.3)'
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <AnimatePresence mode="wait">
                                {isSubmitted ? (
                                    <motion.span
                                        key="success"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="flex items-center justify-center gap-2"
                                    >
                                        <motion.svg
                                            className="w-4 h-4 sm:w-5 sm:h-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ type: 'spring', stiffness: 200 }}
                                        >
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </motion.svg>
                                        Sent!
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="submit"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                    >
                                        Submit
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </form>
                </FadeIn>
            </div>
        </section>
    );
};

export default ContactForm;
