import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MusicPlayer } from './MusicPlayer';
import { soundController } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Heart,
  Sparkles,
  RotateCcw,
  Moon,
  Cloud,
  Stars,
  Send,
} from 'lucide-react';

interface FinalSurpriseSectionProps {
  onReplay: () => void;
  onBackToReasons: () => void;
}

export const FinalSurpriseSection: React.FC<FinalSurpriseSectionProps> = ({
  onReplay,
  onBackToReasons,
}) => {
  const [loveSent, setLoveSent] = useState(false);
  const [burstScale, setBurstScale] = useState(1);

  const handleSendLove = () => {
    soundController.playHeartBurst();
    setBurstScale(1.35);
    setTimeout(() => setBurstScale(1), 400);

    setLoveSent(true);

    // Multi-angle fireworks and romantic heart confetti
    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.65 },
        colors: ['#f43f71', '#fb7193', '#c084fc', '#ffd166', '#ffffff', '#e11d57'],
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 60,
          origin: { x: 0.1, y: 0.5 },
          colors: ['#ffd166', '#f43f71', '#c084fc'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 60,
          origin: { x: 0.9, y: 0.5 },
          colors: ['#ffd166', '#f43f71', '#c084fc'],
        });
      }, 300);
    } catch {
      // safe fallback
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
      transition={{ duration: 0.8 }}
      className="relative z-10 w-full min-h-screen py-8 px-3 sm:px-6 flex flex-col items-center justify-between text-white overflow-hidden"
    >
      {/* CINEMATIC NIGHT SKY BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none -z-20 bg-gradient-to-b from-[#090b16] via-[#1a102f] to-[#3a1c3d]" />

      {/* Soft Moonlight Corona & Crescent Moon */}
      <div className="absolute top-8 right-6 sm:right-16 pointer-events-none select-none -z-10">
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.85, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-amber-100/25 blur-3xl"
        />
        <motion.div
          animate={{ rotate: [-2, 3, -2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="relative flex items-center justify-center"
        >
          <Moon className="w-16 h-16 sm:w-20 sm:h-20 text-amber-100/90 drop-shadow-[0_0_25px_rgba(254,243,199,0.7)] fill-amber-50/20" />
          <Sparkles className="w-5 h-5 text-amber-200 absolute -top-1 -left-2 animate-pulse" />
        </motion.div>
      </div>

      {/* Gentle Floating Night Clouds */}
      <motion.div
        animate={{ x: [-30, 40, -30] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 left-[-5%] opacity-20 pointer-events-none -z-10"
      >
        <Cloud className="w-56 h-28 text-romantic-lavender-200 blur-sm" />
      </motion.div>
      <motion.div
        animate={{ x: [30, -40, 30] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-44 right-[-5%] opacity-20 pointer-events-none -z-10"
      >
        <Cloud className="w-72 h-36 text-romantic-pink-200 blur-sm" />
      </motion.div>

      {/* Twinkling Night Stars */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.2 }}
            animate={{
              opacity: [0.2, 0.9, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + (i % 4),
              repeat: Infinity,
              delay: (i * 0.4) % 3,
            }}
            style={{
              top: `${(i * 19 + 7) % 90}%`,
              left: `${(i * 23 + 11) % 95}%`,
            }}
            className="absolute text-amber-200/80"
          >
            <span className="text-[10px]">✦</span>
          </motion.div>
        ))}
      </div>

      {/* Top Bar with Navigation & Music Player */}
      <div className="w-full max-w-4xl flex items-center justify-between gap-2 mb-4 px-1">
        <button
          onClick={onBackToReasons}
          className="px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-xs font-medium text-white transition-all duration-200 flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <span>← Back to Reasons</span>
        </button>

        <MusicPlayer className="bg-white/15 border-white/20 text-white" />
      </div>

      {/* Main Glassmorphism Cinematic Container */}
      <div className="w-full max-w-3xl glass-card rounded-3xl p-4 xs:p-6 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col items-center text-center my-auto border-white/25 bg-black/35 backdrop-blur-xl">
        {/* Ambient Interior Halo */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-romantic-pink-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-romantic-lavender-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Cinematic Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center max-w-xl mx-auto mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-romantic-pink-200 text-xs sm:text-sm font-medium shadow-sm mb-4 backdrop-blur-md">
            <Stars className="w-4 h-4 text-amber-300" />
            <span>Under The Starlight</span>
            <Moon className="w-3.5 h-3.5 text-amber-200" />
          </div>

          <h2 className="font-romantic text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-2 drop-shadow-md">
            One Last Thing, My <span className="font-script text-romantic-pink-300 text-4xl sm:text-6xl lg:text-7xl">Princess...</span>
          </h2>

          <p className="font-script text-xl sm:text-2xl text-romantic-pink-200 mt-1">
            "Kyunki tumse behtar koi aur ho hi nahi sakta..."
          </p>
        </motion.div>

        {/* 2. FINAL BIRTHDAY MESSAGE (Smooth Text Reveal) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-xl mx-auto my-4 p-6 sm:p-8 rounded-2xl bg-white/10 border border-white/20 shadow-inner backdrop-blur-md text-left font-romantic text-slate-100 text-base sm:text-lg leading-relaxed space-y-4"
        >
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            If I could make one wish today, it would be to see you smile every single day.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-romantic-pink-200 font-semibold"
          >
            You are one of the most beautiful parts of my life.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            No matter how many birthdays come and go, I hope you always remember how special you are.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            Keep smiling, keep shining, and keep being the wonderful person you are.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-romantic-rose font-bold text-lg sm:text-xl pt-1 font-romantic"
          >
            Happy Birthday, Sophia! ❤️
          </motion.p>
        </motion.div>

        {/* 3. SPECIAL HEART INTERACTION */}
        <div className="w-full flex flex-col items-center my-6">
          {/* Large Glowing Animated Heart */}
          <div className="relative flex items-center justify-center my-4 cursor-pointer" onClick={handleSendLove}>
            {/* Pulsing Aura */}
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-romantic-pink-500 via-rose-500 to-romantic-lavender-500 blur-2xl pointer-events-none"
            />

            {/* Heart Icon with Spring / Burst Animation */}
            <motion.div
              animate={{
                scale: burstScale,
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 15 }}
              whileHover={{ scale: 1.15 }}
              className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-rose-600 via-romantic-deepRose to-pink-500 shadow-[0_0_35px_rgba(244,63,113,0.8)] border border-white/50 flex items-center justify-center text-white"
            >
              <Heart className="w-12 h-12 sm:w-14 sm:h-14 fill-white text-white drop-shadow-md animate-pulse" />
            </motion.div>
          </div>

          {/* Interactive Button: "Send You All My Love ❤️" */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleSendLove}
            className="group relative overflow-hidden px-8 py-3.5 rounded-full bg-gradient-to-r from-romantic-pink-500 via-rose-500 to-romantic-lavender-500 hover:from-romantic-pink-600 hover:to-romantic-lavender-600 text-white font-semibold text-base sm:text-lg shadow-xl shadow-romantic-pink-500/40 transition-all duration-300 flex items-center gap-2.5 cursor-pointer mt-2"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
            <Send className="w-4 h-4 text-amber-200 group-hover:translate-x-0.5 -rotate-12 transition-transform" />
            <span>Send You All My Love ❤️</span>
          </motion.button>

          {/* Revealed Love Message */}
          <AnimatePresence>
            {loveSent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', damping: 14 }}
                className="mt-4 px-6 py-2.5 rounded-full bg-white/20 border border-white/30 text-white font-romantic font-semibold text-sm sm:text-base shadow-lg backdrop-blur-md flex items-center gap-2"
              >
                <span>Sending you endless love, hugs and happiness! ❤️</span>
                <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 4. FINAL SIGNATURE */}
        <div className="w-full mt-6 pt-6 border-t border-white/20 flex flex-col items-center text-center">
          <p className="font-romantic text-xs sm:text-sm uppercase tracking-widest text-slate-300 mb-1">
            Forever Your Favourite Person
          </p>
          <motion.span
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-script text-4xl sm:text-5xl text-romantic-pink-300 font-bold tracking-wider drop-shadow-md"
          >
            With Love, Alex ❤️
          </motion.span>
        </div>

        {/* 6. REPLAY EXPERIENCE */}
        <div className="w-full mt-10 pt-6 border-t border-white/15 flex flex-col items-center text-center">
          <p className="text-xs sm:text-sm text-slate-300 font-medium mb-3">
            Want to relive this little surprise?
          </p>

          <button
            onClick={onReplay}
            className="group px-6 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/30 text-xs sm:text-sm font-semibold transition-all duration-300 shadow-md flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Replay Our Story"
          >
            <RotateCcw className="w-4 h-4 group-hover:-rotate-90 transition-transform duration-300" />
            <span>Replay Our Story ↻</span>
          </button>
        </div>
      </div>

      {/* Cinematic Footer */}
      <footer className="text-center py-4 mt-2">
        <p className="text-xs text-slate-400 font-medium flex items-center justify-center gap-1.5">
          <span>Made for Sophia</span>
          <span>•</span>
          <span className="text-romantic-pink-300 font-romantic">Happy Birthday Princess</span>
          <Heart className="w-3.5 h-3.5 fill-romantic-pink-400 text-romantic-pink-400 inline" />
        </p>
      </footer>
    </motion.div>
  );
};
