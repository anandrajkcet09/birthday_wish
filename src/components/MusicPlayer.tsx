import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { soundController } from '../utils/audio';

export const MusicPlayer: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const unsubMusic = soundController.subscribeMusicState((playing) => {
      setIsPlaying(playing);
    });
    const unsubMute = soundController.subscribeMuteState((muted) => {
      setIsMuted(muted);
    });
    return () => {
      unsubMusic();
      unsubMute();
    };
  }, []);

  const handleTogglePlay = () => {
    soundController.toggleMusic();
  };

  const handleToggleMute = () => {
    soundController.toggleMute();
  };

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-romantic-pink-200/80 shadow-sm text-xs font-medium text-slate-700 transition-all hover:bg-white/90 ${className}`}
    >
      {/* Icon with spin/pulse when playing */}
      <motion.div
        animate={isPlaying ? { rotate: [0, 360] } : { rotate: 0 }}
        transition={isPlaying ? { repeat: Infinity, duration: 6, ease: 'linear' } : {}}
        className="w-5 h-5 rounded-full bg-romantic-pink-100 flex items-center justify-center text-romantic-deepRose"
      >
        <Music className="w-3 h-3" />
      </motion.div>

      {/* Track info & mini equalizer */}
      <div className="flex items-center gap-1.5">
        <span className="font-sans font-medium text-slate-600 hidden xs:inline">Melody</span>
        {isPlaying && (
          <div className="flex items-end gap-0.5 h-3 px-0.5">
            <motion.span
              animate={{ height: ['3px', '12px', '4px'] }}
              transition={{ repeat: Infinity, duration: 0.6, ease: 'easeInOut' }}
              className="w-0.5 bg-romantic-pink-500 rounded-full"
            />
            <motion.span
              animate={{ height: ['8px', '4px', '12px'] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
              className="w-0.5 bg-romantic-rose rounded-full"
            />
            <motion.span
              animate={{ height: ['4px', '10px', '2px'] }}
              transition={{ repeat: Infinity, duration: 0.5, ease: 'easeInOut' }}
              className="w-0.5 bg-romantic-lavender-500 rounded-full"
            />
          </div>
        )}
      </div>

      {/* Play / Pause button */}
      <button
        onClick={handleTogglePlay}
        className="min-w-[32px] min-h-[32px] flex items-center justify-center rounded-full bg-romantic-pink-50 hover:bg-romantic-pink-100 text-romantic-deepRose transition-colors cursor-pointer"
        aria-label={isPlaying ? 'Pause romantic background music' : 'Play romantic background music'}
        title={isPlaying ? 'Pause Music' : 'Play Music'}
      >
        {isPlaying ? (
          <Pause className="w-3.5 h-3.5 fill-current" />
        ) : (
          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
        )}
      </button>

      {/* Visible Mute / Unmute Control */}
      <button
        onClick={handleToggleMute}
        className="min-w-[32px] min-h-[32px] flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-romantic-deepRose transition-colors cursor-pointer border-l border-slate-200 pl-1.5 ml-0.5"
        aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          <VolumeX className="w-3.5 h-3.5 text-slate-400" />
        ) : (
          <Volume2 className="w-3.5 h-3.5 text-romantic-deepRose" />
        )}
      </button>
    </div>
  );
};
