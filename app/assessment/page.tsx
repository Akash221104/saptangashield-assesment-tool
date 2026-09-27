"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, ArrowLeft, Clock } from "lucide-react";

export default function AssessmentPage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-primary text-text-main">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-20 px-4 subtle-grid">
        <div className="max-w-2xl w-full bg-bg-card p-8 sm:p-12 rounded-3xl border border-gold-primary/30 text-center space-y-6 shadow-[0_0_50px_rgba(200,169,107,0.08)]">
          
          <div className="w-16 h-16 rounded-full border border-gold-primary/40 bg-bg-primary mx-auto flex items-center justify-center text-gold-bright shadow-inner">
            <Clock className="w-8 h-8 text-gold-primary animate-pulse" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-gold-bright bg-gold-primary/10 px-3 py-1 rounded-full border border-gold-primary/20 inline-block">
              PHASE 1 PROTOTYPE COMPLETE
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-text-main pt-2">
              Assessment Module Coming Next
            </h1>
          </div>

          <p className="text-sm sm:text-base font-sans text-text-muted leading-relaxed max-w-lg mx-auto">
            The multi-dimensional 21-question cybersecurity assessment engine based on Kautilya&apos;s Saptanga model will be implemented in Phase 2.
          </p>

          <div className="p-4 rounded-xl bg-bg-primary/90 border border-ancient-border/60 text-left space-y-2 text-xs font-sans text-text-muted">
            <span className="font-mono text-gold-primary font-bold uppercase block">
              Upcoming Phase 2 Capabilities:
            </span>
            <ul className="space-y-1 list-disc list-inside text-text-main/80">
              <li>21 structured diagnostic questions across all 7 limbs</li>
              <li>Dynamic Saptanga Radar Chart &amp; Security Index calculation</li>
              <li>Customized defense recommendations per limb gap</li>
              <li>Exportable academic security posture report</li>
            </ul>
          </div>

          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gold-primary text-bg-primary font-bold text-xs uppercase tracking-wider hover:bg-gold-bright transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Saptanga Framework
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
