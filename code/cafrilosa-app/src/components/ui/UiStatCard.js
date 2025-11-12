import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const UiStatCard = ({ icon, title, value, subtitle, progressPercent = 0, style }) => {
  const progress = Math.max(0, Math.min(1, progressPercent));
  return (
    <View style={[styles.card, style]}>
      <View style={styles.iconWrap}>
        <MaterialCommunityIcons name={icon} size={20} color="#F55A3C" />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      <View style={styles.progressBg}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>
      {/* TODO: conectar con backend aquí para KPIs del vendedor */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF3EE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  value: { fontSize: 22, fontWeight: '800', color: '#1B1B1B' },
  title: { fontSize: 14, fontWeight: '600', color: '#1B1B1B', marginTop: 2 },
  subtitle: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  progressBg: { height: 6, borderRadius: 6, backgroundColor: '#F2F2F2', marginTop: 10, overflow: 'hidden' },
  progressFill: { height: 6, backgroundColor: '#F55A3C' },
});

export default UiStatCard;
