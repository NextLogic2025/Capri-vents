import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import UiButton from './UiButton';
import UiBadge from './UiBadge';

// status.type: 'success' | 'warning' | 'info'
const UiDeliveryCard = ({
  code,
  status = { type: 'info', label: '' },
  orderCode,
  time,
  clientName,
  contactName,
  address,
  itemsCount,
  subtotal,
  driverName,
  badgeRight = { visible: false, icon: 'check-circle-outline', label: '' },
  primaryAction, // { label, onPress }
  footerBadge,   // { visible, icon, label }
  style,
}) => {
  const showPrimary = status?.type === 'warning' && primaryAction?.label && primaryAction?.onPress;

  return (
    <View style={[styles.card, style]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Text style={styles.codeText}>{code}</Text>
          {!!status?.label && (
            <UiBadge label={status.label} variant={status.type} style={{ marginLeft: 8 }} />
          )}
        </View>
        <View style={styles.headerRight}>
          {!!time && <Text style={styles.timeText}>{time}</Text>}
          {!!orderCode && <Text style={styles.orderCode}>Pedido: {orderCode}</Text>}
        </View>
      </View>

      {/* Client block */}
      {!!clientName && <Text style={styles.clientName}>{clientName}</Text>}
      {!!contactName && (
        <View style={styles.infoRow}>
          <Ionicons name="person-outline" size={16} color="#065F46" />
          <Text style={styles.infoText}>{contactName}</Text>
        </View>
      )}
      {!!address && (
        <View style={[styles.infoRow, { marginTop: 6 }]}>
          <Ionicons name="location-outline" size={16} color="#065F46" />
          <View style={styles.addressPill}><Text style={styles.addressText}>{address}</Text></View>
        </View>
      )}

      {/* Items & subtotal */}
      <View style={styles.itemsRow}>
        <Text style={styles.itemsText}>{itemsCount} items • {subtotal}</Text>
        {badgeRight?.visible && (
          <UiBadge label={badgeRight.label || ''} variant="success" style={{ alignSelf: 'auto' }} />
        )}
      </View>

      {/* Primary action */}
      {showPrimary && (
        <UiButton title={primaryAction.label} onPress={primaryAction.onPress} style={{ marginTop: 10, height: 44 }} />
      )}

      {/* Footer */}
      {footerBadge?.visible && (
        <View style={styles.footerRight}>
          <MaterialCommunityIcons name={footerBadge.icon || 'warehouse'} size={16} color="#065F46" />
          <Text style={styles.footerRightText}>{footerBadge.label}</Text>
        </View>
      )}

      {/* TODO: conectar con backend aquí para lista de entregas y confirmar entrega */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
    // Cafrilosa left tomato border
    borderLeftWidth: 6,
    borderLeftColor: '#E64A2E',
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  codeText: { fontSize: 16, fontWeight: '800', color: '#1B1B1B' },
  headerRight: { alignItems: 'flex-end' },
  timeText: { color: '#1B1B1B', fontWeight: '700' },
  orderCode: { color: '#F55A3C', fontSize: 12, fontWeight: '700' },
  clientName: { marginTop: 10, fontSize: 18, fontWeight: '800', color: '#1B1B1B' },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 6 },
  infoText: { color: '#1B1B1B' },
  addressPill: { backgroundColor: '#F3F4F6', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 12, flex: 1 },
  addressText: { color: '#1B1B1B' },
  itemsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 },
  itemsText: { color: '#1B1B1B', fontWeight: '700' },
  footerRight: { marginTop: 8, flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', gap: 6 },
  footerRightText: { color: '#065F46', fontWeight: '700' },
});

export default UiDeliveryCard;

