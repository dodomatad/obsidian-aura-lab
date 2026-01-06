import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-between px-6 md:px-12 py-8">
        {/* Navigation */}
        <nav className="flex justify-between items-center reveal-up">
          <div className="font-display text-xl font-medium tracking-tight">
            STUDIO
          </div>
          <div className="flex gap-8">
            <a href="#work" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-grow">
              Work
            </a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-grow">
              About
            </a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-grow">
              Contact
            </a>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center py-20">
          <div className="max-w-full">
            <h1 className="display-giant reveal-up-delay-1">
              <span className="block">DESIGN</span>
              <span className="block text-muted-foreground/30">BEYOND</span>
              <span className="block">
                LIMITS
                <span className="inline-block w-3 h-3 md:w-4 md:h-4 rounded-full bg-electric ml-4 glow-electric" />
              </span>
            </h1>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="flex justify-between items-end reveal-up-delay-3">
          <div className="max-w-md">
            <p className="text-sm text-muted-foreground leading-relaxed">
              We craft digital experiences that push the boundaries of 
              creativity and technology. Award-winning design studio 
              based in the future.
            </p>
          </div>
          
          <a 
            href="#work" 
            className="group flex items-center gap-3 text-sm font-medium cursor-grow"
          >
            <span>Explore Work</span>
            <span className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-300">
              <ArrowRight className="w-4 h-4" />
            </span>
          </a>
        </div>

        {/* Decorative Line */}
        <div className="absolute bottom-0 left-0 right-0 brutalist-line" />
      </section>

      {/* Work Section */}
      <section id="work" className="px-6 md:px-12 py-32">
        <div className="mb-20">
          <span className="text-xs text-muted-foreground tracking-widest uppercase">
            Selected Work
          </span>
          <h2 className="display-large mt-4">
            PROJECTS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Project Cards */}
          {[
            { title: 'NOIR', category: 'Brand Identity', year: '2024' },
            { title: 'VOID', category: 'Digital Experience', year: '2024' },
            { title: 'ECLIPSE', category: 'Web Design', year: '2023' },
            { title: 'SHADOW', category: 'Art Direction', year: '2023' },
          ].map((project, index) => (
            <a 
              key={project.title}
              href="#"
              className="group block cursor-grow"
            >
              <div className="aspect-[4/3] bg-card border border-border mb-6 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-6 left-6">
                  <span className="text-xs text-muted-foreground">{project.year}</span>
                </div>
                <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-electric opacity-0 group-hover:opacity-100 transition-opacity duration-300 glow-electric" />
              </div>
              <div className="flex justify-between items-baseline">
                <h3 className="font-display text-3xl tracking-tight group-hover:text-glow-electric transition-all duration-300">
                  {project.title}
                </h3>
                <span className="text-sm text-muted-foreground">
                  {project.category}
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Statement Section */}
      <section className="px-6 md:px-12 py-32 border-t border-border">
        <div className="max-w-4xl">
          <p className="display-medium text-muted-foreground">
            We believe in the power of{' '}
            <span className="text-foreground">bold ideas</span> and{' '}
            <span className="text-foreground">fearless execution</span>.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-12 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="font-display text-xl font-medium tracking-tight">
            STUDIO
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-grow">
              Instagram
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-grow">
              Twitter
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-grow">
              LinkedIn
            </a>
          </div>
          <div className="text-xs text-muted-foreground">
            © 2024 All rights reserved
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
