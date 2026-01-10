import { motion } from 'framer-motion';
import championImage from '@/assets/champion-silhouette.jpg';

const achievements = [
  { year: '2018', title: 'Campeão Nacional', location: 'Florianópolis' },
  { year: '2019', title: 'Campeão Sul-Americano', location: 'Rio de Janeiro' },
  { year: '2020', title: 'Bicampeão Nacional', location: 'Santos' },
  { year: '2021', title: 'Campeão Mundial', location: 'Portugal' },
  { year: '2022', title: 'Tricampeão Nacional', location: 'Recife' },
  { year: '2023', title: 'Bicampeão Mundial', location: 'Austrália' },
  { year: '2024', title: 'Tetracampeão Nacional', location: 'Vitória' },
];

const ChampionSection = () => {
  return (
    <section className="relative min-h-screen w-full py-24 md:py-32 overflow-hidden">
      {/* Transition gradient from hero */}
      <div 
        className="absolute top-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, hsl(var(--background)))',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Vertical Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[2/3] max-h-[70vh] overflow-hidden">
              {/* Film grain overlay */}
              <div 
                className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-30"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
              />
              
              {/* Image */}
              <img
                src={championImage}
                alt="Atleta de elite contemplando o mar"
                className="w-full h-full object-cover grayscale contrast-125"
                style={{
                  filter: 'grayscale(100%) contrast(1.2) brightness(0.9)',
                }}
              />
              
              {/* Subtle vignette */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
                }}
              />
              
              {/* Corner accent lines */}
              <div className="absolute top-4 left-4 w-12 h-12 border-l border-t border-white/20" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-r border-b border-white/20" />
            </div>
          </motion.div>

          {/* Right: Manifesto Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 lg:pl-8"
          >
            {/* Section label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-px bg-foreground/30" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 font-sans">
                A Origem
              </span>
            </motion.div>

            {/* Title */}
            <h2 
              className="display-hero text-foreground mb-8"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              Mente de<br />
              <span className="text-foreground/70">Campeão</span>
            </h2>

            {/* Manifesto text */}
            <div className="space-y-6 max-w-lg">
              <p className="text-lg md:text-xl text-foreground/70 leading-relaxed font-sans font-light">
                A Opium nasceu da exigência. Criada por quem venceu o mar 7 vezes.
              </p>
              <p 
                className="text-2xl md:text-3xl text-foreground font-display italic"
                style={{ letterSpacing: '0.02em' }}
              >
                Disciplina é a nossa liberdade.
              </p>
            </div>

            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="w-24 h-px bg-foreground/20 mt-12 origin-left"
            />
          </motion.div>
        </div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-24 md:mt-32"
        >
          {/* Timeline header */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <span 
                className="text-5xl md:text-6xl font-display text-foreground"
                style={{ letterSpacing: '-0.02em' }}
              >
                7×
              </span>
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-foreground/40 font-sans">
                  Títulos
                </p>
                <p className="text-sm text-foreground/60 font-sans">
                  Nacionais & Mundiais
                </p>
              </div>
            </div>
            
            {/* Horizontal line */}
            <div className="hidden md:block flex-1 mx-8 h-px bg-foreground/10" />
          </div>

          {/* Timeline grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-4 border border-foreground/10 hover:border-foreground/30 transition-colors duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                }}
              >
                {/* Year */}
                <span 
                  className="block text-2xl md:text-3xl font-display text-foreground/80 group-hover:text-foreground transition-colors"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {achievement.year}
                </span>
                
                {/* Title */}
                <p className="text-[10px] tracking-[0.15em] uppercase text-foreground/40 mt-2 font-sans">
                  {achievement.title}
                </p>
                
                {/* Location */}
                <p className="text-[9px] text-foreground/30 mt-1 font-sans">
                  {achievement.location}
                </p>
                
                {/* Hover accent */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-px bg-foreground/50"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom transition */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, transparent, transparent)',
        }}
      />
    </section>
  );
};

export default ChampionSection;
