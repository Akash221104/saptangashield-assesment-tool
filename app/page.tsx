"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import SevenLimbs from "@/components/SevenLimbs";
import ModernMapping from "@/components/ModernMapping";
import AssessmentCTA from "@/components/AssessmentCTA";
import Footer from "@/components/Footer";

export default function Home() {
  const [activeLimbId, setActiveLimbId] = useState<string>("swami");

  const handleSelectLimb = (limbId: string) => {
    setActiveLimbId(limbId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary text-text-main">
      <Navbar />
      <main className="flex-grow">
        <Hero
          activeLimbId={activeLimbId}
          onSelectLimb={handleSelectLimb}
        />
        <Philosophy />
        <SevenLimbs
          activeLimbId={activeLimbId}
          onSelectLimb={handleSelectLimb}
        />
        <ModernMapping />
        <AssessmentCTA />
      </main>
      <Footer />
    </div>
  );
}
