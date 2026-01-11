import { useCallback } from 'react';

export const useSmoothScroll = () => {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Avoid native smooth scroll to prevent "double easing" with Lenis
      element.scrollIntoView({
        behavior: 'auto',
        block: 'start',
      });
    }
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    scrollToSection(sectionId);
  }, [scrollToSection]);

  return { scrollToSection, handleNavClick };
};
