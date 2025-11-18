import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import globalStyles from '../../theme/styles';

const BADGE_MAP = {
  PENDIENTE_COBRO: { label: 'Pendiente de cobro', color: colors.warning },
  COBRADO_REPORTADO: { label: 'Cobro reportado', color: colors.tabInactive },
  PENDIENTE: { label: 'Pendiente', color: colors.tabInactive },
  VENCIDA: { label: 'Vencida', color: colors.danger },
  VENCIDO: { label: 'Vencida', color: colors.danger },
  PAGADA: { label: 'Pago reportado', color: colors.primaryDark },
  PAGO_PENDIENTE_VALIDACION: { label: 'Pago reportado', color: colors.primaryDark },
  PENDIENTE_COBRO_EFECTIVO: { label: 'Cobro en proceso', color: colors.warning },
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
  const badge = BADGE_MAP[badgeKey] || { label: badgeKey, color: colors.primary };

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress}>
      <View style={styles.row}>
        <View style={styles.iconWrapper}>
          <Ionicons
            name={type === 'CUOTA' ? 'calendar-outline' : 'cube-outline'}
            size={20}
            color={colors.primary}
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>
            {type === 'CUOTA'
              ? `Cuota ${item.numeroCuota || item.numero || '?'} – Pedido ${item.pedidoId || '??'}`
              : `Pedido ${item.code || item.pedidoId || '??'}`}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {clienteNombre}
          </Text>
          <Text style={styles.subtitle}>
            {type === 'CUOTA'
              ? `Vence: ${formatDate(item.fechaVencimiento)}`
              : `Entrega: ${formatDate(item.fechaEntrega)}`}
          </Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.amount}>{formatCurrency(item.monto)}</Text>
          <View style={[styles.badge, { backgroundColor: badge.color }]}>
            <Text style={styles.badgeText}>{badge.label}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    ...globalStyles.card,
    padding: 14,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: '#FFF4F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textDark,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },
  right: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },
  badge: {
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.white,
  },
});

export default VendedorCobroCard;
