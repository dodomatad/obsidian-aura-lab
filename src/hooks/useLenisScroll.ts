import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

export const useLenisScroll = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      // High-responsiveness settings - eliminates input lag
      lerp: 0.15, // Fast response (15% per frame = snappy)
      duration: 0.6, // Short inertia duration
      easing: (t) => 1 - Math.pow(1 - t, 3), // Cubic ease-out for natural stop
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0, // Direct 1:1 feel
      touchMultiplier: 1.8, // Responsive touch
      syncTouch: true, // Sync touch for immediate response
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
