import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';

const getStatusConfig = (status) => {
  if (!status) return { color: colors.primary, icon: 'time-outline', bg: '#FFEBEE' };
  const key = status.toString().toLowerCase();

  if (key.includes('entregado'))
    return { color: colors.success || '#4CAF50', icon: 'checkmark-circle', bg: '#E8F5E9' };
  if (key.includes('ruta'))
    return { color: colors.warning, icon: 'car-outline', bg: '#FFF3E0' };
  if (key.includes('prepar'))
    return { color: '#1976D2', icon: 'construct-outline', bg: '#E3F2FD' };
  if (key.includes('pagado'))
    return { color: colors.success || '#4CAF50', icon: 'card-outline', bg: '#E8F5E9' };

  return { color: colors.primary, icon: 'time-outline', bg: '#FFEBEE' };
};

const SupervisorOrderCard = ({
  order = {},
  onPress = () => { },
  onAssignVendorPress = () => { }
}) => {
  const code = order.code || order.id || 'PED-XXXX';
  const date = order.date || order.fecha || order.createdAt || '';
  const cliente = order.clientName || order.clienteNombre || 'Cliente sin nombre';
  const zona = order.zone || order.zona || 'Sin zona';
  const metodo = order.paymentMethod || order.metodoPago || 'Transferencia';
  const estadoPedido = order.status || order.estadoPedido || 'Pendiente';
  const estadoPago = order.paymentStatus || order.estadoPago || 'Pendiente';
  const total = order.total ?? order.amount ?? order.monto ?? 0;
  const vendorName = order.assignedVendorName || order.assignedVendor || null;
  const formattedTotal = `$${Number(total).toFixed(2)}`;

  const statusConfig = getStatusConfig(estadoPedido);
  const isUnassigned = !vendorName;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={styles.cardWrapper}>
      <View style={[
        styles.card,
        { borderLeftWidth: 4, borderLeftColor: statusConfig.color }
      ]}>
        {/* Header: Código y Fecha */}
        <View style={styles.header}>
          <View style={styles.codeContainer}>
            <Ionicons name="receipt-outline" size={18} color={colors.primary} />
            <Text style={styles.code}>{code}</Text>
          </View>
          {date ? (
            <View style={styles.dateContainer}>
              <Ionicons name="calendar-outline" size={14} color={colors.textMuted} />
              <Text style={styles.date}>{date}</Text>
            </View>
          ) : null}
        </View>

        {/* Cliente y Zona */}
        <View style={styles.clientRow}>
          <Ionicons name="person-outline" size={16} color={colors.textMuted} />
          <Text style={styles.client}>{cliente}</Text>
        </View>
        <View style={styles.zoneRow}>
          <Ionicons name="location-outline" size={16} color={colors.textMuted} />
          <Text style={styles.zone}>{zona}</Text>
        </View>

        {/* Separador */}
        <View style={styles.divider} />

        {/* Info Grid: Método de Pago y Estado */}
        <View style={styles.infoGrid}>
          <View style={styles.infoColumn}>
            <Text style={styles.label}>Método de pago</Text>
            <Text style={styles.method}>{metodo}</Text>
          </View>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.total}>{formattedTotal}</Text>
          </View>
        </View>

        {/* Badges de Estado */}
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: statusConfig.bg }]}>
            <Ionicons name={statusConfig.icon} size={14} color={statusConfig.color} />
            <Text style={[styles.badgeText, { color: statusConfig.color }]}>
              {estadoPedido}
            </Text>
          </View>
          <Text style={styles.paymentStatus}>{estadoPago}</Text>
        </View>

        {/* Footer: Vendedor y Botón */}
        <View style={styles.footer}>
          <View style={styles.vendorInfo}>
            <View style={[
              styles.vendorAvatar,
              { backgroundColor: isUnassigned ? colors.danger + '20' : colors.primary + '20' }
            ]}>
              <Ionicons
                name={isUnassigned ? "person-add-outline" : "person"}
                size={18}
                color={isUnassigned ? colors.danger : colors.primary}
              />
            </View>
            <View>
              <Text style={styles.vendorLabel}>Vendedor</Text>
              <Text style={[
                styles.vendorName,
                isUnassigned && { color: colors.danger }
              ]}>
                {vendorName || 'Sin asignar'}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              onAssignVendorPress();
            }}
            style={[
              styles.assignButton,
              isUnassigned && styles.assignButtonUrgent
            ]}
          >
            <Ionicons
              name={isUnassigned ? "add-circle-outline" : "sync-outline"}
              size={16}
              color={isUnassigned ? colors.white : colors.primary}
            />
            <Text style={[
              styles.assignText,
              isUnassigned && styles.assignTextUrgent
            ]}>
              {isUnassigned ? 'Asignar' : 'Cambiar'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 16,
  },
  card: {
    borderRadius: 20,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: colors.white,
  },
  gradient: {
    borderRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  code: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.darkText,
    letterSpacing: -0.3,
    marginLeft: 6,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '600',
    marginLeft: 4,
  },
  clientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  client: {
    fontSize: 15,
    color: colors.darkText,
    fontWeight: '600',
    flex: 1,
    marginLeft: 8,
  },
  zoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  zone: {
    fontSize: 14,
    color: colors.textMuted,
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderSoft,
    marginVertical: 12,
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  infoColumn: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    color: colors.textMuted,
    marginBottom: 4,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  method: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.darkText,
  },
  totalContainer: {
    alignItems: 'flex-end',
  },
  totalLabel: {
    fontSize: 11,
    color: colors.textMuted,
    marginBottom: 4,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  total: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: -0.5,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 12,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.2,
    marginLeft: 6,
  },
  paymentStatus: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.borderSoft,
  },
  vendorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  vendorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  vendorLabel: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  vendorName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.darkText,
  },
  assignButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: colors.primary + '15',
    borderWidth: 1,
    borderColor: colors.primary + '40',
  },
  assignButtonUrgent: {
    backgroundColor: colors.danger,
    borderColor: colors.danger,
  },
  assignText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 13,
    marginLeft: 6,
  },
  assignTextUrgent: {
    color: colors.white,
  },
});

export default SupervisorOrderCard;
