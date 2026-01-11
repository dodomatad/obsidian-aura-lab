import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

export const useLenisScroll = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      // Calibrated for immediate input response (reduce "gelatina")
      lerp: 0.18,
      duration: 0.8,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      syncTouch: true,
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
