import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useTransition } from '@/context/TransitionContext';
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
    tagline: 'Contemplação Pura',
    image: boatPono,
  },
  {
    id: 'infinite',
    name: 'INFINITE',
    tagline: 'Adrenalina Absoluta',
    image: boatSurfski,
  },
];

const ProductSlide = ({ 
  product, 
  index,
  progress,
  onProductClick,
  isTransitioning,
  transitionProductId,
}: { 
  product: Product; 
  index: number;
  progress: number;
  onProductClick: (product: Product, imageRef: HTMLImageElement) => void;
  isTransitioning: boolean;
  transitionProductId: string | null;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  // Calculate parallax offset for the background text
  const textParallax = (progress - index) * 100;
  
  // Hide this specific image if it's the one being transitioned
  const isThisProductTransitioning = isTransitioning && transitionProductId === product.id;

  return (
    <div 
      className="relative w-screen h-screen flex-shrink-0 flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dramatic top lighting effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 40% at 50% 0%, rgba(255,255,255,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 50% 50%, transparent 0%, rgba(0,0,0,0.4) 70%)
          `,
        }}
      />

      {/* Giant background name with parallax */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{
          x: textParallax,
        }}
      >
        <h2 
          className="display-hero whitespace-nowrap"
          style={{
            fontSize: 'clamp(15rem, 35vw, 40rem)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.04)',
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}
        >
          {product.name}
        </h2>
      </motion.div>

      {/* Boat container with hover effects */}
      <motion.div
        className="relative z-10 w-[70%] max-w-4xl cursor-pointer"
        animate={{
          y: isHovered ? -10 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
        }}
        onClick={() => {
          if (imageRef.current) {
            onProductClick(product, imageRef.current);
          }
        }}
      >
        {/* Spotlight glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: isHovered ? 0.4 : 0.2,
          }}
          transition={{ duration: 0.4 }}
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.1) 0%, transparent 60%)',
            filter: 'blur(60px)',
            transform: 'translateY(-20%)',
          }}
        />

        {/* Boat image - hidden during transition to avoid duplication */}
        <motion.img
          ref={imageRef}
          src={product.image}
          alt={product.name}
          className="w-full h-auto object-contain relative z-10"
          animate={{
            opacity: isThisProductTransitioning ? 0 : 1,
          }}
          transition={{ duration: 0.1 }}
          style={{
            filter: 'drop-shadow(0 60px 100px rgba(0,0,0,0.6))',
          }}
        />

        {/* Hover label */}
        <motion.div
          className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-full pt-8 pointer-events-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10,
          }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-foreground/60 font-sans">
            Explorar
          </span>
        </motion.div>
      </motion.div>

      {/* Model name at bottom */}
      <motion.div
        className="absolute bottom-16 md:bottom-24 left-1/2 -translate-x-1/2 text-center z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-foreground/40 font-sans block mb-2">
          {product.tagline}
        </span>
        <h3 
          className="display-hero text-foreground"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            letterSpacing: '0.1em',
          }}
        >
          {product.name}
        </h3>
      </motion.div>

      {/* Slide indicator dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {products.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === index ? 'bg-foreground/80 scale-100' : 'bg-foreground/20 scale-75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const ProductShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { startTransition, saveScrollPosition, isTransitioning, transitionData } = useTransition();

  const handleProductClick = (product: Product, imageElement: HTMLImageElement) => {
    // Save scroll position before transitioning
    saveScrollPosition();
    
    const rect = imageElement.getBoundingClientRect();
    startTransition({
      productId: product.id,
      productName: product.name,
      imageUrl: product.image,
      imageRect: rect,
    });
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform vertical scroll to horizontal movement
  const x = useTransform(
    scrollYProgress, 
    [0, 1], 
    ["0%", `-${(products.length - 1) * 100}%`]
  );

  // Track which slide we're on for parallax
  const slideProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, products.length - 1]
  );

  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = slideProgress.on('change', setCurrentProgress);
    return () => unsubscribe();
  }, [slideProgress]);

  // Mobile: Vertical scroll cards with click navigation
  if (isMobile) {
    return (
      <section className="relative py-20">
        <div className="space-y-8 px-4">
          {products.map((product, index) => {
            const mobileImageRef = useRef<HTMLImageElement>(null);
            const isThisMobileProductTransitioning = isTransitioning && transitionData?.productId === product.id;
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative aspect-[4/3] flex items-center justify-center overflow-hidden cursor-pointer"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.02) 0%, transparent 70%)',
                }}
                onClick={() => {
                  if (mobileImageRef.current) {
                    handleProductClick(product, mobileImageRef.current);
                  }
                }}
              >
                {/* Background name */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span 
                    className="display-hero text-transparent"
                    style={{
                      fontSize: '8rem',
                      WebkitTextStroke: '1px rgba(255,255,255,0.03)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {product.name}
                  </span>
                </div>

                {/* Boat - hidden during transition */}
                <motion.img
                  ref={mobileImageRef}
                  src={product.image}
                  alt={product.name}
                  className="relative z-10 w-[85%] h-auto object-contain"
                  animate={{
                    opacity: isThisMobileProductTransitioning ? 0 : 1,
                  }}
                  transition={{ duration: 0.1 }}
                  style={{
                    filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.5))',
                  }}
                />

                {/* Name overlay */}
                <div className="absolute bottom-4 left-0 right-0 text-center z-20">
                  <span className="text-[8px] tracking-[0.25em] uppercase text-foreground/40 block mb-1">
                    {product.tagline}
                  </span>
                  <span className="display-hero text-foreground text-xl tracking-[0.08em]">
                    {product.name}
                  </span>
                </div>
                
                {/* Tap hint */}
                <div className="absolute top-4 right-4 z-20">
                  <span className="text-[8px] tracking-[0.15em] uppercase text-foreground/30">
                    Toque para explorar
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    );
  }

  // Desktop: Horizontal scroll with pinning
  return (
    <section 
      ref={containerRef} 
      className="relative"
      style={{ 
        height: `${products.length * 100}vh`,
      }}
    >
      {/* Sticky container for horizontal scroll */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Horizontal track */}
        <motion.div 
          className="flex h-full"
          style={{ x }}
        >
          {products.map((product, index) => (
            <ProductSlide 
              key={product.id} 
              product={product} 
              index={index}
              progress={currentProgress}
              onProductClick={handleProductClick}
              isTransitioning={isTransitioning}
              transitionProductId={transitionData?.productId || null}
            />
          ))}
        </motion.div>

        {/* Navigation hint */}
        <motion.div
          className="absolute top-1/2 right-8 -translate-y-1/2 z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[9px] tracking-[0.2em] uppercase text-foreground/30 rotate-90 origin-center whitespace-nowrap">
              Scroll
            </span>
          </motion.div>
        </motion.div>

        {/* Progress bar */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-32 h-px bg-foreground/10 z-30">
          <motion.div
            className="h-full bg-foreground/60"
            style={{ 
              scaleX: useTransform(scrollYProgress, [0, 1], [0, 1]),
              transformOrigin: 'left',
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
