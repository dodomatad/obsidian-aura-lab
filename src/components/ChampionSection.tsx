import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Flag, Trophy, Anchor, Ship, Users, Award, ArrowRight } from 'lucide-react';
import championImage from '@/assets/fabio-champion.jpg';
import BlurText from '@/components/ui/BlurText';
import { useTransition } from '@/context/TransitionContext';

// Authority logos/badges - Títulos exatos da cliente
const authorityLogos = [
  { icon: Anchor, title: 'Fundador Canoa Brasil' },
  { icon: Ship, title: 'Volta à Ilha de Santo Amaro' },
  { icon: Users, title: 'Projeto Sally Remo' },
  { icon: Award, title: 'Kaora' },
];


const ChampionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { saveScrollPosition } = useTransition();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <>
      <section ref={sectionRef} className="relative w-full overflow-hidden">
        {/* ===== PARTE 1: Nossos Diferenciais (Dark Luxury) ===== */}
        <div className="relative py-16 md:py-24 lg:py-32" style={{ backgroundColor: '#050505' }}>
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
                conquistar <span className="text-orange font-bold">14 títulos consecutivos</span> nas principais competições nacionais.
              </motion.p>

              <motion.p 
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                className="text-base md:text-lg lg:text-xl leading-relaxed font-sans text-center text-neutral-200"
              >
                Somos <span className="text-orange font-bold">pioneiros na fibra de carbono</span> de alta gramatura no Brasil, 
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
                <span className="text-[10px] md:text-[11px] tracking-[0.35em] uppercase text-foreground/50 font-sans font-medium">
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Link
                  to="/historia"
                  onClick={saveScrollPosition}
                  className="group inline-flex items-center gap-3 px-6 py-3 border border-orange/50 hover:border-orange hover:bg-orange/10 transition-all duration-300"
                >
                  <span className="text-sm md:text-base font-sans font-medium text-foreground/90 group-hover:text-orange transition-colors">
                    Conheça a História de Fábio Paiva
                  </span>
                  <ArrowRight className="w-4 h-4 text-orange transform group-hover:translate-x-1 transition-transform" />
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

            {/* Authority Logos Grid - Invertidos para Dark */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {authorityLogos.map((logo, index) => (
                <motion.div
                  key={logo.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  className="group flex flex-col items-center text-center p-4 md:p-6 hover:bg-foreground/5 transition-colors duration-300 rounded-lg"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full mb-4 transition-all duration-300 bg-orange/10 border-2 border-orange/30 group-hover:border-orange group-hover:bg-orange/20">
                    <logo.icon className="w-6 h-6 md:w-7 md:h-7 text-orange transition-colors duration-300" />
                  </div>
                  <h4 className="text-sm md:text-base font-sans font-bold tracking-wide text-foreground/90 group-hover:text-orange transition-colors duration-300">
                    {logo.title}
                  </h4>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChampionSection;
