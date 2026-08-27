'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy } from 'lucide-react';
import { rakhiConfig } from '@/data/rakhiConfig';
import { sounds } from '@/utils/soundEffects';
import TraditionalThali from './TraditionalThali';
import TilakInteraction from './TilakInteraction';
import AartiInteraction from './AartiInteraction';
import RakhiTieInteraction from './RakhiTieInteraction';

interface RakhiCeremonyProps {
  onNext: () => void;
}

export default function RakhiCeremony({ onNext }: RakhiCeremonyProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [tilakDone, setTilakDone] = useState(false);
  const [aartiDone, setAartiDone] = useState(false);
  const [rakhiDone, setRakhiDone] = useState(false);

  const handleTilakComplete = () => {
    setTilakDone(true);
    setCurrentStep(2);
  };

  const handleAartiComplete = () => {
    setAartiDone(true);
    setCurrentStep(3);
  };

  const handleRakhiComplete = () => {
    setRakhiDone(true);
  };

  const handleProceedToQuiz = () => {
    sounds.playClick();
    sounds.playSparkle();
    onNext();
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center px-4 py-12 overflow-y-auto bg-gradient-to-b from-[#120207] via-[#21040d] to-[#0f0105]">
      {/* Background ambient lighting */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] rounded-full bg-gradient-to-br from-[#801033]/25 via-[#d4af37]/15 to-transparent blur-3xl pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-sm sm:max-w-md mb-6 space-y-2 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-maroon gold-border text-xs text-[#d4af37] font-semibold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Chapter II</span>
        </div>
        <h2 className="font-royal text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#fff6d6] via-[#f7df99] to-[#d4af37]">
          {rakhiConfig.ceremony.title}
        </h2>
        <p className="text-xs sm:text-sm text-[#e8d7ae]/85 font-sans">
          {rakhiConfig.ceremony.subtitle}
        </p>
      </motion.div>

      {/* Step Container */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-6">
        {/* Sacred Thali Component Preview */}
        <TraditionalThali
          activeStep={currentStep}
          tilakDone={tilakDone}
          aartiDone={aartiDone}
          rakhiDone={rakhiDone}
        />

        {/* Step Interactions */}
        <div className="w-full flex flex-col items-center">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="w-full flex justify-center"
              >
                <TilakInteraction onComplete={handleTilakComplete} />
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="w-full flex justify-center"
              >
                <AartiInteraction onComplete={handleAartiComplete} />
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="w-full flex justify-center"
              >
                <RakhiTieInteraction onComplete={handleRakhiComplete} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Final Ceremony Completion Action */}
        {rakhiDone && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-4 text-center flex flex-col items-center gap-3"
          >
            <p className="text-xs text-[#fae19c] font-sans">
              All rituals successfully performed with love & blessings! ✨
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleProceedToQuiz}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f2cb63] to-[#b89125] text-[#1a030b] font-heading font-semibold text-sm sm:text-base tracking-wider shadow-2xl flex items-center gap-2.5 cursor-pointer"
            >
              <Trophy className="w-4 h-4 text-[#1a030b]" />
              <span>Let&apos;s Settle Some Old Arguments! 😂</span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
