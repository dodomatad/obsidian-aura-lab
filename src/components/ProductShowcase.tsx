import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import boatPono from '@/assets/boat-pono.png';
import boatSurfski from '@/assets/boat-surfski.png';

interface Hotspot {
  id: string;
  label: string;
  description: string;
  position: { x: string; y: string };
  lineEnd: { x: string; y: string };
}

interface Product {
  id: string;
  name: string;
  tagline: string;
  image: string;
  specs: {
    stability: string;
    speed: string;
    beam: string;
    weight: string;
    level: string;
  };
  hotspots: Hotspot[];
}

const products: Product[] = [
  {
    id: 'pono',
    name: 'PONO',
    tagline: 'Contemplação Pura',
    image: boatPono,
    specs: {
      stability: 'Alta',
      speed: 'Moderada',
      beam: '65cm',
      weight: '18kg',
      level: 'Iniciante',
    },
    hotspots: [
      {
        id: 'bow',
        label: 'Proa Hidrodinâmica',
        description: 'Design que corta a água com mínima resistência',
        position: { x: '15%', y: '45%' },
        lineEnd: { x: '5%', y: '25%' },
      },
      {
        id: 'cockpit',
        label: 'Cockpit Ergonômico',
        description: 'Conforto absoluto para longas travessias',
        position: { x: '50%', y: '40%' },
        lineEnd: { x: '50%', y: '15%' },
      },
      {
        id: 'stern',
        label: 'Popa Estabilizadora',
        description: 'Máximo equilíbrio em qualquer condição',
        position: { x: '85%', y: '45%' },
        lineEnd: { x: '95%', y: '25%' },
      },
    ],
  },
  {
    id: 'infinite',
    name: 'INFINITE',
    tagline: 'Adrenalina Absoluta',
    image: boatSurfski,
    specs: {
      stability: 'Baixa',
      speed: 'Extrema',
      beam: '42cm',
      weight: '11kg',
      level: 'Experiente',
    },
    hotspots: [
      {
        id: 'bow',
        label: 'Proa de Ataque',
        description: 'Geometria agressiva para velocidade máxima',
        position: { x: '12%', y: '48%' },
        lineEnd: { x: '3%', y: '28%' },
      },
      {
        id: 'cockpit',
        label: 'Cockpit de Performance',
        description: 'Posição otimizada para remadas potentes',
        position: { x: '48%', y: '42%' },
        lineEnd: { x: '48%', y: '12%' },
      },
      {
        id: 'stern',
        label: 'Leme Integrado',
        description: 'Controle preciso em alta velocidade',
        position: { x: '88%', y: '48%' },
        lineEnd: { x: '97%', y: '28%' },
      },
    ],
  },
];

const quotes = [
  {
    text: "A água não resiste. A água flui.",
    author: "Lao Tzu"
  },
  {
    text: "O mar, uma vez que lança seu feitiço, mantém-nos em sua rede de maravilhas para sempre.",
    author: "Jacques Cousteau"
  }
];

