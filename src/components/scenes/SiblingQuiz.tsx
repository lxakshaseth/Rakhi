'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, Check, ArrowRight, Heart } from 'lucide-react';
import { rakhiConfig } from '@/data/rakhiConfig';
import { sounds } from '@/utils/soundEffects';
import { triggerGoldBurst } from '@/components/common/ConfettiFireworks';

interface SiblingQuizProps {
  onNext: () => void;
  sisterName?: string;
}

export default function SiblingQuiz({ onNext, sisterName }: SiblingQuizProps) {
  const activeName = sisterName || rakhiConfig.sisterName;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [currentReaction, setCurrentReaction] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const questions = rakhiConfig.quiz.questions;
  const currentQ = questions[currentQuestionIndex];

  const handleSelectOption = (optionId: string, reaction: string) => {
    if (selectedOptionId) return; // Prevent double click
    setSelectedOptionId(optionId);
    setCurrentReaction(reaction);
    sounds.playClick();
    sounds.playSparkle();

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedOptionId(null);
        setCurrentReaction(null);
      } else {
        setIsFinished(true);
        sounds.playRakhiSuccess();
        triggerGoldBurst();
      }
    }, 1800);
  };

  const handleProceed = () => {
    sounds.playClick();
    sounds.playSparkle();
    onNext();
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 py-12 text-center overflow-y-auto bg-gradient-to-b from-[#100105] via-[#1f030c] to-[#0d0104]">
      {/* Background ambient lighting */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] rounded-full bg-gradient-to-br from-[#7d1031]/20 via-[#d4af37]/15 to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-maroon gold-border text-xs text-[#d4af37] font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chapter III • Sibling Tribunal</span>
          </div>
          <h2 className="font-royal text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#fff6d6] via-[#f7df99] to-[#d4af37]">
            {rakhiConfig.quiz.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#e8d7ae]/85 font-sans">
            {rakhiConfig.quiz.subtitle}
          </p>
        </motion.div>

        {/* Dynamic Quiz Card or Verdict Screen */}
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key={`question-${currentQuestionIndex}`}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.5 }}
              className="w-full glass-maroon gold-border rounded-2xl p-6 shadow-2xl flex flex-col items-center gap-5"
            >
              {/* Question Index Progress Pills */}
              <div className="flex items-center gap-2">
                {questions.map((q, idx) => (
                  <div
                    key={q.id}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentQuestionIndex
                        ? 'w-7 bg-[#d4af37]'
                        : idx < currentQuestionIndex
                        ? 'w-3 bg-[#d4af37]/60'
                        : 'w-3 bg-white/20'
                    }`}
                  />
                ))}
              </div>

              {/* Question Text */}
              <h3 className="font-royal font-semibold text-xl sm:text-2xl text-[#fef9ee] leading-snug">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="w-full flex flex-col gap-3">
                {currentQ.options.map((option) => {
                  const isSelected = selectedOptionId === option.id;

                  return (
                    <motion.button
                      key={option.id}
                      whileHover={!selectedOptionId ? { scale: 1.02 } : {}}
                      whileTap={!selectedOptionId ? { scale: 0.98 } : {}}
                      onClick={() => handleSelectOption(option.id, option.reaction)}
                      disabled={!!selectedOptionId}
                      className={`w-full p-4 rounded-xl text-left font-sans text-sm sm:text-base transition-all duration-300 flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#d4af37] to-[#b8861e] text-[#1a030b] font-bold shadow-[0_0_15px_rgba(212,175,55,0.5)]'
                          : 'bg-[#330715]/80 hover:bg-[#4a0a1f] text-[#f4ebd2] border border-[#d4af37]/25'
                      }`}
                    >
                      <span>{option.text}</span>
                      {isSelected && <Check className="w-5 h-5 text-[#1a030b] shrink-0" />}
                    </motion.button>
                  );
                })}
              </div>

              {/* Instant Reaction Toast */}
              <AnimatePresence>
                {currentReaction && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="w-full py-2.5 px-4 rounded-lg bg-[#5e0d27]/90 gold-border text-[#fef08a] font-serif italic text-sm shadow-md"
                  >
                    {currentReaction}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* Result / Winner Screen */
            <motion.div
              key="verdict"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="w-full glass-maroon gold-border-glow rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center gap-5"
            >
              {/* Trophy Icon with animated glow */}
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#996515] via-[#ffd700] to-[#b8861e] p-1 shadow-[0_0_30px_rgba(255,215,0,0.7)] flex items-center justify-center">
                  <Trophy className="w-10 h-10 text-[#1a030b]" />
                </div>
                <Sparkles className="w-6 h-6 text-[#ffd700] absolute -top-2 -right-2 animate-spin" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold bg-[#d4af37]/20 px-3 py-1 rounded-full border border-[#d4af37]/40">
                  Certified Best Sister Ever
                </span>
                <h3 className="font-royal text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#ffe699] via-[#f7df99] to-[#d4af37] font-bold">
                  {activeName.toUpperCase()} WINS THE LIFETIME TROPHY! 🏆
                </h3>
                <p className="text-xs text-[#e8d7ae]/80 font-sans">
                  {rakhiConfig.quiz.result.winnerSubtitle}
                </p>
              </div>

              <div className="w-full p-4 rounded-xl bg-[#2e0613]/90 border border-[#d4af37]/30 text-sm text-[#fef9ee] font-sans leading-relaxed">
                &ldquo;{rakhiConfig.quiz.result.winnerNote}&rdquo;
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleProceed}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f2cb63] to-[#b89125] text-[#1a030b] font-heading font-bold text-base tracking-wider shadow-2xl flex items-center justify-center gap-2.5 cursor-pointer mt-2"
              >
                <span>A Little From The Heart</span>
                <Heart className="w-4 h-4 text-[#1a030b] fill-[#1a030b]" />
                <ArrowRight className="w-4 h-4 text-[#1a030b]" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
