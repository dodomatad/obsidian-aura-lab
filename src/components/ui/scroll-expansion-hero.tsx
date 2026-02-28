import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LiteVimeoEmbed from "@/components/LiteVimeoEmbed";
import { useIsMobile } from "@/hooks/use-mobile";

interface ScrollExpansionHeroProps {
  imageSrc: string;
  videoId: string;
  title: string;
  subtitle: string;
  scrollHint?: string;
}

const ScrollExpansionHero = ({
  imageSrc,
  videoId,
  title,
  subtitle,
  scrollHint = "Role para conhecer a história",
}: ScrollExpansionHeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Eased progress for smoother feel (faster start, softer end)
  const easedProgress = useTransform(scrollYProgress, (v) => Math.pow(v, 0.85));

  // Photo expands from portrait to fullscreen — completes at 65% scroll
  const mediaWidth = useTransform(
    easedProgress,
    [0, 0.65],
    isMobile ? ["60vw", "100vw"] : ["28vw", "100vw"]
  );
  const mediaHeight = useTransform(
    easedProgress,
    [0, 0.65],
    isMobile ? ["45vh", "100vh"] : ["55vh", "100vh"]
  );
  const mediaBorderRadius = useTransform(
    easedProgress,
    [0, 0.65],
    ["16px", "0px"]
  );

  // Text slides out faster
  const titleX = useTransform(easedProgress, [0.05, 0.3], ["0%", "-120%"]);
  const titleOpacity = useTransform(easedProgress, [0.05, 0.25], [1, 0]);
  const subtitleX = useTransform(easedProgress, [0.1, 0.35], ["0%", "120%"]);
  const subtitleOpacity = useTransform(easedProgress, [0.1, 0.3], [1, 0]);
  const hintOpacity = useTransform(easedProgress, [0, 0.1], [1, 0]);

  // Overlay dims as photo expands
  const overlayOpacity = useTransform(easedProgress, [0, 0.3], [0.55, 0.75]);

  return (
    <div ref={containerRef} className="relative h-[118vh] md:h-[150vh]">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Vimeo video background */}
        <div className="absolute inset-0">
          <LiteVimeoEmbed
            videoId={videoId}
            title="Opium Historia"
            autoplayOnLoad
            showPlayButton={false}
            preloadDuringLoading
          />
        </div>

        {/* Dark overlay */}
        <motion.div
          className="absolute inset-0 bg-black z-[1]"
          style={{ opacity: overlayOpacity }}
        />

        {/* Expanding photo */}
        <motion.div
          className="relative z-[2] overflow-hidden"
          style={{
            width: mediaWidth,
            height: mediaHeight,
            borderRadius: mediaBorderRadius,
          }}
        >
          <img
            src={imageSrc}
            alt="Fábio Paiva"
            className="w-full h-full object-cover object-top"
          />
          {/* Inner gradient for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </motion.div>

        {/* Title — left side */}
        <motion.div
          className="absolute z-[3] left-6 md:left-16 bottom-[18%] md:bottom-[20%]"
          style={{ x: titleX, opacity: titleOpacity }}
        >
          <h1 className="font-sporty text-[clamp(3rem,8vw,7rem)] font-bold text-white leading-[0.9] tracking-tight uppercase">
            {title.split(" ").map((word, i) => (
              <span key={i} className="block">
                {word}
              </span>
            ))}
          </h1>
        </motion.div>

        {/* Subtitle — right side */}
        <motion.div
          className="absolute z-[3] right-6 md:right-16 bottom-[10%] md:bottom-[12%] text-right max-w-[280px] md:max-w-sm"
          style={{ x: subtitleX, opacity: subtitleOpacity }}
        >
          <p className="text-white/80 text-sm md:text-lg font-light leading-relaxed tracking-wide">
            {subtitle}
          </p>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute z-[3] bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: hintOpacity }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollExpansionHero;
