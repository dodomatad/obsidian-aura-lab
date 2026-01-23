import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Import project images
import kaoraPool from '@/assets/kaora-pool.jpg';
import kaoraBeach from '@/assets/kaora-beach.jpg';
import sahyInstruction from '@/assets/sahy-instruction.jpg';
import fabioVoltaIlha from '@/assets/fabio-volta-ilha.jpg';
import kaoraOutubroRosa from '@/assets/kaora-outubro-rosa.jpg';

const projects = [
  {
    image: kaoraPool,
    title: 'Projeto Kaora',
    description: 'Recuperação e autoestima para sobreviventes do câncer de mama através da canoagem.',
    tag: 'Saúde & Vida',
    link: 'https://www.instagram.com/projeto_kaora',
  },
  {
    image: kaoraOutubroRosa,
    title: 'Outubro Rosa',
    description: 'Celebrando a força e a resiliência das mulheres através do esporte e da conscientização.',
    tag: 'Saúde & Vida',
    link: 'https://www.instagram.com/projeto_kaora',
  },
  {
    image: sahyInstruction,
    title: 'Sahy Remando',
    description: 'Formando cidadãos e futuros atletas. Educação através do remo.',
    tag: 'Social',
    link: 'https://www.instagram.com/projetosahyremando',
  },
  {
    image: fabioVoltaIlha,
    title: 'Eventos & Comunidade',
    description: 'Fábio Paiva liderando as maiores provas de canoagem do Brasil, como a Volta à Ilha.',
    tag: 'Comunidade',
    link: 'https://www.instagram.com/voltailhasantoamaro',
  },
  {
    image: kaoraBeach,
    title: 'União e Superação',
    description: 'Equipe Kaora reunida na praia, celebrando conquistas e espalhando esperança.',
    tag: 'Comunidade',
    link: 'https://www.instagram.com/projeto_kaora',
  },
];

const SocialImpactSection = () => {
  const isMobile = useIsMobile();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  
  // Autoplay plugin with 3s delay, pause on interaction
  const autoplayPlugin = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
    })
  );
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      slidesToScroll: 1,
    },
    [autoplayPlugin.current]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
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
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Saúde & Vida':
        return 'bg-pink-500/20 text-pink-300 border-pink-500/30';
      case 'Social':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Comunidade':
        return 'bg-white/20 text-white border-white/30';
      default:
        return 'bg-white/10 text-white/70 border-white/20';
    }
  };

  return (
    <section className="relative py-20 md:py-32 bg-[#050505] overflow-hidden">
      {/* Background subtle gradient */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(ellipse 80% 50% at 50% 100%, rgba(249, 115, 22, 0.06) 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block text-orange/80 text-sm font-semibold tracking-widest uppercase mb-4">
            Nossas Iniciativas
          </span>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            ALÉM DO ESPORTE
          </h2>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto">
            Transformando vidas através da canoagem. Conheça os projetos sociais que nos movem.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows - Desktop */}
          {!isMobile && (
            <>
              <button
                onClick={scrollPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-neutral-900 border border-white/10 text-white hover:bg-orange hover:border-orange transition-all duration-300 shadow-xl"
                aria-label="Slide anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={scrollNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-neutral-900 border border-white/10 text-white hover:bg-orange hover:border-orange transition-all duration-300 shadow-xl"
                aria-label="Próximo slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Embla Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {projects.map((project, index) => (
                <div
                  key={project.title + index}
                  className={`min-w-0 px-2 md:px-3 ${
                    isMobile ? 'flex-[0_0_85%]' : 'flex-[0_0_33.333%]'
                  }`}
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block h-full"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative h-full rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 hover:border-foreground/40 transition-all duration-500"
                    >
                      {/* Image Container */}
                      <div className="relative h-56 md:h-64 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-black/40 to-transparent" />
                        
                        {/* Tag Badge */}
                        <div className="absolute top-4 left-4">
                          <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border backdrop-blur-sm ${getTagColor(project.tag)}`}>
                            {project.tag}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 md:p-6">
                        <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-foreground transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
                          {project.description}
                        </p>
                        
                        {/* View more indicator */}
                        <div className="mt-4 flex items-center gap-2 text-foreground/70 group-hover:text-foreground transition-colors">
                          <span className="text-sm font-medium">Ver mais</span>
                          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </motion.div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Arrows */}
          {isMobile && (
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={scrollPrev}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-900 border border-white/10 text-white active:bg-orange active:border-orange transition-all"
                aria-label="Slide anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollNext}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-900 border border-white/10 text-white active:bg-orange active:border-orange transition-all"
                aria-label="Próximo slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Carousel Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? 'bg-orange w-8'
                    : 'bg-white/20 w-2 hover:bg-white/40'
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialImpactSection;
