import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Clipboard from 'expo-clipboard';
import globalStyles from '../../theme/styles';
import colors from '../../theme/colors';
import { useAppContext } from '../../context/AppContext';
import ScreenHeader from '../components/ScreenHeader';
import PrimaryButton from '../components/PrimaryButton';
import PaymentTabs from '../components/PaymentTabs';
import PaymentCard from '../components/PaymentCard';
import TransferCard from '../components/TransferCard';
import BankAccountCard from '../components/BankAccountCard';

const tabs = [
  { key: 'tarjetas', label: 'Tarjetas' },
  { key: 'transferencias', label: 'Transferencias' },
  { key: 'cuentas', label: 'Cuentas Cafrilosa' },
];

const cardTypes = ['CRÉDITO', 'DÉBITO'];
const initialCardForm = {
  type: 'CRÉDITO',
  number: '',
  holder: '',
  expiry: '',
  cvv: '',
};

const mockTransfers = [
  {
    id: 'tr-1',
    title: 'Pedido #3860',
    status: 'Pendiente',
    amount: '47.23',
    date: '05/11/2025',
    reference: '123456789',
    bank: 'Banco Pichincha - CAFRILOSA.CARNES',
  },
  {
    id: 'tr-2',
    title: 'Pedido #3852',
    status: 'Validada',
    amount: '89.50',
    date: '28/10/2025',
    reference: '987654321',
    bank: 'Banco Internacional - CAFRILOSA.EMBUTIDOS',
  },
  // BACKEND: la lista de transferencias debe venir de la API de pagos, con filtros por estado.
];

const mockBankAccounts = [
  {
    id: 'bank-1',
    bankName: 'Banco Pichincha',
    cbu: '045602123450001234567',
    alias: 'CAFRILOSA.CARNES',
    accountType: 'Cuenta Corriente',
    holder: 'Cafrilosa S.A.',
  },
  {
    id: 'bank-2',
    bankName: 'Banco del Pacífico',
    cbu: '045508765430009876543',
    alias: 'CAFRILOSA.EMBUTIDOS',
    accountType: 'Cuenta Corriente',
    holder: 'Cafrilosa S.A.',
  },
  // BACKEND: estas cuentas bancarias deben venir desde la configuración del backend.
];

