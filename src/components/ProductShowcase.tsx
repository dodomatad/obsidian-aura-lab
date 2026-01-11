import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useRef, useState, useEffect, useCallback, lazy, Suspense } from 'react';
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

// Surfskis de Elite - Main Hero Products
const surfskiProducts: Product[] = [
  { id: 'pono', name: 'PONO', tagline: 'Estabilidade e Controle', image: boatPono },
  { id: 'infinite', name: 'INFINITE', tagline: 'Velocidade Pura', image: boatSurfski },
  { id: 'azimut', name: 'AZIMUT', tagline: 'A Evolução da Espécie', image: boatSurfski },
  { id: 'moana', name: 'MOANA', tagline: 'Conquiste o Oceano', image: boatPono },
  { id: 'dw', name: 'DW', tagline: 'Mestre das Ondas', image: boatSurfski },
];

// Canoas Havaianas
const canoaProducts: Product[] = [
  { id: 'oc1-race', name: 'OC1 RACE', tagline: 'Performance Polinésia', image: boatPono },
  { id: 'oc1-touring', name: 'OC1 TOURING', tagline: 'Aventura no Mar', image: boatSurfski },
  { id: 'oc6', name: 'OC6', tagline: 'Espírito de Equipe', image: boatPono },
];

// ============================================
// LOADING SKELETON - While carousel loads
// ============================================
const CarouselSkeleton = () => (
  <div className="relative min-h-screen w-full flex items-center justify-center">
    <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
    <motion.div
      className="w-[60%] max-w-2xl h-48 rounded-lg"
      style={{ background: 'rgba(255,255,255,0.03)' }}
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  </div>
);

