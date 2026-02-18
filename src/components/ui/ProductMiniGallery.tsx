import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageLightbox from './ImageLightbox';

interface ProductMiniGalleryProps {
  images: string[];
}

const ProductMiniGallery = ({ images }: ProductMiniGalleryProps) => {
  const [mainImage, setMainImage] = useState(images[0]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="space-y-4">
      <h4 className="text-[10px] tracking-[0.3em] uppercase text-foreground/50 font-sans font-medium">
        Galeria
      </h4>
      
      {/* Main Image */}
      <div 
        className="aspect-video w-full overflow-hidden rounded-xl relative group cursor-pointer"
        onClick={() => openLightbox(images.indexOf(mainImage))}
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
            style={{ imageOrientation: 'from-image' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        
        {/* Expand hint */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white/80 text-xs tracking-wider uppercase">
            Ampliar
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-2">
        {images.map((img, idx) => (
          <motion.button 
            key={idx} 
            onClick={() => setMainImage(img)}
            onDoubleClick={() => openLightbox(idx)}
            className={`aspect-square rounded-lg overflow-hidden transition-all duration-300 ${
              mainImage === img 
                ? 'ring-2 ring-foreground opacity-100' 
                : 'opacity-40 grayscale hover:opacity-70 hover:grayscale-0'
            }`}
            style={{
              border: mainImage === img 
                ? '2px solid rgba(255, 255, 255, 0.8)' 
                : '2px solid transparent',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img 
              src={img} 
              alt={`Miniatura ${idx + 1}`} 
              className="w-full h-full object-cover"
              style={{ imageOrientation: 'from-image' }}
            />
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <ImageLightbox
        images={images}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};

export default ProductMiniGallery;
