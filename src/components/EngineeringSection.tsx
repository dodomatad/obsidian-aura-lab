import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import boatSurfski from '@/assets/boat-surfski.png';

const specs = [
  { id: 'hull', label: 'CASCO', value: 'Fibra de Carbono', position: { x: '15%', y: '45%' }, lineAngle: 45 },
  { id: 'bow', label: 'PROA', value: 'Corte Hidrodinâmico', position: { x: '8%', y: '35%' }, lineAngle: 30 },
  { id: 'cockpit', label: 'COCKPIT', value: 'Ergonômico Ajustável', position: { x: '45%', y: '25%' }, lineAngle: -45 },
  { id: 'rudder', label: 'LEME', value: 'Controle de Pés', position: { x: '85%', y: '40%' }, lineAngle: -30 },
  { id: 'weight', label: 'PESO', value: '11kg', position: { x: '75%', y: '65%' }, lineAngle: -60 },
  { id: 'length', label: 'COMPRIMENTO', value: '5.80m', position: { x: '50%', y: '70%' }, lineAngle: 90 },
];

const EngineeringSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const boatY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const boatScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);

  return (
    <section 
      ref={containerRef}
      id="engineering"
      className="relative min-h-screen bg-background overflow-hidden py-24 md:py-32"
    >
      {/* Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, hsl(220 50% 5%) 0%, hsl(0 0% 2%) 70%)',
        }}
      />

      {/* Section Header */}
      <div className="relative z-10 px-6 md:px-12 mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase block mb-4">
            Engenharia
          </span>
          <h2 
            className="font-display font-bold text-foreground tracking-tighter max-w-4xl"
            style={{
              fontSize: 'clamp(2rem, 6vw, 5rem)',
              lineHeight: 0.9,
            }}
          >
            Perfeição em<br />
            <span className="text-foreground/50">cada detalhe</span>
          </h2>
        </motion.div>
      </div>

      {/* Boat with Floating Specs */}
      <div className="relative z-10 px-6 md:px-12">
        <div className="relative max-w-6xl mx-auto aspect-[16/9]">
          {/* Central Boat Image with Parallax */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ y: boatY, scale: boatScale }}
          >
            <img
              src={boatSurfski}
              alt="Surfski - Vista técnica"
              className="w-full max-w-4xl h-auto object-contain"
              style={{
                filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.6)) brightness(1.1)',
              }}
            />
          </motion.div>

          {/* Floating Spec Labels */}
          {specs.map((spec, index) => (
            <motion.div
              key={spec.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="absolute z-20 hidden md:block"
              style={{
                left: spec.position.x,
                top: spec.position.y,
              }}
            >
              {/* Connection Line */}
              <div 
                className="absolute w-16 h-px bg-gradient-to-r from-foreground/40 to-transparent"
                style={{
                  transformOrigin: 'left center',
                  transform: `rotate(${spec.lineAngle}deg)`,
                  left: spec.lineAngle > 0 ? 'auto' : '100%',
                  right: spec.lineAngle > 0 ? '100%' : 'auto',
                }}
              />
              
              {/* Dot */}
              <div className="absolute w-2 h-2 rounded-full bg-foreground/60 -translate-x-1 -translate-y-1" />
              
              {/* Label */}
              <div 
                className={`absolute whitespace-nowrap ${
                  spec.lineAngle > 0 ? 'right-full mr-8' : 'left-full ml-8'
                }`}
                style={{ top: '50%', transform: 'translateY(-50%)' }}
              >
                <div className="font-mono text-xs text-foreground/50 tracking-wider">
                  {spec.label}
                </div>
                <div className="text-sm text-foreground mt-1">
                  {spec.value}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Mobile Specs List */}
          <div className="md:hidden absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background/90 to-transparent">
            <div className="grid grid-cols-2 gap-4">
              {specs.slice(0, 4).map((spec) => (
                <div key={spec.id} className="text-center">
                  <div className="font-mono text-xs text-foreground/50 tracking-wider">
                    {spec.label}
                  </div>
                  <div className="text-sm text-foreground mt-1">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 px-6 md:px-12 mt-16 md:mt-24"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center">
              <div className="font-display text-4xl md:text-5xl font-bold text-foreground">
                100%
              </div>
              <div className="text-xs text-muted-foreground mt-2 tracking-wider uppercase">
                Fibra de Carbono
              </div>
            </div>
            <div className="text-center">
              <div className="font-display text-4xl md:text-5xl font-bold text-foreground">
                11kg
              </div>
              <div className="text-xs text-muted-foreground mt-2 tracking-wider uppercase">
                Peso Total
              </div>
            </div>
            <div className="text-center">
              <div className="font-display text-4xl md:text-5xl font-bold text-foreground">
                5.8m
              </div>
              <div className="text-xs text-muted-foreground mt-2 tracking-wider uppercase">
                Comprimento
              </div>
            </div>
            <div className="text-center">
              <div className="font-display text-4xl md:text-5xl font-bold text-foreground">
                42cm
              </div>
              <div className="text-xs text-muted-foreground mt-2 tracking-wider uppercase">
                Boca
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default EngineeringSection;
