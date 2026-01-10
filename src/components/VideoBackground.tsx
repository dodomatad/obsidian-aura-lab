import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface VideoBackgroundProps {
  className?: string;
  onRevealComplete?: () => void;
}

const VideoBackground = ({ className = '', onRevealComplete }: VideoBackgroundProps) => {
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  
  useEffect(() => {
    // Start overlay transition after 1.5 seconds
    const timer = setTimeout(() => {
      setOverlayOpacity(0.55); // Lower opacity to show more video movement
      onRevealComplete?.();
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [onRevealComplete]);

  return (
    <div className={`fixed inset-0 overflow-hidden ${className}`}>
      {/* Video element */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: 'saturate(0.8) contrast(1.1)',
        }}
      >
        {/* Dark ocean cinematic video - using a high-quality ocean video */}
        <source 
          src="https://cdn.pixabay.com/video/2020/05/25/40269-424674102_large.mp4" 
          type="video/mp4" 
        />
        {/* Fallback for browsers that don't support video */}
      </video>
      
      {/* Animated dark overlay for readability */}
      <motion.div
        className="absolute inset-0 bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: overlayOpacity }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
      
      {/* Subtle vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
        }}
      />
    </div>
  );
};

export default VideoBackground;
