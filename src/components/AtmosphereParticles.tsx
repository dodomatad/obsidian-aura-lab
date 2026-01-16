import { motion, useReducedMotion } from 'framer-motion';
import { useMemo, useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const AtmosphereParticles = () => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);
  
  // Pause particles when tab is not visible (saves battery)
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === 'visible');
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Skip particles entirely if user prefers reduced motion
  if (prefersReducedMotion) {
    return null;
  }
  
  // Generate random particles - fewer on mobile for performance
  const particles = useMemo<Particle[]>(() => {
    const count = isMobile ? 10 : 30; // Reduced from 15/40
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 25 + 20, // Slower = less CPU
      delay: Math.random() * 10,
      opacity: Math.random() * 0.06 + 0.02, // Slightly more subtle
    }));
  }, [isMobile]);

  // Don't animate when tab is hidden
  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-cyan-300"
          style={{
            left: `${particle.x}%`,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            filter: 'blur(1px)',
            willChange: 'transform', // GPU acceleration hint
          }}
          initial={{ 
            bottom: '-5%',
            x: 0,
          }}
          animate={{ 
            bottom: '105%',
            x: [0, 15, -10, 5, 0], // Reduced movement range
          }}
          transition={{
            bottom: {
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'linear',
            },
            x: {
              duration: particle.duration / 2,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            },
          }}
        />
      ))}
    </div>
  );
};

export default AtmosphereParticles;
