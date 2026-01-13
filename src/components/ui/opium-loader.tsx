import { motion, AnimatePresence } from 'framer-motion';
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
          style={{ backgroundColor: 'rgba(5, 5, 5, 0.98)' }}
        >
          {/* Backdrop blur layer */}
          <div className="absolute inset-0 backdrop-blur-md" />

          {/* Central Rower - Clean and Minimal */}
          <div className="relative flex items-center justify-center">
            {!imageError ? (
              <motion.img
                src="/rower-silhouette.png"
                alt="Carregando..."
                className="w-32 h-32 object-contain z-10"
                style={{ 
                  filter: 'invert(1) brightness(2)',
                }}
                onError={() => setImageError(true)}
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ) : (
              // Fallback text if image fails to load
              <motion.span
                className="text-2xl font-display tracking-[0.3em] text-white/90 z-10"
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                OPIUM
              </motion.span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OpiumLoader;
