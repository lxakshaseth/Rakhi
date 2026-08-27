'use client';

import confetti from 'canvas-confetti';

export const triggerGoldBurst = () => {
  if (typeof window === 'undefined') return;

  const count = 120;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 30,
    startVelocity: 45,
    colors: ['#fae19c', '#d4af37', '#ffffff'],
  });

  fire(0.2, {
    spread: 60,
    colors: ['#fb7185', '#f43f5e', '#e11d48'],
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.9,
    colors: ['#f2cb63', '#d4af37', '#ffd700'],
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    colors: ['#ffe4e6', '#fbcfe8'],
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 40,
    colors: ['#ffffff', '#fef08a'],
  });
};

export const triggerSideCannons = () => {
  if (typeof window === 'undefined') return;

  const end = Date.now() + 2.5 * 1000;
  const colors = ['#d4af37', '#f2cb63', '#f43f5e', '#fb7185', '#ffffff'];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors,
      zIndex: 9999,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors,
      zIndex: 9999,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};
