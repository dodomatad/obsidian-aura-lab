import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTransition } from '@/context/TransitionContext';

// Import boat images
import boatPono from '@/assets/boat-pono.png';
import boatSurfski from '@/assets/boat-surfski.png';
import boatCarbon from '@/assets/boat-carbon.png';

interface BoatSlide {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
}

const boats: BoatSlide[] = [
  {
    id: 'pono',
    name: 'PONO',
    tagline: 'A Lenda Havaiana',
    description: 'Canoa outrigger de alta performance para águas abertas e competições.',
    image: boatPono,
  },
  {
    id: 'infinite',
    name: 'INFINITE',
    tagline: 'Velocidade Sem Limites',
    description: 'Surfski de elite projetado para máxima velocidade e estabilidade.',
    image: boatSurfski,
  },
  {
    id: 'oc1-race',
    name: 'OC1 RACE',
    tagline: 'Carbono Puro',
    description: 'Construção 100% carbono para competidores profissionais.',
    image: boatCarbon,
  },
];

const HorizontalGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { saveScrollPosition } = useTransition();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform vertical scroll into horizontal movement
  // Move from 0% to -200% (for 3 slides)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-200%"]);

  const handleBoatClick = (boatId: string) => {
    saveScrollPosition();
    navigate(`/product/${boatId}`);
  };

  return (
    <section 
      ref={containerRef} 
      className="relative h-[300vh] bg-black"
    >
      {/* Sticky container for horizontal scroll */}
      <div className="sticky top-0 h-screen overflow-hidden">
        
        {/* Section header - fixed at top */}
        <div className="absolute top-20 left-0 right-0 z-20 px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-orange text-xs md:text-sm tracking-[0.3em] uppercase">
              Nossa Frota
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-white mt-2">
              Embarcações de Elite
            </h2>
          </motion.div>
        </div>
        
        {/* Horizontal scrolling container */}
        <motion.div 
          className="flex h-full items-center"
          style={{ x }}
        >
          {boats.map((boat, index) => (
            <div 
              key={boat.id}
              className="flex-shrink-0 w-screen h-full flex items-center justify-center px-8 md:px-16"
            >
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 max-w-6xl w-full">
                
                {/* Boat Image */}
                <motion.div 
                  className="flex-1 flex items-center justify-center"
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <img 
                    src={boat.image}
                    alt={boat.name}
                    className="w-full max-w-[500px] md:max-w-[600px] h-auto object-contain drop-shadow-2xl"
                  />
                </motion.div>
                
                {/* Boat Info */}
                <motion.div 
                  className="flex-1 text-center md:text-left"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {/* Slide number */}
                  <span className="text-orange/50 text-7xl md:text-9xl font-light absolute -top-4 md:top-0 right-8 md:right-16 opacity-20">
                    0{index + 1}
                  </span>
                  
                  <span className="text-orange text-xs tracking-[0.3em] uppercase">
                    {boat.tagline}
                  </span>
                  
                  <h3 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mt-3 mb-4 tracking-wider">
                    {boat.name}
                  </h3>
                  
                  <p className="text-white/60 text-sm md:text-base font-light leading-relaxed max-w-md mb-8">
                    {boat.description}
                  </p>
                  
                  <button
                    onClick={() => handleBoatClick(boat.id)}
                    className="group inline-flex items-center gap-3 px-8 py-4 border border-orange/50 text-orange hover:bg-orange hover:text-black transition-all duration-300 text-sm tracking-widest uppercase"
                  >
                    Ver Detalhes
                    <svg 
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </motion.div>
                
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Progress indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {boats.map((boat, index) => (
            <motion.div
              key={boat.id}
              className="w-12 md:w-16 h-1 bg-white/20 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-orange rounded-full"
                style={{
                  scaleX: useTransform(
                    scrollYProgress,
                    [index / boats.length, (index + 1) / boats.length],
                    [0, 1]
                  ),
                  transformOrigin: 'left',
                }}
              />
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default HorizontalGallery;