// ============================================
// HERO 3D CAROUSEL - For Surfski de Elite
// ============================================
const Hero3DCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const { startTransition, saveScrollPosition, isTransitioning, transitionData } = useTransition();
  const isMobile = useIsMobile();

  const currentProduct = surfskiProducts[currentIndex];

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
    setCurrentIndex((prev) => (prev + 1) % surfskiProducts.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + surfskiProducts.length) % surfskiProducts.length);
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

  // Swipe handlers - optimized for mobile
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) prevSlide();
    else if (info.offset.x < -swipeThreshold) nextSlide();
  };

  const isThisProductTransitioning = isTransitioning && transitionData?.productId === currentProduct.id;

  // Optimized variants - reduced transform complexity
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

  const textVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Noise texture overlay - optimized */}
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

      {/* Animated spotlight - reduced animation complexity */}
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

      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-20 px-6 md:px-16 pt-10 md:pt-16"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 md:w-10 h-px bg-gradient-to-r from-orange to-transparent" />
          <span className="text-[9px] md:text-[10px] tracking-[0.35em] uppercase text-orange/80 font-sans font-medium">
            Performance
          </span>
        </div>
        <h2 
          className="display-hero text-foreground"
          style={{ fontSize: 'clamp(1.6rem, 4.5vw, 3rem)', letterSpacing: '-0.015em' }}
        >
          Surfski de Elite<span className="text-orange">.</span>
        </h2>
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
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            className="display-hero whitespace-nowrap"
            style={{
              fontSize: isMobile ? 'clamp(4.5rem, 18vw, 8rem)' : 'clamp(12rem, 26vw, 30rem)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.02)',
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            {currentProduct.name}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* 3D Boat Carousel - GPU accelerated */}
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
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentProduct.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
            className="absolute w-[85%] md:w-[55%] max-w-3xl cursor-pointer"
            onClick={() => {
              const currentImageRef = imageRefs.current[currentIndex];
              if (currentImageRef) handleProductClick(currentProduct, currentImageRef);
            }}
          >
            {/* Specular light glow - simplified */}
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
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[95%] h-[45%] pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 100% 80% at 50% -15%, rgba(0,0,0,0.7) 0%, transparent 55%)',
                filter: 'blur(30px)',
                transform: 'translateY(80%) scaleY(0.4)',
              }}
            />

            {/* Boat image - lazy loaded */}
            <motion.img
              layoutId={`boat-image-${currentProduct.id}`}
              ref={(el) => { imageRefs.current[currentIndex] = el; }}
              src={currentProduct.image}
              alt={currentProduct.name}
              loading="lazy"
              className="w-full h-auto object-contain relative z-10 pointer-events-none"
              animate={{
                opacity: isThisProductTransitioning ? 0 : 1,
                y: isHovered && !isMobile ? -15 : 0,
                scale: isHovered && !isMobile ? 1.04 : 1,
              }}
              transition={{ 
                opacity: { duration: 0.1 },
                y: { type: 'spring', stiffness: 120, damping: 15 },
                scale: { type: 'spring', stiffness: 120, damping: 15 },
              }}
              style={{
                filter: `
                  drop-shadow(0 50px 100px rgba(0,0,0,0.75)) 
                  drop-shadow(0 25px 50px rgba(0,0,0,0.55))
                `,
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

      {/* Model name + tagline */}
      <div className="absolute bottom-24 md:bottom-20 left-1/2 -translate-x-1/2 text-center z-20 px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProduct.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
            <span className="text-[9px] md:text-[10px] tracking-[0.35em] uppercase text-foreground/35 font-sans block mb-1.5">
              {currentProduct.tagline}
            </span>
            <h3 className="display-hero text-foreground" style={{ fontSize: 'clamp(1.6rem, 4.5vw, 3rem)', letterSpacing: '0.1em' }}>
              {currentProduct.name}
            </h3>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-30">
        {surfskiProducts.map((product, index) => (
          <motion.button
            key={product.id}
            onClick={() => goToSlide(index)}
            className="relative group p-2.5 md:p-2"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className={`w-2 h-2 rounded-full transition-all duration-250 ${
                index === currentIndex ? 'bg-orange' : 'bg-foreground/15 group-hover:bg-foreground/35'
              }`}
              animate={{ scale: index === currentIndex ? 1.2 : 0.8 }}
            />
            {index === currentIndex && (
              <motion.div
                className="absolute inset-0 m-auto w-5 h-5 rounded-full border border-orange/35"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </section>
  );
};

// ============================================
// HORIZONTAL SLIDER - For Canoas (Lazy loaded)
// ============================================
interface SliderRowProps {
  title: string;
  subtitle: string;
  products: Product[];
}

const SliderRow = ({ title, subtitle, products }: SliderRowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { startTransition, saveScrollPosition } = useTransition();
  const isMobile = useIsMobile();

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

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7 }}
      className="relative py-14 md:py-20 overflow-hidden"
    >
      {/* Subtle background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 35% at 50% 0%, rgba(25, 30, 40, 0.35) 0%, transparent 45%),
            radial-gradient(ellipse 50% 25% at 50% 100%, rgba(249, 115, 22, 0.025) 0%, transparent 35%)
          `,
        }}
      />

      {/* Header */}
      <div className="relative z-10 px-6 md:px-16 mb-6 flex items-end justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="w-6 md:w-8 h-px bg-gradient-to-r from-orange to-transparent" />
            <span className="text-[9px] md:text-[10px] tracking-[0.35em] uppercase text-orange/75 font-sans font-medium">
              {subtitle}
            </span>
          </div>
          <h2 className="display-hero text-foreground" style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)', letterSpacing: '-0.01em' }}>
            {title}<span className="text-orange">.</span>
          </h2>
        </motion.div>

        <button onClick={scrollRight} className="hidden md:flex items-center gap-1.5 text-foreground/35 hover:text-foreground/70 transition-colors group">
          <span className="text-xs tracking-wider uppercase">Ver Mais</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Horizontal Scroll */}
      <div className="relative">
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute left-0 top-0 bottom-0 w-6 md:w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-5 overflow-x-auto scrollbar-hide px-6 md:px-16 pb-3"
          style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
        >
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} onProductClick={handleProductClick} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// ============================================
// PRODUCT CARD - Glassmorphism style
// ============================================
interface ProductCardProps {
  product: Product;
  index: number;
  onProductClick: (product: Product, imageElement: HTMLImageElement) => void;
  isMobile: boolean;
}

const ProductCard = ({ product, index, onProductClick, isMobile }: ProductCardProps) => {
  const imageRef = useRef<HTMLImageElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="flex-shrink-0 w-[70vw] sm:w-[45vw] md:w-[30vw] lg:w-[24vw] max-w-[350px] group cursor-pointer"
      style={{ scrollSnapAlign: 'start' }}
      whileHover={isMobile ? undefined : { y: -8 }}
      onClick={() => {
        if (imageRef.current) onProductClick(product, imageRef.current);
      }}
    >
      <div 
        className="relative p-4 md:p-5 rounded-lg overflow-hidden h-full"
        style={{
          background: 'rgba(255, 255, 255, 0.018)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.04)',
        }}
      >
        {/* Hover spotlight */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{
            background: `
              radial-gradient(ellipse 85% 65% at 50% 25%, rgba(50, 70, 100, 0.4) 0%, transparent 40%),
              radial-gradient(ellipse 65% 45% at 50% 50%, rgba(249, 115, 22, 0.05) 0%, transparent 30%)
            `,
          }}
        />

        {/* Product Image - lazy loaded */}
        <div className="relative aspect-[16/10] mb-3 overflow-hidden">
          <img
            ref={imageRef}
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain transition-transform duration-400 group-hover:scale-104"
            style={{
              filter: `
                drop-shadow(0 30px 60px rgba(0,0,0,0.55)) 
                drop-shadow(0 15px 30px rgba(0,0,0,0.4))
              `,
            }}
          />
        </div>

        {/* Info */}
        <div className="relative z-10">
          <span className="text-[8px] md:text-[9px] tracking-[0.25em] uppercase text-foreground/35 font-sans block mb-0.5">
            {product.tagline}
          </span>
          <h3 className="text-base md:text-lg font-medium tracking-wider text-foreground">
            {product.name}
          </h3>
        </div>

        {/* Accent line */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange via-orange-glow to-transparent"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.35 }}
          style={{ originX: 0 }}
        />
      </div>
    </motion.div>
  );
};

// ============================================
// MAIN COMPONENT - With Suspense for lazy loading
// ============================================
const ProductShowcase = () => {
  return (
    <Suspense fallback={<CarouselSkeleton />}>
      {/* Hero 3D Carousel - Surfski de Elite */}
      <Hero3DCarousel />

      {/* Horizontal Slider - Canoas Havaianas */}
      <SliderRow
        title="Canoas Havaianas"
        subtitle="Tradição"
        products={canoaProducts}
      />
    </Suspense>
  );
};

export default ProductShowcase;
