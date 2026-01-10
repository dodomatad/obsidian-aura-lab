import { createContext, useContext, useState, ReactNode } from 'react';

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
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionData, setTransitionData] = useState<TransitionData | null>(null);

  const startTransition = (data: TransitionData) => {
    setTransitionData(data);
    setIsTransitioning(true);
  };

  const endTransition = () => {
    setIsTransitioning(false);
    setTransitionData(null);
  };

  return (
    <TransitionContext.Provider value={{ isTransitioning, transitionData, startTransition, endTransition }}>
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
