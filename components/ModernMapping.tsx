"use client";

import React from "react";
import { saptangaLimbs } from "@/data/saptanga";
import { ArrowDown, ArrowRight, ShieldCheck } from "lucide-react";

export default function ModernMapping() {
  return (
    <section id="mapping" className="py-24 bg-bg-secondary border-t border-ancient-border/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-bg-card border border-ancient-border text-gold-bright text-xs font-mono tracking-widest uppercase">
            ARCHITECTURAL MAPPING TIMELINE
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-text-main tracking-tight">
            From forts to firewalls. <br />
            <span className="italic font-serif gold-text-gradient">From armies to active defense.</span>
          </h2>

          <p className="text-base text-text-muted font-sans leading-relaxed">
            The complete 7-pillar structural translation showing how each sovereign state element corresponds to a modern enterprise cybersecurity capability.
          </p>
        </div>

        {/* 7 Horizontal Mapping Cards */}
        <div className="space-y-4">
          {saptangaLimbs.map((limb) => (
            <div
              key={`map-${limb.id}`}
              className="bg-bg-card p-5 sm:p-6 rounded-xl border border-ancient-border hover:border-gold-primary/40 transition-all duration-300 shadow-md group"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                
                {/* 1. Ancient Limb Column */}
                <div className="md:col-span-3 flex items-center space-x-3.5">
                  <span className="font-mono text-xs font-bold text-gold-primary bg-bg-primary px-2.5 py-1 rounded border border-ancient-border/60">
                    {limb.number}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-sans font-bold text-base text-gold-bright tracking-wide">
                        {limb.name}
                      </span>
                      <span className="font-serif text-xs text-text-muted">
                        ({limb.sanskrit})
                      </span>
                    </div>
                    <span className="text-xs text-text-muted font-serif italic block mt-0.5">
                      {limb.ancientTitle}
                    </span>
                  </div>
                </div>

                {/* Arrow Connector (Desktop -> / Mobile v) */}
                <div className="md:col-span-1 flex items-center justify-center text-gold-primary/60 group-hover:text-gold-bright transition-colors">
                  <ArrowRight className="hidden md:block w-5 h-5" />
                  <ArrowDown className="md:hidden w-5 h-5 my-1" />
                </div>

                {/* 2. Modern Title Column */}
                <div className="md:col-span-4 bg-bg-primary/80 p-3 rounded-lg border border-ancient-border/40">
                  <span className="text-[10px] font-mono text-ancient-green uppercase block">
                    Modern Pillar
                  </span>
                  <span className="font-serif text-base font-bold text-text-main">
                    {limb.modernTitle}
                  </span>
                </div>

                {/* Arrow Connector (Desktop -> / Mobile v) */}
                <div className="md:col-span-1 flex items-center justify-center text-gold-primary/60 group-hover:text-gold-bright transition-colors">
                  <ArrowRight className="hidden md:block w-5 h-5" />
                  <ArrowDown className="md:hidden w-5 h-5 my-1" />
                </div>

                {/* 3. Controls / Tags Column */}
                <div className="md:col-span-3 flex flex-wrap gap-1.5 items-center">
                  {limb.modernMapping.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-bg-primary text-[11px] font-mono text-text-muted border border-ancient-border/40 flex items-center gap-1 group-hover:border-gold-primary/30"
                    >
                      <ShieldCheck className="w-3 h-3 text-gold-primary shrink-0" />
                      {tech}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
