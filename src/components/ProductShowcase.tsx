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

  // Swipe handlers
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) prevSlide();
    else if (info.offset.x < -swipeThreshold) nextSlide();
  };

  const isThisProductTransitioning = isTransitioning && transitionData?.productId === currentProduct.id;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 25 : -25,
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
      scale: 0.8,
      rotateY: direction > 0 ? -25 : 25,
    }),
  };

  const textVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Dramatic charcoal-to-black gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 120% 100% at 50% 30%, rgba(25, 30, 40, 0.7) 0%, rgba(0, 0, 0, 0.98) 60%),
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 50%)
          `,
        }}
      />

      {/* Animated spotlight behind boat */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 50% 45%, rgba(60, 80, 120, 0.35) 0%, transparent 55%),
            radial-gradient(ellipse 50% 35% at 50% 50%, rgba(249, 115, 22, 0.08) 0%, transparent 45%)
          `,
        }}
      />

      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-20 px-6 md:px-16 pt-12 md:pt-20"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 md:w-12 h-px bg-gradient-to-r from-orange to-transparent" />
          <span className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-orange/80 font-sans font-medium">
            Performance
          </span>
        </div>
        <h2 
          className="display-hero text-foreground"
          style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)', letterSpacing: '-0.02em' }}
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
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="display-hero whitespace-nowrap"
            style={{
              fontSize: isMobile ? 'clamp(5rem, 20vw, 9rem)' : 'clamp(14rem, 30vw, 36rem)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.025)',
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
        className="relative z-10 h-[55vh] md:h-[60vh] flex items-center justify-center mt-4"
        style={{ touchAction: 'pan-y', perspective: 1200 }}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        drag={isMobile ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
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
            transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
            className="absolute w-[88%] md:w-[58%] max-w-3xl cursor-pointer"
            style={{ transformStyle: 'preserve-3d' }}
            onClick={() => {
              const currentImageRef = imageRefs.current[currentIndex];
              if (currentImageRef) handleProductClick(currentProduct, currentImageRef);
            }}
          >
            {/* Specular light glow */}
            <motion.div
              className="absolute inset-0 pointer-events-none -z-10"
              animate={{ opacity: isHovered ? 0.9 : 0.6 }}
              transition={{ duration: 0.4 }}
              style={{
                background: `
                  radial-gradient(ellipse 100% 80% at 50% 30%, rgba(70, 90, 130, 0.9) 0%, transparent 50%),
                  radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255, 255, 255, 0.12) 0%, transparent 40%),
                  radial-gradient(ellipse 60% 40% at 50% 55%, rgba(249, 115, 22, 0.1) 0%, transparent 35%)
                `,
                filter: 'blur(50px)',
              }}
            />

            {/* Floor shadow / reflection */}
            <div 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100%] h-[50%] pointer-events-none"
              style={{
                background: `
                  radial-gradient(ellipse 100% 90% at 50% -20%, rgba(0,0,0,0.8) 0%, transparent 60%),
                  radial-gradient(ellipse 70% 50% at 50% 10%, rgba(0,0,0,0.5) 0%, transparent 55%)
                `,
                filter: 'blur(35px)',
                transform: 'translateY(85%) scaleY(0.45)',
              }}
            />

            {/* Boat image with 3D transform */}
            <motion.img
              layoutId={`boat-image-${currentProduct.id}`}
              ref={(el) => { imageRefs.current[currentIndex] = el; }}
              src={currentProduct.image}
              alt={currentProduct.name}
              className="w-full h-auto object-contain relative z-10 pointer-events-none"
              animate={{
                opacity: isThisProductTransitioning ? 0 : 1,
                y: isHovered && !isMobile ? -20 : 0,
                scale: isHovered && !isMobile ? 1.06 : 1,
                rotateX: isHovered && !isMobile ? 2 : 0,
              }}
              transition={{ 
                opacity: { duration: 0.1 },
                y: { type: 'spring', stiffness: 150, damping: 18 },
                scale: { type: 'spring', stiffness: 150, damping: 18 },
                rotateX: { type: 'spring', stiffness: 150, damping: 18 },
              }}
              style={{
                filter: `
                  drop-shadow(0 70px 140px rgba(0,0,0,0.85)) 
                  drop-shadow(0 35px 70px rgba(0,0,0,0.65))
                  drop-shadow(0 15px 30px rgba(0,0,0,0.45))
                `,
              }}
            />

            {/* Mobile swipe hint */}
            {isMobile && (
              <motion.div
                className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-full pt-8 pointer-events-none flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <motion.span animate={{ x: [-6, 6, -6] }} transition={{ duration: 1.3, repeat: Infinity }} className="text-foreground/50 text-xl">←</motion.span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/50 font-sans font-medium">Deslize</span>
                <motion.span animate={{ x: [6, -6, 6] }} transition={{ duration: 1.3, repeat: Infinity }} className="text-foreground/50 text-xl">→</motion.span>
              </motion.div>
            )}

            {/* Desktop hover hint */}
            {!isMobile && (
              <motion.div
                className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-full pt-12 pointer-events-none"
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-[10px] tracking-[0.4em] uppercase text-foreground/50 font-sans">Clique para explorar</span>
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
            className="pointer-events-auto w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center group"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
            }}
            whileHover={{ scale: 1.1, background: 'rgba(255, 255, 255, 0.08)' }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-foreground/40 group-hover:text-foreground transition-colors" />
          </motion.button>
          <motion.button
            onClick={nextSlide}
            className="pointer-events-auto w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center group"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
            }}
            whileHover={{ scale: 1.1, background: 'rgba(255, 255, 255, 0.08)' }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-foreground/40 group-hover:text-foreground transition-colors" />
          </motion.button>
        </div>
      )}

      {/* Model name + tagline */}
      <div className="absolute bottom-28 md:bottom-24 left-1/2 -translate-x-1/2 text-center z-20 px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProduct.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-foreground/40 font-sans block mb-2">
              {currentProduct.tagline}
            </span>
            <h3 className="display-hero text-foreground" style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)', letterSpacing: '0.12em' }}>
              {currentProduct.name}
            </h3>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-10 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {surfskiProducts.map((product, index) => (
          <motion.button
            key={product.id}
            onClick={() => goToSlide(index)}
            className="relative group p-3 md:p-2"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className={`w-2.5 h-2.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-orange' : 'bg-foreground/20 group-hover:bg-foreground/40'
              }`}
              animate={{ scale: index === currentIndex ? 1.3 : 0.85 }}
            />
            {index === currentIndex && (
              <motion.div
                className="absolute inset-0 m-auto w-6 h-6 md:w-5 md:h-5 rounded-full border border-orange/40"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </section>
  );
};

// ============================================
// HORIZONTAL SLIDER - For Canoas
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
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
      className="relative py-16 md:py-24 overflow-hidden"
    >
      {/* Subtle background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 40% at 50% 0%, rgba(30, 35, 45, 0.4) 0%, transparent 50%),
            radial-gradient(ellipse 60% 30% at 50% 100%, rgba(249, 115, 22, 0.03) 0%, transparent 40%)
          `,
        }}
      />

      {/* Noise overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Header */}
      <div className="relative z-10 px-6 md:px-16 mb-8 flex items-end justify-between">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-6 md:w-10 h-px bg-gradient-to-r from-orange to-transparent" />
            <span className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-orange/80 font-sans font-medium">
              {subtitle}
            </span>
          </div>
          <h2 className="display-hero text-foreground" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', letterSpacing: '-0.01em' }}>
            {title}<span className="text-orange">.</span>
          </h2>
        </motion.div>

        <button onClick={scrollRight} className="hidden md:flex items-center gap-2 text-foreground/40 hover:text-foreground transition-colors group">
          <span className="text-xs tracking-wider uppercase">Ver Mais</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Horizontal Scroll */}
      <div className="relative">
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="flex gap-5 md:gap-6 overflow-x-auto scrollbar-hide px-6 md:px-16 pb-4"
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex-shrink-0 w-[72vw] sm:w-[48vw] md:w-[32vw] lg:w-[26vw] max-w-[380px] group cursor-pointer"
      style={{ scrollSnapAlign: 'start' }}
      whileHover={isMobile ? undefined : { y: -10 }}
      onClick={() => {
        if (imageRef.current) onProductClick(product, imageRef.current);
      }}
    >
      <div 
        className="relative p-5 md:p-6 rounded-lg overflow-hidden h-full"
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        {/* Hover spotlight */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `
              radial-gradient(ellipse 90% 70% at 50% 25%, rgba(60, 80, 120, 0.5) 0%, transparent 45%),
              radial-gradient(ellipse 70% 50% at 50% 50%, rgba(249, 115, 22, 0.06) 0%, transparent 35%)
            `,
          }}
        />

        {/* Product Image */}
        <div className="relative aspect-[16/10] mb-4 overflow-hidden">
          <img
            ref={imageRef}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            style={{
              filter: `
                drop-shadow(0 35px 70px rgba(0,0,0,0.6)) 
                drop-shadow(0 18px 35px rgba(0,0,0,0.45))
              `,
            }}
          />
        </div>

        {/* Info */}
        <div className="relative z-10">
          <span className="text-[9px] tracking-[0.3em] uppercase text-foreground/40 font-sans block mb-1">
            {product.tagline}
          </span>
          <h3 className="text-lg md:text-xl font-medium tracking-wider text-foreground">
            {product.name}
          </h3>
        </div>

        {/* Accent line */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange via-orange-glow to-transparent"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.4 }}
          style={{ originX: 0 }}
        />
      </div>
    </motion.div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
const ProductShowcase = () => {
  return (
    <>
      {/* Hero 3D Carousel - Surfski de Elite */}
      <Hero3DCarousel />

      {/* Horizontal Slider - Canoas Havaianas */}
      <SliderRow
        title="Canoas Havaianas"
        subtitle="Tradição"
        products={canoaProducts}
      />
    </>
  );
};

export default ProductShowcase;