const MetodosPagoScreen = ({ navigation }) => {
  const { paymentCards, addPaymentCard, updatePaymentCard, removePaymentCard } = useAppContext();
  const [activeTab, setActiveTab] = useState('tarjetas');
  const [isAddCardVisible, setIsAddCardVisible] = useState(false);
  const [cardForm, setCardForm] = useState(initialCardForm);
  const [editingCardId, setEditingCardId] = useState(null);

  const cards = paymentCards;
  const pendingTransfers = mockTransfers.filter((transfer) => transfer.status === 'Pendiente');
  const numberDigits = cardForm.number.replace(/\D/g, '');
  const hasValidNumber = numberDigits.length >= 12 || (editingCardId && numberDigits.length === 0);
  const isSaveCardDisabled =
    !hasValidNumber ||
    !cardForm.holder.trim() ||
    cardForm.expiry.length < 4 ||
    cardForm.cvv.length < 3 ||
    cardForm.cvv.length > 4;

  const handleFormChange = (field, value) => {
    setCardForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCardNumberChange = (text) => {
    const digits = text.replace(/\D/g, '').slice(0, 16);
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    handleFormChange('number', formatted);
  };

  const handleExpiryChange = (text) => {
    const digits = text.replace(/\D/g, '').slice(0, 4);
    const formatted = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
    handleFormChange('expiry', formatted);
  };

  const handleCvvChange = (text) => {
    const digits = text.replace(/\D/g, '').slice(0, 4);
    handleFormChange('cvv', digits);
  };

  const isValidCvv = (value) => value.length >= 3 && value.length <= 4;

  const handleSaveCard = () => {
    const digits = cardForm.number.replace(/\D/g, '');
    const currentCard = editingCardId && cards.find((card) => card.id === editingCardId);
    if (!isValidCvv(cardForm.cvv)) {
      return;
    }

    const selectedDigits =
      digits.length >= 12 ? digits : currentCard?.number?.replace(/\D/g, '') || '';
    if (!selectedDigits || selectedDigits.length < 4) {
      return;
    }

    const gradient = cardForm.type === 'DÉBITO' ? ['#FF8A65', '#FF7043'] : ['#1C6CFE', '#5C5BFC'];
    const payload = {
      type: cardForm.type,
      number: `**** **** **** ${selectedDigits.slice(-4)}`,
      holder: cardForm.holder.trim(),
      expiry: cardForm.expiry,
      gradient,
    };

    if (editingCardId) {
      updatePaymentCard(editingCardId, payload);
    } else {
      addPaymentCard(payload);
    }

    setCardForm({ ...initialCardForm });
    setEditingCardId(null);
    setIsAddCardVisible(false);
  };

  const handleCancelAddCard = () => {
    setCardForm({ ...initialCardForm });
    setEditingCardId(null);
    setIsAddCardVisible(false);
  };

  const handleEditCard = (card) => {
    setEditingCardId(card.id);
    setCardForm({
      type: card.type,
      number: '',
      holder: card.holder,
      expiry: card.expiry,
      cvv: '',
    });
    setIsAddCardVisible(true);
  };

  const handleDeleteCard = (cardId) => {
    removePaymentCard(cardId);
  };

  const handleCopy = async (value, label) => {
    await Clipboard.setStringAsync(value);
    // BACKEND: mostrar toast o snackbar indicando que se copió el CBU o Alias.
    console.log(`${label} copiado: ${value}`);
  };

  const modalTitle = editingCardId ? 'Editar tarjeta' : 'Agregar tarjeta';
  const modalButtonTitle = editingCardId ? 'Guardar cambios' : 'Guardar tarjeta';

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={[globalStyles.contentContainer, styles.scrollContent]}
        showsVerticalScrollIndicator={false}
      >

        <PaymentTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'tarjetas' && (
          <View style={styles.tabContent}>
            <PrimaryButton
              title="+ Agregar Tarjeta"
              onPress={() => {
                setCardForm({ ...initialCardForm });
                setEditingCardId(null);
                setIsAddCardVisible(true);
              }}
              style={styles.addButton}
            />
            {cards.map((card) => (
              <PaymentCard
                key={card.id}
                type={card.type}
                number={card.number}
                holder={card.holder}
                expiry={card.expiry}
                gradientColors={card.gradient}
                defaultCard={card.defaultCard}
                onEdit={() => handleEditCard(card)}
                onDelete={() => handleDeleteCard(card.id)}
              />
            ))}
          <View style={[styles.infoBox, globalStyles.shadow]}>
            <Text style={styles.infoTitle}>Seguridad:</Text>
            <Text style={styles.infoText}>
              Tus datos se transmiten con cifrado bancario y el CVV solo se usa momentáneamente para tokenizar la tarjeta.
            </Text>
          </View>
          </View>
        )}

        {activeTab === 'transferencias' && (
          <View style={styles.tabContent}>
            <View style={[styles.sectionHeader, globalStyles.shadow]}>
              <View>
                <Text style={styles.sectionTitle}>Mis Transferencias</Text>
                <Text style={styles.sectionSubtitle}>Consulta tus comprobantes en trámite.</Text>
              </View>
              <View style={styles.pendingBadge}>
                <Text style={styles.pendingBadgeText}>
                  {pendingTransfers.length} Pendiente{pendingTransfers.length === 1 ? '' : 's'}
                </Text>
              </View>
            </View>
            <View>
              {mockTransfers.map((transfer) => (
                <TransferCard
                  key={transfer.id}
                  title={transfer.title}
                  status={transfer.status}
                  amount={transfer.amount}
                  date={transfer.date}
                  reference={transfer.reference}
                  bank={transfer.bank}
                  onViewMore={() => {
                    // BACKEND: "Ver más" debería abrir un detalle de la transferencia (comprobante, estado, etc.).
                    console.log('Abrir detalle', transfer.id);
                  }}
                />
              ))}
            </View>
            <View style={[styles.transferInfo, globalStyles.shadow]}>
              <Text style={styles.transferInfoTitle}>Tiempo de validación</Text>
              <Text style={styles.transferInfoText}>
                24-48 horas hábiles. Recibirás un correo cuando confirmemos tu pago y tu pedido será procesado.
              </Text>
            </View>
          </View>
        )}

        {activeTab === 'cuentas' && (
          <View style={styles.tabContent}>
            <LinearGradient
              colors={['#F4994A', '#E5392A']}
              style={[styles.accountsHeader, globalStyles.shadow]}
            >
              <Text style={styles.accountsTitle}>Cuentas Bancarias de Cafrilosa</Text>
              <Text style={styles.accountsSubtitle}>Transfiere a cualquiera de estas cuentas</Text>
            </LinearGradient>
            {mockBankAccounts.map((account) => (
              <BankAccountCard
                key={account.id}
                bankName={account.bankName}
                cbu={account.cbu}
                alias={account.alias}
                accountType={account.accountType}
                holder={account.holder}
                onCopy={handleCopy}
              />
            ))}
            <View style={[styles.accountsInfo, globalStyles.shadow]}>
              <Text style={styles.accountsInfoTitle}>Instrucciones para transferir</Text>
              <Text style={styles.accountsInfoText}>
                Realizá la transferencia por el monto exacto de tu pedido y guardá el comprobante. Al finalizar la compra,
                cargá el número de referencia y adjuntá el comprobante para acelerar la validación.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
      <Modal
        visible={isAddCardVisible}
        transparent
        animationType="slide"
        onRequestClose={handleCancelAddCard}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={handleCancelAddCard}
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalContainer}
          >
            <View style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{modalTitle}</Text>
                <TouchableOpacity onPress={handleCancelAddCard}>
                  <Text style={styles.modalCancel}>Cancelar</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.modalSubtitle}>
                Guarda tu tarjeta para acelerar tus próximas compras.
              </Text>
              <View style={styles.cardTypeRow}>
                {cardTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.cardTypePill,
                      cardForm.type === type && styles.cardTypePillActive,
                    ]}
                    onPress={() => handleFormChange('type', type)}
                  >
                    <Text
                      style={[
                        styles.cardTypeLabel,
                        cardForm.type === type && styles.cardTypeLabelActive,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TextInput
                placeholder="Número de tarjeta"
                placeholderTextColor={colors.textMuted}
                value={cardForm.number}
                onChangeText={handleCardNumberChange}
                keyboardType="number-pad"
                maxLength={19}
                style={styles.input}
              />
              <TextInput
                placeholder="Nombre del titular"
                placeholderTextColor={colors.textMuted}
                value={cardForm.holder}
                onChangeText={(value) => handleFormChange('holder', value)}
                style={styles.input}
              />
              <View style={styles.formRow}>
                <TextInput
                  placeholder="MM/AA"
                  placeholderTextColor={colors.textMuted}
                  value={cardForm.expiry}
                  onChangeText={handleExpiryChange}
                  keyboardType="number-pad"
                  maxLength={5}
                  style={[styles.input, styles.halfInput]}
                />
                <TextInput
                  placeholder="CVV"
                  placeholderTextColor={colors.textMuted}
                  value={cardForm.cvv}
                  onChangeText={handleCvvChange}
                  keyboardType="number-pad"
                  maxLength={4}
                  style={[styles.input, styles.halfInput, styles.lastInput]}
                />
              </View>
              <PrimaryButton
                title={modalButtonTitle}
                onPress={handleSaveCard}
                disabled={isSaveCardDisabled}
                style={styles.modalButton}
              />
            </View>
          </KeyboardAvoidingView>
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 10,
  },
  tabContent: {
    marginBottom: 24,
  },
  addButton: {
    marginBottom: 16,
  },
  infoBox: {
    marginTop: 16,
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    ...globalStyles.shadow,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primaryDark,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
  },
  sectionHeader: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 4,
  },
  pendingBadge: {
    backgroundColor: 'rgba(229, 89, 0, 0.1)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  pendingBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primaryRed,
  },
  transferInfo: {
    borderRadius: 20,
    padding: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    ...globalStyles.shadow,
  },
  transferInfoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 4,
  },
  transferInfoText: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
  },
  accountsHeader: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
  },
  accountsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
  accountsSubtitle: {
    fontSize: 13,
    color: colors.white,
    marginTop: 4,
  },
  accountsInfo: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 18,
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    ...globalStyles.shadow,
  },
  accountsInfoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 4,
  },
  accountsInfoText: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    padding: 16,
  },
  modalCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 20,
    ...globalStyles.shadow,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
  },
  modalCancel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMuted,
  },
  modalSubtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 12,
  },
  cardTypeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardTypePill: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  cardTypePillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  cardTypeLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
  },
  cardTypeLabelActive: {
    color: colors.white,
  },
  input: {
    backgroundColor: colors.lightBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.textDark,
    marginBottom: 12,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  halfInput: {
    flex: 1,
    marginRight: 8,
    marginBottom: 0,
  },
  lastInput: {
    marginRight: 0,
  },
  modalButton: {
    marginTop: 4,
  },
});

export default MetodosPagoScreen;
