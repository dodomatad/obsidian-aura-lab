import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Palette } from 'lucide-react';

// Import atelier lifestyle images (FIXO: independente do modelo selecionado)
import atelierLifestylePaddle from '@/assets/atelier/atelier-lifestyle-paddle.jpg';
import atelierLifestyleCarry from '@/assets/atelier/atelier-lifestyle-carry.jpg';
import atelierCustomExotic from '@/assets/atelier/atelier-custom-exotic.jpg';

const atelierImages = [
  
  { src: atelierLifestylePaddle, alt: 'Lifestyle: remada e personalização' },
  { src: atelierLifestyleCarry, alt: 'Lifestyle: transporte do barco personalizado' },
  { src: atelierCustomExotic, alt: 'Customização: acabamento e cores exóticas' },
];

const AtelierCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const slideBasis = '85%';
  const slideGap = 12; // px

  const slides = useMemo(() => atelierImages, []);

  const goTo = (index: number) => {
    if (index < 0) {
      setCurrentIndex(atelierImages.length - 1);
    } else if (index >= atelierImages.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(index);
    }
  };

  const scrollToIndex = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;

    const slide = el.querySelector<HTMLElement>(`[data-atelier-slide="${index}"]`);
    if (!slide) return;

    el.scrollTo({
      left: slide.offsetLeft,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    scrollToIndex(currentIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      // Estimativa estável: usa o primeiro slide como referência
      const first = el.querySelector<HTMLElement>('[data-atelier-slide="0"]');
      if (!first) return;
      const slideWidth = first.getBoundingClientRect().width + slideGap;
      const idx = Math.round(el.scrollLeft / slideWidth);
      if (idx !== currentIndex) setCurrentIndex(Math.max(0, Math.min(slides.length - 1, idx)));
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [currentIndex, slides.length]);

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
      <div className="relative w-full rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}>
        {/* Horizontal slider (mostra ~1.15 slides) */}
        <div className="relative">
          <div
            ref={scrollerRef}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
            style={{
              gap: `${slideGap}px`,
              padding: '0px 0px',
              scrollbarWidth: 'none',
            }}
          >
            {slides.map((img, idx) => (
              <div
                key={idx}
                data-atelier-slide={idx}
                className="shrink-0 snap-start"
                style={{ flexBasis: slideBasis }}
              >
                <div className="relative aspect-[4/3] w-full">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ imageOrientation: 'from-image' }}
                    loading="lazy"
                  />
                  {/* Depth overlays */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-transparent to-background/30" />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => goTo(currentIndex - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/40 backdrop-blur-sm flex items-center justify-center text-foreground/80 hover:bg-background/60 transition-all z-10"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => goTo(currentIndex + 1)}
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
        <div className="flex justify-center gap-2 py-3 bg-background/20">
          {slides.map((_, idx) => (
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
