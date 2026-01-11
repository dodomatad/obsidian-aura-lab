import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

export const useLenisScroll = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      // Calibrated for immediate stop + minimal perceived lag
      lerp: 0.22,
      duration: 0.7,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 2.0,
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
