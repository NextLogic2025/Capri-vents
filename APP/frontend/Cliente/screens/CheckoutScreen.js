import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, ScrollView, Modal, Pressable, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../theme/colors';
import sharedStyles from '../../theme/styles';
import SectionCard from '../components/SectionCard';
import PaymentMethodCard from '../components/PaymentMethodCard';
import PrimaryButton from '../components/PrimaryButton';
import ScreenHeader from '../components/ScreenHeader';
import { useAppContext } from '../../context/AppContext';

const paymentOptions = [
  { key: 'TARJETA', label: 'Tarjeta Credito/Debito', description: 'Pago inmediato y seguro', icon: 'card-outline' },
  { key: 'TRANSFERENCIA', label: 'Transferencia bancaria', description: 'Validacion en 24-48h', icon: 'swap-horizontal' },
  { key: 'EFECTIVO', label: 'Efectivo contra entrega', description: 'Paga al recibir tu pedido', icon: 'cash-outline' },
  { key: 'CREDITO', label: 'Credito comercial', description: 'Usa tu cupo disponible', icon: 'calendar-outline' },
];

const CheckoutScreen = ({ navigation }) => {
  const { user, cartTotals, createOrderFromCart } = useAppContext();
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState(user.phone || '');
  const [notes, setNotes] = useState('');
  const [method, setMethod] = useState('TARJETA');
  const [showCardModal, setShowCardModal] = useState(false);
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvv: '', name: '' });

  const creditAvailable = cartTotals.total <= (user.saldoCreditoDisponible || 0);

  const handleCreateOrder = (paymentMethod) => {
    const order = createOrderFromCart(paymentMethod, { address, phone, notes });
    return order;
  };

  const goToConfirmation = (order, extraParams = {}) => {
    if (!order) return;
    navigation.navigate('PedidoConfirmacion', { code: order.code, total: order.total, ...extraParams });
  };

  const handleConfirm = () => {
    if (method === 'TARJETA') {
      setShowCardModal(true);
      return;
    }
    if (method === 'TRANSFERENCIA') {
      const order = handleCreateOrder('TRANSFERENCIA');
      goToConfirmation(order, {
        title: 'Pedido en revision',
        description: 'Hemos registrado tu transferencia, validaremos el pago en 24-48h.',
      });
      return;
    }
    if (method === 'EFECTIVO') {
      const order = handleCreateOrder('EFECTIVO');
      goToConfirmation(order, {
        title: 'Pedido registrado',
        description: 'Paga en efectivo cuando recibas tu pedido.',
      });
      return;
    }
    if (method === 'CREDITO') {
      if (!creditAvailable) {
        Alert.alert('Sin credito suficiente', 'Tu credito disponible no cubre este pedido.');
        return;
      }
      navigation.navigate('SeleccionPlanCredito', { total: cartTotals.total });
    }
  };

  const handlePayWithCard = () => {
    if (!cardData.number || !cardData.expiry || !cardData.cvv || !cardData.name) {
      Alert.alert('Datos incompletos', 'Completa todos los campos de la tarjeta.');
      return;
    }
    setShowCardModal(false);
    const order = handleCreateOrder('TARJETA');
    goToConfirmation(order, {
      title: 'Pago exitoso',
      description: 'Tu pago con tarjeta se registro correctamente.',
    });
    setCardData({ number: '', expiry: '', cvv: '', name: '' });
  };

  const renderPaymentMethod = (option) => {
    const disabled = option.key === 'CREDITO' && !creditAvailable;
    const description =
      option.key === 'CREDITO' && !creditAvailable
        ? 'Tu credito disponible no cubre este pedido'
        : option.description;
    return (
      <PaymentMethodCard
        key={option.key}
        label={option.label}
        description={description}
        icon={option.icon}
        selected={method === option.key}
        disabled={disabled}
        onPress={() => !disabled && setMethod(option.key)}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <SectionCard title="Datos de Entrega">
          <TextInput
            style={[sharedStyles.input, styles.inputSpacing]}
            placeholder="Direccion"
            value={address}
            onChangeText={setAddress}
          />
          <TextInput
            style={[sharedStyles.input, styles.inputSpacing]}
            placeholder="Numero de telefono"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <TextInput
            style={[sharedStyles.input, styles.textarea]}
            placeholder="Observaciones"
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={4}
          />
        </SectionCard>

        <SectionCard title="Resumen">
          <View style={styles.rowBetween}>
            <Text>Subtotal</Text>
            <Text>${cartTotals.subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.rowBetween}>
            <Text>Impuestos</Text>
            <Text>${cartTotals.taxes.toFixed(2)}</Text>
          </View>
          <View style={styles.rowBetween}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${cartTotals.total.toFixed(2)}</Text>
          </View>
          {user.tieneCredito && (
            <Text style={styles.creditText}>Credito disponible: ${user.saldoCreditoDisponible?.toFixed(2)}</Text>
          )}
        </SectionCard>

        <SectionCard title="Metodo de Pago">
          {paymentOptions.map(renderPaymentMethod)}
        </SectionCard>

        <PrimaryButton title="Confirmar pedido" onPress={handleConfirm} />
      </ScrollView>

      <Modal visible={showCardModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <SafeAreaView style={styles.modalSheet}>
            <Text style={styles.modalTitle}>Datos de la tarjeta</Text>
            <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
              <TextInput
                style={sharedStyles.input}
                placeholder="Numero de tarjeta"
                keyboardType="number-pad"
                value={cardData.number}
                onChangeText={(text) => setCardData((prev) => ({ ...prev, number: text }))}
              />
              <TextInput
                style={sharedStyles.input}
                placeholder="Fecha vencimiento (MM/AA)"
                value={cardData.expiry}
                onChangeText={(text) => setCardData((prev) => ({ ...prev, expiry: text }))}
              />
              <TextInput
                style={sharedStyles.input}
                placeholder="CVV"
                keyboardType="number-pad"
                value={cardData.cvv}
                onChangeText={(text) => setCardData((prev) => ({ ...prev, cvv: text }))}
              />
              <TextInput
                style={sharedStyles.input}
                placeholder="Nombre del titular"
                value={cardData.name}
                onChangeText={(text) => setCardData((prev) => ({ ...prev, name: text }))}
              />
              <PrimaryButton title="Pagar" onPress={handlePayWithCard} />
              <Pressable onPress={() => setShowCardModal(false)} style={styles.modalClose}>
                <Text style={{ color: colors.primary }}>Cancelar</Text>
              </Pressable>
            </ScrollView>
          </SafeAreaView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 160,
  },
  inputSpacing: {
    marginBottom: 12,
  },
  textarea: {
    height: 120,
    textAlignVertical: 'top',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  totalLabel: {
    fontWeight: '700',
    color: colors.textDark,
  },
  totalValue: {
    fontWeight: '800',
    color: colors.primary,
  },
  creditText: {
    marginTop: 10,
    color: colors.textLight,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: colors.textDark,
  },
  modalClose: {
    marginTop: 12,
    alignItems: 'center',
  },
});

export default CheckoutScreen;
