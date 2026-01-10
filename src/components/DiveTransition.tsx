import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransition } from '@/context/TransitionContext';

const DiveTransition = () => {
  const navigate = useNavigate();
  const { isTransitioning, transitionData, endTransition } = useTransition();

  useEffect(() => {
    if (isTransitioning && transitionData) {
      // Navigate after the zoom animation completes
      const timer = setTimeout(() => {
        navigate(`/modelo/${transitionData.productId}`);
        // End transition after navigation
        setTimeout(endTransition, 100);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isTransitioning, transitionData, navigate, endTransition]);

  return (
    <AnimatePresence>
      {isTransitioning && transitionData && (
        <>
          {/* Black overlay that fades in */}
          <motion.div
            className="fixed inset-0 z-[100] bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Boat image that zooms in */}
          <motion.div
            className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <motion.img
              src={transitionData.imageUrl}
              alt={transitionData.productName}
              className="w-[60%] max-w-3xl object-contain"
              initial={{ scale: 1, y: 0 }}
              animate={{ 
                scale: 2.5, 
                y: -50,
              }}
              transition={{ 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                filter: 'drop-shadow(0 0 100px rgba(255,255,255,0.1))',
              }}
            />
          </motion.div>

          {/* Ripple effect */}
          <motion.div
            className="fixed inset-0 z-[99] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 0.8 }}
          >
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vh] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 50%)',
              }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DiveTransition;
