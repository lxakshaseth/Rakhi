'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#100105] text-center px-6">
      {/* Background ambient lighting */}
      <div className="w-64 h-64 rounded-full bg-gradient-to-br from-[#801033]/30 to-[#d4af37]/20 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center gap-5"
      >
        {/* Animated Diya / Emblem */}
        <div className="relative flex flex-col items-center justify-center">
          <div className="w-5 h-8 rounded-full bg-gradient-to-t from-[#ea580c] via-[#f59e0b] to-[#fef08a] animate-diya blur-[0.5px]" />
          <div className="w-12 h-6 rounded-b-full bg-gradient-to-r from-[#92400e] via-[#d97706] to-[#78350f] border-t border-[#fde68a]/50 shadow-lg -mt-1 flex items-center justify-center">
            <Heart className="w-3 h-3 text-[#fde68a]" />
          </div>
        </div>

        <div className="space-y-1.5">
          <h2 className="font-royal text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#fff2be] via-[#f7df99] to-[#d4af37]">
            Preparing Your Surprise...
          </h2>
          <p className="text-xs text-[#e8d7ae]/70 font-sans tracking-wide">
            Wrapping memories with golden thread ✨
          </p>
        </div>

        {/* Loading shimmer bar */}
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"
          />
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-[#f2cb63]/60 uppercase tracking-widest font-sans pt-2">
          <Sparkles className="w-3 h-3 text-[#f2cb63]" />
          <span>Made with love</span>
          <Sparkles className="w-3 h-3 text-[#f2cb63]" />
        </div>
      </motion.div>
    </div>
  );
}
