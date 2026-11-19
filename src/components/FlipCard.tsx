import React from 'react';
import { motion } from 'framer-motion';
import { ReasonCard } from '../types';
import { Sparkles, Heart, RotateCcw } from 'lucide-react';

interface FlipCardProps {
  card: ReasonCard;
  isFlipped: boolean;
  onToggle: () => void;
  index: number;
}

export const FlipCard: React.FC<FlipCardProps> = ({
  card,
  isFlipped,
  onToggle,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="h-64 sm:h-72 w-full perspective-[1000px] select-none"
    >
      <div
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
        }}
        role="button"
        tabIndex={0}
        aria-expanded={isFlipped}
        aria-label={`Reason ${card.number}: ${card.title}. Click to ${isFlipped ? 'hide' : 'reveal'} reason.`}
        className={`relative w-full h-full transition-transform duration-700 transform-3d cursor-pointer rounded-2xl group focus:outline-none focus:ring-2 focus:ring-romantic-pink-400 focus:ring-offset-2 ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* FRONT OF CARD */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl p-5 sm:p-6 glass-card border border-white/90 shadow-md group-hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-between text-center overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {/* Subtle interior glow */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-romantic-pink-200/40 rounded-full blur-2xl pointer-events-none" />

          {/* Top Badge: Reason Number */}
          <div className="w-full flex items-center justify-between">
            <span className="w-7 h-7 rounded-full bg-romantic-pink-100 border border-romantic-pink-200 text-romantic-deepRose text-xs font-bold font-sans flex items-center justify-center shadow-xs">
              #{card.number}
            </span>
            <div className="p-1 text-romantic-pink-400 group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 h-4 text-amber-400 fill-amber-200" />
            </div>
          </div>

          {/* Center Emoji & Title */}
          <div className="flex flex-col items-center my-auto">
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-tr from-romantic-pink-100 via-white to-romantic-lavender-100 border border-romantic-pink-200/60 shadow-sm flex items-center justify-center text-3xl sm:text-4xl mb-3 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
              {card.emoji}
            </div>
            <h4 className="font-romantic text-base sm:text-lg font-bold text-slate-800 leading-tight px-1">
              {card.title}
            </h4>
          </div>

          {/* Bottom Flip Hint */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-romantic-pink-50 border border-romantic-pink-200/70 text-[11px] font-medium text-romantic-deepRose/90 shadow-2xs">
            <span>Tap to flip</span>
            <Heart className="w-3 h-3 fill-romantic-pink-400 text-romantic-pink-400" />
          </div>
        </div>

        {/* BACK OF CARD (Rotated 180deg) */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-white via-romantic-cream-100 to-romantic-pink-50 border border-romantic-pink-300 shadow-xl flex flex-col items-center justify-between text-center overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Subtle decorative glow */}
          <div className="absolute bottom-0 left-0 w-28 h-28 bg-romantic-lavender-200/50 rounded-full blur-2xl pointer-events-none" />

          {/* Top Bar on back */}
          <div className="w-full flex items-center justify-between">
            <span className="text-xs font-semibold text-romantic-deepRose tracking-wider uppercase">
              Reason #{card.number}
            </span>
            <Heart className="w-4 h-4 text-romantic-pink-500 fill-romantic-pink-400 animate-pulse" />
          </div>

          {/* Center Message */}
          <div className="my-auto px-1">
            <p className="font-romantic text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
              "{card.message}"
            </p>
          </div>

          {/* Flip Back Hint */}
          <div className="inline-flex items-center gap-1.5 text-[11px] font-sans font-medium text-slate-400 hover:text-romantic-deepRose transition-colors">
            <RotateCcw className="w-3 h-3" />
            <span>Tap to flip back</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
