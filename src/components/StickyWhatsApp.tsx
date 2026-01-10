import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const StickyWhatsApp = () => {
  return (
    <motion.a
      href="https://wa.me/5513997446684?text=Olá! Gostaria de saber mais sobre os produtos Opium."
      target="_blank"
      rel="noopener noreferrer"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      className="fixed bottom-4 left-4 right-4 md:hidden z-50 flex items-center justify-center gap-3 py-4 px-6 rounded-full"
      style={{
        background: 'linear-gradient(135deg, hsl(var(--orange)) 0%, hsl(25 100% 45%) 100%)',
        boxShadow: '0 8px 32px rgba(249, 115, 22, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3)',
      }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle className="w-5 h-5 text-white" />
      <span className="text-sm font-medium text-white tracking-wide">
        Falar com Especialista
      </span>
    </motion.a>
  );
};

export default StickyWhatsApp;
