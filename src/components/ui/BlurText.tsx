import { motion } from 'framer-motion';
import { useEffect, useRef, useState, useMemo } from 'react';

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  style?: React.CSSProperties;
}

const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  onAnimationComplete,
  stepDuration = 0.35,
  style = {}
}: BlurTextProps) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current!);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const fromY = direction === 'top' ? -50 : 50;
  const midY = direction === 'top' ? 5 : -5;
  const stepCount = 3; // from -> mid -> to
  const totalDuration = stepDuration * (stepCount - 1);
  const times = [0, 0.5, 1];

  return (
    <p ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'inherit', ...style }}>
      {elements.map((segment: string, index: number) => (
        <motion.span
          className="inline-block will-change-[transform,filter,opacity]"
          style={{ marginRight: animateBy === 'words' ? '0.25em' : '0' }}
          key={index}
          initial={{ filter: 'blur(10px)', opacity: 0, y: fromY }}
          animate={inView 
            ? { 
                filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
                opacity: [0, 0.5, 1],
                y: [fromY, midY, 0]
              }
            : { filter: 'blur(10px)', opacity: 0, y: fromY }
          }
          transition={{
            duration: totalDuration,
            times,
            delay: (index * delay) / 1000,
            ease: 'easeOut'
          }}
          onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
        >
          {segment === ' ' ? '\u00A0' : segment}
        </motion.span>
      ))}
    </p>
  );
};

export default BlurText;
