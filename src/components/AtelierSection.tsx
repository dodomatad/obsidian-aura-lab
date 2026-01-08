import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import boatPink from '@/assets/boat-pink.png';
import boatCamo from '@/assets/boat-camo.png';
import boatCarbon from '@/assets/boat-carbon.png';

interface ColorOption {
  id: string;
  name: string;
  image: string;
  color: string;
}

const colors: ColorOption[] = [
  { id: 'pink', name: 'Rosa Audaz', image: boatPink, color: '#d4708f' },
  { id: 'camo', name: 'Camuflagem', image: boatCamo, color: '#5a6b4a' },
  { id: 'carbon', name: 'Carbono', image: boatCarbon, color: '#3a4a5e' },
];

const AtelierSection = () => {
  const [selectedColor, setSelectedColor] = useState(0);

  return (
    <section className="relative min-h-screen w-full py-24 md:py-32" style={{ background: 'hsl(0 0% 5%)' }}>
      {/* Header */}
      <div className="px-8 md:px-16 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-widest text-muted-foreground uppercase block mb-4">
            O Ateliê
          </span>
          <h2 className="display-hero text-foreground" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
            Sua Identidade.<br />
            <span className="text-muted-foreground">Sua Cor.</span>
          </h2>
        </motion.div>
      </div>

      {/* Boat Display - Centered */}
      <div className="relative flex flex-col items-center justify-center px-8 md:px-16">
        {/* Boat Image with Smooth Transition */}
        <div className="relative w-full max-w-4xl aspect-[16/9] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.img
              key={colors[selectedColor].id}
              src={colors[selectedColor].image}
              alt={colors[selectedColor].name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-[90%] h-auto object-contain"
              style={{
                filter: `drop-shadow(0 40px 80px ${colors[selectedColor].color}40)`,
              }}
            />
          </AnimatePresence>
        </div>

        {/* Color Selector - Simple Dots */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-6 mt-12"
        >
          {colors.map((color, index) => (
            <button
              key={color.id}
              onClick={() => setSelectedColor(index)}
              className="group relative flex flex-col items-center gap-3 transition-all"
            >
              {/* Color Dot */}
              <div
                className={`w-8 h-8 rounded-full transition-all duration-300 ${
                  selectedColor === index 
                    ? 'scale-100 ring-2 ring-foreground ring-offset-2 ring-offset-background' 
                    : 'scale-90 opacity-60 hover:opacity-100 hover:scale-100'
                }`}
                style={{ backgroundColor: color.color }}
              />
              
              {/* Label - Shows on selection */}
              <span 
                className={`text-xs tracking-wide transition-all duration-300 ${
                  selectedColor === index 
                    ? 'text-foreground opacity-100' 
                    : 'text-muted-foreground opacity-0 group-hover:opacity-100'
                }`}
              >
                {color.name}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Selected Color Name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 text-center"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={colors[selectedColor].id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-muted-foreground"
            >
              Acabamento <span className="text-foreground">{colors[selectedColor].name}</span>
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* CTA - Glassmorphism style */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="px-8 md:px-16 mt-20 text-center"
      >
        <p className="text-muted-foreground text-sm mb-8 max-w-md mx-auto">
          Customização sob consulta. Cada embarcação é única.
        </p>
        <motion.a
          href="https://wa.me/5511999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-4 text-foreground text-xs tracking-widest uppercase rounded-xl transition-all duration-500"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
          whileHover={{ 
            background: 'rgba(255, 255, 255, 0.12)',
            boxShadow: '0 0 40px rgba(255, 255, 255, 0.15)',
          }}
          animate={{
            boxShadow: [
              '0 0 15px rgba(255, 255, 255, 0.05)',
              '0 0 25px rgba(255, 255, 255, 0.1)',
              '0 0 15px rgba(255, 255, 255, 0.05)',
            ],
          }}
          transition={{
            boxShadow: {
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          }}
        >
          Descobrir Possibilidades
        </motion.a>
      </motion.div>
    </section>
  );
};

export default AtelierSection;