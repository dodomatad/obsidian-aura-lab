import { motion } from 'framer-motion';
import { useState } from 'react';
import boatPono from '@/assets/boat-pono.png';
import boatSurfski from '@/assets/boat-surfski.png';

const ExperienceSelector = () => {
  const [mousePosition, setMousePosition] = useState<'left' | 'right' | 'center'>('center');

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width;
    
    if (relativeX < 0.45) {
      setMousePosition('left');
    } else if (relativeX > 0.55) {
      setMousePosition('right');
    } else {
      setMousePosition('center');
    }
  };

  const handleMouseLeave = () => {
    setMousePosition('center');
  };

  return (
    <section className="relative h-screen overflow-hidden">
      <div 
        className="flex h-full w-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Left Panel - Contemplação */}
        <motion.div 
          className="relative h-full flex items-center justify-center overflow-hidden"
          animate={{
            width: mousePosition === 'left' ? '65%' : mousePosition === 'right' ? '35%' : '50%',
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: mousePosition === 'left' 
              ? 'hsl(0 0% 5%)' 
              : mousePosition === 'right' 
                ? 'hsl(0 0% 2%)' 
                : 'hsl(0 0% 3%)',
          }}
        >
          {/* HUD Specs - Top Left */}
          <motion.div
            animate={{ 
              opacity: mousePosition === 'left' ? 1 : 0.3,
            }}
            transition={{ duration: 0.5 }}
            className="absolute top-8 left-8 z-20"
          >
            <div className="font-mono text-xs text-muted-foreground space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-foreground/50 rounded-full" />
                <span>ESTABILIDADE</span>
                <span className="text-foreground ml-2">████████░░</span>
                <span>92%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-foreground/30 rounded-full" />
                <span>VELOCIDADE</span>
                <span className="text-foreground/50 ml-4">████░░░░░░</span>
                <span>45%</span>
              </div>
            </div>
          </motion.div>

          {/* HUD Specs - Bottom Left */}
          <motion.div
            animate={{ 
              opacity: mousePosition === 'left' ? 1 : 0.3,
            }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-8 left-8 z-20"
          >
            <div className="font-mono text-xs text-muted-foreground">
              <div>MODELO: PONO</div>
              <div>BOCA: 65cm</div>
              <div>PESO: 18kg</div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            animate={{ 
              opacity: mousePosition === 'left' ? 1 : mousePosition === 'center' ? 0.6 : 0.15,
              scale: mousePosition === 'left' ? 1.05 : 1,
            }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          >
            <h2 
              className="font-display font-bold text-foreground tracking-tighter text-center"
              style={{
                fontSize: 'clamp(2rem, 8vw, 7rem)',
                lineHeight: 0.85,
              }}
            >
              CONTEMPLAÇÃO
            </h2>
          </motion.div>

          {/* Boat Image */}
          <motion.div
            animate={{ 
              opacity: mousePosition === 'left' ? 1 : mousePosition === 'center' ? 0.7 : 0.2,
              scale: mousePosition === 'left' ? 1.1 : 1,
              y: mousePosition === 'left' ? -10 : 0,
            }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-20 w-[80%] max-w-2xl pointer-events-none"
          >
            <img 
              src={boatPono} 
              alt="Pono - Estabilidade"
              className="w-full h-auto"
              style={{
                filter: mousePosition === 'left' 
                  ? 'drop-shadow(0 30px 60px rgba(0,0,0,0.8)) brightness(1.1)' 
                  : 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))',
              }}
            />
          </motion.div>

          {/* Subtle Label */}
          <motion.div
            animate={{ opacity: mousePosition === 'left' ? 1 : 0.4 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-8 right-8 z-20 text-right"
          >
            <span className="text-xs tracking-widest text-muted-foreground uppercase">
              Para Iniciantes
            </span>
          </motion.div>
        </motion.div>

        {/* Center Divider Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-foreground/10 z-30 pointer-events-none" 
          style={{ transform: 'translateX(-50%)' }}
        />

        {/* Right Panel - Adrenalina */}
        <motion.div 
          className="relative h-full flex items-center justify-center overflow-hidden"
          animate={{
            width: mousePosition === 'right' ? '65%' : mousePosition === 'left' ? '35%' : '50%',
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: mousePosition === 'right' 
              ? 'linear-gradient(135deg, hsl(220 100% 8%) 0%, hsl(0 0% 3%) 100%)' 
              : mousePosition === 'left' 
                ? 'hsl(0 0% 2%)' 
                : 'hsl(0 0% 3%)',
          }}
        >
          {/* Electric Glow */}
          <motion.div
            animate={{ 
              opacity: mousePosition === 'right' ? 0.3 : 0,
            }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, hsl(220 100% 60% / 0.2) 0%, transparent 60%)',
            }}
          />

          {/* HUD Specs - Top Right */}
          <motion.div
            animate={{ 
              opacity: mousePosition === 'right' ? 1 : 0.3,
            }}
            transition={{ duration: 0.5 }}
            className="absolute top-8 right-8 z-20 text-right"
          >
            <div className="font-mono text-xs text-muted-foreground space-y-1">
              <div className="flex items-center justify-end gap-2">
                <span>98%</span>
                <span className="text-electric ml-2">██████████</span>
                <span>VELOCIDADE</span>
                <span className="w-2 h-2 bg-electric rounded-full" />
              </div>
              <div className="flex items-center justify-end gap-2">
                <span>35%</span>
                <span className="text-foreground/40 ml-2">███░░░░░░░</span>
                <span>ESTABILIDADE</span>
                <span className="w-2 h-2 bg-foreground/30 rounded-full" />
              </div>
            </div>
          </motion.div>

          {/* HUD Specs - Bottom Right */}
          <motion.div
            animate={{ 
              opacity: mousePosition === 'right' ? 1 : 0.3,
            }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-8 right-8 z-20 text-right"
          >
            <div className="font-mono text-xs text-muted-foreground">
              <div>MODELO: INFINITE</div>
              <div>BOCA: 42cm</div>
              <div>PESO: 11kg</div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            animate={{ 
              opacity: mousePosition === 'right' ? 1 : mousePosition === 'center' ? 0.6 : 0.15,
              scale: mousePosition === 'right' ? 1.05 : 1,
            }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          >
            <h2 
              className="font-display font-bold tracking-tighter text-center"
              style={{
                fontSize: 'clamp(2rem, 8vw, 7rem)',
                lineHeight: 0.85,
                color: mousePosition === 'right' ? 'hsl(220 100% 70%)' : 'hsl(0 0% 100%)',
                textShadow: mousePosition === 'right' 
                  ? '0 0 60px hsl(220 100% 60% / 0.5), 0 0 120px hsl(220 100% 60% / 0.3)' 
                  : 'none',
                transition: 'color 0.7s ease, text-shadow 0.7s ease',
              }}
            >
              ADRENALINA
            </h2>
          </motion.div>

          {/* Boat Image */}
          <motion.div
            animate={{ 
              opacity: mousePosition === 'right' ? 1 : mousePosition === 'center' ? 0.7 : 0.2,
              scale: mousePosition === 'right' ? 1.1 : 1,
              y: mousePosition === 'right' ? -10 : 0,
            }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-20 w-[90%] max-w-3xl pointer-events-none"
          >
            <img 
              src={boatSurfski} 
              alt="Infinite - Velocidade"
              className="w-full h-auto"
              style={{
                filter: mousePosition === 'right' 
                  ? 'drop-shadow(0 30px 60px rgba(50, 100, 200, 0.4)) brightness(1.15)' 
                  : 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))',
              }}
            />
          </motion.div>

          {/* Subtle Label */}
          <motion.div
            animate={{ opacity: mousePosition === 'right' ? 1 : 0.4 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-8 left-8 z-20"
          >
            <span className="text-xs tracking-widest text-muted-foreground uppercase">
              Para Experientes
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Fixed Center Indicator */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none">
        <motion.div
          animate={{
            opacity: mousePosition === 'center' ? 1 : 0,
            scale: mousePosition === 'center' ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-4">
            <motion.span
              animate={{ x: [-5, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
              className="text-muted-foreground text-xs"
            >
              ←
            </motion.span>
            <span className="text-xs text-muted-foreground uppercase tracking-widest">
              Mova o mouse
            </span>
            <motion.span
              animate={{ x: [0, 5] }}
              transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
              className="text-muted-foreground text-xs"
            >
              →
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSelector;
