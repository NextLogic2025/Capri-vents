import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import UiBadge from './UiBadge';

const UiOrderCard = ({
  orderId,
  clientName,
  date,
  total,
  status,
  statusVariant,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        <Text style={styles.orderId}>Pedido #{orderId}</Text>
        <UiBadge label={status} variant={statusVariant} />
      </View>
      <View style={styles.body}>
        <View style={styles.row}>
          <Ionicons name="person-outline" size={16} color="#6B7280" style={styles.icon} />
          <Text style={styles.clientName}>{clientName}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="calendar-outline" size={16} color="#6B7280" style={styles.icon} />
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        <Ionicons name="chevron-forward" size={22} color="#F55A3C" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  body: {
    paddingVertical: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
  },
  clientName: {
    fontSize: 14,
    color: '#374151',
  },
  date: {
    fontSize: 14,
    color: '#374151',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  totalLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 'auto',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F55A3C',
    marginRight: 8,
  },
});

export default UiOrderCard;
