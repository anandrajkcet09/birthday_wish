import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

interface BirthdayCakeProps {
  wished: boolean;
  onMakeWish: () => void;
}

export const BirthdayCake: React.FC<BirthdayCakeProps> = ({ wished, onMakeWish }) => {
  return (
    <div className="relative flex flex-col items-center select-none py-3">
      {/* Ambient Pulsing Glow behind Cake */}
      <motion.div
        animate={{
          scale: wished ? [1.1, 1.3, 1.15] : [1, 1.15, 1],
          opacity: wished ? [0.6, 0.85, 0.6] : [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: wished ? 2 : 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute top-10 w-52 h-44 sm:w-64 sm:h-52 rounded-full blur-3xl pointer-events-none -z-10 transition-colors duration-700 ${
          wished
            ? 'bg-gradient-to-tr from-amber-300 via-romantic-rose to-romantic-lavender-400'
            : 'bg-gradient-to-tr from-romantic-pink-300 via-romantic-rose to-romantic-lavender-300'
        }`}
      />

      {/* Floating Sparkles around Cake */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        {wished && (
          <>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0.8, 1.2, 0.9], opacity: [0.7, 1, 0.7], y: [-6, 6, -6] }}
              transition={{ repeat: Infinity, duration: 2.2 }}
              className="absolute -top-3 left-6 text-amber-400"
            >
              <Sparkles className="w-5 h-5 fill-amber-300" />
            </motion.div>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7], y: [4, -8, 4] }}
              transition={{ repeat: Infinity, duration: 2.6, delay: 0.3 }}
              className="absolute -top-2 right-8 text-romantic-pink-500"
            >
              <Heart className="w-4 h-4 fill-romantic-pink-400" />
            </motion.div>
          </>
        )}
      </div>

      {/* 3D-Style CSS Birthday Cake Container */}
      <div className="relative flex flex-col items-center">
        {/* CANDLES SECTION (3 Candles) */}
        <div className="flex justify-center items-end gap-5 sm:gap-7 h-16 z-20 mb-[-2px]">
          {[0, 1, 2].map((index) => {
            // Candle height variations
            const candleHeight = index === 1 ? 'h-11 sm:h-13' : 'h-9 sm:h-11';
            const candleColor =
              index === 0
                ? 'from-pink-300 via-rose-400 to-pink-400'
                : index === 1
                ? 'from-amber-200 via-amber-300 to-amber-400'
                : 'from-purple-300 via-lavender-400 to-purple-400';

            return (
              <div key={index} className="flex flex-col items-center relative">
                {/* Candle Flame or Smoke */}
                <div className="h-6 flex items-end justify-center relative">
                  <AnimatePresence>
                    {!wished ? (
                      /* Burning Animated Flame */
                      <motion.div
                        key="flame"
                        animate={{
                          scaleY: [1, 1.18, 0.95, 1.12, 1],
                          scaleX: [1, 0.92, 1.05, 0.94, 1],
                          rotate: index === 1 ? [-2, 3, -2, 1, -2] : index === 0 ? [-4, 2, -3, 0] : [2, -4, 3, -1],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.6 + index * 0.15,
                          ease: 'easeInOut',
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.2,
                          y: -10,
                          transition: { duration: 0.35 },
                        }}
                        className="relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-300 rounded-full"
                        title="Click or press Enter to blow out candle"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onMakeWish();
                          }
                        }}
                        onClick={onMakeWish}
                      >
                        {/* Flame Outer Glow */}
                        <div className="w-3.5 h-5 sm:w-4 sm:h-6 rounded-full bg-gradient-to-t from-amber-500 via-amber-300 to-yellow-100 shadow-[0_0_12px_rgba(251,191,36,0.9),0_0_24px_rgba(245,158,11,0.6)] transform origin-bottom" />
                        {/* Flame Inner Core */}
                        <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-2.5 rounded-full bg-cyan-200/90 blur-[0.5px]" />
                      </motion.div>
                    ) : (
                      /* Extinguished Smoke Animation */
                      <motion.div
                        key="smoke"
                        initial={{ opacity: 0.9, y: 0, scale: 0.6 }}
                        animate={{
                          opacity: [0.9, 0.6, 0],
                          y: [-2, -22, -34],
                          x: [0, (index - 1) * 6, (index - 1) * 12],
                          scale: [0.6, 1.3, 1.8],
                        }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        className="flex flex-col items-center pointer-events-none"
                      >
                        <div className="w-2 h-2 rounded-full bg-slate-400/60 blur-[1px]" />
                        <span className="text-[10px] text-amber-400 -mt-2">✨</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Candle Wick */}
                <div className="w-0.5 h-1.5 bg-slate-700 -mb-0.5 z-10" />

                {/* Candle Cylinder */}
                <div
                  className={`w-2.5 sm:w-3 ${candleHeight} rounded-t-sm bg-gradient-to-b ${candleColor} shadow-md border-t border-white/50 relative overflow-hidden`}
                >
                  {/* Candle Spiral Stripe */}
                  <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(45deg,transparent,transparent_3px,#ffffff_3px,#ffffff_6px)]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* TOP TIER OF CAKE */}
        <div className="relative z-10 w-36 sm:w-44 h-16 sm:h-18 rounded-t-2xl bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300 shadow-md border-t-2 border-white flex flex-col items-center overflow-hidden">
          {/* Frosting Scallops & Cream Layer */}
          <div className="w-full flex justify-around px-1 pt-0.5">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-5 h-4 sm:w-6 sm:h-5 bg-white rounded-full -mt-2 shadow-sm border-b border-pink-100 flex items-center justify-center"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-romantic-pink-400/60 mt-1" />
              </div>
            ))}
          </div>

          {/* Strawberry Dripping Frosting Details */}
          <div className="w-full flex justify-between px-3 mt-[-4px]">
            <div className="w-2 h-3.5 bg-white rounded-b-full shadow-sm" />
            <div className="w-2.5 h-5 bg-white rounded-b-full shadow-sm" />
            <div className="w-2 h-3 bg-white rounded-b-full shadow-sm" />
            <div className="w-2.5 h-4.5 bg-white rounded-b-full shadow-sm" />
            <div className="w-2 h-3 bg-white rounded-b-full shadow-sm" />
          </div>

          {/* Decorative Hearts on Top Tier */}
          <div className="mt-auto mb-2 flex items-center gap-2 text-romantic-deepRose/70 text-xs font-semibold">
            <span>❤️</span>
            <span className="font-script text-romantic-deepRose text-sm">Sophia</span>
            <span>❤️</span>
          </div>
        </div>

        {/* BOTTOM TIER OF CAKE */}
        <div className="relative z-0 w-48 sm:w-60 h-20 sm:h-24 rounded-t-2xl rounded-b-lg bg-gradient-to-b from-purple-100 via-pink-100 to-romantic-lavender-200 shadow-lg border-t-2 border-white flex flex-col items-center overflow-hidden -mt-1">
          {/* Middle Frosting Border */}
          <div className="w-full flex justify-around px-1 pt-0.5">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-5 h-4 sm:w-6 sm:h-5 bg-white rounded-full -mt-2 shadow-sm border-b border-pink-100 flex items-center justify-center"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-romantic-rose/70 mt-1" />
              </div>
            ))}
          </div>

          {/* Decorative Frosting Swirls & Sprinkles */}
          <div className="w-full h-full flex items-center justify-around px-4 opacity-75">
            <span className="text-[10px] sm:text-xs text-romantic-pink-400">✨</span>
            <div className="w-2 h-1 bg-amber-400 rounded-full rotate-45" />
            <div className="w-2 h-1 bg-romantic-deepRose rounded-full -rotate-12" />
            <div className="w-2 h-1 bg-purple-400 rounded-full rotate-30" />
            <div className="w-2 h-1 bg-pink-400 rounded-full -rotate-45" />
            <span className="text-[10px] sm:text-xs text-amber-400">✨</span>
          </div>

          {/* Cake Base Rim */}
          <div className="w-full h-2.5 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 border-t border-white/60 mt-auto" />
        </div>

        {/* CAKE STAND / PLATTER */}
        <div className="w-56 sm:w-72 h-4 sm:h-5 bg-gradient-to-r from-slate-200 via-white to-slate-200 rounded-full shadow-lg border border-white flex items-center justify-center -mt-1 z-10">
          <div className="w-3/4 h-1.5 bg-gradient-to-r from-transparent via-slate-300 to-transparent rounded-full" />
        </div>
        {/* Soft shadow cast on table */}
        <div className="w-48 sm:w-64 h-3 bg-romantic-deepRose/20 rounded-full blur-md mt-1" />
      </div>

      {/* INTERACTIVE ACTION SECTION */}
      <div className="mt-5 w-full flex flex-col items-center">
        {!wished ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={onMakeWish}
            className="group relative overflow-hidden px-6 py-2.5 sm:px-8 sm:py-3 rounded-full bg-gradient-to-r from-romantic-pink-500 via-romantic-rose to-romantic-lavender-500 hover:from-romantic-pink-600 hover:to-romantic-lavender-600 text-white font-semibold text-sm sm:text-base shadow-lg shadow-romantic-pink-400/40 cursor-pointer flex items-center gap-2"
            aria-label="Make a Wish"
          >
            {/* Shimmer overlay */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
            <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
            <span>Make a Wish ✨</span>
          </motion.button>
        ) : (
          /* Magical Glowing Wish Confirmation */
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', damping: 14 }}
            className="flex flex-col items-center gap-1.5"
          >
            <div className="px-5 py-2 rounded-full bg-gradient-to-r from-romantic-pink-100 via-white to-romantic-lavender-100 border border-romantic-pink-300 text-romantic-deepRose font-romantic font-semibold text-sm sm:text-base shadow-md flex items-center gap-2">
              <span className="text-lg">🕯️✨</span>
              <span>May all your wishes come true! ❤️</span>
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-300" />
            </div>
            <p className="text-xs text-romantic-pink-600 font-script text-base sm:text-lg">
              "Aapki har dua qubool ho, hamesha..."
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
