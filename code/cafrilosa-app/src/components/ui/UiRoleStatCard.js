import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import UiProgressBar from './UiProgressBar';

const { width } = Dimensions.get('window');

const UiRoleStatCard = ({
  variant = 'cliente',
  data = {},
  onPrimaryAction,
  onSecondaryAction,
  style,
  contentStyle,
}) => {
  if (variant === 'cliente') {
    // Debe verse idéntico al diseño actual de Cliente (membership card)
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.memberCard, style]}
        onPress={onPrimaryAction}
        accessibilityRole="button"
        accessibilityLabel="Mi nivel de cliente"
      >
        <View style={contentStyle}>
          <Text style={styles.levelText}>Tu nivel</Text>
          <Text style={styles.levelTitle}>{data.levelLabel || 'Cliente' } ⭐</Text>
          <Text style={styles.levelPoints}>{(data.points ?? 0)} puntos acumulados</Text>
          <View style={styles.rewardChip}><Text style={styles.rewardChipText}>{data.nextRewardLabel || ''}</Text></View>
        </View>
        <View style={styles.giftCircle}>
          <MaterialCommunityIcons name={(data.rightIcon || 'gift-outline')} size={44} color="#FFFFFF" />
        </View>
        {/* TODO: conectar con backend aquí para nivel y puntos reales del cliente */}
      </TouchableOpacity>
    );
  }

  if (variant === 'vendedor') {
    return (
      <View style={[styles.memberCard, style]}
        accessibilityRole="summary"
        accessibilityLabel="Resumen de ventas del día"
      >
        <View style={contentStyle}>
          <Text style={styles.smallTitle}>{data.kpiTitle || 'Ventas de Hoy'}</Text>
          <Text style={styles.mainValue}>{data.mainValue || '$0'}</Text>
          <View style={styles.rowAligned}>
            {!!data.trend && <View style={styles.trendPill}><Text style={styles.trendText}>{data.trend}</Text></View>}
            {!!data.subLabel && <Text style={styles.subLabel}>{data.subLabel}</Text>}
          </View>
        </View>
        <View style={styles.giftCircle}>
          <Ionicons name={(data.rightIcon || 'bag-handle-outline')} size={44} color="#FFFFFF" />
        </View>
        {/* TODO: conectar con backend aquí para ventas del día y pedidos activos del vendedor */}
      </View>
    );
  }

  // supervisor
  return (
    <View style={[styles.memberCard, style]}
      accessibilityRole="summary"
      accessibilityLabel="Resumen de ventas del mes"
    >
      <View style={contentStyle}>
        <Text style={styles.smallTitle}>{data.kpiTitle || 'Ventas del Mes'}</Text>
        <Text style={styles.mainValue}>{data.mainValue || '$0'}</Text>
        <View style={styles.progressContainer}>
          <UiProgressBar progress={(data.progressPercent || 0) / 100} barColor="#FFFFFF" height={10} backgroundColor="rgba(255,255,255,0.25)" borderRadius={8} />
        </View>
        {!!data.goalText && <Text style={styles.goalText}>{data.goalText}</Text>}
      </View>
      <View style={styles.giftCircle}>
        <Ionicons name={(data.rightIcon || 'analytics-outline')} size={44} color="#FFFFFF" />
      </View>
      {/* TODO: conectar con backend aquí para ventas del mes y meta del equipo/zona */}
    </View>
  );
};

const styles = StyleSheet.create({
  memberCard: {
    backgroundColor: '#E64A19',
    borderRadius: 28,
    padding: 20,
    minHeight: 180,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  levelText: { color: '#FFEFEA', fontSize: 14, fontWeight: '700', marginBottom: 6 },
  levelTitle: { color: '#FFFFFF', fontSize: 36, fontWeight: '800' },
  levelPoints: { color: '#FFEFEA', fontSize: 16, fontWeight: '700', marginTop: 4, marginBottom: 12 },
  rewardChip: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 18, paddingVertical: 10, paddingHorizontal: 14 },
  rewardChipText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  giftCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },

  smallTitle: { color: '#FFEFEA', fontSize: 14, fontWeight: '700', marginBottom: 6 },
  mainValue: { color: '#FFFFFF', fontSize: 36, fontWeight: '800' },
  rowAligned: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  trendPill: { backgroundColor: 'rgba(76,175,80,0.18)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  trendText: { color: '#2E7D32', fontSize: 14, fontWeight: '700' },
  subLabel: { color: '#FFEFEA', fontSize: 16, fontWeight: '700' },

  goalText: { color: '#FFEFEA', fontSize: 14, fontWeight: '700', marginTop: 8 },
  progressContainer: { marginTop: 8 },
});

export default UiRoleStatCard;
