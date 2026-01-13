import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface TransitionData {
  productId: string;
  productName: string;
  imageUrl: string;
  imageRect: DOMRect | null;
}

interface TransitionContextType {
  isTransitioning: boolean;
  transitionData: TransitionData | null;
  startTransition: (data: TransitionData) => void;
  endTransition: () => void;
  justTransitioned: boolean;
  setJustTransitioned: (value: boolean) => void;
  hasSeenIntro: boolean;
  setHasSeenIntro: (value: boolean) => void;
  savedScrollPosition: number;
  saveScrollPosition: () => void;
  getSavedScrollPosition: () => number;
  clearScrollPosition: () => void;
  // New: OpiumLoader state
  isLoaderVisible: boolean;
  showLoader: (callback?: () => void) => void;
  hideLoader: () => void;
}

const INTRO_SEEN_KEY = 'liberdade_intro_seen';
const SCROLL_POSITION_KEY = 'liberdade_scroll_position';
const LOADER_DURATION = 1500; // 1.5 seconds dramatic delay

const TransitionContext = createContext<TransitionContextType | null>(null);

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionData, setTransitionData] = useState<TransitionData | null>(null);
  const [justTransitioned, setJustTransitioned] = useState(false);
  const [hasSeenIntro, setHasSeenIntroState] = useState(() => {
    return sessionStorage.getItem(INTRO_SEEN_KEY) === 'true';
  });
  const [savedScrollPosition, setSavedScrollPosition] = useState(0);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);

  const startTransition = (data: TransitionData) => {
    setTransitionData(data);
    setIsTransitioning(true);
    setJustTransitioned(false);
  };

  const endTransition = () => {
    setIsTransitioning(false);
    setJustTransitioned(true);
    setTimeout(() => {
      setTransitionData(null);
      setJustTransitioned(false);
    }, 100);
  };

  const setHasSeenIntro = (value: boolean) => {
    setHasSeenIntroState(value);
    if (value) {
      sessionStorage.setItem(INTRO_SEEN_KEY, 'true');
    } else {
      sessionStorage.removeItem(INTRO_SEEN_KEY);
    }
  };

  const saveScrollPosition = () => {
    const scrollY = window.scrollY;
    setSavedScrollPosition(scrollY);
    sessionStorage.setItem(SCROLL_POSITION_KEY, scrollY.toString());
  };

  const getSavedScrollPosition = (): number => {
    const saved = sessionStorage.getItem(SCROLL_POSITION_KEY);
    return saved ? parseInt(saved, 10) : 0;
  };

  const clearScrollPosition = () => {
    setSavedScrollPosition(0);
    sessionStorage.removeItem(SCROLL_POSITION_KEY);
  };

  // Show loader with dramatic 1.5s delay, then execute callback
  const showLoader = useCallback((callback?: () => void) => {
    setIsLoaderVisible(true);
    setTimeout(() => {
      if (callback) callback();
      // Small delay before hiding for smoother transition
      setTimeout(() => {
        setIsLoaderVisible(false);
      }, 200);
    }, LOADER_DURATION);
  }, []);

  const hideLoader = useCallback(() => {
    setIsLoaderVisible(false);
  }, []);

  return (
    <TransitionContext.Provider value={{ 
      isTransitioning, 
      transitionData, 
      startTransition, 
      endTransition,
      justTransitioned,
      setJustTransitioned,
      hasSeenIntro,
      setHasSeenIntro,
      savedScrollPosition,
      saveScrollPosition,
      getSavedScrollPosition,
      clearScrollPosition,
      isLoaderVisible,
      showLoader,
      hideLoader,
    }}>
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
};
