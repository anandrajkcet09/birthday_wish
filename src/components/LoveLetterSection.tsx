import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractiveEnvelope } from './InteractiveEnvelope';
import { LetterPaper } from './LetterPaper';
import { MusicPlayer } from './MusicPlayer';
import { soundController } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, ArrowRight, ArrowLeft, MailOpen } from 'lucide-react';

interface LoveLetterSectionProps {
  onNavigateToReasons: () => void;
  onBackToMemories: () => void;
}

export const LoveLetterSection: React.FC<LoveLetterSectionProps> = ({
  onNavigateToReasons,
  onBackToMemories,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTypingDone, setIsTypingDone] = useState(false);

  const handleOpenLetter = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Audio: gentle unseal & harp chime
    soundController.playLetterOpen();

    // Gentle heart confetti sprinkle
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#f43f71', '#fb7193', '#c084fc', '#ffd166'],
        disableForReducedMotion: true,
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
      transition={{ duration: 0.7 }}
      className="relative z-10 w-full max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-8 flex flex-col items-center min-h-[92vh]"
    >
      {/* Top Bar with Navigation & Music Player */}
      <div className="w-full flex items-center justify-between gap-2 mb-4 px-1">
        <button
          onClick={onBackToMemories}
          className="px-3.5 py-1.5 rounded-full bg-white/70 hover:bg-white/95 backdrop-blur-md border border-romantic-pink-200 text-xs font-medium text-slate-700 hover:text-romantic-deepRose transition-all duration-200 flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Memories</span>
        </button>

        <MusicPlayer />
      </div>

      {/* Main Glassmorphism Container */}
      <div className="w-full glass-card rounded-3xl p-4 xs:p-6 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
        {/* Soft Ambient Radiance */}
        <div className="absolute top-0 left-10 w-64 h-64 bg-romantic-pink-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-romantic-lavender-200/40 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center max-w-xl mx-auto mb-6"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-romantic-pink-100/90 border border-romantic-pink-200 text-romantic-deepRose text-xs sm:text-sm font-medium shadow-sm mb-3">
            <MailOpen className="w-3.5 h-3.5 text-romantic-pink-500" />
            <span>Pure Feelings</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-300" />
          </div>

          <h2 className="font-romantic text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight mb-2 text-glow">
            A Letter From My Heart
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Some feelings are too special to be expressed in just a few words.
          </p>

          <p className="font-script text-xl sm:text-2xl text-romantic-pink-600 mt-1">
            "Dil ki har baat, sirf tumhare naam..."
          </p>
        </motion.div>

        {/* 1. ENVELOPE (Always visible or transitions into the open state) */}
        <div className="w-full flex justify-center">
          <InteractiveEnvelope isOpen={isOpen} onOpen={handleOpenLetter} />
        </div>

        {/* 2. LETTER PAPER (Revealed when envelope is opened) */}
        <AnimatePresence>
          {isOpen && (
            <div className="w-full mt-4">
              <LetterPaper onTypingComplete={() => setIsTypingDone(true)} />
            </div>
          )}
        </AnimatePresence>

        {/* 3. NAVIGATION TO PHASE 5 (Shown after letter is revealed or completed) */}
        <AnimatePresence>
          {isTypingDone && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-10 pt-8 border-t border-romantic-pink-200/60 w-full flex flex-col items-center"
            >
              <p className="text-sm sm:text-base text-slate-700 font-medium mb-3 max-w-md">
                Still wondering why you're so special to me?
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={onNavigateToReasons}
                className="group relative overflow-hidden px-8 py-3.5 rounded-full bg-gradient-to-r from-romantic-pink-500 via-romantic-rose to-romantic-lavender-500 hover:from-romantic-pink-600 hover:to-romantic-lavender-600 text-white font-semibold text-base sm:text-lg shadow-lg hover:shadow-romantic-pink-300/60 shadow-romantic-pink-400/40 transition-all duration-300 flex items-center gap-2.5 cursor-pointer"
                aria-label="Let Me Tell You"
              >
                {/* Shimmer effect */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                <span>Let Me Tell You ❤️</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <p className="text-xs text-romantic-pink-500 font-script text-base mt-2 flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Endless reasons, just one Sophia</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 mt-3">
        <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5 font-medium">
          <span>Written from the heart by</span>
          <span className="font-semibold text-romantic-deepRose font-romantic">Alex</span>
          <span>for his Princess</span>
          <span className="text-romantic-pink-500">❤️</span>
        </p>
      </footer>
    </motion.div>
  );
};
