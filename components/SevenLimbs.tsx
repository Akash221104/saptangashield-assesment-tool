"use client";

import React from "react";
import { saptangaLimbs } from "@/data/saptanga";
import LimbList from "./LimbList";
import LimbDetail from "./LimbDetail";

interface SevenLimbsProps {
  activeLimbId: string;
  onSelectLimb: (id: string) => void;
}

export default function SevenLimbs({ activeLimbId, onSelectLimb }: SevenLimbsProps) {
  const activeLimb =
    saptangaLimbs.find((l) => l.id === activeLimbId) || saptangaLimbs[0];

  return (
    <section id="seven-limbs" className="py-24 bg-bg-primary relative subtle-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-bg-card border border-ancient-border text-gold-bright text-xs font-mono tracking-widest uppercase">
            INTERACTIVE EXPLORER
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-text-main tracking-tight">
            Seven pillars. <br />
            <span className="italic font-serif gold-text-gradient">One defense.</span>
          </h2>

          <p className="text-base text-text-muted font-sans leading-relaxed">
            Select any of the seven limbs below to explore how Kautilya&apos;s ancient statecraft maps directly to modern enterprise security architecture.
          </p>
        </div>

        {/* 2-Column Explorer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Vertical Limb Selector List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="p-3 bg-bg-secondary rounded-xl border border-ancient-border/60 mb-4 flex items-center justify-between text-xs font-mono text-text-muted">
              <span>SELECT A LIMB</span>
              <span className="text-gold-primary">7 LIMBS TOTAL</span>
            </div>
            <LimbList activeLimbId={activeLimbId} onSelectLimb={onSelectLimb} />
          </div>

          {/* Right Column: Dynamic Detail Card */}
          <div className="lg:col-span-7 sticky top-28">
            <LimbDetail limb={activeLimb} />
          </div>

        </div>

      </div>
    </section>
  );
}
