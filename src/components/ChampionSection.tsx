import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Flag, Trophy, Cpu, Palette } from 'lucide-react';
import championImage from '@/assets/champion-silhouette.jpg';
import BlurText from '@/components/ui/BlurText';

const authorityBadges = [
  { 
    icon: Flag, 
    title: 'Pioneiro desde 1985',
    description: 'Primeira fábrica de surfskis do Brasil'
  },
  { 
    icon: Trophy, 
    title: '14 Anos Invicto',
    description: 'Domínio absoluto nas competições'
  },
];

const ChampionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden">
      {/* Full-height 2-column grid */}
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
              alt="Fábio Paiva - Pioneiro da Canoagem Oceânica"
              className="w-full h-[120%] object-cover"
              style={{
                filter: 'grayscale(100%) contrast(1.2) brightness(0.85)',
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
          
          {/* Gradient overlay for text readability */}
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
              14×
            </span>
          </motion.div>
        </motion.div>

        {/* Right: Text Content + Authority Badges - Better mobile padding (24px = 1.5rem) */}
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
              text="O Pioneiro."
              animateBy="letters"
              delay={80}
              direction="top"
              className="display-hero text-foreground mb-3 md:mb-4"
            />
            
            {/* Subtitle */}
            <p className="text-base md:text-xl text-foreground/50 font-sans font-light mb-8 md:mb-10 tracking-wide">
              Introdutor da Canoagem Oceânica no Brasil
            </p>

            {/* Manifesto text - Provisional, will be edited */}
            <div className="space-y-4 md:space-y-6 mb-10 md:mb-12">
              <p className="text-base md:text-xl text-foreground/70 leading-relaxed font-sans font-light">
                Há mais de <span className="text-foreground font-medium">30 anos</span>, a Opium nasceu de uma garagem em Santos para dominar o mar.
              </p>
              <p className="text-base md:text-xl text-foreground/70 leading-relaxed font-sans font-light">
                Fábio Paiva, <span className="text-foreground font-medium">14 anos invicto</span> e condutor da Tocha Olímpica (2016) e Pan-Americana (2007), transformou a experiência náutica no país.
              </p>
              <p className="text-base md:text-lg text-foreground/60 leading-relaxed font-sans font-light italic">
                "Cada embarcação que construímos carrega a filosofia de dominar o mar com excelência."
              </p>
            </div>

            {/* Authority Badges Grid */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 mb-12 md:mb-16">
              {authorityBadges.map((badge, index) => (
                <motion.div
                  key={badge.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="group cursor-default"
                >
                  <div className="flex items-start gap-3 md:gap-4">
                    {/* Icon - Enhanced contrast */}
                    <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-foreground/30 group-hover:border-orange bg-foreground/5 transition-colors duration-300">
                      <badge.icon className="w-4 h-4 md:w-5 md:h-5 text-foreground/70 group-hover:text-orange transition-colors duration-300" />
                    </div>
                    
                    {/* Text - Better contrast for outdoor reading */}
                    <div>
                      <h4 className="text-xs md:text-sm font-sans font-medium text-foreground/90 tracking-wide mb-0.5 md:mb-1">
                        {badge.title}
                      </h4>
                      <p className="text-[11px] md:text-xs text-foreground/60 font-sans font-light leading-relaxed">
                        {badge.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Nossos Diferenciais */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {/* Section label */}
              <div className="mb-6">
                <span className="text-[9px] md:text-[10px] tracking-[0.35em] uppercase text-orange/80 font-sans font-medium">
                  Nossos Diferenciais
                </span>
              </div>

              <h3 
                className="text-lg md:text-xl font-medium text-foreground mb-6"
                style={{ letterSpacing: '0.02em' }}
              >
                Por que escolher a Opium<span className="text-orange">?</span>
              </h3>

              <p className="text-sm md:text-base text-foreground/70 leading-relaxed mb-6">
                Com mais de 35 anos de experiência na fabricação de embarcações de alta performance, 
                a Opium se consolidou como referência absoluta no mercado brasileiro. Nossa dedicação 
                à excelência técnica e compromisso com a inovação nos permitiram conquistar 14 títulos 
                consecutivos nas principais competições nacionais.
              </p>

              <p className="text-sm md:text-base text-foreground/70 leading-relaxed mb-6">
                Cada surfski que sai de nossa fábrica é resultado de décadas de conhecimento acumulado, 
                pesquisa de materiais de ponta e feedback direto dos atletas campeões que confiam em 
                nossos produtos para alcançar a vitória.
              </p>

              <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                Somos pioneiros na utilização de fibra de carbono de alta gramatura no Brasil, 
                oferecendo embarcações que combinam leveza extrema, rigidez estrutural e durabilidade 
                incomparável. Quando você escolhe Opium, você escolhe a tradição de quem domina o mar.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ChampionSection;
