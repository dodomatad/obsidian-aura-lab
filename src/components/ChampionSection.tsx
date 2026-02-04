import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import championImage from '@/assets/fabio-opium-shirt.jpg';
import BlurText from '@/components/ui/BlurText';
import { useTransition } from '@/context/TransitionContext';

// Import official logos
import logoCanoaBrasil from '@/assets/logo-canoa-brasil.jpg';
import logoKaora from '@/assets/logo-kaora.jpg';
import logoSahyRemando from '@/assets/logo-sahy-remando.jpg';
import logoVoltaIlha from '@/assets/logo-volta-ilha.jpg';
import logoGaragemOceanica from '@/assets/social/garagem-oceanica.jpg';

// Authority logos/badges - Using official logos where available
const authorityLogos = [
  { image: logoCanoaBrasil, title: 'Fundador Canoa Brasil', link: 'https://www.instagram.com/penareiasahy' },
  { image: logoVoltaIlha, title: 'Volta à Ilha de Santo Amaro', link: 'https://www.instagram.com/voltailhasantoamaro' },
  { image: logoSahyRemando, title: 'Projeto Sahy Remando', link: 'https://www.instagram.com/projetosahyremando' },
  { image: logoKaora, title: 'Kaora', link: 'https://www.instagram.com/projeto_kaora' },
  { image: logoGaragemOceanica, title: 'Garagem Oceânica', link: 'https://www.instagram.com/garagemoceanicacanoagem?igsh=MThoeHQwbWMzOGd5Ng==' },
];

const ChampionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { saveScrollPosition } = useTransition();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  // Embla Carousel for Authority Logos - Mobile
  const [emblaMobileRef, emblaMobileApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: 'center',
      skipSnaps: false,
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  // Embla Carousel for Authority Logos - Desktop
  const [emblaDesktopRef, emblaDesktopApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: 'center',
      skipSnaps: false,
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  const [selectedIndexMobile, setSelectedIndexMobile] = useState(0);
  const [selectedIndexDesktop, setSelectedIndexDesktop] = useState(0);

  const scrollPrevMobile = useCallback(() => emblaMobileApi && emblaMobileApi.scrollPrev(), [emblaMobileApi]);
  const scrollNextMobile = useCallback(() => emblaMobileApi && emblaMobileApi.scrollNext(), [emblaMobileApi]);
  const scrollPrevDesktop = useCallback(() => emblaDesktopApi && emblaDesktopApi.scrollPrev(), [emblaDesktopApi]);
  const scrollNextDesktop = useCallback(() => emblaDesktopApi && emblaDesktopApi.scrollNext(), [emblaDesktopApi]);

  const onSelectMobile = useCallback(() => {
    if (!emblaMobileApi) return;
    setSelectedIndexMobile(emblaMobileApi.selectedScrollSnap());
  }, [emblaMobileApi]);

  const onSelectDesktop = useCallback(() => {
    if (!emblaDesktopApi) return;
    setSelectedIndexDesktop(emblaDesktopApi.selectedScrollSnap());
  }, [emblaDesktopApi]);

  useEffect(() => {
    if (!emblaMobileApi) return;
    onSelectMobile();
    emblaMobileApi.on('select', onSelectMobile);
    emblaMobileApi.on('reInit', onSelectMobile);
  }, [emblaMobileApi, onSelectMobile]);

  useEffect(() => {
    if (!emblaDesktopApi) return;
    onSelectDesktop();
    emblaDesktopApi.on('select', onSelectDesktop);
    emblaDesktopApi.on('reInit', onSelectDesktop);
  }, [emblaDesktopApi, onSelectDesktop]);

  return (
    <>
      <section ref={sectionRef} className="relative w-full overflow-hidden">
        {/* ===== PARTE 1: Nossos Diferenciais (Dark Luxury) ===== */}
        <div className="relative py-8 md:py-24 lg:py-32" style={{ backgroundColor: '#050505' }}>
          {/* Subtle texture overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 md:mb-16"
            >
              {/* Section label */}
              <span className="text-[10px] md:text-[11px] tracking-[0.35em] uppercase text-orange font-sans font-semibold">
                O que nos torna únicos
              </span>

              {/* Title - NOSSOS DIFERENCIAIS - Laranja Vibrante Bold */}
              <h2 className="display-hero text-3xl md:text-4xl lg:text-5xl mt-4 mb-6 text-orange font-bold">
                NOSSOS DIFERENCIAIS
              </h2>
            </motion.div>

            {/* Content - Parágrafos com animação escalonada */}
            <div className="space-y-6 md:space-y-8 max-w-3xl mx-auto">
              <motion.p 
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                className="text-base md:text-lg lg:text-xl leading-relaxed font-sans text-center text-neutral-200"
              >
                Com mais de <span className="text-orange font-bold">35 anos de experiência</span> na fabricação de embarcações de alta performance, 
                a Opium se consolidou como <span className="text-orange font-bold">referência absoluta</span> no mercado brasileiro.
              </motion.p>

              <motion.p 
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
                className="text-base md:text-lg lg:text-xl leading-relaxed font-sans text-center text-neutral-200"
              >
                Nossa dedicação à excelência técnica e compromisso com a inovação nos permitiram 
                conquistar <span className="text-foreground font-bold">14 títulos consecutivos</span> nas principais competições nacionais.
              </motion.p>

              <motion.p 
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                className="text-base md:text-lg lg:text-xl leading-relaxed font-sans text-center text-neutral-200"
              >
                Somos <span className="text-foreground font-bold">pioneiros na fibra de carbono</span> de alta gramatura no Brasil, 
                oferecendo embarcações que combinam leveza extrema, rigidez estrutural e 
                durabilidade incomparável.
              </motion.p>
            </div>
          </div>
        </div>

        {/* ===== PARTE 2: História da Marca - A Origem (Dark) ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          
          {/* Left: Full-height Image */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2 }}
            className="relative h-[60vh] lg:h-auto lg:min-h-screen overflow-hidden"
          >
            {/* Image with parallax */}
            <motion.div 
              className="absolute inset-0"
              style={{ y: imageY }}
            >
              <img
                src={championImage}
                alt="Opium - Fábrica de Surfskis"
                className="w-full h-[120%] object-cover"
                style={{
                  filter: 'contrast(1.1) brightness(0.95)',
                }}
              />
            </motion.div>
            
            {/* Film grain overlay */}
            <div 
              className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-40"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />
            
            {/* Gradient overlay */}
            <div 
              className="absolute inset-0 pointer-events-none z-20"
              style={{
                background: `
                  linear-gradient(to right, transparent 60%, hsl(var(--background)) 100%),
                  linear-gradient(to bottom, transparent 70%, hsl(var(--background)) 100%)
                `,
              }}
            />
            
            {/* Large number overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute bottom-12 left-8 z-30"
            >
              <span 
                className="display-hero text-foreground/5"
                style={{ 
                  fontSize: 'clamp(6rem, 16vw, 12rem)',
                  lineHeight: 0.8,
                }}
              >
                35+
              </span>
            </motion.div>
          </motion.div>

          {/* Right: História da Marca */}
          <div className="relative flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-12 md:py-16 lg:py-24">
            
            {/* Subtle background texture */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-5"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            {/* Content wrapper */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-10 max-w-xl"
            >
              {/* Section label */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-6 md:mb-8"
              >
                <span className="text-xl md:text-2xl tracking-[0.1em] md:tracking-[0.2em] uppercase text-orange-500 font-sans font-bold whitespace-nowrap">
                  A Origem
                </span>
              </motion.div>

              {/* Title */}
              <BlurText
                text="A Marca."
                animateBy="letters"
                delay={80}
                direction="top"
                className="display-hero text-foreground mb-3 md:mb-4"
              />
              
              {/* Subtitle */}
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="text-base md:text-xl text-foreground/50 font-sans font-light mb-8 md:mb-10 tracking-wide"
              >
                Nascida para Dominar o Mar
              </motion.p>

              {/* Brand Story - Foco na EMPRESA */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="space-y-4 md:space-y-6 mb-10 md:mb-12"
              >
                <p className="text-base md:text-xl text-foreground/70 leading-relaxed font-sans font-light">
                  Há mais de <span className="text-foreground font-medium">35 anos</span>, a Opium nasceu de uma garagem em Santos. O que começou como um sonho se transformou na maior referência em surfskis do Brasil.
                </p>
                <p className="text-base md:text-xl text-foreground/70 leading-relaxed font-sans font-light">
                  Nossa fábrica é onde a <span className="text-foreground font-medium">tradição encontra a inovação</span>. Cada embarcação é resultado de décadas de pesquisa, materiais de ponta e o feedback direto de campeões.
                </p>
                <p className="text-base md:text-lg text-foreground/60 leading-relaxed font-sans font-light italic">
                  "Da garagem ao mar, a filosofia permanece: excelência absoluta em cada detalhe."
                </p>
              </motion.div>


              {/* Botão: Conheça a História de Fábio Paiva */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Link
                  to="/historia"
                  onClick={saveScrollPosition}
                  className="group relative inline-flex items-center gap-4 px-10 py-5 md:px-12 md:py-6 bg-orange hover:bg-orange/90 rounded-xl shadow-lg shadow-orange/30 hover:shadow-xl hover:shadow-orange/40 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="text-lg md:text-xl lg:text-2xl font-sans font-bold text-background tracking-wide">
                    Conheça a História de Fábio Paiva
                  </span>
                  <ArrowRight className="w-6 h-6 md:w-7 md:h-7 text-background transform group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>

            </motion.div>
          </div>
        </div>

        {/* ===== PARTE 3: Faixa de Logos de Autoridade (Dark) ===== */}
        <div className="relative py-12 md:py-16 border-t border-foreground/10" style={{ backgroundColor: '#050505' }}>
          <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 md:mb-10"
            >
              <span className="text-[10px] md:text-[11px] tracking-[0.35em] uppercase font-sans font-semibold text-orange">
                Projetos & Iniciativas
              </span>
            </motion.div>

            {/* Mobile: Carousel */}
            <div className="md:hidden relative">
              <div className="overflow-hidden" ref={emblaMobileRef}>
                <div className="flex">
                  {authorityLogos.map((logo) => (
                    <div
                      key={logo.title}
                      className="flex-[0_0_50%] min-w-0 px-2"
                    >
                      <a 
                        href={logo.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center text-center p-4 hover:bg-foreground/5 transition-colors duration-300 rounded-lg cursor-pointer"
                      >
                        {logo.image ? (
                          <div className="w-28 h-28 flex items-center justify-center rounded-xl mb-4 bg-white p-3 shadow-lg group-hover:shadow-orange/20 transition-all duration-300">
                            <img 
                              src={logo.image} 
                              alt={logo.title}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className="w-28 h-28 flex items-center justify-center rounded-xl mb-4 bg-orange/10 border-2 border-orange/30 group-hover:border-orange group-hover:bg-orange/20 transition-all duration-300">
                            <span className="text-orange font-bold text-3xl">22ª</span>
                          </div>
                        )}
                        <h4 className="text-base font-sans font-bold tracking-wide text-foreground/90 group-hover:text-orange transition-colors duration-300">
                          {logo.title}
                        </h4>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows - Mobile */}
              <button
                onClick={scrollPrevMobile}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-8 h-8 flex items-center justify-center rounded-full bg-foreground/10 hover:bg-orange/20 border border-foreground/20 hover:border-orange transition-all duration-300 z-10"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-4 h-4 text-foreground/70" />
              </button>
              <button
                onClick={scrollNextMobile}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-8 h-8 flex items-center justify-center rounded-full bg-foreground/10 hover:bg-orange/20 border border-foreground/20 hover:border-orange transition-all duration-300 z-10"
                aria-label="Próximo"
              >
                <ChevronRight className="w-4 h-4 text-foreground/70" />
              </button>

              {/* Dots Indicator - Mobile */}
              <div className="flex justify-center gap-2 mt-6">
                {authorityLogos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => emblaMobileApi?.scrollTo(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === selectedIndexMobile 
                        ? 'bg-orange w-6' 
                        : 'bg-foreground/30 hover:bg-foreground/50'
                    }`}
                    aria-label={`Ir para slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop: Carousel */}
            <div className="hidden md:block relative">
              <div className="overflow-hidden" ref={emblaDesktopRef}>
                <div className="flex">
                  {authorityLogos.map((logo) => (
                    <div
                      key={logo.title}
                      className="flex-[0_0_25%] min-w-0 px-3"
                    >
                      <a 
                        href={logo.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center text-center p-6 hover:bg-foreground/5 transition-colors duration-300 rounded-lg cursor-pointer"
                      >
                        {logo.image ? (
                          <div className="w-32 h-32 flex items-center justify-center rounded-xl mb-5 bg-white p-3 shadow-lg group-hover:shadow-orange/20 transition-all duration-300">
                            <img 
                              src={logo.image} 
                              alt={logo.title}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className="w-32 h-32 flex items-center justify-center rounded-xl mb-5 bg-orange/10 border-2 border-orange/30 group-hover:border-orange group-hover:bg-orange/20 transition-all duration-300">
                            <span className="text-orange font-bold text-4xl">22ª</span>
                          </div>
                        )}
                        <h4 className="text-lg font-sans font-bold tracking-wide text-foreground/90 group-hover:text-orange transition-colors duration-300">
                          {logo.title}
                        </h4>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows - Desktop */}
              <button
                onClick={scrollPrevDesktop}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 flex items-center justify-center rounded-full bg-foreground/10 hover:bg-orange/20 border border-foreground/20 hover:border-orange transition-all duration-300 z-10"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5 text-foreground/70" />
              </button>
              <button
                onClick={scrollNextDesktop}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 flex items-center justify-center rounded-full bg-foreground/10 hover:bg-orange/20 border border-foreground/20 hover:border-orange transition-all duration-300 z-10"
                aria-label="Próximo"
              >
                <ChevronRight className="w-5 h-5 text-foreground/70" />
              </button>

              {/* Dots Indicator - Desktop */}
              <div className="flex justify-center gap-2 mt-6">
                {authorityLogos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => emblaDesktopApi?.scrollTo(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === selectedIndexDesktop 
                        ? 'bg-orange w-6' 
                        : 'bg-foreground/30 hover:bg-foreground/50'
                    }`}
                    aria-label={`Ir para slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChampionSection;
