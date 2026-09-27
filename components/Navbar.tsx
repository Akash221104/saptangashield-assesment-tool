"use client";

import Link from "next/link";
import { projectMeta } from "@/data/saptanga";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-bg-primary/85 border-b border-ancient-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand logo & symbol */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="w-10 h-10 rounded-full border border-gold-primary/40 bg-bg-card flex items-center justify-center text-gold-bright shadow-[0_0_15px_rgba(200,169,107,0.15)] group-hover:border-gold-bright group-hover:shadow-[0_0_20px_rgba(227,199,127,0.3)] transition-all duration-300">
            <span className="text-xl font-serif leading-none select-none text-gold-bright">ॐ</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-semibold tracking-wider text-text-main group-hover:text-gold-bright transition-colors">
              SAPTANGA<span className="text-gold-primary">SHIELD</span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-text-muted uppercase">
              {projectMeta.subtitle}
            </span>
          </div>
        </Link>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <a
            href="#philosophy"
            className="text-text-muted hover:text-gold-bright transition-colors hover:underline underline-offset-8 decoration-gold-primary/50"
          >
            Philosophy
          </a>
          <a
            href="#seven-limbs"
            className="text-text-muted hover:text-gold-bright transition-colors hover:underline underline-offset-8 decoration-gold-primary/50"
          >
            Seven Limbs
          </a>
          <a
            href="#mapping"
            className="text-text-muted hover:text-gold-bright transition-colors hover:underline underline-offset-8 decoration-gold-primary/50"
          >
            Modern Mapping
          </a>
        </nav>

        {/* CTA Button */}
        <div className="flex items-center">
          <Link
            href="/assessment"
            className="relative group overflow-hidden rounded-md p-px font-semibold text-xs uppercase tracking-wider text-bg-primary"
          >
            <span className="absolute inset-0 bg-gold-gradient transition-all duration-300 group-hover:opacity-90"></span>
            <span className="relative block px-4 py-2.5 rounded-[5px] bg-gold-primary group-hover:bg-gold-bright text-bg-primary font-semibold transition-all duration-300 flex items-center gap-1.5 shadow-[0_0_15px_rgba(200,169,107,0.25)]">
              Enter Assessment <span className="text-sm font-bold">→</span>
            </span>
          </Link>
        </div>

      </div>
    </header>
  );
}
