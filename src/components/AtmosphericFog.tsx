import { motion } from 'framer-motion';

const AtmosphericFog = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {/* Layer 1 - Slow moving fog */}
      <motion.div
        className="absolute inset-0"
        animate={{
          x: ['-20%', '20%', '-20%'],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 50%, hsl(220 60% 15% / 0.4) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 60%, hsl(220 50% 12% / 0.3) 0%, transparent 45%)
          `,
        }}
      />
      
      {/* Layer 2 - Mid speed mist */}
      <motion.div
        className="absolute inset-0"
        animate={{
          x: ['30%', '-30%', '30%'],
          y: ['-5%', '5%', '-5%'],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          background: `
            radial-gradient(ellipse 100% 60% at 60% 40%, hsl(220 70% 10% / 0.35) 0%, transparent 55%),
            radial-gradient(ellipse 70% 50% at 30% 70%, hsl(210 50% 8% / 0.25) 0%, transparent 50%)
          `,
        }}
      />
      
      {/* Layer 3 - Fast particles/highlights */}
      <motion.div
        className="absolute inset-0"
        animate={{
          x: ['-40%', '40%', '-40%'],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          background: `
            radial-gradient(circle at 15% 30%, hsl(220 80% 20% / 0.2) 0%, transparent 30%),
            radial-gradient(circle at 85% 70%, hsl(200 60% 15% / 0.15) 0%, transparent 25%),
            radial-gradient(circle at 50% 50%, hsl(220 50% 10% / 0.1) 0%, transparent 40%)
          `,
        }}
      />
      
      {/* Subtle light rays from top */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.05, 0.12, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background: `
            linear-gradient(180deg, hsl(220 60% 20% / 0.15) 0%, transparent 40%)
          `,
        }}
      />
    </div>
  );
};

export default AtmosphericFog;
