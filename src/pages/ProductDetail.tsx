import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import CustomCursor from '@/components/CustomCursor';
import MagneticButton from '@/components/MagneticButton';
import { useTransition } from '@/context/TransitionContext';

// Import all boat images
import boatPono from '@/assets/boat-pono.png';
import boatSurfski from '@/assets/boat-surfski.png';
import boatPink from '@/assets/boat-pink.png';
import boatCarbon from '@/assets/boat-carbon.png';
import boatCamo from '@/assets/boat-camo.png';

interface ColorOption {
  id: string;
  name: string;
  color: string;
  image: string;
}

interface ProductData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  specs: {
    length: string;
    beam: string;
    weight: string;
    capacity: string;
    material: string;
    level: string;
  };
  features: string[];
  colors: ColorOption[];
  defaultImage: string;
}

const productsData: Record<string, ProductData> = {
  pono: {
    id: 'pono',
    name: 'PONO',
    tagline: 'Contemplação Pura',
    description: 'O PONO foi projetado para aqueles que buscam equilíbrio entre performance e estabilidade. Ideal para longas travessias costeiras e momentos de contemplação no mar.',
    specs: {
      length: '5.20m',
      beam: '65cm',
      weight: '18kg',
      capacity: '120kg',
      material: 'Fibra de Carbono + Kevlar',
      level: 'Iniciante a Intermediário',
    },
    features: [
      'Cockpit ergonômico com ajuste lombar',
      'Proa hidrodinâmica para mínima resistência',
      'Sistema de drenagem automática',
      'Compartimentos estanques para equipamentos',
      'Acabamento UV resistant',
    ],
    colors: [
      { id: 'default', name: 'Branco Ártico', color: '#E8E8E8', image: boatPono },
      { id: 'pink', name: 'Rosa Sunset', color: '#E8A4B8', image: boatPink },
      { id: 'carbon', name: 'Carbono Stealth', color: '#2A2A2A', image: boatCarbon },
      { id: 'camo', name: 'Camuflagem Ocean', color: '#4A6741', image: boatCamo },
    ],
    defaultImage: boatPono,
  },
  infinite: {
    id: 'infinite',
    name: 'INFINITE',
    tagline: 'Adrenalina Absoluta',
    description: 'O INFINITE é a escolha dos campeões. Desenvolvido para alta performance em competições e treinos intensivos, oferece velocidade máxima e resposta precisa.',
    specs: {
      length: '6.40m',
      beam: '42cm',
      weight: '11kg',
      capacity: '95kg',
      material: 'Carbono Pré-Preg Aeroespacial',
      level: 'Avançado a Elite',
    },
    features: [
      'Geometria de ataque para velocidade máxima',
      'Leme integrado com controle por pedal',
      'Cockpit de competição otimizado',
      'Peso ultraleve sem comprometer rigidez',
      'Hidrodinâmica testada em túnel de vento',
    ],
    colors: [
      { id: 'default', name: 'Branco Performance', color: '#F0F0F0', image: boatSurfski },
      { id: 'carbon', name: 'Full Carbon', color: '#1A1A1A', image: boatCarbon },
      { id: 'camo', name: 'Tactical Green', color: '#3D4F3A', image: boatCamo },
    ],
    defaultImage: boatSurfski,
  },
};

