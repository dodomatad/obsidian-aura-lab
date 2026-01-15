import { motion } from 'framer-motion';

const ContinuousGradientLine = () => {
  return (
    <div className="fixed left-1/2 top-0 bottom-0 -translate-x-1/2 pointer-events-none z-[1] hidden md:block">
      {/* Main continuous gradient line */}
      <motion.div
        className="w-[1px] h-full"
        style={{
          background: `linear-gradient(
            180deg,
            transparent 0%,
            rgba(6, 182, 212, 0.15) 10%,
            rgba(6, 182, 212, 0.08) 25%,
            rgba(255, 255, 255, 0.05) 40%,
            rgba(249, 115, 22, 0.1) 60%,
            rgba(249, 115, 22, 0.06) 75%,
            rgba(255, 255, 255, 0.03) 90%,
            transparent 100%
          )`,
        }}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
        style-origin="top"
      />
      
      {/* Glow effect around the line */}
      <div
        className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[60px]"
        style={{
          background: `linear-gradient(
            180deg,
            transparent 0%,
            rgba(6, 182, 212, 0.03) 15%,
            rgba(6, 182, 212, 0.02) 30%,
            transparent 45%,
            rgba(249, 115, 22, 0.02) 60%,
            rgba(249, 115, 22, 0.03) 75%,
            transparent 100%
          )`,
          filter: 'blur(20px)',
        }}
      />
      
      {/* Subtle pulse nodes along the line */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
        style={{ 
          top: '20%',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)',
        }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
        style={{ 
          top: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
        }}
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
        style={{ 
          top: '75%',
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.4) 0%, transparent 70%)',
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
};

export default ContinuousGradientLine;
