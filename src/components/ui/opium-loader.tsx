import { motion, AnimatePresence } from 'framer-motion';
import { Waves } from 'lucide-react';
import { useState } from 'react';

interface OpiumLoaderProps {
  isVisible: boolean;
}

const OpiumLoader = ({ isVisible }: OpiumLoaderProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: 'rgba(5, 5, 5, 0.95)' }}
        >
          {/* Backdrop blur layer */}
          <div className="absolute inset-0 backdrop-blur-md" />

          {/* Subtle radial gradient for depth */}
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              background: 'radial-gradient(circle at center, rgba(230, 81, 0, 0.12) 0%, transparent 50%)',
            }}
          />

          {/* Container for central image */}
          <div className="relative flex items-center justify-center">
            {/* Pulsing glow behind rower */}
            <motion.div
              className="absolute w-32 h-32 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(230, 81, 0, 0.25) 0%, transparent 70%)',
              }}
              animate={{
                scale: [1, 1.6, 1],
                opacity: [0.3, 0.15, 0.3],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Central Rower Image with Breathing Effect */}
            {!imageError ? (
              <motion.img
                src="/rower-silhouette.png"
                alt="Opium Loading..."
                className="w-28 h-28 object-contain z-10"
                style={{ filter: 'invert(1) brightness(0.85)' }}
                onError={() => setImageError(true)}
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.75, 1, 0.75],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ) : (
              <motion.div
                className="z-10"
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.75, 1, 0.75],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Waves className="w-20 h-20 text-white/80" />
              </motion.div>
            )}
          </div>

          {/* Brand text */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <p 
              className="text-xs tracking-[0.4em] uppercase"
              style={{ color: 'rgba(255, 255, 255, 0.4)' }}
            >
              Opium Hightec Line
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OpiumLoader;
