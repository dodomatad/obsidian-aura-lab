import { motion } from 'framer-motion';
import { useState } from 'react';
import boatPink from '@/assets/boat-pink.png';
import boatCamo from '@/assets/boat-camo.png';
import boatCarbon from '@/assets/boat-carbon.png';

const boats = [
  { id: 'pink', image: boatPink, label: 'ROSA AUDAZ' },
  { id: 'camo', image: boatCamo, label: 'CAMUFLAGEM' },
  { id: 'carbon', image: boatCarbon, label: 'CARBONO' },
];

const AtelierSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative min-h-screen bg-background overflow-hidden">
      {/* Background Gradient */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(180deg, hsl(0 0% 2%) 0%, hsl(220 50% 5%) 50%, hsl(0 0% 2%) 100%)',
        }}
      />

      {/* Title Overlay */}
      <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase block mb-4">
            O Ateliê
          </span>
          <h2 
            className="font-display font-bold text-foreground/90 tracking-tighter mb-8"
            style={{
              fontSize: 'clamp(2rem, 6vw, 5rem)',
              lineHeight: 0.9,
              textShadow: '0 20px 60px rgba(0,0,0,0.8)',
            }}
          >
            A única regra é<br />
            <span className="text-foreground">a sua identidade</span>
          </h2>
          
          {/* CTA Button */}
          <motion.a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 border border-foreground/30 text-foreground text-sm tracking-widest uppercase transition-all duration-500 hover:bg-foreground hover:text-background pointer-events-auto cursor-grow"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Personalizar no WhatsApp
          </motion.a>
        </motion.div>
      </div>

      {/* Liquid Gallery */}
      <div className="relative z-10 flex h-screen">
        {boats.map((boat, index) => (
          <motion.div
            key={boat.id}
            className="relative flex-1 h-full overflow-hidden cursor-grow"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Image Container with Liquid Effect */}
            <motion.div
              className="absolute inset-0"
              animate={{
                scale: hoveredIndex === index ? 1.15 : 1,
                filter: hoveredIndex === index 
                  ? 'blur(0px) brightness(1.1)' 
                  : hoveredIndex !== null 
                    ? 'blur(2px) brightness(0.5)' 
                    : 'blur(0px) brightness(0.7)',
              }}
              transition={{ 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Water Ripple Effect Layer */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  backgroundPosition: hoveredIndex === index 
                    ? ['0% 0%', '100% 100%'] 
                    : '0% 0%',
                }}
                transition={{
                  duration: 3,
                  repeat: hoveredIndex === index ? Infinity : 0,
                  ease: 'linear',
                }}
                style={{
                  background: hoveredIndex === index
                    ? 'radial-gradient(ellipse at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(220 100% 60% / 0.1) 0%, transparent 50%)'
                    : 'none',
                }}
              />

              <img
                src={boat.image}
                alt={boat.label}
                className="w-full h-full object-cover object-center"
                style={{
                  transform: hoveredIndex === index ? 'translateY(-2%)' : 'translateY(0)',
                  transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />

              {/* Liquid Overlay Effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.5 }}
                style={{
                  background: `
                    radial-gradient(ellipse 80% 50% at 50% 50%, transparent 30%, hsl(220 100% 60% / 0.05) 70%),
                    linear-gradient(180deg, transparent 0%, hsl(220 100% 60% / 0.08) 100%)
                  `,
                  mixBlendMode: 'overlay',
                }}
              />

              {/* Wave Animation Overlay */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  backgroundPosition: hoveredIndex === index 
                    ? ['0% 0%', '100% 100%'] 
                    : '0% 0%',
                  opacity: hoveredIndex === index ? 0.3 : 0,
                }}
                transition={{
                  backgroundPosition: {
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear',
                  },
                  opacity: { duration: 0.5 },
                }}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='wave'%3E%3CfeTurbulence baseFrequency='0.02' numOctaves='3' seed='1'/%3E%3CfeDisplacementMap in='SourceGraphic' scale='10'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23wave)'/%3E%3C/svg%3E")`,
                  backgroundSize: '200% 200%',
                  mixBlendMode: 'soft-light',
                }}
              />
            </motion.div>

            {/* Dark Gradient Overlay */}
            <div 
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.6) 100%)',
              }}
            />

            {/* Label */}
            <motion.div
              className="absolute bottom-8 left-0 right-0 z-20 text-center"
              animate={{
                opacity: hoveredIndex === index ? 1 : 0.4,
                y: hoveredIndex === index ? 0 : 10,
              }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-xs tracking-[0.2em] text-foreground/80 uppercase">
                {boat.label}
              </span>
            </motion.div>

            {/* Vertical Divider Lines */}
            {index < boats.length - 1 && (
              <div className="absolute top-0 right-0 bottom-0 w-px bg-foreground/10 z-30" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Bottom Fade */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 z-20 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, hsl(0 0% 2%) 100%)',
        }}
      />
    </section>
  );
};

export default AtelierSection;
