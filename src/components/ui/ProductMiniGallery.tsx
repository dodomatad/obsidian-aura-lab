import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductMiniGalleryProps {
  images: string[];
}

const ProductMiniGallery = ({ images }: ProductMiniGalleryProps) => {
  const [mainImage, setMainImage] = useState(images[0]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h4 className="text-[10px] tracking-[0.3em] uppercase text-foreground/50 font-sans font-medium">
        Galeria
      </h4>
      
      {/* Main Image */}
      <div 
        className="aspect-video w-full overflow-hidden rounded-xl relative group"
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.img 
            key={mainImage}
            src={mainImage} 
            alt="Detalhe do barco" 
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />
        </AnimatePresence>
        
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        
        {/* Hover zoom effect */}
        <motion.div 
          className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, idx) => (
          <motion.button 
            key={idx} 
            onClick={() => setMainImage(img)}
            className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden transition-all duration-300 ${
              mainImage === img 
                ? 'ring-2 ring-orange opacity-100' 
                : 'opacity-40 grayscale hover:opacity-70 hover:grayscale-0'
            }`}
            style={{
              border: mainImage === img 
                ? '2px solid rgba(249, 115, 22, 0.8)' 
                : '2px solid transparent',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img 
              src={img} 
              alt={`Miniatura ${idx + 1}`} 
              className="w-full h-full object-cover"
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ProductMiniGallery;
