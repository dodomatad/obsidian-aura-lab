import React from "react";
import { motion } from "framer-motion";
import { Timeline } from "@/components/ui/timeline";
import { Trophy, Medal, Waves, Users, Heart, Anchor, Award, Baby, Hammer, MapPin, Briefcase, Star } from "lucide-react";
import fabioPortrait from "@/assets/fabio-paiva-portrait.jpg";

function RevealText({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className: string;
}) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.p>
  );
}

export function FabioStory() {
  const data = [
    {
      title: "O Visionário do Mar",
      content: (
        <div className="flex flex-col md:flex-row gap-8 items-stretch">
          {/* ÁREA DA FOTO DE RETRATO DO FÁBIO */}
          <div className="md:w-2/5 relative group">
            <img
              src={fabioPortrait}
              alt="Fábio Paiva - Lenda Viva da Canoagem"
              className="w-full h-72 md:h-96 object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-2xl">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-orange" />
                <span className="text-white font-semibold text-sm">Lenda Viva da Canoagem</span>
              </div>
            </div>
          </div>

          {/* ÁREA DO TEXTO INTRODUTÓRIO */}
          <div className="md:w-3/5 flex flex-col justify-center">
            <div className="mb-6">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Fábio Paiva
              </h3>
              <RevealText
                delay={0}
                className="text-foreground/80 text-lg md:text-xl font-normal leading-relaxed"
              >
                Filho de dois atletas santistas, os nadadores{" "}
                <span className="font-bold text-orange">Gilson Nunes Marques Pereira (o Kalu)</span> e{" "}
                <span className="font-bold text-orange">Dona Regina Stella</span>, nascido em 10 de novembro de 1962.
              </RevealText>
            </div>

            <div className="bg-orange/10 border border-orange/30 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-2">
                <Anchor className="w-6 h-6 text-orange" />
                <span className="text-orange font-bold text-base md:text-lg">DNA do Mar</span>
              </div>
              <RevealText
                delay={0.05}
                className="text-foreground/70 text-sm md:text-base"
              >
                O espírito esportivo dos pais proporcionou uma infância livre. Divertia-se participando de travessias marítimas feitas, literalmente, nas costas dos pais. Aos 10 anos, ganhou o primeiro barco a remo na Ilha das Palmas, onde criou sua intimidade com as águas.
              </RevealText>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "1984/85 - O Despertar do Campeão",
      content: (
        <div>
          <RevealText
            delay={0}
            className="text-foreground/80 text-lg md:text-2xl font-normal mb-8 leading-relaxed"
          >
            Amor à primeira remada. Com dinheiro de estágio, comprou um caiaque e venceu sua primeira prova em 84. No ano seguinte, tornou-se o{" "}
            <span className="font-bold text-orange">
              primeiro campeão brasileiro da Volta à Ilha de Vitória
            </span>.
          </RevealText>
          <div className="bg-foreground/5 border border-foreground/10 rounded-lg p-5 mb-6">
            <RevealText
              delay={0.05}
              className="text-foreground/70 text-sm md:text-base"
            >
              Conquistou a primeira medalha internacional da canoagem brasileira como Campeão Sul-americano no Uruguai, marcando o início de uma carreira lendária.
            </RevealText>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-3 text-foreground/70">
              <Trophy className="w-6 h-6 text-orange flex-shrink-0" />
              <span className="text-base md:text-lg">1º Campeão Brasileiro (1985)</span>
            </div>
            <div className="flex items-center gap-3 text-foreground/70">
              <Medal className="w-6 h-6 text-orange flex-shrink-0" />
              <span className="text-base md:text-lg">Campeão Sul-americano</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "A Década de Ouro & O Mundo",
      content: (
        <div>
          <RevealText
            delay={0}
            className="text-foreground/80 text-lg md:text-2xl font-normal mb-8 leading-relaxed"
          >
            Uma trajetória de{" "}
            <span className="font-bold text-orange">700 troféus</span>. Fábio permaneceu{" "}
            <span className="font-bold text-yellow-400">
              invicto no país por 15 anos
            </span>, mas seu remo foi além das fronteiras.
          </RevealText>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-foreground/5 border border-foreground/10 rounded-lg p-5">
              <Trophy className="w-7 h-7 text-yellow-400 mb-2" />
              <h4 className="text-yellow-400 font-bold text-base md:text-lg">Vice-Campeão Mundial</h4>
              <RevealText
                delay={0.05}
                className="text-foreground/60 text-sm md:text-base mt-2"
              >
                Conquistou o 2º lugar no Mundial Oceânico na Ilha da Madeira e disputou o Mundial na Polônia.
              </RevealText>
            </div>
            <div className="bg-foreground/5 border border-foreground/10 rounded-lg p-5">
              <Medal className="w-7 h-7 text-blue-400 mb-2" />
              <h4 className="text-blue-400 font-bold text-base md:text-lg">Recordista & Rafting</h4>
              <RevealText
                delay={0.05}
                className="text-foreground/60 text-sm md:text-base mt-2"
              >
                Recorde de 24h (164km) no mar e Prata nos Jogos Mundiais da Natureza com a equipe Canoar.
              </RevealText>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "O Nascimento da Opium",
      content: (
        <div>
          <RevealText
            delay={0}
            className="text-foreground/80 text-lg md:text-2xl font-normal mb-8 leading-relaxed"
          >
            Na década de 90, em viagem à Espanha, conheceu a canoa havaiana e
            apaixonou-se. Foi o momento da virada: decidiu{" "}
            <span className="font-bold text-orange">
              abandonar a carreira de engenheiro
            </span>{" "}
            para se dedicar integralmente à canoagem.
          </RevealText>

          <div className="bg-orange/10 border border-orange/30 rounded-lg p-5 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Hammer className="w-6 h-6 text-orange" />
              <span className="text-orange font-bold text-base md:text-lg">De Engenheiro a Fabricante</span>
            </div>
            <RevealText
              delay={0.05}
              className="text-foreground/70 text-sm md:text-base"
            >
              Começou fabricando canoas de forma quase artesanal em Santos, dando início à Opium, empresa pioneira que hoje gera centenas de empregos.
            </RevealText>
          </div>

          <div className="flex items-center gap-3 text-foreground/70">
            <Briefcase className="w-6 h-6 text-orange flex-shrink-0" />
            <span className="text-base md:text-lg">Pioneiro na fabricação de canoas no Brasil</span>
          </div>
        </div>
      ),
    },
    {
      title: "2000 - A Revolução Havaiana",
      content: (
        <div>
          <RevealText
            delay={0}
            className="text-foreground/80 text-lg md:text-2xl font-normal mb-8 leading-relaxed"
          >
            Fábio foi oficialmente o{" "}
            <span className="font-bold text-orange">
              introdutor da canoa havaiana no Brasil
            </span>
            . Criou a primeira base da modalidade e organizou os primeiros
            campeonatos.
          </RevealText>

          <div className="bg-foreground/5 border border-foreground/10 rounded-lg p-5 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-6 h-6 text-orange" />
              <h4 className="text-orange font-bold text-base md:text-lg">Volta à Ilha de Santo Amaro</h4>
            </div>
            <RevealText
              delay={0.05}
              className="text-foreground/60 text-sm md:text-base"
            >
              Idealizador da prova mais tradicional do país, que chega à sua 22ª edição em março de 2026.
            </RevealText>
          </div>

          <div className="flex items-center gap-3 text-foreground/70">
            <Award className="w-6 h-6 text-orange flex-shrink-0" />
            <span className="text-base md:text-lg">Organizador dos primeiros campeonatos</span>
          </div>
        </div>
      ),
    },
    {
      title: "Legado & Reconhecimento",
      content: (
        <div>
          <RevealText
            delay={0}
            className="text-foreground/80 text-lg md:text-2xl font-normal mb-8 leading-relaxed"
          >
            Fundador da <span className="font-bold text-orange">Canoa Brasil</span>,
            a primeira guardaria do país, movimentando hoje cerca de 400 pessoas aos
            sábados.
          </RevealText>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-foreground/5 border border-foreground/10 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-6 h-6 text-orange" />
                <h4 className="text-orange font-bold text-base md:text-lg">Dragon Boat</h4>
              </div>
              <p className="text-foreground/60 text-sm md:text-base">Introduziu a modalidade no Brasil em 2007.</p>
            </div>
            <div className="bg-foreground/5 border border-foreground/10 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-6 h-6 text-orange" />
                <h4 className="text-orange font-bold text-base md:text-lg">Cidadão Santista</h4>
              </div>
              <p className="text-foreground/60 text-sm md:text-base">Título recebido por sua contribuição inestimável ao esporte.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Impacto Social",
      content: (
        <div>
          <RevealText
            delay={0}
            className="text-foreground/80 text-lg md:text-2xl font-normal mb-8 leading-relaxed"
          >
            À frente da Associação Brasileira de Canoas Havaianas, desenvolve
            projetos que transformam vidas.
          </RevealText>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-foreground/5 border border-foreground/10 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-6 h-6 text-orange" />
                <h4 className="text-orange font-bold text-base md:text-lg">Projeto Kaora</h4>
              </div>
              <RevealText
                delay={0.05}
                className="text-foreground/60 text-sm md:text-base"
              >
                Atendimento gratuito e multidisciplinar para 120 mulheres sobreviventes do Câncer de Mama.
              </RevealText>
            </div>

            <div className="bg-foreground/5 border border-foreground/10 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-2">
                <Waves className="w-6 h-6 text-orange" />
                <h4 className="text-orange font-bold text-base md:text-lg">Sahy Remando</h4>
              </div>
              <RevealText
                delay={0.05}
                className="text-foreground/60 text-sm md:text-base"
              >
                Na Barra do Sahy, promove esporte, qualidade de vida e formação cidadã para crianças da comunidade.
              </RevealText>
            </div>
          </div>

          <div className="flex items-center gap-3 text-foreground/70 mt-6">
            <Star className="w-6 h-6 text-orange flex-shrink-0" />
            <span className="text-base md:text-lg">Transformando vidas através do esporte</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full" style={{ backgroundColor: '#050505' }}>
      <Timeline data={data} />
    </div>
  );
}
