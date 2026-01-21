import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { Trophy, Medal, Waves, Users, Heart, Anchor, Award } from "lucide-react";

export function FabioStory() {
  const data = [
    {
      title: "1962 - O Início de Tudo",
      content: (
        <div>
          <p className="text-foreground/80 text-lg md:text-2xl font-normal mb-6 leading-relaxed">
            Filho de dois atletas santistas, os nadadores <span className="font-bold text-orange">Gilson Nunes Marques Pereira (o Kalu)</span> e <span className="font-bold text-orange">Dona Regina Stella</span>, Fábio nasceu em 10 de novembro de 1962.
          </p>
          <p className="text-foreground/80 text-lg md:text-2xl font-normal mb-8 leading-relaxed">
            O espírito esportivo dos pais proporcionou uma infância livre. Ele e a irmã Cláudia divertiam-se participando de travessias marítimas feitas, literalmente, nas costas dos pais.
          </p>
          <div className="bg-orange/10 border border-orange/30 rounded-lg p-5 mb-6">
            <Anchor className="w-7 h-7 text-orange mb-2" />
            <span className="text-orange font-bold text-base md:text-lg">DNA do Mar</span>
            <p className="text-foreground/70 text-sm md:text-base mt-2">
              Aficionado pelo mar, aos 10 anos ganhou do pai o primeiro barco a remo na Ilha das Palmas, onde criou sua intimidade com as águas.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop"
              alt="Santos, cidade natal"
              className="w-full h-48 md:h-64 object-cover rounded-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "1984 - O Primeiro Passo",
      content: (
        <div>
          <p className="text-foreground/80 text-lg md:text-2xl font-normal mb-8 leading-relaxed">
            Foi amor à primeira vista. Com dinheiro do seu primeiro estágio, comprou um caiaque e, em abril de 1984, <span className="font-bold text-orange">venceu sua primeira competição</span> mesmo com equipamentos defasados em relação aos profissionais.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop"
                alt="Remo no mar"
                className="w-full h-48 md:h-64 object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-4 justify-center">
              <div className="flex items-center gap-3 text-foreground/70">
                <Trophy className="w-6 h-6 text-orange flex-shrink-0" />
                <span className="text-base md:text-lg">1º Campeão Volta à Ilha Vitória (ES)</span>
              </div>
              <div className="flex items-center gap-3 text-foreground/70">
                <Medal className="w-6 h-6 text-orange flex-shrink-0" />
                <span className="text-base md:text-lg">Campeão Sul-americano (Uruguai)</span>
              </div>
              <div className="flex items-center gap-3 text-foreground/70">
                <Award className="w-6 h-6 text-orange flex-shrink-0" />
                <span className="text-base md:text-lg">1ª Medalha Internacional da Canoagem BR</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "A Década de Ouro",
      content: (
        <div>
          <p className="text-foreground/80 text-lg md:text-2xl font-normal mb-8 leading-relaxed">
            Uma trajetória espetacular com quase <span className="font-bold text-orange">700 troféus</span>. Fábio permaneceu <span className="font-bold text-orange">invicto no país por 15 anos consecutivos</span>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-foreground/5 border border-foreground/10 rounded-lg p-5">
              <Trophy className="w-7 h-7 text-orange mb-2" />
              <h4 className="text-orange font-bold text-base md:text-lg">Recordista 24 Horas</h4>
              <p className="text-foreground/60 text-sm md:text-base mt-2">
                Detentor da marca de 164 Km remados em mar aberto em um único dia.
              </p>
            </div>
            <div className="bg-foreground/5 border border-foreground/10 rounded-lg p-5">
              <Waves className="w-7 h-7 text-orange mb-2" />
              <h4 className="text-orange font-bold text-base md:text-lg">Rafting Extremo</h4>
              <p className="text-foreground/60 text-sm md:text-base mt-2">
                Com a equipe Canoar (tricampeã brasileira), desafiou o Rio Orange no deserto do Kalahari.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=2070&auto=format&fit=crop"
              alt="Mar aberto"
              className="rounded-lg object-cover h-40 md:h-56 w-full shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1504681869696-d977211a5f4c?q=80&w=2023&auto=format&fit=crop"
              alt="Competição"
              className="rounded-lg object-cover h-40 md:h-56 w-full shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "O Nascimento da Opium",
      content: (
        <div>
          <p className="text-foreground/80 text-lg md:text-2xl font-normal mb-8 leading-relaxed">
            Na década de 90, em viagem à Espanha, conheceu a canoa havaiana e apaixonou-se. Foi o momento da virada: decidiu <span className="font-bold text-orange">abandonar a carreira de engenheiro</span> para se dedicar integralmente à canoagem.
          </p>
          <div className="bg-orange/10 border border-orange/30 rounded-lg p-5 mb-6">
            <Anchor className="w-7 h-7 text-orange mb-2" />
            <span className="text-orange font-bold text-base md:text-lg">De Engenheiro a Fabricante</span>
            <p className="text-foreground/70 text-sm md:text-base mt-2">
              Começou fabricando canoas de forma quase artesanal em Santos, dando início à <span className="font-bold">Opium</span>, empresa pioneira que hoje gera centenas de empregos.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2032&auto=format&fit=crop"
              alt="Fabricação artesanal"
              className="w-full h-48 md:h-64 object-cover rounded-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2000 - A Revolução Havaiana",
      content: (
        <div>
          <p className="text-foreground/80 text-lg md:text-2xl font-normal mb-8 leading-relaxed">
            Fábio foi oficialmente o <span className="font-bold text-orange">introdutor da canoa havaiana no Brasil</span>. Criou a primeira base da modalidade e organizou os primeiros campeonatos.
          </p>
          <div className="bg-foreground/5 border border-foreground/10 rounded-lg p-5 mb-6">
            <Waves className="w-7 h-7 text-orange mb-2" />
            <h4 className="text-orange font-bold text-base md:text-lg">Volta à Ilha de Santo Amaro</h4>
            <p className="text-foreground/60 text-sm md:text-base mt-2">
              Idealizador da prova mais tradicional do país, que chega à sua 22ª edição em março de 2026.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?q=80&w=2070&auto=format&fit=crop"
              alt="Canoa havaiana"
              className="w-full h-48 md:h-64 object-cover rounded-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Legado & Reconhecimento",
      content: (
        <div>
          <p className="text-foreground/80 text-lg md:text-2xl font-normal mb-8 leading-relaxed">
            Fundador da <span className="font-bold text-orange">Canoa Brasil</span>, a primeira guardaria do país, movimentando hoje cerca de 400 pessoas aos sábados.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-foreground/5 border border-foreground/10 rounded-lg p-5 text-center">
              <Users className="w-7 h-7 text-orange mx-auto mb-2" />
              <span className="text-xl md:text-2xl font-bold text-orange">Dragon Boat</span>
              <p className="text-foreground/60 text-sm md:text-base mt-1">Introduziu no Brasil em 2007</p>
            </div>
            <div className="bg-foreground/5 border border-foreground/10 rounded-lg p-5 text-center">
              <Trophy className="w-7 h-7 text-orange mx-auto mb-2" />
              <span className="text-xl md:text-2xl font-bold text-orange">Cidadão Santista</span>
              <p className="text-foreground/60 text-sm md:text-base mt-1">Título por sua contribuição ao esporte</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Impacto Social",
      content: (
        <div>
          <p className="text-foreground/80 text-lg md:text-2xl font-normal mb-8 leading-relaxed">
            À frente da Associação Brasileira de Canoas Havaianas, desenvolve projetos que transformam vidas.
          </p>
          <div className="space-y-4">
            <div className="bg-foreground/5 border border-foreground/10 rounded-lg p-5">
              <Heart className="w-6 h-6 text-orange mb-2" />
              <h4 className="text-orange font-bold text-base md:text-lg">Projeto Kaora</h4>
              <p className="text-foreground/60 text-sm md:text-base mt-2">
                Atendimento gratuito e multidisciplinar para 120 mulheres sobreviventes do Câncer de Mama.
              </p>
            </div>
            <div className="bg-foreground/5 border border-foreground/10 rounded-lg p-5">
              <Waves className="w-6 h-6 text-orange mb-2" />
              <h4 className="text-orange font-bold text-base md:text-lg">Sahy Remando</h4>
              <p className="text-foreground/60 text-sm md:text-base mt-2">
                Na Barra do Sahy, promove esporte, qualidade de vida e formação cidadã para crianças da comunidade.
              </p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2069&auto=format&fit=crop"
              alt="Comunidade"
              className="rounded-lg object-cover h-40 md:h-56 w-full shadow-lg"
            />
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
