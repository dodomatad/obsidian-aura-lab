import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useMemo, useEffect, useRef } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse position for parallax spotlights
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  // Smooth spring physics for organic movement
  const smoothX = useSpring(mouseX, { stiffness: 15, damping: 30, mass: 1 });
  const smoothY = useSpring(mouseY, { stiffness: 15, damping: 30, mass: 1 });
  
  // Transform mouse position to spotlight offset (subtle movement)
  const spotlight1X = useTransform(smoothX, [0, 1], ['-10%', '10%']);
  const spotlight1Y = useTransform(smoothY, [0, 1], ['-8%', '8%']);
  const spotlight2X = useTransform(smoothX, [0, 1], ['8%', '-8%']);
  const spotlight2Y = useTransform(smoothY, [0, 1], ['6%', '-6%']);
  
  // Track mouse movement
  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      mouseX.set(x);
      mouseY.set(y);
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, prefersReducedMotion, mouseX, mouseY]);
  
  // Generate random particles - only for desktop
  const particles = useMemo<Particle[]>(() => {
    if (isMobile || prefersReducedMotion) return [];
    
    const count = 25;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 25 + 20,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.05 + 0.02,
    }));
  }, [isMobile, prefersReducedMotion]);

  // Skip rendering on mobile for performance
  if (isMobile || prefersReducedMotion) {
    return null;
  }

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Mouse-following Spotlight 1 - Deep Blue Cyan (follows mouse slowly) */}
      <motion.div
        className="absolute w-[70vw] h-[60vh] top-0 left-0"
        style={{
          x: spotlight1X,
          y: spotlight1Y,
          background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.15) 0%, rgba(20, 50, 80, 0.08) 35%, transparent 60%)',
          filter: 'blur(100px)',
        }}
      />
      
      {/* Mouse-following Spotlight 2 - Opium Orange (inverse movement) */}
      <motion.div
        className="absolute w-[60vw] h-[50vh] bottom-0 right-0"
        style={{
          x: spotlight2X,
          y: spotlight2Y,
          background: 'radial-gradient(ellipse at center, rgba(249, 115, 22, 0.1) 0%, rgba(80, 40, 20, 0.06) 40%, transparent 55%)',
          filter: 'blur(120px)',
        }}
      />
      
      {/* Ambient Spotlight 3 - Subtle breathing cyan at bottom */}
      <motion.div
        className="absolute w-[90vw] h-[35vh] -bottom-10 left-1/2 -translate-x-1/2"
        animate={{
          opacity: [0.06, 0.12, 0.06],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.08) 0%, transparent 50%)',
          filter: 'blur(100px)',
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
