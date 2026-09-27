"use client";

import React from "react";
import { saptangaLimbs, Limb } from "@/data/saptanga";
import {
  Crown,
  Users,
  Network,
  Shield,
  Database,
  Swords,
  Handshake,
} from "lucide-react";

interface LimbListProps {
  activeLimbId: string;
  onSelectLimb: (id: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Crown: <Crown className="w-4 h-4" />,
  Users: <Users className="w-4 h-4" />,
  Network: <Network className="w-4 h-4" />,
  Shield: <Shield className="w-4 h-4" />,
  Database: <Database className="w-4 h-4" />,
  Swords: <Swords className="w-4 h-4" />,
  Handshake: <Handshake className="w-4 h-4" />,
};

export default function LimbList({ activeLimbId, onSelectLimb }: LimbListProps) {
  return (
    <div className="flex flex-col space-y-3">
      {saptangaLimbs.map((limb) => {
        const isActive = activeLimbId === limb.id;

        return (
          <button
            key={limb.id}
            onClick={() => onSelectLimb(limb.id)}
            className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center justify-between group relative overflow-hidden ${
              isActive
                ? "bg-bg-card border-l-4 border-l-gold-bright border-t border-r border-b border-gold-primary/30 shadow-[0_0_25px_rgba(200,169,107,0.12)] translate-x-1"
                : "bg-bg-card/60 border border-ancient-border/40 hover:border-gold-primary/30 hover:bg-bg-card/90"
            }`}
          >
            {/* Background Active Highlight */}
            {isActive && (
              <div className="absolute inset-0 bg-gradient-to-r from-gold-primary/10 via-transparent to-transparent pointer-events-none" />
            )}

            <div className="flex items-center space-x-3.5 z-10">
              <span
                className={`font-mono text-xs font-bold px-2.5 py-1 rounded-md ${
                  isActive
                    ? "bg-gold-primary text-bg-primary"
                    : "bg-bg-primary text-text-muted border border-ancient-border/50 group-hover:text-gold-bright"
                }`}
              >
                {limb.number}
              </span>

              <div className="p-2 rounded-md bg-bg-primary border border-ancient-border/30 text-gold-bright">
                {iconMap[limb.iconName] || <Shield className="w-4 h-4" />}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`font-sans text-sm font-bold tracking-wider uppercase ${
                      isActive ? "text-gold-bright" : "text-text-main group-hover:text-gold-bright"
                    }`}
                  >
                    {limb.name}
                  </span>
                  <span className="font-serif text-xs text-text-muted">
                    ({limb.sanskrit})
                  </span>
                </div>
                <span className="text-xs text-text-muted font-sans block mt-0.5">
                  {limb.ancientTitle}
                </span>
              </div>
            </div>

            {/* Right arrow indicator */}
            <div className="z-10">
              <span
                className={`text-xs font-bold transition-transform duration-300 ${
                  isActive
                    ? "text-gold-bright translate-x-1 inline-block"
                    : "text-text-muted/40 group-hover:text-gold-primary"
                }`}
              >
                →
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
