import { motion, AnimatePresence, PanInfo, animate, useMotionValue, type AnimationPlaybackControls } from 'framer-motion';
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { useTransition } from '@/context/TransitionContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Product, productsData } from '@/data/products';
import StabilityMeter from '@/components/ui/StabilityMeter';

// Custom order for the fleet carousel
// Canoas first (carro-chefe), then Surfski Individual, then Surfski Duplo
const CUSTOM_ORDER = ['haka-oc1', 'huna-oc2', 'pono', 'siou', 'moana', 'dw', 'infinity', 'azimut', 'molokay-ss'] as const;

// Get ALL products in the custom order
const allProducts: Product[] = CUSTOM_ORDER
  .map(id => productsData[id])
  .filter((p): p is Product => p !== undefined);

// Autoplay configuration
const AUTOPLAY_INTERVAL = 5000; // 5 seconds
const TOUCH_RESUME_DELAY = 2000; // 2 seconds delay after touch ends

// Category definitions
const CATEGORIES = ['Todos', 'Canoa Havaiana', 'Surfski Individual', 'Surfski Duplo'] as const;
type CategoryType = typeof CATEGORIES[number];

// ============================================
// IMAGE FALLBACK COMPONENT - Optimized to prevent flickering
// ============================================
interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  imageRef?: (el: HTMLImageElement | null) => void;
}

const ImageWithFallback = ({ 
  src, 
  alt, 
  className, 
  style,
  imageRef 
}: ImageWithFallbackProps) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-muted to-background rounded-lg min-h-[200px]">
        <svg 
          viewBox="0 0 200 80" 
          className="w-48 h-20 opacity-20 mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path d="M10 60 Q100 20 190 60" className="text-foreground/30" />
          <path d="M30 55 L100 35 L170 55" className="text-orange/40" />
          <ellipse cx="100" cy="58" rx="85" ry="8" className="text-foreground/10" fill="currentColor" />
        </svg>
        <span className="text-xs tracking-[0.3em] uppercase text-foreground/30 font-sans">
          Imagem em Breve
        </span>
      </div>
    );
  }

  return (
    <img
      ref={imageRef}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setHasError(true)}
      className={className}
      style={style}
    />
  );
};

