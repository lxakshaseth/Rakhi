'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Crown, ArrowRight } from 'lucide-react';
import { rakhiConfig } from '@/data/rakhiConfig';
import { sounds } from '@/utils/soundEffects';

interface IntroSceneProps {
  onStart: (enteredName: string) => void;
  defaultName?: string;
}

export default function IntroScene({ onStart, defaultName = 'Didi' }: IntroSceneProps) {
  const [name, setName] = useState(defaultName);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  const handleStart = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const finalName = name.trim() || 'Didi';
    sounds.playClick();
    sounds.playSparkle();
    onStart(finalName);
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 sm:px-6 py-8 text-center overflow-hidden bg-gradient-to-b from-[#100206] via-[#1a030b] to-[#0c0104]">
      {/* Background ambient circular glow lights */}
      <div className="absolute w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] rounded-full bg-gradient-to-br from-[#801033]/30 via-[#d4af37]/15 to-transparent blur-3xl pointer-events-none animate-pulse-glow" />

      {/* Traditional mandala / rangoli ornamental background layer */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="w-[380px] h-[380px] sm:w-[650px] sm:h-[650px] rounded-full border border-[#d4af37] [background-size:24px_24px] animate-[spin_120s_linear_infinite]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 w-full max-w-sm sm:max-w-md flex flex-col items-center gap-5 my-auto"
      >
        {/* Festive Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex items-center gap-2 px-3.5 py-1 rounded-full glass-maroon gold-border"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#f2cb63]" />
          <span className="text-[11px] uppercase tracking-[0.2em] font-sans font-medium text-[#f4ebd2]">
            Raksha Bandhan {rakhiConfig.occasionYear}
          </span>
          <Heart className="w-3 h-3 text-[#f87171] fill-[#f87171]" />
        </motion.div>

        {/* Emotional Main Greeting with Live Name Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="space-y-2"
        >
          <h1 className="font-royal text-4xl sm:text-5xl md:text-6xl font-normal tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-[#fff6d6] via-[#f7df99] to-[#d4af37] drop-shadow-md leading-tight">
            Hey {name.trim() || 'Didi'}... ❤️
          </h1>
          <p className="text-[#e8d7ae]/85 text-sm sm:text-base font-light tracking-wide font-sans leading-relaxed">
            {rakhiConfig.introSubtitle}
          </p>
        </motion.div>

        {/* 🌟 Royal Name Input Box */}
        <motion.form
          onSubmit={handleStart}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="w-full glass-maroon gold-border-glow rounded-2xl p-4 sm:p-5 flex flex-col items-center gap-3 shadow-2xl"
        >
          <div className="flex items-center gap-1.5 text-xs text-[#fae19c] font-sans font-medium">
            <Crown className="w-3.5 h-3.5 text-[#ffd700]" />
            <span>Enter Sister&apos;s Name / Nickname:</span>
          </div>

          <div className="relative w-full">
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setHasStartedTyping(true);
              }}
              onFocus={() => {
                if (!hasStartedTyping && name === 'Didi') {
                  setName('');
                }
              }}
              placeholder="e.g. Didi, Riya, Ananya, Di..."
              maxLength={25}
              className="w-full text-center text-base sm:text-lg font-heading font-bold text-[#fff8e7] bg-black/60 border border-[#d4af37]/50 rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#ffd700] focus:ring-2 focus:ring-[#ffd700]/30 transition-all placeholder-stone-500 shadow-inner"
            />
          </div>

          <p className="text-[11px] text-[#e8d7ae]/60 font-sans">
            Your personalized surprise is waiting inside ✨
          </p>
        </motion.form>

        {/* Experience Prompt */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-[11px] text-[#e8d7ae]/70 tracking-wider uppercase font-sans"
        >
          Put on headphones for best experience 🎧
        </motion.p>

        {/* Primary Interactive CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          whileHover={{ scale: 1.04, boxShadow: '0 0 35px rgba(212, 175, 55, 0.45)' }}
          whileTap={{ scale: 0.96 }}
          onClick={() => handleStart()}
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f2cb63] to-[#b89125] text-[#1a030b] font-heading font-semibold text-sm sm:text-base tracking-wider shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all duration-300 flex items-center justify-center gap-2.5 group cursor-pointer"
        >
          <span>Tap to Begin Surprise ✨</span>
          <ArrowRight className="w-4 h-4 text-[#1a030b] group-hover:translate-x-1 transition-transform duration-300" />
        </motion.button>
      </motion.div>

      {/* Bottom Ambient Note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="text-[10px] text-[#e8d7ae] tracking-widest uppercase font-sans pointer-events-none mt-auto pt-4"
      >
        A personalized digital keepsake • 2026
      </motion.p>
    </div>
  );
}
