'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { rakhiConfig } from '@/data/rakhiConfig';
import { sounds } from '@/utils/soundEffects';

interface MusicControllerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export default function MusicController({ isPlaying, onToggle }: MusicControllerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioAvailable, setAudioAvailable] = useState<boolean>(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = rakhiConfig.audio.defaultVolume || 0.6;
    audio.loop = true;

    const handleError = () => {
      // If custom MP3 fails to load, gracefully switch to the built-in ambient procedural soundscape
      setAudioAvailable(false);
      if (isPlaying) {
        sounds.startAmbientSoundscape();
      }
    };

    audio.addEventListener('error', handleError);
    return () => {
      audio.removeEventListener('error', handleError);
    };
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      sounds.setMuted(false);
      if (audio && audioAvailable) {
        audio.play().catch(() => {
          // If browser policy catches it or file not ready, start ambient synth soundscape
          sounds.startAmbientSoundscape();
        });
      } else {
        sounds.startAmbientSoundscape();
      }
    } else {
      sounds.setMuted(true);
      if (audio) {
        audio.pause();
      }
      sounds.stopAmbientSoundscape();
    }
  }, [isPlaying, audioAvailable]);

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 select-none">
      <audio ref={audioRef} src={rakhiConfig.audio.bgMusicUrl} preload="auto" />
      
      <button
        onClick={() => {
          sounds.playClick();
          onToggle();
        }}
        className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-maroon gold-border text-[#f4ebd2] hover:text-[#fff2be] hover:border-[#d4af37] transition-all duration-300 shadow-lg active:scale-95 group"
        aria-label={isPlaying ? "Mute Background Music" : "Play Background Music"}
      >
        {isPlaying ? (
          <>
            <div className="flex items-end gap-0.5 h-3.5 w-4">
              <span className="w-1 bg-[#d4af37] rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-3" />
              <span className="w-1 bg-[#f2cb63] rounded-full animate-[pulse_1.2s_ease-in-out_infinite] h-4" />
              <span className="w-1 bg-[#fae19c] rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-2" />
            </div>
            <Volume2 className="w-4 h-4 text-[#d4af37]" />
            <span className="text-xs font-medium tracking-wide font-sans hidden sm:inline text-gold-300">
              Music Playing
            </span>
          </>
        ) : (
          <>
            <Music className="w-4 h-4 text-stone-400 group-hover:text-[#d4af37] transition-colors" />
            <VolumeX className="w-4 h-4 text-stone-400 group-hover:text-[#d4af37] transition-colors" />
            <span className="text-xs font-medium tracking-wide font-sans text-stone-400 hidden sm:inline group-hover:text-[#d4af37]">
              Sound Muted
            </span>
          </>
        )}
      </button>
    </div>
  );
}
