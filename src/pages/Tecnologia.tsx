import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TechnologySection from '@/components/TechnologySection';
import AtelierSection from '@/components/AtelierSection';
import CustomCursor from '@/components/CustomCursor';
import opiumLogo from '@/assets/opium-logo-official.png';

const Tecnologia = () => {
  const navigate = useNavigate();

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-background overflow-x-hidden max-w-[100vw] relative">
        {/* Noise texture */}
        <div
          className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Top nav */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed top-0 left-0 right-0 md:top-4 md:left-8 md:right-8 z-50 flex justify-between items-center px-4 md:px-10 py-3 md:py-4 md:rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.03)' }}
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <img src={opiumLogo} alt="OPIUM" className="h-6 md:h-7 w-auto" />
          </button>
        </motion.nav>

        {/* Content */}
        <div className="pt-20 md:pt-28">
          <TechnologySection />
          <AtelierSection />
        </div>
      </div>
    </>
  );
};

export default Tecnologia;
