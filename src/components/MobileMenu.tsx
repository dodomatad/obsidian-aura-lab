import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleNavClick } = useSmoothScroll();

  const menuItems = [
    { id: 'hero', label: 'Home' },
    { id: 'modelos', label: 'Barcos' },
    { id: 'atelier', label: 'Acessórios' },
    { id: 'footer', label: 'Contato' },
  ];

  const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    setIsOpen(false);
    if (id === 'hero') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'footer') {
      e.preventDefault();
      const footer = document.querySelector('footer');
      footer?.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleNavClick(e, id);
    }
  };

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 w-10 h-10 flex items-center justify-center rounded-full"
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(10px)',
        }}
        whileTap={{ scale: 0.95 }}
        aria-label="Menu"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5 text-foreground" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-5 h-5 text-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40"
            style={{
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
          >
            {/* Menu Content */}
            <div className="flex flex-col items-center justify-center h-full">
              <nav className="flex flex-col items-center gap-8">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleMenuClick(e, item.id)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="text-2xl font-sans tracking-[0.2em] uppercase text-foreground/80 hover:text-orange transition-colors"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="absolute bottom-16 flex gap-8"
              >
                <a
                  href="https://instagram.com/opiumsurfski"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground/50 hover:text-orange transition-colors tracking-wide"
                >
                  Instagram
                </a>
                <a
                  href="https://wa.me/5513997446684?text=Olá! Gostaria de saber mais sobre os produtos Opium."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground/50 hover:text-orange transition-colors tracking-wide"
                >
                  WhatsApp
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
