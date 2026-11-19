import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FloatingParticles } from './components/FloatingParticles';
import { LandingPage } from './components/LandingPage';
import { CelebrationScreen } from './components/CelebrationScreen';
import { MemoriesSection } from './components/MemoriesSection';
import { LoveLetterSection } from './components/LoveLetterSection';
import { ReasonsSection } from './components/ReasonsSection';
import { FinalSurpriseSection } from './components/FinalSurpriseSection';
import type { Screen } from './types';

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [replayKey, setReplayKey] = useState<number>(0);

  const handleReplay = () => {
    setReplayKey((k) => k + 1);
    setCurrentScreen('landing');
  };

  return (
    <div
      key={replayKey}
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-romantic-cream-100 via-romantic-pink-50 to-romantic-lavender-100"
    >
      {/* Ambient Gradient Blobs for Depth and Luxury (Rendered for non-final screens) */}
      {currentScreen !== 'final' && (
        <>
          <div className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] max-w-[650px] max-h-[650px] rounded-full bg-gradient-to-br from-romantic-pink-200/55 to-romantic-rose/30 blur-3xl pointer-events-none transform -rotate-12" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-tl from-romantic-lavender-200/60 to-romantic-pink-300/35 blur-3xl pointer-events-none" />
          <div className="absolute top-[35%] right-[10%] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] rounded-full bg-romantic-cream-300/40 blur-3xl pointer-events-none" />
        </>
      )}

      {/* Floating Animated Hearts, Stars & Flower Petals */}
      <FloatingParticles />

      {/* Main Content Area with Smooth Screen Transitions */}
      <main className="relative z-10 w-full min-h-screen flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
        <AnimatePresence mode="wait">
          {currentScreen === 'landing' && (
            <motion.div
              key="landing"
              className="w-full flex justify-center"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <LandingPage onOpenSurprise={() => setCurrentScreen('celebration')} />
            </motion.div>
          )}

          {currentScreen === 'celebration' && (
            <motion.div
              key="celebration"
              className="w-full flex justify-center"
              initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <CelebrationScreen
                onNavigateToMemories={() => setCurrentScreen('memories')}
                onBackToLanding={() => setCurrentScreen('landing')}
              />
            </motion.div>
          )}

          {currentScreen === 'memories' && (
            <motion.div
              key="memories"
              className="w-full flex justify-center"
              initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <MemoriesSection
                onNavigateToLetter={() => setCurrentScreen('letter')}
                onBackToCelebration={() => setCurrentScreen('celebration')}
              />
            </motion.div>
          )}

          {currentScreen === 'letter' && (
            <motion.div
              key="letter"
              className="w-full flex justify-center"
              initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <LoveLetterSection
                onNavigateToReasons={() => setCurrentScreen('reasons')}
                onBackToMemories={() => setCurrentScreen('memories')}
              />
            </motion.div>
          )}

          {currentScreen === 'reasons' && (
            <motion.div
              key="reasons"
              className="w-full flex justify-center"
              initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <ReasonsSection
                onNavigateToFinalSurprise={() => setCurrentScreen('final')}
                onBackToLetter={() => setCurrentScreen('letter')}
              />
            </motion.div>
          )}

          {currentScreen === 'final' && (
            <motion.div
              key="final"
              className="w-full flex justify-center"
              initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <FinalSurpriseSection
                onReplay={handleReplay}
                onBackToReasons={() => setCurrentScreen('reasons')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
