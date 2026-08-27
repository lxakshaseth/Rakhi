'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Mail, Heart } from 'lucide-react';
import { rakhiConfig } from '@/data/rakhiConfig';
import { sounds } from '@/utils/soundEffects';
import { triggerGoldBurst } from '@/components/common/ConfettiFireworks';

interface EnvelopeSceneProps {
  onOpen: () => void;
  sisterName?: string;
}

export default function EnvelopeScene({ onOpen, sisterName }: EnvelopeSceneProps) {
  const [isOpening, setIsOpening] = useState(false);
  const activeName = sisterName || rakhiConfig.sisterName;
  const [isOpened, setIsOpened] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpening || isOpened) return;
    setIsOpening(true);
    sounds.playWhoosh();
    sounds.playSparkle();

    setTimeout(() => {
      triggerGoldBurst();
      setIsOpened(true);
      setTimeout(() => {
        onOpen();
      }, 1600);
    }, 900);
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 py-8 text-center overflow-hidden bg-gradient-to-b from-[#140208] via-[#22040e] to-[#100105]">
      {/* Background ambient lighting */}
      <div className="absolute w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] rounded-full bg-gradient-to-tr from-[#781030]/25 to-[#d4af37]/20 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 w-full max-w-sm sm:max-w-md flex flex-col items-center gap-6"
      >
        {/* Scene Heading */}
        <div className="space-y-2 px-2">
          <p className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold font-sans">
            Special Delivery For You
          </p>
          <h2 className="font-royal text-3xl sm:text-4xl text-[#fff6d6] leading-tight">
            {rakhiConfig.envelopeText.heading}
          </h2>
          <p className="text-sm text-[#e8d7ae]/80 font-sans">
            {rakhiConfig.envelopeText.subheading}
          </p>
        </div>

        {/* 3D Envelope Container */}
        <div className="relative w-[300px] sm:w-[340px] h-[210px] sm:h-[230px] my-4 [perspective:1000px]">
          {/* Glowing Aura Behind Envelope */}
          <div
            className={`absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#d4af37]/20 via-[#f2cb63]/30 to-[#801033]/25 blur-xl transition-opacity duration-1000 ${
              isOpening ? 'opacity-100 scale-105' : 'opacity-40'
            }`}
          />

          {/* Envelope Main Body */}
          <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-[#47091b] to-[#25040d] gold-border shadow-2xl overflow-hidden flex items-center justify-center">
            {/* Texture and watermark */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:12px_12px]" />
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
              <Mail className="w-32 h-32 text-[#d4af37]" />
            </div>

            {/* Inner Letter that slides out on open */}
            <AnimatePresence>
              {isOpening && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: -70, opacity: 1 }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  className="absolute z-20 w-[88%] h-[150px] rounded-xl parchment-paper p-4 flex flex-col items-center justify-center text-[#2b1016] shadow-2xl"
                >
                  <Sparkles className="w-5 h-5 text-[#b8861e] animate-spin mb-1" />
                  <p className="font-script text-2xl text-[#6b1428] font-bold">
                    For my wonderful {activeName}...
                  </p>
                  <p className="text-[11px] text-[#4a2608] tracking-widest uppercase font-sans mt-1">
                    Unfolding memories ✨
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Envelope Flap (Triangle Fold) */}
            <motion.div
              animate={isOpening ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 30 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              style={{ transformOrigin: 'top center' }}
              className="absolute top-0 inset-x-0 h-[105px] sm:h-[115px] bg-gradient-to-b from-[#5c0d24] to-[#3a0615] gold-border rounded-t-2xl [clip-path:polygon(0_0,100%_0,50%_100%)] shadow-md flex items-center justify-center"
            >
              {/* Wax Seal */}
              {!isOpening && (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenEnvelope}
                  className="absolute bottom-2 cursor-pointer w-13 h-13 rounded-full bg-gradient-to-br from-[#d4af37] via-[#f7df99] to-[#8c6a12] p-1 shadow-[0_0_15px_rgba(212,175,55,0.6)] flex items-center justify-center text-[#19030a] z-40"
                >
                  <div className="w-full h-full rounded-full border border-[#8c6a12] flex flex-col items-center justify-center">
                    <Heart className="w-4 h-4 text-[#420a1c] fill-[#420a1c]" />
                    <span className="text-[7px] font-bold tracking-tighter text-[#420a1c] uppercase">
                      LOVE
                    </span>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Bottom Flap Diagonal lines overlay */}
            <div className="absolute inset-0 pointer-events-none flex">
              <div className="w-1/2 h-full bg-gradient-to-tr from-[#3b0615]/80 to-transparent [clip-path:polygon(0_0,100%_100%,0_100%)]" />
              <div className="w-1/2 h-full bg-gradient-to-tl from-[#3b0615]/80 to-transparent [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleOpenEnvelope}
          disabled={isOpening}
          className="relative px-8 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f2cb63] to-[#b89125] text-[#1a030b] font-heading font-semibold text-sm sm:text-base tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300 flex items-center gap-2.5 cursor-pointer disabled:opacity-50"
        >
          <Mail className="w-4 h-4 text-[#1a030b]" />
          <span>{rakhiConfig.envelopeText.buttonText}</span>
          <Sparkles className="w-3.5 h-3.5 text-[#1a030b]" />
        </motion.button>
      </motion.div>
    </div>
  );
}
