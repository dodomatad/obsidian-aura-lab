import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Ship, Cpu, Users, MessageCircle } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import opiumLogo from '@/assets/opium-logo-official.png';

// Paddle Menu Button Component - Animated Crossed Paddles
const PaddleMenuButton = ({ isOpen }: { isOpen: boolean }) => {
  const transition = {
    duration: 0.45,
    ease: [0.68, -0.55, 0.265, 1.55] as const,
  };

  return (
    <div className="w-10 h-10 flex flex-col justify-center items-center gap-2 relative p-0">
      {/* Paddle 1 - Upper */}
      <motion.div
        className="w-8 h-1.5 flex items-center justify-between relative"
        style={{ transformOrigin: '50% 50%' }}
        initial={false}
        animate={
          isOpen
            ? {
                y: 7,
                rotate: [45, 40, 45],
              }
            : { y: 0, rotate: 0 }
        }
        transition={
          isOpen
            ? { ...transition, repeat: Infinity, repeatType: 'mirror', duration: 1.6, ease: 'easeInOut' }
            : transition
        }
      >
        <span className="absolute left-0 right-0 h-0.5 bg-current top-1/2 -translate-y-1/2 z-[1]" />
        <span className="w-2 h-full bg-current rounded-tl-full rounded-bl-full z-[2]" />
        <span className="w-2 h-full bg-current rounded-tr-full rounded-br-full z-[2]" />
      </motion.div>

      {/* Paddle 2 - Lower */}
      <motion.div
        className="w-8 h-1.5 flex items-center justify-between relative"
        style={{ transformOrigin: '50% 50%' }}
        initial={false}
        animate={
          isOpen
            ? {
                y: -7,
                rotate: [-45, -40, -45],
              }
            : { y: 0, rotate: 0 }
        }
        transition={
          isOpen
            ? { ...transition, repeat: Infinity, repeatType: 'mirror', duration: 1.6, ease: 'easeInOut' }
            : transition
        }
      >
        <span className="absolute left-0 right-0 h-0.5 bg-current top-1/2 -translate-y-1/2 z-[1]" />
        <span className="w-2 h-full bg-current rounded-tl-full rounded-bl-full z-[2]" />
        <span className="w-2 h-full bg-current rounded-tr-full rounded-br-full z-[2]" />
      </motion.div>
    </div>
  );
};

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
          className="md:hidden p-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg transition-all duration-300 hover:bg-foreground/10 active:bg-foreground/20 text-foreground/80 group"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => {
            // Haptic feedback for mobile
            if ('vibrate' in navigator) {
              navigator.vibrate(10);
            }
          }}
        >
          <PaddleMenuButton isOpen={open} />
        </button>
      </SheetTrigger>
      
      <SheetContent 
        side="right" 
        className="w-[280px] sm:w-[320px] border-l border-foreground/10 p-0 [&>button]:hidden"
        style={{
          background: 'rgba(10, 10, 12, 0.95)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
        }}
      >
        {/* Header with Paddle Close Button */}
        <SheetHeader className="p-6 pb-4 border-b border-foreground/10 flex flex-row items-center justify-between">
          <SheetTitle className="text-left">
            <img 
              src={opiumLogo} 
              alt="OPIUM" 
              className="h-6 w-auto"
            />
          </SheetTitle>
          
          {/* Custom Paddle Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-lg transition-all duration-300 hover:bg-foreground/10 active:bg-foreground/20 text-foreground/80"
            aria-label="Fechar menu"
          >
            <PaddleMenuButton isOpen={true} />
          </button>
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
                  <item.icon className="w-5 h-5 text-foreground/40 group-hover:text-foreground transition-colors" />
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
