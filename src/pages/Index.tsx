import { motion, useScroll, useTransform } from 'framer-motion';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import LocationMap from '@/components/LocationMap';
import { useRef, useState, useEffect, lazy, Suspense } from 'react';
import ProductShowcase from '@/components/ProductShowcase';
import AtelierSection from '@/components/AtelierSection';


import LoadingScreen from '@/components/LoadingScreen';
import AtmosphereParticles from '@/components/AtmosphereParticles';
import CustomCursor from '@/components/CustomCursor';
import LiteVimeoEmbed from '@/components/LiteVimeoEmbed';

// Lazy load heavy sections below the fold
const ChampionSection = lazy(() => import('@/components/ChampionSection'));
const SocialImpactSection = lazy(() => import('@/components/SocialImpactSection'));

import MobileMenu from '@/components/MobileMenu';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { useLenisScroll } from '@/hooks/useLenisScroll';
import { useTransition } from '@/context/TransitionContext';
import { useIsMobile } from '@/hooks/use-mobile';

import opiumLogo from '@/assets/opium-logo-official.png';

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
          <img 
            src={opiumLogo} 
            alt="OPIUM" 
            className="h-6 md:h-7 w-auto"
          />

          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 md:gap-10">
            <a 
              href="#modelos" 
              onClick={(e) => handleNavClick(e, 'modelos')}
              className="text-xs text-orange font-bold hover:text-orange/80 transition-all duration-300 tracking-wide hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]"
            >
              Modelos
            </a>
            <a 
              href="#atelier" 
              onClick={(e) => handleNavClick(e, 'atelier')}
              className="text-xs text-orange font-bold hover:text-orange/80 transition-all duration-300 tracking-wide hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]"
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
            
            {/* Video Background - Lite Vimeo Embed para performance */}
            <LiteVimeoEmbed
              videoId="1152065041"
              title="Hero Background Video"
              className="absolute inset-0"
              autoplayOnLoad={true}
              showPlayButton={false}
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
        <div id="modelos" className="pt-4 md:pt-6">
          <ProductShowcase />
        </div>

        {/* Atelier Section - Color Selector */}
        <div id="atelier" className="pt-2 md:pt-4">
          <AtelierSection />
        </div>


        {/* Champion Journey Section - Lazy loaded for performance */}
        <div id="champion" className="pt-2 md:pt-4">
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-2 border-orange/30 border-t-orange rounded-full animate-spin" />
            </div>
          }>
            <ChampionSection />
          </Suspense>
        </div>

        {/* Social Impact Section - Projects & Initiatives */}
        <div className="pt-2 md:pt-4">
          <Suspense fallback={
            <div className="min-h-[400px] flex items-center justify-center">
              <div className="w-12 h-12 border-2 border-orange/30 border-t-orange rounded-full animate-spin" />
            </div>
          }>
            <SocialImpactSection />
          </Suspense>
        </div>



        {/* Footer - Light Version */}
        <footer className="w-full bg-white px-6 md:px-16 py-16 md:py-20">
          <div className="max-w-7xl mx-auto">
            
            {/* Main Footer Grid - 4 Colunas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-10">
              
              {/* COLUNA 1 - Logo, Descrição e Redes */}
              <div>
                <img 
                  src={opiumLogo} 
                  alt="OPIUM" 
                  className="h-12 w-auto mb-6 brightness-0"
                />
                <p className="text-base text-neutral-600 leading-relaxed mb-8">
                  Desenvolvendo o que há de melhor para Canoas Havaianas e Surfski. Conheça nossos produtos!
                </p>
                
                {/* Ícones de Redes Sociais (Quadrados com Borda) */}
                <div className="flex gap-3">
                  <a 
                    href="https://facebook.com/opiumsurfski" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center border-2 border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white transition-all"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://instagram.com/opiumsurfski" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center border-2 border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white transition-all"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://twitter.com/opiumsurfski" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center border-2 border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white transition-all"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* COLUNA 2 - Contatos */}
              <div className="space-y-6">
                {/* Telefone */}
                <div className="flex items-start gap-3">
                  <span className="w-3 h-3 bg-orange rounded-full mt-1.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-base font-semibold text-neutral-900 mb-1">Telefone:</h4>
                    <p className="text-base text-neutral-600">(13) 99744-6684 | (13) 99744-6684 (WHATS)</p>
                  </div>
                </div>

                {/* E-mail */}
                <div className="flex items-start gap-3">
                  <span className="w-3 h-3 bg-orange rounded-full mt-1.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-base font-semibold text-neutral-900 mb-1">E-mail:</h4>
                    <a 
                      href="mailto:atendimento@caiaquesopium.com.br" 
                      className="text-base text-neutral-600 hover:text-orange transition-colors"
                    >
                      atendimento@caiaquesopium.com.br
                    </a>
                  </div>
                </div>
              </div>

              {/* COLUNA 3 - Horários */}
              <div className="space-y-6">
                {/* Horário de Garagem */}
                <div className="flex items-start gap-3">
                  <span className="w-3 h-3 bg-orange rounded-full mt-1.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-base font-semibold text-neutral-900 mb-1">Horário de Garagem</h4>
                    <p className="text-base text-neutral-600 leading-relaxed">
                      Segunda-Feira: 8:00 às 14:00<br />
                      Terça a Sábado: 7:00 às 19:30<br />
                      Domingo e Feriado: 8:00 às 18:30
                    </p>
                  </div>
                </div>

                {/* Horário de Secretaria */}
                <div className="flex items-start gap-3">
                  <span className="w-3 h-3 bg-orange rounded-full mt-1.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-base font-semibold text-neutral-900 mb-1">Horário de Secretaria</h4>
                    <p className="text-base text-neutral-600 leading-relaxed">
                      Segunda, Sábado e Domingo: 8:00 às 14:00<br />
                      Terça a Sexta: 8:00 às 19:00
                    </p>
                  </div>
                </div>
              </div>

              {/* COLUNA 4 - Mapa de Localização */}
              <LocationMap />
            </div>

            {/* Linha Separadora */}
            <div className="mt-12 pt-8 border-t border-neutral-200">
              <p className="text-sm text-neutral-500 text-center">
                © {new Date().getFullYear()} Opium Hightec Line. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </footer>
      </div>
      
    </>
  );
};

export default Index;
