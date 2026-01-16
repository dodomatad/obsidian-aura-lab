import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import opiumLogo from '@/assets/opium-hightech-logo.png';
import heroVideo from '@/assets/hero-video.mp4';

const CinematicHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Logo ZOOM IN - scale from 1 to 50 (entering the letter hole effect)
  const logoScale = useTransform(scrollYProgress, [0, 0.8], [1, 50]);
  
  // Logo fades out as it gets very large
  const logoOpacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 1, 0]);
  
  // Video overlay darkens slightly at the end
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [0.3, 0.3, 0.7]);
  
  // Explore indicator fades out quickly
  const exploreOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      {/* Sticky Hero - stays fixed while scrolling */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        
        {/* Fallback gradient if video doesn't load */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 -z-10" />
        
        {/* Dark overlay - gets darker at end of scroll */}
        <motion.div 
          className="absolute inset-0 bg-black z-[5]"
          style={{ opacity: overlayOpacity }}
        />
        
        {/* Logo with ZOOM IN effect */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-20"
          style={{ 
            scale: logoScale,
            opacity: logoOpacity,
          }}
        >
          <div className="flex flex-col items-center">
            <img 
              src={opiumLogo}
              alt="Opium Hightech"
              className="w-[200px] md:w-[350px] lg:w-[450px] h-auto"
            />
          </div>
        </motion.div>

        {/* EXPLORAR - scroll indicator */}
        <motion.div 
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          style={{ opacity: exploreOpacity }}
        >
          <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/60">
            Explorar
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg 
              className="w-5 h-5 md:w-6 md:h-6 text-white/60" 
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
  );
};

export default CinematicHero;
