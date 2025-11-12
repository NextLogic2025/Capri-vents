import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import UiButton from './UiButton';
import UiBadge from './UiBadge';

const UiRouteCard = ({
  time,
  statusBadge,
  clientName,
  contactName,
  address,
  orderAmount,
  itemsCount,
  onReport,
  onDelivered,
  onCall,
  style,
}) => {
  return (
    <View style={[styles.card, style]}>
      {/* Top row: time + status badge, right check icon */}
      <View style={styles.topRow}>
        <View style={styles.leftTop}>
          <View style={styles.timeRow}>
            <Ionicons name="time-outline" size={16} color="#065F46" />
            <Text style={styles.timeText}>{time}</Text>
          </View>
          {!!statusBadge && (
            <View style={styles.badgeWrap}>
              <UiBadge label={statusBadge} color="success" />
            </View>
          )}
        </View>
        <MaterialCommunityIcons name="check-circle-outline" size={22} color="#22C55E" />
      </View>

      {/* Client and details */}
      <Text style={styles.clientName}>{clientName}</Text>
      {!!contactName && (
        <View style={styles.infoRow}>
          <Ionicons name="person-outline" size={16} color="#065F46" />
          <Text style={styles.infoText}>{contactName}</Text>
        </View>
      )}
      {!!address && (
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={16} color="#065F46" />
          <Text style={styles.infoText}>{address}</Text>
        </View>
      )}

      {/* Order box */}
      <View style={styles.orderBox}>
        {!!orderAmount && (
          <View style={styles.checkRow}>
            <Ionicons name="checkmark-circle" size={16} color="#22C55E" />
            <Text style={styles.checkText}>Pedido: {orderAmount}</Text>
          </View>
        )}
        {typeof itemsCount === 'number' && (
          <View style={styles.checkRow}>
            <Ionicons name="checkmark-circle" size={16} color="#22C55E" />
            <Text style={styles.checkText}>{itemsCount} productos</Text>
          </View>
        )}
      </View>

      {/* Footer actions */}
      <View style={styles.footerRow}>
        <View style={styles.footerButtons}>
          <UiButton title="Reportar" variant="secondary" onPress={onReport} style={{ height: 44, borderColor: '#E0E0E0', backgroundColor: '#FFFFFF' }} textStyle={{ color: '#2D2D2D', fontWeight: '700' }} />
          <UiButton title="Entregado" variant="primary" onPress={onDelivered} style={{ height: 44, marginLeft: 8, backgroundColor: '#22C55E', borderColor: '#22C55E' }} textStyle={{ color: '#FFFFFF', fontWeight: '700' }} />
        </View>
        <TouchableOpacity onPress={onCall} style={styles.phoneBtn} accessibilityRole="button" accessibilityLabel="Llamar">
          <Ionicons name="call" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* TODO: conectar con backend aquí para ruta del día y acciones de visita/pedido */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ECFFF5',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 6,
    borderLeftColor: '#22C55E',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  leftTop: { flexDirection: 'row', alignItems: 'center' },
  timeRow: { flexDirection: 'row', alignItems: 'center' },
  timeText: { marginLeft: 6, color: '#065F46', fontWeight: '700' },
  badgeWrap: { marginLeft: 10 },
  clientName: { fontSize: 18, fontWeight: '800', color: '#1B1B1B', marginTop: 10 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  infoText: { marginLeft: 6, color: '#1B1B1B' },
  orderBox: { backgroundColor: '#DDFBE9', borderRadius: 12, padding: 12, marginTop: 12 },
  checkRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  checkText: { marginLeft: 6, color: '#065F46', fontWeight: '700' },
  footerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 },
  footerButtons: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  phoneBtn: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#22C55E', alignItems: 'center', justifyContent: 'center', marginLeft: 10, elevation: 3, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 10, shadowOffset: { width: 0, height: 6 } },
});

export default UiRouteCard;
