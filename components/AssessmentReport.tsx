"use client";

import React, { useState } from "react";
import Link from "next/link";
import RadarChart, { RadarDataPoint } from "./RadarChart";
import {
  assessmentQuestions,
  DIMENSION_LIST,
  DIMENSIONS_INFO,
  getDimensionInfo,
  DimensionDetails,
  Question,
  Option,
} from "@/data/assessmentQuestions";

import {
  ShieldCheck,
  RotateCcw,
  Printer,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Info,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  X,
  Edit3,
  HelpCircle,
  BarChart2,
  Sparkles,
  Layers,
  Check,
} from "lucide-react";

export interface AssessmentResultData {
  overallScore: number;
  dimensionScores: Record<string, number>;
}

interface AssessmentReportProps {
  results: AssessmentResultData;
  answers: Record<number, number>;
  selectedIndices: Record<number, number>;
  onUpdateAnswer: (questionId: number, optionIndex: number, score: number) => void;
  onRetake: () => void;
}

export default function AssessmentReport({
  results,
  answers,
  selectedIndices,
  onUpdateAnswer,
  onRetake,
}: AssessmentReportProps) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedRadarAxis, setSelectedRadarAxis] = useState<number>(0);
  const [selectedAreaModalKey, setSelectedAreaModalKey] = useState<string | null>(null);
  const [expandedRecKey, setExpandedRecKey] = useState<string | null>(null);
  const [isHowScoreOpen, setIsHowScoreOpen] = useState<boolean>(false);
  const [isReviewOpen, setIsReviewOpen] = useState<boolean>(false);
  const [isRetakeConfirmOpen, setIsRetakeConfirmOpen] = useState<boolean>(false);
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(null);

  const { overallScore, dimensionScores } = results;

  const tabLabels = [
    { label: "Overview", icon: "FileText" },
    { label: "Security Areas", icon: "Layers" },
    { label: "Security Posture", icon: "BarChart2" },
    { label: "Key Strengths", icon: "CheckCircle2" },
    { label: "Attention Areas", icon: "AlertTriangle" },
    { label: "Recommendations", icon: "Sparkles" },
    { label: "Methodology", icon: "HelpCircle" },
  ];

  const dimensionList: DimensionDetails[] = DIMENSION_LIST;

  // Radar chart data points
  const radarData: RadarDataPoint[] = dimensionList.map((dim) => ({
    axisLabel: dim.shortLabel,
    modernName: dim.modernName,
    scorePct: Math.round(dimensionScores[dim.key] || 0),
  }));

  // Sorted dimensions for strengths & attention
  const sortedDimensions = [...dimensionList].sort(
    (a, b) => (dimensionScores[b.key] || 0) - (dimensionScores[a.key] || 0)
  );

  let strengthItems = sortedDimensions.filter(
    (item) => (dimensionScores[item.key] || 0) >= 70
  );
  let attentionItems = sortedDimensions.filter(
    (item) => (dimensionScores[item.key] || 0) < 70
  );

  if (strengthItems.length === 0) {
    strengthItems = sortedDimensions.slice(0, 2);
  }
  if (attentionItems.length === 0) {
    attentionItems = sortedDimensions.slice(-2);
  }

  // Priority order for recommendations: lowest scores first!
  const priorityDimensions = [...dimensionList].sort(
    (a, b) => (dimensionScores[a.key] || 0) - (dimensionScores[b.key] || 0)
  );

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const activeRadarDim = dimensionList[selectedRadarAxis] || dimensionList[0];
  const activeRadarScore = Math.round(dimensionScores[activeRadarDim.key] || 0);

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      
      {/* NO-PRINT TOP DASHBOARD HEADER & TAB BAR */}
      <div className="no-print space-y-4">
        {/* Widescreen Header Bar */}
        <div className="bg-bg-card border border-ancient-border/80 p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center text-gold-bright shadow-inner">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-gold-primary font-semibold block">
                ORGANIZATIONAL DASHBOARD
              </span>
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-text-main">
                Cybersecurity Assessment Report
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-bg-primary border border-gold-primary/30 text-right">
              <span className="text-[10px] font-mono text-text-muted uppercase block">Overall Posture</span>
              <span className="font-serif text-lg font-bold text-gold-bright">{overallScore}% Score</span>
            </div>

            <button
              onClick={() => setIsReviewOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-ancient-border text-text-muted hover:text-text-main text-xs font-mono uppercase tracking-wider transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              <span className="hidden sm:inline">Review Answers</span>
            </button>

            <button
              onClick={() => setIsRetakeConfirmOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-ancient-border text-text-muted hover:text-gold-bright text-xs font-mono uppercase tracking-wider transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Retake</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-gradient text-bg-primary font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity shadow-[0_0_15px_rgba(200,169,107,0.25)]"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save</span>
            </button>
          </div>
        </div>

        {/* HORIZONTAL TAB NAVIGATION BAR (WIDESCREEN EXPANDED) */}
        <div className="bg-bg-card border border-ancient-border/80 p-2 rounded-2xl flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
          {tabLabels.map((tab, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`flex-1 min-w-[120px] px-4 py-3 rounded-xl font-mono text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 ${
                  isActive
                    ? "bg-gold-primary/15 border border-gold-bright text-gold-bright font-bold shadow-[0_0_15px_rgba(200,169,107,0.2)]"
                    : "text-text-muted hover:text-text-main hover:bg-bg-secondary border border-transparent"
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB CONTENT CONTAINER (WIDESCREEN RESPONSIVE DISPLAY) */}
      <div className="no-print bg-bg-card border border-gold-primary/30 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[0_0_60px_rgba(200,169,107,0.06)] min-h-[480px] flex flex-col justify-between">
        <div>
          
          {/* TAB 0 — OVERVIEW (WIDESCREEN 2-COLUMN SPLIT) */}
          {activeTab === 0 && (
            <div className="space-y-8 animate-fadeIn">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* Left Column (5 cols): Executive Summary & Score Gauge */}
                <div className="lg:col-span-5 bg-bg-primary/90 border border-gold-primary/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-inner text-center lg:text-left">
                  <div className="space-y-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-gold-primary font-bold block">
                      EXECUTIVE SUMMARY
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-main">
                      CYBERSECURITY ASSESSMENT
                    </h2>
                    <p className="text-xs sm:text-sm font-sans text-text-muted leading-relaxed">
                      This assessment provides a preliminary view of the organization&apos;s cybersecurity posture across seven interconnected security areas based on representative questionnaire responses.
                    </p>
                  </div>

                  {/* Big Score Gauge Badge */}
                  <div className="p-6 rounded-2xl bg-bg-card border border-gold-primary/40 text-center shadow-lg space-y-1">
                    <span className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold gold-text-gradient block">
                      {overallScore}%
                    </span>
                    <span className="text-xs font-mono uppercase tracking-widest text-text-muted block font-semibold pt-1">
                      Overall Security Posture
                    </span>
                  </div>

                  <div>
                    <button
                      onClick={() => setActiveTab(1)}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gold-gradient text-bg-primary font-bold text-xs font-mono uppercase tracking-wider hover:opacity-95 transition-opacity shadow-[0_0_20px_rgba(200,169,107,0.25)]"
                    >
                      <span>Explore Security Areas</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right Column (7 cols): Snapshot Metrics & Takeaway Banner */}
                <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="text-xs font-mono uppercase tracking-widest text-gold-primary font-bold block">
                      ASSESSMENT SNAPSHOT
                    </span>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-5 rounded-2xl bg-bg-primary/90 border border-ancient-border/70 space-y-1">
                        <span className="text-2xl font-serif font-bold text-gold-bright block">21 / 21</span>
                        <span className="text-xs font-mono text-text-muted uppercase font-medium">Questions Answered</span>
                      </div>

                      <div className="p-5 rounded-2xl bg-bg-primary/90 border border-ancient-border/70 space-y-1">
                        <span className="text-2xl font-serif font-bold text-gold-bright block">7 Security Areas</span>
                        <span className="text-xs font-mono text-text-muted uppercase font-medium">Full Coverage</span>
                      </div>

                      <div className="p-5 rounded-2xl bg-bg-primary/90 border border-ancient-border/70 space-y-1">
                        <span className="text-2xl font-serif font-bold text-gold-bright block">{overallScore}% Score</span>
                        <span className="text-xs font-mono text-text-muted uppercase font-medium">Posture Benchmark</span>
                      </div>

                      <div className="p-5 rounded-2xl bg-bg-primary/90 border border-ancient-border/70 space-y-1">
                        <span className="text-xs font-mono font-bold text-ancient-green block pt-1">Preliminary</span>
                        <span className="text-xs font-mono text-text-muted uppercase font-medium">Diagnostic Scope</span>
                      </div>
                    </div>
                  </div>

                  {/* Strategic Takeaway Banner */}
                  <div className="p-6 rounded-2xl bg-gold-primary/10 border border-gold-primary/30 space-y-2">
                    <span className="text-xs font-mono uppercase text-gold-primary font-bold flex items-center gap-2">
                      <Sparkles className="w-4 h-4" /> Assessment Scope &amp; Purpose
                    </span>
                    <p className="text-xs sm:text-sm font-sans text-text-main leading-relaxed">
                      SaptangaShield evaluates posture equilibrium across leadership governance, operational personnel, infrastructure visibility, access control, data protection, monitoring velocity, and third-party risk.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 1 — SECURITY AREAS (WIDESCREEN 4-COLUMN RESPONSIVE GRID) */}
          {activeTab === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-ancient-border/60 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-text-main">
                    Seven Modern Cybersecurity Areas
                  </h2>
                  <p className="text-xs font-sans text-text-muted mt-1">
                    Click any security area card to view detailed questions, chosen answers, and specific assessment findings.
                  </p>
                </div>
                <span className="hidden sm:inline-block text-xs font-mono text-gold-bright font-semibold">
                  7 Areas Evaluated
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {dimensionList.map((dim) => {
                  const score = Math.round(dimensionScores[dim.key] || 0);

                  return (
                    <div
                      key={dim.key}
                      onClick={() => setSelectedAreaModalKey(dim.key)}
                      className="p-6 rounded-2xl bg-bg-primary/90 border border-ancient-border/80 hover:border-gold-primary/60 hover:bg-bg-cardHover cursor-pointer transition-all space-y-4 group shadow-md flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-serif text-lg font-bold text-text-main group-hover:text-gold-bright transition-colors">
                            {dim.modernName}
                          </span>
                          <span className="font-mono text-sm font-bold text-gold-bright bg-gold-primary/10 px-2.5 py-1 rounded border border-gold-primary/20 shrink-0">
                            {score}%
                          </span>
                        </div>

                        <div className="w-full h-2 bg-bg-card rounded-full overflow-hidden border border-ancient-border/40">
                          <div
                            className="h-full bg-gold-gradient transition-all duration-500"
                            style={{ width: `${score}%` }}
                          />
                        </div>

                        <p className="text-xs font-sans text-text-muted leading-relaxed line-clamp-3">
                          {dim.measures}
                        </p>
                      </div>

                      <div className="text-[11px] font-mono text-gold-primary group-hover:underline flex items-center justify-end gap-1 pt-2 font-semibold">
                        View Area Details →
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2 — SECURITY POSTURE (WIDESCREEN 2-COLUMN RADAR SPLIT) */}
          {activeTab === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-ancient-border/60 pb-3">
                <h2 className="font-serif text-2xl font-bold text-text-main">
                  Security Posture
                </h2>
                <p className="text-xs font-sans text-text-muted mt-1">
                  A visual representation of the organization&apos;s assessment across seven security areas. Click any axis point on the radar to inspect its posture.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Side (6 cols): Radar Chart */}
                <div className="lg:col-span-6 flex items-center justify-center">
                  <RadarChart
                    data={radarData}
                    selectedIndex={selectedRadarAxis}
                    onSelectAxis={(idx) => setSelectedRadarAxis(idx)}
                  />
                </div>

                {/* Right Side (6 cols): Selected Radar Node Detail Box */}
                <div className="lg:col-span-6 space-y-6 bg-bg-primary/90 border border-gold-primary/40 rounded-2xl p-6 sm:p-8 shadow-inner animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-ancient-border/50 pb-4">
                    <div>
                      <span className="text-xs font-mono uppercase text-gold-primary font-bold block">
                        SELECTED SECURITY AREA
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-gold-bright">
                        {activeRadarDim.modernName}
                      </h3>
                    </div>

                    <span className="font-mono text-base font-bold text-gold-primary bg-gold-primary/10 px-3.5 py-1.5 rounded-xl border border-gold-primary/30">
                      Score: {activeRadarScore}%
                    </span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase text-text-muted font-bold block">
                      Scope &amp; Measurement:
                    </span>
                    <p className="text-xs sm:text-sm font-sans text-text-main leading-relaxed">
                      {activeRadarDim.measures}
                    </p>
                  </div>

                  <div className="space-y-2 p-4 rounded-xl bg-bg-card border border-ancient-border/60">
                    <span className="text-xs font-mono uppercase text-gold-primary font-bold block">
                      Assessment Finding:
                    </span>
                    <p className="text-xs sm:text-sm font-sans text-text-muted leading-relaxed">
                      {activeRadarDim.getFinding(activeRadarScore)}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs font-mono text-text-muted">
                    <span>Click another node on the radar to inspect</span>
                    <button
                      onClick={() => setSelectedAreaModalKey(activeRadarDim.key)}
                      className="text-gold-primary hover:underline font-bold"
                    >
                      Full Details →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3 — KEY STRENGTHS (WIDESCREEN 2-COLUMN GRID) */}
          {activeTab === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-ancient-border/60 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-text-main flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-ancient-green" />
                    KEY STRENGTHS
                  </h2>
                  <p className="text-xs font-sans text-text-muted mt-1">
                    Identified higher-scoring operational security areas demonstrated in assessment responses.
                  </p>
                </div>
                <span className="text-xs font-mono text-ancient-green font-bold bg-ancient-green/10 px-3 py-1 rounded border border-ancient-green/20">
                  {strengthItems.length} Strengths Identified
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {strengthItems.map((item) => {
                  const score = Math.round(dimensionScores[item.key] || 0);

                  return (
                    <div
                      key={item.key}
                      className="p-6 rounded-2xl bg-bg-primary/90 border border-ancient-green/30 space-y-4 shadow-sm flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-serif text-xl font-bold text-gold-bright flex items-center gap-2">
                            <span className="text-ancient-green">✓</span> {item.modernName}
                          </h3>
                          <span className="font-mono text-sm font-bold text-ancient-green bg-ancient-green/10 px-3 py-1 rounded-md border border-ancient-green/20 shrink-0">
                            {score}% Posture
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm font-sans text-text-muted leading-relaxed">
                          {item.getFinding(score)}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-ancient-border/40 text-xs font-sans text-ancient-green flex items-center gap-1 font-semibold">
                        <Check className="w-4 h-4" /> Demonstrated Effective Controls
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4 — AREAS REQUIRING ATTENTION (WIDESCREEN 2-COLUMN GRID) */}
          {activeTab === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-ancient-border/60 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-text-main flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-gold-primary" />
                    AREAS REQUIRING ATTENTION
                  </h2>
                  <p className="text-xs font-sans text-text-muted mt-1">
                    Lower-scoring operational security areas that suggest opportunities for policy formalization or technical strengthening.
                  </p>
                </div>
                <span className="text-xs font-mono text-gold-primary font-bold bg-gold-primary/10 px-3 py-1 rounded border border-gold-primary/20">
                  {attentionItems.length} Focus Areas
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {attentionItems.map((item) => {
                  const score = Math.round(dimensionScores[item.key] || 0);

                  return (
                    <div
                      key={item.key}
                      className="p-6 rounded-2xl bg-bg-primary/90 border border-gold-primary/30 space-y-4 shadow-sm flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-serif text-xl font-bold text-text-main flex items-center gap-2">
                            <span className="text-gold-primary">⚠</span> {item.modernName}
                          </h3>
                          <span className="font-mono text-sm font-bold text-gold-primary bg-gold-primary/10 px-3 py-1 rounded-md border border-gold-primary/20 shrink-0">
                            {score}% Score
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm font-sans text-text-muted leading-relaxed">
                          {item.getFinding(score)}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-ancient-border/40 text-xs font-sans text-gold-primary flex items-center gap-1 font-semibold">
                        <AlertTriangle className="w-3.5 h-3.5" /> Improvement Opportunities Indicated
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5 — RECOMMENDATIONS (TRACEABLE EXPANDABLE WIDESCREEN CARDS) */}
          {activeTab === 5 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-ancient-border/60 pb-3 flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-text-main">
                    RECOMMENDATIONS
                  </h2>
                  <p className="text-xs font-sans text-text-muted mt-1">
                    Expand any security area to review the connected questionnaire findings and recommended actions.
                  </p>
                </div>
                <span className="text-xs font-mono uppercase bg-gold-primary/10 border border-gold-primary/30 text-gold-bright px-3.5 py-1.5 rounded-full font-bold">
                  Assessment-Based Priority
                </span>
              </div>

              <div className="space-y-4">
                {priorityDimensions.map((item) => {
                  const score = Math.round(dimensionScores[item.key] || 0);
                  const isExpanded = expandedRecKey === item.key;
                  const dimQuestions = assessmentQuestions.filter(
                    (q) => q.dimension === item.dimension
                  );

                  return (
                    <div
                      key={item.key}
                      className="border border-ancient-border/80 rounded-2xl bg-bg-primary/90 overflow-hidden transition-all shadow-md"
                    >
                      {/* Accordion Header */}
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedRecKey(isExpanded ? null : item.key)
                        }
                        className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-bg-cardHover transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-sm font-bold text-gold-bright bg-gold-primary/10 px-3 py-1 rounded-lg border border-gold-primary/20">
                            {score}%
                          </span>
                          <span className="font-serif text-xl font-bold text-text-main">
                            {item.modernName}
                          </span>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="text-xs font-mono text-text-muted">
                            {item.recommendations.length} Recommended Actions
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gold-primary" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-text-muted" />
                          )}
                        </div>
                      </button>

                      {/* Accordion Body with 2-Column Traceable Layout */}
                      {isExpanded && (
                        <div className="p-6 sm:p-8 border-t border-ancient-border/60 bg-bg-card/70 animate-fadeIn">
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            
                            {/* Left Column (5 cols): Findings & Traceable Questions */}
                            <div className="lg:col-span-5 space-y-4">
                              <div className="space-y-1">
                                <span className="text-xs font-mono uppercase text-gold-primary font-bold block">
                                  Assessment Finding
                                </span>
                                <p className="text-xs sm:text-sm font-sans text-text-main leading-relaxed">
                                  {item.getFinding(score)}
                                </p>
                              </div>

                              <div className="space-y-2 bg-bg-primary/90 p-4 rounded-xl border border-ancient-border/60">
                                <span className="text-[11px] font-mono text-text-muted uppercase font-bold block">
                                  Based On Assessment Questions:
                                </span>
                                <ul className="space-y-2">
                                  {dimQuestions.map((q) => (
                                    <li
                                      key={q.id}
                                      className="text-xs font-sans text-text-muted flex items-start gap-2"
                                    >
                                      <span className="font-mono text-gold-bright font-semibold shrink-0">
                                        Q{q.id}:
                                      </span>
                                      <span>{q.title}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Right Column (7 cols): Recommended Action Steps */}
                            <div className="lg:col-span-7 space-y-3">
                              <span className="text-xs font-mono uppercase text-ancient-green font-bold block">
                                Recommended Action Steps
                              </span>
                              <ol className="space-y-3">
                                {item.recommendations.map((rec, rIdx) => (
                                  <li
                                    key={rIdx}
                                    className="p-4 rounded-xl bg-bg-primary border border-ancient-border/60 flex items-start gap-3 text-xs sm:text-sm font-sans text-text-main"
                                  >
                                    <span className="font-mono text-xs font-bold text-gold-primary bg-gold-primary/10 px-2.5 py-1 rounded border border-gold-primary/30 shrink-0 mt-0.5">
                                      0{rIdx + 1}
                                    </span>
                                    <span className="leading-relaxed">{rec}</span>
                                  </li>
                                ))}
                              </ol>
                            </div>

                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 6 — METHODOLOGY (WIDESCREEN 2-COLUMN GRID) */}
          {activeTab === 6 && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-ancient-border/60 pb-3">
                <h2 className="font-serif text-2xl font-bold text-text-main">
                  ASSESSMENT METHODOLOGY
                </h2>
                <p className="text-xs font-sans text-text-muted mt-1">
                  How Kautilya&apos;s ancient Saptanga statecraft model is translated into modern cybersecurity architecture.
                </p>
              </div>

              {/* Translation Mapping Grid */}
              <div className="p-6 sm:p-8 rounded-2xl bg-bg-primary/90 border border-ancient-border/80 space-y-6">
                <p className="text-xs sm:text-sm font-sans text-text-muted leading-relaxed">
                  SaptangaShield is inspired by the ancient Saptanga framework, translating its seven foundational statecraft pillars into seven modern enterprise cybersecurity disciplines:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dimensionList.map((dim) => (
                    <div
                      key={dim.key}
                      className="p-4 rounded-xl bg-bg-card border border-ancient-border/60 flex items-center justify-between text-xs sm:text-sm"
                    >
                      <span className="font-serif text-gold-bright font-bold text-base">
                        {dim.ancientTitle}
                      </span>
                      <span className="font-mono text-text-muted">→</span>
                      <span className="font-sans text-text-main font-semibold">
                        {dim.modernName}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Collapsible Section: How score is calculated */}
              <div className="border border-ancient-border/80 rounded-2xl bg-bg-primary/90 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setIsHowScoreOpen(!isHowScoreOpen)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-lg font-bold text-gold-bright hover:bg-bg-cardHover transition-colors"
                >
                  <span>How is my score calculated?</span>
                  {isHowScoreOpen ? (
                    <ChevronUp className="w-5 h-5 text-gold-primary" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-text-muted" />
                  )}
                </button>

                {isHowScoreOpen && (
                  <div className="p-6 border-t border-ancient-border/60 bg-bg-card/70 space-y-4 font-mono text-xs text-text-muted leading-relaxed animate-fadeIn">
                    <div className="p-5 rounded-xl bg-bg-primary border border-ancient-border/50 text-center space-y-3">
                      <div className="text-gold-bright font-bold text-sm">
                        21 questions → 7 security areas → 3 questions per area
                      </div>
                      <div>Maximum 15 points per area</div>
                      <div>Area Percentage = (Earned Score / 15) × 100</div>
                      <div className="text-gold-primary font-bold text-sm">
                        Overall Security Posture = Average of 7 area percentages
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* BOTTOM TAB NAVIGATION CONTROLS */}
        <div className="pt-6 border-t border-ancient-border/60 flex items-center justify-between gap-4 mt-8">
          <button
            type="button"
            onClick={() => setActiveTab(Math.max(0, activeTab - 1))}
            disabled={activeTab === 0}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl border font-mono text-xs uppercase tracking-wider transition-all ${
              activeTab === 0
                ? "opacity-30 border-ancient-border/40 text-text-muted cursor-not-allowed bg-bg-primary"
                : "border-ancient-border text-text-main bg-bg-secondary hover:border-gold-primary/50 hover:bg-bg-cardHover hover:text-gold-bright"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          {activeTab < 6 ? (
            <button
              type="button"
              onClick={() => setActiveTab(Math.min(6, activeTab + 1))}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-gradient text-bg-primary font-bold font-mono text-xs uppercase tracking-wider hover:opacity-95 transition-opacity shadow-[0_0_15px_rgba(200,169,107,0.25)]"
            >
              <span>Next: {tabLabels[activeTab + 1]?.label}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setIsReviewOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-ancient-border text-text-muted hover:text-text-main text-xs font-mono uppercase tracking-wider"
              >
                <Edit3 className="w-4 h-4" />
                Review Answers
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-gradient text-bg-primary font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(200,169,107,0.25)]"
              >
                <Printer className="w-4 h-4" />
                Print / Save
              </button>
            </div>
          )}
        </div>

      </div>

      {/* INTERACTIVE AREA DETAILS MODAL (FOR TAB 1) */}
      {selectedAreaModalKey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-bg-card border border-gold-primary/40 rounded-3xl p-6 sm:p-8 max-w-3xl w-full max-h-[85vh] overflow-y-auto space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedAreaModalKey(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-bg-primary text-text-muted hover:text-gold-bright border border-ancient-border"
            >
              <X className="w-5 h-5" />
            </button>

            {(() => {
              const dim = getDimensionInfo(selectedAreaModalKey);
              if (!dim) return null;

              const scoreKey = dim.key;
              const score = Math.round(
                dimensionScores[scoreKey] ?? dimensionScores[dim.dimension] ?? 0
              );
              const dimQuestions = assessmentQuestions.filter(
                (q) => q.dimension.toLowerCase() === dim.dimension.toLowerCase()
              );

              return (
                <div className="space-y-6">
                  <div className="border-b border-ancient-border/60 pb-4 pr-8 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase text-gold-primary font-bold block">
                        SECURITY AREA DETAIL
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-text-main">
                        {dim.modernName}
                      </h3>
                    </div>

                    <span className="font-mono text-sm font-bold text-gold-bright bg-gold-primary/10 px-3 py-1 rounded border border-gold-primary/30">
                      Score: {score}%
                    </span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase text-text-muted font-bold block">
                      What This Area Measures:
                    </span>
                    <p className="text-xs sm:text-sm font-sans text-text-main leading-relaxed">
                      {dim.measures}
                    </p>
                  </div>

                  <div className="space-y-2 bg-bg-primary/90 p-4 rounded-2xl border border-ancient-border/60">
                    <span className="text-xs font-mono uppercase text-gold-primary font-bold block">
                      Assessment Finding:
                    </span>
                    <p className="text-xs sm:text-sm font-sans text-text-muted leading-relaxed">
                      {dim.getFinding(score)}
                    </p>
                  </div>

                  {/* Connected Questions & User Answers */}
                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-mono uppercase text-text-muted font-bold block">
                      Questionnaire Responses:
                    </span>
                    <div className="space-y-3">
                      {dimQuestions.map((q) => {
                        const selectedOptIdx = selectedIndices[q.id];
                        const chosenOpt = q.options[selectedOptIdx];
                        const scoreEarned = answers[q.id] || 0;

                        return (
                          <div
                            key={q.id}
                            className="p-4 rounded-xl bg-bg-primary border border-ancient-border/60 space-y-2"
                          >
                            <div className="flex items-center justify-between text-xs font-mono">
                              <span className="text-gold-bright font-bold">
                                Q{q.id}. {q.title}
                              </span>
                              <span className="text-ancient-green font-bold">
                                {scoreEarned} / 5 PTS
                              </span>
                            </div>
                            <p className="text-xs font-sans text-text-muted italic">
                              &ldquo;{q.question}&rdquo;
                            </p>
                            <div className="text-xs font-sans font-medium text-text-main pt-1 border-t border-ancient-border/40">
                              Selected: <span className="text-gold-bright">{chosenOpt?.text || "Not answered"}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* REVIEW & EDIT ANSWERS DIALOG */}
      {isReviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="bg-bg-card border border-gold-primary/40 rounded-3xl p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-ancient-border/60 pb-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-text-main">
                  Review &amp; Edit Answers
                </h3>
                <p className="text-xs font-sans text-text-muted">
                  Editing any answer immediately recalculates all scores, radar chart posture, and recommendations.
                </p>
              </div>
              <button
                onClick={() => setIsReviewOpen(false)}
                className="p-2 rounded-full bg-bg-primary text-text-muted hover:text-gold-bright border border-ancient-border"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {dimensionList.map((dim) => {
                const dimQuestions = assessmentQuestions.filter(
                  (q) => q.dimension === dim.dimension
                );

                return (
                  <div key={dim.key} className="space-y-3">
                    <span className="text-xs font-mono uppercase text-gold-primary font-bold block border-b border-ancient-border/40 pb-1">
                      {dim.modernName}
                    </span>

                    <div className="space-y-3">
                      {dimQuestions.map((q) => {
                        const selectedOptIdx = selectedIndices[q.id];
                        const chosenOpt = q.options[selectedOptIdx];
                        const isEditingThis = editingQuestionId === q.id;

                        return (
                          <div
                            key={q.id}
                            className="p-4 rounded-2xl bg-bg-primary border border-ancient-border/60 space-y-3"
                          >
                            <div className="flex items-center justify-between text-xs font-mono">
                              <span className="text-gold-bright font-bold">
                                Q{q.id}. {q.title}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  setEditingQuestionId(isEditingThis ? null : q.id)
                                }
                                className="text-xs font-mono text-gold-primary hover:underline flex items-center gap-1 font-semibold"
                              >
                                <Edit3 className="w-3 h-3" />
                                {isEditingThis ? "Cancel Edit" : "Edit Answer"}
                              </button>
                            </div>

                            <p className="text-xs sm:text-sm font-sans text-text-main">
                              {q.question}
                            </p>

                            {!isEditingThis ? (
                              <div className="p-3 rounded-xl bg-bg-card border border-ancient-border/40 text-xs font-sans text-text-muted flex items-center justify-between">
                                <div>
                                  Selected: <strong className="text-gold-bright">{chosenOpt?.text}</strong>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-2 pt-2 border-t border-ancient-border/50">
                                <span className="text-[11px] font-mono text-text-muted block">
                                  Select a new answer:
                                </span>
                                {q.options.map((opt: Option, oIdx: number) => (
                                  <button
                                    key={oIdx}
                                    type="button"
                                    onClick={() => {
                                      onUpdateAnswer(q.id, oIdx, opt.score);
                                      setEditingQuestionId(null);
                                    }}
                                    className={`w-full text-left p-3 rounded-xl border text-xs font-sans transition-all ${
                                      selectedOptIdx === oIdx
                                        ? "bg-gold-primary/15 border-gold-bright text-text-main font-semibold"
                                        : "bg-bg-card border-ancient-border/60 text-text-muted hover:border-gold-primary/50"
                                    }`}
                                  >
                                    {opt.text}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-ancient-border/60 flex justify-end">
              <button
                onClick={() => setIsReviewOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-gold-gradient text-bg-primary font-bold text-xs uppercase tracking-wider"
              >
                Close &amp; View Recalculated Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RETAKE CONFIRMATION MODAL */}
      {isRetakeConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="bg-bg-card border border-gold-primary/40 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl text-center">
            <div className="w-14 h-14 rounded-full bg-gold-primary/10 border border-gold-primary/30 mx-auto flex items-center justify-center text-gold-bright">
              <RotateCcw className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-text-main">
                Start a new assessment?
              </h3>
              <p className="text-xs font-sans text-text-muted leading-relaxed">
                Your current assessment results and selected answers will be replaced.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsRetakeConfirmOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-ancient-border text-text-muted hover:text-text-main font-mono text-xs uppercase tracking-wider"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsRetakeConfirmOpen(false);
                  onRetake();
                }}
                className="px-5 py-2.5 rounded-xl bg-gold-gradient text-bg-primary font-bold font-mono text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(200,169,107,0.2)]"
              >
                Start New Assessment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONTINUOUS PRINTABLE DOCUMENT FOR BROWSER PRINT (WINDOW.PRINT) */}
      <div className="hidden print:block printable-report bg-bg-card p-6 space-y-8">
        <div className="text-center space-y-4 pb-6 border-b border-ancient-border/60">
          <span className="text-xs font-mono uppercase text-gold-primary font-bold">
            CYBERSECURITY ASSESSMENT REPORT
          </span>
          <h1 className="font-serif text-4xl font-bold text-text-main">
            Overall Security Posture: {overallScore}%
          </h1>
          <p className="text-xs font-sans text-text-muted max-w-xl mx-auto">
            This assessment provides a preliminary view of the organization&apos;s cybersecurity posture across seven interconnected security areas based on representative questionnaire responses.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-text-main uppercase border-b pb-2">
            1. Security Overview
          </h2>
          <div className="space-y-2">
            {dimensionList.map((dim) => {
              const score = Math.round(dimensionScores[dim.key] || 0);
              return (
                <div key={dim.key} className="flex justify-between text-xs font-sans">
                  <span>{dim.modernName}</span>
                  <span className="font-mono font-bold">{score}%</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <h2 className="font-serif text-2xl font-bold text-text-main uppercase border-b pb-2">
            2. Security Posture Radar
          </h2>
          <RadarChart data={radarData} />
        </div>

        <div className="space-y-4 pt-4 border-t">
          <h2 className="font-serif text-2xl font-bold text-text-main uppercase border-b pb-2">
            3. Key Strengths
          </h2>
          {strengthItems.map((item) => (
            <div key={item.key} className="space-y-1">
              <span className="font-serif font-bold text-gold-bright">
                ✓ {item.modernName} ({Math.round(dimensionScores[item.key] || 0)}%)
              </span>
              <p className="text-xs text-text-muted">{item.getFinding(dimensionScores[item.key] || 0)}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4 pt-4 border-t">
          <h2 className="font-serif text-2xl font-bold text-text-main uppercase border-b pb-2">
            4. Areas Requiring Attention
          </h2>
          {attentionItems.map((item) => (
            <div key={item.key} className="space-y-1">
              <span className="font-serif font-bold text-text-main">
                ⚠ {item.modernName} ({Math.round(dimensionScores[item.key] || 0)}%)
              </span>
              <p className="text-xs text-text-muted">{item.getFinding(dimensionScores[item.key] || 0)}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4 pt-4 border-t">
          <h2 className="font-serif text-2xl font-bold text-text-main uppercase border-b pb-2">
            5. Prioritized Recommendations
          </h2>
          {priorityDimensions.map((item) => (
            <div key={item.key} className="space-y-2">
              <span className="font-serif font-bold text-gold-bright">{item.modernName}</span>
              <ul className="list-disc list-inside text-xs text-text-muted space-y-1">
                {item.recommendations.map((rec, rIdx) => (
                  <li key={rIdx}>{rec}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="space-y-4 pt-4 border-t">
          <h2 className="font-serif text-2xl font-bold text-text-main uppercase border-b pb-2">
            6. Assessment Methodology
          </h2>
          <p className="text-xs font-sans text-text-muted leading-relaxed">
            SaptangaShield is inspired by the ancient Saptanga statecraft model and translates its seven foundational pillars into seven modern enterprise cybersecurity disciplines.
          </p>
        </div>
      </div>

    </div>
  );
}
