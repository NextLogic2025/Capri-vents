import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useAppContext } from '../../context/AppContext';
import colors from '../../theme/colors';
import sharedStyles from '../../theme/styles';
import SectionCard from '../components/SectionCard';
import PrimaryButton from '../components/PrimaryButton';

const DetallePedidoScreen = ({ route, navigation }) => {
  const { orderId } = route.params || {};
  const { orders, credits } = useAppContext();
  const order = orders.find((item) => item.id === orderId);

  if (!order) {
    return (
      <View style={sharedStyles.centeredScreen}>
        <Text>No encontramos el pedido.</Text>
      </View>
    );
  }

  const credit = credits.find((item) => item.orderCode === order.code);

  const openSupportAlert = () => {
    Alert.alert(
      'Subir comprobante',
      'Aqui se deberia abrir un selector de archivos o camara.',
      [{ text: 'Entendido' }]
    );
    // BACKEND: aqui se deberia abrir un selector de archivos / imagenes para subir el comprobante al servidor.
  };

  const openCreditDetail = () => {
    if (!credit) return;
    navigation.navigate('DetalleCredito', { creditId: credit.id });
    // BACKEND: lo ideal es que la orden tenga referencia directa al credito relacionado.
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 16, paddingBottom: 140 }}>
      <SectionCard title="Resumen del pedido">
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.code}>{order.code}</Text>
            <Text style={styles.date}>{order.date}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{order.status}</Text>
          </View>
        </View>
        <Text>Metodo de pago: {order.paymentMethod}</Text>
        <Text style={styles.total}>Total: ${order.total.toFixed(2)}</Text>
      </SectionCard>

      <SectionCard title="Datos de entrega">
        {order.deliveryInfo ? (
          <View>
            <Text>Calles: {order.deliveryInfo.address || 'No especificado'}</Text>
            <Text>Telefono: {order.deliveryInfo.phone || 'No especificado'}</Text>
            <Text>Observacion: {order.deliveryInfo.notes || 'Sin observacion'}</Text>
          </View>
        ) : (
          <Text>Datos de entrega no disponibles (mock).</Text>
        )}
      </SectionCard>

      <SectionCard title="Productos ordenados">
        {order.items.map((item) => (
          <View key={item.productId} style={styles.itemRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPresentation}>{item.presentation}</Text>
            </View>
            <View style={styles.itemTotals}>
              <Text style={styles.itemQty}>x{item.quantity}</Text>
              <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          </View>
        ))}
      </SectionCard>

      {order.paymentMethod === 'TRANSFERENCIA' && order.paymentStatus !== 'PAGADO' && (
        <View style={{ marginBottom: 16 }}>
          <Text style={styles.pendingText}>Pago pendiente de validacion</Text>
          <PrimaryButton title="Subir comprobante" onPress={openSupportAlert} />
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
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  code: {
    fontWeight: '700',
    fontSize: 16,
    color: colors.textDark,
  },
  date: {
    color: colors.textLight,
  },
  badge: {
    backgroundColor: '#F4ECFF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    color: '#6C3CE4',
  },
  total: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSoft,
  },
  itemName: {
    fontWeight: '600',
    color: colors.textDark,
  },
  itemPresentation: {
    color: colors.textLight,
    fontSize: 13,
  },
  itemTotals: {
    alignItems: 'flex-end',
  },
  itemQty: {
    color: colors.textLight,
  },
  itemPrice: {
    color: colors.textDark,
    fontWeight: '600',
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
