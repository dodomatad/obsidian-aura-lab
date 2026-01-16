import { useState } from 'react';
import { Menu, Home, Ship, Cpu, Users, MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import opiumLogo from '@/assets/opium-logo-official.png';

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  

  const menuItems = [
    { icon: Home, label: 'Início', href: '#hero', id: 'hero' },
    { icon: Ship, label: 'Modelos', href: '#modelos', id: 'modelos' },
    { icon: Cpu, label: 'Tecnologia', href: '#atelier', id: 'atelier' },
    { icon: Users, label: 'História', href: '#champion', id: 'champion' },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setOpen(false);
    // Small delay to allow sheet to close before scrolling
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="md:hidden p-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg transition-all duration-300 hover:bg-foreground/10 active:bg-foreground/20"
          aria-label="Abrir menu"
          onClick={() => {
            // Haptic feedback for mobile
            if ('vibrate' in navigator) {
              navigator.vibrate(10);
            }
          }}
        >
          <Menu className="w-5 h-5 text-foreground/80" />
        </button>
      </SheetTrigger>
      
      <SheetContent 
        side="right" 
        className="w-[280px] sm:w-[320px] border-l border-foreground/10 p-0"
        style={{
          background: 'rgba(10, 10, 12, 0.95)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
        }}
      >
        {/* Header */}
        <SheetHeader className="p-6 pb-4 border-b border-foreground/10">
          <SheetTitle className="text-left">
            <img 
              src={opiumLogo} 
              alt="OPIUM" 
              className="h-6 w-auto"
            />
          </SheetTitle>
        </SheetHeader>

        {/* Navigation Links */}
        <nav className="p-4">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.1 }}
              >
                <a
                  href={item.href}
                  onClick={(e) => handleClick(e, item.id)}
                  className="flex items-center gap-4 px-4 py-4 rounded-xl text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-all duration-300 group"
                >
                  <item.icon className="w-5 h-5 text-foreground/40 group-hover:text-orange transition-colors" />
                  <span className="text-sm tracking-wide font-medium">{item.label}</span>
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* CTA WhatsApp Button */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-foreground/10">
          <motion.a
            href="https://wa.me/5513997446684?text=Olá! Gostaria de saber mais sobre os produtos Opium."
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-3 w-full py-4 rounded-xl text-white font-medium text-sm tracking-wide transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--orange)) 0%, hsl(25 100% 45%) 100%)',
              boxShadow: '0 4px 20px rgba(249, 115, 22, 0.35)',
            }}
          >
            <MessageCircle className="w-5 h-5" />
            Falar com Especialista
          </motion.a>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