const specLabels: Record<string, string> = {
  length: 'Comprimento',
  beam: 'Boca',
  weight: 'Peso',
  capacity: 'Capacidade',
  material: 'Material',
  level: 'Nível',
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isTransitioning, justTransitioned } = useTransition();
  const [selectedColor, setSelectedColor] = useState<string>('default');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showBoatImage, setShowBoatImage] = useState(false);

  const product = id ? productsData[id] : null;

  useEffect(() => {
    // Fade in after mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Show the boat image after the transition animation completes
  useEffect(() => {
    if (justTransitioned || !isTransitioning) {
      // Small delay to ensure smooth handoff from transition overlay
      const timer = setTimeout(() => {
        setShowBoatImage(true);
      }, isTransitioning ? 0 : 400);
      return () => clearTimeout(timer);
    }
  }, [justTransitioned, isTransitioning]);

  const handleBack = () => {
    setIsExiting(true);
    // Quick exit transition
    setTimeout(() => {
      navigate('/');
    }, 200);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground/60">Produto não encontrado</p>
      </div>
    );
  }

  const currentImage = product.colors.find(c => c.id === selectedColor)?.image || product.defaultImage;

  return (
    <>
      <CustomCursor />
      
      <motion.div 
        className="min-h-screen bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded && !isExiting ? 1 : 0 }}
        transition={{ duration: isExiting ? 0.2 : 0.6 }}
      >
        {/* Background texture - Carbon fiber pattern */}
        <div 
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            opacity: 0.03,
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 2px,
                rgba(255,255,255,0.1) 2px,
                rgba(255,255,255,0.1) 4px
              ),
              repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 2px,
                rgba(255,255,255,0.05) 2px,
                rgba(255,255,255,0.05) 4px
              )
            `,
            backgroundSize: '8px 8px',
          }}
        />

        {/* Water texture overlay */}
        <div 
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            opacity: 0.08,
            background: `
              radial-gradient(ellipse 100% 100% at 80% 20%, rgba(100, 150, 200, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse 80% 80% at 20% 80%, rgba(50, 100, 150, 0.1) 0%, transparent 50%)
            `,
          }}
        />

        {/* Magnetic Back button - Fixed top left */}
        <MagneticButton
          onClick={handleBack}
          className="fixed top-6 left-6 z-50 cursor-pointer"
        >
          <motion.div
            className="flex items-center gap-3 px-5 py-3 rounded-full group"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ 
              background: 'rgba(255, 255, 255, 0.1)',
              scale: 1.02,
            }}
          >
            <motion.div
              className="flex items-center justify-center w-8 h-8 rounded-full bg-foreground/10"
              whileHover={{ x: -3 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <ArrowLeft className="w-4 h-4 text-foreground/80" />
            </motion.div>
            <span className="text-xs tracking-[0.2em] uppercase text-foreground/70 group-hover:text-foreground transition-colors">
              Voltar
            </span>
          </motion.div>
        </MagneticButton>

        {/* Main layout */}
        <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
          
          {/* Left: Sticky boat image */}
          <div className="lg:w-1/2 lg:sticky lg:top-0 lg:h-screen flex items-center justify-center p-8 lg:p-16">
            <motion.div
              className="relative w-full max-w-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Spotlight effect */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 80% 50% at 50% 30%, rgba(255,255,255,0.12) 0%, transparent 60%)',
                  filter: 'blur(40px)',
                }}
              />

              {/* Boat image with color transition - hidden during transition to avoid duplication */}
              <motion.img
                key={selectedColor}
                src={currentImage}
                alt={product.name}
                className="w-full h-auto object-contain relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: showBoatImage ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  filter: 'drop-shadow(0 60px 100px rgba(0,0,0,0.5))',
                }}
              />

              {/* Product name watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
                <span 
                  className="display-hero"
                  style={{
                    fontSize: 'clamp(8rem, 20vw, 20rem)',
                    color: 'transparent',
                    WebkitTextStroke: '1px rgba(255,255,255,0.04)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {product.name}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right: Scrollable content */}
          <div className="lg:w-1/2 px-8 lg:px-16 py-24 lg:py-32">
            <motion.div
              className="max-w-xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Header */}
              <div className="mb-12">
                <span className="text-xs tracking-[0.35em] uppercase text-foreground/50 font-sans font-medium block mb-4">
                  {product.tagline}
                </span>
                <h1 
                  className="display-hero text-foreground mb-6"
                  style={{
                    fontSize: 'clamp(3.5rem, 10vw, 7rem)',
                    letterSpacing: '-0.03em',
                    lineHeight: 0.95,
                  }}
                >
                  {product.name}
                </h1>
                <p className="text-xl text-foreground/60 leading-relaxed font-sans font-light">
                  {product.description}
                </p>
              </div>

              {/* Divider with gradient */}
              <div className="w-full h-px bg-gradient-to-r from-foreground/30 via-foreground/10 to-transparent mb-12" />

              {/* Specifications - Table Style */}
              <div className="mb-16">
                <h2 className="text-sm tracking-[0.3em] uppercase text-foreground/50 font-sans font-medium mb-8">
                  Especificações Técnicas
                </h2>
                
                {/* Specs table */}
                <div className="border border-foreground/10 divide-y divide-foreground/10">
                  {Object.entries(product.specs).map(([key, value], index) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className="flex items-center justify-between px-6 py-5 hover:bg-foreground/[0.02] transition-colors group"
                    >
                      <span className="text-sm tracking-[0.15em] uppercase text-foreground/40 font-sans group-hover:text-foreground/60 transition-colors">
                        {specLabels[key] || key}
                      </span>
                      <span className="text-lg text-foreground font-sans font-medium">
                        {value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-16">
                <h2 className="text-sm tracking-[0.3em] uppercase text-foreground/50 font-sans font-medium mb-8">
                  Características
                </h2>
                <ul className="space-y-5">
                  {product.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.05 }}
                      className="flex items-start gap-5 text-foreground/70 font-sans group"
                    >
                      <span className="flex-shrink-0 mt-2 w-3 h-px bg-foreground/40 group-hover:w-6 group-hover:bg-foreground/60 transition-all duration-300" />
                      <span className="text-base leading-relaxed group-hover:text-foreground/90 transition-colors">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Color Selector */}
              <div className="mb-16">
                <h2 className="text-sm tracking-[0.3em] uppercase text-foreground/50 font-sans font-medium mb-6">
                  Cores Disponíveis
                </h2>
                <div className="flex gap-5">
                  {product.colors.map((color) => (
                    <motion.button
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      className="relative group"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div 
                        className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                          selectedColor === color.id 
                            ? 'border-foreground ring-2 ring-foreground/20 ring-offset-2 ring-offset-background' 
                            : 'border-foreground/20 hover:border-foreground/50'
                        }`}
                        style={{ backgroundColor: color.color }}
                      />
                      {/* Tooltip */}
                      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        <span className="text-[10px] text-foreground/60 tracking-wide bg-background/80 px-2 py-1 rounded">
                          {color.name}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-foreground/20 via-foreground/10 to-transparent mb-12" />

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <a
                  href={`https://wa.me/5500000000000?text=Olá! Gostaria de saber mais sobre o modelo ${product.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 px-12 py-6 bg-foreground text-background font-sans text-sm tracking-[0.2em] uppercase hover:bg-foreground/90 transition-all duration-300 group"
                >
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Consultar Especialista
                </a>
                <p className="text-xs text-foreground/40 mt-5 tracking-wide">
                  Resposta em até 24 horas úteis
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProductDetail;
