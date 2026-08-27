'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SceneId } from '@/types';
import ParticleCanvas from '@/components/common/ParticleCanvas';
import MusicController from '@/components/common/MusicController';
import ProgressBar from '@/components/common/ProgressBar';
import LoadingScreen from '@/components/common/LoadingScreen';

// Scenes
import IntroScene from '@/components/scenes/IntroScene';
import EnvelopeScene from '@/components/scenes/EnvelopeScene';
import MemoryTimeline from '@/components/scenes/MemoryTimeline';
import RakhiCeremony from '@/components/scenes/ceremony/RakhiCeremony';
import SiblingQuiz from '@/components/scenes/SiblingQuiz';
import EmotionalMessages from '@/components/scenes/EmotionalMessages';
import GiftBox from '@/components/scenes/GiftBox';
import FinalLetter from '@/components/scenes/FinalLetter';
import FinalScene from '@/components/scenes/FinalScene';

export default function RakhiSurprisePage() {
  const [currentScene, setCurrentScene] = useState<SceneId>('intro');
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initial luxury loading gate
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  const handleStartExperience = () => {
    setIsMusicPlaying(true);
    setCurrentScene('envelope');
  };

  const handleReplay = () => {
    setCurrentScene('intro');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <main className="relative min-h-[100dvh] w-full bg-[#0d0104] text-[#fbf6ea] overflow-x-hidden flex flex-col items-center justify-center">
      {/* Universal Floating Particle & Petal Canvas */}
      <ParticleCanvas />

      {/* Floating Story Progress Bar */}
      <ProgressBar currentScene={currentScene} />

      {/* Floating Glassmorphism Music Controller */}
      <MusicController
        isPlaying={isMusicPlaying}
        onToggle={() => setIsMusicPlaying((prev) => !prev)}
      />

      {/* Mobile-first Framed Story Container (Optimized for 390x844 mobile viewport, luxurious on desktop) */}
      <div className="w-full max-w-lg min-h-[100dvh] flex flex-col relative z-20 shadow-2xl bg-gradient-to-b from-[#120207] via-[#1c030c] to-[#0c0104]">
        <AnimatePresence mode="wait">
          {currentScene === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="w-full min-h-[100dvh] flex flex-col"
            >
              <IntroScene onStart={handleStartExperience} />
            </motion.div>
          )}

          {currentScene === 'envelope' && (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="w-full min-h-[100dvh] flex flex-col"
            >
              <EnvelopeScene onOpen={() => setCurrentScene('timeline')} />
            </motion.div>
          )}

          {currentScene === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="w-full min-h-[100dvh] flex flex-col"
            >
              <MemoryTimeline onNext={() => setCurrentScene('ceremony')} />
            </motion.div>
          )}

          {currentScene === 'ceremony' && (
            <motion.div
              key="ceremony"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="w-full min-h-[100dvh] flex flex-col"
            >
              <RakhiCeremony onNext={() => setCurrentScene('quiz')} />
            </motion.div>
          )}

          {currentScene === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="w-full min-h-[100dvh] flex flex-col"
            >
              <SiblingQuiz onNext={() => setCurrentScene('emotional')} />
            </motion.div>
          )}

          {currentScene === 'emotional' && (
            <motion.div
              key="emotional"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="w-full min-h-[100dvh] flex flex-col"
            >
              <EmotionalMessages onNext={() => setCurrentScene('gift')} />
            </motion.div>
          )}

          {currentScene === 'gift' && (
            <motion.div
              key="gift"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="w-full min-h-[100dvh] flex flex-col"
            >
              <GiftBox onNext={() => setCurrentScene('letter')} />
            </motion.div>
          )}

          {currentScene === 'letter' && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="w-full min-h-[100dvh] flex flex-col"
            >
              <FinalLetter onNext={() => setCurrentScene('finale')} />
            </motion.div>
          )}

          {currentScene === 'finale' && (
            <motion.div
              key="finale"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="w-full min-h-[100dvh] flex flex-col"
            >
              <FinalScene onReplay={handleReplay} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
