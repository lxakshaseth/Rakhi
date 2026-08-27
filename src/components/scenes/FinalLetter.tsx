'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';
import { rakhiConfig } from '@/data/rakhiConfig';
import { sounds } from '@/utils/soundEffects';

interface FinalLetterProps {
  onNext: () => void;
  sisterName?: string;
}

export default function FinalLetter({ onNext, sisterName }: FinalLetterProps) {
  const activeName = sisterName || rakhiConfig.sisterName;
  const [revealedParagraphs, setRevealedParagraphs] = useState<number>(0);
  const letter = rakhiConfig.finalLetter;

  useEffect(() => {
    // Progressively reveal paragraphs smoothly like an ink letter being read
    const timers: NodeJS.Timeout[] = [];
    letter.paragraphs.forEach((_, idx) => {
      const t = setTimeout(() => {
        setRevealedParagraphs((prev) => Math.max(prev, idx + 1));
        sounds.playClick();
      }, (idx + 1) * 1200);
      timers.push(t);
    });

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [letter.paragraphs]);

  const handleProceed = () => {
    sounds.playClick();
    sounds.playSparkle();
    onNext();
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 py-12 overflow-y-auto bg-gradient-to-b from-[#100105] via-[#1d030c] to-[#0c0104]">
      {/* Background ambient lighting */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[380px] sm:w-[500px] h-[380px] sm:h-[500px] rounded-full bg-gradient-to-br from-[#7d0f30]/25 via-[#d4af37]/15 to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm sm:max-w-lg flex flex-col items-center gap-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-1"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-maroon gold-border text-xs text-[#d4af37] font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chapter VI • Words Unspoken</span>
          </div>
        </motion.div>

        {/* Parchment Letter Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full parchment-paper rounded-2xl p-6 sm:p-8 text-[#280c14] relative shadow-2xl gold-border"
        >
          {/* Letterhead Vintage Watermark */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 opacity-40">
            <Heart className="w-4 h-4 text-[#801033] fill-[#801033]" />
            <span className="text-[10px] tracking-widest font-sans font-bold text-[#801033]">
              {rakhiConfig.occasionYear}
            </span>
          </div>

          {/* Salutation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-4"
          >
            <h3 className="font-script text-3xl sm:text-4xl text-[#5c0d25] font-bold">
              Dearest {activeName},
            </h3>
          </motion.div>

          {/* Body Paragraphs */}
          <div className="space-y-3.5 text-sm sm:text-base font-serif leading-relaxed text-[#360e19]">
            {letter.paragraphs.map((p, idx) => {
              const isVisible = idx < revealedParagraphs;

              return (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.7 }}
                  className="font-normal"
                >
                  {p}
                </motion.p>
              );
            })}
          </div>

          {/* Sign-off */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={
              revealedParagraphs >= letter.paragraphs.length
                ? { opacity: 1 }
                : { opacity: 0 }
            }
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 pt-4 border-t border-[#801033]/20 space-y-1 text-right"
          >
            <p className="text-xs font-sans tracking-wide text-[#6e182e] italic">
              {letter.closing}
            </p>
            <p className="font-script text-2xl sm:text-3xl text-[#5c0d25] font-bold">
              {letter.signature}
            </p>
            {letter.postscript && (
              <p className="text-[11px] text-[#801033] font-sans pt-2 text-left italic">
                {letter.postscript}
              </p>
            )}
          </motion.div>
        </motion.div>

        {/* Proceed to Grand Finale */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleProceed}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f2cb63] to-[#b89125] text-[#1a030b] font-heading font-bold text-base tracking-wider shadow-2xl flex items-center gap-2.5 cursor-pointer"
        >
          <span>Grand Celebration 🎉</span>
          <ArrowRight className="w-4 h-4 text-[#1a030b]" />
        </motion.button>
      </div>
    </div>
  );
}
