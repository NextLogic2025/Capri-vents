import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../theme/colors';

const getStatusColor = (status) => {
  if (!status) return colors.primary;
  const key = status.toString().toLowerCase();
  if (key.includes('entregado') || key.includes('pagado')) return colors.success;
  if (key.includes('ruta') || key.includes('prepar')) return colors.warning;
  if (key.includes('pendiente') || key.includes('creado')) return colors.primary;
  return colors.primary;
};

const SupervisorOrderCard = ({ order = {}, onPress = () => {}, onAssignVendorPress = () => {} }) => {
  const code = order.code || order.id || 'PED-XXXX';
  const date = order.date || order.fecha || order.createdAt || '';
  const cliente = order.clientName || order.clienteNombre || 'Cliente sin nombre';
  const zona = order.zone || order.zona || 'Sin zona';
  const metodo = order.paymentMethod || order.metodoPago || 'Transferencia';
  const estadoPedido = order.status || order.estadoPedido || 'Pendiente';
  const estadoPago = order.paymentStatus || order.estadoPago || 'Pendiente';
  const total = order.total ?? order.amount ?? order.monto ?? 0;
  const vendorName = order.assignedVendorName || order.assignedVendor || 'Sin asignar';
  const formattedTotal = `$ ${Number(total).toFixed(2)}`;
  const badgeColor = getStatusColor(estadoPedido);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.code}>{code}</Text>
        {date ? <Text style={styles.date}>{date}</Text> : null}
      </View>
      <Text style={styles.client}>
        {cliente} · {zona}
      </Text>
      <View style={[styles.rowBetween, { marginTop: 6 }]}>
        <View>
          <Text style={styles.method}>{metodo}</Text>
          <View style={[styles.badge, { backgroundColor: badgeColor + '1A' }]}>
            <Text style={[styles.badgeText, { color: badgeColor }]}>{estadoPedido}</Text>
          </View>
          <Text style={[styles.badgeText, { marginTop: 4, fontSize: 12 }]}>{estadoPago}</Text>
        </View>
        <Text style={styles.total}>{formattedTotal}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.vendor}>Vendedor: {vendorName}</Text>
        <TouchableOpacity onPress={onAssignVendorPress} style={styles.assignButton}>
          <Text style={styles.assignText}>{vendorName === 'Sin asignar' ? 'Asignar' : 'Cambiar'} vendedor</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  code: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
  },
  date: {
    fontSize: 12,
    color: colors.textLight,
  },
  client: {
    fontSize: 15,
    color: colors.bodyText,
    marginTop: 6,
  },
  method: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
  },
  badge: {
    marginTop: 6,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  total: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  footer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vendor: {
    color: colors.textMuted,
    fontSize: 14,
  },
  assignButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  assignText: {
    color: colors.primary,
    fontWeight: '700',
  },
});

export default SupervisorOrderCard;
