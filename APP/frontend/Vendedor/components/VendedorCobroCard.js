import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import globalStyles from '../../theme/styles';

const BADGE_MAP = {
  PENDIENTE_COBRO: { label: 'Cobrar', color: colors.warning, icon: 'cash-outline' },
  COBRADO_REPORTADO: { label: 'En validación', color: colors.info, icon: 'time-outline' },
  PENDIENTE: { label: 'Pendiente', color: colors.tabInactive, icon: 'calendar-outline' },
  VENCIDA: { label: 'Vencida', color: colors.danger, icon: 'alert-circle-outline' },
  VENCIDO: { label: 'Vencida', color: colors.danger, icon: 'alert-circle-outline' },
  PAGADA: { label: 'Pagada', color: colors.success, icon: 'checkmark-circle-outline' },
  PAGO_PENDIENTE_VALIDACION: { label: 'Validando pago', color: colors.info, icon: 'hourglass-outline' },
  PENDIENTE_COBRO_EFECTIVO: { label: 'Efectivo recibido', color: colors.primary, icon: 'wallet-outline' },
};

const formatCurrency = (value = 0) => {
  const amount = Number(value) || 0;
  return `$${amount.toFixed(2)}`;
};

const formatDate = (value) => {
  if (!value) return 'Sin fecha';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString('es-EC', { day: '2-digit', month: 'short' });
};

const VendedorCobroCard = ({ item, onPress }) => {
  if (!item) return null;
  const type = (item.type || 'PEDIDO').toUpperCase();
  const clienteNombre = item.clienteNombre || 'Cliente sin nombre';
  const badgeKey = (item.estado || item.estadoPago || 'PENDIENTE').toUpperCase();
  const badge = BADGE_MAP[badgeKey] || { label: badgeKey, color: colors.primary, icon: 'ellipse' };

  const isOverdue = badgeKey === 'VENCIDA' || badgeKey === 'VENCIDO';

  return (
    <TouchableOpacity
      style={[styles.card, isOverdue && styles.cardOverdue]}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <View style={styles.headerRow}>
        <View style={styles.typeTag}>
          <Ionicons
            name={type === 'CUOTA' ? 'calendar-number-outline' : 'cube-outline'}
            size={14}
            color={colors.textLight}
          />
          <Text style={styles.typeText}>
            {type === 'CUOTA'
              ? `Cuota ${item.numeroCuota || item.numero || '?'}`
              : `Pedido ${item.code || item.pedidoId || '??'}`}
          </Text>
        </View>
        <Text style={[styles.dateText, isOverdue && styles.dateTextOverdue]}>
          {type === 'CUOTA' ? 'Vence: ' : 'Entrega: '}
          {formatDate(item.fechaVencimiento || item.fechaEntrega)}
        </Text>
      </View>

      <View style={styles.mainRow}>
        <View style={styles.info}>
          <Text style={styles.clientName} numberOfLines={1}>
            {clienteNombre}
          </Text>
          <Text style={styles.amount}>{formatCurrency(item.monto)}</Text>
        </View>

        <View style={[styles.badge, { backgroundColor: badge.color }]}>
          <Ionicons name={badge.icon} size={12} color={colors.white} style={{ marginRight: 4 }} />
          <Text style={styles.badgeText}>{badge.label}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  cardOverdue: {
    borderColor: colors.danger,
    backgroundColor: '#FFF5F5',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 12,
    color: colors.textLight,
    fontWeight: '600',
    marginLeft: 4,
  },
  dateText: {
    fontSize: 12,
    color: colors.textLight,
    fontWeight: '500',
  },
  dateTextOverdue: {
    color: colors.danger,
    fontWeight: '700',
  },
  mainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    marginRight: 12,
  },
  clientName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 4,
  },
  amount: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textDark,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
  },
});

export default VendedorCobroCard;
