import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote, Sparkles } from 'lucide-react';

interface TypingMessageProps {
  message?: string;
  speed?: number; // ms per char
}

const DEFAULT_MESSAGE =
  "Happy Birthday, my Princess! You make every ordinary moment feel special. I hope your day is filled with happiness, laughter and endless love. You deserve the entire universe! ❤️";

export const TypingMessage: React.FC<TypingMessageProps> = ({
  message = DEFAULT_MESSAGE,
  speed = 32,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    setDisplayedText('');
    setIsDone(false);

    const timer = setInterval(() => {
      if (currentIndex < message.length) {
        setDisplayedText(message.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsDone(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [message, speed]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full relative glass-card rounded-2xl p-5 sm:p-7 border border-white/80 shadow-lg text-left"
    >
      {/* Decorative Quote Icon */}
      <div className="absolute -top-3 left-6 px-2 py-0.5 rounded-full bg-romantic-pink-100 border border-romantic-pink-200 text-romantic-deepRose flex items-center gap-1 shadow-sm">
        <Quote className="w-3.5 h-3.5 rotate-180" />
        <span className="text-[11px] font-semibold tracking-wider uppercase font-sans">A Note For You</span>
      </div>

      {/* Decorative soft glow */}
      <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-romantic-lavender-200/40 rounded-full blur-2xl pointer-events-none" />

      {/* Typed Text */}
      <div className="pt-2">
        <p className="font-romantic text-base sm:text-lg text-slate-700 leading-relaxed tracking-normal">
          {displayedText}
          {!isDone && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.7 }}
              className="inline-block w-1.5 h-5 bg-romantic-deepRose ml-1 rounded-sm align-middle"
            />
          )}
        </p>
      </div>

      {/* Signature & Hinglish Note once typing completes */}
      {isDone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mt-4 pt-3 border-t border-romantic-pink-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1"
        >
          <span className="text-xs sm:text-sm font-script text-romantic-pink-600 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            "Hamesha aise hi muskurati rehna..."
          </span>
          <span className="text-xs text-slate-500 font-sans font-medium">
            Forever yours, <strong className="text-romantic-deepRose">Alex</strong>
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};
