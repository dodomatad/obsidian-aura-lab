import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import opiumLogo from '@/assets/opium-logo-official.png';

const ScrollZoomLogo = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Transformações baseadas no scroll
  const logoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.4]);
  const logoY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  
  return (
    <div ref={containerRef} className="relative h-[200vh]">

      {/* Sticky container para o Hero */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Video Background */}
        <div className="absolute inset-0">

          {/* Fallback gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background" />

          {/* Video iframe */}
          <iframe
            src="https://player.vimeo.com/video/1087480498?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&quality=1080p"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              transform: 'scale(1.2)',
              pointerEvents: 'none'
            }}
            allow="autoplay; fullscreen"
            loading="lazy"
          />
          
          {/* Cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        </div>

        {/* Logo com fundo preto - faz zoom out no scroll */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          style={{ opacity: bgOpacity }}
        >
          <motion.div
            className="relative flex flex-col items-center"
            style={{ 
              scale: logoScale,
              y: logoY,
            }}
          >
            {/* Fundo preto atrás da logo */}
            <div className="bg-black px-8 py-6 md:px-12 md:py-8">
              <img 
                src={opiumLogo}
                alt="Opium Surfskis"
                className="w-[180px] md:w-[280px] lg:w-[350px] h-auto"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Indicador de scroll - EXPLORAR */}
        <motion.div 
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          style={{ opacity: bgOpacity }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-white/60">
            Explorar
          </span>
          <svg 
            className="w-5 h-5 text-white/60" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>

        {/* Conteúdo que aparece após o scroll */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-10"
          style={{ opacity: contentOpacity }}
        >
          {/* Este espaço pode ter conteúdo adicional ou transição para próxima seção */}
        </motion.div>
        
      </div>
    </div>
  );
};

export default ScrollZoomLogo;
