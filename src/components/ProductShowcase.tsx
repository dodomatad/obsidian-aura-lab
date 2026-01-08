import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import boatPono from '@/assets/boat-pono.png';
import boatSurfski from '@/assets/boat-surfski.png';
import TargetReticle from './TargetReticle';
import MagneticButton from './MagneticButton';

interface Hotspot {
  id: string;
  label: string;
  description: string;
  position: { x: string; y: string };
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
        position: { x: '18%', y: '48%' },
      },
      {
        id: 'cockpit',
        label: 'Cockpit Ergonômico',
        description: 'Conforto absoluto para longas travessias',
        position: { x: '50%', y: '42%' },
      },
      {
        id: 'stern',
        label: 'Popa Estabilizadora',
        description: 'Máximo equilíbrio em qualquer condição',
        position: { x: '82%', y: '48%' },
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
        position: { x: '15%', y: '50%' },
      },
      {
        id: 'cockpit',
        label: 'Cockpit de Performance',
        description: 'Posição otimizada para remadas potentes',
        position: { x: '48%', y: '44%' },
      },
      {
        id: 'stern',
        label: 'Leme Integrado',
        description: 'Controle preciso em alta velocidade',
        position: { x: '85%', y: '50%' },
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

// Asymmetric HUD Spec Component
const HUDSpec = ({ 
  label, 
  value, 
  delay = 0,
  index
}: { 
  label: string; 
  value: string;
  delay?: number;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* Grid alignment line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />
      
      <div className="pl-6">
        <span 
          className="block text-[9px] uppercase tracking-[0.25em] text-white/30 mb-1"
          style={{ fontFamily: '"JetBrains Mono", monospace' }}
        >
          {label}
        </span>
        <span 
          className="block text-2xl md:text-3xl font-light text-white tracking-tight"
          style={{ fontFamily: '"JetBrains Mono", monospace' }}
        >
          {value}
        </span>
      </div>
      
      {/* Horizontal connector line */}
      <motion.div 
        className="absolute top-1/2 left-full ml-4 h-px bg-gradient-to-r from-white/20 to-transparent"
        initial={{ width: 0 }}
        whileInView={{ width: '60px' }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
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
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: slideRef,
    offset: ["start end", "end start"]
  });

  // Mobile auto-play sequence
  useEffect(() => {
    if (!isMobile) return;
    
    const unsubscribe = scrollYProgress.on('change', (value) => {
      if (value > 0.3 && value < 0.7) {
        const hotspotIndex = Math.floor((value - 0.3) / 0.13);
        const clampedIndex = Math.min(Math.max(hotspotIndex, 0), 2);
        setActiveHotspot(product.hotspots[clampedIndex]?.id || null);
      } else {
        setActiveHotspot(null);
      }
    });

    return () => unsubscribe();
  }, [isMobile, scrollYProgress, product.hotspots]);

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.9]);

  const handleHotspotClick = (id: string) => {
    if (isMobile && 'vibrate' in navigator) {
      navigator.vibrate(10);
    }
    setActiveHotspot(activeHotspot === id ? null : id);
  };

  const getHotspotSide = (hotspot: Hotspot): 'left' | 'right' => {
    const xPercent = parseInt(hotspot.position.x);
    return xPercent < 50 ? 'left' : 'right';
  };

  return (
    <div
      ref={slideRef}
      className="min-h-screen w-full snap-start snap-always relative overflow-hidden"
      style={{ touchAction: 'pan-y' }}
    >
      {/* Engineering Grid Background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial Vignette - Focus on product */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 60% 50%, transparent 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.95) 100%)
          `,
        }}
      />

      {/* Huge Overlapping Product Name (Behind boat) */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-1/2 -translate-y-1/2 left-0 md:left-8 pointer-events-none z-0 overflow-hidden"
      >
        <h2 
          className="display-hero select-none whitespace-nowrap"
          style={{
            fontSize: 'clamp(6rem, 25vw, 22rem)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.06)',
            letterSpacing: '-0.02em',
          }}
        >
          {product.name}
        </h2>
      </motion.div>

      {/* Main Layout: Asymmetric with boat offset right */}
      <div className="relative w-full h-screen flex items-center">
        
        {/* Left Column: Specs (Desktop) */}
        <div className="hidden md:flex absolute left-8 lg:left-16 top-1/2 -translate-y-1/2 flex-col gap-8 z-20">
          <HUDSpec label="Peso" value={product.specs.weight} delay={0} index={0} />
          <HUDSpec label="Boca" value={product.specs.beam} delay={0.1} index={1} />
          <HUDSpec label="Velocidade" value={product.specs.speed} delay={0.2} index={2} />
          <HUDSpec label="Nível" value={product.specs.level} delay={0.3} index={3} />
        </div>

        {/* Boat Container - Offset to right */}
        <motion.div 
          className="absolute right-0 md:right-[5%] top-1/2 -translate-y-1/2 w-[95%] md:w-[70%] h-[55vh] md:h-[65vh] flex items-center justify-center z-10"
          style={{ scale: imageScale, touchAction: 'pan-y' }}
        >
          {/* Spotlight Glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.08) 0%, transparent 50%)',
              filter: 'blur(40px)',
            }}
          />

          {/* Boat Image */}
          <motion.img
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain"
            style={{
              filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.5))',
            }}
          />

          {/* Target Reticle Hotspots */}
          {!isMobile && product.hotspots.map((hotspot) => (
            <TargetReticle
              key={hotspot.id}
              hotspot={hotspot}
              isActive={activeHotspot === hotspot.id}
              onClick={() => handleHotspotClick(hotspot.id)}
              side={getHotspotSide(hotspot)}
            />
          ))}

          {/* Mobile: Simple pulsing dots */}
          {isMobile && product.hotspots.map((hotspot) => (
            <motion.div
              key={hotspot.id}
              className="absolute z-30"
              style={{ left: hotspot.position.x, top: hotspot.position.y }}
              onClick={() => handleHotspotClick(hotspot.id)}
            >
              <motion.div
                className="w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50 flex items-center justify-center"
                animate={{
                  scale: activeHotspot === hotspot.id ? [1, 1.3, 1] : [1, 1.1, 1],
                  borderColor: activeHotspot === hotspot.id ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)',
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Product Info: Bottom left aligned (Desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden md:block absolute bottom-16 left-8 lg:left-16 z-20"
        >
          <div className="relative">
            {/* Vertical alignment line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-white/20" />
            
            <div className="pl-6">
              <div 
                className="text-[10px] tracking-[0.3em] text-white/40 uppercase mb-2"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                {product.tagline}
              </div>
              <h3 
                className="display-hero text-white text-4xl lg:text-5xl mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                {product.name}
              </h3>
              
              <MagneticButton className="inline-block">
                <motion.button
                  className="px-8 py-4 text-[11px] tracking-[0.2em] uppercase text-white transition-all duration-300 relative overflow-hidden group"
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                  whileHover={{ borderColor: 'rgba(255, 255, 255, 0.5)' }}
                >
                  <span className="relative z-10">Explorar Modelo</span>
                  <motion.div 
                    className="absolute inset-0 bg-white/5"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </MagneticButton>
            </div>
          </div>
        </motion.div>

        {/* Mobile: Title + Specs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:hidden absolute bottom-24 left-0 right-0 px-6"
        >
          <div 
            className="text-[9px] tracking-[0.3em] text-white/40 uppercase mb-1"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            {product.tagline}
          </div>
          <h3 className="display-hero text-white text-3xl mb-4">
            {product.name}
          </h3>
          
          {/* Horizontal specs row */}
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {[
              { label: 'Peso', value: product.specs.weight },
              { label: 'Boca', value: product.specs.beam },
              { label: 'Vel.', value: product.specs.speed },
              { label: 'Nível', value: product.specs.level },
            ].map((spec) => (
              <div 
                key={spec.label}
                className="flex-shrink-0 border-l border-white/10 pl-3"
              >
                <div 
                  className="text-[8px] text-white/30 uppercase tracking-wider"
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                >
                  {spec.label}
                </div>
                <div 
                  className="text-sm text-white font-light"
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                >
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mobile active hotspot info */}
        {isMobile && activeHotspot && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute top-8 left-4 right-4 z-40"
          >
            <div
              className="p-4"
              style={{
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div 
                className="text-[10px] tracking-[0.2em] text-white/50 uppercase mb-1"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                {product.hotspots.find(h => h.id === activeHotspot)?.label}
              </div>
              <div className="text-xs text-white/80">
                {product.hotspots.find(h => h.id === activeHotspot)?.description}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const ProductShowcase = () => {
  return (
    <section className="w-full">
      {/* First Quote */}
      <QuoteSection quote={quotes[0]} index={0} />
      
      {/* Products */}
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
