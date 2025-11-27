import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useWebLayout } from '../hooks';

/**
 * Componente contenedor que limita el ancho en web
 * Mantiene el comportamiento normal en móvil
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido del contenedor
 * @param {number} props.maxWidth - Ancho máximo en web (default: 1200)
 * @param {Object} props.style - Estilos adicionales
 */
const WebContainer = ({ children, maxWidth = 1200, style, ...props }) => {
    const { containerStyle } = useWebLayout(maxWidth);

    return (
        <View style={[styles.container, containerStyle, style]} {...props}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default WebContainer;
