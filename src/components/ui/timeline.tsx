import {
  motion,
} from "framer-motion";
import React from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {

  return (
    <div
      className="w-full bg-background font-sans md:px-10"
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

      <div className="relative max-w-7xl mx-auto pb-20 px-4 md:px-8 lg:px-10">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="pt-12 md:pt-20"
          >
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-2xl md:text-5xl font-brush text-orange/70 mb-6"
            >
              {item.title}
            </motion.h3>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="w-full"
            >
              {item.content}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
