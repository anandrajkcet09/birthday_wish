import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BirthdayCake } from './BirthdayCake';
import { TypingMessage } from './TypingMessage';
import { MusicPlayer } from './MusicPlayer';
import { soundController } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

interface CelebrationScreenProps {
  onNavigateToMemories: () => void;
  onBackToLanding: () => void;
}

export const CelebrationScreen: React.FC<CelebrationScreenProps> = ({
  onNavigateToMemories,
  onBackToLanding,
}) => {
  const [wished, setWished] = useState(false);

  // Trigger Fireworks & Confetti
  const triggerCelebration = () => {
    try {
      // 1. Center colorful confetti burst
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f43f71', '#fb7193', '#c084fc', '#ffd166', '#ffffff', '#e11d57'],
      });

      // 2. Subtle fireworks bursts left and right
      setTimeout(() => {
        confetti({
          particleCount: 45,
          angle: 60,
          spread: 60,
          origin: { x: 0.1, y: 0.5 },
          colors: ['#ffd166', '#f43f71', '#c084fc'],
        });
        confetti({
          particleCount: 45,
          angle: 120,
          spread: 60,
          origin: { x: 0.9, y: 0.5 },
          colors: ['#ffd166', '#f43f71', '#c084fc'],
        });
      }, 350);

      setTimeout(() => {
        // Grand finale burst
        confetti({
          particleCount: 70,
          spread: 100,
          origin: { y: 0.4 },
          colors: ['#f43f71', '#fb7193', '#c084fc', '#ffd166'],
        });
      }, 700);
    } catch {
      // Fallback
    }
  };

  const handleMakeWish = () => {
    if (wished) return;
    setWished(true);

    // Audio: Candle blow + magical wish chime
    soundController.playCandleBlow();

    // Trigger celebration effects
    triggerCelebration();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
      transition={{ duration: 0.7 }}
      className="relative z-10 w-full max-w-2xl mx-auto px-3 sm:px-6 py-6 sm:py-8 flex flex-col items-center justify-between min-h-[92vh]"
    >
      {/* Top Bar with Return button & Music Player */}
      <div className="w-full flex items-center justify-between gap-2 mb-2 px-1">
        <button
          onClick={onBackToLanding}
          className="px-3 py-1.5 rounded-full bg-white/60 hover:bg-white/90 backdrop-blur-md border border-romantic-pink-200 text-xs font-medium text-slate-600 hover:text-romantic-deepRose transition-all duration-200 flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <MusicPlayer />
      </div>

      {/* Main Glassmorphism Celebration Card */}
      <div className="w-full glass-card rounded-3xl p-4 xs:p-6 sm:p-9 my-auto flex flex-col items-center text-center relative overflow-hidden">
        {/* Soft Decorative Ambient Halos */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-romantic-pink-200/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-romantic-lavender-200/50 rounded-full blur-3xl pointer-events-none" />

        {/* Floating Celebration Header Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-romantic-pink-100/90 border border-romantic-pink-200 text-romantic-deepRose text-xs sm:text-sm font-medium shadow-sm mb-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-300" />
          <span>Celebration Time</span>
          <span className="text-sm">🎂</span>
        </motion.div>

        {/* 1. Header: "Happy Birthday, Sophia! ❤️" */}
        <motion.h1
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-romantic text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight mb-1 text-glow"
        >
          Happy Birthday, <span className="font-script text-romantic-deepRose text-4xl sm:text-5xl lg:text-6xl">Sophia</span>! ❤️
        </motion.h1>

        {/* Subtitle: "Today is all about you, Princess." */}
        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base lg:text-lg text-slate-600 font-medium mb-3"
        >
          Today is all about you, <span className="font-script text-romantic-deepRose text-lg sm:text-xl font-bold">Princess</span>.
        </motion.p>

        {/* 2. Animated Birthday Cake Component */}
        <div className="w-full my-2">
          <BirthdayCake wished={wished} onMakeWish={handleMakeWish} />
        </div>

        {/* 3 & 4. Celebration Message (revealed after clicking Make a Wish or shown directly) */}
        <AnimatePresence>
          {wished && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: 'auto', scale: 1 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full mt-4"
            >
              <TypingMessage
                message="Happy Birthday, my Princess! You make every ordinary moment feel special. I hope your day is filled with happiness, laughter and endless love. You deserve the entire universe! ❤️"
                speed={28}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 5. Navigation to Phase 3 Memories */}
        <div className="mt-8 pt-5 border-t border-romantic-pink-200/50 w-full flex flex-col items-center">
          <p className="text-xs sm:text-sm text-slate-600 font-medium mb-3 flex items-center justify-center gap-1.5">
            <span>Ready to see our beautiful memories?</span>
            <Heart className="w-3.5 h-3.5 text-romantic-pink-500 fill-romantic-pink-400" />
          </p>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={onNavigateToMemories}
            className="group relative overflow-hidden px-7 py-3 rounded-full bg-gradient-to-r from-romantic-pink-500 via-romantic-rose to-romantic-lavender-500 hover:from-romantic-pink-600 hover:to-romantic-lavender-600 text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-romantic-pink-300/60 shadow-romantic-pink-400/30 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            aria-label="Let's Go to Memories"
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
            <span>Let's Go ❤️</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>

      {/* Footer Signature */}
      <footer className="text-center py-2 mt-2">
        <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5 font-medium">
          <span>Always & Forever</span>
          <span className="text-romantic-deepRose font-romantic font-semibold">Alex & Sophia</span>
          <span>❤️</span>
        </p>
      </footer>
    </motion.div>
  );
};
