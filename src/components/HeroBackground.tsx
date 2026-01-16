import { useState } from "react";

interface HeroBackgroundProps {
  className?: string;
  onReady?: () => void;
}

/**
 * Resilient hero background.
 * Uses an MP4 video (no external player embeds) + gradient fallback.
 */
export default function HeroBackground({ className = "", onReady }: HeroBackgroundProps) {
  const [isReady, setIsReady] = useState(false);

  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* Base gradient (always visible) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 50% 20%, rgba(6, 182, 212, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(249, 115, 22, 0.05) 0%, transparent 40%),
            linear-gradient(135deg, rgb(10, 22, 40), rgb(5, 13, 24), rgb(0, 0, 0))
          `,
        }}
      />

      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Video layer (fades in only when actually playable) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
        style={{ filter: "brightness(0.85) saturate(0.9)" }}
        onCanPlayThrough={() => {
          if (!isReady) {
            setIsReady(true);
            onReady?.();
          }
        }}
      >
        <source
          src="https://cdn.pixabay.com/video/2020/05/25/40269-424674102_large.mp4"
          type="video/mp4"
        />
      </video>

      {/* Cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
    </div>
  );
}
