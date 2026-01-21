import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Flame, Globe, Users } from 'lucide-react';
import championImage from '@/assets/champion-silhouette.jpg';

interface FounderBioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const achievements = [
  { icon: Award, title: '14 Anos Invicto', description: 'Domínio absoluto nas competições de canoagem oceânica' },
  { icon: Flame, title: 'Tocha Olímpica 2016', description: 'Condutor da Tocha Olímpica no Rio de Janeiro' },
  { icon: Globe, title: 'Tocha Pan-Americana 2007', description: 'Condutor da Tocha nos Jogos Pan-Americanos' },
  { icon: Users, title: 'Pioneiro Nacional', description: 'Introdutor da canoagem oceânica no Brasil' },
];

const FounderBioModal = ({ isOpen, onClose }: FounderBioModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-4 md:inset-8 lg:inset-16 xl:inset-24 bg-background z-50 overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-foreground/20 hover:border-orange hover:bg-orange/10 transition-all duration-300 group"
            >
              <X className="w-5 h-5 md:w-6 md:h-6 text-foreground/70 group-hover:text-orange transition-colors" />
            </button>

            <div className="h-full overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 min-h-full">
                {/* Left: Image */}
                <div className="relative h-[40vh] lg:h-full overflow-hidden">
                  <img
                    src={championImage}
                    alt="Fábio Paiva - Fundador da Opium"
                    className="w-full h-full object-cover"
                    style={{
                      filter: 'grayscale(100%) contrast(1.2) brightness(0.85)',
                    }}
                  />
                  
                  {/* Gradient overlay */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `
                        linear-gradient(to right, transparent 50%, hsl(var(--background)) 100%),
                        linear-gradient(to bottom, transparent 60%, hsl(var(--background)) 100%)
                      `,
                    }}
                  />
                  
                  {/* Name overlay */}
                  <div className="absolute bottom-8 left-8 z-10">
                    <span className="text-[10px] tracking-[0.35em] uppercase text-foreground/50 font-sans font-medium">
                      Fundador
                    </span>
                    <h2 className="display-hero text-foreground text-3xl md:text-4xl lg:text-5xl mt-2">
                      Fábio Paiva
                    </h2>
                  </div>
                </div>

                {/* Right: Content */}
                <div className="px-6 md:px-12 lg:px-16 py-12 md:py-16">
                  <div className="max-w-lg">
                    {/* Section label */}
                    <span className="text-[10px] tracking-[0.35em] uppercase text-orange/80 font-sans font-medium">
                      A Jornada do Campeão
                    </span>

                    <h3 className="display-hero text-foreground text-2xl md:text-3xl mt-4 mb-8">
                      O Homem Por Trás da Lenda<span className="text-orange">.</span>
                    </h3>

                    <div className="space-y-6 mb-12">
                      <p className="text-base md:text-lg text-foreground/70 leading-relaxed font-sans font-light">
                        Fábio Paiva não é apenas o fundador da Opium – ele é o <span className="text-foreground font-medium">pioneiro absoluto</span> da canoagem oceânica no Brasil. Sua jornada começou há mais de três décadas, quando transformou uma garagem em Santos no berço de uma revolução náutica.
                      </p>
                      
                      <p className="text-base md:text-lg text-foreground/70 leading-relaxed font-sans font-light">
                        Com <span className="text-foreground font-medium">14 anos de invencibilidade</span> nas principais competições nacionais, Fábio construiu um legado que transcende troféus. Cada vitória foi um laboratório para aperfeiçoar as embarcações que hoje levam atletas ao pódio.
                      </p>
                      
                      <p className="text-base md:text-lg text-foreground/70 leading-relaxed font-sans font-light">
                        O reconhecimento veio em escala global: condutor da <span className="text-foreground font-medium">Tocha Olímpica em 2016</span> e da <span className="text-foreground font-medium">Tocha Pan-Americana em 2007</span>, Fábio representa o espírito de excelência que a Opium carrega em cada embarcação.
                      </p>

                      <p className="text-base md:text-lg text-foreground/60 leading-relaxed font-sans font-light italic border-l-2 border-orange/30 pl-6">
                        "Cada barco que construímos carrega a mesma filosofia que me levou à vitória: dominar o mar com técnica, paixão e excelência absoluta."
                      </p>
                    </div>

                    {/* Achievements Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {achievements.map((item, index) => (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                          className="group"
                        >
                          <div className="flex items-start gap-4 p-4 border border-foreground/10 hover:border-orange/30 bg-foreground/5 transition-all duration-300">
                            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-foreground/20 group-hover:border-orange">
                              <item.icon className="w-5 h-5 text-foreground/60 group-hover:text-orange transition-colors" />
                            </div>
                            <div>
                              <h4 className="text-sm font-sans font-medium text-foreground/90 mb-1">
                                {item.title}
                              </h4>
                              <p className="text-xs text-foreground/50 font-sans font-light leading-relaxed">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FounderBioModal;
