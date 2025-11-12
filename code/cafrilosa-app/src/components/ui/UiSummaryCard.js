import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UiSummaryCard = ({
  title = 'Resumen del Día',
  items = [], // [{ value: '147', label: 'Pedidos' }, ...]
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.9 : 1}
      onPress={onPress}
      style={[styles.card, style]}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={title}
    >
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <View style={styles.headerIconWrap}>
            <Ionicons name="radio-button-on" size={16} color="#FFFFFF" />
          </View>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
      </View>

      <View style={styles.itemsRow}>
        {items.map((it, idx) => (
          <View key={`${it.label}-${idx}`} style={styles.itemPill}>
            <Text style={styles.itemValue}>{it.value}</Text>
            <Text style={styles.itemLabel}>{it.label}</Text>
          </View>
        ))}
      </View>
      {/* TODO: conectar con backend aquí para KPIs resumidos del día */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E64A2E',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  headerIconWrap: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  headerTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  itemsRow: { flexDirection: 'row', gap: 10, marginTop: 12 },
  itemPill: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemValue: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  itemLabel: { color: '#FFFFFF', opacity: 0.9, fontSize: 12, marginTop: 2 },
});

export default UiSummaryCard;
