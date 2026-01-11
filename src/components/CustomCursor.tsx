import { useEffect, useRef, useCallback } from 'react';

const CustomCursor = () => {
  const mainCursorRef = useRef<HTMLDivElement>(null);
  const ringCursorRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(false);
  const isHoveringRef = useRef(false);
  const positionRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>();

  // Direct DOM animation loop - no React state updates
  const animate = useCallback(() => {
    const lerp = 0.2; // Fast lerp for snappy response
    
    positionRef.current.x += (targetRef.current.x - positionRef.current.x) * lerp;
    positionRef.current.y += (targetRef.current.y - positionRef.current.y) * lerp;

    if (mainCursorRef.current) {
      mainCursorRef.current.style.transform = 
        `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%)`;
    }
    
    if (ringCursorRef.current) {
      ringCursorRef.current.style.transform = 
        `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%)`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Check if device has fine pointer (mouse)
    const hasMouse = window.matchMedia('(pointer: fine)').matches;
    if (!hasMouse) return;
    
    isVisibleRef.current = true;
    if (mainCursorRef.current) {
      mainCursorRef.current.style.opacity = '1';
    }

    // Direct mouse position update - no state
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };

    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      if (mainCursorRef.current) {
        mainCursorRef.current.style.opacity = '1';
      }
      if (ringCursorRef.current) {
        ringCursorRef.current.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      if (mainCursorRef.current) {
        mainCursorRef.current.style.opacity = '0';
      }
      if (ringCursorRef.current) {
        ringCursorRef.current.style.opacity = '0';
      }
    };

    // Track hover on interactive elements - direct DOM update
    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('[data-magnetic]') ||
        target.classList.contains('cursor-pointer');
      
      const wasHovering = isHoveringRef.current;
      isHoveringRef.current = !!isInteractive;

      // Only update DOM when state changes
      if (wasHovering !== isHoveringRef.current) {
        if (mainCursorRef.current) {
          const innerDot = mainCursorRef.current.firstChild as HTMLElement;
          if (innerDot) {
            innerDot.style.width = isHoveringRef.current ? '60px' : '12px';
            innerDot.style.height = isHoveringRef.current ? '60px' : '12px';
          }
        }
        if (ringCursorRef.current) {
          const ring = ringCursorRef.current.firstChild as HTMLElement;
          if (ring) {
            ring.style.opacity = isHoveringRef.current ? '0.3' : '0';
            ring.style.transform = isHoveringRef.current ? 'scale(1)' : 'scale(0.5)';
          }
        }
      }
    };

    // Start animation loop
    rafRef.current = requestAnimationFrame(animate);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousemove', updateHoverState, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Hide default cursor
    document.body.style.cursor = 'none';
    
    const style = document.createElement('style');
    style.textContent = `*, *::before, *::after { cursor: none !important; }`;
    document.head.appendChild(style);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', updateHoverState);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.body.style.cursor = '';
      style.remove();
    };
  }, [animate]);

  // Check for mouse on mount
  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
    return null;
  }

  return (
    <>
      {/* Main cursor - GPU accelerated */}
      <div
        ref={mainCursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          opacity: 0,
          willChange: 'transform',
        }}
      >
        <div
          className="rounded-full"
          style={{
            width: '12px',
            height: '12px',
            mixBlendMode: 'difference',
            backgroundColor: '#ffffff',
            transition: 'width 0.15s ease-out, height 0.15s ease-out',
            willChange: 'width, height',
          }}
        />
      </div>

      {/* Outer ring - GPU accelerated */}
      <div
        ref={ringCursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          opacity: 0,
          willChange: 'transform',
        }}
      >
        <div 
          className="w-20 h-20 rounded-full border border-white/30"
          style={{ 
            mixBlendMode: 'difference',
            opacity: 0,
            transform: 'scale(0.5)',
            transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
            willChange: 'opacity, transform',
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;
