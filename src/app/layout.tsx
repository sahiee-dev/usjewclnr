import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import AnimationProvider from "@/components/animations/AnimationProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jewelry Cleaner | Professional Ultrasonic Care",
  description: "Deep cleaning for rings, necklaces, earrings, and more—with no risk of scratches. Pure ultrasonic waves. Only water. Reveal brilliance in every fine detail.",
  keywords: "ultrasonic jewelry cleaner, jewelry cleaning, ring cleaner, necklace cleaner, professional jewelry care",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} antialiased font-sans`} suppressHydrationWarning>
        <AnimationProvider>
          {children}
        </AnimationProvider>
      </body>
    </html>
  );
}

