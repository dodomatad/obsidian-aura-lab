import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect, lazy, Suspense } from 'react';
import ProductShowcase from '@/components/ProductShowcase';
import AtelierSection from '@/components/AtelierSection';
import GearTechSection from '@/components/GearTechSection';

import LoadingScreen from '@/components/LoadingScreen';
import AtmosphereParticles from '@/components/AtmosphereParticles';
import CustomCursor from '@/components/CustomCursor';

// Lazy load heavy sections below the fold
const ChampionSection = lazy(() => import('@/components/ChampionSection'));

import MobileMenu from '@/components/MobileMenu';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { useLenisScroll } from '@/hooks/useLenisScroll';
import { useTransition } from '@/context/TransitionContext';
import { useIsMobile } from '@/hooks/use-mobile';

import opiumLogo from '@/assets/opium-logo.png';

const Index = () => {
  const { hasSeenIntro, getSavedScrollPosition, clearScrollPosition } = useTransition();
  const [isLoadingComplete, setIsLoadingComplete] = useState(hasSeenIntro);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const { handleNavClick } = useSmoothScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  const hasRestoredScroll = useRef(false);
  const isMobile = useIsMobile();
  
  // Activate Lenis smooth scroll
  useLenisScroll();
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Hero text fades out on scroll, stays in place
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Restore scroll position after coming back from product detail
  useEffect(() => {
    if (isLoadingComplete && !hasRestoredScroll.current) {
      const savedPosition = getSavedScrollPosition();
      if (savedPosition > 0) {
        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
          window.scrollTo(0, savedPosition);
          clearScrollPosition();
        });
      }
      hasRestoredScroll.current = true;
    }
  }, [isLoadingComplete, getSavedScrollPosition, clearScrollPosition]);

  // Determine if we should skip animations (returning from product page)
  const skipAnimations = hasSeenIntro;

  return (
    <>
      {/* Custom Cursor - Desktop Only */}
      <CustomCursor />
      
      {!isLoadingComplete && (
        <LoadingScreen onLoadingComplete={() => setIsLoadingComplete(true)} />
      )}
      
      <div className="min-h-screen bg-background overflow-x-hidden max-w-[100vw] relative">
        {/* Global noise texture overlay for dark luxury feel */}
        <div 
          className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        
        
        {/* Global Atmosphere Particles - Deep Sea Effect */}
        <AtmosphereParticles />
        {/* Glassmorphism Navigation - Desktop Only now, Mobile uses Dock */}
        <motion.nav 
          initial={skipAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={skipAnimations ? { duration: 0 } : { duration: 1, delay: 0.5 }}
          className="fixed top-0 left-0 right-0 md:top-4 md:left-8 md:right-8 z-50 flex justify-between items-center px-4 md:px-10 py-3 md:py-4 md:rounded-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            // Backdrop blur is expensive on mobile; keep it only on >= md.
            backdropFilter: isMobile ? 'none' : 'blur(20px)',
            WebkitBackdropFilter: isMobile ? 'none' : 'blur(20px)',
            border: 'none',
          }}
        >
          <div className="font-sans text-sm font-medium tracking-widest text-foreground/90">
            OPIUM<span className="text-orange">.</span>
          </div>

          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 md:gap-10">
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

          {/* Mobile Hamburger Menu */}
          <MobileMenu />
        </motion.nav>


        {/* Hero Section - Compact on mobile to show content below */}
        <section ref={heroRef} id="hero" className="relative h-[85vh] md:h-screen w-full overflow-hidden">
          {/* Video Background - With Fade Mask */}
          <div 
            className="absolute inset-0"
            style={{
              maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
            }}
          >
            {/* Fallback gradient - sempre visível como base */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#050d18] to-[#000000]"
              style={{
                backgroundImage: `
                  radial-gradient(ellipse 80% 50% at 50% 20%, rgba(6, 182, 212, 0.08) 0%, transparent 50%),
                  radial-gradient(ellipse 60% 40% at 80% 80%, rgba(249, 115, 22, 0.05) 0%, transparent 40%)
                `,
              }}
            />
            
            {/* Subtle texture overlay */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />
            
            {/* Video Background - carrega sobre o fallback */}
            <iframe 
              src="https://player.vimeo.com/video/1152065041?badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1&playsinline=1"
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-screen min-w-full min-h-[56.25vw] transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{ filter: 'brightness(0.85)' }}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              title="Hero Background Video"
              loading="lazy"
              onLoad={() => setVideoLoaded(true)}
            />
            
            {/* Cinematic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
          </div>

          {/* Hero Logo - Centered Opium Logo */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center z-10 px-6 pb-24 md:pb-0"
            style={{ opacity: heroTextOpacity }}
          >
            <motion.div
              initial={skipAnimations ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={skipAnimations ? { duration: 0 } : { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
              className="text-center"
            >
              {/* Logo Image - PNG transparent ready */}
              <img 
                src={opiumLogo}
                alt="Opium Surfskis"
                className="w-[200px] md:w-[320px] lg:w-[400px] h-auto mx-auto drop-shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))',
                }}
              />
            </motion.div>
          </motion.div>

        </section>

        {/* ============================================ */}
        {/* LUXURY SPACING: Large gaps between sections */}
        {/* ============================================ */}
        
        {/* Product Showcase - Editorial Layout with Scroll Snap */}
        <div id="modelos" className="pt-16 md:pt-24">
          <ProductShowcase />
        </div>

        {/* Atelier Section - Color Selector */}
        <div id="atelier" className="pt-12 md:pt-20">
          <AtelierSection />
        </div>

        {/* Gear & Tech Section - Accessories with infinite scroll */}
        <div className="pt-12 md:pt-20">
          <GearTechSection />
        </div>

        {/* Champion Journey Section - Lazy loaded for performance */}
        <div id="champion" className="pt-12 md:pt-20">
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-2 border-orange/30 border-t-orange rounded-full animate-spin" />
            </div>
          }>
            <ChampionSection />
          </Suspense>
        </div>



        {/* Footer with Real Data */}
        <footer className="w-full px-6 md:px-16 py-16 md:py-20">
          <div className="max-w-7xl mx-auto">
            
            {/* Authority Badges - Social Proof */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12 md:mb-16 pb-8 md:pb-12">
              <div className="flex items-center gap-2 px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-sm">
                <span className="text-[10px] md:text-xs tracking-[0.15em] uppercase text-foreground/60 font-medium">
                  🇧🇷 DNA Brasileiro
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-sm">
                <span className="text-[10px] md:text-xs tracking-[0.15em] uppercase text-foreground/60 font-medium">
                  Desde 1985
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-sm">
                <span className="text-[10px] md:text-xs tracking-[0.15em] uppercase text-foreground/60 font-medium">
                  14× Campeão
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-orange/10 border border-orange/30 rounded-sm">
                <span className="text-[10px] md:text-xs tracking-[0.15em] uppercase text-orange font-medium">
                  Hightec Line
                </span>
              </div>
            </div>

            {/* Main Footer Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
              {/* Brand */}
              <div>
                <h3 className="text-lg font-medium tracking-widest text-foreground mb-4">
                  OPIUM<span className="text-orange">.</span>
                </h3>
                <p className="text-sm text-foreground/60 font-light leading-relaxed">
                  Há mais de 30 anos fabricando a história do mar. Surfskis de elite com DNA brasileiro.
                </p>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-xs tracking-[0.2em] uppercase text-foreground/50 mb-4">
                  Contato
                </h4>
                <div className="space-y-3">
                  <a 
                    href="tel:+5513997446684" 
                    className="block text-sm text-foreground/80 hover:text-orange transition-colors py-2 -my-2"
                  >
                    (13) 99744-6684
                  </a>
                  <a 
                    href="mailto:atendimento@caiaquesopium.com.br" 
                    className="block text-sm text-foreground/80 hover:text-orange transition-colors break-all py-2 -my-2"
                  >
                    atendimento@caiaquesopium.com.br
                  </a>
                </div>
              </div>

              {/* Address */}
              <div>
                <h4 className="text-xs tracking-[0.2em] uppercase text-foreground/50 mb-4">
                  Endereço
                </h4>
                <p className="text-sm text-foreground/80 font-light leading-relaxed">
                  Rua Afonso Celso de Paula Lima, 16<br />
                  Ponta da Praia, Santos | SP
                </p>
                <p className="text-xs text-foreground/50 mt-3">
                  Garagem: Seg a Sex 08:00 - 14:00
                </p>
              </div>

              {/* Social */}
              <div>
                <h4 className="text-xs tracking-[0.2em] uppercase text-foreground/50 mb-4">
                  Redes Sociais
                </h4>
                <div className="flex gap-6">
                  <a 
                    href="https://instagram.com/opiumsurfski" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-foreground/80 hover:text-orange transition-colors py-2 -my-2"
                  >
                    Instagram
                  </a>
                  <a 
                    href="https://wa.me/5513997446684?text=Olá! Gostaria de saber mais sobre os produtos Opium."
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-foreground/80 hover:text-orange transition-colors py-2 -my-2"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-foreground/40">
                © 2025 Opium Hightec Line. Todos os direitos reservados.
              </p>
              <p className="text-xs text-foreground/30">
                Surfskis de Elite desde 1985
              </p>
            </div>
          </div>
        </footer>
      </div>
      
    </>
  );
};

export default Index;
