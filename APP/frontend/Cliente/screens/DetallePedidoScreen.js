import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../../context/AppContext';
import colors from '../../theme/colors';
import sharedStyles from '../../theme/styles';
import SectionCard from '../components/SectionCard';
import PrimaryButton from '../components/PrimaryButton';

const DetallePedidoScreen = ({ route, navigation }) => {
  const { orderId } = route.params || {};
  const { orders, credits, products = [] } = useAppContext();
  const order = orders.find((item) => item.id === orderId);

  if (!order) {
    return (
      <View style={sharedStyles.centeredScreen}>
        <Text>No encontramos el pedido.</Text>
      </View>
    );
  }

  const credit = credits.find((item) => item.orderCode === order.code);

  // Tomamos el primer producto para usar su imagen como “imagen del pedido”
  const firstItem = order.items?.[0];
  const firstProduct = products.find((p) => p.id === firstItem?.productId);
  const firstImage = firstProduct?.image;

  // Cálculos de totales
  const subtotal = (order.items || []).reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0,
  );
  const shipping =
    Number(order.shippingCost ?? order.envio ?? order.shipping ?? 0) || 0;
  const grandTotal =
    typeof order.total === 'number' ? order.total : subtotal + shipping;

  const statusText = order.status || '';
  const statusLower = statusText.toLowerCase();

  const steps = [
    { key: 'confirmado', label: 'Pedido confirmado', description: 'Hemos recibido tu pedido.' },
    { key: 'preparacion', label: 'En preparación', description: 'Preparando tu pedido…' },
    { key: 'ruta', label: 'En camino', description: 'El pedido está en ruta.' },
    { key: 'entregado', label: 'Entregado', description: 'Pedido entregado.' },
  ];

  let currentIndex = 0;
  if (statusLower.includes('prepar')) currentIndex = 1;
  else if (statusLower.includes('ruta') || statusLower.includes('camino')) currentIndex = 2;
  else if (statusLower.includes('entreg')) currentIndex = 3;

  const openSupportAlert = () => {
    Alert.alert(
      'Subir comprobante',
      'Aqui se deberia abrir un selector de archivos o camara.',
      [{ text: 'Entendido' }],
    );
    // BACKEND: aqui se deberia abrir un selector de archivos / imagenes para subir el comprobante al servidor.
  };

  const openCreditDetail = () => {
    if (!credit) return;
    navigation.navigate('DetalleCredito', { creditId: credit.id });
    // BACKEND: lo ideal es que la orden tenga referencia directa al credito relacionado.
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 16, paddingBottom: 140 }}
    >
      {/* Resumen del pedido */}
      <SectionCard title="Resumen del pedido">
        <View style={styles.summaryHeaderRow}>
          <View style={styles.summaryTitleBlock}>
            <Text style={styles.code}>{order.code}</Text>
            <Text style={styles.date}>{order.date}</Text>
          </View>

          <View style={styles.statusChip}>
            <Ionicons
              name="time-outline"
              size={14}
              color="#D48806"
              style={{ marginRight: 4 }}
            />
            <Text style={styles.statusChipText}>{statusText}</Text>
          </View>
        </View>

        {/* Imagen del pedido (primer producto) */}
        {firstImage && (
          <View style={styles.thumbnailWrapper}>
            <Image
              source={firstImage}
              style={styles.thumbnail}
              resizeMode="cover"
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.thumbnailTitle} numberOfLines={2}>
                {firstItem?.name}
              </Text>
              <Text style={styles.thumbnailSubtitle}>
                y {Math.max((order.items?.length || 1) - 1, 0)} productos más
              </Text>
            </View>
          </View>
        )}

        <View style={styles.sectionDivider} />

        <View style={styles.rowBetween}>
          <View style={styles.iconRow}>
            <Ionicons
              name="card-outline"
              size={16}
              color={colors.textLight}
              style={{ marginRight: 6 }}
            />
            <Text style={styles.labelMuted}>Método de pago</Text>
          </View>
          <Text style={styles.paymentValue}>{order.paymentMethod}</Text>
        </View>

        <View style={styles.totalHighlight}>
          <View>
            <Text style={styles.totalLabel}>Total del pedido</Text>
            <Text style={styles.totalValue}>${grandTotal.toFixed(2)}</Text>
          </View>
        </View>
      </SectionCard>

      {/* Estado del pedido */}
      <SectionCard title="Estado del pedido">
        {steps.map((step, index) => {
          const isDone = index < currentIndex;
          const isActive = index === currentIndex;

          const dotColor = isActive
            ? colors.success
            : isDone
            ? colors.primary
            : colors.borderSoft;

          const lineColor = isDone || isActive ? colors.primary : colors.borderSoft;

          return (
            <View key={step.key} style={styles.stepRow}>
              <View style={styles.stepIndicator}>
                <View
                  style={[
                    styles.stepDot,
                    { borderColor: dotColor, backgroundColor: isActive ? dotColor : '#FFF' },
                  ]}
                >
                  {isActive && (
                    <Ionicons name="checkmark" size={12} color="#FFF" />
                  )}
                </View>
                {index < steps.length - 1 && (
                  <View style={[styles.stepLine, { backgroundColor: lineColor }]} />
                )}
              </View>
              <View style={styles.stepContent}>
                <Text
                  style={[
                    styles.stepTitle,
                    (isActive || isDone) && { color: colors.textDark },
                  ]}
                >
                  {step.label}
                </Text>
                <Text style={styles.stepDescription}>{step.description}</Text>
              </View>
            </View>
          );
        })}
      </SectionCard>

      {/* Datos de entrega */}
      <SectionCard title="Datos de entrega">
        {order.deliveryInfo ? (
          <View>
            <Text style={styles.deliveryLabel}>
              Calles:{' '}
              <Text style={styles.deliveryValue}>
                {order.deliveryInfo.address || 'No especificado'}
              </Text>
            </Text>
            <Text style={styles.deliveryLabel}>
              Teléfono:{' '}
              <Text style={styles.deliveryValue}>
                {order.deliveryInfo.phone || 'No especificado'}
              </Text>
            </Text>
            <Text style={styles.deliveryLabel}>
              Observación:{' '}
              <Text style={styles.deliveryValue}>
                {order.deliveryInfo.notes || 'Sin observación'}
              </Text>
            </Text>
          </View>
        ) : (
          <View style={styles.deliveryEmptyBox}>
            <Ionicons
              name="information-circle-outline"
              size={18}
              color={colors.textLight}
              style={{ marginRight: 6 }}
            />
            <Text style={styles.deliveryEmptyText}>
              Datos de entrega no disponibles (mock).
            </Text>
          </View>
        )}
      </SectionCard>

      {/* Productos ordenados */}
      <SectionCard title="Productos ordenados">
        {(order.items || []).map((item) => {
          const product = products.find((p) => p.id === item.productId);
          const lineTotal = (item.price || 0) * (item.quantity || 0);

          return (
            <View key={item.productId} style={styles.itemRow}>
              <View style={styles.itemIconWrapper}>
                <Ionicons name="cube-outline" size={20} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPresentation}>{item.presentation}</Text>
                <Text style={styles.itemQuantity}>x{item.quantity}</Text>
              </View>
              <View style={styles.itemTotals}>
                <Text style={styles.itemPrice}>${lineTotal.toFixed(2)}</Text>
              </View>
            </View>
          );
        })}

        <View style={styles.itemsDivider} />

        <View style={styles.totalsRow}>
          <Text style={styles.totalsLabel}>Subtotal</Text>
          <Text style={styles.totalsValue}>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.totalsRow}>
          <Text style={styles.totalsLabel}>Envío</Text>
          <Text style={styles.totalsValue}>${shipping.toFixed(2)}</Text>
        </View>
        <View style={[styles.totalsRow, { marginTop: 4 }]}>
          <Text style={styles.totalsLabelStrong}>Total</Text>
          <Text style={styles.totalsValueStrong}>${grandTotal.toFixed(2)}</Text>
        </View>
      </SectionCard>

      {/* Acciones según método de pago */}
      {order.paymentMethod === 'TRANSFERENCIA' &&
        order.paymentStatus !== 'PAGADO' && (
          <View style={styles.pendingWrapper}>
            <Text style={styles.pendingText}>
              Pago pendiente de validación
            </Text>
            <PrimaryButton
              title="Subir comprobante"
              onPress={openSupportAlert}
            />
          </View>
        )}

      {order.paymentMethod === 'CREDITO' && credit && (
        <TouchableOpacity style={styles.linkButton} onPress={openCreditDetail}>
          <Text style={styles.linkButtonText}>Ver plan de cuotas</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  summaryHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryTitleBlock: {
    flexShrink: 1,
  },
  code: {
    fontWeight: '700',
    fontSize: 16,
    color: colors.textDark,
  },
  date: {
    color: colors.textLight,
    fontSize: 13,
    marginTop: 2,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#FFF7E6',
  },
  statusChipText: {
    fontSize: 12,
    color: '#D48806',
    fontWeight: '600',
  },
  thumbnailWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  thumbnail: {
    width: 52,
    height: 52,
    borderRadius: 16,
    marginRight: 12,
  },
  thumbnailTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
  },
  thumbnailSubtitle: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: colors.borderSoft,
    marginVertical: 12,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelMuted: {
    fontSize: 13,
    color: colors.textLight,
  },
  paymentValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
  },
  totalHighlight: {
    backgroundColor: '#FFF5F0',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginTop: 14,
  },
  totalLabel: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 2,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
  },

  // Timeline
  stepRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  stepIndicator: {
    width: 28,
    alignItems: 'center',
  },
  stepDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  stepLine: {
    flex: 1,
    width: 2,
    marginTop: 2,
  },
  stepContent: {
    flex: 1,
    paddingLeft: 8,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textLight,
  },
  stepDescription: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },

  // Delivery
  deliveryLabel: {
    fontSize: 13,
    color: colors.textLight,
    marginBottom: 4,
  },
  deliveryValue: {
    color: colors.textDark,
    fontWeight: '600',
  },
  deliveryEmptyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBE6',
    borderRadius: 12,
    padding: 10,
  },
  deliveryEmptyText: {
    fontSize: 13,
    color: colors.textDark,
  },

  // Items
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSoft,
  },
  itemIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#FFF4F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  itemName: {
    fontWeight: '600',
    color: colors.textDark,
  },
  itemPresentation: {
    color: colors.textLight,
    fontSize: 12,
  },
  itemQuantity: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  itemTotals: {
    alignItems: 'flex-end',
  },
  itemPrice: {
    color: colors.textDark,
    fontWeight: '700',
  },
  itemsDivider: {
    height: 1,
    backgroundColor: colors.borderSoft,
    marginTop: 8,
    marginBottom: 10,
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  totalsLabel: {
    fontSize: 13,
    color: colors.textMuted,
  },
  totalsValue: {
    fontSize: 13,
    color: colors.textDark,
  },
  totalsLabelStrong: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textDark,
  },
  totalsValueStrong: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary,
  },

  // Actions
  pendingWrapper: {
    marginTop: 16,
    marginBottom: 8,
  },
  pendingText: {
    textAlign: 'center',
    color: colors.textLight,
    marginBottom: 12,
  },
  linkButton: {
    alignSelf: 'center',
    padding: 12,
  },
  linkButtonText: {
    color: colors.primary,
    fontWeight: '600',
  },
});

export default DetallePedidoScreen;
