import { motion } from 'framer-motion';
import { Anchor, Shield, Link2, Package } from 'lucide-react';
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
    id: 'acessorios',
    name: 'Kit Completo',
    description: 'Tudo para sua aventura',
    icon: <Package className="w-6 h-6 md:w-8 md:h-8" />,
  },
];

// Duplicate for infinite scroll effect
const duplicatedItems = [...gearItems, ...gearItems];

const GearTechSection = () => {
  const isMobile = useIsMobile();

  return (
    <section className="relative py-28 md:py-40 overflow-hidden">
      {/* Background subtle gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(230, 81, 0, 0.04) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 50% 100%, rgba(34, 34, 34, 0.5) 0%, transparent 60%)
          `,
        }}
      />

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Section Header */}
      <div className="relative z-10 px-6 md:px-16 mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-4 mb-4 md:mb-6">
            <div className="w-8 md:w-12 h-px bg-gradient-to-r from-orange to-transparent" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-orange/80 font-sans font-medium">
              Equipamentos
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
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 md:mt-4 text-base md:text-lg text-foreground/50 font-sans font-light max-w-xl"
          >
            Equipamentos premium para completar sua experiência no mar.
          </motion.p>
        </motion.div>
      </div>

      {/* Infinite Slider */}
      <div className="relative">
        {/* Gradient fade left */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        
        {/* Gradient fade right */}
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling container with snap */}
        <motion.div
          className="flex gap-5 md:gap-6 py-4 px-6 overflow-x-auto md:overflow-visible"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
          }}
          animate={{
            x: [0, -1400],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: isMobile ? 50 : 35,
              ease: "linear",
            },
          }}
        >
          {duplicatedItems.map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex-shrink-0 w-[85vw] md:w-80 group"
              style={{ scrollSnapAlign: 'center' }}
              whileHover={isMobile ? undefined : { y: -8 }}
            >
              <div 
                className="relative p-6 md:p-8 h-full"
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {/* Hover glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(249, 115, 22, 0.08) 0%, transparent 50%)',
                  }}
                />

                {/* Icon */}
                <div className={`mb-4 md:mb-6 transition-colors duration-300 ${
                  isMobile ? 'text-orange' : 'text-foreground/40 group-hover:text-orange'
                }`}>
                  {item.icon}
                </div>

                {/* Content */}
                <h3 
                  className="text-lg md:text-xl font-sans font-medium text-foreground mb-2 md:mb-3 tracking-wide"
                  style={{ letterSpacing: '0.03em' }}
                >
                  {item.name}
                </h3>
                <p className="text-sm text-foreground/50 font-sans font-light">
                  {item.description}
                </p>

                {/* Accent line */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange via-orange-glow to-transparent"
                  initial={{ scaleX: isMobile ? 1 : 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{ originX: 0 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-10 px-6 md:px-16 mt-16 md:mt-20 text-center"
      >
        <motion.a
          href="https://wa.me/5513997446684?text=Olá! Gostaria de saber mais sobre os acessórios Opium."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 font-sans text-sm tracking-[0.15em] uppercase transition-all duration-300 group border border-foreground/20 text-foreground hover:border-orange hover:text-orange"
          style={{
            background: 'transparent',
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Consultar Acessórios</span>
          <motion.span
            className="group-hover:text-orange transition-colors"
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            →
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  );
};

export default GearTechSection;
