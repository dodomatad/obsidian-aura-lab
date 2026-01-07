import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

const AmbientAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Ocean ambient sound URL (royalty-free)
  const oceanSoundUrl = 'https://assets.mixkit.co/active_storage/sfx/2432/2432-preview.mp3';

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;
    }
  }, []);

  const toggleSound = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Autoplay blocked by browser
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 2 }}
      className="fixed bottom-8 right-8 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <audio ref={audioRef} src={oceanSoundUrl} preload="none" />
      
      <motion.button
        onClick={toggleSound}
        className="relative flex items-center gap-3 px-4 py-3 backdrop-blur-md border border-foreground/10 transition-all duration-300 cursor-grow group"
        style={{
          background: 'hsl(220 50% 5% / 0.8)',
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Sound waves animation */}
        <div className="relative w-5 h-5 flex items-center justify-center">
          {isPlaying ? (
            <Volume2 className="w-5 h-5 text-foreground/70 group-hover:text-foreground transition-colors" />
          ) : (
            <VolumeX className="w-5 h-5 text-foreground/40 group-hover:text-foreground/70 transition-colors" />
          )}
          
          {/* Pulsing ring when playing */}
          <AnimatePresence>
            {isPlaying && (
              <motion.div
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.8, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 rounded-full border border-electric/30"
              />
            )}
          </AnimatePresence>
        </div>
        
        {/* Label */}
        <AnimatePresence>
          {(isHovered || isPlaying) && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.3 }}
              className="text-xs tracking-widest uppercase text-foreground/60 whitespace-nowrap overflow-hidden"
            >
              {isPlaying ? 'Som Ligado' : 'Som do Mar'}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
};

export default AmbientAudioPlayer;
