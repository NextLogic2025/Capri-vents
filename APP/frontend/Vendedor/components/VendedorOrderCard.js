import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import globalStyles from '../../theme/styles';

const methodIcons = {
  EFECTIVO: 'cash-outline',
  CASH: 'cash-outline',
  TRANSFERENCIA: 'swap-horizontal-outline',
  TRANSFER: 'swap-horizontal-outline',
  TARJETA: 'card-outline',
  CREDITO: 'document-text-outline',
};

const statusColors = {
  ENTREGADO: colors.success,
  ENTREGADA: colors.success,
  EN_RUTA: colors.gold,
  PENDIENTE_ENTREGA: colors.primary,
  PENDIENTE: colors.primary,
  EN_PREPARACION: colors.secondaryGold,
};

const formatCurrency = (value = 0) => {
  const amount = Number(value) || 0;
  return amount.toFixed(2);
};

const formatDate = (value) => {
  if (!value) return 'Hoy';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  try {
    return date.toLocaleDateString('es-EC', { day: '2-digit', month: 'short' });
  } catch (error) {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}`;
  }
};

const getStatusColor = (status = '') => {
  const key = status.toUpperCase();
  return statusColors[key] || colors.primary;
};

const getMethodIcon = (method = '') => {
  const key = method.toUpperCase();
  return methodIcons[key] || 'document-text-outline';
};

const normalizeText = (text, fallback) => {
  if (!text) return fallback;
  return text;
};

const VendedorOrderCard = ({ order, onPress }) => {
  if (!order) return null;

  const code = order.code || order.id || 'Pedido';
  const clientName = normalizeText(order.clientName || order.clienteNombre, 'Cliente sin nombre');
  const clientAddress = normalizeText(
    order.clientAddress || order.clienteDireccion || order.address,
    'Sin direccion'
  );
  const paymentMethod = (order.paymentMethod || order.metodoPago || '').toUpperCase();
  const orderStatus = order.status || order.estadoPedido || 'PENDIENTE_ENTREGA';
  const paymentStatus = order.paymentStatus || order.estadoPago || 'Pendiente';

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.92} onPress={onPress}>
      <View style={styles.rowBetween}>
        <Text style={styles.code}>{code}</Text>
        <Text style={styles.date}>{formatDate(order.date || order.fecha)}</Text>
      </View>

      <View style={styles.clientBlock}>
        <Text style={styles.clientName} numberOfLines={1}>
          {clientName}
        </Text>
        <Text style={styles.clientAddress} numberOfLines={2}>
          {clientAddress}
        </Text>
      </View>

      <View style={styles.paymentRow}>
        <View style={styles.methodInfo}>
          <View style={styles.methodIcon}>
            <Ionicons name={getMethodIcon(paymentMethod)} size={18} color={colors.primary} />
          </View>
          <View>
            <Text style={styles.methodLabel}>
              {paymentMethod || order.metodoPago || 'Transferencia'}
            </Text>
            <Text style={styles.paymentStatus} numberOfLines={1}>
              {paymentStatus}
            </Text>
          </View>
        </View>
        <Text style={styles.total}>${formatCurrency(order.total)}</Text>
      </View>

      <View style={styles.footer}>
        <View style={[styles.badge, { backgroundColor: getStatusColor(orderStatus) }]}>
          <Text style={styles.badgeText}>{orderStatus}</Text>
        </View>
        <Text style={styles.footerStatus}>Pago: {paymentStatus}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  code: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textDark,
  },
  date: {
    fontSize: 12,
    color: colors.textLight,
  },
  clientBlock: {
    marginTop: 12,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
  },
  clientAddress: {
    fontSize: 13,
    color: colors.textLight,
    marginTop: 4,
  },
  paymentRow: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  methodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  methodIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    marginRight: 10,
  },
  methodLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textDark,
    textTransform: 'capitalize',
  },
  paymentStatus: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },
  total: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  footerStatus: {
    fontSize: 12,
    color: colors.textLight,
  },
});

export default VendedorOrderCard;
