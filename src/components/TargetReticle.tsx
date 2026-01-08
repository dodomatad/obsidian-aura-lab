import { motion, AnimatePresence } from 'framer-motion';

interface Hotspot {
  id: string;
  label: string;
  description: string;
  position: { x: string; y: string };
}

interface TargetReticleProps {
  hotspot: Hotspot;
  isActive: boolean;
  onClick: () => void;
  side: 'left' | 'right';
}

const TargetReticle = ({ hotspot, isActive, onClick, side }: TargetReticleProps) => {
  const lineLength = 120;
  const lineDirection = side === 'left' ? -1 : 1;

  return (
    <motion.div
      className="absolute cursor-pointer z-30"
      style={{ left: hotspot.position.x, top: hotspot.position.y }}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Scanner Reticle Container */}
      <div className="relative w-8 h-8 md:w-10 md:h-10 -translate-x-1/2 -translate-y-1/2">
        {/* Outer rotating dashed ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            border: '1px dashed rgba(255, 255, 255, 0.4)',
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Inner static ring */}
        <motion.div
          className="absolute inset-1.5 md:inset-2 rounded-full"
          style={{
            border: '1px solid rgba(255, 255, 255, 0.6)',
          }}
          animate={{
            scale: isActive ? [1, 1.1, 1] : [1, 1.05, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Center dot */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-1.5 h-1.5 md:w-2 md:h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          animate={{
            opacity: [0.8, 1, 0.8],
            scale: isActive ? 1.3 : 1,
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Crosshairs */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        </div>
      </div>

      {/* Blueprint Line + Label (appears on active) */}
      <AnimatePresence>
        {isActive && (
          <>
            {/* Horizontal scanning line */}
            <motion.svg
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute pointer-events-none overflow-visible"
              style={{
                left: '50%',
                top: '50%',
                width: `${lineLength + 50}px`,
                height: '80px',
                transform: `translateX(${side === 'left' ? '-100%' : '0'})`,
              }}
            >
              {/* Main horizontal line */}
              <motion.line
                x1={side === 'left' ? lineLength + 50 : 0}
                y1="0"
                x2={side === 'left' ? 50 : lineLength}
                y2="0"
                stroke="rgba(255, 255, 255, 0.5)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
              {/* End tick mark */}
              <motion.line
                x1={side === 'left' ? 50 : lineLength}
                y1="-6"
                x2={side === 'left' ? 50 : lineLength}
                y2="6"
                stroke="rgba(255, 255, 255, 0.5)"
                strokeWidth="1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.3 }}
              />
            </motion.svg>

            {/* Label Card */}
            <motion.div
              initial={{ opacity: 0, x: side === 'left' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: side === 'left' ? 20 : -20 }}
              transition={{ duration: 0.3, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute top-1/2 -translate-y-1/2 ${
                side === 'left' ? 'right-full mr-[140px]' : 'left-full ml-[140px]'
              } z-40`}
            >
              <div
                className="p-4 min-w-[200px]"
                style={{
                  background: 'rgba(0, 0, 0, 0.6)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                }}
              >
                {/* Technical header line */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-white/80" />
                  <div className="h-px flex-1 bg-white/20" />
                </div>
                
                <div 
                  className="text-[10px] font-medium tracking-[0.2em] text-white/60 uppercase mb-1"
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                >
                  {hotspot.label}
                </div>
                <div 
                  className="text-xs text-white/90 leading-relaxed"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {hotspot.description}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TargetReticle;
