import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SaptangaShield — Ancient Wisdom. Modern Defense.",
  description: "Cybersecurity framework inspired by Kautilya's Saptanga — seven limbs of a kingdom translated into seven interconnected cyber defense pillars.",
  keywords: ["SaptangaShield", "Cybersecurity", "Kautilya", "Arthashastra", "Security Governance", "Academic Prototype", "EAA Sport"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${cormorant.variable} ${inter.variable}`}>
      <body className="bg-bg-primary text-text-main antialiased selection:bg-gold-primary/30 selection:text-gold-bright">
        {children}
      </body>
    </html>
  );
}
