'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle, Hand } from 'lucide-react';
import { rakhiConfig } from '@/data/rakhiConfig';
import { sounds } from '@/utils/soundEffects';
import { triggerGoldBurst } from '@/components/common/ConfettiFireworks';

interface TilakInteractionProps {
  onComplete: () => void;
}

export default function TilakInteraction({ onComplete }: TilakInteractionProps) {
  const [applied, setApplied] = useState(false);

  const handleApplyTilak = () => {
    if (applied) return;
    setApplied(true);
    sounds.playTempleBell();
    sounds.playSparkle();
    triggerGoldBurst();

    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([40, 60, 40]);
    }

    setTimeout(() => {
      onComplete();
    }, 2200);
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 py-2">
      {/* Interactive Avatar / Forehead Canvas */}
      <div className="relative w-64 sm:w-72 h-64 sm:h-72 rounded-full glass-maroon gold-border flex items-center justify-center shadow-2xl overflow-hidden">
        {/* Soft face silhouette & forehead guide */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-40">
          <div className="w-36 h-48 rounded-full border-2 border-dashed border-[#d4af37]/40 flex flex-col items-center pt-8">
            <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-semibold">
              {rakhiConfig.brotherName}
            </span>
          </div>
        </div>

        {/* Target Area for Tilak */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleApplyTilak}
          disabled={applied}
          className="relative z-30 w-28 h-28 rounded-full flex flex-col items-center justify-center cursor-pointer group"
          aria-label="Tap to apply sacred Tilak"
        >
          {!applied ? (
            <div className="relative flex flex-col items-center gap-1.5">
              {/* Pulsing ring target */}
              <div className="absolute -inset-3 rounded-full border border-[#f43f5e] animate-ping opacity-50" />
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#991b1b]/80 to-[#ef4444]/60 border border-[#f87171] flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                <Hand className="w-7 h-7 text-[#fff1f2] animate-bounce" />
              </div>
              <span className="text-[11px] font-sans font-bold text-[#fecdd3] tracking-wide bg-black/60 px-2 py-0.5 rounded-full">
                TAP HERE
              </span>
            </div>
          ) : (
            /* Applied Sacred Tilak (Long vertical Kumkum line + Golden Akshat rice) */
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="relative flex flex-col items-center"
            >
              {/* Glowing Aura */}
              <div className="absolute -inset-4 rounded-full bg-red-500/30 blur-md animate-pulse" />

              {/* Red Kumkum Vertical Stroke */}
              <div className="w-3.5 h-12 rounded-full bg-gradient-to-b from-[#dc2626] via-[#b91c1c] to-[#991b1b] shadow-[0_0_12px_rgba(220,38,38,0.9)] flex flex-col items-center justify-center">
                {/* Golden Akshat Rice Grains */}
                <div className="w-1.5 h-2 bg-[#fef08a] rounded-full shadow-xs -mt-1 rotate-12" />
                <div className="w-1.5 h-2.5 bg-white rounded-full shadow-xs my-0.5 -rotate-12" />
                <div className="w-1.5 h-2 bg-[#fef08a] rounded-full shadow-xs rotate-6" />
              </div>

              <Sparkles className="w-4 h-4 text-[#ffd700] absolute -top-3 -right-3 animate-spin" />
            </motion.div>
          )}
        </motion.button>
      </div>

      {/* Dynamic Status / Instructions */}
      <div className="text-center max-w-xs space-y-1">
        <AnimatePresence mode="wait">
          {!applied ? (
            <motion.div
              key="prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-1"
            >
              <p className="text-sm font-sans font-medium text-[#fae19c]">
                {rakhiConfig.ceremony.tilak.instruction}
              </p>
              <p className="text-xs text-[#e8d7ae]/60 font-sans">
                A mark of auspiciousness & long life ✨
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-1"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs font-semibold">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{rakhiConfig.ceremony.tilak.successTitle}</span>
              </div>
              <p className="text-xs text-[#fef08a] font-serif italic">
                {rakhiConfig.ceremony.tilak.successSubtitle}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
