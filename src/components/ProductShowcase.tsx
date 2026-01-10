import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { useTransition } from '@/context/TransitionContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import boatPono from '@/assets/boat-pono.png';
import boatSurfski from '@/assets/boat-surfski.png';

interface Product {
  id: string;
  name: string;
  tagline: string;
  image: string;
}

const products: Product[] = [
  {
    id: 'pono',
    name: 'PONO',
    tagline: 'Estabilidade e Controle',
    image: boatPono,
  },
  {
    id: 'infinite',
    name: 'INFINITE',
    tagline: 'Velocidade Pura',
    image: boatSurfski,
  },
  {
    id: 'azimut',
    name: 'AZIMUT',
    tagline: 'A Evolução da Espécie',
    image: boatSurfski,
  },
  {
    id: 'moana',
    name: 'MOANA',
    tagline: 'Conquiste o Oceano',
    image: boatPono,
  },
  {
    id: 'dw',
    name: 'DW',
    tagline: 'Mestre das Ondas',
    image: boatSurfski,
  },
];

const ProductShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const { startTransition, saveScrollPosition, isTransitioning, transitionData } = useTransition();
  const isMobile = useIsMobile();

  const currentProduct = products[currentIndex];

  const handleProductClick = (product: Product, imageElement: HTMLImageElement) => {
    saveScrollPosition();
    
    const rect = imageElement.getBoundingClientRect();
    startTransition({
      productId: product.id,
      productName: product.name,
      imageUrl: product.image,
      imageRect: rect,
    });
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % products.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  }, []);

  // Keyboard navigation (desktop only)
  useEffect(() => {
    if (isMobile) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobile, nextSlide, prevSlide]);

  // Swipe handlers for mobile
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    
    if (info.offset.x > swipeThreshold) {
      prevSlide();
    } else if (info.offset.x < -swipeThreshold) {
      nextSlide();
    }
  };

  const isThisProductTransitioning = isTransitioning && transitionData?.productId === currentProduct.id;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.9,
    }),
  };

  const textVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -200 : 200,
      opacity: 0,
    }),
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Dramatic lighting effect with enhanced depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 40% at 50% 0%, rgba(255,255,255,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 50% 50%, transparent 0%, rgba(0,0,0,0.4) 70%)
          `,
        }}
      />

      {/* Enhanced ambient glow behind products */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 50% 55%, rgba(249, 115, 22, 0.03) 0%, transparent 50%),
            radial-gradient(ellipse 80% 60% at 50% 50%, rgba(30, 50, 80, 0.15) 0%, transparent 60%)
          `,
        }}
      />

      {/* Giant background name */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.h2 
            key={currentProduct.id}
            custom={direction}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="display-hero whitespace-nowrap"
            style={{
              fontSize: isMobile ? 'clamp(6rem, 25vw, 12rem)' : 'clamp(12rem, 30vw, 35rem)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.04)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            {currentProduct.name}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* Boat carousel with swipe support */}
      <motion.div 
        className="relative z-10 h-full flex items-center justify-center touch-pan-y"
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        drag={isMobile ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentProduct.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ 
              duration: 0.6, 
              ease: [0.32, 0.72, 0, 1],
            }}
            className="absolute w-[85%] md:w-[65%] max-w-4xl cursor-pointer"
            onClick={() => {
              const currentImageRef = imageRefs.current[currentIndex];
              if (currentImageRef) {
                handleProductClick(currentProduct, currentImageRef);
              }
            }}
          >
            {/* Enhanced spotlight glow with depth */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                opacity: isHovered ? 0.5 : 0.3,
              }}
              transition={{ duration: 0.4 }}
              style={{
                background: `
                  radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255, 255, 255, 0.12) 0%, transparent 50%),
                  radial-gradient(ellipse 60% 40% at 50% 60%, rgba(249, 115, 22, 0.08) 0%, transparent 40%)
                `,
                filter: 'blur(40px)',
              }}
            />

            {/* Floor reflection / shadow for grounding */}
            <div 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[30%] pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 100% 100% at 50% 0%, rgba(0,0,0,0.4) 0%, transparent 70%)',
                filter: 'blur(20px)',
                transform: 'translateY(60%) scaleY(0.3)',
              }}
            />

            {/* Boat image with layoutId for shared element transition */}
            <motion.img
              layoutId={`boat-image-${currentProduct.id}`}
              ref={(el) => { imageRefs.current[currentIndex] = el; }}
              src={currentProduct.image}
              alt={currentProduct.name}
              className="w-full h-auto object-contain relative z-10 pointer-events-none"
              animate={{
                opacity: isThisProductTransitioning ? 0 : 1,
                y: isHovered && !isMobile ? -10 : 0,
                scale: isHovered && !isMobile ? 1.03 : 1,
              }}
              transition={{ 
                opacity: { duration: 0.1 },
                y: { type: 'spring', stiffness: 200, damping: 20 },
                scale: { type: 'spring', stiffness: 200, damping: 20 },
                layout: { duration: 0.6, ease: [0.32, 0.72, 0, 1] },
              }}
              style={{
                filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.5)) drop-shadow(0 20px 40px rgba(0,0,0,0.3))',
              }}
            />

            {/* Mobile swipe hint - More prominent */}
            {isMobile && (
              <motion.div
                className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-full pt-4 pointer-events-none flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 0.5 }}
              >
                <motion.span
                  animate={{ x: [-4, 4, -4] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-foreground/60"
                >
                  ←
                </motion.span>
                <span className="text-xs tracking-[0.2em] uppercase text-foreground/60 font-sans font-medium">
                  Deslize
                </span>
                <motion.span
                  animate={{ x: [4, -4, 4] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-foreground/60"
                >
                  →
                </motion.span>
              </motion.div>
            )}

            {/* Hover label - Desktop only */}
            {!isMobile && (
              <motion.div
                className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-full pt-8 pointer-events-none"
                animate={{ 
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 10,
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-[10px] tracking-[0.4em] uppercase text-foreground/60 font-sans">
                  Clique para explorar
                </span>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Navigation Arrows - Hide on mobile, larger touch area */}
      {!isMobile && (
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-8 md:px-20 z-30 pointer-events-none">
          <motion.button
            onClick={prevSlide}
            className="pointer-events-auto w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center group"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            }}
            whileHover={{ 
              scale: 1.1,
              background: 'rgba(255, 255, 255, 0.12)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 text-foreground/60 group-hover:text-foreground transition-colors" />
          </motion.button>

          <motion.button
            onClick={nextSlide}
            className="pointer-events-auto w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center group"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            }}
            whileHover={{ 
              scale: 1.1,
              background: 'rgba(255, 255, 255, 0.12)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-8 h-8 md:w-10 md:h-10 text-foreground/60 group-hover:text-foreground transition-colors" />
          </motion.button>
        </div>
      )}

      {/* Model name at bottom */}
      <div className="absolute bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 text-center z-20 px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProduct.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-[10px] md:text-[10px] tracking-[0.35em] uppercase text-foreground/40 font-sans block mb-2 md:mb-3">
              {currentProduct.tagline}
            </span>
            <h3 
              className="display-hero text-foreground"
              style={{
                fontSize: 'clamp(1.75rem, 5vw, 4rem)',
                letterSpacing: '0.1em',
              }}
            >
              {currentProduct.name}
            </h3>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Dots - larger touch area on mobile */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 md:gap-4 z-30">
        {products.map((product, index) => (
          <motion.button
            key={product.id}
            onClick={() => goToSlide(index)}
            className="relative group p-3 md:p-2"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className={`w-3 h-3 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-orange' 
                  : 'bg-foreground/20 group-hover:bg-foreground/40'
              }`}
              animate={{
                scale: index === currentIndex ? 1 : 0.75,
              }}
            />
            {/* Active indicator ring */}
            {index === currentIndex && (
              <motion.div
                className="absolute inset-0 m-auto w-6 h-6 md:w-5 md:h-5 rounded-full border border-orange/50"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Keyboard hint - Desktop only */}
      {!isMobile && (
        <motion.div
          className="absolute bottom-8 right-8 z-20 hidden md:flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 2 }}
        >
          <span className="text-[9px] tracking-[0.15em] uppercase text-foreground/40">
            ← →
          </span>
        </motion.div>
      )}
    </section>
  );
};

export default ProductShowcase;
