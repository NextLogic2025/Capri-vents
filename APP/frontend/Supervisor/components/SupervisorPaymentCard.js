import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';

const getStatusColor = (estado) => {
  if (!estado) return colors.warning;
  const key = estado.toString().toLowerCase();
  if (key.includes('aprob')) return colors.success;
  if (key.includes('rechaz')) return colors.danger;
  return colors.warning;
};

const SupervisorPaymentCard = ({ payment = {}, onPress = () => {} }) => {
  const tipo = (payment.tipo || 'TRANSFERENCIA').toUpperCase();
  const iconName = tipo === 'EFECTIVO' ? 'cash-outline' : 'card-outline';
  const clienteNombre = payment.clienteNombre || 'Cliente sin nombre';
  const pedidoId = payment.pedidoId || payment.cuotaId || 'PED-XXXX';
  const monto = payment.monto ?? payment.amount ?? 0;
  const fecha = payment.fechaRegistro || payment.fecha || new Date().toISOString();
  const vendedor = payment.vendedorNombre || 'Vendedor asignado';
  const estado = payment.estado || 'Pendiente';
  const badgeColor = getStatusColor(estado);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.card}>
      <View style={styles.row}>
        <View style={styles.iconCircle}>
          <Ionicons name={iconName} size={20} color={colors.primary} />
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.title}>
            {pedidoId} – {tipo === 'EFECTIVO' ? 'Efectivo' : 'Transferencia'}
          </Text>
          <Text style={styles.subtitle}>{clienteNombre}</Text>
          {tipo === 'EFECTIVO' ? <Text style={styles.subtitle}>{vendedor}</Text> : null}
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.amount}>$ {Number(monto).toFixed(2)}</Text>
          <View style={[styles.badge, { backgroundColor: badgeColor + '33' }]}>
            <Text style={[styles.badgeText, { color: badgeColor }]}>{estado}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.date}>{fecha}</Text>
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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.inputBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textLight,
    marginTop: 2,
  },
  amount: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  badge: {
    marginTop: 6,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  date: {
    marginTop: 8,
    fontSize: 12,
    color: colors.textMuted,
  },
});

export default SupervisorPaymentCard;
