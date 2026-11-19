import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MemoryPhoto } from '../types';
import { Heart, Sparkles, Image as ImageIcon } from 'lucide-react';

interface PolaroidCardProps {
  photo: MemoryPhoto;
  index: number;
  onClick: () => void;
}

export const PolaroidCard: React.FC<PolaroidCardProps> = ({ photo, index, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: 0 }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotate: photo.rotation,
      }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        scale: 1.05,
        rotate: 0,
        zIndex: 20,
        boxShadow: '0 25px 35px -10px rgba(244, 63, 113, 0.25), 0 0 20px rgba(192, 132, 252, 0.2)',
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative group bg-white/95 rounded-sm p-3 pb-5 shadow-md border border-romantic-pink-100/80 cursor-pointer transition-shadow duration-300 select-none flex flex-col focus:outline-none focus:ring-2 focus:ring-romantic-pink-400 focus:ring-offset-2"
      style={{
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View photo: ${photo.caption}`}
    >
      {/* Decorative Washi Tape on top */}
      <div
        className={`absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 ${photo.tapeStyle || 'bg-rose-200/80'} backdrop-blur-xs shadow-xs border-y border-white/50 z-10 pointer-events-none opacity-85 group-hover:opacity-100 transition-opacity`}
        style={{
          clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)',
        }}
      />

      {/* Photo Frame Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-romantic-pink-50 rounded-xs border border-romantic-pink-100/50">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-romantic-pink-100 to-romantic-lavender-100 animate-pulse">
            <Sparkles className="w-5 h-5 text-romantic-pink-400" />
          </div>
        )}

        {imageError ? (
          /* Graceful offline romantic illustration */
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-romantic-pink-200 via-romantic-rose/30 to-romantic-lavender-200 text-romantic-deepRose p-4 text-center">
            <ImageIcon className="w-8 h-8 mb-2 opacity-80" />
            <span className="text-xs font-script font-semibold">{photo.caption}</span>
            <span className="text-[10px] text-slate-500 mt-1">Sophia & Alex ❤️</span>
          </div>
        ) : (
          <img
            src={photo.imageUrl}
            alt={photo.caption}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Floating Heart Sticker badge on hover */}
        <div className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-md text-romantic-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm">
          <Heart className="w-3.5 h-3.5 fill-current" />
        </div>
      </div>

      {/* Polaroid Handwritten Caption */}
      <div className="mt-3.5 px-1 flex flex-col items-center text-center">
        <p className="font-script text-lg sm:text-xl text-slate-800 leading-tight group-hover:text-romantic-deepRose transition-colors">
          {photo.caption}
        </p>
        {photo.date && (
          <span className="text-[11px] font-sans font-medium text-slate-400 mt-0.5 tracking-wider uppercase">
            {photo.date}
          </span>
        )}
      </div>
    </motion.div>
  );
};
