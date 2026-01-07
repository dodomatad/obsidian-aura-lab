import { motion } from 'framer-motion';
import heroSurfski from '@/assets/hero-surfski.png';
import ExperienceSelector from '@/components/ExperienceSelector';
import AtelierSection from '@/components/AtelierSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-xl font-medium tracking-tight"
        >
          STUDIO
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex gap-8"
        >
          <a href="#work" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-grow">
            Work
          </a>
          <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-grow">
            About
          </a>
          <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-grow">
            Contact
          </a>
        </motion.div>
      </nav>

      {/* Hero Section - Full Bleed Image */}
      <section className="relative h-screen overflow-hidden">
        {/* Full Background Image */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <img 
            src={heroSurfski} 
            alt="Atleta remando surfski"
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
        </motion.div>

        {/* Title - Overlay */}
        <div className="absolute inset-0 flex items-center justify-start px-6 md:px-12 z-10">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.16, 1, 0.3, 1],
              delay: 0.5
            }}
          >
            <h1 
              className="font-display font-bold text-foreground select-none"
              style={{
                fontSize: 'clamp(3rem, 12vw, 12rem)',
                letterSpacing: '-0.04em',
                lineHeight: 0.85,
              }}
            >
              LIBERDADE<br />
              <span className="text-foreground/50">NÃO SE</span><br />
              EXPLICA
            </h1>
          </motion.div>
        </div>

        {/* Subtexto - Canto Inferior Direito */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-12 right-6 md:right-12 z-20 text-right max-w-xs"
        >
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed tracking-wide">
            Surfskis de Elite.<br />
            Performance Pura.<br />
            Personalização Absoluta.
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 left-6 md:left-12 z-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-foreground/50 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* Experience Selector Section */}
      <ExperienceSelector />

      {/* Atelier Section */}
      <AtelierSection />

      {/* Statement Section */}
      <section className="px-6 md:px-12 py-32 border-t border-border">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="display-medium text-muted-foreground">
            Cada embarcação é uma{' '}
            <span className="text-foreground">obra de arte</span> feita para{' '}
            <span className="text-foreground">você</span>.
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-12 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="font-display text-xl font-medium tracking-tight">
            LIBERDADE
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-grow">
              Instagram
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-grow">
              WhatsApp
            </a>
          </div>
          <div className="text-xs text-muted-foreground">
            © 2024 Todos os direitos reservados
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
