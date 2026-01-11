import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useTransition } from '@/context/TransitionContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronRight } from 'lucide-react';
import boatPono from '@/assets/boat-pono.png';
import boatSurfski from '@/assets/boat-surfski.png';

interface Product {
  id: string;
  name: string;
  tagline: string;
  image: string;
}

// Surfskis de Elite
const surfskiProducts: Product[] = [
  {
    id: 'pono',
    name: 'PONO',
    tagline: 'Estabilidade e Controle',
    image: boatPono,
  },
  {
    id: 'infinite',
    name: 'INFINITE',
    tagline: 'Velocidade Pura',
    image: boatSurfski,
  },
  {
    id: 'azimut',
    name: 'AZIMUT',
    tagline: 'A Evolução da Espécie',
    image: boatSurfski,
  },
  {
    id: 'moana',
    name: 'MOANA',
    tagline: 'Conquiste o Oceano',
    image: boatPono,
  },
  {
    id: 'dw',
    name: 'DW',
    tagline: 'Mestre das Ondas',
    image: boatSurfski,
  },
];

// Canoas Havaianas
const canoaProducts: Product[] = [
  {
    id: 'oc1-race',
    name: 'OC1 RACE',
    tagline: 'Performance Polinésia',
    image: boatPono,
  },
  {
    id: 'oc1-touring',
    name: 'OC1 TOURING',
    tagline: 'Aventura no Mar',
    image: boatSurfski,
  },
  {
    id: 'oc6',
    name: 'OC6',
    tagline: 'Espírito de Equipe',
    image: boatPono,
  },
];

// Acessórios
const gearProducts: Product[] = [
  {
    id: 'remo-carbono',
    name: 'REMO CARBONO',
    tagline: 'Leveza Absoluta',
    image: boatSurfski,
  },
  {
    id: 'bolsa-estanque',
    name: 'BOLSA ESTANQUE',
    tagline: 'Proteção Total',
    image: boatPono,
  },
  {
    id: 'fitas-amarracao',
    name: 'FITAS',
    tagline: 'Transporte Seguro',
    image: boatSurfski,
  },
  {
    id: 'colete',
    name: 'COLETE',
    tagline: 'Segurança Premium',
    image: boatPono,
  },
];

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product, imageElement: HTMLImageElement) => void;
  imageRef: React.RefObject<HTMLImageElement>;
}

const ProductCard = ({ product, onProductClick, imageRef }: ProductCardProps) => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      className="flex-shrink-0 w-[75vw] sm:w-[50vw] md:w-[35vw] lg:w-[28vw] max-w-[400px] group cursor-pointer"
      whileHover={isMobile ? undefined : { y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={() => {
        if (imageRef.current) {
          onProductClick(product, imageRef.current);
        }
      }}
    >
      <div 
        className="relative p-4 md:p-6 rounded-lg overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        {/* Spotlight glow */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 30%, rgba(50, 55, 65, 0.6) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 50% 50%, rgba(249, 115, 22, 0.05) 0%, transparent 40%)
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
                drop-shadow(0 30px 60px rgba(0,0,0,0.5)) 
                drop-shadow(0 15px 30px rgba(0,0,0,0.4))
              `,
            }}
          />
        </div>

        {/* Product Info */}
        <div className="relative z-10">
          <span className="text-[9px] tracking-[0.3em] uppercase text-foreground/40 font-sans block mb-1">
            {product.tagline}
          </span>
          <h3 className="text-lg md:text-xl font-medium tracking-wider text-foreground">
            {product.name}
          </h3>
        </div>

        {/* Hover accent line */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange via-orange-glow to-transparent origin-left"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
};

interface CategoryRowProps {
  title: string;
  subtitle?: string;
  products: Product[];
  onProductClick: (product: Product, imageElement: HTMLImageElement) => void;
}

const CategoryRow = ({ title, subtitle, products, onProductClick }: CategoryRowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="mb-12 md:mb-20"
    >
      {/* Section Header */}
      <div className="px-6 md:px-16 mb-6 md:mb-8 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-6 md:w-10 h-px bg-gradient-to-r from-orange to-transparent" />
            <span className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-orange/80 font-sans font-medium">
              {subtitle || 'Coleção'}
            </span>
          </div>
          <h2 
            className="display-hero text-foreground"
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              letterSpacing: '-0.01em',
            }}
          >
            {title}<span className="text-orange">.</span>
          </h2>
        </div>

        {/* Desktop scroll hint */}
        <button 
          onClick={scrollRight}
          className="hidden md:flex items-center gap-2 text-foreground/40 hover:text-foreground transition-colors group"
        >
          <span className="text-xs tracking-wider uppercase">Ver Mais</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative">
        {/* Gradient fade right */}
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide px-6 md:px-16 pb-4"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {products.map((product, index) => (
            <div 
              key={product.id} 
              style={{ scrollSnapAlign: 'start' }}
            >
              <ProductCard
                product={product}
                onProductClick={onProductClick}
                imageRef={{ current: imageRefs.current[index] } as React.RefObject<HTMLImageElement>}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ProductShowcase = () => {
  const { startTransition, saveScrollPosition } = useTransition();

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

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 100% 50% at 50% 0%, rgba(34, 34, 34, 0.4) 0%, transparent 60%),
            radial-gradient(ellipse 80% 30% at 50% 100%, rgba(249, 115, 22, 0.03) 0%, transparent 50%)
          `,
        }}
      />

      {/* Surfskis de Elite */}
      <CategoryRow
        title="Surfski de Elite"
        subtitle="Performance"
        products={surfskiProducts}
        onProductClick={handleProductClick}
      />

      {/* Canoas Havaianas */}
      <CategoryRow
        title="Canoas Havaianas"
        subtitle="Tradição"
        products={canoaProducts}
        onProductClick={handleProductClick}
      />

      {/* Acessórios & Gear */}
      <CategoryRow
        title="Acessórios & Gear"
        subtitle="Equipamentos"
        products={gearProducts}
        onProductClick={handleProductClick}
      />
    </section>
  );
};

export default ProductShowcase;
