import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { useTransition } from '@/context/TransitionContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Product, getAllProducts } from '@/data/products';

// Get ALL products in a single unified list
const allProducts = getAllProducts();

// ============================================
// UNIFIED FLEET CAROUSEL - All boats in one slider
// ============================================
const ProductShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const { startTransition, saveScrollPosition, isTransitioning, transitionData, showLoader } = useTransition();
  const isMobile = useIsMobile();

  const currentProduct = allProducts[currentIndex];
  const currentCategory = currentProduct.category;

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
    setImageLoaded(false);
  };

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % allProducts.length);
    setImageLoaded(false);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + allProducts.length) % allProducts.length);
    setImageLoaded(false);
  }, []);

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

  // Swipe handlers
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) prevSlide();
    else if (info.offset.x < -swipeThreshold) nextSlide();
  };

  const isThisProductTransitioning = isTransitioning && transitionData?.productId === currentProduct.id;

  // Smooth slide animation
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '80%' : '-80%',
      opacity: 0,
      scale: 0.85,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-80%' : '80%',
      opacity: 0,
      scale: 0.85,
    }),
  };

  const smoothTransition = {
    duration: 0.85,
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

  // Category header animation
  const categoryVariants = {
    enter: { opacity: 0, y: -10 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

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

      {/* Animated spotlight */}
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

      {/* Dynamic Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-20 px-6 md:px-16 pt-10 md:pt-16"
      >
        <div className="mb-2">
          <span className="text-[9px] md:text-[10px] tracking-[0.35em] uppercase text-orange/80 font-sans font-medium">
            Performance
          </span>
        </div>
        {/* Dynamic Category Title */}
        <div className="overflow-hidden h-[3.5rem] md:h-[4.5rem]">
          <AnimatePresence mode="wait">
            <motion.h2 
              key={currentCategory}
              variants={categoryVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="display-hero text-foreground"
              style={{ fontSize: 'clamp(1.6rem, 4.5vw, 3rem)', letterSpacing: '-0.015em' }}
            >
              {currentCategory}<span className="text-orange">.</span>
            </motion.h2>
          </AnimatePresence>
        </div>
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
            {/* Specular light glow */}
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

            {/* Floor shadow */}
            <div 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[110%] h-[60%] pointer-events-none"
              style={{
                background: `
                  radial-gradient(ellipse 100% 100% at 50% 0%, rgba(0,0,0,0.85) 0%, transparent 50%),
                  radial-gradient(ellipse 80% 60% at 50% 10%, rgba(30, 40, 60, 0.3) 0%, transparent 60%)
                `,
                filter: 'blur(35px)',
                transform: 'translateY(65%) scaleY(0.5)',
              }}
            />
            
            {/* Reflection line */}
            <div 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[2px] pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.05) 70%, transparent 100%)',
                transform: 'translateY(20px)',
              }}
            />

            {/* Skeleton loading placeholder */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-full h-48 bg-gradient-to-r from-white/5 via-white/10 to-white/5 animate-pulse rounded-lg" />
              </div>
            )}

            {/* Boat image */}
            <motion.img
              layoutId={`boat-image-${currentProduct.id}`}
              ref={(el) => { imageRefs.current[currentIndex] = el; }}
              src={currentProduct.image}
              alt={currentProduct.name}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-auto object-contain relative z-10 pointer-events-none transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              animate={{
                y: isHovered && !isMobile ? -15 : 0,
                scale: isHovered && !isMobile ? 1.04 : 1,
              }}
              transition={{ 
                y: { type: 'spring', stiffness: 120, damping: 15 },
                scale: { type: 'spring', stiffness: 120, damping: 15 },
              }}
              style={{
                filter: `
                  drop-shadow(0 50px 100px rgba(0,0,0,0.75)) 
                  drop-shadow(0 25px 50px rgba(0,0,0,0.55))
                `,
                opacity: isThisProductTransitioning ? 0 : undefined,
              }}
            />

            {/* Mobile swipe hint */}
            {isMobile && (
              <motion.div
                className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-full pt-6 pointer-events-none flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <motion.span animate={{ x: [-4, 4, -4] }} transition={{ duration: 1.2, repeat: Infinity }} className="text-foreground/45 text-lg">←</motion.span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-foreground/45 font-sans">Deslize</span>
                <motion.span animate={{ x: [4, -4, 4] }} transition={{ duration: 1.2, repeat: Infinity }} className="text-foreground/45 text-lg">→</motion.span>
              </motion.div>
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

      {/* Model name + tagline + LEVEL BADGE */}
      <div className="absolute bottom-24 md:bottom-20 left-1/2 -translate-x-1/2 text-center z-20 px-6">
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
            <h3 className="display-hero text-foreground mb-2" style={{ fontSize: 'clamp(1.6rem, 4.5vw, 3rem)', letterSpacing: '0.1em' }}>
              {currentProduct.name}
            </h3>
            
            {/* Level Badge with Color */}
            <span className={`text-xs md:text-sm font-medium tracking-wide ${currentProduct.levelColor}`}>
              {currentProduct.level}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Dots - Grouped by Category */}
      <div className="absolute bottom-8 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 md:gap-1.5 z-30 items-center">
        {allProducts.map((product, index) => {
          // Add category separator
          const prevProduct = index > 0 ? allProducts[index - 1] : null;
          const isNewCategory = prevProduct && prevProduct.category !== product.category;
          
          return (
            <div key={product.id} className="flex items-center gap-2 md:gap-1.5">
              {/* Category separator line */}
              {isNewCategory && (
                <div className="w-px h-3 bg-foreground/15 mx-1" />
              )}
              
              <motion.button
                onClick={() => goToSlide(index)}
                className="relative group p-2 md:p-1.5 min-w-[40px] min-h-[40px] md:min-w-0 md:min-h-0 flex items-center justify-center"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className={`w-2.5 h-2.5 md:w-2 md:h-2 rounded-full transition-all duration-250 ${
                    index === currentIndex ? 'bg-orange' : 'bg-foreground/20 group-hover:bg-foreground/40'
                  }`}
                  animate={{ scale: index === currentIndex ? 1.3 : 1 }}
                />
                {index === currentIndex && (
                  <motion.div
                    className="absolute inset-0 m-auto w-6 h-6 md:w-4 md:h-4 rounded-full border border-orange/40"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.25 }}
                  />
                )}
              </motion.button>
            </div>
          );
        })}
      </div>

      {/* Product Counter */}
      <div className="absolute top-10 md:top-16 right-6 md:right-16 z-20">
        <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-foreground/30 font-mono">
          {String(currentIndex + 1).padStart(2, '0')} / {String(allProducts.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
};

export default ProductShowcase;
