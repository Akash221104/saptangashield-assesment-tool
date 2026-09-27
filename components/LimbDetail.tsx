"use client";

import React from "react";
import { Limb } from "@/data/saptanga";
import {
  Crown,
  Users,
  Network,
  Shield,
  Database,
  Swords,
  Handshake,
  CheckCircle2,
} from "lucide-react";

interface LimbDetailProps {
  limb: Limb;
}

const iconMap: Record<string, React.ReactNode> = {
  Crown: <Crown className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Network: <Network className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  Database: <Database className="w-6 h-6" />,
  Swords: <Swords className="w-6 h-6" />,
  Handshake: <Handshake className="w-6 h-6" />,
};

export default function LimbDetail({ limb }: LimbDetailProps) {
  return (
    <div className="bg-bg-card rounded-2xl border border-gold-primary/30 p-6 sm:p-8 shadow-[0_0_40px_rgba(200,169,107,0.08)] relative overflow-hidden transition-all duration-500">
      
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 p-8 opacity-5 text-gold-primary font-serif text-9xl pointer-events-none select-none leading-none">
        {limb.sanskrit}
      </div>

      {/* ANCIENT PRINCIPLE HEADER */}
      <div className="space-y-4 pb-6 border-b border-ancient-border/60">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-primary/10 border border-gold-primary/30 text-gold-bright text-xs font-mono tracking-widest uppercase">
            <span>◈</span> ANCIENT PRINCIPLE • LIMB {limb.number}
          </span>
          <span className="font-serif text-3xl font-bold text-gold-bright drop-shadow-sm">
            {limb.sanskrit}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-bg-primary border border-gold-primary/30 text-gold-bright">
            {iconMap[limb.iconName] || <Shield className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-text-main tracking-tight">
              {limb.name} — <span className="text-gold-primary font-serif italic">{limb.ancientTitle}</span>
            </h3>
          </div>
        </div>

        <p className="text-base text-text-main font-sans leading-relaxed pt-1">
          {limb.ancientMeaning}
        </p>

        <div className="p-4 rounded-lg bg-bg-primary/80 border border-ancient-border/50 text-xs font-sans text-text-muted italic">
          &ldquo;{limb.ancientConcept}&rdquo;
        </div>
      </div>

      {/* TRANSLATION CONNECTOR DIVIDER */}
      <div className="py-6 flex items-center justify-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-primary/40 to-transparent" />
        <span className="px-4 py-1.5 rounded-full border border-gold-primary/30 bg-bg-primary text-gold-bright font-mono text-xs uppercase tracking-wider shrink-0 flex items-center gap-2 shadow-sm">
          <span className="text-gold-primary font-bold">↓</span> TRANSLATED INTO MODERN CYBERSECURITY
        </span>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-primary/40 to-transparent" />
      </div>

      {/* MODERN CYBERSECURITY HIGHLIGHT CARD */}
      <div className="bg-bg-primary/90 p-6 rounded-xl border border-gold-primary/40 space-y-6 shadow-inner">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-ancient-green font-semibold block mb-1">
            Cybersecurity Pillar {limb.number}
          </span>
          <h4 className="font-serif text-2xl font-bold text-gold-bright">
            {limb.modernTitle}
          </h4>
        </div>

        {/* Modern Concept Tags */}
        <div>
          <span className="text-xs font-mono uppercase text-text-muted block mb-2.5">
            Key Defense Controls & Capabilities:
          </span>
          <div className="flex flex-wrap gap-2">
            {limb.modernMapping.map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-bg-card border border-ancient-border text-xs font-sans font-medium text-text-main hover:border-gold-primary/50 transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-primary shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Core takeaway breakdown */}
        <div className="pt-4 border-t border-ancient-border/40 space-y-2">
          <span className="text-xs font-mono text-gold-primary uppercase tracking-wider font-semibold block">
            Core Strategic Concept
          </span>
          <p className="text-sm font-sans text-text-main leading-relaxed">
            {limb.modernEquivalent}
          </p>
        </div>
      </div>

    </div>
  );
}
