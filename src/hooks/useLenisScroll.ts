import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

export const useLenisScroll = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      // Mobile-optimized: controlled, weighted scroll with elegant deceleration
      lerp: 0.1,
      duration: 1.5,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 0.8,
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
