import { motion } from 'framer-motion';

interface StabilityMeterProps {
  level: number; // 0-100
  levelText: string;
  compact?: boolean; // For use in carousel (smaller version)
}

const StabilityMeter = ({ level, levelText, compact = false }: StabilityMeterProps) => {
  // Clamp level between 0 and 100
  const clampedLevel = Math.min(100, Math.max(0, level));
  
  if (compact) {
    // Compact version for carousel cards
    return (
      <div className="w-full max-w-[200px] mx-auto">
        {/* Level label */}
        <div className="flex justify-center mb-2">
          <span className="text-xs md:text-sm font-medium tracking-wide text-foreground/90">
            {levelText}
          </span>
        </div>
        
        {/* Compact bar */}
        <div className="relative h-1 w-full rounded-full overflow-hidden bg-background/50">
          {/* Gradient track */}
          <div 
            className="absolute inset-0 rounded-full opacity-60"
            style={{ 
              background: 'linear-gradient(90deg, #10b981 0%, #f59e0b 50%, #ef4444 100%)' 
            }}
          />
          
          {/* Glowing cursor */}
          <motion.div 
            className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full border border-background/50"
            initial={{ left: '0%' }}
            animate={{ left: `${clampedLevel}%` }}
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            style={{
              marginLeft: '-5px',
              boxShadow: '0 0 10px rgba(255,255,255,0.7), 0 0 20px rgba(255,255,255,0.3)',
            }}
          />
        </div>
        
        {/* Mini labels */}
        <div className="flex justify-between mt-1.5">
          <span className="text-[8px] uppercase tracking-widest text-emerald-500/50">Estável</span>
          <span className="text-[8px] uppercase tracking-widest text-red-500/50">Veloz</span>
        </div>
      </div>
    );
  }

  // Full version for detail pages
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-end mb-3">
        <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-foreground/40 uppercase">
          Nível de Domínio
        </span>
        <span className="text-sm md:text-base font-medium text-foreground">
          {levelText}
        </span>
      </div>
      
      {/* Gradient bar with glow */}
      <div className="relative h-2 w-full rounded-full overflow-hidden bg-muted/30">
        {/* Gradient track */}
        <div 
          className="absolute inset-0 rounded-full opacity-80"
          style={{ 
            background: 'linear-gradient(90deg, #10b981 0%, #f59e0b 50%, #ef4444 100%)' 
          }}
        />
        
        {/* Ambient glow behind cursor */}
        <motion.div 
          className="absolute top-0 h-full w-16 blur-xl opacity-40"
          initial={{ left: '-8%' }}
          animate={{ left: `calc(${clampedLevel}% - 32px)` }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          style={{
            background: clampedLevel < 35 
              ? 'radial-gradient(circle, #10b981 0%, transparent 70%)'
              : clampedLevel < 65 
                ? 'radial-gradient(circle, #f59e0b 0%, transparent 70%)'
                : 'radial-gradient(circle, #ef4444 0%, transparent 70%)',
          }}
        />
        
        {/* Glowing cursor */}
        <motion.div 
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-background"
          initial={{ left: '0%' }}
          animate={{ left: `${clampedLevel}%` }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          style={{
            marginLeft: '-8px',
            boxShadow: '0 0 15px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.4)',
          }}
        />
      </div>

      {/* Footer labels */}
      <div className="flex justify-between mt-2.5">
        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-emerald-500/60 font-medium">
          Mais Estável
        </span>
        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-red-500/60 font-medium">
          Mais Veloz
        </span>
      </div>
    </div>
  );
};

export default StabilityMeter;
