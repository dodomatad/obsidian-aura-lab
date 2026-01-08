import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import boatPono from '@/assets/boat-pono.png';
import boatSurfski from '@/assets/boat-surfski.png';

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
  },
];

// Inspirational quotes between sections
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
  
  const { scrollYProgress } = useScroll({
    target: slideRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.05, 0.9]);
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div
      ref={slideRef}
      className="min-h-screen w-full snap-start snap-always flex flex-col md:flex-row items-center justify-center relative overflow-hidden py-16 md:py-32"
      style={{ touchAction: 'pan-y' }}
    >
      {/* Background gradient per slide - Deep Ocean - Tighter on mobile */}
      <div 
        className="absolute inset-0"
        style={{
          background: index === 0 
            ? 'radial-gradient(ellipse 80% 60% at center 40%, #021019 0%, #010810 50%, #000000 100%)'
            : 'radial-gradient(ellipse 80% 60% at center 40%, #010c14 0%, #010810 50%, #000000 100%)',
        }}
      />

      {/* Water Caustics Effect - Animated Light Refraction */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Breathing Glow - Spotlight behind boat */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-[80%] h-[60%] -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.2) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
        
        {/* Rotating caustics */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-[120%] h-[120%] -translate-x-1/2 -translate-y-1/2"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            rotate: { duration: 60, repeat: Infinity, ease: 'linear' },
          }}
          style={{
            background: 'radial-gradient(ellipse at 30% 50%, rgba(6, 182, 212, 0.05) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(6, 182, 212, 0.03) 0%, transparent 40%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* Main Content - Stacked on Mobile, Side by Side on Desktop */}
      <div className="relative w-full flex flex-col items-center justify-center min-h-[70vh] md:min-h-[80vh]">
        
        {/* Large Product Name - Background with parallax - Hidden on small mobile */}
        <motion.div 
          className={`absolute hidden md:block ${index === 0 ? 'top-24 right-8 md:right-16 text-right' : 'top-24 left-8 md:left-16 text-left'} z-5 pointer-events-none`}
          style={{ y: textY }}
        >
          <motion.h2 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="display-hero select-none"
            style={{
              fontSize: 'clamp(4rem, 15vw, 14rem)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.08)',
            }}
          >
            {product.name}
          </motion.h2>
        </motion.div>

        {/* Boat Image with float-up animation */}
        <motion.div 
          className="relative w-full h-[55vh] md:h-auto flex items-center justify-center"
          style={{ y: imageY, scale: imageScale, touchAction: 'pan-y' }}
        >
          <motion.img
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            src={product.image}
            alt={product.name}
            className="w-[95%] md:w-[85%] max-w-5xl h-auto object-contain"
            style={{
              filter: 'drop-shadow(0 60px 100px rgba(0,0,0,0.5))',
            }}
          />
        </motion.div>

        {/* Mobile: Horizontal swipeable spec cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="md:hidden w-full mt-6"
        >
          {/* Product title card */}
          <div className="px-4 mb-4">
            <div 
              className="rounded-xl p-4"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] tracking-widest text-white/60 uppercase">
                    {product.tagline}
                  </div>
                  <h3 className="display-hero text-white text-xl mt-1">
                    {product.name}
                  </h3>
                </div>
                <motion.button
                  className="px-4 py-2 text-xs tracking-widest uppercase text-white rounded-lg"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                  }}
                  animate={{
                    boxShadow: [
                      '0 0 10px rgba(255, 255, 255, 0.05)',
                      '0 0 20px rgba(255, 255, 255, 0.1)',
                      '0 0 10px rgba(255, 255, 255, 0.05)',
                    ],
                  }}
                  transition={{
                    boxShadow: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                  }}
                >
                  Ver
                </motion.button>
              </div>
            </div>
          </div>
          
          {/* Horizontal swipeable cards */}
          <div 
            className="flex gap-3 px-4 overflow-x-auto scrollbar-hide pb-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div 
              className="flex-shrink-0 p-4 rounded-xl min-w-[100px] text-center"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div className="text-[10px] text-white/60 uppercase tracking-wide">Peso</div>
              <div className="text-sm text-white font-medium mt-1">{product.specs.weight}</div>
            </div>
            <div 
              className="flex-shrink-0 p-4 rounded-xl min-w-[100px] text-center"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div className="text-[10px] text-white/60 uppercase tracking-wide">Boca</div>
              <div className="text-sm text-white font-medium mt-1">{product.specs.beam}</div>
            </div>
            <div 
              className="flex-shrink-0 p-4 rounded-xl min-w-[100px] text-center"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div className="text-[10px] text-white/60 uppercase tracking-wide">Nível</div>
              <div className="text-sm text-white font-medium mt-1">{product.specs.level}</div>
            </div>
            <div 
              className="flex-shrink-0 p-4 rounded-xl min-w-[100px] text-center"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div className="text-[10px] text-white/60 uppercase tracking-wide">Velocidade</div>
              <div className="text-sm text-white font-medium mt-1">{product.specs.speed}</div>
            </div>
          </div>
        </motion.div>

        {/* Desktop: True Glassmorphism Spec Card */}
        <motion.div
          initial={{ opacity: 0, x: index === 0 ? -50 : 50, y: 50 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={`hidden md:block absolute ${index === 0 ? 'bottom-16 left-8 md:left-16' : 'bottom-16 right-8 md:right-16'} z-20 group`}
        >
          <div 
            className="px-6 py-5 min-w-[220px] rounded-xl transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.12)]"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div className="text-xs tracking-widest text-white/60 mb-3 uppercase">
              {product.tagline}
            </div>
            <h3 className="display-hero text-white text-3xl md:text-4xl mb-4">
              {product.name}
            </h3>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between gap-8">
                <span className="text-white/50">Estabilidade</span>
                <span className="text-white">{product.specs.stability}</span>
              </div>
              <div className="flex justify-between gap-8">
                <span className="text-white/50">Velocidade</span>
                <span className="text-white">{product.specs.speed}</span>
              </div>
              <div className="flex justify-between gap-8">
                <span className="text-white/50">Boca</span>
                <span className="text-white">{product.specs.beam}</span>
              </div>
              <div className="flex justify-between gap-8">
                <span className="text-white/50">Peso</span>
                <span className="text-white">{product.specs.weight}</span>
              </div>
              <div className="h-px w-full bg-white/10 my-3" />
              <div className="flex justify-between gap-8">
                <span className="text-white/50">Nível</span>
                <span className="text-white">{product.specs.level}</span>
              </div>
            </div>
            
            {/* CTA Button */}
            <motion.button
              className="mt-5 w-full py-3 text-xs tracking-widest uppercase text-white rounded-lg transition-all duration-500"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
              whileHover={{ 
                background: 'rgba(255, 255, 255, 0.15)',
                boxShadow: '0 0 30px rgba(255, 255, 255, 0.15)',
              }}
              animate={{
                boxShadow: [
                  '0 0 10px rgba(255, 255, 255, 0.05)',
                  '0 0 20px rgba(255, 255, 255, 0.1)',
                  '0 0 10px rgba(255, 255, 255, 0.05)',
                ],
              }}
              transition={{
                boxShadow: {
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
              }}
            >
              Iniciar Jornada
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