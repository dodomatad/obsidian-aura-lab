import { motion } from 'framer-motion';
import { Home, Ship, Cpu, MessageCircle } from 'lucide-react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

interface DockItem {
  id: string;
  label: string;
  icon: React.ElementType;
  isContact?: boolean;
}

const dockItems: DockItem[] = [
  { id: 'hero', label: 'Início', icon: Home },
  { id: 'modelos', label: 'Modelos', icon: Ship },
  { id: 'atelier', label: 'Tecnologia', icon: Cpu },
  { id: 'contato', label: 'Contato', icon: MessageCircle, isContact: true },
];

const MobileDock = () => {
  const { handleNavClick } = useSmoothScroll();

  const handleDockClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();
    
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'contato') {
      // Open WhatsApp directly
      window.open(
        'https://wa.me/5513997446684?text=Olá! Gostaria de saber mais sobre os produtos Opium.',
        '_blank'
      );
    } else {
      handleNavClick(e as React.MouseEvent<HTMLAnchorElement>, id);
    }
  };

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-area-bottom"
    >
      {/* Dock Container */}
      <div 
        className="mx-3 mb-3 rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(10, 10, 12, 0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        }}
      >
        <div className="flex items-center justify-around px-2 py-2">
          {dockItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={(e) => handleDockClick(e, item.id)}
              className={`relative flex flex-col items-center justify-center py-2 px-4 rounded-xl transition-all duration-300 ${
                item.isContact 
                  ? 'flex-row gap-2' 
                  : ''
              }`}
              style={item.isContact ? {
                background: 'linear-gradient(135deg, hsl(var(--orange)) 0%, hsl(25 100% 45%) 100%)',
                boxShadow: '0 4px 20px rgba(249, 115, 22, 0.35)',
              } : undefined}
              whileTap={{ scale: 0.92 }}
            >
              {item.isContact ? (
                // Contact button - horizontal layout
                <div className="flex items-center gap-1.5 px-2">
                  <item.icon className="w-4 h-4 text-white" strokeWidth={2.5} />
                  <span className="text-[11px] font-medium text-white tracking-wide">
                    {item.label}
                  </span>
                </div>
              ) : (
                // Regular items - vertical layout
                <>
                  <div className="relative">
                    <item.icon 
                      className="w-5 h-5 text-foreground/60 group-hover:text-foreground transition-colors" 
                      strokeWidth={1.5} 
                    />
                  </div>
                  <span className="text-[9px] font-medium text-foreground/50 tracking-wide mt-1 uppercase">
                    {item.label}
                  </span>
                </>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Safe area spacer for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-transparent" />
    </motion.nav>
  );
};

export default MobileDock;
