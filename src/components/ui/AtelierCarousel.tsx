import { useCallback, useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Palette } from 'lucide-react';

// Import atelier lifestyle images
import atelierLifestylePaddle from '@/assets/atelier/atelier-lifestyle-paddle.jpg';
import atelierLifestyleCarry from '@/assets/atelier/atelier-lifestyle-carry.jpg';
import atelierCustomExotic from '@/assets/atelier/atelier-custom-exotic.jpg';

const atelierImages = [
  { src: atelierCustomExotic, alt: 'Customização: acabamento e cores exóticas' },
  { src: atelierLifestylePaddle, alt: 'Lifestyle: remada e personalização' },
  { src: atelierLifestyleCarry, alt: 'Lifestyle: transporte do barco personalizado' },
];

const AtelierCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchDelta, setTouchDelta] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    if (index < 0) {
      setCurrentIndex(atelierImages.length - 1);
    } else if (index >= atelierImages.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(index);
    }
    setTimeout(() => setIsTransitioning(false), 400);
  }, [isTransitioning]);

  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  // Autoplay
  useEffect(() => {
    const interval = setInterval(goNext, 5000);
    return () => clearInterval(interval);
  }, [goNext]);

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setTouchDelta(0);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    setTouchDelta(e.touches[0].clientX - touchStart);
  };

  const onTouchEnd = () => {
    if (touchStart === null) return;
    if (touchDelta > 50) goPrev();
    else if (touchDelta < -50) goNext();
    setTouchStart(null);
    setTouchDelta(0);
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
        className="relative w-full rounded-xl overflow-hidden"
        style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative aspect-[4/3] w-full">
          <div
            className="absolute inset-0 flex transition-transform duration-400 ease-out"
            style={{
              width: `${atelierImages.length * 100}%`,
              transform: `translateX(calc(-${currentIndex * (100 / atelierImages.length)}% + ${touchStart !== null ? touchDelta : 0}px))`,
              transition: touchStart !== null ? 'none' : 'transform 0.4s ease-out',
            }}
          >
            {atelierImages.map((img, idx) => (
              <div
                key={idx}
                className="relative h-full"
                style={{ width: `${100 / atelierImages.length}%` }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ imageOrientation: 'from-image' }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Depth overlays */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-transparent to-background/30" />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/40 backdrop-blur-sm flex items-center justify-center text-foreground/80 hover:bg-background/60 transition-all z-10"
          aria-label="Foto anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={goNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/40 backdrop-blur-sm flex items-center justify-center text-foreground/80 hover:bg-background/60 transition-all z-10"
          aria-label="Próxima foto"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Swipe hint */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-foreground/50 bg-background/30 backdrop-blur-sm px-3 py-1 rounded-full pointer-events-none">
          ← Deslize →
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-3">
        {atelierImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? 'bg-foreground w-4'
                : 'bg-foreground/30 hover:bg-foreground/50'
            }`}
            aria-label={`Ir para imagem ${idx + 1}`}
          />
        ))}
      </div>

      {/* Caption */}
      <p className="text-xs text-foreground/40 mt-3 text-center">
        Personalize seu barco com cores exclusivas
      </p>
    </div>
  );
};

export default AtelierCarousel;
