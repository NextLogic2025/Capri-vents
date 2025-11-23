import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import sharedStyles from '../../theme/styles';
import ScreenHeader from '../components/ScreenHeader';
import SectionCard from '../components/SectionCard';
import PrimaryButton from '../components/PrimaryButton';
import { useAppContext } from '../../context/AppContext';

const DetallePedidoScreen = ({ route, navigation }) => {
  const { orderId } = route.params;
  const { orders } = useAppContext();
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <View style={styles.centered}>
        <Text>Pedido no encontrado</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: colors.primary, marginTop: 10 }}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const steps = [
    { key: 'CREADO', label: 'Creado', icon: 'document-text-outline' },
    { key: 'EN_REVISION_PAGO', label: 'Revisión', icon: 'wallet-outline' },
    { key: 'PAGADO', label: 'Pagado', icon: 'checkmark-circle-outline' },
    { key: 'EN_PREPARACION', label: 'Preparando', icon: 'cube-outline' },
    { key: 'EN_CAMINO', label: 'En Camino', icon: 'bicycle-outline' },
    { key: 'ENTREGADO', label: 'Entregado', icon: 'home-outline' },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === order.status) >= 0
    ? steps.findIndex((s) => s.key === order.status)
    : 0;

  return (
    <View style={styles.screen}>
      <ScreenHeader title={`Pedido #${order.code}`} subtitle={order.date} showBack />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Timeline de Estado */}
        <View style={styles.timelineCard}>
          <View style={styles.timelineHeader}>
            <Text style={styles.timelineTitle}>Estado del Pedido</Text>
            <View style={[styles.statusBadge, { backgroundColor: colors.primary + '20' }]}>
              <Text style={[styles.statusText, { color: colors.primary }]}>{order.status.replace(/_/g, ' ')}</Text>
            </View>
          </View>
          <View style={styles.timelineSteps}>
            {steps.map((step, index) => {
              const isActive = index <= currentStepIndex;
              const isLast = index === steps.length - 1;
              return (
                <View key={step.key} style={styles.stepContainer}>
                  <View style={[styles.stepCircle, isActive && styles.stepCircleActive]}>
                    <Ionicons name={step.icon} size={14} color={isActive ? colors.white : colors.textMuted} />
                  </View>
                  {!isLast && <View style={[styles.stepLine, isActive && styles.stepLineActive]} />}
                </View>
              );
            })}
          </View>
          <View style={styles.stepLabels}>
            <Text style={styles.currentStepLabel}>{steps[currentStepIndex]?.label}</Text>
          </View>
        </View>

        {/* Detalles de Entrega */}
        <SectionCard title="Información de Entrega">
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={20} color={colors.primary} style={styles.infoIcon} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Dirección</Text>
              <Text style={styles.infoValue}>{order.deliveryInfo?.address}</Text>
            </View>
          </View>
          {order.deliveryInfo?.notes ? (
            <View style={styles.infoRow}>
              <Ionicons name="document-text-outline" size={20} color={colors.textMuted} style={styles.infoIcon} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Notas</Text>
                <Text style={styles.infoValue}>{order.deliveryInfo.notes}</Text>
              </View>
            </View>
          ) : null}
        </SectionCard>

        {/* Productos */}
        <SectionCard title="Productos">
          {order.items.map((item, index) => (
            <View key={index} style={styles.productItem}>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productVariant}>{item.presentation}</Text>
              </View>
              <View style={styles.productMeta}>
                <Text style={styles.productQty}>x{item.quantity}</Text>
                <Text style={styles.productPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
              </View>
            </View>
          ))}
          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Pagado</Text>
            <Text style={styles.totalValue}>${order.total.toFixed(2)}</Text>
          </View>
        </SectionCard>

        {/* Acciones */}
        {order.paymentMethod === 'CREDITO' && (
          <PrimaryButton
            title="Ver detalle del Crédito"
            onPress={() => navigation.navigate('DetalleCredito', { creditId: `CRED-${order.id}` })} // Mock ID logic
            style={styles.actionButton}
          />
        )}

        {order.paymentMethod === 'TRANSFERENCIA' && order.paymentStatus === 'PENDIENTE' && (
          <PrimaryButton
            title="Subir Comprobante"
            onPress={() => alert('Funcionalidad de subir comprobante aquí')}
            style={styles.actionButton}
          />
        )}

        <PrimaryButton
          title="Reportar Incidencia"
          onPress={() => navigation.navigate('ClienteCrearTicket', { order: order })}
          style={[styles.actionButton, { backgroundColor: colors.warning, borderColor: colors.warning }]}
          textStyle={{ color: colors.white }}
        />

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  timelineCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    ...sharedStyles.shadow,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  timelineSteps: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  stepCircleActive: {
    backgroundColor: colors.primary,
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: colors.borderSoft,
    marginHorizontal: -2,
  },
  stepLineActive: {
    backgroundColor: colors.primary,
  },
  stepLabels: {
    marginTop: 12,
    alignItems: 'center',
  },
  currentStepLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: colors.textDark,
    lineHeight: 20,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
  },
  productVariant: {
    fontSize: 12,
    color: colors.textMuted,
  },
  productMeta: {
    alignItems: 'flex-end',
  },
  productQty: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textLight,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderSoft,
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
  },
  actionButton: {
    marginTop: 8,
  },
});

export default DetallePedidoScreen;
