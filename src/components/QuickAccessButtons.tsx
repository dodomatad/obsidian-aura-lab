import { motion } from 'framer-motion';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

interface QuickAccessCategory {
  label: string;
  eventDetail: string;
}

const CATEGORIES: QuickAccessCategory[] = [
  { label: 'Canoa\nOC1', eventDetail: 'canoa-oc1' },
  { label: 'Canoa\nOC2', eventDetail: 'canoa-oc2' },
  { label: 'Surfski Individual', eventDetail: 'surfski-individual' },
  { label: 'Surfski Duplo', eventDetail: 'surfski-duplo' },
];

const QuickAccessButtons = () => {
  const { handleNavClick } = useSmoothScroll();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, category: QuickAccessCategory) => {
    // Scroll to modelos section
    handleNavClick(e, 'modelos');
    
    // Dispatch event for ProductShowcase to jump to category
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('jump-to-product', { detail: category.eventDetail }));
    }, 600);
  };

  return (
    <section className="relative z-10 w-full py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
        className="max-w-3xl mx-auto px-6 md:px-16"
      >
        {/* Section label */}
        <div className="text-center mb-3">
          <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-foreground/50 font-sporty font-semibold">
            Encontre seu Surfski ou Canoa Havaiana
          </span>
        </div>
        
        {/* Section subtitle */}
        <p className="text-center text-foreground/25 text-[10px] md:text-[11px] tracking-widest uppercase mb-10 md:mb-14 font-sans">
          Acesso direto ao modelo
        </p>

        {/* Button Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {CATEGORIES.map((cat, i) => (
            <motion.a
              key={cat.eventDetail}
              href="#modelos"
              onClick={(e) => handleClick(e, cat)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="group relative overflow-hidden rounded-xl p-6 md:p-7 text-center cursor-pointer border border-orange/30 transition-all duration-300 hover:border-orange/60 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)]"
              style={{
                background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.08) 0%, rgba(249, 115, 22, 0.03) 100%)',
              }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.18) 0%, transparent 70%)',
                }}
              />
              
              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-[20%] right-[20%] h-[2px] bg-orange/0 group-hover:bg-orange/50 transition-all duration-500 rounded-full" />
              
              {/* Label */}
              <span className="text-base md:text-lg font-sporty font-bold tracking-[0.15em] uppercase text-foreground/80 group-hover:text-orange transition-colors duration-300 whitespace-pre-line drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                {cat.label}
              </span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default QuickAccessButtons;
