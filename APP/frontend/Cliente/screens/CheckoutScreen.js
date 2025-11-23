import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, TextInput, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../../context/AppContext';
import colors from '../../theme/colors';
import sharedStyles from '../../theme/styles';
import SectionCard from '../components/SectionCard';
import PrimaryButton from '../components/PrimaryButton';
import ScreenHeader from '../components/ScreenHeader';

const PAYMENT_METHODS = [
  { id: 'EFECTIVO', label: 'Efectivo', icon: 'cash-outline', description: 'Paga al recibir tu pedido' },
  { id: 'TARJETA', label: 'Tarjeta', icon: 'card-outline', description: 'Crédito o Débito' },
  { id: 'TRANSFERENCIA', label: 'Transferencia', icon: 'phone-portrait-outline', description: 'Sube tu comprobante después' },
  { id: 'CREDITO', label: 'Crédito Directo', icon: 'wallet-outline', description: 'Paga en cuotas (sujeto a aprobación)' },
];

const CheckoutScreen = ({ navigation }) => {
  const { cart, cartTotals, user, createOrderFromCart, paymentCards } = useAppContext();
  const [selectedAddress, setSelectedAddress] = useState(user?.address || '');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [notes, setNotes] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || '');

  // Sincronizar dirección si el usuario la cambia en otra pantalla
  useEffect(() => {
    if (user?.address) {
      setSelectedAddress(user.address);
    }
  }, [user?.address]);

  const handleConfirmOrder = () => {
    if (!selectedAddress) {
      Alert.alert('Falta dirección', 'Por favor ingresa una dirección de entrega.');
      return;
    }
    if (!phoneNumber) {
      Alert.alert('Falta teléfono', 'Por favor ingresa un número de contacto.');
      return;
    }
    if (!selectedPayment) {
      Alert.alert('Método de pago', 'Selecciona cómo deseas pagar.');
      return;
    }

    if (selectedPayment === 'TARJETA' && !selectedCard) {
      Alert.alert('Tarjeta requerida', 'Por favor selecciona o agrega una tarjeta.');
      return;
    }

    if (selectedPayment === 'CREDITO') {
      // Navegar a selección de plan
      navigation.navigate('SeleccionPlanCredito', { total: cartTotals.total });
      return;
    }

    // Crear orden directa
    const orderData = {
      address: selectedAddress,
      notes,
      phone: phoneNumber,
      cardId: selectedPayment === 'TARJETA' ? selectedCard.id : null,
    };

    const order = createOrderFromCart(selectedPayment, orderData);
    if (order) {
      navigation.navigate('PedidoConfirmacion', { orderCode: order.code });
    }
  };

  const handleAddressEdit = () => {
    navigation.navigate('Direcciones');
  };

  if (cart.length === 0) {
    return (
      <View style={[styles.screen, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.textLight }}>Tu carrito está vacío</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
          <Text style={{ color: colors.primary, fontWeight: 'bold' }}>Volver a comprar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <ScreenHeader title="Checkout" subtitle="Finaliza tu compra" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Dirección de Entrega */}
        <SectionCard title="Información de Entrega">
          <View style={styles.addressContainer}>
            <Ionicons name="location-outline" size={24} color={colors.primary} style={styles.addressIcon} />
            <TextInput
              style={styles.addressInput}
              placeholder="Ingresa tu dirección completa"
              value={selectedAddress}
              onChangeText={setSelectedAddress}
              multiline
            />
            <TouchableOpacity style={styles.editButton} onPress={handleAddressEdit}>
              <Ionicons name="pencil" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.phoneContainer}>
            <Ionicons name="call-outline" size={20} color={colors.textMuted} style={styles.inputIcon} />
            <TextInput
              style={styles.phoneInput}
              placeholder="Teléfono de contacto"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>

          <TextInput
            style={styles.notesInput}
            placeholder="Añadir notas de entrega (opcional)"
            value={notes}
            onChangeText={setNotes}
          />
        </SectionCard>

        {/* Resumen del Pedido */}
        <SectionCard title="Resumen del pedido">
          {cart.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <View style={styles.cartItemInfo}>
                <Text style={styles.cartItemName}>{item.name}</Text>
                <Text style={styles.cartItemQuantity}>x{item.quantity}</Text>
              </View>
              <Text style={styles.cartItemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          ))}
          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total a pagar</Text>
            <Text style={styles.totalValue}>${cartTotals.total.toFixed(2)}</Text>
          </View>
        </SectionCard>

        {/* Método de Pago */}
        <SectionCard title="Método de pago">
          {PAYMENT_METHODS.map((method) => {
            const isSelected = selectedPayment === method.id;
            return (
              <View key={method.id}>
                <TouchableOpacity
                  style={[styles.paymentOption, isSelected && styles.paymentOptionSelected]}
                  onPress={() => setSelectedPayment(method.id)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.paymentIconContainer, isSelected && styles.paymentIconSelected]}>
                    <Ionicons
                      name={method.icon}
                      size={24}
                      color={isSelected ? colors.white : colors.textLight}
                    />
                  </View>
                  <View style={styles.paymentInfo}>
                    <Text style={[styles.paymentLabel, isSelected && styles.paymentLabelSelected]}>
                      {method.label}
                    </Text>
                    <Text style={styles.paymentDescription}>{method.description}</Text>
                  </View>
                  <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                    {isSelected && <View style={styles.radioDot} />}
                  </View>
                </TouchableOpacity>

                {/* Selector de Tarjetas si se elige TARJETA */}
                {isSelected && method.id === 'TARJETA' && (
                  <View style={styles.cardsContainer}>
                    {paymentCards.length > 0 ? (
                      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardsScroll}>
                        {paymentCards.map((card) => (
                          <TouchableOpacity
                            key={card.id}
                            style={[
                              styles.miniCard,
                              selectedCard?.id === card.id && styles.miniCardSelected
                            ]}
                            onPress={() => setSelectedCard(card)}
                          >
                            <Text style={[styles.miniCardText, selectedCard?.id === card.id && styles.miniCardTextSelected]}>
                              {card.type} •••• {card.number.slice(-4)}
                            </Text>
                          </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                          style={styles.addMiniCard}
                          onPress={() => navigation.navigate('MetodosPago')}
                        >
                          <Ionicons name="add" size={20} color={colors.primary} />
                          <Text style={styles.addMiniCardText}>Nueva</Text>
                        </TouchableOpacity>
                      </ScrollView>
                    ) : (
                      <TouchableOpacity
                        style={styles.addCardButton}
                        onPress={() => navigation.navigate('MetodosPago')}
                      >
                        <Text style={styles.addCardButtonText}>+ Agregar una tarjeta</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </View>
            );
          })}
        </SectionCard>

      </ScrollView>

      {/* Barra Inferior */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomTotal}>
          <Text style={styles.bottomTotalLabel}>Total</Text>
          <Text style={styles.bottomTotalValue}>${cartTotals.total.toFixed(2)}</Text>
        </View>
        <PrimaryButton
          title="Confirmar Pedido"
          onPress={handleConfirmOrder}
          style={styles.confirmButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 120, // Increased padding for bottom bar
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  addressIcon: {
    marginRight: 12,
  },
  addressInput: {
    flex: 1,
    fontSize: 14,
    color: colors.darkText,
  },
  editButton: {
    padding: 8,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: colors.darkText,
  },
  notesInput: {
    fontSize: 14,
    color: colors.darkText,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSoft,
    paddingVertical: 8,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cartItemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartItemName: {
    fontSize: 14,
    color: colors.textDark,
    marginRight: 8,
  },
  cartItemQuantity: {
    fontSize: 12,
    color: colors.textLight,
    fontWeight: '700',
  },
  cartItemPrice: {
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
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    marginBottom: 12,
    backgroundColor: colors.white,
  },
  paymentOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: '#FFF5F2',
  },
  paymentIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  paymentIconSelected: {
    backgroundColor: colors.primary,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
  },
  paymentLabelSelected: {
    color: colors.primary,
  },
  paymentDescription: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: colors.primary,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  cardsContainer: {
    marginLeft: 16,
    marginBottom: 16,
  },
  cardsScroll: {
    flexDirection: 'row',
  },
  miniCard: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  miniCardSelected: {
    backgroundColor: colors.primary + '10', // 10% opacity
    borderColor: colors.primary,
  },
  miniCardText: {
    fontSize: 12,
    color: colors.textDark,
    fontWeight: '600',
  },
  miniCardTextSelected: {
    color: colors.primary,
  },
  addMiniCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    borderStyle: 'dashed',
  },
  addMiniCardText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
    marginLeft: 4,
  },
  addCardButton: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    borderRadius: 12,
  },
  addCardButtonText: {
    color: colors.primary,
    fontWeight: '600',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomTotal: {
    flex: 1,
  },
  bottomTotalLabel: {
    fontSize: 12,
    color: colors.textLight,
  },
  bottomTotalValue: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textDark,
  },
  confirmButton: {
    flex: 1.5,
    marginLeft: 20,
  },
});

export default CheckoutScreen;
