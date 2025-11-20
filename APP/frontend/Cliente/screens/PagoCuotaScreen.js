import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Modal,
  TextInput,
  StyleSheet,
  Alert,
  Pressable,
} from 'react-native';
import colors from '../../theme/colors';
import sharedStyles from '../../theme/styles';
import SectionCard from '../components/SectionCard';
import PaymentMethodCard from '../components/PaymentMethodCard';
import PrimaryButton from '../components/PrimaryButton';
import { useAppContext } from '../../context/AppContext';

const methods = [
  { key: 'TARJETA', label: 'Tarjeta Credito/Debito', description: 'Pago inmediato', icon: 'card-outline' },
  { key: 'TRANSFERENCIA', label: 'Transferencia bancaria', description: 'Validacion en 24-48h', icon: 'swap-horizontal' },
  { key: 'EFECTIVO', label: 'Efectivo contra entrega', icon: 'cash-outline' },
];

const PagoCuotaScreen = ({ route, navigation }) => {
  const { creditId, installmentId } = route.params || {};
  const { credits, registerInstallmentPayment } = useAppContext();
  const [method, setMethod] = useState('TARJETA');
  const [showCardModal, setShowCardModal] = useState(false);
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  const credit = credits.find((item) => item.id === creditId);
  const installment = credit?.installments?.find((item) => item.id === installmentId);

  const subtotalText = useMemo(() => {
    if (!installment) return '';
    return `$${installment.amount.toFixed(2)}`;
  }, [installment]);

  const goBackToDetail = () => {
    navigation.navigate('DetalleCredito', { creditId });
  };

  const handleRegisterPayment = (selectedMethod, extraInfo = {}) => {
    registerInstallmentPayment(creditId, installmentId, selectedMethod, extraInfo);
    goBackToDetail();
  };

  const handleConfirm = () => {
    if (!installment) return;
    if (method === 'TARJETA') {
      setShowCardModal(true);
      return;
    }
    handleRegisterPayment(method, { notes: 'Pago registrado desde app' });
  };

  const handlePayWithCard = () => {
    if (!cardData.number || !cardData.expiry || !cardData.cvv || !cardData.name) {
      Alert.alert('Datos incompletos', 'Completa los datos de tarjeta.');
      return;
    }
    setShowCardModal(false);
    // BACKEND: esto deberia registrarse en el servidor y validarse con la pasarela.
    handleRegisterPayment('TARJETA', { ...cardData });
  };

  if (!credit || !installment) {
    return (
      <View style={sharedStyles.centeredScreen}>
        <Text>No encontramos la informacion de la cuota.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Resumen compacto de la cuota */}
        <SectionCard title="Detalles de la cuota">
          <View style={styles.summaryRow}>
            <View>
              <Text style={styles.summaryLabel}>Cuota {installment.number}</Text>
              <Text style={styles.summarySub}>
                Vence: {installment.dueDate}
              </Text>
            </View>
            <Text style={styles.summaryAmount}>{subtotalText}</Text>
          </View>
          <Text style={styles.summaryStatus}>
            Estado:{' '}
            <Text style={styles.summaryStatusStrong}>
              {installment.status}
            </Text>
          </Text>
        </SectionCard>

        {/* Método de pago */}
        <SectionCard title="Método de pago">
          {methods.map((option) => (
            <PaymentMethodCard
              key={option.key}
              label={option.label}
              description={option.description}
              icon={option.icon}
              selected={method === option.key}
              onPress={() => setMethod(option.key)}
            />
          ))}
        </SectionCard>

        {/* Cuentas bancarias */}
        <SectionCard title="Cuentas bancarias">
          <View style={styles.bankCard}>
            <Text style={styles.bankTitle}>Cuentas Bancarias</Text>
            <Text style={styles.bankText}>Pichincha: 1234567890</Text>
            <Text style={styles.bankText}>Banco Guayaquil: 9876543210</Text>
          </View>
        </SectionCard>

        {/* Botón rojo principal (se mantiene igual) */}
        <PrimaryButton
          title="Confirmar pago de cuota"
          onPress={handleConfirm}
          style={styles.confirmButton}
        />
      </ScrollView>

      {/* Modal para datos de tarjeta */}
      <Modal visible={showCardModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Datos de la tarjeta</Text>
            <TextInput
              style={sharedStyles.input}
              placeholder="Numero de tarjeta"
              keyboardType="number-pad"
              value={cardData.number}
              onChangeText={(text) =>
                setCardData((prev) => ({ ...prev, number: text }))
              }
            />
            <TextInput
              style={sharedStyles.input}
              placeholder="Fecha vencimiento (MM/AA)"
              value={cardData.expiry}
              onChangeText={(text) =>
                setCardData((prev) => ({ ...prev, expiry: text }))
              }
            />
            <TextInput
              style={sharedStyles.input}
              placeholder="CVV"
              keyboardType="number-pad"
              value={cardData.cvv}
              onChangeText={(text) =>
                setCardData((prev) => ({ ...prev, cvv: text }))
              }
            />
            <TextInput
              style={sharedStyles.input}
              placeholder="Nombre del titular"
              value={cardData.name}
              onChangeText={(text) =>
                setCardData((prev) => ({ ...prev, name: text }))
              }
            />
            <PrimaryButton title="Pagar" onPress={handlePayWithCard} />
            <Pressable
              onPress={() => setShowCardModal(false)}
              style={styles.modalClose}
            >
              <Text style={{ color: colors.primary }}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
    paddingBottom: 160,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textDark,
  },
  summarySub: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  summaryAmount: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textDark,
  },
  summaryStatus: {
    marginTop: 4,
    fontSize: 13,
    color: colors.textMuted,
  },
  summaryStatusStrong: {
    color: colors.textDark,
    fontWeight: '600',
  },
  bankCard: {
    borderRadius: 18,
    padding: 14,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderSoft || '#F0F0F0',
  },
  bankTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 6,
  },
  bankText: {
    color: colors.textDark,
    marginBottom: 4,
  },
  confirmButton: {
    marginTop: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: colors.cardBackground,
    borderRadius: 24,
    padding: 20,
    ...sharedStyles.shadow,
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

export default PagoCuotaScreen;
