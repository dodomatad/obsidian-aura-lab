import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransition } from '@/context/TransitionContext';

const DiveTransition = () => {
  const navigate = useNavigate();
  const { isTransitioning, transitionData, endTransition } = useTransition();
  const [phase, setPhase] = useState<'idle' | 'expanding' | 'navigating' | 'settling'>('idle');
  const hasNavigated = useRef(false);

  // Calculate target position (where the image will be in the detail page)
  const getTargetRect = () => {
    // Target: left half of screen, centered vertically
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // On desktop, image takes left 50% and is centered
    const isDesktop = viewportWidth >= 1024;
    const targetWidth = isDesktop ? viewportWidth * 0.35 : viewportWidth * 0.8;
    const targetHeight = targetWidth * 0.3; // Approximate boat aspect ratio
    
    const targetX = isDesktop 
      ? (viewportWidth * 0.25) - (targetWidth / 2) // Center of left half
      : (viewportWidth - targetWidth) / 2; // Center on mobile
    
    const targetY = (viewportHeight - targetHeight) / 2;
    
    return { x: targetX, y: targetY, width: targetWidth, height: targetHeight };
  };

  useEffect(() => {
    if (isTransitioning && transitionData && phase === 'idle') {
      hasNavigated.current = false;
      setPhase('expanding');
    }
  }, [isTransitioning, transitionData, phase]);

  useEffect(() => {
    if (phase === 'expanding') {
      // Wait for expand animation, then navigate
      const timer = setTimeout(() => {
        setPhase('navigating');
      }, 600);
      return () => clearTimeout(timer);
    }
    
    if (phase === 'navigating' && transitionData && !hasNavigated.current) {
      hasNavigated.current = true;
      navigate(`/modelo/${transitionData.productId}`);
      
      // Short delay to let the page mount, then settle
      setTimeout(() => {
        setPhase('settling');
      }, 50);
    }
    
    if (phase === 'settling') {
      // Fade out the transition layer
      const timer = setTimeout(() => {
        endTransition();
        setPhase('idle');
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [phase, transitionData, navigate, endTransition]);

  // Reset when transition ends externally
  useEffect(() => {
    if (!isTransitioning && phase !== 'idle') {
      setPhase('idle');
    }
  }, [isTransitioning, phase]);

  if (!isTransitioning || !transitionData || !transitionData.imageRect) {
    return null;
  }

  const sourceRect = transitionData.imageRect;
  const targetRect = getTargetRect();

  // Calculate the transform from source to target
  const scaleX = targetRect.width / sourceRect.width;
  const scaleY = targetRect.height / sourceRect.height;
  const scale = Math.min(scaleX, scaleY);
  
  const translateX = targetRect.x - sourceRect.left + (targetRect.width - sourceRect.width * scale) / 2;
  const translateY = targetRect.y - sourceRect.top + (targetRect.height - sourceRect.height * scale) / 2;

  const isExpanded = phase === 'expanding' || phase === 'navigating' || phase === 'settling';
  const isFadingOut = phase === 'settling';

  return (
    <AnimatePresence>
      {isTransitioning && (
        <>
          {/* Background fade - covers the home page */}
          <motion.div
            className="fixed inset-0 z-[98] bg-background"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: isExpanded ? 1 : 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          />

          {/* The boat image that animates from source to target */}
          <motion.div
            className="fixed z-[100] pointer-events-none"
            style={{
              left: 0,
              top: 0,
              width: sourceRect.width,
              height: sourceRect.height,
            }}
            initial={{
              x: sourceRect.left,
              y: sourceRect.top,
              scale: 1,
              opacity: 1,
            }}
            animate={{
              x: isExpanded ? sourceRect.left + translateX : sourceRect.left,
              y: isExpanded ? sourceRect.top + translateY : sourceRect.top,
              scale: isExpanded ? scale : 1,
              opacity: isFadingOut ? 0 : 1,
            }}
            transition={{
              duration: 0.6,
              ease: [0.32, 0.72, 0, 1], // Custom easing for smooth motion
            }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: isExpanded ? 0.3 : 0 }}
              transition={{ duration: 0.3 }}
              style={{
                background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.2) 0%, transparent 70%)',
                filter: 'blur(40px)',
                transform: 'scale(1.5)',
              }}
            />
            
            <motion.img
              src={transitionData.imageUrl}
              alt={transitionData.productName}
              className="w-full h-full object-contain"
              style={{
                filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.4))',
              }}
            />
          </motion.div>

          {/* Subtle ripple from click origin */}
          <motion.div
            className="fixed z-[97] pointer-events-none"
            style={{
              left: sourceRect.left + sourceRect.width / 2,
              top: sourceRect.top + sourceRect.height / 2,
            }}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ 
              scale: isExpanded ? 15 : 0, 
              opacity: 0,
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div 
              className="w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
              }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DiveTransition;
