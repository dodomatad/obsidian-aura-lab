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

const ProductSlide = ({ product, index }: { product: Product; index: number }) => {
  const slideRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: slideRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);

  return (
    <div
      ref={slideRef}
      className="h-screen w-full snap-start snap-always flex items-center justify-center relative"
    >
      {/* Background gradient per slide */}
      <div 
        className="absolute inset-0"
        style={{
          background: index === 0 
            ? 'linear-gradient(135deg, hsl(0 0% 6%) 0%, hsl(220 20% 8%) 100%)'
            : 'linear-gradient(135deg, hsl(220 20% 8%) 0%, hsl(0 0% 6%) 100%)',
        }}
      />

      {/* Main Content - Asymmetric Layout */}
      <div className="relative w-full h-full flex items-center">
        {/* Lifestyle Image - 80% of screen */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ y: imageY, scale: imageScale }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-[85%] max-w-5xl h-auto object-contain"
            style={{
              filter: 'drop-shadow(0 60px 100px rgba(0,0,0,0.5))',
            }}
          />
        </motion.div>

        {/* Glassmorphism Spec Card - Corner positioning */}
        <motion.div
          initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`absolute ${index === 0 ? 'bottom-16 left-8 md:left-16' : 'bottom-16 right-8 md:right-16'} z-20`}
        >
          <div className="glass-card px-6 py-5 min-w-[200px]">
            <div className="text-xs tracking-widest text-muted-foreground mb-3 uppercase">
              {product.tagline}
            </div>
            <h3 className="display-hero text-foreground text-3xl md:text-4xl mb-4">
              {product.name}
            </h3>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between gap-8">
                <span className="text-muted-foreground">Estabilidade</span>
                <span className="text-foreground">{product.specs.stability}</span>
              </div>
              <div className="flex justify-between gap-8">
                <span className="text-muted-foreground">Velocidade</span>
                <span className="text-foreground">{product.specs.speed}</span>
              </div>
              <div className="flex justify-between gap-8">
                <span className="text-muted-foreground">Boca</span>
                <span className="text-foreground">{product.specs.beam}</span>
              </div>
              <div className="flex justify-between gap-8">
                <span className="text-muted-foreground">Peso</span>
                <span className="text-foreground">{product.specs.weight}</span>
              </div>
              <div className="divider-line my-3" />
              <div className="flex justify-between gap-8">
                <span className="text-muted-foreground">Nível</span>
                <span className="text-foreground">{product.specs.level}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Large Product Name - Background */}
        <div 
          className={`absolute ${index === 0 ? 'top-24 right-8 md:right-16 text-right' : 'top-24 left-8 md:left-16 text-left'} z-5 pointer-events-none`}
        >
          <h2 
            className="display-hero select-none"
            style={{
              fontSize: 'clamp(4rem, 15vw, 14rem)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.08)',
            }}
          >
            {product.name}
          </h2>
        </div>
      </div>
    </div>
  );
};

const ProductShowcase = () => {
  return (
    <section className="w-full snap-y snap-mandatory overflow-y-auto h-[200vh]" style={{ scrollSnapType: 'y mandatory' }}>
      {products.map((product, index) => (
        <ProductSlide key={product.id} product={product} index={index} />
      ))}
    </section>
  );
};

export default ProductShowcase;