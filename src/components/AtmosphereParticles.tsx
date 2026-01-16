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
      {/* Animated Spotlight 1 - Top left, slow drift */}
      <motion.div
        className="absolute w-[80vw] h-[60vh] -top-20 -left-40"
        animate={{
          x: [0, 100, 50, 0],
          y: [0, 50, 30, 0],
          opacity: [0.15, 0.25, 0.2, 0.15],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.12) 0%, rgba(30, 60, 90, 0.08) 30%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />
      
      {/* Animated Spotlight 2 - Center right, orange tint */}
      <motion.div
        className="absolute w-[70vw] h-[50vh] top-1/3 -right-20"
        animate={{
          x: [0, -80, -40, 0],
          y: [0, 60, 20, 0],
          opacity: [0.1, 0.18, 0.12, 0.1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5,
        }}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(249, 115, 22, 0.08) 0%, rgba(60, 40, 30, 0.05) 40%, transparent 60%)',
          filter: 'blur(100px)',
        }}
      />
      
      {/* Animated Spotlight 3 - Bottom center, subtle cyan */}
      <motion.div
        className="absolute w-[90vw] h-[40vh] -bottom-20 left-1/2 -translate-x-1/2"
        animate={{
          y: [0, -40, -20, 0],
          opacity: [0.08, 0.15, 0.1, 0.08],
          scale: [1, 1.1, 1.05, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 8,
        }}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.06) 0%, transparent 50%)',
          filter: 'blur(120px)',
        }}
      />
      
      {/* Floating particles */}
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
            willChange: 'transform',
          }}
          initial={{ 
            bottom: '-5%',
            x: 0,
          }}
          animate={{ 
            bottom: '105%',
            x: [0, 15, -10, 5, 0],
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
