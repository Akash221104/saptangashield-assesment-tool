"use client";

import Link from "next/link";
import { projectMeta } from "@/data/saptanga";

export default function Footer() {
  return (
    <footer className="bg-bg-primary border-t border-ancient-border py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-8 border-b border-ancient-border/40">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-3">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-full border border-gold-primary/40 bg-bg-card flex items-center justify-center text-gold-bright">
                <span className="text-base font-serif">ॐ</span>
              </div>
              <span className="font-serif text-lg font-bold tracking-wider text-text-main group-hover:text-gold-bright transition-colors">
                SAPTANGA<span className="text-gold-primary">SHIELD</span>
              </span>
            </Link>
            <p className="text-xs font-mono text-gold-primary uppercase tracking-widest">
              {projectMeta.subtitle}
            </p>
            <p className="text-xs font-sans text-text-muted max-w-md leading-relaxed pt-1">
              {projectMeta.disclaimer}
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-text-main font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-sans text-text-muted">
              <li>
                <a href="#philosophy" className="hover:text-gold-bright transition-colors">
                  Philosophy Bridge
                </a>
              </li>
              <li>
                <a href="#seven-limbs" className="hover:text-gold-bright transition-colors">
                  Seven Limbs Explorer
                </a>
              </li>
              <li>
                <a href="#mapping" className="hover:text-gold-bright transition-colors">
                  Architectural Mapping
                </a>
              </li>
              <li>
                <Link href="/assessment" className="hover:text-gold-bright transition-colors">
                  Cyber Assessment
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic Info */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-text-main font-semibold">
              Academic Context
            </h4>
            <div className="p-3 rounded-lg bg-bg-card border border-ancient-border/60 space-y-1">
              <span className="text-xs font-mono text-gold-bright font-semibold block">
                {projectMeta.academicNote}
              </span>
              <p className="text-[11px] font-sans text-text-muted">
                Kautilya&apos;s Arthashastra Sovereign Kingdom Architecture &rarr; Cyber Defense Matrix.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-text-muted gap-4">
          <div>
            &copy; {new Date().getFullYear()} SaptangaShield • EAA Spot Academic Subject Project
          </div>
          <div className="text-gold-primary/70">
            Ancient Indian Strategic Wisdom &bull; Modern Cyber Command Center
          </div>
        </div>
      </div>
    </footer>
  );
}
