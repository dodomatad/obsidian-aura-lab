import { motion } from 'framer-motion';
import { 
  User, 
  Gauge, 
  Zap, 
  Compass, 
  Heart, 
  Package, 
  Anchor,
  Target,
  Waves,
  Star,
  ArrowUpDown,
  AlertCircle,
  CheckCircle,
  XCircle,
  Ruler
} from 'lucide-react';
import type { TechProfile } from '@/data/products';
import { levelLabels } from '@/data/products';

interface ProductTechSheetProps {
  techProfile: TechProfile;
  productName: string;
  contentRevealed: boolean;
}

// Helper to get bar fill percentage based on level
const getLevelPercentage = (level: string): number => {
  switch (level) {
    case 'very-high': return 100;
    case 'high': return 75;
    case 'medium': return 50;
    case 'low': return 25;
    case 'easy': return 33;
    case 'hard': return 100;
    default: return 50;
  }
};

// Helper to get color based on level for stability (green = good for beginners)
const getStabilityColor = (level: string): string => {
  switch (level) {
    case 'very-high': return 'bg-emerald-500';
    case 'high': return 'bg-emerald-400';
    case 'medium': return 'bg-amber-400';
    case 'low': return 'bg-red-400';
    default: return 'bg-foreground/30';
  }
};

// Helper to get color based on level for speed (higher = more red/orange)
const getSpeedColor = (level: string): string => {
  switch (level) {
    case 'very-high': return 'bg-red-500';
    case 'high': return 'bg-orange-400';
    case 'medium': return 'bg-amber-400';
    case 'low': return 'bg-emerald-400';
    default: return 'bg-foreground/30';
  }
};

// Metric bar component
const MetricBar = ({ 
  label, 
  level, 
  colorFn, 
  icon: Icon,
  delay 
}: { 
  label: string; 
  level: string; 
  colorFn: (level: string) => string;
  icon: typeof Gauge;
  delay: number;
}) => {
  const percentage = getLevelPercentage(level);
  const levelLabel = (levelLabels as Record<string, Record<string, string>>)[label.toLowerCase()]?.[level] || level;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className="flex items-center gap-3"
    >
      <Icon className="w-4 h-4 text-foreground/50 flex-shrink-0" />
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-foreground/60 uppercase tracking-wider">{label}</span>
          <span className="text-xs text-foreground/80 font-medium">{levelLabel}</span>
        </div>
        <div className="h-1.5 bg-foreground/10 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${colorFn(level)}`}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, delay: delay + 0.2, ease: [0.32, 0.72, 0, 1] }}
          />
        </div>
      </div>
    </motion.div>
  );
};

