import { motion, useInView } from 'framer-motion';
import { useRef, useCallback, useEffect, useState } from 'react';
import { Anchor, Shield, Link2, Package, ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import useEmblaCarousel from 'embla-carousel-react';
import BlurText from '@/components/ui/BlurText';

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

const GearTechSection = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    containScroll: false,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section ref={sectionRef} className="relative py-28 md:py-40 overflow-hidden">
      
      {/* Background subtle gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 100% 40% at 50% 0%, rgba(249, 115, 22, 0.02) 0%, transparent 70%)
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
          <div className="mb-4 md:mb-6">
            <span className="text-[10px] tracking-[0.4em] uppercase text-orange/80 font-sans font-medium">
              Equipamentos
            </span>
          </div>
          <BlurText
            text="Opium Gear."
            animateBy="letters"
            delay={50}
            direction="top"
            className="display-hero text-foreground"
          />
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

      {/* Carousel Container */}
      <div className="relative px-6 md:px-16">
        {/* Navigation Arrows - Desktop only */}
        <button
          onClick={scrollPrev}
          className="hidden md:flex absolute -left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full border border-foreground/20 bg-background/80 backdrop-blur-sm text-foreground/60 hover:text-orange hover:border-orange transition-all duration-300"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <button
          onClick={scrollNext}
          className="hidden md:flex absolute -right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full border border-foreground/20 bg-background/80 backdrop-blur-sm text-foreground/60 hover:text-orange hover:border-orange transition-all duration-300"
          aria-label="Próximo"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Gradient fade left */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        
        {/* Gradient fade right */}
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Embla Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {gearItems.map((item, index) => (
              <div
                key={item.id}
                className="flex-shrink-0 min-w-0 pl-4 md:pl-6"
                style={{
                  flexBasis: isMobile ? '85%' : '25%',
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group h-full"
                  whileHover={isMobile ? undefined : { y: -8 }}
                >
                  <div 
                    className="relative p-6 md:p-8 h-full min-h-[180px] md:min-h-[220px]"
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
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation Dots */}
        <div className="flex md:hidden justify-center gap-2 mt-6">
          {gearItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => emblaApi?.scrollTo(index)}
              className="w-8 h-8 flex items-center justify-center"
              aria-label={`Ir para ${item.name}`}
            >
              <span 
                className={`block w-2 h-2 rounded-full transition-all duration-300 ${
                  emblaApi?.selectedScrollSnap() === index 
                    ? 'bg-orange w-4' 
                    : 'bg-foreground/30'
                }`}
              />
            </button>
          ))}
        </div>
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
