import { motion } from 'framer-motion';
import { Anchor, Shield, Zap } from 'lucide-react';

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
    description: 'Leveza extrema, máxima eficiência',
    icon: <Anchor className="w-8 h-8" />,
  },
  {
    id: 'bolsas',
    name: 'Bolsas Estanques',
    description: 'Proteção total para seus equipamentos',
    icon: <Shield className="w-8 h-8" />,
  },
  {
    id: 'acessorios',
    name: 'Acessórios de Performance',
    description: 'Upgrade completo para sua jornada',
    icon: <Zap className="w-8 h-8" />,
  },
  {
    id: 'remos-2',
    name: 'Remos de Carbono',
    description: 'Leveza extrema, máxima eficiência',
    icon: <Anchor className="w-8 h-8" />,
  },
  {
    id: 'bolsas-2',
    name: 'Bolsas Estanques',
    description: 'Proteção total para seus equipamentos',
    icon: <Shield className="w-8 h-8" />,
  },
  {
    id: 'acessorios-2',
    name: 'Acessórios de Performance',
    description: 'Upgrade completo para sua jornada',
    icon: <Zap className="w-8 h-8" />,
  },
];

const GearTechSection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background subtle gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(230, 81, 0, 0.03) 0%, transparent 60%)',
        }}
      />

      {/* Section Header */}
      <div className="relative z-10 px-8 md:px-16 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-orange to-transparent" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-orange font-sans font-medium">
              Equipamentos
            </span>
          </div>
          <h2 
            className="display-hero text-foreground"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              letterSpacing: '-0.02em',
            }}
          >
            GEAR & TECH
          </h2>
          <p className="mt-4 text-lg text-foreground/50 font-sans font-light max-w-xl">
            Acessórios premium para maximizar sua performance no mar.
          </p>
        </motion.div>
      </div>

      {/* Infinite Slider */}
      <div className="relative">
        {/* Gradient fade left */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        
        {/* Gradient fade right */}
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling container */}
        <motion.div
          className="flex gap-6 py-4"
          animate={{
            x: [0, -1200],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {gearItems.map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              className="flex-shrink-0 w-80 md:w-96 group cursor-pointer"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className="relative p-8 md:p-10 rounded-none h-full"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {/* Icon */}
                <div className="text-orange/70 group-hover:text-orange transition-colors duration-300 mb-6">
                  {item.icon}
                </div>

                {/* Content */}
                <h3 
                  className="text-xl md:text-2xl font-sans font-medium text-foreground mb-3 tracking-wide"
                  style={{ letterSpacing: '0.05em' }}
                >
                  {item.name}
                </h3>
                <p className="text-sm text-foreground/50 font-sans font-light">
                  {item.description}
                </p>

                {/* Hover accent line */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange via-orange-glow to-transparent origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                />
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
        className="relative z-10 px-8 md:px-16 mt-16 text-center"
      >
        <a
          href="https://wa.me/5500000000000?text=Olá! Gostaria de saber mais sobre os acessórios."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 font-sans text-sm tracking-[0.15em] uppercase transition-all duration-300 group"
          style={{
            background: 'linear-gradient(135deg, hsl(25 100% 45%) 0%, hsl(25 100% 35%) 100%)',
            color: 'white',
            boxShadow: '0 4px 24px rgba(230, 81, 0, 0.3)',
          }}
        >
          <span>Consultar Acessórios</span>
          <motion.span
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
