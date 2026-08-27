'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TapEffect {
  id: number;
  x: number;
  y: number;
  items: {
    emoji: string;
    angle: number;
    distance: number;
    size: number;
  }[];
}

export default function TouchSparkles() {
  const [effects, setEffects] = useState<TapEffect[]>([]);

  useEffect(() => {
    const handleTap = (e: MouseEvent | TouchEvent) => {
      // Don't trigger if tapping buttons or inputs directly to keep UI clean
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'BUTTON' || target.tagName === 'INPUT' || target.closest('button'))) {
        return;
      }

      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        return;
      }

      const sparklesList = ['✨', '❤️', '🌸', '💫', '🪔'];
      const count = 5;
      const items = Array.from({ length: count }).map((_, i) => ({
        emoji: sparklesList[Math.floor(Math.random() * sparklesList.length)],
        angle: (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5,
        distance: Math.random() * 35 + 25,
        size: Math.random() * 6 + 14,
      }));

      const newEffect: TapEffect = {
        id: Date.now() + Math.random(),
        x: clientX,
        y: clientY,
        items,
      };

      setEffects((prev) => [...prev.slice(-10), newEffect]);

      setTimeout(() => {
        setEffects((prev) => prev.filter((eff) => eff.id !== newEffect.id));
      }, 900);
    };

    window.addEventListener('click', handleTap);
    window.addEventListener('touchstart', handleTap, { passive: true });

    return () => {
      window.removeEventListener('click', handleTap);
      window.removeEventListener('touchstart', handleTap);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {effects.map((effect) => (
          <div
            key={effect.id}
            className="absolute"
            style={{ left: effect.x, top: effect.y }}
          >
            {effect.items.map((item, idx) => {
              const targetX = Math.cos(item.angle) * item.distance;
              const targetY = Math.sin(item.angle) * item.distance;

              return (
                <motion.span
                  key={idx}
                  initial={{ x: 0, y: 0, scale: 0.2, opacity: 1 }}
                  animate={{
                    x: targetX,
                    y: targetY,
                    scale: [0.5, 1.2, 0.8],
                    opacity: [1, 1, 0],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 select-none"
                  style={{ fontSize: `${item.size}px` }}
                >
                  {item.emoji}
                </motion.span>
              );
            })}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
