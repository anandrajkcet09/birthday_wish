import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Mail } from 'lucide-react';

interface InteractiveEnvelopeProps {
  isOpen: boolean;
  onOpen: () => void;
}

export const InteractiveEnvelope: React.FC<InteractiveEnvelopeProps> = ({
  isOpen,
  onOpen,
}) => {
  return (
    <div className="relative flex flex-col items-center select-none py-4 my-2">
      {/* Ambient Pulsing Glow behind Envelope */}
      <motion.div
        animate={{
          scale: isOpen ? [1.1, 1.25, 1.1] : [1, 1.12, 1],
          opacity: isOpen ? [0.6, 0.85, 0.6] : [0.35, 0.55, 0.35],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 w-64 h-52 sm:w-80 sm:h-60 rounded-full bg-gradient-to-tr from-romantic-pink-300 via-romantic-rose/40 to-romantic-lavender-300 blur-3xl pointer-events-none -z-10"
      />

      {/* Floating Sparkles & Hearts around Envelope */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [-4, 5, -4], rotate: [0, 15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-3 right-4 sm:right-8 text-amber-300 drop-shadow"
        >
          <Sparkles className="w-5 h-5 fill-amber-200" />
        </motion.div>
        <motion.div
          animate={{ y: [5, -4, 5], rotate: [0, -12, 0], scale: [0.9, 1.15, 0.9] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          className="absolute top-12 -left-3 text-romantic-pink-400 drop-shadow"
        >
          <Heart className="w-4 h-4 fill-romantic-pink-300 text-romantic-pink-400" />
        </motion.div>
        <motion.div
          animate={{ y: [-3, 6, -3], rotate: [0, 8, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="absolute bottom-6 right-2 text-romantic-lavender-400 drop-shadow"
        >
          <Sparkles className="w-4 h-4 text-romantic-lavender-400 fill-romantic-lavender-200" />
        </motion.div>
      </div>

      {/* ENVELOPE 3D CONTAINER */}
      <div
        onClick={!isOpen ? onOpen : undefined}
        className={`relative w-[268px] xs:w-72 sm:w-96 h-44 xs:h-48 sm:h-60 max-w-[88vw] perspective-[1000px] cursor-pointer group transition-transform ${
          !isOpen ? 'hover:scale-[1.03] active:scale-[0.98]' : ''
        }`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (!isOpen && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onOpen();
          }
        }}
        aria-label="Open Love Letter Envelope"
      >
        {/* Envelope Back Layer */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-romantic-pink-100 via-rose-100 to-romantic-lavender-100 shadow-xl border border-romantic-pink-200 overflow-hidden" />

        {/* Peek of Letter Paper inside before / during emerging */}
        <motion.div
          animate={
            isOpen
              ? {
                  y: -90,
                  opacity: [0.9, 0.4, 0],
                  scale: [0.96, 1.02, 1.05],
                }
              : {
                  y: 0,
                  opacity: 0.95,
                  scale: 0.94,
                }
          }
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-4 top-2 h-36 sm:h-44 bg-romantic-cream-50 rounded-t-xl border border-amber-100/80 shadow-md p-3 flex flex-col pointer-events-none z-10"
        >
          <div className="w-1/3 h-1.5 bg-romantic-pink-200/80 rounded-full mb-2" />
          <div className="w-full h-1 bg-slate-200/60 rounded-full mb-1.5" />
          <div className="w-5/6 h-1 bg-slate-200/60 rounded-full mb-1.5" />
          <div className="w-4/6 h-1 bg-slate-200/60 rounded-full" />
        </motion.div>

        {/* Envelope Front Left & Right Fold Triangles */}
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background:
              'linear-gradient(to bottom right, transparent 50%, rgba(254, 205, 216, 0.7) 50%)',
          }}
        />

        {/* Envelope Front Pocket (Bottom Triangle flap) */}
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-t from-romantic-pink-200 via-romantic-blush to-romantic-pink-100 shadow-inner z-20 pointer-events-none overflow-hidden"
          style={{
            clipPath: 'polygon(0% 100%, 100% 100%, 50% 48%)',
          }}
        >
          {/* Subtle gold line accent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-200/70 to-transparent" />
        </div>

        {/* Envelope Left Fold */}
        <div
          className="absolute inset-0 rounded-l-2xl bg-gradient-to-r from-romantic-pink-200/90 to-romantic-pink-100/60 z-20 pointer-events-none"
          style={{
            clipPath: 'polygon(0% 0%, 0% 100%, 50% 50%)',
          }}
        />

        {/* Envelope Right Fold */}
        <div
          className="absolute inset-0 rounded-r-2xl bg-gradient-to-l from-romantic-pink-200/90 to-romantic-pink-100/60 z-20 pointer-events-none"
          style={{
            clipPath: 'polygon(100% 0%, 100% 100%, 50% 50%)',
          }}
        />

        {/* Envelope Top Triangular Flap with 3D Flip */}
        <motion.div
          animate={
            isOpen
              ? {
                  rotateX: 180,
                  zIndex: 0,
                  opacity: 0.6,
                }
              : {
                  rotateX: 0,
                  zIndex: 30,
                  opacity: 1,
                }
          }
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            transformOrigin: 'top center',
            transformStyle: 'preserve-3d',
            clipPath: 'polygon(0% 0%, 100% 0%, 50% 54%)',
          }}
          className="absolute inset-0 bg-gradient-to-b from-romantic-rose via-romantic-pink-300 to-romantic-pink-200 shadow-md pointer-events-none"
        />

        {/* WAX SEAL (Heart-Shaped Wax Stamp in Center) */}
        <motion.div
          animate={
            isOpen
              ? {
                  scale: [1, 1.3, 0],
                  opacity: [1, 0.8, 0],
                  rotate: [0, 15, -10],
                }
              : {
                  scale: [1, 1.04, 1],
                }
          }
          transition={
            isOpen
              ? { duration: 0.5, ease: 'easeOut' }
              : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }
          className="absolute left-1/2 top-[47%] -translate-x-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-rose-700 via-romantic-deepRose to-rose-500 shadow-lg border-2 border-amber-300/60 flex items-center justify-center cursor-pointer pointer-events-auto group-hover:shadow-rose-400/50"
        >
          {/* Inner embossed rim */}
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-amber-200/50 flex items-center justify-center bg-rose-800/40">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200 fill-amber-200 drop-shadow" />
          </div>
        </motion.div>
      </div>

      {/* Button to open envelope if not opened */}
      {!isOpen ? (
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 flex flex-col items-center gap-2"
        >
          <button
            onClick={onOpen}
            className="group relative overflow-hidden px-8 py-3.5 rounded-full bg-gradient-to-r from-romantic-pink-500 via-romantic-rose to-romantic-lavender-500 hover:from-romantic-pink-600 hover:to-romantic-lavender-600 text-white font-semibold text-sm sm:text-base shadow-lg shadow-romantic-pink-400/40 cursor-pointer flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95"
            aria-label="Open Your Letter"
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
            <Mail className="w-4 h-4 text-amber-200 group-hover:rotate-6 transition-transform" />
            <span>Open Your Letter 💌</span>
          </button>
          <span className="text-xs text-romantic-pink-500 font-script text-base">
            "Sirf aapke liye likha gaya ek chhota sa paighaam..."
          </span>
        </motion.div>
      ) : null}
    </div>
  );
};
