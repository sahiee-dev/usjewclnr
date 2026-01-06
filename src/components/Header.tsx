'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Logo = () => (
    <motion.div
        className="flex items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
    >
        <motion.div
            className="w-4 h-4 bg-[#2E7D5A] rounded-sm"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 200 }}
        />
        <motion.div
            className="w-4 h-4 bg-[#2E7D5A] rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
        />
        <motion.div
            className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[14px] border-b-[#2E7D5A]"
            initial={{ scale: 0, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, type: 'spring', stiffness: 200 }}
        />
    </motion.div>
);

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { label: 'About', href: '#about' },
        { label: 'Buy', href: '#pricing' },
        { label: 'Contact', href: '#contact' },
    ];

    return (
        <>
            <motion.header
                className="w-full py-4 px-4 sm:px-6 md:px-10 flex items-center justify-between bg-[#F7F9F6] relative z-50"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
                <Logo />

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6 lg:gap-8">
                    {navItems.map((item, index) => (
                        <motion.a
                            key={item.label}
                            href={item.href}
                            className="text-[#1F3D2B] text-sm font-medium hover:text-[#2E7D5A] transition-colors relative"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {item.label}
                            <motion.span
                                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#2E7D5A] origin-left"
                                initial={{ scaleX: 0 }}
                                whileHover={{ scaleX: 1 }}
                                transition={{ duration: 0.2 }}
                            />
                        </motion.a>
                    ))}
                </nav>

                {/* Desktop CTA Button */}
                <motion.a
                    href="#pricing"
                    className="hidden sm:block bg-[#2E7D5A] text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded-full hover:bg-[#256B4C] transition-all shadow-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4, type: 'spring', stiffness: 200 }}
                    whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(46, 125, 90, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                >
                    Buy / Pricing
                </motion.a>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <motion.span
                        className="w-6 h-0.5 bg-[#1F3D2B] block"
                        animate={{
                            rotate: isMobileMenuOpen ? 45 : 0,
                            y: isMobileMenuOpen ? 8 : 0
                        }}
                        transition={{ duration: 0.2 }}
                    />
                    <motion.span
                        className="w-6 h-0.5 bg-[#1F3D2B] block"
                        animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                        transition={{ duration: 0.2 }}
                    />
                    <motion.span
                        className="w-6 h-0.5 bg-[#1F3D2B] block"
                        animate={{
                            rotate: isMobileMenuOpen ? -45 : 0,
                            y: isMobileMenuOpen ? -8 : 0
                        }}
                        transition={{ duration: 0.2 }}
                    />
                </button>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Backdrop */}
                        <motion.div
                            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Menu */}
                        <motion.nav
                            className="absolute top-16 left-4 right-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#9FD3C7]/30 overflow-hidden"
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="p-4 space-y-1">
                                {navItems.map((item, index) => (
                                    <motion.a
                                        key={item.label}
                                        href={item.href}
                                        className="block py-3 px-4 text-[#1F3D2B] text-base font-medium rounded-xl hover:bg-[#E6EFEA] transition-colors"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </motion.a>
                                ))}
                                <motion.a
                                    href="#pricing"
                                    className="block py-3 px-4 mt-2 bg-[#2E7D5A] text-white text-base font-medium rounded-xl text-center"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.15 }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Buy Now
                                </motion.a>
                            </div>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
