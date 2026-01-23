import {
  useScroll,
  useTransform,
  motion,
  useInView,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

// Component for each timeline item with spotlight effect
const TimelineItem = ({ 
  item, 
  index, 
  scrollYProgress,
  totalItems 
}: { 
  item: TimelineEntry; 
  index: number;
  scrollYProgress: any;
  totalItems: number;
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { 
    margin: "-30% 0px -30% 0px",
    once: false 
  });
  
  // Calculate when this item's dot should glow based on scroll progress
  const itemProgress = index / (totalItems - 1);
  const dotGlow = useTransform(
    scrollYProgress,
    [Math.max(0, itemProgress - 0.1), itemProgress, Math.min(1, itemProgress + 0.1)],
    [0, 1, 0.6]
  );

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex justify-start pt-12 md:pt-20 md:gap-10"
    >
      {/* Left side with dot */}
      <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
        {/* Animated Dot */}
        <motion.div 
          className="h-10 absolute left-0 md:left-3 w-10 rounded-full bg-background flex items-center justify-center"
        >
          {/* Outer glow ring */}
          <motion.div
            style={{ opacity: dotGlow }}
            className="absolute inset-0 rounded-full bg-orange/20 blur-md"
          />
          {/* Pulsing glow when active */}
          <motion.div
            animate={isInView ? {
              scale: [1, 1.4, 1],
              opacity: [0.5, 0.8, 0.5],
            } : { scale: 1, opacity: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-1 rounded-full bg-orange/30"
          />
          {/* Core dot */}
          <motion.div 
            animate={isInView ? {
              scale: 1.1,
              boxShadow: "0 0 20px 4px rgba(255, 140, 0, 0.6)"
            } : {
              scale: 1,
              boxShadow: "0 0 0px 0px rgba(255, 140, 0, 0)"
            }}
            transition={{ duration: 0.5 }}
            className={`h-4 w-4 rounded-full border-2 transition-colors duration-500 ${
              isInView 
                ? 'bg-orange border-orange' 
                : 'bg-foreground/30 border-foreground/50'
            }`}
          />
        </motion.div>
        
        {/* Desktop title */}
        <motion.h3 
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0.5, x: -5 }}
          transition={{ duration: 0.5 }}
          className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-foreground/50"
        >
          {item.title}
        </motion.h3>
      </div>

      {/* Content with spotlight effect */}
      <motion.div 
        animate={isInView ? {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)"
        } : {
          opacity: 0.6,
          scale: 0.99,
          filter: "blur(1px)"
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative pl-14 pr-0 md:pl-4 w-full"
      >
        {/* Mobile title */}
        <motion.h3 
          animate={isInView ? { opacity: 1 } : { opacity: 0.6 }}
          transition={{ duration: 0.5 }}
          className="md:hidden block text-2xl mb-4 text-left font-bold text-foreground/50"
        >
          {item.title}
        </motion.h3>
        {item.content}
      </motion.div>
    </motion.div>
  );
};

// Parallax image wrapper component
export const ParallaxImage = ({ 
  src, 
  alt, 
  className = "",
  containerClassName = ""
}: { 
  src: string; 
  alt: string; 
  className?: string;
  containerClassName?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`overflow-hidden ${containerClassName}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className={`w-full h-[120%] object-cover ${className}`}
      />
    </div>
  );
};

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 80%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <div
      className="w-full bg-background font-sans md:px-10"
      ref={containerRef}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto py-10 px-4 md:px-8 lg:px-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-lg md:text-4xl mb-4 text-foreground max-w-4xl font-display font-bold"
        >
          A Jornada de Fábio Paiva
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-foreground/60 text-sm md:text-base max-w-sm"
        >
          De atleta visionário a formador de gerações: uma história marcada pela excelência e pioneirismo no mar.
        </motion.p>
      </div>

      {/* Timeline content */}
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20 px-4 md:px-8 lg:px-10">
        {data.map((item, index) => (
          <TimelineItem 
            key={index}
            item={item}
            index={index}
            scrollYProgress={scrollYProgress}
            totalItems={data.length}
          />
        ))}
        
        {/* Background line (inactive/gray) */}
        <div
          style={{ height: height + "px" }}
          className="absolute left-4 md:left-8 top-0 w-[2px] bg-foreground/10"
        />
        
        {/* Progress line (animated orange gradient) */}
        <div
          style={{ height: height + "px" }}
          className="absolute left-4 md:left-8 top-0 overflow-hidden w-[2px]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: glowOpacity,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b from-orange via-amber-400 to-orange rounded-full"
          />
          {/* Glow effect for the progress line */}
          <motion.div
            style={{
              height: heightTransform,
              opacity: glowOpacity,
            }}
            className="absolute left-[-3px] top-0 w-[8px] bg-gradient-to-b from-orange/40 via-amber-400/20 to-orange/40 blur-sm rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
