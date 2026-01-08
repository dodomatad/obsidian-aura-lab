import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import ProductShowcase from '@/components/ProductShowcase';
import AtelierSection from '@/components/AtelierSection';
import AmbientAudioPlayer from '@/components/AmbientAudioPlayer';
import LoadingScreen from '@/components/LoadingScreen';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const Index = () => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const { handleNavClick } = useSmoothScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Hero text fades out on scroll, stays in place
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <>
      {!isLoadingComplete && (
        <LoadingScreen onLoadingComplete={() => setIsLoadingComplete(true)} />
      )}
      
      <div className="min-h-screen bg-background overflow-x-hidden">
        {/* Glassmorphism Navigation - Futuristic HUD */}
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="fixed top-0 left-0 right-0 md:top-4 md:left-8 md:right-8 z-50 flex justify-between items-center px-4 md:px-10 py-3 md:py-4 md:rounded-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: 'none',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <div className="font-sans text-sm font-medium tracking-widest text-foreground/90">
            LIBERDADE
          </div>
          <div className="flex gap-8 md:gap-10">
            <a 
              href="#modelos" 
              onClick={(e) => handleNavClick(e, 'modelos')}
              className="text-xs text-foreground/60 hover:text-foreground transition-all duration-300 tracking-wide hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
            >
              Modelos
            </a>
            <a 
              href="#atelier" 
              onClick={(e) => handleNavClick(e, 'atelier')}
              className="text-xs text-foreground/60 hover:text-foreground transition-all duration-300 tracking-wide hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
            >
              Ateliê
            </a>
          </div>
        </motion.nav>

        {/* Hero Section - Video Focus with Fade Out Text */}
        <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
          {/* Video Background - With Fade Mask */}
          <div 
            className="absolute inset-0"
            style={{
              maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
            }}
          >
            {/* Fallback gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#021019] via-[#010810] to-[#000000]" />
            
            {/* Vimeo Video */}
            <div className="absolute inset-0">
              <iframe 
                src="https://player.vimeo.com/video/1152065041?badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-screen min-w-full min-h-[56.25vw]"
                style={{ filter: 'brightness(0.85)' }}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                allowFullScreen
                title="Hero Background Video"
              />
            </div>
            
            {/* Cinematic Overlay - Gradient for atmosphere and readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
          </div>

          {/* Hero Text - Stays Fixed, Fades Out on Scroll */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center z-10"
            style={{ opacity: heroTextOpacity }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
              className="text-center"
            >
              <h1 
                className="display-hero text-foreground select-none px-4"
                style={{
                  fontSize: 'clamp(2rem, 7vw, 7rem)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                }}
              >
                LIBERDADE<br />
                NÃO SE EXPLICA
              </h1>
            </motion.div>
          </motion.div>
        </section>

        {/* Product Showcase - Editorial Layout with Scroll Snap */}
        <div id="modelos">
          <ProductShowcase />
        </div>

        {/* Atelier Section - Color Selector */}
        <div id="atelier">
          <AtelierSection />
        </div>

        {/* Ambient Audio Player */}
        <AmbientAudioPlayer />

        {/* Minimal Footer */}
        <footer className="w-full px-8 md:px-16 py-16 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="text-sm font-medium tracking-widest text-foreground/60">
              LIBERDADE
            </div>
            <div className="flex gap-10">
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Instagram
              </a>
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                WhatsApp
              </a>
            </div>
            <div className="text-xs text-muted-foreground">
              © 2024 Todos os direitos reservados
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;