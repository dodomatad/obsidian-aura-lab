import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import opiumLogo from "@/assets/opium-logo-official.png";
import fabioPortrait from "@/assets/fabio-opium-shirt.jpg";
import ScrollExpansionHero from "@/components/ui/scroll-expansion-hero";
import { HistoriaCinematic } from "@/components/HistoriaCinematic";

const Historia = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#050505" }}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 bg-black/60 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all"
            asChild
          >
            <Link to="/">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>

          <Link to="/">
            <img
              src={opiumLogo}
              alt="OPIUM"
              className="h-6 md:h-7 w-auto"
            />
          </Link>
        </div>
      </header>

      {/* Scroll Expansion Hero */}
      <ScrollExpansionHero
        imageSrc={fabioPortrait}
        videoId="1162233180"
        title="Fábio Paiva"
        subtitle="35 anos moldando o mar brasileiro"
      />

      {/* Documentary Cinematic Blocks */}
      <main>
        <HistoriaCinematic />
      </main>

      {/* Minimal Footer */}
      <footer
        className="py-8 px-6"
        style={{ backgroundColor: "#050505" }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs text-white/20">
            © 2026 Opium Hightec Line. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Historia;
