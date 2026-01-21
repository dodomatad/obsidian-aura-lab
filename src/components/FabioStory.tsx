import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Waves, Users, Heart, ExternalLink } from "lucide-react";

export function FabioStory() {
  const data = [
    {
      title: "1984 - O Início",
      content: (
        <div>
          <p className="text-foreground/80 text-xs md:text-sm font-normal mb-8">
            Iniciou sua trajetória no remo em 1984 e logo entrou para a história.
            Tornou-se o <span className="font-bold text-orange">primeiro campeão brasileiro da Volta à Ilha de Vitória (ES)</span> e conquistou a
            primeira medalha internacional da canoagem brasileira, sagrando-se <span className="font-bold text-orange">campeão sul-americano no Uruguai</span>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop"
                alt="Remo no mar"
                className="w-full h-40 md:h-52 object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-3 justify-center">
              <div className="flex items-center gap-2 text-foreground/70">
                <Trophy className="w-5 h-5 text-orange" />
                <span className="text-sm">1º Campeão Volta à Ilha Vitória</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/70">
                <Medal className="w-5 h-5 text-orange" />
                <span className="text-sm">Medalha Internacional (Uruguai)</span>
              </div>
            </div>
          </div>

          {/* Action Button - Opens in new tab */}
          <div className="mt-6">
            <Button 
              variant="outline" 
              className="group border-orange/50 hover:border-orange hover:bg-orange/10 text-foreground/80 hover:text-orange transition-all"
              asChild
            >
              <a 
                href="https://instagram.com/opiumsurfski" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Ver Detalhes de 1984
                <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: "Consagração",
      content: (
        <div>
          <p className="text-foreground/80 text-xs md:text-sm font-normal mb-8">
            Uma carreira marcada pela invencibilidade: foi <span className="font-bold text-orange">campeão brasileiro invicto por 15 anos consecutivos</span>.
            Disputou o Campeonato Mundial na Polônia e é detentor do <span className="font-bold text-orange">recorde de 24 horas em mar aberto (164 km)</span>.
            No rafting, integrou a equipe Canoar (tricampeã brasileira) e competiu no desafiador Rio Orange, no deserto do Kalahari.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=2070&auto=format&fit=crop"
              alt="Mar aberto"
              className="rounded-lg object-cover h-32 md:h-44 w-full shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1504681869696-d977211a5f4c?q=80&w=2023&auto=format&fit=crop"
              alt="Competição"
              className="rounded-lg object-cover h-32 md:h-44 w-full shadow-lg"
            />
          </div>

          {/* Action Button - Opens in new tab */}
          <div className="mt-6">
            <Button 
              variant="outline" 
              className="group border-orange/50 hover:border-orange hover:bg-orange/10 text-foreground/80 hover:text-orange transition-all"
              asChild
            >
              <a 
                href="https://instagram.com/opiumsurfski" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Ler sobre os Recordes
                <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: "2000 - A Canoa Havaiana",
      content: (
        <div>
          <p className="text-foreground/80 text-xs md:text-sm font-normal mb-8">
            Visionário, Fábio foi o <span className="font-bold text-orange">introdutor da canoa havaiana no Brasil</span>. Criou a primeira base da modalidade,
            organizou os primeiros campeonatos e é o idealizador da <span className="font-bold text-orange">Volta à Ilha de Santo Amaro</span>,
            a prova mais tradicional do país que chega à sua 22ª edição em março de 2026.
          </p>
          <div className="mb-6">
            <div className="bg-orange/10 border border-orange/30 rounded-lg p-4">
              <Waves className="w-6 h-6 text-orange mb-2" />
              <span className="text-orange font-bold text-sm">Marco Histórico</span>
              <p className="text-foreground/70 text-xs mt-1">
                Trouxe a cultura da Polinésia para as águas brasileiras, mudando para sempre o cenário dos esportes náuticos no país.
              </p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?q=80&w=2070&auto=format&fit=crop"
              alt="Canoa havaiana"
              className="w-full h-40 md:h-52 object-cover rounded-lg"
            />
          </div>

          {/* Action Button - Opens in new tab */}
          <div className="mt-6">
            <Button 
              variant="outline" 
              className="group border-orange/50 hover:border-orange hover:bg-orange/10 text-foreground/80 hover:text-orange transition-all"
              asChild
            >
              <a 
                href="https://instagram.com/opiumsurfski" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                A Chegada da Canoa Havaiana
                <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: "Legado & Comunidade",
      content: (
        <div>
          <p className="text-foreground/80 text-xs md:text-sm font-normal mb-8">
            Fundador da <span className="font-bold text-orange">Canoa Brasil</span>, a primeira guardaria do país, que movimenta centenas de remadores semanalmente.
            Em 2007, introduziu também o <span className="font-bold text-orange">Dragon Boat no Brasil</span>. Por sua contribuição inestimável ao esporte, recebeu o título de <span className="font-bold text-orange">Cidadão Santista</span>.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-foreground/5 border border-foreground/10 rounded-lg p-4 text-center">
              <Users className="w-6 h-6 text-orange mx-auto mb-2" />
              <span className="text-2xl font-bold text-orange">+400</span>
              <p className="text-foreground/60 text-xs">Pessoas aos Sábados</p>
            </div>
            <div className="bg-foreground/5 border border-foreground/10 rounded-lg p-4 text-center">
              <Trophy className="w-6 h-6 text-orange mx-auto mb-2" />
              <span className="text-lg font-bold text-orange">Pioneiro</span>
              <p className="text-foreground/60 text-xs">Dragon Boat & Canoa</p>
            </div>
          </div>

          {/* Action Button - Opens in new tab */}
          <div className="mt-6">
            <Button 
              variant="outline" 
              className="group border-orange/50 hover:border-orange hover:bg-orange/10 text-foreground/80 hover:text-orange transition-all"
              asChild
            >
              <a 
                href="https://instagram.com/opiumsurfski" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Conheça a Canoa Brasil
                <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: "Impacto Social",
      content: (
        <div>
          <p className="text-foreground/80 text-xs md:text-sm font-normal mb-8">
            À frente da Associação Brasileira de Canoas Havaianas, desenvolve projetos que transformam vidas.
          </p>
          <div className="space-y-4">
            <div className="bg-foreground/5 border border-foreground/10 rounded-lg p-4">
              <Heart className="w-5 h-5 text-orange mb-2" />
              <h4 className="text-orange font-bold text-sm">Projeto Kaora</h4>
              <p className="text-foreground/60 text-xs mt-1">
                Atendimento gratuito e multidisciplinar para 120 mulheres sobreviventes do Câncer de Mama.
              </p>
            </div>
            <div className="bg-foreground/5 border border-foreground/10 rounded-lg p-4">
              <Waves className="w-5 h-5 text-orange mb-2" />
              <h4 className="text-orange font-bold text-sm">Sahy Remando</h4>
              <p className="text-foreground/60 text-xs mt-1">
                Na Barra do Sahy, promove esporte, qualidade de vida e formação cidadã para crianças da comunidade.
              </p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2069&auto=format&fit=crop"
              alt="Comunidade"
              className="rounded-lg object-cover h-32 md:h-44 w-full shadow-lg"
            />
          </div>

          {/* Action Button - Highlighted for social impact - Opens in new tab */}
          <div className="mt-6">
            <Button 
              className="group bg-orange hover:bg-orange/90 text-background font-semibold transition-all"
              asChild
            >
              <a 
                href="https://wa.me/5513997446684?text=Olá! Gostaria de saber mais sobre os projetos sociais."
                target="_blank" 
                rel="noopener noreferrer"
              >
                Apoie os Projetos Sociais
                <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </Button>
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
