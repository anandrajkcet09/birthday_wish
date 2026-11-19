import React from 'react';
import { motion } from 'framer-motion';
import { TimelineMoment } from '../types';
import { Heart, Sparkles, Smile, Infinity as InfinityIcon } from 'lucide-react';

interface MemoriesTimelineProps {
  moments: TimelineMoment[];
}

export const MemoriesTimeline: React.FC<MemoriesTimelineProps> = ({ moments }) => {
  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Sparkles className="w-4 h-4 text-amber-500 fill-amber-300" />;
      case 1:
        return <Heart className="w-4 h-4 text-romantic-pink-500 fill-romantic-pink-400" />;
      case 2:
        return <Smile className="w-4 h-4 text-purple-500" />;
      default:
        return <InfinityIcon className="w-4 h-4 text-rose-500" />;
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto py-6 px-2 sm:px-4">
      {/* Central Timeline Vertical Track */}
      <div className="absolute left-6 sm:left-1/2 top-8 bottom-8 w-0.5 bg-gradient-to-b from-romantic-pink-300 via-romantic-rose to-romantic-lavender-300 transform -translate-x-1/2 pointer-events-none" />

      <div className="space-y-8 sm:space-y-12">
        {moments.map((moment, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={moment.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                isEven ? 'sm:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline Center Node Badge */}
              <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white border-2 border-romantic-pink-300 shadow-md flex items-center justify-center z-10 transition-transform hover:scale-110">
                {getIcon(index)}
              </div>

              {/* Content Card */}
              <div
                className={`ml-14 sm:ml-0 sm:w-1/2 ${
                  isEven ? 'sm:pr-10 sm:text-right' : 'sm:pl-10 sm:text-left'
                }`}
              >
                <div className="glass-card rounded-2xl p-4 sm:p-5 shadow-md border border-white/80 hover:shadow-lg transition-all duration-300">
                  {/* Tag / Date */}
                  <div
                    className={`flex items-center gap-2 mb-1.5 ${
                      isEven ? 'sm:justify-end' : 'justify-start'
                    }`}
                  >
                    {moment.tag && (
                      <span className="px-2.5 py-0.5 rounded-full bg-romantic-pink-100/90 text-romantic-deepRose text-[11px] font-semibold tracking-wide">
                        {moment.tag}
                      </span>
                    )}
                    <span className="text-xs text-slate-400 font-medium">
                      {moment.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="font-romantic text-base sm:text-lg font-bold text-slate-800 mb-1">
                    {moment.title}
                  </h4>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                    {moment.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
