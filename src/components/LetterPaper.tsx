import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { LOVE_LETTER } from '../data/letterData';
import { Heart, Sparkles, FastForward } from 'lucide-react';

interface LetterPaperProps {
  onTypingComplete: () => void;
}

export const LetterPaper: React.FC<LetterPaperProps> = ({ onTypingComplete }) => {
  // We'll type out the paragraphs sequentially
  const [currentParaIndex, setCurrentParaIndex] = useState(0);
  const [typedParagraphs, setTypedParagraphs] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [isSkipped, setIsSkipped] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const onTypingCompleteRef = useRef(onTypingComplete);
  onTypingCompleteRef.current = onTypingComplete;

  const allParagraphs = LOVE_LETTER.paragraphs;

  useEffect(() => {
    if (isSkipped) {
      setTypedParagraphs(allParagraphs);
      setCurrentText('');
      setIsFinished(true);
      onTypingCompleteRef.current();
      return;
    }

    if (currentParaIndex >= allParagraphs.length) {
      setIsFinished(true);
      onTypingCompleteRef.current();
      return;
    }

    const targetPara = allParagraphs[currentParaIndex];
    let charIndex = 0;
    setCurrentText('');

    const interval = setInterval(() => {
      if (charIndex < targetPara.length) {
        setCurrentText(targetPara.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(interval);
        setTypedParagraphs((prev) => [...prev, targetPara]);
        setCurrentText('');
        setCurrentParaIndex((prev) => prev + 1);
      }
    }, 22); // natural comfortable typing speed

    return () => clearInterval(interval);
  }, [currentParaIndex, isSkipped, allParagraphs]);

  const handleSkip = () => {
    setIsSkipped(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-2xl mx-auto my-4 bg-gradient-to-b from-[#fffefc] via-[#fdfbf7] to-[#fbf7ee] rounded-2xl p-4 xs:p-6 sm:p-10 shadow-2xl border border-amber-200/60 overflow-hidden text-left"
      style={{
        boxShadow:
          '0 20px 40px -15px rgba(225, 29, 87, 0.15), 0 0 25px rgba(233, 213, 255, 0.2), inset 0 0 80px rgba(254, 243, 199, 0.3)',
      }}
    >
      {/* Subtle Lined Paper Guidelines Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'repeating-linear-gradient(transparent, transparent 31px, #fbcfe8 31px, #fbcfe8 32px)',
          backgroundPosition: '0 24px',
        }}
      />

      {/* Decorative Stamp / Watermark in Corner */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex flex-col items-center p-2 rounded-lg border-2 border-dashed border-romantic-pink-300/70 bg-white/70 backdrop-blur-xs select-none pointer-events-none rotate-3">
        <Heart className="w-5 h-5 text-romantic-deepRose fill-romantic-pink-400" />
        <span className="text-[9px] uppercase tracking-widest text-romantic-pink-600 font-semibold mt-0.5">
          Love Airmail
        </span>
      </div>

      {/* Skip Animation Button */}
      {!isFinished && (
        <div className="flex justify-end mb-4">
          <button
            onClick={handleSkip}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 hover:bg-white text-xs font-medium text-slate-500 hover:text-romantic-deepRose border border-romantic-pink-200 shadow-xs transition-colors cursor-pointer"
            aria-label="Skip typing animation"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>Skip Animation</span>
          </button>
        </div>
      )}

      {/* GREETING */}
      <div className="mb-6 relative z-10">
        <h3 className="font-romantic text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <span>{LOVE_LETTER.greeting}</span>
          <Sparkles className="w-5 h-5 text-amber-400 fill-amber-300" />
        </h3>
      </div>

      {/* LETTER PARAGRAPHS */}
      <div className="space-y-4 font-romantic text-slate-700 text-base sm:text-lg leading-relaxed relative z-10">
        {/* Completed paragraphs */}
        {typedParagraphs.map((para, idx) => (
          <p key={idx} className="transition-opacity duration-300">
            {para}
          </p>
        ))}

        {/* Currently typing paragraph */}
        {!isFinished && currentText && (
          <p>
            {currentText}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.6 }}
              className="inline-block w-1.5 h-4 sm:h-5 bg-romantic-deepRose ml-0.5 rounded-xs align-middle"
            />
          </p>
        )}
      </div>

      {/* CLOSING & SIGNATURE (shown when finished or skipped) */}
      {isFinished && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 pt-6 border-t border-romantic-pink-200/50 flex flex-col items-end relative z-10"
        >
          <span className="font-romantic text-slate-600 text-base sm:text-lg">
            {LOVE_LETTER.closing}
          </span>
          <span className="font-script text-4xl sm:text-5xl text-romantic-deepRose font-bold mt-1 tracking-wide">
            {LOVE_LETTER.signature} ❤️
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};
