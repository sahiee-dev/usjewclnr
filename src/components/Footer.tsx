'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './animations';

const Logo = () => (
    <motion.div
        className="flex items-center gap-1"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
    >
        <motion.div
            className="w-3 h-3 sm:w-4 sm:h-4 bg-[#2E7D5A] opacity-60 rounded-sm"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1, type: 'spring', stiffness: 200 }}
        />
        <motion.div
            className="w-3 h-3 sm:w-4 sm:h-4 bg-[#2E7D5A] opacity-60 rounded-full"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2, type: 'spring', stiffness: 200 }}
        />
        <motion.div
            className="w-0 h-0 border-l-[6px] sm:border-l-[8px] border-l-transparent border-r-[6px] sm:border-r-[8px] border-r-transparent border-b-[10px] sm:border-b-[14px] border-b-[#2E7D5A] opacity-60"
            initial={{ scale: 0, y: 10 }}
            whileInView={{ scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3, type: 'spring', stiffness: 200 }}
        />
    </motion.div>
);

const Footer = () => {
    const linkSections = [
        {
            title: 'Brand',
            links: [
                { href: '#about', label: 'About' },
                { href: '#pricing', label: 'Buy' },
                { href: '#contact', label: 'Contact' },
            ]
        },
        {
            title: 'Support',
            links: [
                { href: '#', label: 'Help Center' },
                { href: '#', label: 'Warranty' },
                { href: '#', label: 'Shipping' },
            ]
        },
        {
            title: 'Follow Us',
            links: [
                { href: '#', label: 'Instagram' },
                { href: '#', label: 'Facebook' },
                { href: '#', label: 'Twitter' },
            ]
        }
    ];

    return (
        <FadeIn direction="up" delay={0}>
            <footer className="w-full px-4 sm:px-6 md:px-10 py-8 sm:py-10 border-t border-[#9FD3C7]/30 bg-[#F7F9F6]">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-8">
                        {/* Logo */}
                        <div>
                            <Logo />
                        </div>

                        {/* Links */}
                        <div className="grid grid-cols-3 gap-8 sm:gap-12 md:gap-16 lg:gap-24 w-full sm:w-auto">
                            {linkSections.map((section, sectionIndex) => (
                                <motion.div
                                    key={section.title}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: sectionIndex * 0.1 }}
                                >
                                    <h3 className="text-[#1F3D2B] text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                                        {section.title}
                                    </h3>
                                    <ul className="space-y-1.5 sm:space-y-2">
                                        {section.links.map((link) => (
                                            <li key={link.label}>
                                                <a
                                                    href={link.href}
                                                    className="text-[#1F3D2B]/70 text-xs sm:text-sm hover:text-[#2E7D5A] transition-colors inline-block py-0.5"
                                                >
                                                    {link.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="mt-8 pt-6 border-t border-[#9FD3C7]/20 text-center">
                        <p className="text-[#1F3D2B]/50 text-xs">
                            © 2026 Spotless. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </FadeIn>
    );
};

export default Footer;
