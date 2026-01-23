import { motion } from 'framer-motion';
import { Palette, Sparkles, ArrowRight } from 'lucide-react';

// Atelier Images
import atelierPaletteShowcase from '@/assets/atelier/atelier-palette-showcase.jpg';
import atelierCustomExotic from '@/assets/atelier/atelier-custom-exotic.jpg';
import atelierBlueGreen from '@/assets/atelier/atelier-blue-green.jpg';
import atelierSiouOrange from '@/assets/atelier/atelier-siou-orange.jpg';

// Complementary images from existing boats
import infinityDetail from '@/assets/boats/infinity/infinity-detail-1.jpg';
import moanaAngle from '@/assets/boats/moana/moana-angle.jpg';

const ColorStudio = () => {
  const whatsappLink = "https://wa.me/5513997446684?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20pinturas%20personalizadas.";

  return (
    <section className="relative bg-black py-20 md:py-32 overflow-hidden">
      {/* Subtle background gradient */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 60%)',
        }}
      />
      
      {/* Noise texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Palette className="w-5 h-5 text-foreground/60" />
            <span className="text-xs uppercase tracking-[0.25em] text-foreground/60 font-medium">
              Opium Custom Shop
            </span>
            <Sparkles className="w-5 h-5 text-foreground/60" />
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground font-bold mb-4">
            Sua Identidade na Água
          </h2>
          
          <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto">
            Do clássico ao exótico. Nossos artistas transformam seu surfski em uma obra de arte única.
          </p>
        </motion.div>

        {/* Bento Grid Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12">
          
          {/* Hero Image - Large (spans 2 cols and 2 rows on desktop) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="col-span-2 row-span-2 relative group rounded-2xl overflow-hidden aspect-square md:aspect-auto"
          >
            {/* Cyan/Orange Glow */}
            <div 
              className="absolute -inset-4 opacity-0 group-hover:opacity-60 transition-opacity duration-700 blur-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.4) 0%, rgba(249, 115, 22, 0.3) 100%)',
              }}
            />
            <div className="relative h-full">
              <img 
                src={atelierPaletteShowcase} 
                alt="Variedade de cores OPIUM" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                <span className="text-xs uppercase tracking-wider text-cyan-400 font-medium">Paleta Exclusiva</span>
                <h3 className="text-xl md:text-2xl font-display text-white font-bold">Cores Vibrantes</h3>
              </div>
            </div>
          </motion.div>

          {/* Exotic Custom - Purple/Yellow boat */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="col-span-2 md:col-span-2 relative group rounded-2xl overflow-hidden aspect-[16/9]"
          >
            {/* Purple/Yellow Glow */}
            <div 
              className="absolute -inset-4 opacity-0 group-hover:opacity-60 transition-opacity duration-700 blur-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.5) 0%, rgba(234, 179, 8, 0.4) 100%)',
              }}
            />
            <div className="relative h-full">
              <img 
                src={atelierCustomExotic} 
                alt="Customização Exótica Verde e Roxo" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-xs uppercase tracking-wider text-purple-400 font-medium">Customização Radical</span>
                <h3 className="text-lg md:text-xl font-display text-white font-bold">Verde & Roxo</h3>
              </div>
            </div>
          </motion.div>

          {/* Blue/Green boat */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group rounded-2xl overflow-hidden aspect-square"
          >
            {/* Blue/Green Glow */}
            <div 
              className="absolute -inset-4 opacity-0 group-hover:opacity-60 transition-opacity duration-700 blur-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.5) 0%, rgba(34, 197, 94, 0.4) 100%)',
              }}
            />
            <div className="relative h-full">
              <img 
                src={atelierBlueGreen} 
                alt="Azul e Verde" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="text-[10px] uppercase tracking-wider text-blue-400 font-medium">Clássico</span>
                <h3 className="text-sm font-display text-white font-bold">Azul Ocean</h3>
              </div>
            </div>
          </motion.div>

          {/* Siou Orange */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative group rounded-2xl overflow-hidden aspect-square"
          >
            {/* Orange Glow */}
            <div 
              className="absolute -inset-4 opacity-0 group-hover:opacity-60 transition-opacity duration-700 blur-3xl"
              style={{
                background: 'radial-gradient(circle, rgba(249, 115, 22, 0.5) 0%, transparent 70%)',
              }}
            />
            <div className="relative h-full">
              <img 
                src={atelierSiouOrange} 
                alt="SIOU Laranja" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="text-[10px] uppercase tracking-wider text-orange-400 font-medium">Destaque</span>
                <h3 className="text-sm font-display text-white font-bold">Laranja Sunset</h3>
              </div>
            </div>
          </motion.div>

          {/* Infinity Neon Detail */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative group rounded-2xl overflow-hidden aspect-square"
          >
            {/* Cyan Glow */}
            <div 
              className="absolute -inset-4 opacity-0 group-hover:opacity-60 transition-opacity duration-700 blur-3xl"
              style={{
                background: 'radial-gradient(circle, rgba(6, 182, 212, 0.5) 0%, transparent 70%)',
              }}
            />
            <div className="relative h-full">
              <img 
                src={infinityDetail} 
                alt="Detalhe Neon Infinity" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="text-[10px] uppercase tracking-wider text-cyan-400 font-medium">Neon</span>
                <h3 className="text-sm font-display text-white font-bold">Infinity</h3>
              </div>
            </div>
          </motion.div>

          {/* Moana Red */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative group rounded-2xl overflow-hidden aspect-square"
          >
            {/* Red Glow */}
            <div 
              className="absolute -inset-4 opacity-0 group-hover:opacity-60 transition-opacity duration-700 blur-3xl"
              style={{
                background: 'radial-gradient(circle, rgba(239, 68, 68, 0.5) 0%, transparent 70%)',
              }}
            />
            <div className="relative h-full">
              <img 
                src={moanaAngle} 
                alt="Moana Vermelho" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="text-[10px] uppercase tracking-wider text-red-400 font-medium">Vibrante</span>
                <h3 className="text-sm font-display text-white font-bold">Vermelho</h3>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold text-sm uppercase tracking-wider rounded-full hover:bg-foreground/90 transition-all duration-300 group"
          >
            <Palette className="w-5 h-5" />
            Consultar Pintura Especial
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          
          <p className="mt-4 text-sm text-foreground/40">
            Pinturas exclusivas feitas sob medida para você
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ColorStudio;
