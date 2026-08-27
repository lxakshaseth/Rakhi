'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TraditionalThaliProps {
  activeStep: 1 | 2 | 3;
  tilakDone?: boolean;
  aartiDone?: boolean;
  rakhiDone?: boolean;
  onSelectStep?: (step: 1 | 2 | 3) => void;
}

export default function TraditionalThali({
  activeStep,
  tilakDone = false,
  aartiDone = false,
  rakhiDone = false,
}: TraditionalThaliProps) {
  return (
    <div className="relative w-72 sm:w-80 h-72 sm:h-80 mx-auto select-none pointer-events-none">
      {/* Golden Brass Thali Outer Plate */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#996515] via-[#f7df99] to-[#80500e] p-2.5 shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_30px_rgba(212,175,55,0.25)] border border-[#ffd700]/50">
        {/* Intricate Rim Ornamentation */}
        <div className="w-full h-full rounded-full border border-dashed border-[#80500e] bg-gradient-to-br from-[#4a081a] via-[#630c24] to-[#360512] relative overflow-hidden flex items-center justify-center">
          {/* Subtle floral mandala pattern inside thali */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffd700_1.5px,transparent_1.5px)] [background-size:16px_16px]" />

          {/* 1. Sacred Lit Diya in the center */}
          <div className="relative z-20 flex flex-col items-center justify-center">
            {/* Diya Flame */}
            <div className="relative -mb-1">
              <div className="w-4 h-7 rounded-full bg-gradient-to-t from-[#ea580c] via-[#f59e0b] to-[#fef08a] animate-diya blur-[0.5px]" />
              <div className="absolute inset-0 w-2 h-4 mx-auto top-2 rounded-full bg-white blur-[1px]" />
              <div className="absolute -inset-2 bg-amber-400/30 rounded-full blur-md animate-pulse" />
            </div>
            {/* Clay / Brass Diya Body */}
            <div className="w-12 h-6 rounded-b-full bg-gradient-to-r from-[#92400e] via-[#d97706] to-[#78350f] border-t border-[#fde68a]/40 shadow-md flex items-center justify-center">
              <div className="w-8 h-1 bg-[#451a03] rounded-full" />
            </div>
          </div>

          {/* 2. Kumkum Katori (Red Vermillion) - Top Left */}
          <motion.div
            animate={activeStep === 1 ? { scale: [1, 1.1, 1] } : {}}
            transition={{ repeat: Infinity, duration: 2 }}
            className={`absolute top-6 left-12 w-12 h-12 rounded-full bg-gradient-to-tr from-[#78350f] to-[#fbbf24] p-1 shadow-md ${
              activeStep === 1 ? 'ring-2 ring-[#fb7185] ring-offset-2 ring-offset-[#4a081a]' : ''
            }`}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#991b1b] via-[#dc2626] to-[#7f1d1d] shadow-inner flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-[#ef4444] blur-[1px] opacity-80" />
            </div>
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-bold text-[#fef08a] tracking-wider uppercase">
              Kumkum
            </span>
          </motion.div>

          {/* 3. Akshat (Rice Grains) - Top Right */}
          <div className="absolute top-6 right-12 w-12 h-12 rounded-full bg-gradient-to-tr from-[#78350f] to-[#fbbf24] p-1 shadow-md">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1] shadow-inner flex flex-wrap gap-0.5 p-1.5 items-center justify-center overflow-hidden">
              <div className="w-1.5 h-3 bg-white rounded-full rotate-45 shadow-xs" />
              <div className="w-1.5 h-3 bg-[#fef08a] rounded-full -rotate-12 shadow-xs" />
              <div className="w-1.5 h-3 bg-white rounded-full rotate-12 shadow-xs" />
            </div>
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-bold text-[#fef08a] tracking-wider uppercase">
              Akshat
            </span>
          </div>

          {/* 4. Mithai (Sweets / Kaju Katli) - Bottom Left */}
          <div className="absolute bottom-6 left-12 flex items-center justify-center">
            <div className="w-10 h-10 bg-gradient-to-br from-[#f1f5f9] via-[#e2e8f0] to-[#cbd5e1] rotate-45 border border-[#d4af37]/60 shadow-md flex items-center justify-center">
              {/* Edible silver foil sheen */}
              <div className="w-6 h-6 bg-gradient-to-tr from-white to-transparent opacity-80" />
            </div>
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-bold text-[#fef08a] tracking-wider uppercase">
              Mithai
            </span>
          </div>

          {/* 5. Fresh Rose / Marigold Flowers - Bottom Right */}
          <div className="absolute bottom-6 right-12 flex items-center justify-center">
            <div className="relative flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#ea580c] to-[#f59e0b] shadow-sm flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-[#dc2626]" />
              </div>
              <div className="absolute -top-2 -right-1 w-6 h-6 rounded-full bg-gradient-to-tr from-[#e11d48] to-[#f43f5e] shadow-xs" />
            </div>
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-bold text-[#fef08a] tracking-wider uppercase">
              Flowers
            </span>
          </div>
        </div>
      </div>

      {/* Step Indicators Badges */}
      <div className="absolute -bottom-3 inset-x-0 flex justify-center gap-2">
        <span
          className={`text-[10px] px-2.5 py-0.5 rounded-full border transition-all ${
            tilakDone
              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
              : activeStep === 1
              ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#fae19c]'
              : 'bg-black/40 border-stone-700 text-stone-400'
          }`}
        >
          1. Tilak {tilakDone ? '✓' : ''}
        </span>
        <span
          className={`text-[10px] px-2.5 py-0.5 rounded-full border transition-all ${
            aartiDone
              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
              : activeStep === 2
              ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#fae19c]'
              : 'bg-black/40 border-stone-700 text-stone-400'
          }`}
        >
          2. Aarti {aartiDone ? '✓' : ''}
        </span>
        <span
          className={`text-[10px] px-2.5 py-0.5 rounded-full border transition-all ${
            rakhiDone
              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
              : activeStep === 3
              ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#fae19c]'
              : 'bg-black/40 border-stone-700 text-stone-400'
          }`}
        >
          3. Rakhi {rakhiDone ? '✓' : ''}
        </span>
      </div>
    </div>
  );
}
