import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import opiumLogo from '@/assets/opium-logo.png';

const ScrollZoomLogo = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Efeito de ZOOM OUT - logo começa grande e vai diminuindo
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  
  // Fundo preto da logo vai desaparecendo
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Texto EXPLORAR desaparece mais rápido
  const explorarOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <>
      {/* Container que define a área de scroll - altura maior = efeito mais lento */}
      <div ref={containerRef} className="relative h-[200vh]">
        
        {/* Hero Sticky - fica fixo enquanto rola */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">

          {/* Fundo - gradiente que sempre aparece */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

          {/* Vídeo de fundo */}
          <div className="absolute inset-0">
            <iframe
              src="https://player.vimeo.com/video/1087480498?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&quality=1080p"
              className="absolute inset-0 w-full h-full"
              style={{ 
                transform: 'scale(1.2)',
                pointerEvents: 'none'
              }}
              allow="autoplay; fullscreen"
              loading="lazy"
            />
          </div>
          
          {/* Overlay escuro */}
          <div className="absolute inset-0 bg-black/40 z-[5]" />

          {/* Logo com efeito de ZOOM OUT */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center z-20"
            style={{ 
              scale,
              y,
              opacity,
            }}
          >
            <div className="flex flex-col items-center">
              {/* Caixa preta com a logo */}
              <motion.div 
                className="bg-black px-6 py-4 md:px-10 md:py-6"
                style={{ opacity: bgOpacity }}
              >
                <img 
                  src={opiumLogo}
                  alt="Opium Surfskis"
                  className="w-[160px] md:w-[250px] lg:w-[320px] h-auto"
                />
              </motion.div>
              
              {/* Subtítulo */}
              <motion.p 
                className="mt-4 md:mt-6 text-xs md:text-sm tracking-[0.25em] uppercase text-white/60"
                style={{ opacity: bgOpacity }}
              >
                Surfskis de Elite
              </motion.p>
            </div>
          </motion.div>

          {/* EXPLORAR - indicador de scroll */}
          <motion.div 
            className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
            style={{ opacity: explorarOpacity }}
          >
            <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/50">
              Explorar
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg 
                className="w-4 h-4 md:w-5 md:h-5 text-white/50" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </>
  );
};

export default ScrollZoomLogo;
