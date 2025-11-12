import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import UiProgressBar from './UiProgressBar';

const UiKpiCard = ({
  icon,
  title,
  value,
  subtitle,
  progress, // 0..1
  progressColor = '#E53935',
  trend,
  trendColor,
  iconBgColor = '#FFF8E7',
  iconColor = '#F55A3C',
}) => {
  return (
    <View style={styles.card}>
      <View style={[styles.iconWrap, { backgroundColor: iconBgColor }]}>
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {typeof progress === 'number' ? (
        <View style={styles.progressWrap}>
          <UiProgressBar progress={progress} barColor={progressColor} height={6} backgroundColor="#EFEFEF" borderRadius={6} />
        </View>
      ) : null}
      {trend && (
        <View style={styles.trendRow}>
          <MaterialCommunityIcons name="trending-up" size={14} color={trendColor || '#4CAF50'} />
          <Text style={[styles.trendText, { color: trendColor || '#4CAF50' }]}>{trend}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
    minWidth: 150,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  title: {
    color: '#6B7280',
    fontSize: 13,
    fontWeight: '500',
  },
  value: {
    color: '#0F172A',
    fontSize: 22,
    fontWeight: '800',
    marginTop: 4,
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 2,
  },
  progressWrap: {
    marginTop: 8,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  trendText: {
    fontWeight: '700',
    fontSize: 12,
  },
});

export default UiKpiCard;
