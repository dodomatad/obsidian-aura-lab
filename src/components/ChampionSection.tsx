import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Flag, Trophy, Cpu, Palette } from 'lucide-react';
import championImage from '@/assets/champion-silhouette.jpg';

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
  { 
    icon: Cpu, 
    title: 'Tecnologia Hightec Line',
    description: 'Inovação em fibra de carbono'
  },
  { 
    icon: Palette, 
    title: 'Design Brasileiro',
    description: 'Engenharia 100% nacional'
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
              className="flex items-center gap-4 mb-6 md:mb-8"
            >
              <div className="w-12 md:w-16 h-px bg-gradient-to-r from-foreground/50 to-transparent" />
              <span className="text-[10px] md:text-[11px] tracking-[0.35em] uppercase text-foreground/50 font-sans font-medium">
                A Origem
              </span>
            </motion.div>

            {/* Title */}
            <h2 
              className="display-hero text-foreground mb-3 md:mb-4"
              style={{
                fontSize: 'clamp(2rem, 6vw, 4.5rem)',
                letterSpacing: '-0.03em',
                lineHeight: 0.95,
              }}
            >
              O Pioneiro<span className="text-orange">.</span>
            </h2>
            
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
                {/* Placeholder for additional bio text */}
                "O mar é o único lugar onde a liberdade é completa. Cada embarcação que construímos carrega essa filosofia."
              </p>
            </div>

            {/* Decorative divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="w-full h-px bg-gradient-to-r from-foreground/30 via-foreground/10 to-transparent origin-left mb-10 md:mb-12"
            />

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

            {/* Galeria de Conquistas - Placeholder Grid for Medals */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {/* Section label */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-gradient-to-r from-orange to-transparent" />
                <span className="text-[9px] md:text-[10px] tracking-[0.35em] uppercase text-orange/80 font-sans font-medium">
                  Conquistas
                </span>
              </div>

              <h3 
                className="text-lg md:text-xl font-medium text-foreground mb-6"
                style={{ letterSpacing: '0.02em' }}
              >
                Galeria de Conquistas<span className="text-orange">.</span>
              </h3>

              {/* Medal Grid - Enhanced visibility with glow on scroll */}
              <div className="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-5">
                {[...Array(8)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.05 }}
                    className="aspect-square relative group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                  >
                    {/* Glow effect on hover */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                      style={{
                        background: 'radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.3) 0%, transparent 70%)',
                        filter: 'blur(15px)',
                        transform: 'scale(1.3)',
                      }}
                    />
                    
                    {/* Enhanced placeholder box */}
                    <div 
                      className="absolute inset-0 border border-white/30 group-hover:border-orange/70 transition-all duration-300 flex items-center justify-center overflow-hidden"
                      style={{
                        background: 'linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)',
                      }}
                    >
                      {/* Inner glow pulse when scrolling into view */}
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: [0, 0.5, 0] }}
                        viewport={{ once: false, margin: "-15%" }}
                        transition={{ duration: 1.8, ease: "easeInOut" }}
                        style={{
                          background: 'radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.35) 0%, transparent 55%)',
                        }}
                      />
                      
                      {/* Trophy icon - High contrast white/40 */}
                      <Trophy className="w-8 h-8 md:w-10 md:h-10 text-white/40 group-hover:text-orange transition-colors duration-300 relative z-10" />
                    </div>
                    
                    {/* Hover tooltip */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      <span className="text-[10px] md:text-[11px] tracking-wider uppercase text-foreground/60">
                        Medalha {index + 1}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Coming soon note - Enhanced */}
              <p className="text-xs md:text-sm text-foreground/50 mt-8 text-center font-sans">
                ✨ Galeria em construção — fotos e descrições em breve
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ChampionSection;
