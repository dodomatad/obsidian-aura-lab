import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Palette } from 'lucide-react';

// Import atelier lifestyle images
import atelierColorsPalette from '@/assets/atelier/atelier-colors-palette.jpg';
import atelierLifestyleClub from '@/assets/atelier/atelier-lifestyle-club.jpg';
import atelierCustomBows from '@/assets/atelier/atelier-custom-bows.jpg';
import atelierLifestyleField from '@/assets/atelier/atelier-lifestyle-field.jpg';

const atelierImages = [
  { src: atelierColorsPalette, alt: 'Paleta de cores vibrantes' },
  { src: atelierLifestyleClub, alt: 'Clube náutico com barcos personalizados' },
  { src: atelierCustomBows, alt: 'Bicos personalizados em cores diversas' },
  { src: atelierLifestyleField, alt: 'Barco personalizado no gramado' },
];

const AtelierCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = (index: number) => {
    if (index < 0) {
      setCurrentIndex(atelierImages.length - 1);
    } else if (index >= atelierImages.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(index);
    }
  };

  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      goTo(currentIndex - 1);
    } else if (info.offset.x < -threshold) {
      goTo(currentIndex + 1);
    }
    setIsDragging(false);
  };

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <Palette className="w-4 h-4 text-foreground/60" />
        <h2 className="text-sm tracking-[0.3em] uppercase text-foreground/50 font-sans font-medium">
          Ateliê: Cores & Lifestyle
        </h2>
      </div>

      {/* Carousel Container */}
      <div 
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-xl"
        style={{
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Main Image Area - Shows 1.25 images to indicate more */}
        <div className="relative aspect-[4/3] w-full">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={atelierImages[currentIndex].src}
              alt={atelierImages[currentIndex].alt}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ imageOrientation: 'from-image' }}
              initial={{ opacity: 0, x: isDragging ? 0 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isDragging ? 0 : -50 }}
              transition={{ duration: 0.3 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
            />
          </AnimatePresence>

          {/* Gradient overlays for depth */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-transparent to-black/20" />

          {/* Navigation Arrows */}
          <button
            onClick={() => goTo(currentIndex - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-foreground/80 hover:bg-black/60 transition-all z-10"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => goTo(currentIndex + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-foreground/80 hover:bg-black/60 transition-all z-10"
            aria-label="Próxima foto"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Swipe hint */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-foreground/50 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full pointer-events-none">
            ← Deslize →
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 py-3 bg-black/20">
          {atelierImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex 
                  ? 'bg-foreground w-4' 
                  : 'bg-foreground/30 hover:bg-foreground/50'
              }`}
              aria-label={`Ir para imagem ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Caption */}
      <p className="text-xs text-foreground/40 mt-3 text-center">
        Personalize seu barco com cores exclusivas
      </p>
    </div>
  );
};

export default AtelierCarousel;
