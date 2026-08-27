'use client';

import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface MemoryImageProps {
  src?: string;
  alt: string;
  year: string;
  tag?: string;
  className?: string;
}

export default function MemoryImage({ src, alt, year, tag, className = '' }: MemoryImageProps) {
  const [error, setError] = useState(false);

  return (
    <div className={`relative w-full h-full overflow-hidden bg-gradient-to-br from-[#2a0713] via-[#3d0b1c] to-[#19030a] flex flex-col items-center justify-center ${className}`}>
      {/* Visual background grain & ornamental pattern */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />

      {!error && src ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={alt}
          onError={() => setError(true)}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
      ) : (
        /* Luxury Aesthetic Fallback Frame if local photo hasn't been added yet */
        <div className="relative z-10 w-full h-full p-6 flex flex-col items-center justify-between text-center bg-gradient-to-b from-maroon-900/60 to-black/80">
          <div className="flex items-center justify-between w-full">
            <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-semibold bg-[#d4af37]/15 px-2.5 py-0.5 rounded-full border border-[#d4af37]/30">
              {tag || 'Memory'}
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#f2cb63]" />
          </div>

          <div className="my-auto flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#5e0d27] to-[#8c1639] flex items-center justify-center gold-border shadow-[0_0_20px_rgba(212,175,55,0.25)]">
              <Heart className="w-7 h-7 text-[#f87171] fill-[#f87171]/40 animate-pulse" />
            </div>
            <div>
              <p className="font-heading text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#ffe4a0] via-[#d4af37] to-[#fae19c]">
                {year}
              </p>
              <p className="text-xs text-[#e8d7ae]/80 font-serif italic mt-0.5 max-w-[200px] line-clamp-2">
                {alt}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[#d4af37]/60 text-[10px] tracking-widest uppercase font-sans">
            <span>✨ Cherished Moment ✨</span>
          </div>
        </div>
      )}

      {/* Subtle vignette border */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_30px_rgba(0,0,0,0.6)]" />
    </div>
  );
}
