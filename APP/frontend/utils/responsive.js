import { Dimensions, Platform } from 'react-native';

/**
 * Utilidades para diseño responsivo
 */

// Breakpoints
export const BREAKPOINTS = {
    MOBILE: 768,
    TABLET: 1024,
    DESKTOP: 1200,
};

/**
 * Obtiene el breakpoint actual
 * @returns {string} - 'mobile' | 'tablet' | 'desktop'
 */
export const getCurrentBreakpoint = () => {
    const { width } = Dimensions.get('window');

    if (width < BREAKPOINTS.MOBILE) return 'mobile';
    if (width < BREAKPOINTS.TABLET) return 'tablet';
    return 'desktop';
};

/**
 * Obtiene un valor responsivo según el breakpoint
 * @param {Object} values - { mobile, tablet, desktop }
 * @returns {any} - Valor correspondiente al breakpoint actual
 */
export const getResponsiveValue = (values) => {
    const breakpoint = getCurrentBreakpoint();
    return values[breakpoint] || values.mobile || values.default;
};

/**
 * Calcula padding responsivo
 * @param {number} mobile - Padding en móvil
 * @param {number} desktop - Padding en desktop
 * @returns {number} - Padding calculado
 */
export const getResponsivePadding = (mobile = 16, desktop = 24) => {
    return getResponsiveValue({
        mobile,
        tablet: mobile + (desktop - mobile) / 2,
        desktop,
    });
};

/**
 * Calcula tamaño de fuente responsivo
 * @param {number} mobile - Tamaño en móvil
 * @param {number} desktop - Tamaño en desktop
 * @returns {number} - Tamaño calculado
 */
export const getResponsiveFontSize = (mobile = 14, desktop = 16) => {
    return getResponsiveValue({
        mobile,
        tablet: mobile + (desktop - mobile) / 2,
        desktop,
    });
};

/**
 * Verifica si es plataforma web
 * @returns {boolean}
 */
export const isWeb = () => Platform.OS === 'web';

/**
 * Verifica si es móvil nativo
 * @returns {boolean}
 */
export const isNative = () => Platform.OS === 'ios' || Platform.OS === 'android';

/**
 * Crea estilos condicionales según la plataforma
 * @param {Object} webStyles - Estilos para web
 * @param {Object} nativeStyles - Estilos para nativo
 * @returns {Object} - Estilos aplicables
 */
export const platformStyles = (webStyles = {}, nativeStyles = {}) => {
    return isWeb() ? webStyles : nativeStyles;
};

/**
 * Obtiene el ancho máximo del contenedor para web
 * @param {number} maxWidth - Ancho máximo deseado
 * @returns {Object} - Estilos de contenedor
 */
export const getWebContainerStyle = (maxWidth = 1200) => {
    if (!isWeb()) return {};

    const { width } = Dimensions.get('window');

    if (width >= BREAKPOINTS.DESKTOP) {
        return {
            maxWidth,
            width: '100%',
            marginHorizontal: 'auto',
            alignSelf: 'center',
        };
    }

    return { width: '100%' };
};

export default {
    BREAKPOINTS,
    getCurrentBreakpoint,
    getResponsiveValue,
    getResponsivePadding,
    getResponsiveFontSize,
    isWeb,
    isNative,
    platformStyles,
    getWebContainerStyle,
};
