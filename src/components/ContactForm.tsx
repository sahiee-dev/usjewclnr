'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { FadeIn } from './animations';

const productOptions = [
    { id: 'essential', name: 'Essential Clean', price: '$89', color: '#9FD3C7' },
    { id: 'premium', name: 'Premium Set', price: '$109', color: '#2E7D5A' },
    { id: 'ultimate', name: 'Ultimate Shine', price: '$129', color: '#1F3D2B' },
];

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        selectedProduct: ''
    });
    const [errors, setErrors] = useState<{ name?: string; email?: string; selectedProduct?: string }>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const successMessageRef = useRef<HTMLDivElement>(null);
    const productCardsRef = useRef<HTMLDivElement>(null);

    // GSAP animation for product cards on mount
    useEffect(() => {
        if (productCardsRef.current) {
            const cards = productCardsRef.current.querySelectorAll('.product-card');
            gsap.fromTo(cards,
                { opacity: 0, y: 30, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'back.out(1.5)',
                    scrollTrigger: {
                        trigger: productCardsRef.current,
                        start: 'top 80%',
                    }
                }
            );
        }
    }, []);

    const validateForm = () => {
        const newErrors: { name?: string; email?: string; selectedProduct?: string } = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.selectedProduct) {
            newErrors.selectedProduct = 'Please select a product';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            // Shake animation for product cards if not selected
            if (!formData.selectedProduct && productCardsRef.current) {
                gsap.to(productCardsRef.current, {
                    x: [-10, 10, -10, 10, 0],
                    duration: 0.4,
                    ease: 'power2.out'
                });
            }
            return;
        }

        console.log('Form submitted:', formData);
        setIsSubmitted(true);

        setTimeout(() => {
            setFormData({ name: '', email: '', selectedProduct: '' });
            setIsSubmitted(false);
            setShowSuccessMessage(true);
        }, 1500);
    };

    // GSAP animation for success message
    useEffect(() => {
        if (showSuccessMessage && successMessageRef.current) {
            const container = successMessageRef.current;
            const text = container.querySelector('.success-text');
            const icon = container.querySelector('.success-icon');

            const tl = gsap.timeline();

            tl.fromTo(container,
                { opacity: 0, y: 30, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
            );

            tl.fromTo(icon,
                { scale: 0, rotation: -180 },
                { scale: 1, rotation: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' },
                '-=0.2'
            );

            if (text) {
                const chars = text.querySelectorAll('.char');
                tl.fromTo(chars,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, stagger: 0.02, duration: 0.3, ease: 'power2.out' },
                    '-=0.3'
                );
            }

            tl.to(container, {
                opacity: 0,
                y: -20,
                duration: 0.4,
                delay: 4,
                ease: 'power2.in',
                onComplete: () => setShowSuccessMessage(false)
            });
        }
    }, [showSuccessMessage]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (errors[name as keyof typeof errors]) {
            setErrors({
                ...errors,
                [name]: undefined
            });
        }
    };

    const handleProductSelect = (productId: string) => {
        setFormData({
            ...formData,
            selectedProduct: productId
        });
        if (errors.selectedProduct) {
            setErrors({
                ...errors,
                selectedProduct: undefined
            });
        }

        // Animate selected card
        if (productCardsRef.current) {
            const cards = productCardsRef.current.querySelectorAll('.product-card');
            cards.forEach((card, index) => {
                const isSelected = productOptions[index].id === productId;
                gsap.to(card, {
                    scale: isSelected ? 1.05 : 0.95,
                    opacity: isSelected ? 1 : 0.6,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        }
    };

    const splitText = (text: string) => {
        return text.split('').map((char, i) => (
            <span key={i} className="char inline-block">
                {char === ' ' ? '\u00A0' : char}
            </span>
        ));
    };

    const selectedProductName = productOptions.find(p => p.id === formData.selectedProduct)?.name || '';

    return (
        <section id="contact" className="w-full px-4 sm:px-6 md:px-10 py-8 sm:py-10 md:py-12 bg-[#F7F9F6] relative">
            {/* Success Message Overlay */}
            <AnimatePresence>
                {showSuccessMessage && (
                    <div
                        ref={successMessageRef}
                        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                    >
                        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-8 sm:p-10 shadow-2xl border border-[#9FD3C7]/50 max-w-md mx-4 text-center">
                            <div className="success-icon w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-[#2E7D5A] rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            <h3 className="success-text text-xl sm:text-2xl font-bold text-[#1F3D2B] mb-2">
                                {splitText("Order Received!")}
                            </h3>
                            <p className="text-[#1F3D2B]/80 text-sm sm:text-base">
                                We will process your {selectedProductName || 'order'} and reach out shortly with payment details.
                            </p>
                        </div>
                    </div>
                )}
            </AnimatePresence>

            <div className="max-w-2xl mx-auto">
                <FadeIn direction="up" delay={0}>
                    <div className="text-center mb-6 sm:mb-8">
                        <h2 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl md:text-4xl font-bold text-[#1F3D2B] italic mb-2">
                            Ready to Sparkle?
                        </h2>
                        <p className="text-[#1F3D2B] text-sm sm:text-base md:text-lg font-semibold">
                            Choose your cleaner and we will handle the rest.
                        </p>
                    </div>
                </FadeIn>

                <FadeIn direction="up" delay={0.15}>
                    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6" noValidate>
                        {/* Product Selection Cards */}
                        <div>
                            <label className="block text-[#1F3D2B] text-xs sm:text-sm font-medium mb-3">
                                Select Your Product <span className="text-red-500">*</span>
                            </label>
                            <div
                                ref={productCardsRef}
                                className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                            >
                                {productOptions.map((product, index) => (
                                    <motion.div
                                        key={product.id}
                                        className={`product-card relative p-4 sm:p-5 rounded-xl cursor-pointer transition-all duration-300 border-2 ${formData.selectedProduct === product.id
                                                ? 'border-[#2E7D5A] bg-[#2E7D5A]/10 shadow-lg'
                                                : 'border-[#9FD3C7]/40 bg-white hover:border-[#9FD3C7]'
                                            }`}
                                        onClick={() => handleProductSelect(product.id)}
                                        whileHover={{ y: -5 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {/* Selection indicator */}
                                        <AnimatePresence>
                                            {formData.selectedProduct === product.id && (
                                                <motion.div
                                                    className="absolute -top-2 -right-2 w-6 h-6 bg-[#2E7D5A] rounded-full flex items-center justify-center shadow-lg"
                                                    initial={{ scale: 0, rotate: -180 }}
                                                    animate={{ scale: 1, rotate: 0 }}
                                                    exit={{ scale: 0, rotate: 180 }}
                                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                                >
                                                    <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                        <polyline points="20 6 9 17 4 12" />
                                                    </svg>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Color dot */}
                                        <div
                                            className="w-3 h-3 rounded-full mb-2"
                                            style={{ backgroundColor: product.color }}
                                        />

                                        <p className="text-[#1F3D2B] text-sm font-semibold">{product.name}</p>
                                        <p className="text-[#2E7D5A] text-lg font-bold mt-1">{product.price}</p>

                                        {/* Shine effect on hover */}
                                        <motion.div
                                            className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-0 pointer-events-none"
                                            whileHover={{ opacity: 1 }}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                            {errors.selectedProduct && (
                                <motion.p
                                    className="text-red-500 text-xs mt-2"
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    {errors.selectedProduct}
                                </motion.p>
                            )}
                        </div>

                        {/* Name & Email in row on larger screens */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-[#1F3D2B] text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                                    Your Name <span className="text-red-500">*</span>
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
                                    required
                                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-[#E6EFEA] text-[#1F3D2B] text-sm sm:text-base placeholder-[#1F3D2B]/40 border ${errors.name ? 'border-red-400' : 'border-[#9FD3C7]/40'} focus:ring-2 focus:ring-[#2E7D5A]/30 focus:border-[#2E7D5A]/50 focus:outline-none transition-all`}
                                    animate={{
                                        scale: focusedField === 'name' ? 1.01 : 1,
                                        boxShadow: focusedField === 'name' ? '0 0 0 3px rgba(46, 125, 90, 0.15)' : '0 2px 8px rgba(31,61,43,0.04)'
                                    }}
                                    transition={{ duration: 0.2 }}
                                />
                                {errors.name && (
                                    <motion.p
                                        className="text-red-500 text-xs mt-1"
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        {errors.name}
                                    </motion.p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-[#1F3D2B] text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                                    Email Address <span className="text-red-500">*</span>
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
                                    required
                                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-[#E6EFEA] text-[#1F3D2B] text-sm sm:text-base placeholder-[#1F3D2B]/40 border ${errors.email ? 'border-red-400' : 'border-[#9FD3C7]/40'} focus:ring-2 focus:ring-[#2E7D5A]/30 focus:border-[#2E7D5A]/50 focus:outline-none transition-all`}
                                    animate={{
                                        scale: focusedField === 'email' ? 1.01 : 1,
                                        boxShadow: focusedField === 'email' ? '0 0 0 3px rgba(46, 125, 90, 0.15)' : '0 2px 8px rgba(31,61,43,0.04)'
                                    }}
                                    transition={{ duration: 0.2 }}
                                />
                                {errors.email && (
                                    <motion.p
                                        className="text-red-500 text-xs mt-1"
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        {errors.email}
                                    </motion.p>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            className="w-full py-3 sm:py-4 bg-[#2E7D5A] text-white text-sm sm:text-base font-semibold rounded-full shadow-lg relative overflow-hidden"
                            whileHover={{
                                scale: 1.02,
                                boxShadow: '0 15px 40px rgba(46, 125, 90, 0.35)'
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {/* Shimmer effect */}
                            <motion.span
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                                animate={{ translateX: ['−100%', '200%'] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            />
                            <AnimatePresence mode="wait">
                                {isSubmitted ? (
                                    <motion.span
                                        key="success"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="flex items-center justify-center gap-2 relative z-10"
                                    >
                                        <motion.svg
                                            className="w-5 h-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ type: 'spring', stiffness: 200 }}
                                        >
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </motion.svg>
                                        Processing...
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="submit"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="relative z-10"
                                    >
                                        Complete Order
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
