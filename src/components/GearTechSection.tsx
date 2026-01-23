import { motion } from 'framer-motion';
import { useRef, useCallback, useEffect, useState } from 'react';
import { Anchor, Shield, Link2, Package, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
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
  const sectionRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const autoplayPlugin = useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      slidesToScroll: 1,
    },
    [autoplayPlugin.current]
  );

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
    <section ref={sectionRef} className="relative py-12 md:py-40 overflow-hidden">
      
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
      <div className="relative px-6 md:px-16 max-w-4xl mx-auto">
        {/* Navigation Arrows */}
        <button
          onClick={scrollPrev}
          className="absolute -left-2 md:left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-foreground/20 bg-background/80 backdrop-blur-sm text-foreground/60 hover:text-orange hover:border-orange transition-all duration-300"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <button
          onClick={scrollNext}
          className="absolute -right-2 md:right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-foreground/20 bg-background/80 backdrop-blur-sm text-foreground/60 hover:text-orange hover:border-orange transition-all duration-300"
          aria-label="Próximo"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Embla Carousel - Single card view */}
        <div className="overflow-hidden mx-8 md:mx-16" ref={emblaRef}>
          <div className="flex">
            {gearItems.map((item, index) => (
              <div
                key={item.id}
                className="flex-shrink-0 min-w-0 px-2"
                style={{ flexBasis: '100%' }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group h-full"
                >
                  <div 
                    className="relative p-8 md:p-12 h-full min-h-[240px] md:min-h-[280px] flex flex-col items-center justify-center text-center"
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
                        background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255, 255, 255, 0.08) 0%, transparent 50%)',
                      }}
                    />

                    {/* Icon - Larger */}
                    <div className="mb-6 text-foreground">
                      <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
                        {item.icon}
                      </div>
                    </div>

                    {/* Content - Centered */}
                    <h3 
                      className="text-2xl md:text-3xl font-sans font-medium text-foreground mb-3 md:mb-4 tracking-wide"
                      style={{ letterSpacing: '0.03em' }}
                    >
                      {item.name}
                    </h3>
                    <p className="text-base md:text-lg text-foreground/50 font-sans font-light max-w-md">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {gearItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => emblaApi?.scrollTo(index)}
              className="w-10 h-10 flex items-center justify-center"
              aria-label={`Ir para ${item.name}`}
            >
              <span 
                className={`block w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  emblaApi?.selectedScrollSnap() === index 
                    ? 'bg-orange scale-125' 
                    : 'bg-foreground/30 hover:bg-foreground/50'
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
