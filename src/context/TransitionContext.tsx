import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  // Intro state management
  hasSeenIntro: boolean;
  setHasSeenIntro: (value: boolean) => void;
  // Scroll position management
  savedScrollPosition: number;
  saveScrollPosition: () => void;
  getSavedScrollPosition: () => number;
  clearScrollPosition: () => void;
}

const INTRO_SEEN_KEY = 'liberdade_intro_seen';
const SCROLL_POSITION_KEY = 'liberdade_scroll_position';

const TransitionContext = createContext<TransitionContextType | null>(null);

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionData, setTransitionData] = useState<TransitionData | null>(null);
  const [hasSeenIntro, setHasSeenIntroState] = useState(() => {
    return sessionStorage.getItem(INTRO_SEEN_KEY) === 'true';
  });
  const [savedScrollPosition, setSavedScrollPosition] = useState(0);

  const startTransition = (data: TransitionData) => {
    setTransitionData(data);
    setIsTransitioning(true);
  };

  const endTransition = () => {
    setIsTransitioning(false);
    setTransitionData(null);
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

  return (
    <TransitionContext.Provider value={{ 
      isTransitioning, 
      transitionData, 
      startTransition, 
      endTransition,
      hasSeenIntro,
      setHasSeenIntro,
      savedScrollPosition,
      saveScrollPosition,
      getSavedScrollPosition,
      clearScrollPosition,
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
