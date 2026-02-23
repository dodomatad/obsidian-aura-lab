import { motion } from 'framer-motion';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

interface QuickAccessCategory {
  label: string;
  eventDetail: string;
  icon: string; // emoji for visual punch
}

const CATEGORIES: QuickAccessCategory[] = [
  { label: 'Canoa OC1', eventDetail: 'canoa-oc1', icon: '🛶' },
  { label: 'Canoa OC2', eventDetail: 'canoa-oc2', icon: '🛶' },
  { label: 'Surfski Individual', eventDetail: 'surfski-individual', icon: '🏄' },
  { label: 'Surfski Duplo', eventDetail: 'surfski-duplo', icon: '🏄‍♂️' },
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
    <section className="relative z-10 w-full px-4 md:px-16 -mt-12 md:-mt-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
        className="max-w-4xl mx-auto"
      >
        {/* Section label */}
        <div className="text-center mb-4 md:mb-6">
          <span className="text-[9px] md:text-[10px] tracking-[0.35em] uppercase text-foreground/50 font-sans">
            Encontre seu barco
          </span>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {CATEGORIES.map((cat, i) => (
            <motion.a
              key={cat.eventDetail}
              href="#modelos"
              onClick={(e) => handleClick(e, cat)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group relative overflow-hidden rounded-xl p-4 md:p-5 text-center cursor-pointer border border-foreground/[0.06] transition-all duration-300 hover:border-orange/30"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.08) 0%, transparent 70%)',
                }}
              />
              
              {/* Icon */}
              <span className="text-2xl md:text-3xl block mb-2">{cat.icon}</span>
              
              {/* Label */}
              <span className="text-[11px] md:text-xs font-bold tracking-wider uppercase text-foreground/70 group-hover:text-orange transition-colors duration-300">
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
