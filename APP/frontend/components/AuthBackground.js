import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { usePlatform } from '../hooks';
import colors from '../theme/colors';

/**
 * Componente de fondo decorativo para pantallas de autenticación
 * Solo se muestra en web para dar un aspecto más profesional
 */
const AuthBackground = ({ children }) => {
    const { isWeb } = usePlatform();

    if (!isWeb) {
        // En móvil, solo retornar los children sin decoración adicional
        return <>{children}</>;
    }

    return (
        <View style={styles.container}>
            {/* Círculos decorativos de fondo */}
            <View style={styles.circle1} />
            <View style={styles.circle2} />
            <View style={styles.circle3} />

            {/* Contenido principal */}
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
    },
    content: {
        flex: 1,
        zIndex: 1,
    },
    // Círculos decorativos con gradientes
    circle1: {
        position: 'absolute',
        width: 400,
        height: 400,
        borderRadius: 200,
        backgroundColor: 'rgba(229, 57, 53, 0.08)',
        top: -200,
        right: -100,
        zIndex: 0,
    },
    circle2: {
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(229, 57, 53, 0.05)',
        bottom: -150,
        left: -80,
        zIndex: 0,
    },
    circle3: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(229, 57, 53, 0.06)',
        top: '50%',
        left: -100,
        zIndex: 0,
    },
});

export default AuthBackground;
