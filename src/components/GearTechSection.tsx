import { motion } from 'framer-motion';
import { Anchor, Shield, Link2, Ship } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface GearItem {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const gearItems: GearItem[] = [
  {
    id: 'remos',
    name: 'Remos de Carbono',
    description: 'Leveza absoluta para sua remada',
    icon: <Anchor className="w-6 h-6 md:w-8 md:h-8" />,
  },
  {
    id: 'bolsas',
    name: 'Bolsa Estanque',
    description: 'Proteção total contra a água',
    icon: <Shield className="w-6 h-6 md:w-8 md:h-8" />,
  },
  {
    id: 'fitas',
    name: 'Fitas de Amarração',
    description: 'Segurança no transporte',
    icon: <Link2 className="w-6 h-6 md:w-8 md:h-8" />,
  },
  {
    id: 'canoa',
    name: 'Canoa Havaiana',
    description: 'Tradição polinésia com tecnologia Opium',
    icon: <Ship className="w-6 h-6 md:w-8 md:h-8" />,
  },
  // Duplicados para o infinite scroll
  {
    id: 'remos-2',
    name: 'Remos de Carbono',
    description: 'Leveza absoluta para sua remada',
    icon: <Anchor className="w-6 h-6 md:w-8 md:h-8" />,
  },
  {
    id: 'bolsas-2',
    name: 'Bolsa Estanque',
    description: 'Proteção total contra a água',
    icon: <Shield className="w-6 h-6 md:w-8 md:h-8" />,
  },
  {
    id: 'fitas-2',
    name: 'Fitas de Amarração',
    description: 'Segurança no transporte',
    icon: <Link2 className="w-6 h-6 md:w-8 md:h-8" />,
  },
  {
    id: 'canoa-2',
    name: 'Canoa Havaiana',
    description: 'Tradição polinésia com tecnologia Opium',
    icon: <Ship className="w-6 h-6 md:w-8 md:h-8" />,
  },
];

const GearTechSection = () => {
  const isMobile = useIsMobile();

  return (
    <section className="relative py-16 md:py-32 overflow-hidden">
      {/* Background subtle gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(230, 81, 0, 0.03) 0%, transparent 60%)',
        }}
      />

      {/* Section Header */}
      <div className="relative z-10 px-6 md:px-16 mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-4 mb-4 md:mb-6">
            <div className="w-8 md:w-12 h-px bg-gradient-to-r from-foreground/50 to-transparent" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-foreground/50 font-sans font-medium">
              Acessórios
            </span>
          </div>
          <h2 
            className="display-hero text-foreground"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              letterSpacing: '-0.02em',
            }}
          >
            Opium Gear<span className="text-orange">.</span>
          </h2>
          <p className="mt-3 md:mt-4 text-base md:text-lg text-foreground/50 font-sans font-light max-w-xl">
            Equipamentos premium para completar sua experiência no mar.
          </p>
        </motion.div>
      </div>

      {/* Infinite Slider */}
      <div className="relative">
        {/* Gradient fade left */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        
        {/* Gradient fade right */}
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling container */}
        <motion.div
          className="flex gap-4 md:gap-6 py-4 px-6"
          animate={{
            x: [0, -1200],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: isMobile ? 40 : 30,
              ease: "linear",
            },
          }}
        >
          {gearItems.map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              className="flex-shrink-0 w-64 md:w-96 group"
              whileHover={isMobile ? undefined : { y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className="relative p-6 md:p-10 rounded-none h-full"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {/* Icon - always visible with color on mobile */}
                <div className={`mb-4 md:mb-6 transition-colors duration-300 ${
                  isMobile ? 'text-orange' : 'text-foreground/40 group-hover:text-orange'
                }`}>
                  {item.icon}
                </div>

                {/* Content - always visible on mobile */}
                <h3 
                  className="text-lg md:text-2xl font-sans font-medium text-foreground mb-2 md:mb-3 tracking-wide"
                  style={{ letterSpacing: '0.05em' }}
                >
                  {item.name}
                </h3>
                <p className="text-sm md:text-sm text-foreground/50 font-sans font-light">
                  {item.description}
                </p>

                {/* Mobile: Permanent accent line / Desktop: Hover accent line */}
                {isMobile ? (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange via-orange-glow to-transparent" />
                ) : (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange via-orange-glow to-transparent origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-10 px-6 md:px-16 mt-12 md:mt-16 text-center"
      >
        <a
          href="https://wa.me/5513997446684?text=Olá! Gostaria de saber mais sobre os acessórios Opium."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 font-sans text-sm tracking-[0.15em] uppercase transition-all duration-300 group border border-foreground/20 text-foreground hover:border-orange hover:text-orange"
          style={{
            background: 'transparent',
          }}
        >
          <span>Consultar Acessórios</span>
          <motion.span
            className="group-hover:text-orange transition-colors"
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            →
          </motion.span>
        </a>
      </motion.div>
    </section>
  );
};

export default GearTechSection;
