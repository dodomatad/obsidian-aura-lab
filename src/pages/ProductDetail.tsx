import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Ruler, Move, Scale, Weight, Layers } from 'lucide-react';
import CustomCursor from '@/components/CustomCursor';
import MagneticButton from '@/components/MagneticButton';
import VideoBackground from '@/components/VideoBackground';
import StabilityMeter from '@/components/ui/StabilityMeter';
import ProductMiniGallery from '@/components/ui/ProductMiniGallery';
import ProductTechSheet from '@/components/ui/ProductTechSheet';
import AtelierCarousel from '@/components/ui/AtelierCarousel';
import { useTransition } from '@/context/TransitionContext';
import { productsData } from '@/data/products';

const specLabels: Record<string, { label: string; icon: typeof Ruler }> = {
  length: { label: 'Comprimento', icon: Ruler },
  beam: { label: 'Boca', icon: Move },
  weight: { label: 'Peso', icon: Weight },
  capacity: { label: 'Capacidade', icon: Scale },
  material: { label: 'Material', icon: Layers },
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isTransitioning, justTransitioned } = useTransition();
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showBoatImage, setShowBoatImage] = useState(false);
  const [contentRevealed, setContentRevealed] = useState(false);

  const handleVideoRevealComplete = useCallback(() => {
    setContentRevealed(true);
  }, []);

  const product = id ? productsData[id] : null;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (justTransitioned || !isTransitioning) {
      const timer = setTimeout(() => {
        setShowBoatImage(true);
      }, isTransitioning ? 0 : 400);
      return () => clearTimeout(timer);
    }
  }, [justTransitioned, isTransitioning]);

  const handleBack = () => {
    setIsExiting(true);
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

  const currentImage = product.defaultImage;

  // Get level color class
  const getLevelColorClass = () => {
    return product.levelColor || 'text-foreground/60';
  };

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

        {/* Magnetic Back button */}
        <MagneticButton
          onClick={handleBack}
          className="fixed top-6 left-6 z-50 cursor-pointer"
        >
          <motion.div
            className="flex items-center justify-center w-10 h-10 rounded-full"
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
              scale: 1.05,
              x: -3,
            }}
          >
            <ArrowLeft className="w-4 h-4 text-foreground/80" />
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

              {/* Boat image */}
              <motion.img
                layoutId={`boat-image-${product.id}`}
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
          <div className="lg:w-1/2 px-8 lg:px-16 py-24 lg:py-32 flex items-center">
            <motion.div
              className="max-w-xl w-full"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Header */}
              <motion.div 
                className="mb-16"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: contentRevealed ? 1 : 0, y: contentRevealed ? 0 : 40 }}
                transition={{ duration: 0.8, delay: 0, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Category Badge */}
                <span className="text-xs tracking-[0.25em] uppercase text-foreground/80 font-sans font-medium block mb-2">
                  {product.category}
                </span>
                
                <span className="text-sm tracking-[0.35em] uppercase text-foreground/50 font-sans font-medium block mb-4">
                  {product.tagline}
                </span>
                
                <h1 
                  className="display-hero text-foreground mb-4"
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

              {/* Divider */}
              <motion.div 
                className="w-full h-px bg-gradient-to-r from-foreground/30 via-foreground/10 to-transparent mb-12"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: contentRevealed ? 1 : 0, scaleX: contentRevealed ? 1 : 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{ transformOrigin: 'left' }}
              />

              {/* Specifications */}
              <motion.div 
                className="mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: contentRevealed ? 1 : 0, y: contentRevealed ? 0 : 30 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <h2 className="text-sm tracking-[0.3em] uppercase text-foreground/50 font-sans font-medium mb-8">
                  Especificações Técnicas
                </h2>
                
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(product.specs).map(([key, value], index) => {
                    const spec = specLabels[key];
                    if (!spec || !value) return null;
                    const IconComponent = spec.icon;
                    
                    return (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: contentRevealed ? 1 : 0, y: contentRevealed ? 0 : 20 }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
                        className="p-4 rounded-lg bg-white/10"
                        style={{
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <IconComponent className="w-4 h-4 text-foreground/70" />
                          <span className="text-xs tracking-wider uppercase text-foreground/40">
                            {spec.label}
                          </span>
                        </div>
                        <span className="text-lg font-medium text-foreground">
                          {value}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Stability Meter - Difficulty Level Indicator */}
              <motion.div 
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: contentRevealed ? 1 : 0, y: contentRevealed ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <StabilityMeter 
                  level={typeof product.difficultyLevel === 'number' ? product.difficultyLevel : 50} 
                  levelText={product.level}
                  compact={false}
                />
              </motion.div>

              {/* Product Gallery - Real Photos */}
              {product.galleryImages && product.galleryImages.length > 0 && (
                <motion.div 
                  className="mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: contentRevealed ? 1 : 0, y: contentRevealed ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                >
                  <ProductMiniGallery images={product.galleryImages} />
                </motion.div>
              )}

              {/* Technical Profile Sheet - Complete Product Info */}
              {product.techProfile && (
                <motion.div 
                  className="mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: contentRevealed ? 1 : 0, y: contentRevealed ? 0 : 30 }}
                  transition={{ duration: 0.7, delay: 0.25 }}
                >
                  <ProductTechSheet 
                    techProfile={product.techProfile}
                    productName={product.name}
                    contentRevealed={contentRevealed}
                  />
                </motion.div>
              )}

              {/* Personalização */}
              <motion.div 
                className="mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: contentRevealed ? 1 : 0, y: contentRevealed ? 0 : 30 }}
                transition={{ duration: 0.7, delay: 0.35 }}
              >
                <h2 className="text-sm tracking-[0.3em] uppercase text-foreground/50 font-sans font-medium mb-4">
                  Personalização
                </h2>
                
                <p className="text-sm text-foreground/60 leading-relaxed mb-3">
                  Cada barco Opium é fabricado sob encomenda. Oferecemos as <span className="text-foreground/80 font-medium">cores padrão Opium</span>, com acabamento de alta qualidade.
                </p>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  Customizações de cores e acabamentos especiais são tratadas diretamente com nosso consultor de vendas, pois possuem <span className="text-foreground/80 font-medium">valores e viabilidades técnicas específicas</span>.
                </p>
              </motion.div>

              {/* Ateliê Carousel - Fixed lifestyle/colors gallery */}
              <motion.div 
                className="mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: contentRevealed ? 1 : 0, y: contentRevealed ? 0 : 30 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <AtelierCarousel />
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: contentRevealed ? 1 : 0, y: contentRevealed ? 0 : 30 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <motion.a
                  href="https://wa.me/qr/Q6ARXXVI73VQM1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 px-10 py-5 bg-white text-black text-sm tracking-widest uppercase font-bold transition-all duration-300 hover:shadow-xl hover:shadow-white/20"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Consultar Especialista</span>
                  <motion.span
                    animate={{ x: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-lg"
                  >
                    →
                  </motion.span>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProductDetail;
