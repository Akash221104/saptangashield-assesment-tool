"use client";

import React from "react";

export interface RadarDataPoint {
  axisLabel: string;
  modernName: string;
  scorePct: number; // 0 to 100
}

interface RadarChartProps {
  data: RadarDataPoint[];
  selectedIndex?: number;
  onSelectAxis?: (index: number) => void;
}

export default function RadarChart({ data, selectedIndex, onSelectAxis }: RadarChartProps) {
  const size = 420;
  const center = size / 2;
  const radius = 135;
  const numAxes = data.length; // 7

  // Levels for concentric grid lines (20%, 40%, 60%, 80%, 100%)
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  // Helper to calculate coordinates for angle & distance
  const getCoordinates = (index: number, valueFactor: number, extraRadius = 0) => {
    const angle = (Math.PI * 2 * index) / numAxes - Math.PI / 2;
    const r = radius * valueFactor + extraRadius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, angle };
  };

  // Build grid polygon points for each level
  const gridPolygons = levels.map((level) => {
    return data
      .map((_, i) => {
        const { x, y } = getCoordinates(i, level);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  });

  // Build user score polygon points
  const dataPointsStr = data
    .map((item, i) => {
      const scoreNormalized = Math.max(0, Math.min(100, item.scorePct)) / 100;
      const { x, y } = getCoordinates(i, scoreNormalized);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div className="w-full flex items-center justify-center py-4">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full max-w-[420px] h-auto overflow-visible select-none"
      >
        <defs>
          {/* Radial Gradient for Radar Fill */}
          <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E3C77F" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#C8A96B" stopOpacity="0.15" />
          </radialGradient>

          {/* Filter for glowing vertices */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Concentric Grid Polygons */}
        {gridPolygons.map((points, idx) => (
          <polygon
            key={idx}
            points={points}
            fill="none"
            stroke="rgba(200, 169, 107, 0.18)"
            strokeWidth="1"
            strokeDasharray={idx < 4 ? "3 3" : "none"}
          />
        ))}

        {/* Radial Axis Lines */}
        {data.map((_, i) => {
          const { x, y } = getCoordinates(i, 1.0);
          const isSelected = selectedIndex === i;
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke={isSelected ? "#E3C77F" : "rgba(200, 169, 107, 0.22)"}
              strokeWidth={isSelected ? "2" : "1"}
            />
          );
        })}

        {/* User Data Polygon Area */}
        <polygon
          points={dataPointsStr}
          fill="url(#radarFill)"
          stroke="#E3C77F"
          strokeWidth="2.5"
          className="transition-all duration-700 ease-out"
        />

        {/* Data Vertices and Interactive Scores */}
        {data.map((item, i) => {
          const scoreNormalized = Math.max(0, Math.min(100, item.scorePct)) / 100;
          const { x, y } = getCoordinates(i, scoreNormalized);
          const { x: labelX, y: labelY } = getCoordinates(i, 1.0, 24);
          const isSelected = selectedIndex === i;

          // Determine text anchor based on X position relative to center
          let textAnchor: "middle" | "end" | "start" = "middle";
          if (labelX < center - 15) textAnchor = "end";
          if (labelX > center + 15) textAnchor = "start";

          return (
            <g
              key={i}
              onClick={() => onSelectAxis && onSelectAxis(i)}
              className="cursor-pointer group"
            >
              {/* Outer Pulse ring if selected */}
              {isSelected && (
                <circle
                  cx={x}
                  cy={y}
                  r="10"
                  fill="none"
                  stroke="#E3C77F"
                  strokeWidth="1.5"
                  className="animate-ping opacity-75"
                />
              )}

              {/* Point Dot */}
              <circle
                cx={x}
                cy={y}
                r={isSelected ? "7" : "5"}
                fill={isSelected ? "#E3C77F" : "#080B0A"}
                stroke="#E3C77F"
                strokeWidth="2.5"
                filter="url(#glow)"
                className="transition-all duration-300 group-hover:r-7"
              />

              {/* Axis Label & Percentage */}
              <text
                x={labelX}
                y={labelY}
                textAnchor={textAnchor}
                className={`font-sans text-[11px] tracking-tight transition-colors ${
                  isSelected
                    ? "fill-gold-bright font-bold"
                    : "fill-text-main font-semibold group-hover:fill-gold-bright"
                }`}
                dominantBaseline="central"
              >
                {item.axisLabel}
              </text>
              <text
                x={labelX}
                y={labelY + (labelY > center ? 13 : -13)}
                textAnchor={textAnchor}
                className={`font-mono text-[10px] font-bold ${
                  isSelected ? "fill-gold-bright font-extrabold" : "fill-gold-bright/80"
                }`}
                dominantBaseline="central"
              >
                {Math.round(item.scorePct)}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
