import { Platform } from 'react-native';

/**
 * Hook personalizado para detección de plataforma
 * Proporciona flags booleanos para cada plataforma
 * 
 * @returns {Object} - { isWeb, isIOS, isAndroid, platform }
 */
export const usePlatform = () => {
    return {
        platform: Platform.OS,
        isWeb: Platform.OS === 'web',
        isIOS: Platform.OS === 'ios',
        isAndroid: Platform.OS === 'android',
        isNative: Platform.OS === 'ios' || Platform.OS === 'android',
    };
};

export default usePlatform;
