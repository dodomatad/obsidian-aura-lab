interface SectionDividerProps {
  variant?: 'default' | 'glow' | 'wave';
}

const SectionDivider = ({ variant = 'default' }: SectionDividerProps) => {
  return (
    <div className="relative w-full h-[80px] md:h-[120px] overflow-hidden">
      {/* Only subtle gradient transition - no lines */}
      <div 
        className="absolute inset-0"
        style={{
          background: variant === 'glow' 
            ? 'linear-gradient(180deg, transparent 0%, rgba(249, 115, 22, 0.015) 50%, transparent 100%)'
            : 'linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.008) 50%, transparent 100%)',
        }}
      />
    </div>
  );
};

export default SectionDivider;
