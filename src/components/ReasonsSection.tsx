import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlipCard } from './FlipCard';
import { MusicPlayer } from './MusicPlayer';
import { REASONS_DATA } from '../data/reasonsData';
import { soundController } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Heart,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  CheckCircle2,
  Gift,
} from 'lucide-react';

interface ReasonsSectionProps {
  onNavigateToFinalSurprise: () => void;
  onBackToLetter: () => void;
}

export const ReasonsSection: React.FC<ReasonsSectionProps> = ({
  onNavigateToFinalSurprise,
  onBackToLetter,
}) => {
  // Set of card IDs currently flipped open
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  // Set of all card IDs that user has discovered at least once
  const [discoveredCards, setDiscoveredCards] = useState<Set<number>>(new Set());
  const [hasCelebratedAll, setHasCelebratedAll] = useState(false);

  const totalCards = REASONS_DATA.length;
  const discoveredCount = discoveredCards.size;
  const allDiscovered = discoveredCount === totalCards;
  const allCurrentlyFlipped = flippedCards.size === totalCards;

  // Toggle individual card
  const handleToggleCard = (id: number) => {
    soundController.playChime();

    setFlippedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

    setDiscoveredCards((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  // Toggle reveal all / flip all back
  const handleToggleAll = () => {
    soundController.playChime();

    if (allCurrentlyFlipped) {
      setFlippedCards(new Set());
    } else {
      const allIds = new Set(REASONS_DATA.map((c) => c.id));
      setFlippedCards(allIds);
      setDiscoveredCards(allIds);
    }
  };

  // Trigger celebration when all 8 cards are discovered
  useEffect(() => {
    if (allDiscovered && !hasCelebratedAll) {
      setHasCelebratedAll(true);
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.65 },
          colors: ['#f43f71', '#fb7193', '#c084fc', '#ffd166'],
          disableForReducedMotion: true,
        });
      } catch {
        // safe fallback
      }
    }
  }, [allDiscovered, hasCelebratedAll]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
      transition={{ duration: 0.7 }}
      className="relative z-10 w-full max-w-6xl mx-auto px-3 sm:px-6 py-6 sm:py-8 flex flex-col items-center min-h-[92vh]"
    >
      {/* Top Bar with Navigation & Music Player */}
      <div className="w-full flex items-center justify-between gap-2 mb-4 px-1">
        <button
          onClick={onBackToLetter}
          className="px-3.5 py-1.5 rounded-full bg-white/70 hover:bg-white/95 backdrop-blur-md border border-romantic-pink-200 text-xs font-medium text-slate-700 hover:text-romantic-deepRose transition-all duration-200 flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Letter</span>
        </button>

        <MusicPlayer />
      </div>

      {/* Main Glassmorphism Container */}
      <div className="w-full glass-card rounded-3xl p-4 xs:p-6 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
        {/* Soft Ambient Radiance */}
        <div className="absolute top-0 right-10 w-72 h-72 bg-romantic-pink-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-romantic-lavender-200/40 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-xl mx-auto mb-6"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-romantic-pink-100/90 border border-romantic-pink-200 text-romantic-deepRose text-xs sm:text-sm font-medium shadow-sm mb-3">
            <Heart className="w-3.5 h-3.5 text-romantic-pink-500 fill-romantic-pink-400" />
            <span>Countless Reasons</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-300" />
          </div>

          <h2 className="font-romantic text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight mb-2 text-glow">
            Reasons Why You're My Favourite Person ❤️
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            There are a million reasons, but here are just a few...
          </p>

          <p className="font-script text-xl sm:text-2xl text-romantic-pink-600 mt-1">
            "Har wajah sirf tumse judi hui hai ✨"
          </p>
        </motion.div>

        {/* Discovery Progress Indicator & Reveal All Controls */}
        <div className="w-full max-w-md mx-auto mb-8 flex flex-col items-center">
          <div className="w-full flex items-center justify-between text-xs sm:text-sm font-medium text-slate-600 mb-2 px-1">
            <span className="flex items-center gap-1 text-romantic-deepRose font-semibold">
              <CheckCircle2 className="w-4 h-4 text-romantic-pink-500" />
              <span>
                You've discovered {discoveredCount} of {totalCards} reasons
              </span>
            </span>
            <span className="text-xs text-slate-400 font-sans">
              {Math.round((discoveredCount / totalCards) * 100)}%
            </span>
          </div>

          {/* Smooth Progress Bar */}
          <div className="w-full h-2 bg-romantic-pink-100/80 rounded-full overflow-hidden p-0.5 border border-romantic-pink-200/50 shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(discoveredCount / totalCards) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-romantic-pink-400 via-romantic-rose to-romantic-lavender-400 rounded-full"
            />
          </div>

          {/* Reveal / Flip All Button */}
          <button
            onClick={handleToggleAll}
            className="mt-3.5 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/80 hover:bg-white text-xs sm:text-sm font-medium text-slate-600 hover:text-romantic-deepRose border border-romantic-pink-200 shadow-xs transition-all duration-200 cursor-pointer"
          >
            {allCurrentlyFlipped ? (
              <>
                <EyeOff className="w-3.5 h-3.5" />
                <span>Flip All Back</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>Reveal All Reasons ✨</span>
              </>
            )}
          </button>
        </div>

        {/* 2. RESPONSIVE GRID OF 8 INTERACTIVE FLIP CARDS */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 py-2 px-1">
          {REASONS_DATA.map((card, index) => (
            <FlipCard
              key={card.id}
              card={card}
              index={index}
              isFlipped={flippedCards.has(card.id)}
              onToggle={() => handleToggleCard(card.id)}
            />
          ))}
        </div>

        {/* 3. SPECIAL SURPRISE (Revealed after all cards are discovered) */}
        <AnimatePresence>
          {allDiscovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 w-full max-w-xl mx-auto p-5 sm:p-7 rounded-2xl bg-gradient-to-r from-romantic-pink-50 via-white to-romantic-lavender-50 border border-romantic-pink-300/80 shadow-lg text-center flex flex-col items-center relative overflow-hidden"
            >
              {/* Decorative mini glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-200/40 rounded-full blur-2xl pointer-events-none" />

              <div className="w-10 h-10 rounded-full bg-romantic-pink-100 flex items-center justify-center text-romantic-deepRose mb-2">
                <Heart className="w-5 h-5 fill-romantic-pink-400 text-romantic-pink-400 animate-pulse" />
              </div>

              <h4 className="font-romantic text-base sm:text-lg font-bold text-slate-800 leading-snug mb-1">
                "These are just 8 reasons. I could write a thousand more, and still never run out. ❤️"
              </h4>

              <p className="font-script text-lg sm:text-xl text-romantic-pink-600 mt-1">
                Forever fascinated by everything you are, Sophia.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 4. NAVIGATION TO PHASE 6 (Final Surprise) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 pt-8 border-t border-romantic-pink-200/60 w-full flex flex-col items-center text-center"
        >
          <p className="text-sm sm:text-base text-slate-700 font-medium mb-3 max-w-md">
            And now... one last little surprise awaits you.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={onNavigateToFinalSurprise}
            className="group relative overflow-hidden px-8 py-3.5 rounded-full bg-gradient-to-r from-romantic-pink-500 via-romantic-rose to-romantic-lavender-500 hover:from-romantic-pink-600 hover:to-romantic-lavender-600 text-white font-semibold text-base sm:text-lg shadow-lg hover:shadow-romantic-pink-300/60 shadow-romantic-pink-400/40 transition-all duration-300 flex items-center gap-2.5 cursor-pointer"
            aria-label="Open Your Final Surprise"
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
            <Gift className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform" />
            <span>Open Your Final Surprise 🎁</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <p className="text-xs text-romantic-pink-500 font-script text-base mt-2 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-300" />
            <span>The sweetest chapter awaits</span>
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 mt-3">
        <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5 font-medium">
          <span>Every reason belongs to</span>
          <span className="font-semibold text-romantic-deepRose font-romantic">Sophia</span>
          <span>from Alex</span>
          <span className="text-romantic-pink-500">❤️</span>
        </p>
      </footer>
    </motion.div>
  );
};
