'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle, RotateCw } from 'lucide-react';
import { rakhiConfig } from '@/data/rakhiConfig';
import { sounds } from '@/utils/soundEffects';
import { triggerGoldBurst } from '@/components/common/ConfettiFireworks';

interface AartiInteractionProps {
  onComplete: () => void;
}

export default function AartiInteraction({ onComplete }: AartiInteractionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [rotationProgress, setRotationProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const lastAngleRef = useRef<number | null>(null);
  const totalDegreesRef = useRef(0);

  const calculateAngle = (clientX: number, clientY: number) => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    let theta = Math.atan2(dy, dx) * (180 / Math.PI);
    if (theta < 0) theta += 360;
    return theta;
  };

  const handleFinishAarti = useCallback(() => {
    setCompleted(true);
    setRotationProgress(100);
    sounds.playTempleBell();
    sounds.playSparkle();
    triggerGoldBurst();

    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([60, 80, 100]);
    }

    setTimeout(() => {
      onComplete();
    }, 2200);
  }, [onComplete]);

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (completed || !isDragging) return;
    const currentAngle = calculateAngle(clientX, clientY);

    if (lastAngleRef.current !== null) {
      let delta = currentAngle - lastAngleRef.current;
      // Handle 360 -> 0 wrap
      if (delta < -180) delta += 360;
      if (delta > 180) delta -= 360;

      // Only count clockwise motion
      if (delta > 0) {
        totalDegreesRef.current += delta;
        const progress = Math.min(100, Math.round((totalDegreesRef.current / 360) * 100));
        setRotationProgress(progress);

        // Bell sound on quarter turns
        if (progress === 25 || progress === 50 || progress === 75) {
          sounds.playTempleBell();
        }

        if (progress >= 100 && !completed) {
          handleFinishAarti();
        }
      }
    }

    lastAngleRef.current = currentAngle;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handlePointerMove(e.clientX, e.clientY);
    }
  };

  // Keyboard / Click quick fallback for accessibility
  const handleAutoAarti = () => {
    if (completed) return;
    setIsDragging(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 15;
      totalDegreesRef.current = (p / 100) * 360;
      setRotationProgress(Math.min(100, p));
      if (p % 30 === 0) sounds.playTempleBell();
      if (p >= 100) {
        clearInterval(interval);
        handleFinishAarti();
      }
    }, 150);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      lastAngleRef.current = null;
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, []);

  const angleRad = ((rotationProgress / 100) * 360 * Math.PI) / 180;
  const radius = 100; // Orbit radius
  const diyaX = Math.cos(angleRad) * radius;
  const diyaY = Math.sin(angleRad) * radius;

  return (
    <div className="w-full flex flex-col items-center gap-5 py-2 select-none">
      {/* Circular Aarti Arena */}
      <div
        ref={containerRef}
        onMouseDown={(e) => {
          setIsDragging(true);
          lastAngleRef.current = calculateAngle(e.clientX, e.clientY);
          sounds.playTempleBell();
        }}
        onMouseMove={handleMouseMove}
        onTouchStart={(e) => {
          if (e.touches[0]) {
            setIsDragging(true);
            lastAngleRef.current = calculateAngle(e.touches[0].clientX, e.touches[0].clientY);
            sounds.playTempleBell();
          }
        }}
        onTouchMove={handleTouchMove}
        className="relative w-64 sm:w-72 h-64 sm:h-72 rounded-full glass-maroon gold-border-glow flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
      >
        {/* Orbit track ring */}
        <div className="absolute w-[200px] h-[200px] rounded-full border border-dashed border-[#d4af37]/40 pointer-events-none" />

        {/* Center Tilak Portrait */}
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-[#3b0615] to-[#5c0d25] gold-border flex flex-col items-center justify-center pointer-events-none shadow-lg">
          {/* Forehead Tilak */}
          <div className="w-2.5 h-8 rounded-full bg-gradient-to-b from-[#dc2626] via-[#b91c1c] to-[#991b1b] shadow-[0_0_8px_rgba(220,38,38,0.8)] flex items-center justify-center">
            <div className="w-1 h-1.5 bg-[#fef08a] rounded-full" />
          </div>
          <span className="text-[10px] text-[#fae19c] font-sans font-bold mt-1">
            {rakhiConfig.brotherName}
          </span>
        </div>

        {/* Orbiting Aarti Diya Plate */}
        <motion.div
          style={{
            transform: `translate(${diyaX}px, ${diyaY}px)`,
          }}
          className="absolute z-30 w-16 h-16 rounded-full bg-gradient-to-tr from-[#996515] via-[#f7df99] to-[#80500e] p-1 shadow-[0_0_20px_rgba(251,191,36,0.8)] border border-[#ffd700] flex flex-col items-center justify-center pointer-events-none"
        >
          {/* Diya Flame */}
          <div className="relative -mb-1">
            <div className="w-3.5 h-6 rounded-full bg-gradient-to-t from-[#ea580c] via-[#f59e0b] to-[#fef08a] animate-diya blur-[0.5px]" />
            <div className="absolute -inset-1.5 bg-amber-400/40 rounded-full blur-sm" />
          </div>
          {/* Diya Body */}
          <div className="w-9 h-4.5 rounded-b-full bg-gradient-to-r from-[#92400e] via-[#d97706] to-[#78350f] border-t border-[#fde68a]/50" />
        </motion.div>

        {/* Circular Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
          <circle
            cx="50%"
            cy="50%"
            r="100"
            fill="none"
            stroke="rgba(212, 175, 55, 0.15)"
            strokeWidth="4"
          />
          <circle
            cx="50%"
            cy="50%"
            r="100"
            fill="none"
            stroke="#f2cb63"
            strokeWidth="4"
            strokeDasharray={2 * Math.PI * 100}
            strokeDashoffset={2 * Math.PI * 100 * (1 - rotationProgress / 100)}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
          />
        </svg>
      </div>

      {/* Progress & Instruction */}
      <div className="text-center max-w-xs space-y-2">
        <AnimatePresence mode="wait">
          {!completed ? (
            <motion.div
              key="prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-1"
            >
              <div className="flex items-center justify-center gap-2 text-xs text-[#fae19c] font-sans font-medium">
                <RotateCw className="w-3.5 h-3.5 animate-spin" />
                <span>{rotationProgress}% Aarti Completed</span>
              </div>
              <p className="text-xs text-[#e8d7ae]/80 font-sans">
                {rakhiConfig.ceremony.aarti.instruction}
              </p>

              {/* Accessible auto-perform button */}
              <button
                onClick={handleAutoAarti}
                className="text-[11px] text-[#f2cb63]/70 underline hover:text-[#f2cb63] mt-1 cursor-pointer"
              >
                (Or tap here to perform Aarti automatically ✨)
              </button>
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
                <span>{rakhiConfig.ceremony.aarti.successTitle}</span>
              </div>
              <p className="text-xs text-[#fef08a] font-serif italic">
                {rakhiConfig.ceremony.aarti.successSubtitle}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
