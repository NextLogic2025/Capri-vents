import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import UiModal from './UiModal';
import UiButton from './UiButton';
import UiBadge from './UiBadge';

const Row = ({ icon, label, value, pill }) => (
  <View style={styles.row}>
    <Ionicons name={icon} size={18} color="#6B7280" style={{ marginRight: 10 }} />
    <Text style={styles.rowLabel}>{label}</Text>
    {pill ? (
      <View style={styles.pill}><Text style={styles.pillText}>{value}</Text></View>
    ) : (
      <Text style={styles.rowValue}>{value}</Text>
    )}
  </View>
);

const ProductLine = ({ qty, name, price }) => (
  <View style={styles.productLine}>
    <Text style={styles.productQty}>{qty}×</Text>
    <Text style={styles.productName}>{name}</Text>
    <Text style={styles.productPrice}>{price}</Text>
  </View>
);

const UiConfirmDeliveryModal = ({ visible, onClose, data = {}, onConfirm }) => {
  const {
    code,
    orderCode,
    statusLabel,
    time,
    clientName,
    contactName,
    address,
    itemsCount,
    total,
    driverName,
    products = [],
  } = data || {};

  return (
    <UiModal visible={visible} onClose={onClose} title={`Confirmar entrega`}>
      <View style={{ marginBottom: 12 }}>
        <Text style={styles.headerTitle}>Entrega #{code}</Text>
        {!!orderCode && <Text style={styles.headerSubtitle}>Pedido: {orderCode}</Text>}
      </View>

      <Row icon="time-outline" label="Horario estimado" value={time} />
      <Row icon="storefront-outline" label="Cliente" value={clientName} />
      <Row icon="person-outline" label="Contacto" value={contactName} />
      <Row icon="location-outline" label="Dirección" value={address} pill />
      <Row icon="cube-outline" label="Items" value={`${itemsCount} productos`} />
      {!!total && <Row icon="cash-outline" label="Total" value={total} />}
      {!!driverName && <Row icon="car-sport-outline" label="Conductor" value={driverName} />}

      {!!products?.length && (
        <View style={{ marginTop: 16 }}>
          <Text style={styles.sectionTitle}>Productos del pedido</Text>
          {products.map((p) => (
            <ProductLine key={p.id} qty={p.qty} name={p.name} price={p.price} />
          ))}
        </View>
      )}

      <View style={styles.footerButtons}>
        <UiButton title="Cancelar" variant="secondary" onPress={onClose} style={{ flex: 1, height: 48, borderColor:'#E0E0E0', backgroundColor:'#FFFFFF' }} textStyle={{ color:'#2D2D2D', fontWeight:'700' }} />
        <UiButton title="Marcar como entregada" variant="primary" onPress={onConfirm} style={{ flex: 1, height: 48, marginLeft: 12 }} textStyle={{ fontWeight:'700' }} />
      </View>

      {/* TODO: onConfirm -> PATCH /deliveries/{code} { status:'delivered' } y refrescar lista */}
    </UiModal>
  );
};

const styles = StyleSheet.create({
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#111827' },
  headerSubtitle: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  rowLabel: { width: 130, color: '#6B7280' },
  rowValue: { flex: 1, color: '#111827', fontWeight: '600' },
  pill: { flex: 1, backgroundColor: '#F3F4F6', borderRadius: 12, paddingVertical: 8, paddingHorizontal: 10 },
  pillText: { color: '#111827' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 8 },
  productLine: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#EFEFEF' },
  productQty: { width: 28, fontWeight: '700', color:'#111827' },
  productName: { flex: 1, color:'#111827' },
  productPrice: { fontWeight: '700', color:'#F55A3C' },
  footerButtons: { flexDirection: 'row', alignItems: 'center', marginTop: 18 },
});

export default UiConfirmDeliveryModal;
