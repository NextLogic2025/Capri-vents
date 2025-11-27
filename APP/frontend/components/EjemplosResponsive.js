/**
 * EJEMPLO DE USO: Cómo aplicar responsive design en tus pantallas
 * 
 * Este archivo muestra cómo usar los hooks y componentes creados
 * para hacer que tus pantallas se vean bien tanto en móvil como en web
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useWebLayout, useResponsive, usePlatform } from '../hooks';
import WebContainer from '../components/WebContainer';
import ResponsiveView from '../components/ResponsiveView';

/**
 * OPCIÓN 1: Usar el hook useWebLayout
 * Esta es la forma más simple y recomendada
 */
const EjemploConHook = () => {
    const { containerStyle } = useWebLayout(1200); // max-width de 1200px en web

    return (
        <ScrollView style={[styles.container, containerStyle]}>
            <Text style={styles.title}>Pantalla con useWebLayout</Text>
            <Text>Este contenido se limita a 1200px en web desktop</Text>
        </ScrollView>
    );
};

/**
 * OPCIÓN 2: Usar el componente WebContainer
 * Útil cuando quieres envolver todo el contenido
 */
const EjemploConComponente = () => {
    return (
        <WebContainer maxWidth={1200}>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Pantalla con WebContainer</Text>
                <Text>Este contenido también se limita a 1200px en web desktop</Text>
            </ScrollView>
        </WebContainer>
    );
};

/**
 * OPCIÓN 3: Usar ResponsiveView para estilos diferentes por breakpoint
 * Útil cuando necesitas layouts completamente diferentes
 */
const EjemploConResponsiveView = () => {
    return (
        <ResponsiveView
            mobile={styles.mobileLayout}
            tablet={styles.tabletLayout}
            desktop={styles.desktopLayout}
        >
            <Text style={styles.title}>Pantalla con ResponsiveView</Text>
            <Text>Este contenido tiene estilos diferentes según el tamaño</Text>
        </ResponsiveView>
    );
};

/**
 * OPCIÓN 4: Usar useResponsive para lógica condicional
 * Útil cuando necesitas renderizar componentes diferentes
 */
const EjemploConLogicaCondicional = () => {
    const { isMobile, isTablet, isDesktop, width } = useResponsive();
    const { isWeb } = usePlatform();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Información de la pantalla</Text>
            <Text>Ancho: {width}px</Text>
            <Text>Plataforma: {isWeb ? 'Web' : 'Móvil nativo'}</Text>
            <Text>Breakpoint: {isMobile ? 'Móvil' : isTablet ? 'Tablet' : 'Desktop'}</Text>

            {/* Renderizado condicional */}
            {isDesktop && (
                <Text>Este texto solo se muestra en desktop</Text>
            )}

            {isMobile && (
                <Text>Este texto solo se muestra en móvil</Text>
            )}
        </View>
    );
};

/**
 * OPCIÓN 5: Combinar todo para máximo control
 * Ejemplo completo con todas las técnicas
 */
const EjemploCompleto = () => {
    const { containerStyle, shouldCenter } = useWebLayout(1200);
    const { isMobile, isDesktop } = useResponsive();
    const { isWeb } = usePlatform();

    return (
        <ScrollView style={[styles.container, containerStyle]}>
            <View style={styles.header}>
                <Text style={styles.title}>Ejemplo Completo</Text>
                {isWeb && <Text style={styles.badge}>WEB</Text>}
            </View>

            {/* Grid responsivo */}
            <View style={[
                styles.grid,
                isDesktop ? styles.gridDesktop : styles.gridMobile
            ]}>
                <View style={styles.card}>
                    <Text>Card 1</Text>
                </View>
                <View style={styles.card}>
                    <Text>Card 2</Text>
                </View>
                <View style={styles.card}>
                    <Text>Card 3</Text>
                </View>
            </View>

            {/* Padding responsivo */}
            <View style={[
                styles.section,
                { padding: isMobile ? 16 : 24 }
            ]}>
                <Text>Sección con padding adaptativo</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    badge: {
        backgroundColor: '#e53935',
        color: '#fff',
        padding: 4,
        borderRadius: 4,
        fontSize: 12,
    },

    // Layouts responsivos
    mobileLayout: {
        padding: 16,
        flexDirection: 'column',
    },
    tabletLayout: {
        padding: 20,
        flexDirection: 'column',
    },
    desktopLayout: {
        padding: 24,
        flexDirection: 'row',
        maxWidth: 1200,
        marginHorizontal: 'auto',
    },

    // Grid responsivo
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 16,
    },
    gridMobile: {
        gap: 8,
    },
    gridDesktop: {
        gap: 16,
    },
    card: {
        backgroundColor: '#f5f5f5',
        padding: 16,
        borderRadius: 8,
        minWidth: 150,
        flex: 1,
    },
    section: {
        marginVertical: 16,
    },
});

// Exportar todos los ejemplos
export {
    EjemploConHook,
    EjemploConComponente,
    EjemploConResponsiveView,
    EjemploConLogicaCondicional,
    EjemploCompleto,
};

/**
 * GUÍA RÁPIDA DE USO:
 * 
 * 1. Para la mayoría de pantallas, usa useWebLayout:
 *    const { containerStyle } = useWebLayout();
 *    <View style={[styles.container, containerStyle]}>
 * 
 * 2. Si necesitas diferentes layouts, usa ResponsiveView:
 *    <ResponsiveView mobile={...} desktop={...}>
 * 
 * 3. Si necesitas lógica condicional, usa useResponsive:
 *    const { isMobile, isDesktop } = useResponsive();
 * 
 * 4. Si necesitas detectar plataforma, usa usePlatform:
 *    const { isWeb, isNative } = usePlatform();
 * 
 * BREAKPOINTS:
 * - Mobile: < 768px
 * - Tablet: 768px - 1024px
 * - Desktop: > 1024px
 * 
 * MAX-WIDTH RECOMENDADO:
 * - Contenido general: 1200px
 * - Formularios: 600px
 * - Texto largo: 800px
 */
