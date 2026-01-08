import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const AtmosphereParticles = () => {
  // Generate random particles
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.08 + 0.02,
    }));
  }, []);

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
          }}
          initial={{ 
            bottom: '-5%',
            x: 0,
          }}
          animate={{ 
            bottom: '105%',
            x: [0, 20, -15, 10, 0],
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
