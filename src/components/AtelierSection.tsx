import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import atelier REAL lifestyle images
import atelierCustomBows from '@/assets/atelier/atelier-custom-bows.jpg';
import atelierLifestylePaddle from '@/assets/atelier/atelier-lifestyle-paddle.jpg';
import atelierLifestyleCarry from '@/assets/atelier/atelier-lifestyle-carry.jpg';
import atelierCustomExotic from '@/assets/atelier/atelier-custom-exotic.jpg';
import atelierColorsPalette from '@/assets/atelier/atelier-colors-palette.jpg';

interface AtelierImage {
  id: string;
  src: string;
  alt: string;
}

const atelierImages: AtelierImage[] = [
  { id: 'bows', src: atelierCustomBows, alt: 'Proas personalizadas e cores vibrantes' },
  { id: 'paddle', src: atelierLifestylePaddle, alt: 'Lifestyle: remada e personalização' },
  { id: 'carry', src: atelierLifestyleCarry, alt: 'Lifestyle: transporte do barco' },
  { id: 'exotic', src: atelierCustomExotic, alt: 'Customização: cores exóticas' },
  { id: 'palette', src: atelierColorsPalette, alt: 'Paleta de cores e combinações' },
];

const AtelierSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const current = useMemo(() => atelierImages[currentIndex], [currentIndex]);

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % atelierImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    if (index < 0) {
      setCurrentIndex(atelierImages.length - 1);
    } else if (index >= atelierImages.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(index);
    }
  };

  // Transição leve e fluida
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 24 : -24,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -24 : 24,
      opacity: 0,
    }),
  };

  return (
    <section className="relative min-h-screen w-full py-12 md:py-32">
      
      {/* Breathing Glow Effect - Spotlight behind images */}
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
      <div className="px-6 md:px-16 mb-6 md:mb-12">
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

      {/* Image Carousel - Real Photos */}
      <div className="relative flex flex-col items-center justify-center px-4 md:px-16">
        {/* Carousel Container */}
        <div 
          className="relative w-full max-w-3xl aspect-[4/3] overflow-hidden rounded-2xl"
          style={{
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.img
              key={current.id}
              src={current.src}
              alt={current.alt}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ 
                duration: 0.45, 
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                imageOrientation: 'from-image',
                willChange: 'transform, opacity',
              }}
            />
          </AnimatePresence>

          {/* Gradient overlays for depth */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/50 via-transparent to-transparent" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-transparent to-background/20" />

          {/* Navigation Arrows */}
          <button
            onClick={() => goTo(currentIndex - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/40 backdrop-blur-sm flex items-center justify-center text-foreground/80 hover:bg-background/60 transition-all z-10"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => goTo(currentIndex + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/40 backdrop-blur-sm flex items-center justify-center text-foreground/80 hover:bg-background/60 transition-all z-10"
            aria-label="Próxima foto"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-3 mt-4"
        >
          {atelierImages.map((img, index) => (
            <button
              key={img.id}
              onClick={() => goTo(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? 'bg-foreground w-6' 
                  : 'bg-foreground/30 hover:bg-foreground/50'
              }`}
              aria-label={`Ir para imagem ${index + 1}`}
            />
          ))}
        </motion.div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-sm text-foreground text-center"
        >
          Personalize seu barco com cores e acabamentos exclusivos
        </motion.p>
      </div>

      {/* CTA - Destaque com lista */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="px-8 md:px-16 mt-4 text-center"
      >
        {/* Lista de benefícios */}
        <ul className="text-orange text-sm md:text-base mb-6 max-w-lg mx-auto space-y-1 text-left">
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