const ProductTechSheet = ({ techProfile, productName, contentRevealed }: ProductTechSheetProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: contentRevealed ? 1 : 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Section Title */}
      <h2 className="text-sm tracking-[0.3em] uppercase text-foreground/50 font-sans font-medium">
        Ficha Técnica Completa
      </h2>

      {/* Card 1: Perfil do Remador */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: contentRevealed ? 1 : 0, y: contentRevealed ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="p-5 rounded-lg bg-white/5 border border-white/10"
      >
        <div className="flex items-center gap-2 mb-4">
          <User className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-medium text-foreground uppercase tracking-wider">
            Para Quem é Ideal
          </h3>
        </div>
        
        <div className="space-y-3">
          {/* Ideal for */}
          <div className="flex flex-wrap gap-2">
            {techProfile.idealFor.map((item, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs"
              >
                <CheckCircle className="w-3 h-3" />
                {item}
              </motion.span>
            ))}
          </div>
          
          {/* Not recommended for */}
          {techProfile.notRecommendedFor && techProfile.notRecommendedFor.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {techProfile.notRecommendedFor.map((item, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/20 text-red-300 text-xs"
                >
                  <XCircle className="w-3 h-3" />
                  {item}
                </motion.span>
              ))}
            </div>
          )}
          
          {/* Height recommendation */}
          {techProfile.heightRecommendation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5"
            >
              <Ruler className="w-3.5 h-3.5 text-foreground/40" />
              <span className="text-xs text-foreground/60">
                Altura: <span className="text-foreground/80">{techProfile.heightRecommendation}</span>
              </span>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Card 2: Características Técnicas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: contentRevealed ? 1 : 0, y: contentRevealed ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="p-5 rounded-lg bg-white/5 border border-white/10"
      >
        <div className="flex items-center gap-2 mb-5">
          <Gauge className="w-4 h-4 text-orange-400" />
          <h3 className="text-sm font-medium text-foreground uppercase tracking-wider">
            Características
          </h3>
        </div>
        
        <div className="space-y-4">
          <MetricBar 
            label="Estabilidade" 
            level={techProfile.stability} 
            colorFn={getStabilityColor}
            icon={Anchor}
            delay={0.25}
          />
          <MetricBar 
            label="Velocidade" 
            level={techProfile.speed} 
            colorFn={getSpeedColor}
            icon={Zap}
            delay={0.3}
          />
          <MetricBar 
            label="Manobrabilidade" 
            level={techProfile.maneuverability} 
            colorFn={getStabilityColor}
            icon={Compass}
            delay={0.35}
          />
          <MetricBar 
            label="Conforto" 
            level={techProfile.comfort} 
            colorFn={getStabilityColor}
            icon={Heart}
            delay={0.4}
          />
          {techProfile.cargoCapacity && (
            <MetricBar 
              label="Capacidade de Carga" 
              level={techProfile.cargoCapacity} 
              colorFn={getStabilityColor}
              icon={Package}
              delay={0.45}
            />
          )}
          {techProfile.boardingEase && (
            <MetricBar 
              label="Facilidade de Embarque" 
              level={techProfile.boardingEase === 'easy' ? 'high' : techProfile.boardingEase === 'medium' ? 'medium' : 'low'} 
              colorFn={getStabilityColor}
              icon={ArrowUpDown}
              delay={0.5}
            />
          )}
        </div>
      </motion.div>

      {/* Card 3: Melhor Para */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: contentRevealed ? 1 : 0, y: contentRevealed ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="p-5 rounded-lg bg-white/5 border border-white/10"
      >
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-4 h-4 text-blue-400" />
          <h3 className="text-sm font-medium text-foreground uppercase tracking-wider">
            Melhor Para
          </h3>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {techProfile.bestFor.map((item, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + index * 0.05 }}
              className="px-3 py-1.5 rounded-full bg-blue-500/15 text-blue-300 text-xs"
            >
              {item}
            </motion.span>
          ))}
        </div>
        
        {/* Conditions */}
        <div className="mt-4 pt-4 border-t border-white/5">
          <div className="flex items-center gap-2 mb-3">
            <Waves className="w-3.5 h-3.5 text-foreground/40" />
            <span className="text-xs text-foreground/50 uppercase tracking-wider">Condições Ideais</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {techProfile.conditions.map((condition, index) => (
              <span
                key={index}
                className="px-2.5 py-1 rounded text-xs bg-foreground/5 text-foreground/60"
              >
                {condition}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Card 4: Diferenciais */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: contentRevealed ? 1 : 0, y: contentRevealed ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="p-5 rounded-lg bg-white/5 border border-white/10"
      >
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-medium text-foreground uppercase tracking-wider">
            Diferenciais do {productName}
          </h3>
        </div>
        
        <ul className="space-y-2.5">
          {techProfile.highlights.map((highlight, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 + index * 0.05 }}
              className="flex items-start gap-2.5 text-sm text-foreground/70"
            >
              <span className="text-amber-400 mt-0.5">✦</span>
              <span>{highlight}</span>
            </motion.li>
          ))}
        </ul>
        
      </motion.div>

      {/* Similar To */}
      {techProfile.similarTo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: contentRevealed ? 1 : 0, y: contentRevealed ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="p-4 rounded-lg bg-white/5 border border-white/10"
        >
          <div className="flex items-start gap-3">
            <Compass className="w-4 h-4 text-foreground/50 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-xs text-foreground/40 uppercase tracking-wider block mb-1">
                Referência de Mercado
              </span>
              <p className="text-sm text-foreground/70">
                Inspirado no <span className="text-foreground/90 font-medium">{techProfile.similarTo}</span>
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Card 5: Posição na Frota */}
      {techProfile.comparedToFleet && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: contentRevealed ? 1 : 0, y: contentRevealed ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="p-4 rounded-lg bg-gradient-to-r from-white/5 to-transparent border border-white/10"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0">
              <ArrowUpDown className="w-4 h-4 text-foreground/60" />
            </div>
            <div>
              <span className="text-xs text-foreground/40 uppercase tracking-wider block mb-1">
                Posição na Frota Opium
              </span>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {techProfile.comparedToFleet}
              </p>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Warning for not recommended */}
      {techProfile.notRecommendedReason && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: contentRevealed ? 1 : 0, y: contentRevealed ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-200/80 leading-relaxed">
              {techProfile.notRecommendedReason}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProductTechSheet;
