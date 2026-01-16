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
  
  // Generate random particles - only for desktop
  const particles = useMemo<Particle[]>(() => {
    // Return empty array if we won't render anyway
    if (isMobile || prefersReducedMotion) return [];
    
    const count = 30;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 25 + 20,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.06 + 0.02,
    }));
  }, [isMobile, prefersReducedMotion]);

  // Skip rendering on mobile for performance
  if (isMobile || prefersReducedMotion) {
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
