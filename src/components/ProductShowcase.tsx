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
  category: 'surfski' | 'canoa' | 'gear';
}

// All products with categories
const allProducts: Product[] = [
  // Surfskis de Elite
  { id: 'pono', name: 'PONO', tagline: 'Estabilidade e Controle', image: boatPono, category: 'surfski' },
  { id: 'infinite', name: 'INFINITE', tagline: 'Velocidade Pura', image: boatSurfski, category: 'surfski' },
  { id: 'azimut', name: 'AZIMUT', tagline: 'A Evolução da Espécie', image: boatSurfski, category: 'surfski' },
  { id: 'moana', name: 'MOANA', tagline: 'Conquiste o Oceano', image: boatPono, category: 'surfski' },
  { id: 'dw', name: 'DW', tagline: 'Mestre das Ondas', image: boatSurfski, category: 'surfski' },
  // Canoas Havaianas
  { id: 'oc1-race', name: 'OC1 RACE', tagline: 'Performance Polinésia', image: boatPono, category: 'canoa' },
  { id: 'oc1-touring', name: 'OC1 TOURING', tagline: 'Aventura no Mar', image: boatSurfski, category: 'canoa' },
  { id: 'oc6', name: 'OC6', tagline: 'Espírito de Equipe', image: boatPono, category: 'canoa' },
];

const categories = [
  { id: 'surfski', label: 'Surfski de Elite', count: 5 },
  { id: 'canoa', label: 'Canoas Havaianas', count: 3 },
];

const ProductShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'surfski' | 'canoa'>('surfski');
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const { startTransition, saveScrollPosition, isTransitioning, transitionData } = useTransition();
  const isMobile = useIsMobile();

  // Filter products by category
  const filteredProducts = allProducts.filter(p => p.category === activeCategory);
  const currentProduct = filteredProducts[currentIndex];

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0);
    setDirection(0);
  }, [activeCategory]);

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
    setCurrentIndex((prev) => (prev + 1) % filteredProducts.length);
  }, [filteredProducts.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + filteredProducts.length) % filteredProducts.length);
  }, [filteredProducts.length]);

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

  // Swipe handlers for mobile - touch-action: pan-y enabled
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    
    if (info.offset.x > swipeThreshold) {
      prevSlide();
    } else if (info.offset.x < -swipeThreshold) {
      nextSlide();
    }
  };

  const isThisProductTransitioning = isTransitioning && transitionData?.productId === currentProduct?.id;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.85,
      rotateY: direction > 0 ? 15 : -15,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.85,
      rotateY: direction > 0 ? -15 : 15,
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

  if (!currentProduct) return null;

  return (
    <section className="relative min-h-screen w-full overflow-hidden py-8 md:py-0">
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Dramatic lighting effect with enhanced depth - charcoal to black gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 100% 80% at 50% 40%, rgba(34, 34, 34, 0.6) 0%, rgba(0, 0, 0, 0.95) 70%),
            radial-gradient(ellipse 80% 40% at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 60%)
          `,
        }}
      />

      {/* Enhanced ambient glow behind products - spotlight effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 50% 50%, rgba(60, 70, 90, 0.25) 0%, transparent 60%),
            radial-gradient(ellipse 50% 35% at 50% 55%, rgba(249, 115, 22, 0.05) 0%, transparent 50%)
          `,
        }}
      />

      {/* Category Tabs - Above carousel */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-30 flex justify-center gap-2 md:gap-4 pt-8 md:pt-16 pb-4"
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as 'surfski' | 'canoa')}
            className={`relative px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm tracking-[0.15em] uppercase font-sans font-medium transition-all duration-300 ${
              activeCategory === cat.id 
                ? 'text-foreground' 
                : 'text-foreground/40 hover:text-foreground/70'
            }`}
          >
            {cat.label}
            {activeCategory === cat.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange to-transparent"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </motion.div>

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
              fontSize: isMobile ? 'clamp(5rem, 22vw, 10rem)' : 'clamp(12rem, 28vw, 32rem)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.03)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            {currentProduct.name}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* Boat carousel with swipe support - touch-action: pan-y for vertical scroll */}
      <motion.div 
        className="relative z-10 h-[60vh] md:h-[70vh] flex items-center justify-center"
        style={{ touchAction: 'pan-y' }}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        drag={isMobile ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
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
            className="absolute w-[85%] md:w-[60%] max-w-3xl cursor-pointer"
            style={{ perspective: 1000 }}
            onClick={() => {
              const currentImageRef = imageRefs.current[currentIndex];
              if (currentImageRef) {
                handleProductClick(currentProduct, currentImageRef);
              }
            }}
          >
            {/* Enhanced spotlight glow - simulating studio lighting */}
            <motion.div
              className="absolute inset-0 pointer-events-none -z-10"
              animate={{
                opacity: isHovered ? 0.8 : 0.5,
              }}
              transition={{ duration: 0.4 }}
              style={{
                background: `
                  radial-gradient(ellipse 90% 70% at 50% 35%, rgba(50, 55, 65, 0.9) 0%, transparent 55%),
                  radial-gradient(ellipse 70% 50% at 50% 45%, rgba(255, 255, 255, 0.1) 0%, transparent 45%),
                  radial-gradient(ellipse 50% 30% at 50% 55%, rgba(249, 115, 22, 0.08) 0%, transparent 35%)
                `,
                filter: 'blur(40px)',
              }}
            />

            {/* Floor reflection / drop shadow - makes boat "land" */}
            <div 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[95%] h-[45%] pointer-events-none"
              style={{
                background: `
                  radial-gradient(ellipse 100% 80% at 50% -10%, rgba(0,0,0,0.7) 0%, transparent 65%),
                  radial-gradient(ellipse 80% 50% at 50% 10%, rgba(0,0,0,0.5) 0%, transparent 60%)
                `,
                filter: 'blur(30px)',
                transform: 'translateY(80%) scaleY(0.4)',
              }}
            />

            {/* Boat image with enhanced shadows for depth */}
            <motion.img
              layoutId={`boat-image-${currentProduct.id}`}
              ref={(el) => { imageRefs.current[currentIndex] = el; }}
              src={currentProduct.image}
              alt={currentProduct.name}
              className="w-full h-auto object-contain relative z-10 pointer-events-none"
              animate={{
                opacity: isThisProductTransitioning ? 0 : 1,
                y: isHovered && !isMobile ? -15 : 0,
                scale: isHovered && !isMobile ? 1.05 : 1,
              }}
              transition={{ 
                opacity: { duration: 0.1 },
                y: { type: 'spring', stiffness: 180, damping: 20 },
                scale: { type: 'spring', stiffness: 180, damping: 20 },
                layout: { duration: 0.6, ease: [0.32, 0.72, 0, 1] },
              }}
              style={{
                filter: `
                  drop-shadow(0 60px 120px rgba(0,0,0,0.8)) 
                  drop-shadow(0 30px 60px rgba(0,0,0,0.6))
                  drop-shadow(0 15px 30px rgba(0,0,0,0.4))
                `,
              }}
            />

            {/* Mobile swipe hint */}
            {isMobile && (
              <motion.div
                className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-full pt-6 pointer-events-none flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 0.5 }}
              >
                <motion.span
                  animate={{ x: [-5, 5, -5] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-foreground/50 text-lg"
                >
                  ←
                </motion.span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-foreground/50 font-sans font-medium">
                  Deslize
                </span>
                <motion.span
                  animate={{ x: [5, -5, 5] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-foreground/50 text-lg"
                >
                  →
                </motion.span>
              </motion.div>
            )}

            {/* Hover label - Desktop only */}
            {!isMobile && (
              <motion.div
                className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-full pt-10 pointer-events-none"
                animate={{ 
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 10,
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-[10px] tracking-[0.4em] uppercase text-foreground/50 font-sans">
                  Clique para explorar
                </span>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Navigation Arrows - Desktop only, glassmorphism style */}
      {!isMobile && (
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-8 md:px-16 z-30 pointer-events-none">
          <motion.button
            onClick={prevSlide}
            className="pointer-events-auto w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center group"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            }}
            whileHover={{ 
              scale: 1.1,
              background: 'rgba(255, 255, 255, 0.1)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-foreground/50 group-hover:text-foreground transition-colors" />
          </motion.button>

          <motion.button
            onClick={nextSlide}
            className="pointer-events-auto w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center group"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            }}
            whileHover={{ 
              scale: 1.1,
              background: 'rgba(255, 255, 255, 0.1)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-foreground/50 group-hover:text-foreground transition-colors" />
          </motion.button>
        </div>
      )}

      {/* Model name at bottom */}
      <div className="absolute bottom-28 md:bottom-24 left-1/2 -translate-x-1/2 text-center z-20 px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProduct.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-foreground/40 font-sans block mb-2 md:mb-3">
              {currentProduct.tagline}
            </span>
            <h3 
              className="display-hero text-foreground"
              style={{
                fontSize: 'clamp(1.75rem, 5vw, 3.5rem)',
                letterSpacing: '0.12em',
              }}
            >
              {currentProduct.name}
            </h3>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Dots - larger touch area on mobile */}
      <div className="absolute bottom-12 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-3 md:gap-4 z-30">
        {filteredProducts.map((product, index) => (
          <motion.button
            key={product.id}
            onClick={() => goToSlide(index)}
            className="relative group p-3 md:p-2"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className={`w-2.5 h-2.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-orange' 
                  : 'bg-foreground/20 group-hover:bg-foreground/40'
              }`}
              animate={{
                scale: index === currentIndex ? 1.2 : 0.8,
              }}
            />
            {/* Active indicator ring */}
            {index === currentIndex && (
              <motion.div
                className="absolute inset-0 m-auto w-5 h-5 md:w-4 md:h-4 rounded-full border border-orange/40"
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
          className="absolute bottom-10 right-8 z-20 hidden md:flex items-center gap-2"
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
