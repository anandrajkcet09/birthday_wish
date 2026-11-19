import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface Particle {
  id: number;
  type: 'heart' | 'star' | 'petal';
  x: number; // percentage across screen 0-100
  size: number;
  duration: number;
  delay: number;
  swayAmount: number;
  opacity: number;
}

export const FloatingParticles: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Generate lightweight deterministic particles (fewer on mobile for 60fps)
  const particles: Particle[] = useMemo(() => {
    const list: Particle[] = [];
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const count = isMobile ? 14 : 24;
    const types: ('heart' | 'star' | 'petal')[] = ['heart', 'petal', 'star', 'heart', 'petal'];

    for (let i = 0; i < count; i++) {
      list.push({
        id: i,
        type: types[i % types.length],
        x: (i * 4.2 + 6) % 92, // evenly distributed across screen width
        size: 14 + ((i * 7) % 14), // 14px to 28px
        duration: 11 + ((i * 3) % 8), // 11s to 18s slow graceful float
        delay: (i * 0.8) % 7, // staggered starts
        swayAmount: 12 + ((i * 4) % 20), // horizontal gentle wave
        opacity: 0.35 + ((i * 9) % 40) / 100, // 0.35 to 0.75
      });
    }
    return list;
  }, []);

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0" aria-hidden="true">
      {particles.map((p) => {
        return (
          <motion.div
            key={p.id}
            initial={{
              y: '105vh',
              x: `${p.x}vw`,
              opacity: 0,
              scale: 0.6,
              rotate: (p.id * 45) % 360,
            }}
            animate={{
              y: '-10vh',
              x: [
                `${p.x}vw`,
                `${Math.min(96, Math.max(4, p.x + (p.id % 2 === 0 ? p.swayAmount / 10 : -p.swayAmount / 10)))}vw`,
                `${Math.min(96, Math.max(4, p.x - (p.id % 2 === 0 ? p.swayAmount / 15 : -p.swayAmount / 15)))}vw`,
                `${p.x}vw`,
              ],
              opacity: [0, p.opacity, p.opacity * 0.85, 0],
              scale: [0.6, 1, 1.05, 0.7],
              rotate: [(p.id * 45) % 360, (p.id * 45 + 180) % 360],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
            style={{ position: 'absolute' }}
          >
            {p.type === 'heart' && (
              <svg
                width={p.size}
                height={p.size}
                viewBox="0 0 24 24"
                fill="url(#heart-grad)"
                className="filter drop-shadow-sm"
              >
                <defs>
                  <linearGradient id="heart-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f43f71" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#c084fc" stopOpacity="0.75" />
                  </linearGradient>
                </defs>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            )}

            {p.type === 'star' && (
              <svg
                width={p.size * 0.85}
                height={p.size * 0.85}
                viewBox="0 0 24 24"
                fill="#ffd166"
                className="filter drop-shadow"
                style={{ opacity: 0.85 }}
              >
                <path d="M12 2l2.6 6.8L21.5 10l-5.3 4.6 1.6 7.4-5.8-3.8-5.8 3.8 1.6-7.4L2.5 10l6.9-1.2L12 2z" />
              </svg>
            )}

            {p.type === 'petal' && (
              <svg
                width={p.size * 1.1}
                height={p.size * 1.1}
                viewBox="0 0 32 32"
                fill="url(#petal-grad)"
                className="filter drop-shadow-sm opacity-90"
              >
                <defs>
                  <linearGradient id="petal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fea3b7" />
                    <stop offset="100%" stopColor="#f3e8ff" />
                  </linearGradient>
                </defs>
                <path d="M16 2 C10 8, 4 14, 6 22 C8 28, 14 30, 16 30 C18 30, 24 28, 26 22 C28 14, 22 8, 16 2 Z" />
              </svg>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
