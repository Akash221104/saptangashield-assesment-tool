"use client";

import React from "react";
import { saptangaLimbs } from "@/data/saptanga";

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-20 bg-bg-secondary relative border-y border-ancient-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-bg-card border border-ancient-border text-gold-bright text-xs font-mono tracking-widest uppercase">
            SAPTANGA PHILOSOPHY & BRIDGE
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-text-main tracking-tight">
            A kingdom survives when all <br className="hidden sm:block" />
            <span className="italic font-serif gold-text-gradient">seven limbs are strong.</span>
          </h2>

          <p className="text-base text-text-muted font-sans leading-relaxed">
            In the <span className="text-gold-bright font-serif italic">Arthashastra</span>, Kautilya established that a kingdom is not a collection of isolated parts, but a single living organism composed of seven essential limbs. If any single limb fails, the sovereign state becomes vulnerable to collapse.
          </p>

          {/* Academic Disclaimer Callout Box */}
          <div className="mt-6 p-4 rounded-lg bg-bg-card border border-gold-primary/30 text-left flex items-start gap-3.5 text-xs text-text-main/90 shadow-sm">
            <span className="text-gold-bright text-lg font-serif">ⓘ</span>
            <div>
              <span className="font-bold text-gold-bright uppercase tracking-wider block mb-0.5 font-mono">
                Academic Conceptual Model
              </span>
              <p className="text-text-muted leading-normal">
                Saptanga is an ancient Indian framework describing the essential elements of a resilient kingdom. <strong className="text-text-main font-semibold">SaptangaShield uses this framework as inspiration for a modern cybersecurity model</strong>, mapping sovereign governance to enterprise digital resilience.
              </p>
            </div>
          </div>
        </div>

        {/* Split Screen System Architecture Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Side: Ancient System */}
          <div className="lg:col-span-5 bg-bg-card p-6 sm:p-8 rounded-xl border border-ancient-border flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-ancient-border/60">
                <span className="text-xs font-mono uppercase tracking-widest text-gold-bright font-semibold">
                  Saptanga Model
                </span>
                <span className="font-serif text-xs text-text-muted italic">Kautilya&apos;s Arthashastra</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-text-main mb-6 flex items-center gap-2">
                <span className="text-gold-primary">🏛</span> ANCIENT KINGDOM SYSTEM
              </h3>

              <div className="space-y-3">
                {saptangaLimbs.map((limb) => (
                  <div
                    key={`ancient-${limb.id}`}
                    className="p-3.5 rounded-lg bg-bg-primary/70 border border-ancient-border/30 flex items-center justify-between hover:border-gold-primary/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-gold-primary font-bold">{limb.number}</span>
                      <div>
                        <span className="font-sans font-bold text-sm text-text-main block">{limb.name}</span>
                        <span className="text-xs text-text-muted">{limb.ancientTitle}</span>
                      </div>
                    </div>
                    <span className="font-serif text-sm text-gold-bright">{limb.sanskrit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-ancient-border/40 text-xs font-mono text-text-muted">
              Interconnected resilience of sovereign territory.
            </div>
          </div>

          {/* Middle Connecting Bridge / Arrow */}
          <div className="lg:col-span-1 flex flex-col items-center justify-center py-4 lg:py-0">
            <div className="hidden lg:flex flex-col items-center gap-4 text-gold-primary">
              <span className="h-20 w-px bg-gradient-to-b from-transparent via-gold-primary/50 to-transparent" />
              <div className="w-10 h-10 rounded-full border border-gold-primary/40 bg-bg-card flex items-center justify-center text-gold-bright text-xs font-mono font-bold shadow-md">
                VS
              </div>
              <span className="h-20 w-px bg-gradient-to-b from-transparent via-gold-primary/50 to-transparent" />
            </div>

            <div className="lg:hidden flex items-center justify-center w-full my-2 text-gold-primary">
              <span className="w-full h-px bg-gradient-to-r from-transparent via-gold-primary/40 to-transparent" />
              <span className="px-3 py-1 rounded-full border border-gold-primary/30 bg-bg-card text-xs font-mono text-gold-bright">
                TRANSLATION
              </span>
              <span className="w-full h-px bg-gradient-to-r from-transparent via-gold-primary/40 to-transparent" />
            </div>
          </div>

          {/* Right Side: Modern Cybersecurity System */}
          <div className="lg:col-span-5 bg-bg-card p-6 sm:p-8 rounded-xl border border-ancient-border flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-ancient-border/60">
                <span className="text-xs font-mono uppercase tracking-widest text-ancient-green font-semibold">
                  Modern Architecture
                </span>
                <span className="font-sans text-xs text-text-muted">Enterprise Defense</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-text-main mb-6 flex items-center gap-2">
                <span className="text-ancient-green">🛡</span> MODERN CYBERSECURITY SYSTEM
              </h3>

              <div className="space-y-3">
                {saptangaLimbs.map((limb) => (
                  <div
                    key={`modern-${limb.id}`}
                    className="p-3.5 rounded-lg bg-bg-primary/70 border border-ancient-border/30 flex items-center justify-between hover:border-ancient-green/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-ancient-green font-bold">{limb.number}</span>
                      <div>
                        <span className="font-sans font-bold text-sm text-text-main block">{limb.modernTitle}</span>
                        <span className="text-xs text-text-muted truncate max-w-[200px] sm:max-w-[260px] block">
                          {limb.modernMapping.slice(0, 3).join(" • ")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-ancient-border/40 text-xs font-mono text-text-muted">
              Unified posture across all modern threat vectors.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
