'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle, Heart, ArrowUp } from 'lucide-react';
import { rakhiConfig } from '@/data/rakhiConfig';
import { sounds } from '@/utils/soundEffects';
import { triggerGoldBurst, triggerSideCannons } from '@/components/common/ConfettiFireworks';

interface RakhiTieInteractionProps {
  onComplete: () => void;
}

export default function RakhiTieInteraction({ onComplete }: RakhiTieInteractionProps) {
  const [tied, setTied] = useState(false);
  const wristRef = useRef<HTMLDivElement | null>(null);

  const handleTieSuccess = () => {
    if (tied) return;
    setTied(true);
    sounds.playRakhiSuccess();
    triggerGoldBurst();
    triggerSideCannons();

    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([100, 50, 100, 50, 200]);
    }

    setTimeout(() => {
      onComplete();
    }, 3200);
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 py-2 select-none">
      {/* Wrist Target Drop Zone */}
      <div
        ref={wristRef}
        className={`relative w-64 sm:w-72 h-36 rounded-2xl glass-maroon transition-all duration-500 flex flex-col items-center justify-center shadow-2xl ${
          tied
            ? 'gold-border-glow bg-[#3b0617]/90'
            : 'border-2 border-dashed border-[#d4af37]/50'
        }`}
      >
        {/* Arm / Wrist Silhouette representation */}
        <div className="absolute inset-x-4 h-16 rounded-xl bg-gradient-to-r from-[#501324]/50 via-[#701c34]/70 to-[#501324]/50 border-t border-b border-[#d4af37]/20 flex items-center justify-center overflow-hidden">
          {/* Subtle wrist watch/thread texture */}
          <div className="text-[10px] uppercase tracking-widest text-[#d4af37]/60 font-sans font-semibold">
            {rakhiConfig.brotherName}&apos;s Wrist
          </div>
        </div>

        {/* Tied Rakhi State */}
        <AnimatePresence>
          {tied && (
            <motion.div
              initial={{ scale: 0.2, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              className="relative z-30 flex flex-col items-center"
            >
              {/* Golden Rakhi Silk Thread across wrist */}
              <div className="absolute -inset-x-28 top-1/2 -translate-y-1/2 h-2.5 bg-gradient-to-r from-[#dc2626] via-[#fbbf24] to-[#dc2626] rounded-full shadow-[0_0_10px_rgba(251,191,36,0.8)]" />

              {/* Center Golden Floral Motif */}
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-[#996515] via-[#ffd700] to-[#b8861e] p-1.5 shadow-[0_0_25px_rgba(255,215,0,0.9)] border-2 border-white flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#991b1b] to-[#dc2626] flex items-center justify-center">
                  <Heart className="w-6 h-6 text-[#ffd700] fill-[#ffd700] animate-pulse" />
                </div>
                <Sparkles className="w-5 h-5 text-white absolute -top-2 -right-2 animate-spin" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!tied && (
          <div className="relative z-10 flex items-center gap-2 text-xs text-[#fae19c] font-sans font-medium animate-pulse">
            <span>Drop Rakhi Here 🎯</span>
          </div>
        )}
      </div>

      {/* Draggable Rakhi */}
      {!tied && (
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-[#fae19c]/80 uppercase tracking-wider font-sans">
            <ArrowUp className="w-3.5 h-3.5 animate-bounce" />
            <span>Drag or Tap to Tie</span>
          </div>

          <motion.div
            drag
            dragSnapToOrigin
            dragElastic={0.2}
            whileHover={{ scale: 1.1, cursor: 'grab' }}
            whileTap={{ scale: 0.95, cursor: 'grabbing' }}
            onDragEnd={(_, info) => {
              // If dragged up near the wrist box
              if (info.offset.y < -60) {
                handleTieSuccess();
              }
            }}
            onClick={handleTieSuccess}
            className="relative cursor-pointer p-4 rounded-2xl glass-maroon gold-border shadow-xl flex items-center gap-3 active:cursor-grabbing touch-none"
          >
            {/* Rakhi Visual */}
            <div className="w-12 h-1.5 bg-gradient-to-r from-red-600 to-amber-400 rounded-full" />
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#996515] via-[#ffd700] to-[#b8861e] p-1 shadow-lg border border-white flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#991b1b] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#ffd700]" />
              </div>
            </div>
            <div className="w-12 h-1.5 bg-gradient-to-r from-amber-400 to-red-600 rounded-full" />
          </motion.div>
        </div>
      )}

      {/* Dynamic Status / Instructions */}
      <div className="text-center max-w-xs space-y-2">
        <AnimatePresence mode="wait">
          {!tied ? (
            <motion.p
              key="prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs text-[#e8d7ae]/80 font-sans"
            >
              {rakhiConfig.ceremony.rakhiTie.instruction}
            </motion.p>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-2"
            >
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-400 text-emerald-200 text-xs font-semibold shadow-lg">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>{rakhiConfig.ceremony.rakhiTie.successTitle}</span>
              </div>
              <p className="text-sm text-[#fef08a] font-serif italic">
                &ldquo;{rakhiConfig.ceremony.completionQuote}&rdquo;
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
