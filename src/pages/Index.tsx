import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import ExperienceSelector from '@/components/ExperienceSelector';
import AtelierSection from '@/components/AtelierSection';
import EngineeringSection from '@/components/EngineeringSection';
import AtmosphericFog from '@/components/AtmosphericFog';
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

  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* Cinematic Loading Screen */}
      {!isLoadingComplete && (
        <LoadingScreen onLoadingComplete={() => setIsLoadingComplete(true)} />
      )}
      
      <div className="min-h-screen bg-background overflow-x-hidden scroll-smooth">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-6 backdrop-blur-sm bg-background/20">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-xl font-medium tracking-tight"
        >
          LIBERDADE
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex gap-8"
        >
          <a 
            href="#modelos" 
            onClick={(e) => handleNavClick(e, 'modelos')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-grow"
          >
            Modelos
          </a>
          <a 
            href="#engineering" 
            onClick={(e) => handleNavClick(e, 'engineering')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-grow"
          >
            Engenharia
          </a>
          <a 
            href="#atelier" 
            onClick={(e) => handleNavClick(e, 'atelier')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-grow"
          >
            Ateliê
          </a>
        </motion.div>
      </nav>

      {/* Hero Section - Video Background with Parallax */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        {/* Video Background with Parallax */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 overflow-hidden"
          style={{ y: heroImageY, scale: heroImageScale }}
        >
          <iframe 
            src="https://player.vimeo.com/video/1152065041?background=1&autoplay=1&loop=1&muted=1&quality=1080p"
            className="absolute top-1/2 left-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full -translate-x-1/2 -translate-y-1/2"
            style={{ filter: 'brightness(0.7)' }}
            frameBorder="0"
            allow="autoplay; fullscreen"
            title="Hero Background Video"
          />
        </motion.div>
        
        {/* Dark Overlay for text readability - Fixed */}
        <motion.div 
          className="absolute inset-0 z-[1]"
          style={{ opacity: heroOpacity }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
        </motion.div>

        {/* Title - Overlay */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-start px-6 md:px-12 z-10"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.16, 1, 0.3, 1],
              delay: 0.5
            }}
          >
            <h1 
              className="font-display font-bold text-foreground select-none"
              style={{
                fontSize: 'clamp(3rem, 12vw, 12rem)',
                letterSpacing: '-0.04em',
                lineHeight: 0.85,
              }}
            >
              LIBERDADE<br />
              <span className="text-foreground/50">NÃO SE</span><br />
              EXPLICA
            </h1>
          </motion.div>
        </motion.div>

        {/* Subtexto - Canto Inferior Direito */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-12 right-6 md:right-12 z-20 text-right max-w-xs"
          style={{ opacity: heroOpacity }}
        >
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed tracking-wide">
            Surfskis de Elite.<br />
            Performance Pura.<br />
            Personalização Absoluta.
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 left-6 md:left-12 z-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-foreground/50 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* Experience Selector Section with Fog */}
      <div id="modelos" className="relative">
        <AtmosphericFog />
        <ExperienceSelector />
      </div>

      {/* Engineering Section with Fog */}
      <div className="relative">
        <AtmosphericFog />
        <EngineeringSection />
      </div>

      {/* Atelier Section with Fog */}
      <div id="atelier" className="relative">
        <AtmosphericFog />
        <AtelierSection />
      </div>

      {/* Ambient Audio Player */}
      <AmbientAudioPlayer />

      {/* Statement Section */}
      <section className="px-6 md:px-12 py-32 border-t border-border">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p 
            className="text-muted-foreground font-display"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}
          >
            Cada embarcação é uma{' '}
            <span className="text-foreground">obra de arte</span> feita para{' '}
            <span className="text-foreground">você</span>.
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-12 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="font-display text-xl font-medium tracking-tight">
            LIBERDADE
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-grow">
              Instagram
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-grow">
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
