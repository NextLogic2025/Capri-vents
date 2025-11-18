import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../theme/colors';

const VARIANT_COLORS = {
  primary: colors.primary,
  warning: colors.warning,
  danger: colors.danger,
  success: colors.success,
};

const SupervisorKpiCard = ({ label, value, variant = 'primary' }) => {
  const accent = VARIANT_COLORS[variant] || colors.primary;
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color: accent }]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    margin: 6,
    minHeight: 110,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  label: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 6,
  },
  value: {
    fontSize: 28,
    fontWeight: '700',
  },
});

export default SupervisorKpiCard;
