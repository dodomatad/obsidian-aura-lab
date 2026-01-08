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
        {/* Minimal Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 md:px-16 py-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-sans text-sm font-medium tracking-widest text-foreground/80"
          >
            LIBERDADE
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex gap-10"
          >
            <a 
              href="#modelos" 
              onClick={(e) => handleNavClick(e, 'modelos')}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wide"
            >
              Modelos
            </a>
            <a 
              href="#atelier" 
              onClick={(e) => handleNavClick(e, 'atelier')}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wide"
            >
              Ateliê
            </a>
          </motion.div>
        </nav>

        {/* Hero Section - Video Focus with Fade Out Text */}
        <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
          {/* Video Background - Minimal Overlay */}
          <div className="absolute inset-0">
            {/* Fallback gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a192f] via-[#0d1b2a] to-[#1b263b]" />
            
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
            
            {/* Minimal Dark Overlay - Only 15% for readability */}
            <div className="absolute inset-0 bg-background/15" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
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
                className="display-hero text-foreground select-none"
                style={{
                  fontSize: 'clamp(2.5rem, 8vw, 7rem)',
                  letterSpacing: '-0.02em',
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