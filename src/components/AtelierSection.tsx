import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import boatPink from '@/assets/boat-pink.png';
import boatCamo from '@/assets/boat-camo.png';
import boatCarbon from '@/assets/boat-carbon.png';

const boats = [
  { id: 'pink', image: boatPink, label: 'ROSA AUDAZ', glow: 'hsl(350 70% 50% / 0.2)' },
  { id: 'camo', image: boatCamo, label: 'CAMUFLAGEM', glow: 'hsl(120 40% 40% / 0.2)' },
  { id: 'carbon', image: boatCarbon, label: 'CARBONO', glow: 'hsl(220 60% 50% / 0.2)' },
];

const AtelierSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const parallax1 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const parallax2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const parallax3 = useTransform(scrollYProgress, [0, 1], [20, -40]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-background overflow-hidden py-24 md:py-32"
    >
      {/* Background with subtle navy spotlights */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 20% 30%, hsl(220 60% 10% / 0.6) 0%, transparent 50%),
            radial-gradient(ellipse 50% 35% at 80% 70%, hsl(220 50% 8% / 0.5) 0%, transparent 50%),
            radial-gradient(ellipse 70% 50% at 60% 50%, hsl(220 40% 6% / 0.4) 0%, transparent 60%),
            linear-gradient(180deg, hsl(0 0% 2%) 0%, hsl(220 50% 4%) 50%, hsl(0 0% 2%) 100%)
          `,
        }}
      />

      {/* Section Header */}
      <div className="relative z-10 px-6 md:px-12 mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase block mb-4">
            O Ateliê
          </span>
          <h2 
            className="font-display font-bold text-foreground tracking-tighter max-w-4xl"
            style={{
              fontSize: 'clamp(2rem, 6vw, 5rem)',
              lineHeight: 0.9,
            }}
          >
            A única regra é<br />
            <span className="text-foreground/50">a sua identidade</span>
          </h2>
        </motion.div>
      </div>

      {/* Simplified Boat Grid */}
      <div className="relative z-10 px-6 md:px-12">
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {/* Large Left Image */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="col-span-12 md:col-span-7 relative group cursor-grow"
            onMouseEnter={() => setHoveredIndex(0)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{ y: parallax1 }}
          >
            <div className="relative aspect-[16/10] flex flex-col items-center justify-center">
              {/* Navy spotlight */}
              <div 
                className="absolute inset-0 z-0"
                style={{
                  background: 'radial-gradient(ellipse 70% 60% at 50% 45%, hsl(220 60% 10% / 0.7) 0%, transparent 60%)',
                }}
              />
              
              {/* Boat */}
              <motion.img
                src={boats[0].image}
                alt={boats[0].label}
                className="relative z-10 w-[85%] h-auto object-contain"
                animate={{
                  scale: hoveredIndex === 0 ? 1.06 : 1,
                  y: [0, -12, 0],
                  rotate: [-0.3, 0.3, -0.3],
                }}
                transition={{ 
                  scale: { duration: 0.5 },
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                }}
                style={{
                  filter: hoveredIndex === 0 
                    ? 'brightness(1.1) drop-shadow(0 30px 60px rgba(220, 80, 100, 0.3))' 
                    : 'brightness(0.95) drop-shadow(0 20px 40px rgba(10,25,47,0.5))',
                }}
              />
              
              {/* Simple reflection */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-8 z-5">
                <div 
                  className="w-full h-full opacity-30"
                  style={{
                    background: `radial-gradient(ellipse 100% 100% at 50% 0%, ${boats[0].glow} 0%, transparent 70%)`,
                  }}
                />
              </div>
              
              {/* Glow on hover */}
              <motion.div
                className="absolute inset-0 pointer-events-none z-20"
                animate={{ opacity: hoveredIndex === 0 ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  background: `radial-gradient(ellipse at 50% 50%, ${boats[0].glow} 0%, transparent 50%)`,
                }}
              />
            </div>
            
            {/* Label */}
            <motion.div
              className="absolute bottom-4 left-4 z-30"
              animate={{ opacity: hoveredIndex === 0 ? 1 : 0.5 }}
            >
              <span className="text-xs tracking-[0.2em] text-foreground/70 uppercase font-mono">
                {boats[0].label}
              </span>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <div className="col-span-12 md:col-span-5 flex flex-col gap-6 md:gap-8">
            {/* Top Right */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group cursor-grow flex-1"
              onMouseEnter={() => setHoveredIndex(1)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ y: parallax2 }}
            >
              <div className="relative h-full min-h-[220px] flex flex-col items-center justify-center">
                <div 
                  className="absolute inset-0 z-0"
                  style={{
                    background: 'radial-gradient(ellipse 65% 55% at 50% 45%, hsl(120 40% 8% / 0.6) 0%, transparent 55%)',
                  }}
                />
                
                <motion.img
                  src={boats[1].image}
                  alt={boats[1].label}
                  className="relative z-10 w-[80%] h-auto object-contain"
                  animate={{
                    scale: hoveredIndex === 1 ? 1.06 : 1,
                    y: [0, -10, 0],
                    rotate: [-0.2, 0.2, -0.2],
                  }}
                  transition={{ 
                    scale: { duration: 0.5 },
                    y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
                  }}
                  style={{
                    filter: hoveredIndex === 1 
                      ? 'brightness(1.1) drop-shadow(0 25px 50px rgba(80, 160, 80, 0.3))' 
                      : 'brightness(0.95) drop-shadow(0 15px 30px rgba(10,25,47,0.5))',
                  }}
                />
                
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-6 z-5">
                  <div 
                    className="w-full h-full opacity-25"
                    style={{
                      background: `radial-gradient(ellipse 100% 100% at 50% 0%, ${boats[1].glow} 0%, transparent 70%)`,
                    }}
                  />
                </div>
                
                <motion.div
                  className="absolute inset-0 pointer-events-none z-20"
                  animate={{ opacity: hoveredIndex === 1 ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    background: `radial-gradient(ellipse at 50% 50%, ${boats[1].glow} 0%, transparent 50%)`,
                  }}
                />
              </div>
              
              <motion.div
                className="absolute bottom-4 left-4 z-30"
                animate={{ opacity: hoveredIndex === 1 ? 1 : 0.5 }}
              >
                <span className="text-xs tracking-[0.2em] text-foreground/70 uppercase font-mono">
                  {boats[1].label}
                </span>
              </motion.div>
            </motion.div>

            {/* Bottom Right - Offset */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative group cursor-grow flex-1 md:ml-8"
              onMouseEnter={() => setHoveredIndex(2)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ y: parallax3 }}
            >
              <div className="relative h-full min-h-[220px] flex flex-col items-center justify-center">
                <div 
                  className="absolute inset-0 z-0"
                  style={{
                    background: 'radial-gradient(ellipse 60% 50% at 50% 45%, hsl(220 50% 10% / 0.6) 0%, transparent 55%)',
                  }}
                />
                
                <motion.img
                  src={boats[2].image}
                  alt={boats[2].label}
                  className="relative z-10 w-[80%] h-auto object-contain"
                  animate={{
                    scale: hoveredIndex === 2 ? 1.06 : 1,
                    y: [0, -11, 0],
                    rotate: [-0.25, 0.25, -0.25],
                  }}
                  transition={{ 
                    scale: { duration: 0.5 },
                    y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 6.5, repeat: Infinity, ease: "easeInOut" },
                  }}
                  style={{
                    filter: hoveredIndex === 2 
                      ? 'brightness(1.1) drop-shadow(0 25px 50px rgba(80, 120, 200, 0.3))' 
                      : 'brightness(0.95) drop-shadow(0 15px 30px rgba(10,25,47,0.5))',
                  }}
                />
                
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-6 z-5">
                  <div 
                    className="w-full h-full opacity-25"
                    style={{
                      background: `radial-gradient(ellipse 100% 100% at 50% 0%, ${boats[2].glow} 0%, transparent 70%)`,
                    }}
                  />
                </div>
                
                <motion.div
                  className="absolute inset-0 pointer-events-none z-20"
                  animate={{ opacity: hoveredIndex === 2 ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    background: `radial-gradient(ellipse at 50% 50%, ${boats[2].glow} 0%, transparent 50%)`,
                  }}
                />
              </div>
              
              <motion.div
                className="absolute bottom-4 left-4 z-30"
                animate={{ opacity: hoveredIndex === 2 ? 1 : 0.5 }}
              >
                <span className="text-xs tracking-[0.2em] text-foreground/70 uppercase font-mono">
                  {boats[2].label}
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 px-6 md:px-12 mt-16 md:mt-24 text-center"
      >
        <p className="text-muted-foreground text-sm mb-8 max-w-md mx-auto">
          Customização sob consulta. Cada embarcação é única.
        </p>
        <a
          href="https://wa.me/5511999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 border border-foreground/30 text-foreground text-sm tracking-widest uppercase transition-all duration-500 hover:bg-foreground hover:text-background cursor-grow hover:scale-105 backdrop-blur-sm"
        >
          Falar com Especialista
        </a>
      </motion.div>
    </section>
  );
};

export default AtelierSection;
