'use client';

import React from 'react';
import { SceneId } from '@/types';

interface ProgressBarProps {
  currentScene: SceneId;
  onSelectScene?: (scene: SceneId) => void;
}

const scenes: { id: SceneId; label: string }[] = [
  { id: 'intro', label: 'Start' },
  { id: 'envelope', label: 'Envelope' },
  { id: 'timeline', label: 'Memories' },
  { id: 'ceremony', label: 'Ceremony' },
  { id: 'quiz', label: 'Quiz' },
  { id: 'emotional', label: 'Truth' },
  { id: 'gift', label: 'Gift' },
  { id: 'letter', label: 'Letter' },
  { id: 'finale', label: 'Finale' },
];

export default function ProgressBar({ currentScene }: ProgressBarProps) {
  const currentIndex = scenes.findIndex((s) => s.id === currentScene);

  if (currentScene === 'intro') return null;

  return (
    <div className="fixed top-2.5 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-md flex items-center gap-1.5 px-2 py-1 select-none pointer-events-none">
      {scenes.map((scene, idx) => {
        const isCompleted = idx < currentIndex;
        const isCurrent = idx === currentIndex;

        return (
          <div
            key={scene.id}
            className="flex-1 h-1 rounded-full overflow-hidden bg-white/15 backdrop-blur-sm transition-all duration-300"
          >
            <div
              className={`h-full transition-all duration-500 ease-out rounded-full ${
                isCompleted
                  ? 'w-full bg-[#d4af37]'
                  : isCurrent
                  ? 'w-full bg-gradient-to-r from-[#d4af37] to-[#fae19c] shadow-[0_0_8px_#d4af37]'
                  : 'w-0'
              }`}
            />
          </div>
        );
      })}
    </div>
  );
}
