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
  const lineLength = 140;

  return (
    <motion.div
      className="absolute cursor-pointer z-30"
      style={{ left: hotspot.position.x, top: hotspot.position.y }}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Crosshair Container - Technical Targeting System */}
      <div className="relative w-6 h-6 md:w-8 md:h-8 -translate-x-1/2 -translate-y-1/2">
        {/* Rotating outer crosshair */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* Top arm */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-2 bg-gradient-to-b from-white/60 to-transparent" />
          {/* Bottom arm */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-2 bg-gradient-to-t from-white/60 to-transparent" />
          {/* Left arm */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-2 bg-gradient-to-r from-white/60 to-transparent" />
          {/* Right arm */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-px w-2 bg-gradient-to-l from-white/60 to-transparent" />
        </motion.div>
        
        {/* Static inner ring */}
        <motion.div
          className="absolute inset-1 md:inset-1.5 rounded-full"
          style={{
            border: '1px solid rgba(255, 255, 255, 0.4)',
          }}
          animate={{
            scale: isActive ? [1, 1.15, 1] : [1, 1.05, 1],
            opacity: isActive ? [0.6, 1, 0.6] : [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Center plus crosshair */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="relative w-2 h-2 md:w-3 md:h-3"
            animate={{
              rotate: isActive ? 45 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/70 -translate-y-1/2" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/70 -translate-x-1/2" />
          </motion.div>
        </div>
      </div>

      {/* CAD Blueprint Line + Label (appears on active) */}
      <AnimatePresence>
        {isActive && (
          <>
            {/* Technical connecting line - CAD style */}
            <motion.svg
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute pointer-events-none overflow-visible"
              style={{
                left: '50%',
                top: '50%',
                width: `${lineLength + 60}px`,
                height: '2px',
                transform: `translateX(${side === 'left' ? '-100%' : '0'}) translateY(-50%)`,
              }}
            >
              {/* Main line with drawing animation */}
              <motion.line
                x1={side === 'left' ? lineLength + 60 : 0}
                y1="1"
                x2={side === 'left' ? 0 : lineLength + 60}
                y2="1"
                stroke="rgba(255, 255, 255, 0.6)"
                strokeWidth="1"
                strokeDasharray="4 2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.svg>

            {/* Small tick marks at endpoint */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2, delay: 0.4 }}
              className={`absolute top-1/2 -translate-y-1/2 ${
                side === 'left' ? 'right-full mr-[160px]' : 'left-full ml-[160px]'
              }`}
            >
              <div className="w-px h-3 bg-white/50" />
            </motion.div>

            {/* Label Card - Clean technical style */}
            <motion.div
              initial={{ opacity: 0, x: side === 'left' ? 10 : -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: side === 'left' ? 10 : -10 }}
              transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute top-1/2 -translate-y-1/2 ${
                side === 'left' ? 'right-full mr-[170px]' : 'left-full ml-[170px]'
              } z-40`}
            >
              <div
                className="py-3 px-4 min-w-[180px]"
                style={{
                  background: 'rgba(0, 0, 0, 0.75)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  borderLeft: side === 'right' ? '2px solid rgba(255, 255, 255, 0.4)' : 'none',
                  borderRight: side === 'left' ? '2px solid rgba(255, 255, 255, 0.4)' : 'none',
                }}
              >
                <div 
                  className="text-[9px] font-medium tracking-[0.25em] text-white/50 uppercase mb-1"
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                >
                  {hotspot.label}
                </div>
                <div 
                  className="text-[11px] text-white/85 leading-relaxed font-light"
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