// Pulsing Hotspot Component
const HotspotDot = ({ 
  hotspot, 
  isActive, 
  onClick,
  isMobile = false
}: { 
  hotspot: Hotspot; 
  isActive: boolean; 
  onClick: () => void;
  isMobile?: boolean;
}) => {
  return (
    <motion.div
      className="absolute cursor-pointer z-30"
      style={{ left: hotspot.position.x, top: hotspot.position.y }}
      onClick={onClick}
      whileHover={{ scale: 1.3 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Outer pulse ring */}
      <motion.div
        className="absolute -inset-3 rounded-full"
        style={{ background: 'rgba(6, 182, 212, 0.2)' }}
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.6, 0, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Inner dot */}
      <motion.div
        className="w-3 h-3 md:w-4 md:h-4 rounded-full relative"
        style={{
          background: isActive 
            ? 'linear-gradient(135deg, #06b6d4, #22d3ee)' 
            : 'rgba(6, 182, 212, 0.8)',
          boxShadow: isActive 
            ? '0 0 20px rgba(6, 182, 212, 0.8), 0 0 40px rgba(6, 182, 212, 0.4)' 
            : '0 0 10px rgba(6, 182, 212, 0.5)',
        }}
        animate={{
          scale: isActive ? [1, 1.2, 1] : [1, 1.15, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Connecting line to tooltip (desktop only) */}
      <AnimatePresence>
        {isActive && !isMobile && (
          <motion.svg
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 1, pathLength: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute pointer-events-none"
            style={{
              left: '50%',
              top: '50%',
              width: '100px',
              height: '80px',
              overflow: 'visible',
            }}
          >
            <motion.line
              x1="0"
              y1="0"
              x2={parseInt(hotspot.lineEnd.x) < parseInt(hotspot.position.x) ? -60 : 60}
              y2="-50"
              stroke="rgba(6, 182, 212, 0.6)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.svg>
        )}
      </AnimatePresence>

      {/* Glassmorphism Tooltip */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute ${
              parseInt(hotspot.position.x) > 50 ? 'right-6' : 'left-6'
            } -top-2 md:-top-16 z-40 min-w-[180px] md:min-w-[220px]`}
          >
            <div
              className="p-3 md:p-4 rounded-xl"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              }}
            >
              <div 
                className="text-xs font-medium tracking-wide text-cyan-400 mb-1"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                {hotspot.label}
              </div>
              <div className="text-[11px] md:text-xs text-white/70 leading-relaxed">
                {hotspot.description}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// HUD Spec Line Component
const HUDSpecLine = ({ 
  label, 
  value, 
  position,
  delay = 0
}: { 
  label: string; 
  value: string;
  position: 'left' | 'right';
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: position === 'left' ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-center gap-3 ${position === 'right' ? 'flex-row-reverse text-right' : ''}`}
    >
      <div className="flex flex-col">
        <span 
          className="text-[10px] uppercase tracking-widest text-white/40"
          style={{ fontFamily: '"JetBrains Mono", monospace' }}
        >
          {label}
        </span>
        <span 
          className="text-lg md:text-xl font-medium text-cyan-400"
          style={{ fontFamily: '"JetBrains Mono", monospace' }}
        >
          {value}
        </span>
      </div>
      {/* Connecting line */}
      <div 
        className={`h-px flex-1 min-w-[40px] md:min-w-[80px] ${position === 'left' ? 'bg-gradient-to-r' : 'bg-gradient-to-l'} from-white/30 to-transparent`}
      />
    </motion.div>
  );
};

const QuoteSection = ({ quote, index }: { quote: typeof quotes[0]; index: number }) => {
  return (
    <div className="min-h-[50vh] md:h-[90vh] w-full snap-start snap-always flex items-center justify-center relative py-12 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent" />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center px-6 md:px-16 max-w-4xl"
      >
        <p 
          className="display-hero text-foreground/80 italic"
          style={{ fontSize: 'clamp(1.1rem, 3.5vw, 3rem)', lineHeight: 1.4 }}
        >
          "{quote.text}"
        </p>
        <p className="text-muted-foreground text-sm mt-4 md:mt-8 tracking-widest uppercase">
          — {quote.author}
        </p>
      </motion.div>
    </div>
  );
};

const ProductSlide = ({ product, index }: { product: Product; index: number }) => {
  const slideRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileAutoplayIndex, setMobileAutoplayIndex] = useState(-1);
  
  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile auto-play sequence for hotspots
  const { scrollYProgress } = useScroll({
    target: slideRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    if (!isMobile) return;
    
    const unsubscribe = scrollYProgress.on('change', (value) => {
      // When in view (0.3 to 0.7), cycle through hotspots
      if (value > 0.25 && value < 0.75) {
        const hotspotIndex = Math.floor((value - 0.25) / 0.16);
        const clampedIndex = Math.min(Math.max(hotspotIndex, 0), 2);
        setMobileAutoplayIndex(clampedIndex);
        setActiveHotspot(product.hotspots[clampedIndex]?.id || null);
      } else {
        setMobileAutoplayIndex(-1);
        setActiveHotspot(null);
      }
    });

    return () => unsubscribe();
  }, [isMobile, scrollYProgress, product.hotspots]);

  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 0.95]);

  const handleHotspotClick = (id: string) => {
    // Haptic feedback on mobile if available
    if (isMobile && 'vibrate' in navigator) {
      navigator.vibrate(10);
    }
    setActiveHotspot(activeHotspot === id ? null : id);
  };

  return (
    <div
      ref={slideRef}
      className="min-h-screen w-full snap-start snap-always flex flex-col items-center justify-center relative overflow-hidden py-8 md:py-16"
      style={{ touchAction: 'pan-y' }}
    >
      {/* Radial Vignette Background - Focus on product */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at center 45%, transparent 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.8) 100%),
            radial-gradient(ellipse 80% 60% at center 40%, ${index === 0 ? '#021019' : '#010c14'} 0%, #010810 50%, #000000 100%)
          `,
        }}
      />

      {/* Breathing Glow - Spotlight behind boat */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[90%] md:w-[70%] h-[50%] md:h-[60%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.15) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Main Content - Sticky-like centered layout */}
      <div className="relative w-full flex flex-col items-center justify-center z-10">
        
        {/* HUD Specs - Left Side (Desktop) */}
        <div className="hidden md:flex absolute left-8 lg:left-16 top-1/2 -translate-y-1/2 flex-col gap-6 z-20">
          <HUDSpecLine label="Peso" value={product.specs.weight} position="left" delay={0} />
          <HUDSpecLine label="Boca" value={product.specs.beam} position="left" delay={0.1} />
        </div>

        {/* HUD Specs - Right Side (Desktop) */}
        <div className="hidden md:flex absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 flex-col gap-6 z-20">
          <HUDSpecLine label="Velocidade" value={product.specs.speed} position="right" delay={0.15} />
          <HUDSpecLine label="Nível" value={product.specs.level} position="right" delay={0.2} />
        </div>

        {/* Product Name - Huge Background Text */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        >
          <h2 
            className="display-hero select-none"
            style={{
              fontSize: 'clamp(5rem, 20vw, 18rem)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.04)',
            }}
          >
            {product.name}
          </h2>
        </motion.div>

        {/* Boat Image Container with Hotspots */}
        <motion.div 
          className="relative w-[95%] md:w-[75%] max-w-5xl h-[50vh] md:h-[60vh] flex items-center justify-center"
          style={{ y: imageY, scale: imageScale, touchAction: 'pan-y' }}
        >
          {/* Boat Image */}
          <motion.img
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain"
            style={{
              filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.6))',
            }}
          />

          {/* Interactive Hotspots */}
          {product.hotspots.map((hotspot, i) => (
            <HotspotDot
              key={hotspot.id}
              hotspot={hotspot}
              isActive={activeHotspot === hotspot.id}
              onClick={() => handleHotspotClick(hotspot.id)}
              isMobile={isMobile}
            />
          ))}

          {/* Mobile: Touch instruction */}
          {isMobile && mobileAutoplayIndex === -1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/40 text-[10px] uppercase tracking-widest"
            >
              <span>👆</span>
              <span>Toque para explorar</span>
            </motion.div>
          )}
        </motion.div>

        {/* Mobile: Title + Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:hidden text-center mt-4 px-4"
        >
          <div className="text-[10px] tracking-widest text-cyan-400/80 uppercase mb-1">
            {product.tagline}
          </div>
          <h3 className="display-hero text-white text-2xl">
            {product.name}
          </h3>
        </motion.div>

        {/* Mobile: Horizontal Swipeable HUD Specs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="md:hidden w-full mt-4"
        >
          <div 
            className="flex gap-2 px-4 overflow-x-auto scrollbar-hide pb-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {[
              { label: 'Peso', value: product.specs.weight },
              { label: 'Boca', value: product.specs.beam },
              { label: 'Vel.', value: product.specs.speed },
              { label: 'Nível', value: product.specs.level },
            ].map((spec, i) => (
              <div 
                key={spec.label}
                className="flex-shrink-0 px-4 py-3 rounded-lg min-w-[85px] text-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div 
                  className="text-[9px] text-white/40 uppercase tracking-wider"
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                >
                  {spec.label}
                </div>
                <div 
                  className="text-sm text-cyan-400 font-medium mt-0.5"
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                >
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Desktop: Glassmorphism Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <div 
            className="px-8 py-5 rounded-2xl flex items-center gap-10"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div>
              <div 
                className="text-[10px] tracking-widest text-cyan-400/80 uppercase"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                {product.tagline}
              </div>
              <h3 className="display-hero text-white text-2xl mt-1">
                {product.name}
              </h3>
            </div>
            
            <div className="h-10 w-px bg-white/10" />
            
            <motion.button
              className="px-6 py-3 text-xs tracking-widest uppercase text-white rounded-xl transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(6, 182, 212, 0.1) 100%)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
              }}
              whileHover={{ 
                boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)',
                borderColor: 'rgba(6, 182, 212, 0.5)',
              }}
            >
              Explorar
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const ProductShowcase = () => {
  return (
    <section className="w-full">
      {/* First Quote */}
      <QuoteSection quote={quotes[0]} index={0} />
      
      {/* Products with scroll snap */}
      <div className="snap-y snap-mandatory" style={{ scrollSnapType: 'y mandatory' }}>
        {products.map((product, index) => (
          <ProductSlide key={product.id} product={product} index={index} />
        ))}
      </div>
      
      {/* Second Quote */}
      <QuoteSection quote={quotes[1]} index={1} />
    </section>
  );
};

export default ProductShowcase;
