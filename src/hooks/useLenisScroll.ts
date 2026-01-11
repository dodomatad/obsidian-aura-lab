import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

export const useLenisScroll = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      // Performance-optimized settings
      lerp: 0.1, // More responsive (0.1 = 10% per frame)
      duration: 1.0, // Slightly faster
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8, // Reduced for smoother feel
      touchMultiplier: 1.5, // Optimized for mobile
    });

    lenisRef.current = lenis;

    // Use a more performant RAF loop
    let animationId: number;
    
    function raf(time: number) {
      lenis.raf(time);
      animationId = requestAnimationFrame(raf);
    }

    animationId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationId);
      lenis.destroy();
    };
  }, []);

  return lenisRef;
};
