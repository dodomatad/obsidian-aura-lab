import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
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
    title: 'Kaora - Prevenção e Vida',
    description: 'A canoagem como ferramenta de reabilitação e autoestima para sobreviventes do câncer de mama.',
    link: 'https://www.instagram.com/projeto_kaora',
  },
  {
    image: kaoraOutubroRosa,
    title: 'Outubro Rosa',
    description: 'Celebrando a força e a resiliência das mulheres através do esporte e da conscientização.',
    link: 'https://www.instagram.com/projeto_kaora',
  },
  {
    image: sahyInstruction,
    title: 'Sahy Remando',
    description: 'Educação e esporte formando cidadãos. O futuro da canoagem começa aqui.',
    link: 'https://www.instagram.com/projetosahyremando',
  },
  {
    image: fabioVoltaIlha,
    title: 'Tradição e Comunidade',
    description: 'Fábio Paiva liderando as maiores provas de canoagem oceânica do país.',
    link: 'https://www.instagram.com/voltailhasantoamaro',
  },
  {
    image: kaoraBeach,
    title: 'União e Superação',
    description: 'Equipe Kaora reunida na praia, celebrando conquistas e espalhando esperança.',
    link: 'https://www.instagram.com/projeto_kaora',
  },
];

const SocialImpactSection = () => {
  const isMobile = useIsMobile();
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  return (
    <section className="relative py-20 md:py-32 bg-[#050505] overflow-hidden">
      {/* Background subtle gradient */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(ellipse 80% 50% at 50% 100%, rgba(249, 115, 22, 0.08) 0%, transparent 60%)`,
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
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-orange mb-4 tracking-tight">
            PROJETOS & INICIATIVAS
          </h2>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto">
            Além do esporte, transformamos vidas através da canoagem.
          </p>
        </motion.div>

        {/* Mobile: Carousel */}
        {isMobile ? (
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {projects.map((project, index) => (
                  <div
                    key={project.title}
                    className="flex-[0_0_85%] min-w-0 px-2"
                  >
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10"
                      >
                        {/* Image Container */}
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-sm text-neutral-400 leading-relaxed">
                            {project.description}
                          </p>
                        </div>
                      </motion.div>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === selectedIndex
                      ? 'bg-orange w-6'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Desktop: Grid */
          <div className="grid grid-cols-3 gap-6">
            {projects.slice(0, 3).map((project, index) => (
              <a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-orange/30 transition-all duration-500"
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-base text-neutral-400 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              </a>
            ))}
          </div>
        )}

        {/* Desktop: Second Row */}
        {!isMobile && (
          <div className="grid grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto">
            {projects.slice(3, 5).map((project, index) => (
              <a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.45 + index * 0.15 }}
                  className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-orange/30 transition-all duration-500"
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-base text-neutral-400 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SocialImpactSection;
