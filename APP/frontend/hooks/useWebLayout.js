import { useMemo } from 'react';
import { useResponsive } from './useResponsive';
import { usePlatform } from './usePlatform';

/**
 * Hook personalizado para layout web responsivo
 * Proporciona estilos de contenedor con max-width para web
 * 
 * @param {number} maxWidth - Ancho máximo del contenedor (default: 1200)
 * @returns {Object} - { containerStyle, maxWidth, shouldCenter }
 */
export const useWebLayout = (maxWidth = 1200) => {
    const { isWeb } = usePlatform();
    const { width, isDesktop } = useResponsive();

    const containerStyle = useMemo(() => {
        if (!isWeb) {
            // En móvil nativo, no aplicar restricciones
            return {};
        }

        if (isDesktop) {
            // En desktop web, aplicar max-width y centrar
            return {
                maxWidth,
                width: '100%',
                marginHorizontal: 'auto',
                alignSelf: 'center',
            };
        }

        // En tablet/mobile web, usar ancho completo
        return {
            width: '100%',
        };
    }, [isWeb, isDesktop, maxWidth]);

    return {
        containerStyle,
        maxWidth: isWeb && isDesktop ? maxWidth : width,
        shouldCenter: isWeb && isDesktop,
    };
};

export default useWebLayout;
