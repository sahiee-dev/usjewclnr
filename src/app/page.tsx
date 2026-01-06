'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductDescription from '@/components/ProductDescription';
import TraditionalComparison from '@/components/TraditionalComparison';
import Features from '@/components/Features';
import LuxuryClean from '@/components/LuxuryClean';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import { Preloader } from '@/components/animations';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <main className={`min-h-screen bg-[#F7F9F6] ${isLoading ? 'overflow-hidden h-screen' : ''}`}>
        <Header />
        <Hero />
        <ProductDescription />
        <TraditionalComparison />
        <Features />
        <LuxuryClean />
        <Testimonials />
        <Pricing />
        <ContactForm />
        <Footer />
      </main>
    </>
  );
}
