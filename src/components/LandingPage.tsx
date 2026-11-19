import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GiftBox } from './GiftBox';
import { MusicPlayer } from './MusicPlayer';
import { soundController } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';

interface LandingPageProps {
  onOpenSurprise: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenSurprise }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Audio sparkle
    soundController.playSurpriseFlourish();

    // Trigger sweet romantic confetti burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f43f71', '#fb7193', '#c084fc', '#ffd166', '#ffffff'],
        disableForReducedMotion: true,
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#f43f71', '#d8b4fe', '#ff8fa3'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#f43f71', '#d8b4fe', '#ff8fa3'],
        });
      }, 250);
    } catch {
      // safe fallback if confetti fails
    }

    // Smooth transition delay so the gift opening animation is enjoyed
    setTimeout(() => {
      onOpenSurprise();
    }, 1100);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
      transition={{ duration: 0.7 }}
      className="relative z-10 w-full max-w-2xl mx-auto px-4 py-6 sm:py-10 flex flex-col items-center justify-between min-h-[92vh]"
    >
      {/* Top Bar with romantic subtitle and sound toggle */}
      <div className="w-full flex items-center justify-between gap-2 px-2 sm:px-4">
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-romantic-pink-400 animate-ping inline-block" />
          <span className="text-xs sm:text-sm font-script text-romantic-deepRose tracking-wider">
            For Sophia, with pure love ✨
          </span>
        </motion.div>

        <MusicPlayer />
      </div>

      {/* Main Glassmorphism Card */}
      <motion.div
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full glass-card rounded-3xl p-6 sm:p-10 my-auto flex flex-col items-center text-center relative overflow-hidden"
      >
        {/* Subtle interior glow decorations */}
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-romantic-pink-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-36 h-36 bg-romantic-lavender-200/40 rounded-full blur-3xl pointer-events-none" />

        {/* Floating Greeting Pill */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-romantic-pink-100/90 border border-romantic-pink-300/70 text-romantic-deepRose text-xs sm:text-sm font-medium shadow-sm mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-300" />
          <span>A Special Birthday Surprise Just For You</span>
          <Heart className="w-3.5 h-3.5 text-romantic-pink-500 fill-romantic-pink-500" />
        </motion.div>

        {/* Requirement 4: "Hey Princess ❤️" */}
        <motion.h1
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-romantic text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-800 tracking-tight leading-tight mb-3 text-glow"
        >
          Hey <span className="font-script text-romantic-deepRose text-5xl sm:text-6xl lg:text-7xl underline decoration-romantic-pink-300 decoration-wavy decoration-2">Princess</span> ❤️
        </motion.h1>

        {/* Requirement 4: "Someone has created something special just for you..." */}
        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base sm:text-lg lg:text-xl text-slate-600 font-medium max-w-lg leading-relaxed mb-2"
        >
          Someone has created something special just for you...
        </motion.p>

        {/* English + Hinglish Warm Touch */}
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-script text-xl sm:text-2xl text-romantic-pink-600 mb-6 italic"
        >
          "Kyunki tumhare bina har khushi adhoori hai... bas ek tap aur jaadu shuru ✨"
        </motion.p>

        {/* Requirement 5: Glowing animated gift box in the center */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6, type: 'spring' }}
          className="w-full flex justify-center py-2"
        >
          <GiftBox isOpening={isOpening} onClick={handleOpen} />
        </motion.div>

        {/* Requirement 6: Interactive button: "Open Your Surprise 🎁" */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-6 w-full max-w-xs"
        >
          <button
            onClick={handleOpen}
            disabled={isOpening}
            className="w-full relative group overflow-hidden px-8 py-4 rounded-full bg-gradient-to-r from-romantic-pink-500 via-romantic-rose to-romantic-lavender-500 hover:from-romantic-pink-600 hover:via-romantic-pink-500 hover:to-romantic-lavender-600 text-white font-semibold text-base sm:text-lg shadow-lg hover:shadow-romantic-pink-300/60 shadow-romantic-pink-400/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-85"
            aria-label="Open Your Surprise"
          >
            {/* Shimmer overlay animation */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

            <span className="relative z-10 font-sans tracking-wide">
              {isOpening ? 'Opening Surprise...' : 'Open Your Surprise 🎁'}
            </span>

            {!isOpening && (
              <motion.span
                animate={{ scale: [1, 1.25, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative z-10 text-lg"
              >
                ✨
              </motion.span>
            )}
          </button>
        </motion.div>
      </motion.div>

      {/* Footer / Love Note */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center py-3"
      >
        <p className="text-xs sm:text-sm text-slate-500 flex items-center justify-center gap-1.5 font-medium">
          <span>Crafted with endless love by</span>
          <span className="font-semibold text-romantic-deepRose font-romantic">Alex</span>
          <span>for his favorite person</span>
          <span className="text-romantic-pink-500">❤️</span>
        </p>
      </motion.footer>
    </motion.div>
  );
};
