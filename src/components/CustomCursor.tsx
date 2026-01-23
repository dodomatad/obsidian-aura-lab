import { useEffect, useRef, useCallback } from 'react';

const CustomCursor = () => {
  const mainCursorRef = useRef<HTMLDivElement>(null);
  const ringCursorRef = useRef<HTMLDivElement>(null);

  // Instant main cursor position (no lag)
  const lastMouseRef = useRef({ x: -100, y: -100 });

  // Smoothed ring position (slight trailing, cheap)
  const ringPosRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>();

  const setMainTransform = useCallback((x: number, y: number) => {
    if (!mainCursorRef.current) return;
    mainCursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
  }, []);

  const setRingTransform = useCallback((x: number, y: number) => {
    if (!ringCursorRef.current) return;
    ringCursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
  }, []);

  const animateRing = useCallback(() => {
    const lerp = 0.35; // higher = less lag

    ringPosRef.current.x += (lastMouseRef.current.x - ringPosRef.current.x) * lerp;
    ringPosRef.current.y += (lastMouseRef.current.y - ringPosRef.current.y) * lerp;

    setRingTransform(ringPosRef.current.x, ringPosRef.current.y);
    rafRef.current = requestAnimationFrame(animateRing);
  }, [setRingTransform]);

  useEffect(() => {
    const hasMouse = window.matchMedia('(pointer: fine)').matches;
    if (!hasMouse) return;

    // Show
    if (mainCursorRef.current) mainCursorRef.current.style.opacity = '1';
    if (ringCursorRef.current) ringCursorRef.current.style.opacity = '1';

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      lastMouseRef.current = { x, y };
      // Main cursor is 1:1 with hand
      setMainTransform(x, y);
    };

    // Hover detection should NOT run on every mousemove.
    const isInteractiveEl = (el: HTMLElement | null) => {
      if (!el) return false;
      return (
        el.tagName === 'A' ||
        el.tagName === 'BUTTON' ||
        !!el.closest('a') ||
        !!el.closest('button') ||
        !!el.closest('[role="button"]') ||
        !!el.closest('[data-magnetic]') ||
        el.classList.contains('cursor-pointer')
      );
    };

    let hovering = false;
    const applyHover = (next: boolean) => {
      if (hovering === next) return;
      hovering = next;

      const innerDot = mainCursorRef.current?.firstChild as HTMLElement | null;
      const ring = ringCursorRef.current?.firstChild as HTMLElement | null;

      if (innerDot) {
        innerDot.style.width = next ? '60px' : '12px';
        innerDot.style.height = next ? '60px' : '12px';
      }
      if (ring) {
        ring.style.opacity = next ? '0.3' : '0';
        ring.style.transform = next ? 'scale(1)' : 'scale(0.5)';
      }
    };

    const handlePointerOver = (e: PointerEvent) => {
      applyHover(isInteractiveEl(e.target as HTMLElement));
    };

    const handlePointerOut = (e: PointerEvent) => {
      // When leaving an interactive element, check relatedTarget to avoid flicker
      const nextTarget = (e.relatedTarget as HTMLElement) ?? null;
      applyHover(isInteractiveEl(nextTarget));
    };

    rafRef.current = requestAnimationFrame(animateRing);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('pointerover', handlePointerOver, true);
    document.addEventListener('pointerout', handlePointerOut, true);

    document.body.style.cursor = 'none';
    const style = document.createElement('style');
    style.textContent = `*, *::before, *::after { cursor: none !important; }`;
    document.head.appendChild(style);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('pointerover', handlePointerOver, true);
      document.removeEventListener('pointerout', handlePointerOut, true);
      document.body.style.cursor = '';
      style.remove();
    };
  }, [animateRing, setMainTransform]);

  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
    return null;
  }

  return (
    <>
      <div
        ref={mainCursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ opacity: 0, willChange: 'transform' }}
      >
        <div
          className="rounded-full bg-white"
          style={{
            width: '12px',
            height: '12px',
            mixBlendMode: 'difference',
            transition: 'width 0.12s ease-out, height 0.12s ease-out',
            willChange: 'width, height',
          }}
        />
      </div>

      <div
        ref={ringCursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ opacity: 0, willChange: 'transform' }}
      >
        <div
          className="w-20 h-20 rounded-full border border-white/30"
          style={{
            mixBlendMode: 'difference',
            opacity: 0,
            transform: 'scale(0.5)',
            transition: 'opacity 0.12s ease-out, transform 0.12s ease-out',
            willChange: 'opacity, transform',
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;
