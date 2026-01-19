import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTransition } from '@/context/TransitionContext';

interface LiteVimeoEmbedProps {
  videoId: string;
  title?: string;
  className?: string;
  autoplayOnLoad?: boolean; // For background videos that should autoplay immediately
  showPlayButton?: boolean;
  preloadDuringLoading?: boolean; // Pre-load iframe during LoadingScreen
  onLoad?: () => void;
}

/**
 * LiteVimeoEmbed - Lazy loading Vimeo component with preload support
 * 
 * Features:
 * - Loads thumbnail as placeholder initially
 * - For background videos (autoplayOnLoad=true): preloads iframe during LoadingScreen
 * - For interactive videos: loads iframe on click/hover
 * - Seamless transition from thumbnail to video without visible delay
 * 
 * When preloadDuringLoading is true (default for autoplayOnLoad):
 * - Iframe starts loading immediately when component mounts
 * - Video plays muted/looped in background once loaded
 * - Thumbnail serves as placeholder until video is ready
 */
const LiteVimeoEmbed = ({
  videoId,
  title = 'Video',
  className = '',
  autoplayOnLoad = false,
  showPlayButton = true,
  preloadDuringLoading = autoplayOnLoad, // Default: preload if autoplay
  onLoad,
}: LiteVimeoEmbedProps) => {
  const { hasSeenIntro } = useTransition();
  
  // For background videos: start loading immediately (during LoadingScreen)
  // For returning visitors (hasSeenIntro): also start immediately
  const shouldPreload = preloadDuringLoading || hasSeenIntro;
  
  const [isActivated, setIsActivated] = useState(shouldPreload);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);

  // Vimeo thumbnail URL - uses vumbnail.com service for reliable thumbnails
  const thumbnailUrl = `https://vumbnail.com/${videoId}.jpg`;
  
  // Full player URL with background mode for seamless autoplay
  // Added quality=auto for faster initial load, dnt=1 for privacy
  const playerUrl = `https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1&playsinline=1&quality=auto&dnt=1`;

  // Effect to activate preloading for background videos
  useEffect(() => {
    if (shouldPreload && !isActivated) {
      setIsActivated(true);
    }
  }, [shouldPreload, isActivated]);

  const handleActivate = useCallback(() => {
    if (!isActivated) {
      setIsActivated(true);
    }
  }, [isActivated]);

  const handleIframeLoad = useCallback(() => {
    setIframeLoaded(true);
    onLoad?.();
  }, [onLoad]);

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      onClick={handleActivate}
      onMouseEnter={handleActivate}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleActivate()}
      aria-label={`Play ${title}`}
    >
      {/* Thumbnail - always rendered as fallback/placeholder */}
      <AnimatePresence>
        {(!isActivated || !iframeLoaded) && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img
              src={thumbnailUrl}
              alt={title}
              loading="lazy"
              onLoad={() => setThumbnailLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                thumbnailLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ filter: 'brightness(0.85)' }}
            />
            
            {/* Play button overlay - only shown when not autoplay */}
            {showPlayButton && !autoplayOnLoad && thumbnailLoaded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors cursor-pointer">
                  <svg 
                    className="w-8 h-8 text-white ml-1" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading shimmer while thumbnail loads */}
      {!thumbnailLoaded && !isActivated && (
        <div className="absolute inset-0 bg-background animate-pulse" />
      )}

      {/* Vimeo iframe - rendered immediately for preload, hidden until loaded */}
      {isActivated && (
        <iframe
          src={playerUrl}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
            iframeLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            filter: 'brightness(0.85)',
            // Cover the container like the thumbnail
            width: '177.78vh',
            height: '100vh',
            minWidth: '100%',
            minHeight: '56.25vw',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            position: 'absolute',
          }}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          title={title}
          onLoad={handleIframeLoad}
          // Loading eager for preload scenario, lazy otherwise
          loading={shouldPreload ? 'eager' : 'lazy'}
        />
      )}
    </div>
  );
};

export default LiteVimeoEmbed;
