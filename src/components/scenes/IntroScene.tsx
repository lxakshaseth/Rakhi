'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { rakhiConfig } from '@/data/rakhiConfig';
import { sounds } from '@/utils/soundEffects';

interface IntroSceneProps {
  onStart: () => void;
}

export default function IntroScene({ onStart }: IntroSceneProps) {
  const handleStart = () => {
    sounds.playClick();
    sounds.playSparkle();
    onStart();
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-6 py-12 text-center overflow-hidden bg-gradient-to-b from-[#100206] via-[#1a030b] to-[#0c0104]">
      {/* Background ambient circular glow lights */}
      <div className="absolute w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] rounded-full bg-gradient-to-br from-[#801033]/30 via-[#d4af37]/15 to-transparent blur-3xl pointer-events-none animate-pulse-glow" />

      {/* Traditional mandala / rangoli ornamental background layer */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="w-[420px] h-[420px] sm:w-[650px] sm:h-[650px] rounded-full border border-[#d4af37] [background-size:24px_24px] animate-[spin_120s_linear_infinite]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 max-w-sm sm:max-w-md flex flex-col items-center gap-6"
      >
        {/* Festive Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full glass-maroon gold-border"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#f2cb63]" />
          <span className="text-xs uppercase tracking-[0.2em] font-sans font-medium text-[#f4ebd2]">
            Raksha Bandhan {rakhiConfig.occasionYear}
          </span>
          <Heart className="w-3.5 h-3.5 text-[#f87171] fill-[#f87171]" />
        </motion.div>

        {/* Emotional Main Greeting */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="space-y-3"
        >
          <h1 className="font-royal text-5xl sm:text-6xl font-normal tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-[#fff6d6] via-[#f7df99] to-[#d4af37] drop-shadow-md">
            {rakhiConfig.introTitle}
          </h1>
          <p className="text-[#e8d7ae]/85 text-base sm:text-lg font-light tracking-wide font-sans leading-relaxed">
            {rakhiConfig.introSubtitle}
          </p>
        </motion.div>

        {/* Decorative Divider */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '80px', opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent my-1"
        />

        {/* Experience Prompt */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-xs text-[#e8d7ae]/60 tracking-wider uppercase font-sans"
        >
          Put on headphones for the best experience 🎧
        </motion.p>

        {/* Primary Interactive CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          whileHover={{ scale: 1.04, boxShadow: '0 0 35px rgba(212, 175, 55, 0.45)' }}
          whileTap={{ scale: 0.96 }}
          onClick={handleStart}
          className="relative mt-4 px-8 py-4 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f2cb63] to-[#b89125] text-[#1a030b] font-heading font-semibold text-base sm:text-lg tracking-wider shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all duration-300 flex items-center gap-3 group cursor-pointer"
        >
          <span>{rakhiConfig.introButtonText}</span>
          <Sparkles className="w-4 h-4 text-[#1a030b] group-hover:rotate-12 transition-transform duration-300" />
        </motion.button>
      </motion.div>

      {/* Subtle Bottom Ambient Note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-6 text-[11px] text-[#e8d7ae] tracking-widest uppercase font-sans pointer-events-none"
      >
        A personalized digital keepsake
      </motion.p>
    </div>
  );
}
