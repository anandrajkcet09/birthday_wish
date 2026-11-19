import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

interface GiftBoxProps {
  isOpening?: boolean;
  onClick?: () => void;
}

export const GiftBox: React.FC<GiftBoxProps> = ({ isOpening = false, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="relative flex items-center justify-center cursor-pointer group select-none py-6 my-2 focus:outline-none focus:ring-2 focus:ring-romantic-pink-400 focus:ring-offset-2 rounded-3xl"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label="Gift Box - Click to open your birthday surprise"
    >
      {/* Radiant ambient glow effect */}
      <motion.div
        animate={{
          scale: [1, 1.18, 1],
          opacity: [0.45, 0.75, 0.45],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-romantic-pink-400 via-romantic-rose to-romantic-lavender-400 blur-2xl pointer-events-none -z-10"
      />

      {/* Secondary softer halo */}
      <motion.div
        animate={{
          scale: [1.1, 0.95, 1.1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute w-60 h-60 sm:w-72 sm:h-72 rounded-full bg-romantic-lavender-300 blur-3xl pointer-events-none -z-20"
      />

      {/* Floating Sparkle Accents */}
      <motion.div
        animate={{
          y: [-4, 4, -4],
          rotate: [0, 15, -10, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-3 -right-2 text-amber-300 drop-shadow-md pointer-events-none"
      >
        <Sparkles className="w-6 h-6 fill-amber-200" />
      </motion.div>

      <motion.div
        animate={{
          y: [3, -5, 3],
          rotate: [0, -12, 10, 0],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute -bottom-2 -left-3 text-romantic-pink-400 drop-shadow-md pointer-events-none"
      >
        <Heart className="w-5 h-5 fill-romantic-pink-300 text-romantic-pink-400" />
      </motion.div>

      {/* The Gift Box Container */}
      <motion.div
        animate={
          isOpening
            ? {
                scale: [1, 1.15, 1.3, 0.9, 1.4],
                rotate: [0, -8, 8, -5, 0],
                opacity: [1, 1, 1, 0.8, 0],
              }
            : {
                y: [0, -10, 0],
              }
        }
        transition={
          isOpening
            ? { duration: 0.9, times: [0, 0.25, 0.5, 0.75, 1], ease: 'easeInOut' }
            : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }
        }
        whileHover={!isOpening ? { scale: 1.06, rotate: [-1, 1, -1] } : {}}
        whileTap={!isOpening ? { scale: 0.97 } : {}}
        className="relative flex flex-col items-center"
      >
        {/* Ribbon Bow on top */}
        <motion.div
          animate={
            isOpening
              ? { y: -70, opacity: 0, rotate: -25 }
              : { y: [0, -2, 0] }
          }
          transition={
            isOpening
              ? { duration: 0.6, ease: 'easeOut' }
              : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
          }
          className="relative z-20 -mb-2 flex items-center justify-center"
        >
          {/* Left Ribbon Loop */}
          <div className="w-9 h-7 sm:w-11 sm:h-9 bg-gradient-to-br from-amber-200 via-amber-300 to-amber-500 rounded-full rotate-[-35deg] shadow-md border border-amber-100 transform origin-bottom-right" />
          {/* Center Bow Knot */}
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-amber-300 to-amber-500 rounded-full z-30 shadow-lg border border-amber-100 -mx-1" />
          {/* Right Ribbon Loop */}
          <div className="w-9 h-7 sm:w-11 sm:h-9 bg-gradient-to-bl from-amber-200 via-amber-300 to-amber-500 rounded-full rotate-[35deg] shadow-md border border-amber-100 transform origin-bottom-left" />
        </motion.div>

        {/* Gift Box Lid */}
        <motion.div
          animate={
            isOpening
              ? {
                  y: -55,
                  rotate: -15,
                  opacity: [1, 0.9, 0],
                }
              : {}
          }
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative z-10 w-36 h-9 sm:w-44 sm:h-11 rounded-t-lg bg-gradient-to-r from-romantic-pink-400 via-romantic-rose to-romantic-pink-500 shadow-md border-t border-romantic-pink-200 flex items-center justify-center overflow-hidden"
        >
          {/* Lid Horizontal Ribbon */}
          <div className="absolute inset-x-0 h-2 bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 shadow-inner" />
          {/* Lid Vertical Ribbon */}
          <div className="absolute inset-y-0 w-4 bg-gradient-to-b from-amber-200 via-amber-300 to-amber-400 shadow-sm" />
          {/* Gloss overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
        </motion.div>

        {/* Gift Box Main Body */}
        <div className="relative w-32 h-28 sm:w-40 sm:h-36 rounded-b-xl bg-gradient-to-b from-romantic-pink-500 via-romantic-pink-600 to-romantic-deepRose shadow-2xl border-b-2 border-romantic-deepRose flex items-center justify-center overflow-hidden">
          {/* Golden Vertical Ribbon */}
          <div className="absolute inset-y-0 w-4 bg-gradient-to-b from-amber-200 via-amber-300 to-amber-400 shadow-inner flex items-center justify-center">
            <span className="text-[10px] text-amber-900/50">✨</span>
          </div>

          {/* Golden Horizontal Ribbon */}
          <div className="absolute inset-x-0 h-3 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 shadow-inner" />

          {/* Subtle Heart Watermark Pattern */}
          <div className="absolute inset-0 opacity-15 flex items-center justify-around pointer-events-none">
            <span className="text-2xl text-white">❤️</span>
            <span className="text-2xl text-white">❤️</span>
          </div>

          {/* Box Glassy Highlighting */}
          <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />

          {/* Shimmer light bar across gift */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
        </div>

        {/* Soft Shadow beneath the box */}
        <motion.div
          animate={
            isOpening
              ? { scale: [1, 1.3, 0], opacity: [0.4, 0.2, 0] }
              : { scale: [0.9, 1.08, 0.9], opacity: [0.35, 0.55, 0.35] }
          }
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-28 sm:w-36 h-4 bg-romantic-deepRose/25 rounded-full blur-md mt-2"
        />
      </motion.div>

      {/* Floating prompt tooltip badge */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-5 sm:-bottom-6 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md border border-romantic-pink-200 text-xs text-romantic-deepRose font-medium shadow-sm flex items-center gap-1"
      >
        <span className="animate-pulse">✨</span>
        <span>Tap box or button below</span>
      </motion.div>
    </div>
  );
};
