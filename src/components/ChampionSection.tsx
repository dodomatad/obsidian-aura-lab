import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import championImage from '@/assets/champion-silhouette.jpg';

const achievements = [
  { year: '1994', title: 'Pioneirismo Nacional', location: 'Início da Canoagem Oceânica no Brasil' },
  { year: '2005', title: 'Tecnologia Hightec Line', location: 'Lançamento da Linha Premium' },
  { year: '2010', title: 'Expansão Internacional', location: 'Exportação para América Latina' },
  { year: '2015', title: 'Inovação em Carbono', location: 'Novos Processos de Fabricação' },
  { year: '2020', title: 'Referência no Mercado', location: 'Líder em Surfskis de Elite' },
  { year: '2024', title: '+30 Anos de História', location: 'Legado Consolidado' },
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
              alt="Atleta de elite contemplando o mar"
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
          
          {/* Corner accent lines */}
          <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/20 z-30" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-white/20 z-30" />
          
          {/* Large number overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute bottom-12 left-8 z-30"
          >
            <span 
              className="display-hero text-orange/10"
              style={{ 
                fontSize: 'clamp(6rem, 16vw, 12rem)',
                lineHeight: 0.8,
              }}
            >
              30+
            </span>
          </motion.div>
        </motion.div>

        {/* Right: Text Content + Timeline */}
        <div className="relative flex flex-col justify-center px-8 md:px-12 lg:px-16 xl:px-24 py-16 lg:py-24">
          
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
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-16 h-px bg-gradient-to-r from-orange to-transparent" />
              <span className="text-[11px] tracking-[0.35em] uppercase text-orange font-sans font-medium">
                A Origem
              </span>
            </motion.div>

            {/* Title */}
            <h2 
              className="display-hero text-foreground mb-4"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                letterSpacing: '-0.03em',
                lineHeight: 0.95,
              }}
            >
              O Legado<br />
              <span className="text-orange">Fábio Paiva</span>
            </h2>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-foreground/50 font-sans font-light mb-10 tracking-wide">
              O Introdutor da Canoagem Oceânica no Brasil
            </p>

            {/* Manifesto text */}
            <div className="space-y-8 mb-16">
              <p className="text-lg md:text-xl text-foreground/70 leading-relaxed font-sans font-light">
                Há mais de <span className="text-orange font-medium">30 anos</span> fabricando a história do mar. Fábio Paiva trouxe a canoagem oceânica para o país e transformou o esporte.
              </p>
              <p className="text-lg md:text-xl text-foreground/70 leading-relaxed font-sans font-light">
                Nossos barcos carregam o DNA de quem vive, respira e vence no mar.
              </p>
              <p 
                className="text-2xl md:text-3xl text-foreground font-display italic"
                style={{ letterSpacing: '0.01em', lineHeight: 1.3 }}
              >
                "Não vendemos apenas barcos, entregamos a evolução da espécie."
              </p>
            </div>

            {/* Decorative divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="w-full h-px bg-gradient-to-r from-foreground/30 via-foreground/10 to-transparent origin-left mb-16"
            />

            {/* Vertical Timeline */}
            <div className="relative">
              <h3 className="text-xs tracking-[0.3em] uppercase text-foreground/40 font-sans mb-8">
                Conquistas
              </h3>
              
              {/* Timeline container with vertical line */}
              <div className="relative pl-8 border-l border-foreground/20">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="relative pb-8 last:pb-0 group"
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-[33px] top-1 w-2 h-2 rounded-full bg-foreground/40 group-hover:bg-foreground group-hover:scale-150 transition-all duration-300" />
                    
                    {/* Year - Large and prominent */}
                    <span 
                      className="block text-4xl md:text-5xl font-display text-foreground/90 group-hover:text-foreground transition-colors"
                      style={{ letterSpacing: '-0.02em', lineHeight: 1 }}
                    >
                      {achievement.year}
                    </span>
                    
                    {/* Title & Location */}
                    <div className="mt-2 flex flex-wrap items-baseline gap-x-3">
                      <span className="text-sm tracking-[0.1em] uppercase text-foreground/60 font-sans font-medium">
                        {achievement.title}
                      </span>
                      <span className="text-xs text-foreground/30 font-sans">
                        — {achievement.location}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ChampionSection;
