"use client";

import Link from "next/link";
import { ShieldAlert, ArrowRight } from "lucide-react";

export default function AssessmentCTA() {
  return (
    <section className="py-24 bg-bg-primary relative overflow-hidden subtle-grid">
      {/* Glow background aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gold-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-b from-bg-card to-bg-secondary p-8 sm:p-12 md:p-16 rounded-3xl border border-gold-primary/40 text-center space-y-6 shadow-[0_0_50px_rgba(200,169,107,0.1)]">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-primary/10 border border-gold-primary/30 text-gold-bright text-xs font-mono tracking-widest uppercase">
            <ShieldAlert className="w-4 h-4 text-gold-bright" />
            CYBERSECURITY EVALUATION ENGINE
          </div>

          {/* Heading */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-text-main tracking-tight">
            Ready to test your <br className="hidden sm:block" />
            <span className="italic font-serif gold-text-gradient">seven limbs?</span>
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto font-sans leading-relaxed">
            Assess your organization&apos;s cybersecurity posture through the seven interconnected dimensions of the Saptanga-inspired defense model.
          </p>

          {/* Button */}
          <div className="pt-4 flex justify-center">
            <Link
              href="/assessment"
              className="px-8 py-4 rounded-xl bg-gold-gradient text-bg-primary font-bold text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(200,169,107,0.3)] hover:shadow-[0_0_40px_rgba(227,199,127,0.5)] hover:brightness-110 transition-all duration-300 flex items-center gap-2 group"
            >
              Start Cybersecurity Assessment
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <p className="text-xs font-mono text-text-muted pt-2">
            Phase 1 Frontend Prototype • Academic Demonstration
          </p>

        </div>
      </div>
    </section>
  );
}
