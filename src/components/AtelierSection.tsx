import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import BlurText from '@/components/ui/BlurText';
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
    <section className="relative min-h-screen w-full py-20 md:py-48">
      
      {/* Breathing Glow Effect - Spotlight behind boat */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 w-[70%] h-[50%] -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.2) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
        
        {/* Water Caustics */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px]"
          animate={{
            x: [0, 80, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.05) 0%, transparent 60%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      {/* Header */}
      <div className="px-6 md:px-16 mb-12 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-widest text-muted-foreground uppercase block mb-3 md:mb-4">
            O Ateliê
          </span>
          <h2 className="display-hero text-foreground">
            Sua Identidade. Sua Cor.
          </h2>
        </motion.div>
      </div>

      {/* Boat Display - Centered */}
      <div className="relative flex flex-col items-center justify-center px-4 md:px-16">
        {/* Boat Image with Smooth Transition - Larger on mobile */}
        <div 
          className="relative w-full max-w-4xl aspect-[16/9] flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={colors[selectedColor].id}
              src={colors[selectedColor].image}
              alt={colors[selectedColor].name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full md:w-[90%] h-auto object-contain"
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
                className={`w-11 h-11 md:w-8 md:h-8 rounded-full transition-all duration-300 ${
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

      {/* CTA - Destaque com lista */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="px-8 md:px-16 mt-20 text-center"
      >
        {/* Lista de benefícios */}
        <ul className="text-muted-foreground text-sm md:text-base mb-10 max-w-lg mx-auto space-y-3 text-left">
          <li className="flex items-start gap-3">
            <span className="text-orange mt-1">•</span>
            <span>Realizando o desejo do barco dos sonhos</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-orange mt-1">•</span>
            <span>Aqui você pode escolher a coloração do seu barco</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-orange mt-1">•</span>
            <span>Escolha o modelo que você deseja</span>
          </li>
        </ul>

        {/* Botão maior e mais destacado */}
        <motion.a
          href="https://wa.me/5513997446684?text=Olá! Gostaria de personalizar minha embarcação."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-4 px-12 py-5 bg-white text-black text-sm md:text-base tracking-widest uppercase font-bold transition-all duration-300 hover:shadow-xl hover:shadow-white/30"
          whileHover={{ 
            scale: 1.05,
          }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            // Haptic feedback for mobile
            if ('vibrate' in navigator) {
              navigator.vibrate(15);
            }
          }}
        >
          <span>Consultar Especialista</span>
          <motion.span
            animate={{ x: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-lg"
          >
            →
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  );
};

export default AtelierSection;