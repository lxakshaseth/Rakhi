'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ArrowDown, Flame } from 'lucide-react';
import { rakhiConfig } from '@/data/rakhiConfig';
import { sounds } from '@/utils/soundEffects';
import MemoryImage from '@/components/common/MemoryImage';

interface MemoryTimelineProps {
  onNext: () => void;
}

export default function MemoryTimeline({ onNext }: MemoryTimelineProps) {
  const handleProceed = () => {
    sounds.playClick();
    sounds.playSparkle();
    onNext();
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center px-4 py-16 overflow-y-auto bg-gradient-to-b from-[#100105] via-[#1c030c] to-[#120208]">
      {/* Background ambient lighting */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[380px] sm:w-[500px] h-[380px] sm:h-[500px] rounded-full bg-gradient-to-br from-[#730f2e]/20 via-[#d4af37]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-sm sm:max-w-md mb-12 space-y-2 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-maroon gold-border text-xs text-[#d4af37] font-semibold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Chapter I</span>
        </div>
        <h2 className="font-royal text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#fff6d6] via-[#f7df99] to-[#d4af37]">
          {rakhiConfig.timelineTitle}
        </h2>
        <p className="text-sm text-[#e8d7ae]/80 font-sans px-4">
          {rakhiConfig.timelineSubtitle}
        </p>

        <div className="flex items-center justify-center gap-2 pt-2 text-[#d4af37]/60 text-xs uppercase tracking-widest font-sans animate-bounce">
          <span>Scroll to relive</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </div>
      </motion.div>

      {/* Timeline Reel Container */}
      <div className="relative w-full max-w-md sm:max-w-xl mx-auto flex flex-col items-center z-10">
        {/* Central Golden Thread Line */}
        <div className="absolute top-6 bottom-24 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#d4af37]/10 via-[#d4af37]/60 to-[#d4af37]/10 pointer-events-none" />

        {/* Memory Cards */}
        {rakhiConfig.timelineMemories.map((memory, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative w-full my-8 flex flex-col items-center"
            >
              {/* Central Year Badge on the Golden Thread */}
              <div className="relative z-20 mb-4 px-4 py-1 rounded-full bg-gradient-to-r from-[#5e0d27] via-[#781030] to-[#5e0d27] gold-border text-[#fae19c] font-heading font-bold text-sm tracking-wider shadow-lg flex items-center gap-1.5">
                <Heart className="w-3 h-3 text-[#f87171] fill-[#f87171]" />
                <span>{memory.year}</span>
              </div>

              {/* Polaroid Photo Card */}
              <motion.div
                whileHover={{ scale: 1.02, rotate: 0 }}
                style={{ rotate: `${memory.polaroidRotation || (isEven ? -2 : 2)}deg` }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-[90%] sm:w-[84%] bg-[#fcf9f2] text-[#220710] p-3.5 sm:p-4 rounded-xl shadow-2xl gold-border relative group"
              >
                {/* Washi Tape Accent at Top */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#d4af37]/40 backdrop-blur-sm rotate-1 shadow-sm border-t border-b border-[#b8861e]/30" />

                {/* Photo Frame */}
                <div className="w-full h-56 sm:h-64 rounded-lg overflow-hidden relative shadow-inner">
                  <MemoryImage
                    src={memory.image}
                    alt={memory.title}
                    year={memory.year}
                    tag={memory.tag}
                  />
                </div>

                {/* Polaroid Caption */}
                <div className="pt-4 pb-2 px-1 text-center space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-[#8c6a12] font-semibold tracking-wider uppercase font-sans">
                    <span>{memory.tag}</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#b8861e]" />
                  </div>
                  <h3 className="font-royal font-bold text-xl sm:text-2xl text-[#3b0615] leading-snug">
                    {memory.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#4a2608]/85 leading-relaxed">
                    {memory.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          );
        })}

        {/* Transition to Interactive Ceremony */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 text-center flex flex-col items-center gap-4 z-20"
        >
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
          <p className="text-sm font-sans text-[#e8d7ae] max-w-xs text-center">
            Memories are eternal... and now, it&apos;s time for the sacred tradition.
          </p>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212, 175, 55, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleProceed}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f2cb63] to-[#b89125] text-[#1a030b] font-heading font-semibold text-base tracking-wider shadow-xl flex items-center gap-3 cursor-pointer"
          >
            <Flame className="w-4 h-4 text-[#1a030b]" />
            <span>Perform Sacred Rakhi Ceremony 🪔</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
