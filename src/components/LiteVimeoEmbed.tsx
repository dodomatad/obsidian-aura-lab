import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTransition } from '@/context/TransitionContext';

interface LiteVimeoEmbedProps {
  videoId: string;
  title?: string;
  className?: string;
  autoplayOnLoad?: boolean;
  showPlayButton?: boolean;
  preloadDuringLoading?: boolean;
  onLoad?: () => void;
}

/**
 * LiteVimeoEmbed - Optimized Vimeo embed with preloading
 * 
 * For background videos (autoplayOnLoad=true):
 * - Immediately renders iframe (during LoadingScreen)
 * - Uses gradient as placeholder until video loads
 * - Falls back gracefully if video fails to load
 */
const LiteVimeoEmbed = ({
  videoId,
  title = 'Video',
  className = '',
  autoplayOnLoad = false,
  showPlayButton = true,
  preloadDuringLoading,
  onLoad,
}: LiteVimeoEmbedProps) => {
  const { hasSeenIntro } = useTransition();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Always preload for background videos
  const shouldPreload = preloadDuringLoading ?? autoplayOnLoad ?? hasSeenIntro;
  
  // For autoplay background videos, always activate immediately
  const [isActivated, setIsActivated] = useState(autoplayOnLoad || shouldPreload);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  /**
   * Full player URL
   *
   * NOTE: Vimeo "background=1" can be inconsistent on some mobile browsers.
   * We keep autoplay/muted/loop but avoid background mode for better reliability.
   */
  const playerUrl = `https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&playsinline=1&dnt=1`;

  // Activate on mount for background videos
  useEffect(() => {
    if ((autoplayOnLoad || shouldPreload) && !isActivated) {
      setIsActivated(true);
    }
  }, [autoplayOnLoad, shouldPreload, isActivated]);

  // Fallback timer - if iframe doesn't load in 8s, keep gradient as fallback
  // This handles cases where Vimeo blocks preview environments
  useEffect(() => {
    if (isActivated && !iframeLoaded) {
      const timer = setTimeout(() => {
        if (!iframeLoaded) {
          // Don't show error state, just keep the gradient fallback
          // Video works in production but may be blocked in preview
          console.log('Vimeo video loading slowly - keeping gradient fallback');
        }
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [isActivated, iframeLoaded]);

  const handleActivate = useCallback(() => {
    if (!isActivated) {
      setIsActivated(true);
    }
  }, [isActivated]);

  const handleIframeLoad = useCallback(() => {
    console.log('Vimeo iframe loaded successfully');
    setIframeLoaded(true);
    setIframeError(false);
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
      style={{ position: 'absolute', inset: 0 }}
    >
      {/* Gradient placeholder - always visible as base layer */}
      <AnimatePresence>
        {!iframeLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 z-10"
            style={{
              background: 'linear-gradient(135deg, #0a1628 0%, #050d18 50%, #000000 100%)',
            }}
          >
            {/* Shimmer loading effect */}
            {isActivated && !iframeError && (
              <div className="absolute inset-0 overflow-hidden">
                <div 
                  className="absolute inset-0 animate-pulse"
                  style={{
                    background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(6, 182, 212, 0.05) 0%, transparent 70%)',
                  }}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Play button overlay - only for interactive videos */}
      {showPlayButton && !autoplayOnLoad && !isActivated && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors cursor-pointer">
            <svg 
              className="w-8 h-8 text-white ml-1" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      {/* Vimeo iframe - render immediately for autoplay videos */}
      {isActivated && !iframeError && (
        <iframe
          ref={iframeRef}
          src={playerUrl}
          className={`transition-opacity duration-1000 ${
            iframeLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            filter: 'brightness(0.85)',
            transform: 'translateZ(0)', // GPU acceleration
            willChange: 'opacity, transform',
          }}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          title={title}
          onLoad={handleIframeLoad}
        />
      )}
    </div>
  );
};

export default LiteVimeoEmbed;