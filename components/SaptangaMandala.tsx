"use client";

import React from "react";
import { saptangaLimbs, Limb } from "@/data/saptanga";

interface SaptangaMandalaProps {
  activeLimbId?: string;
  onSelectLimb?: (limbId: string) => void;
}

export default function SaptangaMandala({
  activeLimbId = "swami",
  onSelectLimb,
}: SaptangaMandalaProps) {
  const width = 540;
  const height = 540;
  const cx = width / 2;
  const cy = height / 2;
  const radius = 185;

  // Compute node coordinates around heptagon
  const nodes = saptangaLimbs.map((limb, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 7;
    const x = Number((cx + radius * Math.cos(angle)).toFixed(2));
    const y = Number((cy + radius * Math.sin(angle)).toFixed(2));
    return { ...limb, x, y, angle };
  });

  return (
    <div className="relative w-full max-w-[540px] aspect-square mx-auto flex items-center justify-center p-2 select-none">
      {/* Glow aura behind mandala */}
      <div className="absolute inset-4 rounded-full bg-gold-primary/5 blur-3xl pointer-events-none animate-pulse-glow" />

      {/* SVG Container */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full drop-shadow-[0_0_20px_rgba(200,169,107,0.15)] overflow-visible"
      >
        <defs>
          {/* Subtle gold line gradient */}
          <linearGradient id="goldLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C8A96B" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#E3C77F" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#9CAF84" stopOpacity="0.4" />
          </linearGradient>

          {/* Glowing node gradient */}
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E3C77F" stopOpacity="0.3" />
            <stop offset="70%" stopColor="#C8A96B" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#080B0A" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Mandala Rotating Geometry 1 */}
        <g className="origin-center animate-spin-slow">
          <circle
            cx={cx}
            cy={cy}
            r={radius + 40}
            fill="none"
            stroke="#C8A96B"
            strokeWidth="1"
            strokeDasharray="4 8"
            strokeOpacity="0.25"
          />
          <circle
            cx={cx}
            cy={cy}
            r={radius + 25}
            fill="none"
            stroke="#9CAF84"
            strokeWidth="1"
            strokeDasharray="12 6 2 6"
            strokeOpacity="0.2"
          />
          {/* Decorative geometric points on outer ring */}
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <circle
              key={deg}
              cx={Number((cx + (radius + 40) * Math.cos((deg * Math.PI) / 180)).toFixed(2))}
              cy={Number((cy + (radius + 40) * Math.sin((deg * Math.PI) / 180)).toFixed(2))}
              r="2"
              fill="#C8A96B"
              fillOpacity="0.4"
            />
          ))}
        </g>


        {/* Outer Mandala Rotating Geometry 2 (Counter direction) */}
        <g className="origin-center animate-spin-slow-reverse">
          <circle
            cx={cx}
            cy={cy}
            r={radius + 10}
            fill="none"
            stroke="#E3C77F"
            strokeWidth="0.75"
            strokeDasharray="2 12"
            strokeOpacity="0.3"
          />
          {/* Heptagon outer boundary line */}
          <polygon
            points={nodes.map((n) => `${n.x},${n.y}`).join(" ")}
            fill="none"
            stroke="#C8A96B"
            strokeWidth="1"
            strokeDasharray="6 4"
            strokeOpacity="0.2"
          />
        </g>

        {/* Perimeter connecting lines between adjacent nodes */}
        {nodes.map((node, i) => {
          const nextNode = nodes[(i + 1) % nodes.length];
          const isConnectedActive =
            activeLimbId === node.id || activeLimbId === nextNode.id;
          return (
            <line
              key={`perimeter-${node.id}-${nextNode.id}`}
              x1={node.x}
              y1={node.y}
              x2={nextNode.x}
              y2={nextNode.y}
              stroke={isConnectedActive ? "#E3C77F" : "#C8A96B"}
              strokeWidth={isConnectedActive ? "2" : "1"}
              strokeOpacity={isConnectedActive ? "0.6" : "0.25"}
              className="transition-all duration-300"
            />
          );
        })}

        {/* Radial Spokes from Central Node to 7 Limbs */}
        {nodes.map((node) => {
          const isActive = activeLimbId === node.id;
          return (
            <line
              key={`spoke-${node.id}`}
              x1={cx}
              y1={cy}
              x2={node.x}
              y2={node.y}
              stroke={isActive ? "#E3C77F" : "url(#goldLineGrad)"}
              strokeWidth={isActive ? "2.5" : "1.25"}
              strokeDasharray={isActive ? "none" : "3 3"}
              strokeOpacity={isActive ? "0.9" : "0.35"}
              className="transition-all duration-300"
            />
          );
        })}

        {/* Central Core Circle */}
        <circle cx={cx} cy={cy} r="65" fill="url(#centerGlow)" />
        <circle
          cx={cx}
          cy={cy}
          r="54"
          fill="#101512"
          stroke="#C8A96B"
          strokeWidth="1.5"
          strokeOpacity="0.7"
          className="drop-shadow-[0_0_15px_rgba(200,169,107,0.3)]"
        />
        <circle
          cx={cx}
          cy={cy}
          r="48"
          fill="none"
          stroke="#9CAF84"
          strokeWidth="1"
          strokeDasharray="4 3"
          strokeOpacity="0.4"
        />

        {/* Central Core Text */}
        <text
          x={cx}
          y={cy - 8}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#E3C77F"
          className="font-serif text-lg font-bold tracking-widest pointer-events-none select-none"
        >
          सप्ताङ्ग
        </text>
        <text
          x={cx}
          y={cy + 12}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#E9DFC9"
          className="font-sans text-[11px] font-semibold tracking-widest uppercase pointer-events-none select-none opacity-90"
        >
          SAPTANGA
        </text>

        {/* 7 Peripheral Limb Nodes */}
        {nodes.map((node) => {
          const isActive = activeLimbId === node.id;

          return (
            <g
              key={node.id}
              onClick={() => onSelectLimb && onSelectLimb(node.id)}
              className="cursor-pointer group"
            >
              {/* Active Pulse Outer Ring */}
              {isActive && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="34"
                  fill="none"
                  stroke="#E3C77F"
                  strokeWidth="1.5"
                  className="animate-ping origin-center opacity-40"
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                />
              )}

              {/* Node Outer Circle */}
              <circle
                cx={node.x}
                cy={node.y}
                r="28"
                fill={isActive ? "#141A16" : "#101512"}
                stroke={isActive ? "#E3C77F" : "#C8A96B"}
                strokeWidth={isActive ? "2" : "1"}
                strokeOpacity={isActive ? "1" : "0.5"}
                className="transition-all duration-300 group-hover:stroke-gold-bright group-hover:scale-110"
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              />

              {/* Node Content Inner Fill */}
              <circle
                cx={node.x}
                cy={node.y}
                r="24"
                fill={isActive ? "rgba(200, 169, 107, 0.15)" : "rgba(16, 21, 18, 0.9)"}
                className="transition-colors duration-300"
              />

              {/* Limb Number */}
              <text
                x={node.x}
                y={node.y - 6}
                textAnchor="middle"
                dominantBaseline="central"
                fill={isActive ? "#E3C77F" : "#9CAF84"}
                className="font-mono text-[10px] font-bold tracking-widest pointer-events-none"
              >
                {node.number}
              </text>

              {/* Limb Name */}
              <text
                x={node.x}
                y={node.y + 7}
                textAnchor="middle"
                dominantBaseline="central"
                fill={isActive ? "#FFFFFF" : "#E9DFC9"}
                className="font-sans text-[11px] font-bold tracking-wider pointer-events-none"
              >
                {node.name}
              </text>

              {/* Label Pill below/above node */}
              <g className="pointer-events-none">
                <rect
                  x={node.x - 48}
                  y={node.y + (node.y > cy ? 32 : -46)}
                  width="96"
                  height="18"
                  rx="9"
                  fill="#080B0A"
                  fillOpacity="0.85"
                  stroke={isActive ? "#C8A96B" : "rgba(200, 169, 107, 0.2)"}
                  strokeWidth="1"
                />
                <text
                  x={node.x}
                  y={node.y + (node.y > cy ? 41 : -37)}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={isActive ? "#E3C77F" : "#9A9C91"}
                  className="font-serif text-[10px] font-semibold tracking-wide"
                >
                  {node.modernTitle.split(" ")[0]}
                </text>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
