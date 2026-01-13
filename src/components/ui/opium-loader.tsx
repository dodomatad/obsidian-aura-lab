import { motion, AnimatePresence } from 'framer-motion';
import { Waves } from 'lucide-react';
import { useState } from 'react';

interface OpiumLoaderProps {
  isVisible: boolean;
}

const OpiumLoader = ({ isVisible }: OpiumLoaderProps) => {
  const [imageError, setImageError] = useState(false);

  // Ring configurations: size, color, opacity, rotation speed, direction
  const rings = [
    { size: 180, color: '#E65100', opacity: 0.3, duration: 8, reverse: false, strokeWidth: 1 },
    { size: 140, color: '#FFFFFF', opacity: 0.1, duration: 6, reverse: true, strokeWidth: 2 },
    { size: 100, color: '#E65100', opacity: 0.8, duration: 4, reverse: false, strokeWidth: 1 },
  ];

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
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(circle at center, rgba(230, 81, 0, 0.15) 0%, transparent 60%)',
            }}
          />

          {/* Container for rings and central image */}
          <div className="relative flex items-center justify-center">
            {/* Orbital Rings */}
            {rings.map((ring, index) => (
              <motion.div
                key={index}
                className="absolute rounded-full"
                style={{
                  width: ring.size,
                  height: ring.size,
                  border: `${ring.strokeWidth}px solid ${ring.color}`,
                  opacity: ring.opacity,
                }}
                animate={{
                  rotate: ring.reverse ? -360 : 360,
                }}
                transition={{
                  duration: ring.duration,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            ))}

            {/* Pulsing glow behind rower */}
            <motion.div
              className="absolute w-20 h-20 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(230, 81, 0, 0.4) 0%, transparent 70%)',
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 0.2, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Central Rower Image with Breathing Effect */}
            {!imageError ? (
              <motion.img
                src="/rower-silhouette.png"
                alt="Opium Loading..."
                className="w-24 h-24 object-contain z-10"
                style={{ filter: 'invert(1) brightness(0.9)' }}
                onError={() => setImageError(true)}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ) : (
              <motion.div
                className="z-10"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Waves className="w-16 h-16 text-white/80" />
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
