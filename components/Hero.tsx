"use client";

import Link from "next/link";
import SaptangaMandala from "./SaptangaMandala";

interface HeroProps {
  activeLimbId: string;
  onSelectLimb: (id: string) => void;
}

export default function Hero({ activeLimbId, onSelectLimb }: HeroProps) {
  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden subtle-grid">
      {/* Background Lighting Gradients */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-ancient-green/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-6 text-left z-10">
            
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bg-card border border-ancient-border text-gold-bright text-xs font-mono tracking-widest uppercase shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-primary animate-ping" />
              KAUTILYA • ARTHASHASTRA • CYBERSECURITY
            </div>

            {/* Hero Main Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-main leading-[1.15]">
              Ancient wisdom. <br />
              <span className="italic font-serif gold-text-gradient font-normal">
                Modern defense.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-text-muted max-w-xl font-sans leading-relaxed">
              A cybersecurity framework inspired by Saptanga — Kautilya&apos;s seven-limbed model of a resilient kingdom translated into seven interconnected cyber defense pillars.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#seven-limbs"
                onClick={(e) => handleExploreClick(e, "#seven-limbs")}
                className="px-6 py-3.5 rounded-md bg-gold-gradient text-bg-primary font-semibold text-sm tracking-wide uppercase shadow-[0_0_20px_rgba(200,169,107,0.25)] hover:shadow-[0_0_30px_rgba(227,199,127,0.4)] hover:brightness-110 transition-all duration-300 flex items-center gap-2"
              >
                Explore the Seven Limbs <span className="text-base">→</span>
              </a>

              <a
                href="#mapping"
                onClick={(e) => handleExploreClick(e, "#mapping")}
                className="px-6 py-3.5 rounded-md bg-bg-card border border-ancient-border text-text-main hover:text-gold-bright hover:border-gold-primary/50 font-semibold text-sm tracking-wide transition-all duration-300 flex items-center gap-2"
              >
                How it maps to cyber <span className="text-base">↘</span>
              </a>
            </div>

            {/* Small Statement Below Buttons */}
            <div className="pt-4 border-t border-ancient-border/40 w-full max-w-md">
              <p className="text-xs font-mono text-text-muted flex items-center gap-2">
                <span className="text-gold-primary font-bold">◈</span>
                From kingdom architecture to enterprise security architecture.
              </p>
            </div>

          </div>

          {/* Right Side Mandala Topology Graphic */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            <SaptangaMandala
              activeLimbId={activeLimbId}
              onSelectLimb={onSelectLimb}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
