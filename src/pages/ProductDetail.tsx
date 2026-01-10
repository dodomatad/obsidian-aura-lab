import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import CustomCursor from '@/components/CustomCursor';

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

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState<string>('default');
  const [isLoaded, setIsLoaded] = useState(false);

  const product = id ? productsData[id] : null;

  useEffect(() => {
    // Fade in after mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Back button */}
        <motion.button
          onClick={() => navigate('/')}
          className="fixed top-6 left-6 z-50 flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs tracking-[0.2em] uppercase">Voltar</span>
        </motion.button>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row min-h-screen">
          
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
                  background: 'radial-gradient(ellipse 80% 50% at 50% 30%, rgba(255,255,255,0.08) 0%, transparent 60%)',
                  filter: 'blur(40px)',
                }}
              />

              {/* Boat image with color transition */}
              <motion.img
                key={selectedColor}
                src={currentImage}
                alt={product.name}
                className="w-full h-auto object-contain relative z-10"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
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
                    WebkitTextStroke: '1px rgba(255,255,255,0.03)',
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
                <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 font-sans block mb-4">
                  {product.tagline}
                </span>
                <h1 
                  className="display-hero text-foreground mb-6"
                  style={{
                    fontSize: 'clamp(3rem, 8vw, 6rem)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                  }}
                >
                  {product.name}
                </h1>
                <p className="text-lg text-foreground/60 leading-relaxed font-sans font-light">
                  {product.description}
                </p>
              </div>

              {/* Divider */}
              <div className="w-16 h-px bg-foreground/20 mb-12" />

              {/* Specifications */}
              <div className="mb-16">
                <h2 className="text-xs tracking-[0.25em] uppercase text-foreground/40 font-sans mb-8">
                  Especificações
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  {Object.entries(product.specs).map(([key, value], index) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className="border-l border-foreground/10 pl-4"
                    >
                      <span className="text-[9px] tracking-[0.2em] uppercase text-foreground/30 block mb-1 font-sans">
                        {key === 'length' ? 'Comprimento' : 
                         key === 'beam' ? 'Boca' :
                         key === 'weight' ? 'Peso' :
                         key === 'capacity' ? 'Capacidade' :
                         key === 'material' ? 'Material' : 'Nível'}
                      </span>
                      <span className="text-foreground/80 font-sans">
                        {value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-16">
                <h2 className="text-xs tracking-[0.25em] uppercase text-foreground/40 font-sans mb-8">
                  Características
                </h2>
                <ul className="space-y-4">
                  {product.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.05 }}
                      className="flex items-start gap-4 text-foreground/60 font-sans"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground/30 mt-2 flex-shrink-0" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Color Selector */}
              <div className="mb-20">
                <h2 className="text-xs tracking-[0.25em] uppercase text-foreground/40 font-sans mb-6">
                  Cores Disponíveis
                </h2>
                <div className="flex gap-4">
                  {product.colors.map((color) => (
                    <motion.button
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      className={`relative group`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div 
                        className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                          selectedColor === color.id 
                            ? 'border-foreground' 
                            : 'border-foreground/20 hover:border-foreground/50'
                        }`}
                        style={{ backgroundColor: color.color }}
                      />
                      {/* Tooltip */}
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        <span className="text-[9px] text-foreground/50 tracking-wide">
                          {color.name}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <a
                  href="https://wa.me/5500000000000?text=Olá! Gostaria de saber mais sobre o modelo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-foreground text-background font-sans text-sm tracking-[0.15em] uppercase hover:bg-foreground/90 transition-colors group"
                >
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Consultar Especialista
                </a>
                <p className="text-[10px] text-foreground/30 mt-4 tracking-wide">
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
