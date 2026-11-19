import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PolaroidCard } from './PolaroidCard';
import { PhotoLightbox } from './PhotoLightbox';
import { MemoriesTimeline } from './MemoriesTimeline';
import { MusicPlayer } from './MusicPlayer';
import { MEMORY_PHOTOS, TIMELINE_MOMENTS } from '../data/memoriesData';
import { Heart, Sparkles, ArrowRight, ArrowLeft, Camera, Clock } from 'lucide-react';

interface MemoriesSectionProps {
  onNavigateToLetter: () => void;
  onBackToCelebration: () => void;
}

export const MemoriesSection: React.FC<MemoriesSectionProps> = ({
  onNavigateToLetter,
  onBackToCelebration,
}) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const handleNextPhoto = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % MEMORY_PHOTOS.length);
    }
  };

  const handlePrevPhoto = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex(
        (selectedPhotoIndex - 1 + MEMORY_PHOTOS.length) % MEMORY_PHOTOS.length
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
      transition={{ duration: 0.7 }}
      className="relative z-10 w-full max-w-5xl mx-auto px-3 sm:px-6 py-6 sm:py-8 flex flex-col items-center min-h-[92vh]"
    >
      {/* Top Bar with Navigation & Music Player */}
      <div className="w-full flex items-center justify-between gap-2 mb-4 px-1">
        <button
          onClick={onBackToCelebration}
          className="px-3.5 py-1.5 rounded-full bg-white/70 hover:bg-white/95 backdrop-blur-md border border-romantic-pink-200 text-xs font-medium text-slate-700 hover:text-romantic-deepRose transition-all duration-200 flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Birthday Cake</span>
        </button>

        <MusicPlayer />
      </div>

      {/* Main Glassmorphism Container */}
      <div className="w-full glass-card rounded-3xl p-4 xs:p-6 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
        {/* Soft Ambient Radiance */}
        <div className="absolute top-0 right-10 w-64 h-64 bg-romantic-pink-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-romantic-lavender-200/40 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-xl mx-auto mb-8"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-romantic-pink-100/90 border border-romantic-pink-200 text-romantic-deepRose text-xs sm:text-sm font-medium shadow-sm mb-3">
            <Camera className="w-3.5 h-3.5 text-romantic-pink-500" />
            <span>Cherished Moments</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-300" />
          </div>

          <h2 className="font-romantic text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight mb-2 text-glow">
            Our Little Memories ❤️
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Every picture has a story, and every moment with you is special.
          </p>

          <p className="font-script text-xl sm:text-2xl text-romantic-pink-600 mt-1">
            "Kuch yaadein jo hamesha dil ke kareeb rahengi..."
          </p>
        </motion.div>

        {/* 1. POLAROID PHOTO GALLERY */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 py-4 px-2 sm:px-4">
          {MEMORY_PHOTOS.map((photo, index) => (
            <PolaroidCard
              key={photo.id}
              photo={photo}
              index={index}
              onClick={() => setSelectedPhotoIndex(index)}
            />
          ))}
        </div>

        {/* 2. MEMORIES TIMELINE DIVIDER & TITLE */}
        <div className="w-full mt-14 pt-8 border-t border-romantic-pink-200/60 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-romantic-lavender-100/90 border border-romantic-lavender-200 text-romantic-lavender-600 text-xs sm:text-sm font-medium shadow-sm mb-2">
            <Clock className="w-3.5 h-3.5 text-romantic-lavender-500" />
            <span>Our Journey</span>
          </div>

          <h3 className="font-romantic text-2xl sm:text-3xl font-bold text-slate-800 mb-1">
            How Time Flew With You ✨
          </h3>
          <p className="font-script text-lg sm:text-xl text-romantic-pink-600 mb-4">
            "Pata hi nahi chala waqt kab itna haseen ho gaya..."
          </p>

          {/* Timeline Component */}
          <MemoriesTimeline moments={TIMELINE_MOMENTS} />
        </div>

        {/* 3. NAVIGATION TO PHASE 4 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 pt-8 border-t border-romantic-pink-200/60 w-full flex flex-col items-center text-center"
        >
          <p className="text-sm sm:text-base text-slate-700 font-medium mb-3 max-w-md">
            These memories are beautiful, but I have something more to tell you...
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={onNavigateToLetter}
            className="group relative overflow-hidden px-8 py-3.5 rounded-full bg-gradient-to-r from-romantic-pink-500 via-romantic-rose to-romantic-lavender-500 hover:from-romantic-pink-600 hover:to-romantic-lavender-600 text-white font-semibold text-base sm:text-lg shadow-lg hover:shadow-romantic-pink-300/60 shadow-romantic-pink-400/40 transition-all duration-300 flex items-center gap-2.5 cursor-pointer"
            aria-label="Read My Letter"
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
            <span>Read My Letter 💌</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <p className="text-xs text-romantic-pink-500 font-script text-base mt-2 flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Written just for Sophia</span>
          </p>
        </motion.div>
      </div>

      {/* FULL-SCREEN PHOTO LIGHTBOX MODAL */}
      <PhotoLightbox
        photos={MEMORY_PHOTOS}
        selectedIndex={selectedPhotoIndex}
        onClose={() => setSelectedPhotoIndex(null)}
        onNext={handleNextPhoto}
        onPrev={handlePrevPhoto}
      />

      {/* Footer */}
      <footer className="text-center py-4 mt-3">
        <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5 font-medium">
          <span>Captured with love by</span>
          <span className="font-semibold text-romantic-deepRose font-romantic">Alex</span>
          <span>for Princess</span>
          <span className="text-romantic-pink-500">❤️</span>
        </p>
      </footer>
    </motion.div>
  );
};
