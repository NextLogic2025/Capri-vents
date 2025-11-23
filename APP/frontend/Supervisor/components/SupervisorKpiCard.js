import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../theme/colors';

const VARIANT_COLORS = {
  primary: {
    solid: colors.primary,
    gradient: [colors.primary, '#C62828'],
    background: '#FFEBEE',
  },
  warning: {
    solid: colors.warning,
    gradient: ['#FFA726', '#F57C00'],
    background: '#FFF3E0',
  },
  danger: {
    solid: colors.danger,
    gradient: ['#EF5350', '#D32F2F'],
    background: '#FFEBEE',
  },
  success: {
    solid: colors.success || '#4CAF50',
    gradient: ['#66BB6A', '#388E3C'],
    background: '#E8F5E9',
  },
};

const SupervisorKpiCard = ({ label, value, variant = 'primary', icon }) => {
  const colorScheme = VARIANT_COLORS[variant] || VARIANT_COLORS.primary;

  return (
    <View style={styles.card}>
      <LinearGradient
        colors={[colors.white, colorScheme.background]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {icon && (
          <View style={[styles.iconContainer, { backgroundColor: colorScheme.background }]}>
            <Ionicons name={icon} size={24} color={colorScheme.solid} />
          </View>
        )}
        <View style={styles.content}>
          <Text style={styles.label}>{label}</Text>
          <Text style={[styles.value, { color: colorScheme.solid }]}>{value}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    marginHorizontal: 6,
  },
  gradient: {
    padding: 18,
    minHeight: 120,
    justifyContent: 'space-between',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.borderSoft,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  content: {
    marginTop: 'auto',
  },
  label: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 6,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  value: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
});

export default SupervisorKpiCard;
