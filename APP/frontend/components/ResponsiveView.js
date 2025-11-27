import React from 'react';
import { View } from 'react-native';
import { useResponsive } from '../hooks';

/**
 * Componente View mejorado con estilos responsivos
 * Aplica diferentes estilos según el breakpoint
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido
 * @param {Object} props.mobile - Estilos para móvil
 * @param {Object} props.tablet - Estilos para tablet
 * @param {Object} props.desktop - Estilos para desktop
 * @param {Object} props.style - Estilos base
 */
const ResponsiveView = ({
    children,
    mobile = {},
    tablet = {},
    desktop = {},
    style,
    ...props
}) => {
    const { isMobile, isTablet, isDesktop } = useResponsive();

    // Determinar qué estilos aplicar según el breakpoint
    const responsiveStyle = isMobile
        ? mobile
        : isTablet
            ? tablet
            : desktop;

    return (
        <View style={[style, responsiveStyle]} {...props}>
            {children}
        </View>
    );
};

export default ResponsiveView;
