"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  assessmentQuestions,
  Question,
  Option,
} from "@/data/assessmentQuestions";
import AssessmentReport, { AssessmentResultData } from "./AssessmentReport";
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";

// User answers state: questionId -> score (0, 2, 3, or 5)
export type UserAnswers = Record<number, number>;
// Also track selected option index per question: questionId -> optionIndex
export type SelectedIndices = Record<number, number>;

export default function AssessmentEngine() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [selectedIndices, setSelectedIndices] = useState<SelectedIndices>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const totalQuestions = assessmentQuestions.length; // 21
  const currentQuestion: Question = assessmentQuestions[currentQuestionIndex];

  const selectedOptionIndex = selectedIndices[currentQuestion.id];
  const isOptionSelected = selectedOptionIndex !== undefined;

  // Handle selecting an option for the current question
  const handleSelectOption = (optionIndex: number, score: number) => {
    setSelectedIndices((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }));
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: score,
    }));
  };

  // Navigate to Next question or finish
  const handleNext = () => {
    if (!isOptionSelected) return;

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  // Navigate to Previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Reset/retake assessment
  const handleReset = () => {
    setAnswers({});
    setSelectedIndices({});
    setCurrentQuestionIndex(0);
    setIsCompleted(false);
  };

  // Calculate scores for Phase 3 report
  const calculateResults = (): AssessmentResultData => {
    const dimensionTotals: Record<string, number> = {
      Swami: 0,
      Amatya: 0,
      Janapada: 0,
      Durga: 0,
      Kosha: 0,
      Danda: 0,
      Mitra: 0,
    };

    assessmentQuestions.forEach((q) => {
      const score = answers[q.id] || 0;
      if (dimensionTotals[q.dimension] !== undefined) {
        dimensionTotals[q.dimension] += score;
      }
    });

    const swamiPct = (dimensionTotals["Swami"] / 15) * 100;
    const amatyaPct = (dimensionTotals["Amatya"] / 15) * 100;
    const janapadaPct = (dimensionTotals["Janapada"] / 15) * 100;
    const durgaPct = (dimensionTotals["Durga"] / 15) * 100;
    const koshaPct = (dimensionTotals["Kosha"] / 15) * 100;
    const dandaPct = (dimensionTotals["Danda"] / 15) * 100;
    const mitraPct = (dimensionTotals["Mitra"] / 15) * 100;

    const allPcts = [swamiPct, amatyaPct, janapadaPct, durgaPct, koshaPct, dandaPct, mitraPct];
    const avgPct = allPcts.reduce((acc, curr) => acc + curr, 0) / 7;

    return {
      overallScore: Math.round(avgPct),
      dimensionScores: {
        swami: swamiPct,
        amatya: amatyaPct,
        janapada: janapadaPct,
        durga: durgaPct,
        kosha: koshaPct,
        danda: dandaPct,
        mitra: mitraPct,
      },
    };
  };

  if (isCompleted) {
    const results = calculateResults();
    return (
      <AssessmentReport
        results={results}
        answers={answers}
        selectedIndices={selectedIndices}
        onUpdateAnswer={(questionId, optionIndex, score) => {
          setSelectedIndices((prev) => ({ ...prev, [questionId]: optionIndex }));
          setAnswers((prev) => ({ ...prev, [questionId]: score }));
        }}
        onRetake={handleReset}
      />
    );
  }


  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-6 sm:py-10 space-y-6">
      
      {/* TOP HEADER & PROGRESS */}
      <div className="bg-bg-card border border-ancient-border/80 rounded-2xl p-4 sm:p-6 space-y-4 shadow-[0_0_30px_rgba(8,11,10,0.8)]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-lg sm:text-xl font-bold text-text-main tracking-wider">
              Cybersecurity Assessment
            </h1>
            <span className="text-xs font-mono text-gold-bright font-semibold">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
          </div>

          <span className="text-xs font-mono text-text-muted font-bold">
            {progressPercent}% Completed
          </span>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-full h-2 bg-bg-primary rounded-full overflow-hidden border border-ancient-border/50">
          <div
            className="h-full bg-gold-gradient transition-all duration-300 ease-out shadow-[0_0_12px_rgba(200,169,107,0.4)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* QUESTION CARD */}
      <div
        key={currentQuestion.id}
        className="bg-bg-card border border-gold-primary/30 rounded-3xl p-6 sm:p-10 space-y-8 shadow-[0_0_50px_rgba(200,169,107,0.06)] transition-all duration-300"
      >
        {/* QUESTION TEXT */}
        <div className="space-y-2">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-text-main leading-relaxed">
            {currentQuestion.question}
          </h2>
        </div>

        {/* ANSWER OPTIONS */}
        <div className="space-y-4">
          {currentQuestion.options.map((option: Option, idx: number) => {
            const isSelected = selectedOptionIndex === idx;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(idx, option.score)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4 group ${
                  isSelected
                    ? "bg-gold-primary/10 border-gold-bright text-text-main shadow-[0_0_25px_rgba(200,169,107,0.18)] ring-1 ring-gold-bright/50"
                    : "bg-bg-primary/90 border-ancient-border/70 text-text-muted hover:border-gold-primary/40 hover:bg-bg-cardHover hover:text-text-main"
                }`}
              >
                {/* Radio Circle */}
                <div
                  className={`mt-0.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? "border-gold-bright bg-gold-primary text-bg-primary shadow-[0_0_10px_rgba(227,199,127,0.5)]"
                      : "border-ancient-border group-hover:border-gold-primary/60 bg-bg-card"
                  }`}
                >
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />}
                </div>

                {/* Option Text (No Points Displayed) */}
                <p
                  className={`text-sm sm:text-base font-sans leading-relaxed transition-colors ${
                    isSelected ? "text-text-main font-medium" : "text-text-muted group-hover:text-text-main"
                  }`}
                >
                  {option.text}
                </p>
              </button>
            );
          })}
        </div>

        {/* NAVIGATION CONTROLS */}
        <div className="pt-6 border-t border-ancient-border/60 flex items-center justify-between gap-4">
          {/* PREVIOUS BUTTON */}
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl border font-mono text-xs uppercase tracking-wider transition-all ${
              currentQuestionIndex === 0
                ? "opacity-30 border-ancient-border/40 text-text-muted cursor-not-allowed bg-bg-primary"
                : "border-ancient-border text-text-main bg-bg-secondary hover:border-gold-primary/50 hover:bg-bg-cardHover hover:text-gold-bright"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          {/* NEXT / VIEW RESULTS BUTTON */}
          <button
            type="button"
            onClick={handleNext}
            disabled={!isOptionSelected}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold font-mono text-xs uppercase tracking-wider transition-all ${
              !isOptionSelected
                ? "opacity-40 bg-bg-secondary border border-ancient-border text-text-muted cursor-not-allowed"
                : "bg-gold-gradient text-bg-primary shadow-[0_0_20px_rgba(200,169,107,0.25)] hover:opacity-95 cursor-pointer"
            }`}
          >
            {currentQuestionIndex === totalQuestions - 1 ? (
              <>
                View Results
                <CheckCircle2 className="w-4 h-4" />
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}
