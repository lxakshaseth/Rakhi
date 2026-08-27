'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Gift, Heart, ArrowRight, Check, CheckCircle2, AlertCircle, MailCheck } from 'lucide-react';
import { rakhiConfig } from '@/data/rakhiConfig';
import { sounds } from '@/utils/soundEffects';
import { triggerGoldBurst, triggerSideCannons } from '@/components/common/ConfettiFireworks';

interface GiftBoxProps {
  onNext: () => void;
}

export default function GiftBox({ onNext }: GiftBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Initialize with all required fields pre-selected
  const [selectedDemands, setSelectedDemands] = useState<Record<string, string>>({
    cash: '₹11,000',
    chocolate: 'Ferrero Rocher Box',
    shopping: 'Zara Shopping Spree',
    toy_gadget: 'AirPods / Headphones 🎧',
    food_treat: 'Midnight Pizza Pass 🍕',
    vacation: 'Goa Beach Trip 🏖️',
    immunity: '30-Day No Argument Rule 🤐',
  });
  const [customWish, setCustomWish] = useState('Lots of love & unlimited food treats ❤️');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const demandData = rakhiConfig.giftBox.demandSection;

  const handleOpenGift = () => {
    if (isOpen || isAnimating) return;
    setIsAnimating(true);
    sounds.playWhoosh();

    setTimeout(() => {
      sounds.playGiftPop();
      triggerGoldBurst();
      triggerSideCannons();
      setIsOpen(true);
      setIsAnimating(false);
    }, 800);
  };

  const selectSubOption = (id: string, opt: string) => {
    sounds.playClick();
    setErrorMessage(null);
    setSelectedDemands((prev) => ({
      ...prev,
      [id]: opt,
    }));
  };

  const handleSubmitAndProceed = async () => {
    // Validate that all required standard categories are selected
    const requiredCategories = demandData.giftDemandsList.filter((item) => !item.isCustom);
    const missing = requiredCategories.some((cat) => !selectedDemands[cat.id]);

    if (missing) {
      sounds.playClick();
      setErrorMessage('⚠️ Didi, all demand categories are mandatory! Please select an option for each item before proceeding.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    sounds.playRakhiSuccess();
    triggerGoldBurst();
    triggerSideCannons();

    try {
      // 1. Save to MongoDB & automatically dispatch PDF to Brother's Gmail inbox
      await fetch('/api/gift-demand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sisterName: rakhiConfig.sisterName,
          brotherName: rakhiConfig.brotherName,
          selectedGifts: selectedDemands,
          customDemand: customWish,
          submittedAt: new Date().toISOString(),
        }),
      });
    } catch {
      // Graceful fallback
    }

    setIsSaved(true);
    setIsSubmitting(false);

    // Proceed to next scene after celebration
    setTimeout(() => {
      onNext();
    }, 1400);
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 py-12 text-center overflow-y-auto bg-gradient-to-b from-[#0c0104] via-[#1d030c] to-[#110106]">
      {/* Ambient glowing aura */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-gradient-to-br from-[#8a1338]/30 via-[#d4af37]/20 to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm sm:max-w-md flex flex-col items-center gap-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-maroon gold-border text-xs text-[#d4af37] font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chapter V • Mandatory Gift Vault</span>
          </div>
          <h2 className="font-royal text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#fff6d6] via-[#f7df99] to-[#d4af37]">
            {rakhiConfig.giftBox.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#e8d7ae]/85 font-sans">
            {rakhiConfig.giftBox.subtitle}
          </p>
        </motion.div>

        {/* 3D Royal Gift Box */}
        <div className="relative w-60 sm:w-68 h-56 sm:h-64 my-1 flex items-center justify-center [perspective:1000px]">
          {isOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.4, 1.2], opacity: [0.8, 1, 0.9] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,#ffd700_0%,#dc2626_40%,transparent_70%)] blur-2xl pointer-events-none opacity-60"
            />
          )}

          <motion.div
            animate={isAnimating ? { rotate: [-2, 2, -4, 4, 0], scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.8 }}
            className="relative w-44 sm:w-52 h-44 sm:h-52 flex items-end justify-center"
          >
            {/* Box Body */}
            <div className="relative w-full h-32 rounded-2xl bg-gradient-to-b from-[#5c0d25] via-[#420a1c] to-[#25040f] gold-border shadow-2xl overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:12px_12px]" />
              <div className="w-8 h-full bg-gradient-to-r from-[#b8861e] via-[#ffd700] to-[#b8861e] shadow-md border-x border-[#fae19c]/40" />
              <div className="absolute inset-x-0 h-8 bg-gradient-to-b from-[#b8861e] via-[#ffd700] to-[#b8861e] shadow-md border-y border-[#fae19c]/40" />
            </div>

            {/* Box Lid with Pop */}
            <motion.div
              animate={
                isOpen
                  ? { y: -70, rotate: -18, opacity: 0.9, scale: 1.05 }
                  : isAnimating
                  ? { y: -10, rotate: 3 }
                  : { y: 0, rotate: 0 }
              }
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="absolute top-4 inset-x-0 mx-auto w-[105%] h-12 rounded-xl bg-gradient-to-b from-[#73102f] to-[#4d0b1f] gold-border shadow-xl flex items-center justify-center z-30"
            >
              <div className="absolute -top-6 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#ffd700] to-[#b8861e] -rotate-45 shadow-md border border-white" />
                <div className="w-6 h-6 rounded-full bg-gradient-to-tl from-[#ffd700] to-[#b8861e] rotate-45 -ml-2 shadow-md border border-white" />
                <div className="absolute w-3.5 h-3.5 rounded-full bg-[#fae19c] shadow-inner" />
              </div>
              <div className="w-full h-2.5 bg-gradient-to-r from-[#b8861e] via-[#ffd700] to-[#b8861e]" />
            </motion.div>
          </motion.div>
        </div>

        {/* Revealed Content: Interactive Mandatory Wishlist Form */}
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.button
              key="open-btn"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenGift}
              disabled={isAnimating}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f2cb63] to-[#b89125] text-[#1a030b] font-heading font-bold text-base tracking-wider shadow-2xl flex items-center gap-2.5 cursor-pointer disabled:opacity-50"
            >
              <Gift className="w-5 h-5 text-[#1a030b]" />
              <span>{rakhiConfig.giftBox.buttonText}</span>
              <Sparkles className="w-4 h-4 text-[#1a030b]" />
            </motion.button>
          ) : (
            /* Interactive Mandatory Wishlist */
            <motion.div
              key="gift-demands"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              className="w-full glass-maroon gold-border-glow rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col items-center gap-5 text-left"
            >
              {/* Header inside vault */}
              <div className="w-full text-center space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#fae19c] text-xs font-semibold">
                  <Heart className="w-3 h-3 text-[#f87171] fill-[#f87171]" />
                  <span>{demandData.title}</span>
                </div>
                <p className="text-xs text-[#fae19c] font-sans font-medium">
                  ⭐ Every field is mandatory — make your choice for each item!
                </p>
              </div>

              {/* Error Message Toast */}
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full p-2.5 rounded-lg bg-red-950/90 border border-red-500 text-red-200 text-xs font-sans flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </motion.div>
              )}

              {/* Demand Cards List */}
              <div className="w-full flex flex-col gap-3 max-h-[380px] overflow-y-auto pr-1">
                {demandData.giftDemandsList.map((item) => {
                  const isCustom = item.isCustom;
                  const currentSelected = selectedDemands[item.id];
                  const hasSelection = isCustom ? customWish.trim().length > 0 : !!currentSelected;

                  return (
                    <div
                      key={item.id}
                      className="w-full rounded-xl p-3.5 bg-[#330715] border border-[#d4af37]/40 shadow-sm transition-all"
                    >
                      {/* Top Row: Title + Mandatory Badge */}
                      <div className="flex items-center justify-between select-none">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">{item.icon}</span>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <p className="font-heading font-semibold text-sm text-[#fff8e7]">
                                {item.title}
                              </p>
                              <span className="text-[10px] text-red-400 font-bold">* Required</span>
                            </div>
                            <p className="text-[11px] text-[#e8d7ae]/70 font-sans">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        {/* Selected Indicator Badge */}
                        <div
                          className={`px-2 py-0.5 rounded-full text-[10px] font-sans font-bold flex items-center gap-1 ${
                            hasSelection
                              ? 'bg-emerald-950/80 border border-emerald-500 text-emerald-300'
                              : 'bg-red-950/80 border border-red-500 text-red-300'
                          }`}
                        >
                          <Check className="w-3 h-3" />
                          <span>{hasSelection ? 'Selected' : 'Choose'}</span>
                        </div>
                      </div>

                      {/* Sub-options pills (Mandatory selection) */}
                      {!isCustom && item.options && (
                        <div className="mt-3 pt-2.5 border-t border-[#d4af37]/20 flex flex-wrap gap-1.5">
                          {item.options.map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => selectSubOption(item.id, opt)}
                              className={`text-[11px] font-sans px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                                currentSelected === opt
                                  ? 'bg-[#d4af37] text-[#1a030b] font-bold border-[#fff2be] shadow-sm'
                                  : 'bg-black/50 text-[#fae19c] border-[#d4af37]/30 hover:border-[#d4af37]'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Custom input for special wish */}
                      {isCustom && (
                        <div className="mt-2.5">
                          <input
                            type="text"
                            value={customWish}
                            onChange={(e) => {
                              setCustomWish(e.target.value);
                              setErrorMessage(null);
                            }}
                            placeholder="e.g. iPhone 16 Pro, Scooty keys, Trip to Paris..."
                            className="w-full text-xs font-sans px-3 py-2 rounded-lg bg-black/60 border border-[#d4af37]/40 text-[#fff8e7] placeholder-stone-500 focus:outline-none focus:border-[#d4af37]"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Primary Action Button: Lock Demands & Email Official PDF to Brother */}
              <div className="w-full flex flex-col gap-2.5 pt-2 border-t border-[#d4af37]/20">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmitAndProceed}
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f2cb63] to-[#b89125] text-[#1a030b] font-heading font-bold text-sm tracking-wider shadow-2xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSaved ? (
                    <>
                      <MailCheck className="w-4 h-4 text-[#1a030b]" />
                      <span>Demands Locked &amp; Emailed to Brother! 🚀</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-[#1a030b]" />
                      <span>Lock Demands &amp; Read Final Letter 📜</span>
                      <ArrowRight className="w-4 h-4 text-[#1a030b]" />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
