import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTransition } from '@/context/TransitionContext';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const { hasSeenIntro, setHasSeenIntro } = useTransition();
  const [isLoading, setIsLoading] = useState(!hasSeenIntro);

  useEffect(() => {
    // If already seen intro, skip immediately
    if (hasSeenIntro) {
      onLoadingComplete();
      return;
    }

    // Simulate loading time for cinematic effect - optimized for mobile
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, [hasSeenIntro, onLoadingComplete]);

  useEffect(() => {
    if (!isLoading && !hasSeenIntro) {
      const exitTimer = setTimeout(() => {
        setHasSeenIntro(true);
        onLoadingComplete();
      }, 600);
      return () => clearTimeout(exitTimer);
    }
  }, [isLoading, hasSeenIntro, setHasSeenIntro, onLoadingComplete]);

  // If already seen intro, don't render anything
  if (hasSeenIntro) {
    return null;
  }

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{
            background: 'hsl(220 50% 3%)',
          }}
        >
          {/* Atmospheric background */}
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              background: `
                radial-gradient(ellipse 80% 60% at 50% 50%, hsl(220 60% 10% / 0.8) 0%, transparent 60%),
                radial-gradient(ellipse 60% 40% at 30% 70%, hsl(220 50% 8% / 0.5) 0%, transparent 50%)
              `,
            }}
          />

          {/* Logo container */}
          <div className="relative flex flex-col items-center">
            {/* Reveal mask animation */}
            <div className="overflow-hidden px-4">
              <motion.h1
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 1.2, 
                  delay: 0.3,
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="font-display font-bold text-foreground tracking-tighter text-center whitespace-nowrap"
                style={{
                  fontSize: 'clamp(2.5rem, 12vw, 8rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                OPIUM
              </motion.h1>
            </div>



            {/* Loading indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="mt-8 flex items-center gap-3"
            >
              <motion.div
                animate={{ 
                  scaleX: [0, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ 
                  scaleX: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
                  opacity: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="h-px w-16 bg-electric origin-left"
              />
            </motion.div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
