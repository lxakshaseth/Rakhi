'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, RotateCcw, Award, ShieldCheck, Download, Flame } from 'lucide-react';
import { rakhiConfig } from '@/data/rakhiConfig';
import { sounds } from '@/utils/soundEffects';
import { triggerSideCannons, triggerGoldBurst } from '@/components/common/ConfettiFireworks';
import { jsPDF } from 'jspdf';

interface FinalSceneProps {
  onReplay: () => void;
}

interface FloatingHeart {
  id: number;
  x: number;
  size: number;
}

export default function FinalScene({ onReplay }: FinalSceneProps) {
  const [heartCount, setHeartCount] = useState(1);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const [activePromiseIndex, setActivePromiseIndex] = useState<number | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const brotherPromises = [
    {
      id: 1,
      title: 'The 1st Ring Rule 📞',
      vow: 'No matter what meeting or work I am in, I will always answer your call on the first ring.',
      icon: '📞',
    },
    {
      id: 2,
      title: 'Your Permanent Shield 🛡️',
      vow: 'Even if the whole world stands on one side in an argument, I will stand by you.',
      icon: '🛡️',
    },
    {
      id: 3,
      title: 'Food Tax Exemption 🍕',
      vow: 'You will always get the bigger slice of pizza, the last scoop of ice cream, and first bite of sweets.',
      icon: '🍕',
    },
    {
      id: 4,
      title: 'The Secret Vault 🤐',
      vow: 'Your secrets, midnight cravings, and sneaky shopping parcels are safe with me forever.',
      icon: '🤐',
    },
    {
      id: 5,
      title: 'Home Is Where You Are 🏡',
      vow: 'Wherever in the world life takes us, my door, my heart, and my shoulder will always be open for you.',
      icon: '🏡',
    },
  ];

  useEffect(() => {
    sounds.playRakhiSuccess();
    triggerGoldBurst();
    triggerSideCannons();

    const interval = setInterval(() => {
      triggerGoldBurst();
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const handleSendHeart = () => {
    sounds.playHeartPop();
    setHeartCount((prev) => prev + 1);

    const newHeart: FloatingHeart = {
      id: Date.now() + Math.random(),
      x: (Math.random() - 0.5) * 160,
      size: Math.random() * 12 + 18,
    };

    setFloatingHearts((prev) => [...prev.slice(-15), newHeart]);

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1500);

    if ((heartCount + 1) % 10 === 0) {
      triggerGoldBurst();
    }
  };

  const handleDownloadCertificate = () => {
    setIsDownloading(true);
    sounds.playSparkle();

    try {
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      // Gold Ornamental Border
      doc.setDrawColor(212, 175, 55);
      doc.setLineWidth(3);
      doc.rect(10, 10, 277, 190);

      doc.setDrawColor(92, 13, 37);
      doc.setLineWidth(1);
      doc.rect(14, 14, 269, 182);

      // Certificate Background Fill
      doc.setFillColor(254, 253, 248);
      doc.rect(15, 15, 267, 180, 'F');

      // Top Banner
      doc.setFillColor(92, 13, 37);
      doc.rect(15, 15, 267, 24, 'F');

      doc.setTextColor(255, 246, 214);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.text('CERTIFICATE OF ROYAL HONOR', 148, 29, { align: 'center' });

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('INTERNATIONAL SIBLING TRIBUNAL & RAKHI VAULT', 148, 35, { align: 'center' });

      // Certificate Body Text
      doc.setTextColor(92, 13, 37);
      doc.setFont('times', 'italic');
      doc.setFontSize(16);
      doc.text('This is officially certified and sworn that', 148, 60, { align: 'center' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(32);
      doc.setTextColor(184, 134, 30);
      doc.text(rakhiConfig.sisterName.toUpperCase(), 148, 78, { align: 'center' });

      doc.setTextColor(35, 10, 18);
      doc.setFont('times', 'normal');
      doc.setFontSize(14);
      doc.text(
        `has been crowned the Undisputed Best Sister in the Universe on this auspicious day of Raksha Bandhan ${rakhiConfig.occasionYear}.`,
        148,
        94,
        { align: 'center', maxWidth: 220 }
      );

      doc.setFontSize(12);
      doc.text(
        'For being the ultimate shield, best friend, constant protector, and greatest source of pride and love.',
        148,
        110,
        { align: 'center', maxWidth: 220 }
      );

      // Signatures
      doc.setDrawColor(184, 134, 30);
      doc.line(45, 160, 105, 160);
      doc.line(190, 160, 250, 160);

      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(`${rakhiConfig.brotherName} (Brother)`, 75, 168, { align: 'center' });
      doc.text('The Sibling Court of Honor', 220, 168, { align: 'center' });

      doc.save(`Best_Sister_Certificate_${rakhiConfig.sisterName}_2026.pdf`);
    } catch {
      // Graceful handling
    }

    setIsDownloading(false);
  };

  const handleReplayJourney = () => {
    sounds.playClick();
    onReplay();
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 py-12 text-center overflow-y-auto bg-gradient-to-b from-[#120207] via-[#24040e] to-[#0c0104]">
      {/* Dynamic celebratory background glow */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-gradient-to-tr from-[#991b1b]/30 via-[#d4af37]/25 to-[#f43f5e]/20 blur-3xl pointer-events-none animate-pulse-glow" />

      <div className="relative z-20 w-full max-w-sm sm:max-w-md flex flex-col items-center gap-6">
        {/* Badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 350, damping: 20 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full glass-maroon gold-border-glow shadow-xl"
        >
          <Award className="w-4 h-4 text-[#f2cb63]" />
          <span className="text-xs uppercase tracking-[0.2em] font-sans font-bold text-[#fef9ee]">
            Eternal Promise
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#f2cb63]" />
        </motion.div>

        {/* 3D Rotating Glowing Rakhi Centerpiece */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative w-40 sm:w-48 h-40 sm:h-48 flex items-center justify-center my-1"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#d4af37]/40 via-[#f43f5e]/30 to-[#ffd700]/40 blur-xl animate-pulse" />

          {/* Golden Outer Ring */}
          <div className="w-full h-full rounded-full border-2 border-dashed border-[#d4af37]/60 animate-[spin_40s_linear_infinite] flex items-center justify-center p-2">
            <div className="w-full h-full rounded-full border border-[#f2cb63]/40" />
          </div>

          {/* Main Rakhi Core */}
          <div className="absolute inset-5 rounded-full bg-gradient-to-tr from-[#996515] via-[#ffd700] to-[#80500e] p-1.5 shadow-[0_0_35px_rgba(255,215,0,0.8)] border-2 border-white flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#991b1b] via-[#dc2626] to-[#7f1d1d] flex flex-col items-center justify-center text-center p-2">
              <Heart className="w-7 h-7 text-white fill-white animate-pulse" />
              <span className="font-heading text-[10px] font-bold text-[#fef08a] uppercase tracking-wider mt-1">
                Didi &amp; {rakhiConfig.brotherName}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Titles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="space-y-1.5"
        >
          <h2 className="font-royal text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#fff6d6] via-[#f7df99] to-[#d4af37] font-bold">
            {rakhiConfig.finale.title}
          </h2>
          <p className="font-script text-2xl sm:text-3xl text-[#fda4af]">
            {rakhiConfig.finale.subtitle}
          </p>
          <p className="text-xs text-[#e8d7ae]/80 font-sans max-w-xs mx-auto">
            {rakhiConfig.finale.tagline}
          </p>
        </motion.div>

        {/* 🌟 FEATURE 1: Interactive "Shower Didi with Love" Heart Fountain */}
        <div className="relative w-full glass-maroon gold-border rounded-2xl p-4 flex flex-col items-center gap-3">
          <div className="flex items-center justify-between w-full px-2">
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-[#f87171]" />
              <span className="text-xs uppercase tracking-wider font-sans font-bold text-[#fef08a]">
                Sister Love Meter
              </span>
            </div>
            <span className="text-xs font-bold font-sans text-[#fae19c] bg-black/40 px-2 py-0.5 rounded-full">
              {heartCount} Hearts Showered ❤️
            </span>
          </div>

          {/* Tap Button with Floating Hearts Animation Container */}
          <div className="relative w-full flex justify-center">
            {/* Floating ascending hearts */}
            <AnimatePresence>
              {floatingHearts.map((h) => (
                <motion.div
                  key={h.id}
                  initial={{ y: 0, x: h.x, opacity: 1, scale: 0.6 }}
                  animate={{ y: -120, x: h.x + (Math.random() - 0.5) * 40, opacity: 0, scale: 1.3 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.4, ease: 'easeOut' }}
                  className="absolute pointer-events-none text-red-500 z-40 select-none"
                  style={{ fontSize: `${h.size}px` }}
                >
                  ❤️
                </motion.div>
              ))}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleSendHeart}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#dc2626] to-[#e11d48] text-white font-sans font-bold text-xs sm:text-sm tracking-wide shadow-[0_0_15px_rgba(225,29,72,0.5)] flex items-center gap-2 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Tap to Shower Love on Didi ❤️</span>
            </motion.button>
          </div>
        </div>

        {/* 🌟 FEATURE 2: Brother's 5 Sacred Lifetime Promises Accordion */}
        <div className="w-full glass-maroon gold-border rounded-2xl p-4 flex flex-col items-center gap-3 text-left">
          <div className="flex items-center gap-2 w-full border-b border-[#d4af37]/20 pb-2">
            <ShieldCheck className="w-4 h-4 text-[#f2cb63]" />
            <span className="text-xs font-heading font-bold text-[#fef9ee] uppercase tracking-wider">
              Brother&apos;s 5 Sacred Lifetime Vows 📜
            </span>
          </div>

          <div className="w-full flex flex-col gap-2">
            {brotherPromises.map((p, idx) => {
              const isExpanded = activePromiseIndex === idx;

              return (
                <div
                  key={p.id}
                  onClick={() => {
                    sounds.playClick();
                    setActivePromiseIndex(isExpanded ? null : idx);
                  }}
                  className="w-full rounded-xl p-3 bg-[#2b0713]/80 border border-[#d4af37]/30 hover:border-[#d4af37] cursor-pointer transition-all select-none"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-sans font-semibold text-xs text-[#fae19c]">
                      {p.title}
                    </span>
                    <span className="text-xs text-[#d4af37]">
                      {isExpanded ? '▲' : '▼'}
                    </span>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs text-[#fff8e7] font-serif italic pt-2 border-t border-[#d4af37]/20 mt-2 leading-relaxed"
                      >
                        &ldquo;{p.vow}&rdquo;
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* 🌟 FEATURE 3: Download Official Sister Certificate */}
        <div className="w-full flex flex-col gap-2.5">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleDownloadCertificate}
            disabled={isDownloading}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f2cb63] to-[#b89125] text-[#1a030b] font-heading font-bold text-xs sm:text-sm tracking-wider shadow-2xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Download className="w-4 h-4 text-[#1a030b]" />
            <span>Download Sister Certificate of Honor 📜</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleReplayJourney}
            className="w-full py-3 rounded-full bg-transparent hover:bg-white/10 border border-[#d4af37]/40 text-[#fae19c] font-heading font-semibold text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{rakhiConfig.finale.replayButtonText}</span>
          </motion.button>
        </div>

        {/* Footer Credit & Year */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="pt-4 border-t border-[#d4af37]/20 w-full space-y-1 text-center"
        >
          <p className="text-xs font-sans text-[#e8d7ae]/80 flex items-center justify-center gap-1.5">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-[#f43f5e] fill-[#f43f5e]" />
            <span>by {rakhiConfig.brotherName}</span>
          </p>
          <p className="text-[11px] text-[#fae19c]/60 uppercase tracking-widest font-sans">
            Raksha Bandhan {rakhiConfig.occasionYear}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
