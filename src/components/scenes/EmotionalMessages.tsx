'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Gift, ChevronRight } from 'lucide-react';
import { rakhiConfig } from '@/data/rakhiConfig';
import { sounds } from '@/utils/soundEffects';

interface EmotionalMessagesProps {
  onNext: () => void;
}

export default function EmotionalMessages({ onNext }: EmotionalMessagesProps) {
  const [activeMessageIndex, setActiveMessageIndex] = useState(0);
  const messages = rakhiConfig.emotionalMessages.messages;
  const isLastMessage = activeMessageIndex >= messages.length;

  const handleNextMessage = () => {
    sounds.playClick();
    sounds.playSparkle();
    setActiveMessageIndex((prev) => prev + 1);
  };

  const handleProceed = () => {
    sounds.playClick();
    sounds.playSparkle();
    onNext();
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-6 py-12 text-center overflow-hidden bg-gradient-to-b from-[#0a0104] via-[#17020a] to-[#0d0104]">
      {/* Soft warm glowing ambient orbs */}
      <div className="absolute w-[400px] sm:w-[550px] h-[400px] sm:h-[550px] rounded-full bg-gradient-to-br from-[#6b0d28]/25 via-[#d4af37]/10 to-transparent blur-3xl pointer-events-none animate-pulse-glow" />

      <div className="relative z-10 w-full max-w-sm sm:max-w-md flex flex-col items-center gap-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-1.5"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-maroon gold-border text-xs text-[#d4af37] font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chapter IV • From The Heart</span>
          </div>
          <h2 className="font-royal text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#fff6d6] via-[#f7df99] to-[#d4af37]">
            {rakhiConfig.emotionalMessages.sectionTitle}
          </h2>
          <p className="text-xs text-[#e8d7ae]/70 font-sans">
            {rakhiConfig.emotionalMessages.sectionSubtitle}
          </p>
        </motion.div>

        {/* Message Carousel / Stack */}
        <div className="w-full min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isLastMessage ? (
              <motion.div
                key={`msg-${activeMessageIndex}`}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full glass-maroon gold-border-glow rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-between gap-6 min-h-[220px]"
              >
                {/* Heart Accent */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#5e0d27] to-[#8c1639] flex items-center justify-center gold-border shadow-md">
                  <Heart className="w-5 h-5 text-[#f87171] fill-[#f87171]" />
                </div>

                <div className="space-y-3">
                  <h3 className="font-royal text-2xl sm:text-3xl text-[#fff8e7] leading-snug">
                    &ldquo;{messages[activeMessageIndex].line}&rdquo;
                  </h3>
                  {messages[activeMessageIndex].subtext && (
                    <p className="text-sm text-[#e8d7ae]/85 font-serif italic">
                      {messages[activeMessageIndex].subtext}
                    </p>
                  )}
                </div>

                {/* Next Card Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextMessage}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#d4af37]/20 to-[#f2cb63]/20 hover:from-[#d4af37]/40 hover:to-[#f2cb63]/40 border border-[#d4af37] text-[#fae19c] font-sans text-xs font-semibold tracking-wider flex items-center gap-2 cursor-pointer transition-all"
                >
                  <span>Read Next Truth</span>
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ) : (
              /* Grand Final Emotional Statement */
              <motion.div
                key="final-statement"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                className="w-full glass-maroon-dark gold-border-glow rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-6"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#991b1b] to-[#dc2626] flex items-center justify-center shadow-[0_0_25px_rgba(220,38,38,0.6)]">
                  <Heart className="w-7 h-7 text-white fill-white animate-pulse" />
                </div>

                <div className="space-y-2">
                  <p className="font-royal text-xl sm:text-2xl text-[#f4ebd2]">
                    {rakhiConfig.emotionalMessages.finalStatement.line1}
                  </p>
                  <h3 className="font-royal text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fff2be] via-[#f7df99] to-[#d4af37]">
                    {rakhiConfig.emotionalMessages.finalStatement.line2}
                  </h3>
                </div>

                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent my-1" />

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleProceed}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f2cb63] to-[#b89125] text-[#1a030b] font-heading font-bold text-base tracking-wider shadow-2xl flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Gift className="w-5 h-5 text-[#1a030b]" />
                  <span>{rakhiConfig.giftBox.title}</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
