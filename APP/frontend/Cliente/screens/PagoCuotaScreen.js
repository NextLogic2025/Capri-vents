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
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import sharedStyles from '../../theme/styles';
import SectionCard from '../components/SectionCard';
import ScreenHeader from '../components/ScreenHeader';
import PrimaryButton from '../components/PrimaryButton';
import { useAppContext } from '../../context/AppContext';

const methods = [
  { key: 'TARJETA', label: 'Tarjeta Credito/Debito', description: 'Pago inmediato', icon: 'card-outline' },
  { key: 'TRANSFERENCIA', label: 'Transferencia bancaria', description: 'Validacion en 24-48h', icon: 'swap-horizontal' },
  { key: 'EFECTIVO', label: 'Efectivo contra entrega', icon: 'cash-outline' },
];

const PagoCuotaScreen = ({ route, navigation }) => {
  const { creditId, installmentId } = route.params || {};
  const {
    credits,
    registerInstallmentPayment,
  } = useAppContext();
  const [method, setMethod] = useState('TRANSFERENCIA');
  const [transferModalVisible, setTransferModalVisible] = useState(false);
  const [transferReference, setTransferReference] = useState('');

  const credit = credits.find((item) => item.id === creditId);
  const installment = credit?.installments?.find((item) => item.id === installmentId || item.numero === installmentId);

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

    if (method === 'TRANSFERENCIA') {
      if (!transferReference.trim()) {
        setTransferModalVisible(true);
        return;
      }
      handleRegisterPayment('TRANSFERENCIA', { transferReference });
      return;
    }

    handleRegisterPayment(method, { notes: 'Pago registrado desde app' });
  };

  if (!credit || !installment) {
    return (
      <View style={sharedStyles.centeredScreen}>
        <Text>No encontramos la informacion de la cuota.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: colors.primary, marginTop: 10 }}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScreenHeader title="Pago de Cuota" subtitle={`Cuota ${installment.number}`} showBack />

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
          {methods.map((option) => {
            const isSelected = method === option.key;
            return (
              <View key={option.key}>
                <TouchableOpacity
                  style={[styles.paymentOption, isSelected && styles.paymentOptionSelected]}
                  onPress={() => setMethod(option.key)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.paymentIconContainer, isSelected && styles.paymentIconSelected]}>
                    <Ionicons
                      name={option.icon}
                      size={24}
                      color={isSelected ? colors.white : colors.textLight}
                    />
                  </View>
                  <View style={styles.paymentInfo}>
                    <Text style={[styles.paymentLabel, isSelected && styles.paymentLabelSelected]}>
                      {option.label}
                    </Text>
                    <Text style={styles.paymentDescription}>{option.description}</Text>
                  </View>
                  <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                    {isSelected && <View style={styles.radioDot} />}
                  </View>
                </TouchableOpacity>

                {/* Comprobante si se elige TRANSFERENCIA */}
                {isSelected && option.key === 'TRANSFERENCIA' && (
                  <View style={styles.transferContainer}>
                    <Text style={styles.fieldLabel}>Comprobante</Text>
                    <View style={styles.transferRow}>
                      <Text style={styles.cardDetail}>
                        {transferReference ? transferReference : 'Pendiente de adjuntar'}
                      </Text>
                      <TouchableOpacity onPress={() => setTransferModalVisible(true)}>
                        <Text style={styles.linkText}>
                          {transferReference ? 'Actualizar' : 'Subir'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </SectionCard>

        {/* Cuentas bancarias */}
        <SectionCard title="Cuentas bancarias">
          <View style={styles.bankCard}>
            <Text style={styles.bankTitle}>Cuentas Bancarias</Text>
            <Text style={styles.bankText}>Pichincha: 1234567890</Text>
            <Text style={styles.bankText}>Banco Guayaquil: 9876543210</Text>
          </View>
        </SectionCard>

      </ScrollView>

      {/* Barra Inferior */}
      <View style={styles.bottomBar}>
        <PrimaryButton
          title="Confirmar pago de cuota"
          onPress={handleConfirm}
        />
      </View>

      {/* Modal de comprobante de transferencia */}
      <Modal visible={transferModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Comprobante de transferencia</Text>
            <TextInput
              style={sharedStyles.input}
              placeholder="Número de referencia o archivo"
              value={transferReference}
              onChangeText={setTransferReference}
            />
            <PrimaryButton
              title="Guardar comprobante"
              onPress={() => {
                // BACKEND: adjuntar comprobante para validación en el servidor
                Alert.alert('Comprobante guardado', 'Se tomará en cuenta para validar tu pago.');
                setTransferModalVisible(false);
              }}
              style={{ marginTop: 8 }}
            />
            <Pressable onPress={() => setTransferModalVisible(false)} style={styles.modalClose}>
              <Text style={{ color: colors.primary }}>Cerrar</Text>
            </Pressable>
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
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
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
  transferContainer: {
    marginLeft: 16,
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
  },
  transferRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  fieldLabel: {
    fontSize: 12,
    color: colors.textMuted,
  },
  cardDetail: {
    color: colors.textDark,
    fontWeight: '600',
    fontSize: 14,
  },
  linkText: {
    color: colors.primary,
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
