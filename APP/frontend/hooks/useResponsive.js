import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

/**
 * Hook personalizado para diseño responsivo
 * Detecta el tamaño de pantalla y proporciona breakpoints
 * 
 * @returns {Object} - { isMobile, isTablet, isDesktop, width, height }
 */
export const useResponsive = () => {
  const [dimensions, setDimensions] = useState(() => {
    const { width, height } = Dimensions.get('window');
    return { width, height };
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({ width: window.width, height: window.height });
    });

    return () => subscription?.remove();
  }, []);

  const { width, height } = dimensions;

  // Breakpoints estándar
  const BREAKPOINTS = {
    MOBILE: 768,
    TABLET: 1024,
  };

  return {
    width,
    height,
    isMobile: width < BREAKPOINTS.MOBILE,
    isTablet: width >= BREAKPOINTS.MOBILE && width < BREAKPOINTS.TABLET,
    isDesktop: width >= BREAKPOINTS.TABLET,
    breakpoint: width < BREAKPOINTS.MOBILE 
      ? 'mobile' 
      : width < BREAKPOINTS.TABLET 
        ? 'tablet' 
        : 'desktop',
  };
};

export default useResponsive;
