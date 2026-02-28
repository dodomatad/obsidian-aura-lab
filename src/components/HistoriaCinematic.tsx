import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import jornalSantos from "@/assets/jornal-santos-2001.jpg";
import tochaOlimpica from "@/assets/fabio-tocha-olimpica.jpg";
import logoKaora from "@/assets/logo-kaora.jpg";
import logoSahyRemando from "@/assets/logo-sahy-remando.jpg";
import logoCanoaBrasil from "@/assets/logo-canoa-brasil.jpg";

/* ── Reusable animation wrappers ─────────────────────────── */

function ClipReveal({
  children,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
}) {
  const initial =
    direction === "left"
      ? { clipPath: "inset(0 100% 0 0)" }
      : direction === "right"
      ? { clipPath: "inset(0 0 0 100%)" }
      : { clipPath: "inset(100% 0 0 0)" };

  return (
     <motion.div
       initial={{ ...initial, opacity: 0 }}
       whileInView={{ clipPath: "inset(0 0 0 0)", opacity: 1 }}
       viewport={{ once: true, amount: 0.3 }}
       transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function BlurReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const isMobile = useIsMobile();
  return (
    <motion.div
      style={{ willChange: "opacity, transform, filter" }}
      initial={{
        opacity: 0,
        y: isMobile ? 50 : 60,
        filter: isMobile ? "blur(8px)" : "blur(12px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: isMobile ? 0.6 : 0.65,
        ease: [0.22, 1, 0.36, 1],
        delay: delay * 0.15,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ScaleReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Quote reveal — opacity + subtle scale ───────────────── */

function QuoteReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ParallaxSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/* ── Number stat ─────────────────────────────────────────── */

function FullscreenStat({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <section className="md:min-h-[60vh] flex items-center justify-center px-6 py-1 md:py-0">
      <div className="text-center">
        <BlurReveal>
          <span className="block font-sporty text-[clamp(5rem,18vw,14rem)] font-bold text-white leading-none tracking-tight">
            {number}
          </span>
        </BlurReveal>
        <BlurReveal delay={0.2}>
          <span className="block text-white/40 text-base md:text-xl tracking-[0.25em] uppercase mt-5">
            {label}
          </span>
        </BlurReveal>
      </div>
    </section>
  );
}

/* ── Main component ──────────────────────────────────────── */

export function HistoriaCinematic() {
  return (
    <div className="w-full" style={{ backgroundColor: "#050505" }}>
      {/* ─── BLOCO 1 — SILÊNCIO ─────────────────────────── */}
      <section className="min-h-[18vh] md:min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <BlurReveal>
          <p className="text-white/90 text-[clamp(1.25rem,3.5vw,2.5rem)] font-light leading-relaxed max-w-3xl">
            O visionário que introduziu a{" "}
            <span className="text-orange font-medium">Canoa Havaiana</span> no
            Brasil.
          </p>
        </BlurReveal>
        <BlurReveal delay={0.6}>
          <p className="text-white/50 text-base md:text-xl mt-4 md:mt-8 font-light tracking-wide">
            Invicto por 15 anos. Mais de 700 troféus.
          </p>
        </BlurReveal>
      </section>

      {/* ─── BLOCO 2 — NÚMEROS COMO MOMENTOS ────────────── */}
      <FullscreenStat number="700+" label="Troféus conquistados" />

      <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-auto" />

      <FullscreenStat number="15" label="Anos invicto no Brasil" />

      <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-auto" />

      <FullscreenStat number="164km" label="Recorde de 24h no mar" />

      {/* ─── BLOCO 3 — REVOLUÇÃO HAVAIANA ────────────────── */}
      <section className="relative py-14 md:py-24">
        <BlurReveal className="w-full">
          <div className="relative w-full">
            <img
              src={jornalSantos}
              alt="Jornal da Baixada — Primeira competição de canoas havaianas em Santos, 2001"
              className="w-full h-auto max-h-[35vh] md:max-h-[70vh] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
          </div>
        </BlurReveal>
        <div className="max-w-4xl mx-auto px-6 mt-3 md:mt-10">
          <BlurReveal>
            <p className="text-white/40 text-xs md:text-sm tracking-[0.2em] uppercase mb-4">
              Agosto/2001
            </p>
          </BlurReveal>
          <ClipReveal direction="up">
            <h2 className="font-sporty text-3xl md:text-6xl font-bold text-white mb-6 md:mb-8 tracking-tight uppercase">
              A Revolução Havaiana
            </h2>
          </ClipReveal>
          <BlurReveal delay={0.2}>
            <p className="text-white/70 text-base md:text-xl leading-relaxed max-w-2xl">
              Fábio foi oficialmente o{" "}
              <span className="text-orange font-medium">
                introdutor da canoa havaiana no Brasil
              </span>
              . Criou a primeira base da modalidade e organizou os primeiros
              campeonatos.
            </p>
          </BlurReveal>
          <BlurReveal delay={0.35}>
            <p className="text-white/50 text-sm md:text-base mt-6 leading-relaxed max-w-2xl">
              Idealizador da Volta à Ilha de Santo Amaro, a prova mais
              tradicional do país, que chega à sua 22ª edição em março de 2026.
            </p>
          </BlurReveal>
        </div>
      </section>

      {/* ─── BLOCO 4 — ORIGENS ──────────────────────────── */}
      <section className="flex items-center py-14 md:py-24 md:min-h-[60vh] px-6">
        <div className="max-w-3xl mx-auto">
          <BlurReveal>
            <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-3 md:mb-6">
              As Origens
            </p>
          </BlurReveal>
          <ClipReveal direction="up">
            <h2 className="font-sporty text-3xl md:text-6xl font-bold text-white mb-6 md:mb-10 tracking-tight uppercase">
              DNA do Mar
            </h2>
          </ClipReveal>
          <BlurReveal delay={0.15}>
            <p className="text-white/70 text-lg md:text-2xl font-light leading-relaxed mb-4 md:mb-8">
              Nascido em 10 de novembro de 1962, filho de dois atletas santistas:
              os nadadores{" "}
              <span className="text-orange font-medium">
                Gilson Nunes Marques Pereira (o Kalu)
              </span>{" "}
              e{" "}
              <span className="text-orange font-medium">
                Dona Regina Stella
              </span>
              .
            </p>
          </BlurReveal>
          <BlurReveal delay={0.3}>
            <p className="text-white/50 text-base md:text-lg leading-relaxed">
              O espírito esportivo dos pais proporcionou uma infância livre.
              Divertia-se participando de travessias marítimas feitas,
              literalmente, nas costas dos pais. Aos 10 anos, ganhou o primeiro
              barco a remo na Ilha das Palmas, onde criou sua intimidade com as
              águas.
            </p>
          </BlurReveal>
        </div>
      </section>

      {/* ─── BLOCO 5 — O DESPERTAR + DÉCADA DE OURO ─────── */}
      <section className="py-14 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <BlurReveal>
            <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-2 md:mb-6">
              1984 — 2000
            </p>
          </BlurReveal>
          <ClipReveal direction="right">
            <h2 className="font-sporty text-3xl md:text-6xl font-bold text-white mb-6 md:mb-10 tracking-tight uppercase">
              O Despertar do Campeão
            </h2>
          </ClipReveal>

          <BlurReveal delay={0.1}>
            <p className="text-white/70 text-lg md:text-2xl font-light leading-relaxed mb-3 md:mb-10 max-w-3xl">
              Amor à primeira remada. Com dinheiro de estágio, comprou um caiaque
              e venceu sua primeira prova em 84. No ano seguinte, tornou-se o{" "}
              <span className="text-orange font-medium">
                primeiro campeão brasileiro da Volta à Ilha de Vitória
              </span>
              .
            </p>
          </BlurReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-16 mt-10 md:mt-12">
            <ScaleReveal>
              <div>
                <span className="font-sporty text-5xl md:text-7xl font-bold text-orange block mb-3">
                  Vice
                </span>
                <span className="text-white/80 text-lg md:text-xl font-medium block mb-3">
                  Campeão Mundial Oceânico
                </span>
                <p className="text-white/40 text-sm md:text-base leading-relaxed">
                  Conquistou o 2º lugar no Mundial Oceânico na Ilha da Madeira e
                  disputou o Mundial na Polônia.
                </p>
              </div>
            </ScaleReveal>
            <ScaleReveal>
              <div>
                <span className="font-sporty text-5xl md:text-7xl font-bold text-orange block mb-3">
                  Prata
                </span>
                <span className="text-white/80 text-lg md:text-xl font-medium block mb-3">
                  Jogos Mundiais da Natureza
                </span>
                <p className="text-white/40 text-sm md:text-base leading-relaxed">
                  Recorde de 24h (164km) no mar e medalha de Prata com a equipe
                  Canoar no Rafting.
                </p>
              </div>
            </ScaleReveal>
          </div>
        </div>
      </section>

      {/* ─── BLOCO 6 — NASCIMENTO DA OPIUM ──────────────── */}
      <section className="flex flex-col items-center justify-center px-6 py-14 md:py-0 md:min-h-[60vh] text-center">
        <BlurReveal>
          <div className="h-px w-16 bg-orange mb-6 mx-auto" />
        </BlurReveal>
        <ClipReveal direction="up">
          <h2 className="font-sporty text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight uppercase">
            O Nascimento da Opium
          </h2>
        </ClipReveal>
        <QuoteReveal>
          <p className="text-white/90 text-[clamp(1.5rem,4vw,3rem)] font-light leading-snug max-w-3xl italic">
            "Abandonou a engenharia para viver o mar."
          </p>
        </QuoteReveal>
        <BlurReveal delay={0.6}>
          <div className="w-12 h-px bg-orange/50 mx-auto my-5 md:my-10" />
        </BlurReveal>
        <BlurReveal delay={0.8}>
          <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-2xl">
            Na década de 90, em viagem à Espanha, conheceu a canoa havaiana e
            apaixonou-se. Começou fabricando canoas de forma quase artesanal em
            Santos, dando início à{" "}
            <span className="text-white font-medium">Opium</span>, empresa
            pioneira que hoje gera centenas de empregos.
          </p>
        </BlurReveal>
      </section>

      {/* ─── BLOCO 7 — LEGADO & RECONHECIMENTO ─────────── */}
      <section className="py-14 md:py-24">
        <div className="hidden md:block w-full mb-12">
          <ClipReveal direction="right" className="w-full">
            <div className="relative w-full">
              <img
                src={tochaOlimpica}
                alt="Fábio Paiva carregando a Tocha Olímpica"
                className="w-full max-h-[50vh] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/30" />
            </div>
          </ClipReveal>
        </div>
        <div className="max-w-4xl mx-auto px-6">
          <BlurReveal>
            <div className="h-px w-16 bg-orange mb-6" />
          </BlurReveal>
          <BlurReveal>
            <p className="text-white/40 text-xs tracking-[0.2em] uppercase mb-4">
              Reconhecimento
            </p>
          </BlurReveal>
          <ClipReveal direction="up">
            <h2 className="font-sporty text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight uppercase">
              Legado que Inspira
            </h2>
          </ClipReveal>

          <div className="flex flex-col md:flex-row gap-5 md:gap-12 items-start mt-10 md:mt-10">
            <BlurReveal className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-white rounded-lg p-3 flex-shrink-0">
                  <img
                    src={logoCanoaBrasil}
                    alt="Canoa Brasil"
                    className="h-14 w-auto object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg">
                    Canoa Brasil
                  </h3>
                  <p className="text-white/40 text-sm">
                    Primeira guardaria do país
                  </p>
                </div>
              </div>
              <p className="text-white/50 text-sm md:text-base leading-relaxed">
                Movimentando hoje cerca de 400 pessoas aos sábados.
              </p>
            </BlurReveal>

            <BlurReveal delay={0.2} className="flex-1">
              <div className="mb-4">
                <h3 className="text-white font-medium text-lg mb-1">
                  Dragon Boat
                </h3>
                <p className="text-white/40 text-sm">
                  Introduziu a modalidade no Brasil em 2007
                </p>
              </div>
              <div className="mt-4 md:mt-8">
                <h3 className="text-orange font-medium text-lg mb-1">
                  Cidadão Santista
                </h3>
                <p className="text-white/40 text-sm">
                  Título recebido por sua contribuição inestimável ao esporte.
                </p>
              </div>
            </BlurReveal>
          </div>
        </div>
      </section>

      {/* ─── BLOCO 8 — IMPACTO SOCIAL ───────────────────── */}
      <section className="py-14 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <BlurReveal>
            <div className="h-px w-16 bg-orange mb-6" />
          </BlurReveal>
          <BlurReveal>
            <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-2 md:mb-6">
              Impacto Social
            </p>
          </BlurReveal>
          <ClipReveal direction="up">
            <h2 className="font-sporty text-3xl md:text-5xl font-bold text-white mb-6 md:mb-12 tracking-tight uppercase">
              Transformando Vidas
            </h2>
          </ClipReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-12">
            <BlurReveal>
              <div className="bg-white/[0.03] p-5 md:p-10">
                <div className="bg-white rounded-lg p-3 mb-4 inline-block">
                  <img
                    src={logoKaora}
                    alt="Projeto Ka-Ora"
                    className="h-12 w-auto object-contain"
                  />
                </div>
                <h3 className="text-orange font-medium text-xl mb-3">
                  Projeto Kaora
                </h3>
                <p className="text-white/50 text-sm md:text-base leading-relaxed">
                  Atendimento gratuito e multidisciplinar para 120 mulheres
                  sobreviventes do Câncer de Mama.
                </p>
              </div>
            </BlurReveal>

            <BlurReveal delay={0.2}>
              <div className="bg-white/[0.03] p-5 md:p-10">
                <div className="bg-white rounded-lg p-3 mb-4 inline-block">
                  <img
                    src={logoSahyRemando}
                    alt="Sahy Remando"
                    className="h-12 w-auto object-contain"
                  />
                </div>
                <h3 className="text-orange font-medium text-xl mb-3">
                  Sahy Remando
                </h3>
                <p className="text-white/50 text-sm md:text-base leading-relaxed">
                  Na Barra do Sahy, promove esporte, qualidade de vida e formação
                  cidadã para crianças da comunidade.
                </p>
              </div>
            </BlurReveal>
          </div>
        </div>
      </section>

      {/* ─── BLOCO FINAL — ACERVO HISTÓRICO ─────────────── */}
      <section className="py-14 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <BlurReveal>
            <h2 className="font-sporty text-2xl md:text-4xl font-bold text-white mb-3 tracking-tight uppercase">
              Acervo Histórico
            </h2>
          </BlurReveal>
          <BlurReveal delay={0.15}>
            <p className="text-white/30 text-sm mb-6 md:mb-12">
              Décadas de conquistas registradas em jornais, televisão e pódios ao
              redor do mundo.
              <span className="text-white/20 italic block mt-1">
                Galeria em construção — novas imagens serão adicionadas em breve.
              </span>
            </p>
          </BlurReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {[
              "Recortes de Jornal",
              "Aparições na TV",
              "Pódios & Premiações",
              "Competições Internacionais",
              "Bastidores & Treinos",
              "Com a Comunidade",
            ].map((label, i) => (
              <ScaleReveal key={label}>
                <div className="aspect-[4/3] bg-white/[0.02] border border-white/[0.06] flex items-center justify-center hover:bg-white/[0.04] transition-colors duration-500 cursor-default">
                  <span className="text-white/20 text-xs md:text-sm tracking-wide text-center px-4">
                    {label}
                  </span>
                </div>
              </ScaleReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
