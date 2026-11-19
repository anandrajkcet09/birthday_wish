import React, { useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MemoryPhoto } from '../types';
import { X, ChevronLeft, ChevronRight, Heart, Sparkles } from 'lucide-react';

interface PhotoLightboxProps {
  photos: MemoryPhoto[];
  selectedIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photos,
  selectedIndex,
  onClose,
  onNext,
  onPrev,
}) => {
  const isOpen = selectedIndex !== null;
  const currentPhoto = isOpen ? photos[selectedIndex] : null;
  const touchStartXRef = useRef<number>(0);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    },
    [isOpen, onClose, onNext, onPrev]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, handleKeyDown]);

  // Touch Swipe navigation for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.changedTouches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        onNext();
      } else {
        onPrev();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && currentPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/85 backdrop-blur-md"
          onClick={onClose}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Control Bar */}
          <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between text-white z-20 pointer-events-none">
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs sm:text-sm font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>
                Memory {selectedIndex + 1} of {photos.length}
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 transition-all pointer-events-auto cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Left Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-1.5 sm:left-6 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md border border-white/20 transition-all z-20 cursor-pointer shadow-lg"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-1.5 sm:right-6 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md border border-white/20 transition-all z-20 cursor-pointer shadow-lg"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Main Content Container */}
          <motion.div
            key={currentPhoto.id}
            initial={{ scale: 0.9, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full bg-white rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col items-center overflow-hidden border border-romantic-pink-200"
          >
            {/* Enlarged Photo */}
            <div className="relative w-full max-h-[62vh] aspect-4/3 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center shadow-inner">
              <img
                src={currentPhoto.imageUrl}
                alt={currentPhoto.caption}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Caption & Date details */}
            <div className="mt-4 w-full flex flex-col items-center text-center">
              <div className="flex items-center gap-1.5 text-romantic-deepRose mb-1">
                <Heart className="w-4 h-4 fill-romantic-pink-400 text-romantic-pink-400" />
                <h3 className="font-script text-2xl sm:text-3xl font-bold">
                  {currentPhoto.caption}
                </h3>
                <Heart className="w-4 h-4 fill-romantic-pink-400 text-romantic-pink-400" />
              </div>

              {currentPhoto.date && (
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  {currentPhoto.date} • Sophia & Alex
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
