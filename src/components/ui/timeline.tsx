import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

const TimelineCard = ({ item, index }: { item: TimelineEntry; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 85%", "start 35%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  // Alternate slide direction on desktop for odd/even cards
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? -40 : 40, 0]
  );
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, y, scale }}
      className="pt-12 md:pt-20 pl-6 md:pl-0"
    >
      <motion.h3
        style={{ opacity, x }}
        className="text-2xl md:text-5xl font-brush text-orange/70 mb-6"
      >
        {item.title}
      </motion.h3>

      <motion.div
        style={{ opacity, x }}
        className="w-full"
      >
        {item.content}
      </motion.div>
    </motion.div>
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
    offset: ["start 10%", "end 90%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-background font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-10 px-4 md:px-8 lg:px-10">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-brush text-5xl md:text-7xl lg:text-9xl mb-8 max-w-6xl font-black leading-[0.9] tracking-tight"
          style={{ 
            color: 'hsl(var(--orange))',
            textShadow: '0 0 40px rgba(249, 115, 22, 0.35), 0 0 80px rgba(249, 115, 22, 0.15), 0 4px 20px rgba(0,0,0,0.5)',
          }}
        >
          A Jornada de
          <br />
          Fábio Paiva
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg md:text-2xl lg:text-3xl max-w-4xl leading-snug font-bold text-foreground/90 font-sans"
        >
          O visionário que introduziu a Canoa Havaiana no Brasil e o maior fomentador da canoagem oceânica brasileira.
        </motion.p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20 pl-8 pr-4 md:px-8 lg:px-10">
        {data.map((item, index) => (
          <TimelineCard key={index} item={item} index={index} />
        ))}

        {/* Linha vertical animada — sem dots */}
        <div
          style={{ height: height + "px" }}
          className="absolute left-4 md:left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-orange/20 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-orange via-orange to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
