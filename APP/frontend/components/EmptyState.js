import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';
import globalStyles from '../theme/styles';

const EmptyState = ({ title = 'Sin informacion', subtitle = 'Todavia no hay datos para mostrar', iconName = 'cube-outline' }) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconWrapper}>
                <Ionicons name={iconName} size={42} color={colors.primary} />
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        backgroundColor: colors.cardBackground,
        borderRadius: 20,
        ...globalStyles.shadow,
    },
    iconWrapper: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: '#FFF4F0',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.textDark,
    },
    subtitle: {
        textAlign: 'center',
        color: colors.textLight,
        marginTop: 6,
    },
});

export default EmptyState;
