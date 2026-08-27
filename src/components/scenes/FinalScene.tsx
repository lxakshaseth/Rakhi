'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, RotateCcw, Award } from 'lucide-react';
import { rakhiConfig } from '@/data/rakhiConfig';
import { sounds } from '@/utils/soundEffects';
import { triggerSideCannons, triggerGoldBurst } from '@/components/common/ConfettiFireworks';

interface FinalSceneProps {
  onReplay: () => void;
}

export default function FinalScene({ onReplay }: FinalSceneProps) {
  useEffect(() => {
    sounds.playRakhiSuccess();
    triggerGoldBurst();
    triggerSideCannons();

    const interval = setInterval(() => {
      triggerGoldBurst();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleReplayJourney = () => {
    sounds.playClick();
    onReplay();
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 py-12 text-center overflow-hidden bg-gradient-to-b from-[#120207] via-[#24040e] to-[#0c0104]">
      {/* Dynamic celebratory background glow */}
      <div className="absolute w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-gradient-to-tr from-[#991b1b]/30 via-[#d4af37]/25 to-[#f43f5e]/20 blur-3xl pointer-events-none animate-pulse-glow" />

      <div className="relative z-20 w-full max-w-sm sm:max-w-md flex flex-col items-center gap-6">
        {/* Badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 350, damping: 20 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full glass-maroon gold-border-glow shadow-xl"
        >
          <Award className="w-4 h-4 text-[#f2cb63]" />
          <span className="text-xs uppercase tracking-[0.2em] font-sans font-bold text-[#fef9ee]">
            Eternal Promise
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#f2cb63]" />
        </motion.div>

        {/* 3D Rotating Glowing Rakhi Centerpiece */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative w-44 sm:w-52 h-44 sm:h-52 flex items-center justify-center my-2"
        >
          {/* Pulsing Light Aura */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#d4af37]/40 via-[#f43f5e]/30 to-[#ffd700]/40 blur-xl animate-pulse" />

          {/* Golden Outer Ring */}
          <div className="w-full h-full rounded-full border-2 border-dashed border-[#d4af37]/60 animate-[spin_40s_linear_infinite] flex items-center justify-center p-2">
            <div className="w-full h-full rounded-full border border-[#f2cb63]/40" />
          </div>

          {/* Main Rakhi Core */}
          <div className="absolute inset-6 rounded-full bg-gradient-to-tr from-[#996515] via-[#ffd700] to-[#80500e] p-1.5 shadow-[0_0_35px_rgba(255,215,0,0.8)] border-2 border-white flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#991b1b] via-[#dc2626] to-[#7f1d1d] flex flex-col items-center justify-center text-center p-2">
              <Heart className="w-8 h-8 text-white fill-white animate-pulse" />
              <span className="font-heading text-[11px] font-bold text-[#fef08a] uppercase tracking-wider mt-1">
                Didi &amp; {rakhiConfig.brotherName}
              </span>
            </div>
          </div>

          {/* Hanging Golden Tassels / Beads */}
          <div className="absolute -bottom-6 flex gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffd700] shadow-sm animate-bounce" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#f43f5e] shadow-sm animate-bounce [animation-delay:0.2s]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffd700] shadow-sm animate-bounce [animation-delay:0.4s]" />
          </div>
        </motion.div>

        {/* Titles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="space-y-2"
        >
          <h2 className="font-royal text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#fff6d6] via-[#f7df99] to-[#d4af37] font-bold">
            {rakhiConfig.finale.title}
          </h2>
          <p className="font-script text-3xl sm:text-4xl text-[#fda4af]">
            {rakhiConfig.finale.subtitle}
          </p>
          <p className="text-xs sm:text-sm text-[#e8d7ae]/80 font-sans max-w-xs mx-auto">
            {rakhiConfig.finale.tagline}
          </p>
        </motion.div>

        {/* Replay CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="w-full flex flex-col items-center gap-4 mt-2"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReplayJourney}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f2cb63] to-[#b89125] text-[#1a030b] font-heading font-bold text-sm sm:text-base tracking-wider shadow-2xl flex items-center gap-2.5 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-[#1a030b]" />
            <span>{rakhiConfig.finale.replayButtonText}</span>
          </motion.button>
        </motion.div>

        {/* Footer Credit & Year */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-6 pt-4 border-t border-[#d4af37]/20 w-full space-y-1 text-center"
        >
          <p className="text-xs font-sans text-[#e8d7ae]/80 flex items-center justify-center gap-1.5">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-[#f43f5e] fill-[#f43f5e]" />
            <span>by {rakhiConfig.brotherName}</span>
          </p>
          <p className="text-[11px] text-[#fae19c]/60 uppercase tracking-widest font-sans">
            Raksha Bandhan {rakhiConfig.occasionYear}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
