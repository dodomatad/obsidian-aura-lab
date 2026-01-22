import { FabioStory } from "@/components/FabioStory";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import opiumLogo from "@/assets/opium-logo-official.png";

const Historia = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 bg-background/80 backdrop-blur-lg border-b border-foreground/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon"
            className="w-10 h-10 rounded-full bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 hover:text-foreground transition-all"
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

      {/* Timeline Content */}
      <main className="pt-20">
        <FabioStory />
      </main>

      {/* Simple Footer */}
      <footer className="py-8 px-6 border-t border-foreground/10" style={{ backgroundColor: '#050505' }}>
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs text-foreground/40">
            © 2025 Opium Hightec Line. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Historia;
