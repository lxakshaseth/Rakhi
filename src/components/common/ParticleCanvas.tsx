'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  fadeSpeed: number;
  color: string;
  type: 'goldDust' | 'rosePetal' | 'sparkle';
  rotation: number;
  rotationSpeed: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];
    const maxParticles = window.innerWidth < 768 ? 35 : 65;

    const goldColors = [
      'rgba(242, 203, 99, ',
      'rgba(212, 175, 55, ',
      'rgba(255, 230, 153, ',
      'rgba(235, 185, 75, ',
    ];

    const petalColors = [
      'rgba(244, 63, 94, ',
      'rgba(225, 29, 72, ',
      'rgba(251, 113, 133, ',
    ];

    function createParticle(initialY?: number): Particle {
      const isPetal = Math.random() < 0.25;
      const isSparkle = !isPetal && Math.random() < 0.3;
      
      const type: 'goldDust' | 'rosePetal' | 'sparkle' = isPetal 
        ? 'rosePetal' 
        : isSparkle 
          ? 'sparkle' 
          : 'goldDust';

      const colorBase = isPetal 
        ? petalColors[Math.floor(Math.random() * petalColors.length)]
        : goldColors[Math.floor(Math.random() * goldColors.length)];

      return {
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : Math.random() * height,
        size: isPetal ? Math.random() * 6 + 4 : isSparkle ? Math.random() * 2.5 + 1.5 : Math.random() * 2 + 0.8,
        speedX: (Math.random() - 0.5) * (isPetal ? 0.8 : 0.4),
        speedY: isPetal ? Math.random() * 0.7 + 0.4 : -(Math.random() * 0.5 + 0.2),
        opacity: Math.random() * 0.6 + 0.2,
        fadeSpeed: Math.random() * 0.008 + 0.003,
        color: colorBase,
        type,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
      };
    }

    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle());
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.type === 'rosePetal') {
          // Petals float down with gentle swaying
          p.x += Math.sin(p.y * 0.02) * 0.5;
          if (p.y > height + 20) {
            particles[i] = createParticle(-10);
            continue;
          }
        } else {
          // Gold dust floats up slowly
          if (p.y < -10) {
            particles[i] = createParticle(height + 10);
            continue;
          }
        }

        // Horizontal wrapping
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === 'rosePetal') {
          // Draw subtle organic petal shape
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 1.5, p.size * 0.8, 0, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.opacity * 0.6})`;
          ctx.fill();
        } else if (p.type === 'sparkle') {
          // Draw 4-point gold star sparkle
          const s = p.size;
          ctx.beginPath();
          ctx.moveTo(0, -s * 2);
          ctx.quadraticCurveTo(0, 0, s * 2, 0);
          ctx.quadraticCurveTo(0, 0, 0, s * 2);
          ctx.quadraticCurveTo(0, 0, -s * 2, 0);
          ctx.quadraticCurveTo(0, 0, 0, -s * 2);
          ctx.fillStyle = `${p.color}${p.opacity * 0.9})`;
          ctx.fill();
        } else {
          // Draw soft glowing gold dust circle
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.opacity})`;
          ctx.shadowColor = 'rgba(212, 175, 55, 0.6)';
          ctx.shadowBlur = 6;
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-75"
      style={{ willChange: 'transform' }}
    />
  );
}
