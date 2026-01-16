import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Ruler, Move, Scale, Weight, Layers, TrendingUp } from 'lucide-react';
import CustomCursor from '@/components/CustomCursor';
import MagneticButton from '@/components/MagneticButton';
import VideoBackground from '@/components/VideoBackground';
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
    tagline: 'Estabilidade e Controle',
    description: 'Ideal para iniciantes e longas travessias com estabilidade total.',
    specs: {
      length: '6.20m',
      beam: '42cm',
      weight: '11kg',
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
    tagline: 'Velocidade Pura',
    description: 'Design agressivo para alta performance em downwind.',
    specs: {
      length: '6.40m',
      beam: '44cm',
      weight: '12kg',
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
  azimut: {
    id: 'azimut',
    name: 'AZIMUT',
    tagline: 'A Evolução da Espécie',
    description: 'O AZIMUT representa o ápice da engenharia náutica. Desenvolvido para atletas que exigem o máximo em velocidade e manobrabilidade.',
    specs: {
      length: '6.20m',
      beam: '44cm',
      weight: '12kg',
      capacity: '100kg',
      material: 'Carbono Pré-Preg',
      level: 'Avançado',
    },
    features: [
      'Design hidrodinâmico otimizado',
      'Cockpit de competição',
      'Sistema de leme responsivo',
      'Construção ultraleve',
      'Acabamento premium',
    ],
    colors: [
      { id: 'default', name: 'Branco Performance', color: '#F0F0F0', image: boatSurfski },
      { id: 'carbon', name: 'Full Carbon', color: '#1A1A1A', image: boatCarbon },
    ],
    defaultImage: boatSurfski,
  },
  moana: {
    id: 'moana',
    name: 'MOANA',
    tagline: 'Conquiste o Oceano',
    description: 'O MOANA foi criado para quem busca aventura e confiança no mar aberto. Estabilidade superior para longas jornadas.',
    specs: {
      length: '5.50m',
      beam: '58cm',
      weight: '16kg',
      capacity: '115kg',
      material: 'Fibra de Vidro + Carbono',
      level: 'Intermediário',
    },
    features: [
      'Alta estabilidade primária',
      'Cockpit espaçoso e confortável',
      'Compartimentos de carga',
      'Ideal para travessias',
      'Construção durável',
    ],
    colors: [
      { id: 'default', name: 'Branco Oceano', color: '#E8E8E8', image: boatPono },
      { id: 'camo', name: 'Camuflagem', color: '#4A6741', image: boatCamo },
    ],
    defaultImage: boatPono,
  },
  dw: {
    id: 'dw',
    name: 'DW',
    tagline: 'Mestre das Ondas',
    description: 'O DW (Downwind) é especializado para surfar ondas oceânicas. Projetado para performance máxima em condições de vento.',
    specs: {
      length: '6.50m',
      beam: '46cm',
      weight: '13kg',
      capacity: '95kg',
      material: 'Carbono Aeroespacial',
      level: 'Elite',
    },
    features: [
      'Proa projetada para ondas',
      'Estabilidade em condições extremas',
      'Aceleração rápida',
      'Controle preciso de leme',
      'Para atletas experientes',
    ],
    colors: [
      { id: 'default', name: 'Branco Racing', color: '#F0F0F0', image: boatSurfski },
      { id: 'carbon', name: 'Stealth Carbon', color: '#1A1A1A', image: boatCarbon },
    ],
    defaultImage: boatSurfski,
  },
  'oc1-race': {
    id: 'oc1-race',
    name: 'OC1 RACE',
    tagline: 'Performance Polinésia',
    description: 'Canoa havaiana de competição. O OC1 Race combina a tradição polinésia com tecnologia de ponta para máxima velocidade.',
    specs: {
      length: '6.50m',
      beam: '40cm',
      weight: '10kg',
      capacity: '105kg',
      material: 'Carbono + Kevlar',
      level: 'Avançado',
    },
    features: [
      'Design tradicional havaiano',
      'Ama (flutuador) em carbono',
      'Assento ergonômico ajustável',
      'Conexões Iako reforçadas',
      'Homologada para competições',
    ],
    colors: [
      { id: 'default', name: 'Branco Tradicional', color: '#E8E8E8', image: boatPono },
      { id: 'carbon', name: 'Carbon Race', color: '#2A2A2A', image: boatCarbon },
    ],
    defaultImage: boatPono,
  },
  'oc1-touring': {
    id: 'oc1-touring',
    name: 'OC1 TOURING',
    tagline: 'Aventura no Mar',
    description: 'Versão touring da canoa havaiana. Mais estável e confortável para longas remadas e exploração costeira.',
    specs: {
      length: '6.40m',
      beam: '52cm',
      weight: '17kg',
      capacity: '120kg',
      material: 'Fibra de Vidro + Carbono',
      level: 'Iniciante a Intermediário',
    },
    features: [
      'Estabilidade aumentada',
      'Compartimento de carga',
      'Conforto para longas remadas',
      'Ama reforçada',
      'Fácil entrada e saída',
    ],
    colors: [
      { id: 'default', name: 'Branco Explorer', color: '#E8E8E8', image: boatPono },
      { id: 'camo', name: 'Ocean Camo', color: '#4A6741', image: boatCamo },
    ],
    defaultImage: boatPono,
  },
  oc6: {
    id: 'oc6',
    name: 'OC6',
    tagline: 'Espírito de Equipe',
    description: 'A tradicional canoa havaiana para 6 remadores. Perfeita para equipes, competições e experiências em grupo.',
    specs: {
      length: '12.20m',
      beam: '55cm',
      weight: '180kg',
      capacity: '600kg',
      material: 'Fibra de Vidro Náutica',
      level: 'Todos os níveis',
    },
    features: [
      '6 assentos ergonômicos',
      'Ama estabilizadora reforçada',
      'Estrutura para competição',
      'Transporte facilitado',
      'Tradição havaiana autêntica',
    ],
    colors: [
      { id: 'default', name: 'Branco Equipe', color: '#E8E8E8', image: boatPono },
    ],
    defaultImage: boatPono,
  },
};

const specLabels: Record<string, { label: string; icon: typeof Ruler }> = {
  length: { label: 'Comprimento', icon: Ruler },
  beam: { label: 'Boca', icon: Move },
  weight: { label: 'Peso', icon: Weight },
  capacity: { label: 'Capacidade', icon: Scale },
  material: { label: 'Material', icon: Layers },
  level: { label: 'Nível', icon: TrendingUp },
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isTransitioning, justTransitioned } = useTransition();
  const [selectedColor, setSelectedColor] = useState<string>('default');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showBoatImage, setShowBoatImage] = useState(false);
  const [contentRevealed, setContentRevealed] = useState(false);

  const handleVideoRevealComplete = useCallback(() => {
    setContentRevealed(true);
  }, []);

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
        className="min-h-screen bg-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded && !isExiting ? 1 : 0 }}
        transition={{ duration: isExiting ? 0.2 : 0.6 }}
      >
        {/* Immersive Video Background */}
        <VideoBackground 
          className="z-0" 
          onRevealComplete={handleVideoRevealComplete}
        />

        {/* Giant outline text background */}
        <motion.div 
          className="fixed inset-0 pointer-events-none z-[1] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: contentRevealed ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span 
            className="display-hero whitespace-nowrap select-none"
            style={{
              fontSize: 'clamp(20rem, 40vw, 50rem)',
              color: 'transparent',
              WebkitTextStroke: '2px rgba(255,255,255,0.05)',
              letterSpacing: '-0.02em',
              transform: 'rotate(-5deg)',
            }}
          >
            {product.name}
          </span>
        </motion.div>

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

              {/* Boat image with layoutId for shared element transition */}
              <motion.img
                layoutId={`boat-image-${product.id}`}
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

          {/* Right: Scrollable content - vertically centered */}
          <div className="lg:w-1/2 px-8 lg:px-16 py-24 lg:py-32 flex items-center">
            <motion.div
              className="max-w-xl w-full"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Header - Delayed entrance after video reveal */}
              <motion.div 
                className="mb-16"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: contentRevealed ? 1 : 0, y: contentRevealed ? 0 : 40 }}
                transition={{ duration: 0.8, delay: 0, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <span className="text-sm tracking-[0.35em] uppercase text-foreground/50 font-sans font-medium block mb-4">
                  {product.tagline}
                </span>
                <h1 
                  className="display-hero text-foreground mb-8"
                  style={{
                    fontSize: 'clamp(4rem, 12vw, 8rem)',
                    letterSpacing: '-0.03em',
                    lineHeight: 0.9,
                  }}
                >
                  {product.name}
                </h1>
                <p 
                  className="text-lg lg:text-xl font-sans font-light leading-loose"
                  style={{ color: '#E0E0E0' }}
                >
                  {product.description}
                </p>
              </motion.div>

              {/* Divider with gradient - Delayed */}
              <motion.div 
                className="w-full h-px bg-gradient-to-r from-foreground/30 via-foreground/10 to-transparent mb-12"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: contentRevealed ? 1 : 0, scaleX: contentRevealed ? 1 : 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{ transformOrigin: 'left' }}
              />

              {/* Specifications - Grid of Cards - Delayed */}
              <motion.div 
                className="mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: contentRevealed ? 1 : 0, y: contentRevealed ? 0 : 30 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <h2 className="text-sm tracking-[0.3em] uppercase text-foreground/50 font-sans font-medium mb-8">
                  Especificações Técnicas
                </h2>
                
                {/* Specs Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(product.specs).map(([key, value], index) => {
                    const spec = specLabels[key];
                    const IconComponent = spec?.icon || Ruler;
                    return (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: contentRevealed ? 1 : 0, y: contentRevealed ? 0 : 20 }}
                        transition={{ delay: 0.2 + index * 0.06 }}
                        className="group relative p-5 border border-foreground/10 hover:border-foreground/25 transition-all duration-300 hover:bg-foreground/[0.02] backdrop-blur-sm"
                      >
                        {/* Icon */}
                        <IconComponent className="w-4 h-4 text-foreground/30 mb-3 group-hover:text-foreground/50 transition-colors" />
                        
                        {/* Value - Large */}
                        <div className="text-xl lg:text-2xl font-sans font-semibold text-foreground mb-1 tracking-tight">
                          {value}
                        </div>
                        
                        {/* Label - Small */}
                        <div className="text-[10px] tracking-[0.2em] uppercase text-foreground/40 group-hover:text-foreground/60 transition-colors">
                          {spec?.label || key}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Features - Delayed */}
              <motion.div 
                className="mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: contentRevealed ? 1 : 0, y: contentRevealed ? 0 : 30 }}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <h2 className="text-sm tracking-[0.3em] uppercase text-foreground/50 font-sans font-medium mb-8">
                  Características
                </h2>
                <ul className="space-y-5">
                  {product.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: contentRevealed ? 1 : 0, x: contentRevealed ? 0 : -20 }}
                      transition={{ delay: 0.3 + index * 0.04 }}
                      className="flex items-start gap-5 text-foreground/70 font-sans group"
                    >
                      <span className="flex-shrink-0 mt-2 w-3 h-px bg-foreground/40 group-hover:w-6 group-hover:bg-foreground/60 transition-all duration-300" />
                      <span className="text-base leading-relaxed group-hover:text-foreground/90 transition-colors">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Color Selector - Delayed */}
              <motion.div 
                className="mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: contentRevealed ? 1 : 0, y: contentRevealed ? 0 : 30 }}
                transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
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
                        <span className="text-[10px] text-foreground/60 tracking-wide bg-background/80 backdrop-blur-sm px-2 py-1 rounded">
                          {color.name}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Divider - Delayed */}
              <motion.div 
                className="w-full h-px bg-gradient-to-r from-foreground/20 via-foreground/10 to-transparent mb-12"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: contentRevealed ? 1 : 0, scaleX: contentRevealed ? 1 : 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{ transformOrigin: 'left' }}
              />

              {/* CTA Button - Delayed */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: contentRevealed ? 1 : 0, y: contentRevealed ? 0 : 20 }}
                transition={{ delay: 0.45, duration: 0.6 }}
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
