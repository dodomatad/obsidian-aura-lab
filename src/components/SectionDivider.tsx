import { motion } from 'framer-motion';

interface SectionDividerProps {
  variant?: 'default' | 'glow' | 'wave';
}

const SectionDivider = ({ variant = 'default' }: SectionDividerProps) => {
  return (
    <div className="relative w-full h-[120px] md:h-[200px] overflow-hidden">
      {/* Gradient transition */}
      <div 
        className="absolute inset-0"
        style={{
          background: variant === 'glow' 
            ? 'linear-gradient(180deg, transparent 0%, rgba(249, 115, 22, 0.03) 50%, transparent 100%)'
            : 'linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.02) 50%, transparent 100%)',
        }}
      />
      
      {/* Decorative center line */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[60%]"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
        }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Subtle horizontal accent */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 md:w-24 h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.08) 50%, transparent 100%)',
        }}
      />
    </div>
  );
};

export default SectionDivider;
