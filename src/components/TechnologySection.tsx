import { motion } from 'framer-motion';
import { Layers, Flame, Droplets } from 'lucide-react';
import atelierPaddle from '@/assets/atelier/atelier-lifestyle-paddle.jpg';

const materials = [
  {
    icon: Layers,
    name: 'Fibra de Carbono',
    description:
      'Alta gramatura aeronáutica que garante rigidez estrutural e leveza extrema. O esqueleto do barco.',
  },
  {
    icon: Flame,
    name: 'Divinicel',
    description:
      'Núcleo estrutural de espuma técnica que absorve impactos e confere flutuabilidade sem adicionar peso.',
  },
  {
    icon: Droplets,
    name: 'Fibra de Vidro',
    description:
      'Camada externa de proteção e resistência mecânica, garantindo durabilidade em condições reais de mar.',
  },
];

const processes = [
  {
    title: 'Processo de Autoclave',
    description:
      'Cura sob pressão e temperatura controlada (80 °C) com resina epóxi aeronáutica. Garante que a estrutura jamais amoleça sob o sol — memória térmica permanente.',
  },
  {
    title: 'Pintura Poliuretânica Naval',
    description:
      'Acabamento final com tinta poliuretânica naval de alto brilho, resistente a UV, sal e abrasão. O mesmo padrão utilizado em embarcações de alto desempenho.',
  },
];

const TechnologySection = () => {
  return (
    <section className="relative w-full py-20 md:py-32 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/3 left-1/2 w-[80%] h-[40%] -translate-x-1/2 -translate-y-1/2 opacity-20"
          style={{
            background:
              'radial-gradient(ellipse at center, hsl(var(--orange) / 0.25) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <span className="text-xs tracking-widest text-muted-foreground uppercase block mb-3">
            Engenharia &amp; Performance
          </span>
          <h2 className="font-brush text-4xl md:text-6xl lg:text-7xl tracking-tight text-foreground leading-none">
            TECNOLOGIA
            <br />
            <span style={{ color: 'hsl(var(--orange))' }}>DE PONTA</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Cada barco Opium é construído com uma tríade de materiais de alta
            engenharia — a combinação exata que garante performance, resistência e
            leveza incomparáveis no mercado da canoagem oceânica brasileira.
          </p>
        </motion.div>

        {/* Materials Triad */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20 md:mb-28">
          {materials.map((mat, i) => (
            <motion.div
              key={mat.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative rounded-2xl border border-foreground/10 p-8 md:p-10"
              style={{
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              <mat.icon
                className="w-8 h-8 mb-5"
                style={{ color: 'hsl(var(--orange))' }}
              />
              <h3 className="text-xl font-bold text-foreground mb-3 tracking-wide">
                {mat.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {mat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Lifestyle photo break */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 md:mb-28 rounded-2xl overflow-hidden border border-foreground/10"
        >
          <img
            src={atelierPaddle}
            alt="Barco Opium em ação"
            className="w-full h-64 md:h-96 object-cover"
            loading="lazy"
          />
        </motion.div>

        {/* Callout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-foreground/10 p-8 md:p-12 mb-20 md:mb-28 text-center"
          style={{
            background:
              'linear-gradient(135deg, rgba(249,115,22,0.06) 0%, rgba(6,182,212,0.04) 100%)',
          }}
        >
          <p className="text-lg md:text-xl text-foreground font-medium leading-relaxed max-w-3xl mx-auto">
            "Não existe barco <em>full carbono</em>. A verdadeira performance nasce
            da combinação precisa de{' '}
            <strong style={{ color: 'hsl(var(--orange))' }}>
              fibra de carbono, divinicel e fibra de vidro
            </strong>
            — essa é a regra de ouro da construção Opium."
          </p>
        </motion.div>

        {/* Processes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-6"
        >
          <h3 className="text-2xl md:text-3xl font-brush text-foreground mb-10 tracking-tight">
            Processos &amp; Acabamento
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {processes.map((proc, i) => (
            <motion.div
              key={proc.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="rounded-2xl border border-foreground/10 p-8 md:p-10"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <span
                className="inline-block text-xs font-bold tracking-widest uppercase mb-4"
                style={{ color: 'hsl(var(--orange))' }}
              >
                0{i + 1}
              </span>
              <h4 className="text-lg font-bold text-foreground mb-3">
                {proc.title}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {proc.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
