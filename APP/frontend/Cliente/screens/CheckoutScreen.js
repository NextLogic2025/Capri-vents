import React, { useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Modal,
  Pressable,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import colors from '../../theme/colors';
import sharedStyles from '../../theme/styles';
import SectionCard from '../components/SectionCard';
import PaymentMethodCard from '../components/PaymentMethodCard';
import PrimaryButton from '../components/PrimaryButton';
import { useAppContext } from '../../context/AppContext';

const paymentOptions = [
  { key: 'TARJETA', label: 'Tarjeta Credito/Debito', description: 'Pago inmediato y seguro', icon: 'card-outline' },
  { key: 'TRANSFERENCIA', label: 'Transferencia bancaria', description: 'Validacion en 24-48h', icon: 'swap-horizontal' },
  { key: 'EFECTIVO', label: 'Efectivo contra entrega', description: 'Paga al recibir tu pedido', icon: 'cash-outline' },
  { key: 'CREDITO', label: 'Credito comercial', description: 'Usa tu cupo disponible', icon: 'calendar-outline' },
];

const CheckoutScreen = ({ navigation }) => {
  const {
    user,
    cartTotals,
    createOrderFromCart,
    addresses,
    defaultAddress,
    paymentCards,
    defaultCard,
  } = useAppContext();
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState(user.phone || '');
  const [notes, setNotes] = useState('');
  const [method, setMethod] = useState('TARJETA');
  const [selectedAddressId, setSelectedAddressId] = useState(defaultAddress?.id ?? '');
  const [selectedCardId, setSelectedCardId] = useState(defaultCard?.id ?? null);
  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [cardSelectionVisible, setCardSelectionVisible] = useState(false);

  const creditAvailable = cartTotals.total <= (user.saldoCreditoDisponible || 0);
  const formatAddressString = (addr) =>
    addr ? `${addr.street} ${addr.number}, ${addr.city}, ${addr.province}` : '';
  const selectedAddress =
    addresses.find((addr) => addr.id === selectedAddressId) || defaultAddress || null;
  const selectedCard =
    paymentCards.find((card) => card.id === selectedCardId) || defaultCard || null;

  useEffect(() => {
    if (defaultAddress) {
      setSelectedAddressId(defaultAddress.id);
      setAddress(formatAddressString(defaultAddress));
    }
  }, [defaultAddress]);

  useEffect(() => {
    if (selectedAddress) {
      setAddress(formatAddressString(selectedAddress));
    }
  }, [selectedAddress]);

  useEffect(() => {
    if (defaultCard?.id) {
      setSelectedCardId(defaultCard.id);
    }
  }, [defaultCard?.id]);

  const handleCreateOrder = (paymentMethod) => {
    const order = createOrderFromCart(paymentMethod, {
      address: address || formatAddressString(selectedAddress),
      phone,
      notes,
      deliveryAddressId: selectedAddress?.id,
      paymentCardId: selectedCard?.id,
    });
    return order;
  };

  const goToConfirmation = (order, extraParams = {}) => {
    if (!order) return;
    navigation.navigate('PedidoConfirmacion', { code: order.code, total: order.total, ...extraParams });
  };

  const handleConfirm = () => {
    if (!selectedAddress) {
      Alert.alert('Dirección faltante', 'Selecciona una dirección antes de confirmar tu pedido.');
      return;
    }
    if (!address.trim()) {
      Alert.alert('Dirección inválida', 'Completa la dirección para la entrega.');
      return;
    }

    if (method === 'TARJETA') {
      if (!selectedCard) {
        if (paymentCards.length) {
          setCardSelectionVisible(true);
        } else {
          Alert.alert(
            'Tarjeta faltante',
            'Agrega una tarjeta en Métodos de pago antes de confirmar.',
            [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Ir a métodos', onPress: () => navigation.navigate('MetodosPago') },
            ]
          );
        }
        return;
      }
      const order = handleCreateOrder('TARJETA');
      goToConfirmation(order, {
        title: 'Pago exitoso',
        description: 'Tu pago con tarjeta se registró correctamente.',
      });
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
          <View style={styles.selectionRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.fieldLabel}>Dirección elegida</Text>
              <Text style={styles.addressValue}>
                {selectedAddress
                  ? `${selectedAddress.label} · ${formatAddressString(selectedAddress)}`
                  : 'Selecciona una dirección para tu entrega.'}
              </Text>
            </View>
            <TouchableOpacity onPress={() => setAddressModalVisible(true)}>
              <Text style={styles.linkText}>
                {selectedAddress ? 'Cambiar' : 'Seleccionar'}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.inlineLink}
            onPress={() => navigation.navigate('Direcciones')}
          >
            <Text style={styles.inlineLinkText}>Agregar o editar direcciones</Text>
          </TouchableOpacity>
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
          {method === 'TARJETA' && (
            <>
              <View style={styles.selectionRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.fieldLabel}>Tarjeta seleccionada</Text>
                  <Text style={styles.addressValue}>
                    {selectedCard
                      ? `${selectedCard.type} •••• ${selectedCard.number.slice(-4)}`
                      : 'Selecciona una tarjeta'}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => setCardSelectionVisible(true)}>
                  <Text style={styles.linkText}>
                    {selectedCard ? 'Cambiar' : 'Seleccionar'}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.inlineLink}
                onPress={() => navigation.navigate('MetodosPago')}
              >
                <Text style={styles.inlineLinkText}>Agregar o administrar tarjetas</Text>
              </TouchableOpacity>
            </>
          )}
        </SectionCard>

        <PrimaryButton title="Confirmar pedido" onPress={handleConfirm} />
      </ScrollView>

      <Modal visible={addressModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Seleccionar dirección</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {addresses.map((addr) => (
                <TouchableOpacity
                  key={addr.id}
                  style={[
                    styles.modalItem,
                    selectedAddress?.id === addr.id && styles.modalItemSelected,
                  ]}
                  onPress={() => {
                    setSelectedAddressId(addr.id);
                    setAddress(formatAddressString(addr));
                    setAddressModalVisible(false);
                  }}
                >
                  <View style={styles.modalItemHeader}>
                    <Text style={styles.modalItemLabel}>{addr.label}</Text>
                    {addr.isDefault && <Text style={styles.currentBadge}>Predeterminada</Text>}
                  </View>
                  <Text style={styles.modalItemText}>
                    {addr.street} {addr.number}
                  </Text>
                  <Text style={styles.modalItemText}>
                    {addr.city}, {addr.province} · CP {addr.zip}
                  </Text>
                </TouchableOpacity>
              ))}
              <PrimaryButton
                title="Agregar dirección"
                onPress={() => {
                  setAddressModalVisible(false);
                  navigation.navigate('Direcciones');
                }}
                style={{ marginTop: 12 }}
              />
              <Pressable onPress={() => setAddressModalVisible(false)} style={styles.modalClose}>
                <Text style={{ color: colors.primary }}>Cerrar</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal visible={cardSelectionVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecciona una tarjeta</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {paymentCards.length ? (
                paymentCards.map((card) => (
                  <TouchableOpacity
                    key={card.id}
                    style={[
                      styles.cardItem,
                      selectedCard?.id === card.id && styles.modalItemSelected,
                    ]}
                    onPress={() => {
                      setSelectedCardId(card.id);
                      setCardSelectionVisible(false);
                    }}
                  >
                    <View style={styles.modalItemHeader}>
                      <Text style={styles.modalItemLabel}>{card.type}</Text>
                      <Text style={styles.modalItemText}>Válido hasta {card.expiry}</Text>
                    </View>
                    <Text style={styles.modalItemText}>
                      {card.number} · {card.holder}
                    </Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.emptyTextModal}>
                  Aún no tienes tarjetas registradas. Agrega una en Métodos de pago.
                </Text>
              )}
              <PrimaryButton
                title="Ir a Métodos de pago"
                onPress={() => {
                  setCardSelectionVisible(false);
                  navigation.navigate('MetodosPago');
                }}
                style={{ marginTop: 12 }}
              />
              <Pressable onPress={() => setCardSelectionVisible(false)} style={styles.modalClose}>
                <Text style={{ color: colors.primary }}>Cerrar</Text>
              </Pressable>
            </ScrollView>
          </View>
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
    padding: 16,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 18,
    maxHeight: '85%',
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
  selectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  fieldLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 2,
  },
  addressValue: {
    fontSize: 14,
    color: colors.textDark,
  },
  linkText: {
    color: colors.primary,
    fontWeight: '600',
  },
  inlineLink: {
    marginTop: 4,
    marginBottom: 12,
  },
  inlineLinkText: {
    color: colors.primary,
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  modalItem: {
    borderRadius: 16,
    padding: 14,
    backgroundColor: colors.surface,
    marginBottom: 10,
  },
  modalItemSelected: {
    borderWidth: 1,
    borderColor: colors.primary,
  },
  modalItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  modalItemLabel: {
    fontWeight: '700',
    color: colors.textDark,
  },
  modalItemText: {
    fontSize: 13,
    color: colors.textMuted,
  },
  currentBadge: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.primary,
  },
  cardItem: {
    borderRadius: 16,
    padding: 14,
    backgroundColor: colors.surface,
    marginBottom: 10,
  },
  emptyTextModal: {
    color: colors.textMuted,
    fontSize: 13,
    textAlign: 'center',
    marginVertical: 12,
  },
});

export default CheckoutScreen;