// ============================================
// UNIFIED FLEET CAROUSEL - All boats in one slider
// ============================================
const ProductShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [filterCategory, setFilterCategory] = useState<CategoryType>('Todos');
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const autoplayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progress = useMotionValue(0); // 0..1 (no React re-renders)
  const progressAnimRef = useRef<AnimationPlaybackControls | null>(null);
  const { startTransition, saveScrollPosition, isTransitioning, transitionData, showLoader } = useTransition();
  const isMobile = useIsMobile();

  // Filtered product list based on active category
  const filteredProducts = useMemo(() => {
    if (filterCategory === 'Todos') return allProducts;
    return allProducts.filter(p => p.category === filterCategory);
  }, [filterCategory]);

  const currentProduct = filteredProducts[currentIndex] || filteredProducts[0];
  const currentCategory = currentProduct?.category;

  const handleProductClick = (product: Product, imageElement: HTMLImageElement) => {
    saveScrollPosition();
    const rect = imageElement.getBoundingClientRect();
    
    showLoader(() => {
      startTransition({
        productId: product.id,
        productName: product.name,
        imageUrl: product.image,
        imageRect: rect,
      });
    });
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    progress.set(0);
  };

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % filteredProducts.length);
    progress.set(0);
  }, [filteredProducts.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + filteredProducts.length) % filteredProducts.length);
    progress.set(0);
  }, [filteredProducts.length]);

  const stopAutoplay = useCallback(() => {
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
      autoplayTimeoutRef.current = null;
    }
    if (progressAnimRef.current) {
      progressAnimRef.current.stop();
      progressAnimRef.current = null;
    }
  }, []);

  // Smart Autoplay (no frequent React state updates)
  useEffect(() => {
    stopAutoplay();

    if (isHovered || isPaused || isTransitioning) return;

    const current = progress.get(); // 0..1
    const remainingMs = Math.max(0, Math.round((1 - current) * AUTOPLAY_INTERVAL));
    if (remainingMs === 0) {
      progress.set(0);
    }

    // Progress animation via MotionValue (no React re-render)
    progressAnimRef.current = animate(progress, 1, {
      duration: remainingMs / 1000,
      ease: 'linear',
    });

    autoplayTimeoutRef.current = setTimeout(() => {
      nextSlide();
    }, remainingMs);

    return () => {
      stopAutoplay();
    };
  }, [currentIndex, isHovered, isPaused, isTransitioning, nextSlide, progress, stopAutoplay]);

  // Preload adjacent images for smoother transitions
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % filteredProducts.length;
    const prevIndex = (currentIndex - 1 + filteredProducts.length) % filteredProducts.length;
    
    [nextIndex, prevIndex].forEach(index => {
      const img = new Image();
      img.src = filteredProducts[index].image;
    });
  }, [currentIndex, filteredProducts]);

  // Keyboard navigation
  useEffect(() => {
    if (isMobile) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobile, nextSlide, prevSlide]);

  // Listen for quick access button events — now sets filter
  useEffect(() => {
    const handleJump = (e: Event) => {
      const detail = (e as CustomEvent).detail as string;
      let targetCategory: CategoryType = 'Todos';
      if (detail === 'canoa-oc1' || detail === 'canoa-oc2') {
        targetCategory = 'Canoa Havaiana';
      } else if (detail === 'surfski-individual') {
        targetCategory = 'Surfski Individual';
      } else if (detail === 'surfski-duplo') {
        targetCategory = 'Surfski Duplo';
      }
      setFilterCategory(targetCategory);
      setCurrentIndex(0);
      setDirection(0);
      progress.set(0);

      // If a specific model was requested, jump to it within the filtered list
      if (detail === 'canoa-oc2') {
        setTimeout(() => {
          // After filter applies, find huna-oc2 in filtered list
          const filtered = allProducts.filter(p => p.category === targetCategory);
          const idx = filtered.findIndex(p => p.id === 'huna-oc2');
          if (idx > 0) {
            setDirection(1);
            setCurrentIndex(idx);
          }
        }, 50);
      }
    };
    window.addEventListener('jump-to-product', handleJump);
    return () => window.removeEventListener('jump-to-product', handleJump);
  }, []);

  // Touch handlers for mobile pause - improved with longer delay
  const handleTouchStart = () => {
    setIsPaused(true);
    setHasInteracted(true); // Mark first interaction
  };
  
  const handleTouchEnd = () => {
    // Resume after longer delay to ensure user finished interacting
    setTimeout(() => setIsPaused(false), TOUCH_RESUME_DELAY);
  };

  // Swipe handlers
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setHasInteracted(true); // Mark first interaction
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) prevSlide();
    else if (info.offset.x < -swipeThreshold) nextSlide();
  };

  // Jump to first product of a category (filter mode)
  const jumpToCategory = useCallback((category: CategoryType) => {
    setHasInteracted(true);
    setFilterCategory(category);
    setCurrentIndex(0);
    setDirection(0);
    progress.set(0);
  }, []);

  // Get active category for chips
  const activeChipCategory = filterCategory;

  const isThisProductTransitioning = isTransitioning && transitionData?.productId === currentProduct.id;

  // Smooth slide animation - lighter on mobile (less pixels to repaint)
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? (isMobile ? '30%' : '80%') : (isMobile ? '-30%' : '-80%'),
      opacity: 0,
      scale: isMobile ? 0.95 : 0.85,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? (isMobile ? '-30%' : '-80%') : (isMobile ? '30%' : '80%'),
      opacity: 0,
      scale: isMobile ? 0.95 : 0.85,
    }),
  };

  const smoothTransition = {
    duration: isMobile ? 0.5 : 0.85, // Faster on mobile = less frames to render
    ease: [0.32, 0.72, 0, 1] as const,
  };

  // Text animation synced with boat
  const textVariants = {
    enter: (direction: number) => ({ 
      x: direction > 0 ? 150 : -150, 
      opacity: 0,
      scale: 0.95,
    }),
    center: { 
      x: 0, 
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({ 
      x: direction > 0 ? -150 : 150, 
      opacity: 0,
      scale: 0.95,
    }),
  };

  const textTransition = {
    duration: 0.85,
    ease: [0.32, 0.72, 0, 1] as const,
  };

  // Category header animation - smooth slide/fade
  const categoryVariants = {
    enter: { opacity: 0, y: -15, filter: 'blur(4px)' },
    center: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: 15, filter: 'blur(4px)' },
  };

  return (
    <section 
      className="relative min-h-screen w-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Progress Bar - Top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-foreground/5 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-foreground/60 via-foreground to-foreground/60"
          style={{
            scaleX: progress,
            transformOrigin: '0% 50%',
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
          }}
        />
      </div>

      {/* Noise texture overlay - disabled on mobile for performance */}
      {!isMobile && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.035] z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      {/* Dramatic gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 100% 80% at 50% 35%, rgba(30, 35, 50, 0.6) 0%, rgba(0, 0, 0, 0.97) 65%),
            radial-gradient(ellipse 70% 40% at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 45%)
          `,
        }}
      />

      {/* Animated spotlight - static on mobile for performance */}
      {isMobile ? (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 65% 45% at 50% 45%, rgba(50, 70, 110, 0.25) 0%, transparent 50%),
              radial-gradient(ellipse 45% 30% at 50% 50%, rgba(249, 115, 22, 0.04) 0%, transparent 40%)
            `,
          }}
        />
      ) : (
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [0.35, 0.5, 0.35] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: `
              radial-gradient(ellipse 65% 45% at 50% 45%, rgba(50, 70, 110, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse 45% 30% at 50% 50%, rgba(249, 115, 22, 0.06) 0%, transparent 40%)
            `,
          }}
        />
      )}

      {/* Dynamic Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-20 px-6 md:px-16 pt-12 md:pt-20"
      >
        <div className="mb-2">
          <span className="text-[9px] md:text-[10px] tracking-[0.35em] uppercase text-foreground/80 font-sans font-medium">
            Performance
          </span>
        </div>
        {/* Dynamic Category Title with smooth transition */}
        <div className="overflow-hidden h-[3.5rem] md:h-[4.5rem]">
          <AnimatePresence mode="wait">
            <motion.h2 
              key={currentCategory}
              variants={categoryVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="display-hero text-foreground"
              style={{ fontSize: 'clamp(1.6rem, 4.5vw, 3rem)', letterSpacing: '-0.015em' }}
            >
              {currentCategory}<span className="text-foreground">.</span>
            </motion.h2>
          </AnimatePresence>
        </div>
        {/* Aviso de personalização sob consulta */}
        <p className="text-[10px] md:text-xs text-foreground/40 mt-3 tracking-wide">
          Cores e acabamentos personalizados sob consulta com nosso especialista.
        </p>
      </motion.div>


      {/* Giant background name */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.h2 
            key={currentProduct.id}
            custom={direction}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={textTransition}
            className="display-hero whitespace-nowrap"
            style={{
              fontSize: isMobile ? 'clamp(4.5rem, 18vw, 8rem)' : 'clamp(12rem, 26vw, 30rem)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.04)',
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            {currentProduct.name}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* 3D Boat Carousel */}
      <motion.div 
        className="relative z-10 h-[52vh] md:h-[58vh] flex items-center justify-center mt-2"
        style={{ touchAction: 'pan-y', willChange: 'transform' }}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        drag={isMobile ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
      >
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={currentProduct.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={smoothTransition}
            className="absolute w-[85%] md:w-[55%] max-w-3xl cursor-pointer"
            onClick={() => {
              const currentImageRef = imageRefs.current[currentIndex];
              if (currentImageRef) handleProductClick(currentProduct, currentImageRef);
            }}
          >
            {/* Specular light glow - disabled on mobile */}
            {!isMobile && (
              <motion.div
                className="absolute inset-0 pointer-events-none -z-10"
                animate={{ opacity: isHovered ? 0.8 : 0.5 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: `
                    radial-gradient(ellipse 90% 70% at 50% 35%, rgba(60, 80, 120, 0.7) 0%, transparent 45%),
                    radial-gradient(ellipse 70% 50% at 50% 45%, rgba(255, 255, 255, 0.08) 0%, transparent 35%)
                  `,
                  filter: 'blur(45px)',
                }}
              />
            )}

            {/* Floor shadow - simplified on mobile */}
            <div 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[110%] h-[60%] pointer-events-none"
              style={{
                background: isMobile 
                  ? 'radial-gradient(ellipse 100% 100% at 50% 0%, rgba(0,0,0,0.5) 0%, transparent 45%)'
                  : `
                    radial-gradient(ellipse 100% 100% at 50% 0%, rgba(0,0,0,0.85) 0%, transparent 50%),
                    radial-gradient(ellipse 80% 60% at 50% 10%, rgba(30, 40, 60, 0.3) 0%, transparent 60%)
                  `,
                // Mobile: NO blur filter (pure gradient is GPU-free), Desktop: keep blur
                filter: isMobile ? 'none' : 'blur(35px)',
                transform: 'translateY(65%) scaleY(0.5) translateZ(0)',
              }}
            />
            
            {/* Reflection line - desktop only */}
            {!isMobile && (
              <div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[2px] pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.05) 70%, transparent 100%)',
                  transform: 'translateY(20px)',
                }}
              />
            )}

            {/* Boat image - GPU optimized */}
            <motion.div
              className="w-full h-auto relative z-10"
              style={{ willChange: 'transform' }}
              animate={{
                y: isHovered && !isMobile ? -15 : 0,
                scale: isHovered && !isMobile ? 1.04 : 1,
              }}
              transition={{ 
                y: { type: 'spring', stiffness: 120, damping: 15 },
                scale: { type: 'spring', stiffness: 120, damping: 15 },
              }}
            >
              <ImageWithFallback
                imageRef={(el) => { imageRefs.current[currentIndex] = el; }}
                src={currentProduct.image}
                alt={currentProduct.name}
                className="w-full h-auto object-contain pointer-events-none"
                style={{
                  // Optimized shadow: smaller blur radius on mobile (less GPU calc)
                  filter: isMobile 
                    ? 'drop-shadow(0 8px 12px rgba(0,0,0,0.6))'
                    : 'drop-shadow(0 50px 100px rgba(0,0,0,0.75)) drop-shadow(0 25px 50px rgba(0,0,0,0.55))',
                  willChange: 'transform',
                  transform: 'translateZ(0)', // Force GPU layer
                  opacity: isThisProductTransitioning ? 0 : 1,
                }}
              />
            </motion.div>

            {/* Mobile swipe hint - fades out after first interaction */}
            {isMobile && (
              <AnimatePresence>
                {!hasInteracted && (
                  <motion.div
                    className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-full pt-6 pointer-events-none flex items-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                  >
                    <motion.span 
                      animate={{ x: [-4, 4, -4] }} 
                      transition={{ duration: 1.2, repeat: Infinity }} 
                      className="text-foreground/45 text-lg"
                    >
                      ←
                    </motion.span>
                    <span className="text-[10px] tracking-[0.25em] uppercase text-foreground/45 font-sans">Deslize</span>
                    <motion.span 
                      animate={{ x: [4, -4, 4] }} 
                      transition={{ duration: 1.2, repeat: Infinity }} 
                      className="text-foreground/45 text-lg"
                    >
                      →
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {/* Desktop hover hint */}
            {!isMobile && (
              <motion.div
                className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-full pt-10 pointer-events-none"
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
                transition={{ duration: 0.25 }}
              >
                <span className="text-[10px] tracking-[0.35em] uppercase text-foreground/45 font-sans">Clique para explorar</span>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Navigation Arrows - Desktop */}
      {!isMobile && (
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-6 md:px-12 z-30 pointer-events-none">
          <motion.button
            onClick={prevSlide}
            className="pointer-events-auto w-11 h-11 md:w-13 md:h-13 rounded-full flex items-center justify-center group"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              willChange: 'transform',
            }}
            whileHover={{ scale: 1.08, background: 'rgba(255, 255, 255, 0.08)' }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-5 h-5 text-foreground/35 group-hover:text-foreground/70 transition-colors" />
          </motion.button>
          <motion.button
            onClick={nextSlide}
            className="pointer-events-auto w-11 h-11 md:w-13 md:h-13 rounded-full flex items-center justify-center group"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              willChange: 'transform',
            }}
            whileHover={{ scale: 1.08, background: 'rgba(255, 255, 255, 0.08)' }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-5 h-5 text-foreground/35 group-hover:text-foreground/70 transition-colors" />
          </motion.button>
        </div>
      )}

      {/* Model name + StabilityMeter */}
      <div className="absolute bottom-20 md:bottom-16 left-1/2 -translate-x-1/2 text-center z-20 px-6 w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProduct.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center"
          >
            {/* Category Badge */}
            <span className="text-[9px] md:text-[10px] tracking-[0.35em] uppercase text-foreground/35 font-sans block mb-1">
              {currentProduct.category}
            </span>
            
            {/* Name */}
            <h3 className="display-hero text-foreground" style={{ fontSize: 'clamp(1.6rem, 4.5vw, 3rem)', letterSpacing: '0.1em' }}>
              {currentProduct.name}
            </h3>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Dots - Enhanced with glow effect */}
      <div className="absolute bottom-8 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 md:gap-1.5 z-30 items-center">
        {filteredProducts.map((product, index) => {
          const prevProduct = index > 0 ? filteredProducts[index - 1] : null;
          const isNewCategory = prevProduct && prevProduct.category !== product.category;
          const isActive = index === currentIndex;
          
          return (
            <div key={product.id} className="flex items-center gap-2 md:gap-1.5">
              {/* Category separator line */}
              {isNewCategory && (
                <div className="w-px h-3 bg-foreground/15 mx-1" />
              )}
              
              <motion.button
                onClick={() => goToSlide(index)}
                className="relative group p-2 md:p-1.5 min-w-[40px] min-h-[40px] md:min-w-0 md:min-h-0 flex items-center justify-center"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.85 }}
              >
                {/* Dot */}
                <motion.div
                  className={`w-2.5 h-2.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
                    isActive ? 'bg-orange' : 'bg-foreground/20 group-hover:bg-foreground/50'
                  }`}
                  animate={{ 
                    scale: isActive ? 1.4 : 1,
                    boxShadow: isActive ? '0 0 12px rgba(249, 115, 22, 0.6)' : '0 0 0px transparent'
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Active ring with pulse */}
                {isActive && (
                  <>
                    <motion.div
                      className="absolute inset-0 m-auto w-6 h-6 md:w-4 md:h-4 rounded-full border border-orange/50"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    {/* Pulse effect */}
                    <motion.div
                      className="absolute inset-0 m-auto w-6 h-6 md:w-4 md:h-4 rounded-full border border-orange/30"
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </>
                )}
              </motion.button>
            </div>
          );
        })}
      </div>

      {/* Product Counter + Pause Indicator */}
      <div className="absolute top-12 md:top-20 right-6 md:right-16 z-20 flex items-center gap-3">
        {/* Pause indicator */}
        {(isHovered || isPaused) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-1.5"
          >
            <div className="w-1.5 h-4 bg-foreground/30 rounded-sm" />
            <div className="w-1.5 h-4 bg-foreground/30 rounded-sm" />
          </motion.div>
        )}
        
        <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-foreground/30 font-mono">
          {String(currentIndex + 1).padStart(2, '0')} / {String(filteredProducts.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
};

export default ProductShowcase;
