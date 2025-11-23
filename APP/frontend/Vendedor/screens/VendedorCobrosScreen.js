import React, { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../theme/colors';
import globalStyles from '../../theme/styles';
import { useAppContext } from '../../context/AppContext';
import * as ImagePicker from 'expo-image-picker';
import PrimaryButton from '../../Cliente/components/PrimaryButton';
import EmptyState from '../../Cliente/components/EmptyState';
import VendedorCobroCard from '../components/VendedorCobroCard';

const CASH_STATES = ['PENDIENTE_COBRO', 'COBRADO_REPORTADO'];
const INSTALLMENT_STATES = [
  'PENDIENTE',
  'VENCIDA',
  'VENCIDO',
  'PAGO_PENDIENTE_VALIDACION',
  'PENDIENTE_COBRO_EFECTIVO',
];

const toUpper = (value = '') => String(value).toUpperCase();

const VendedorCobrosScreen = () => {
  const { vendorAssignedOrders = [], vendorAssignedCredits = [], vendorUser } = useAppContext();
  const [selectedTab, setSelectedTab] = useState('PEDIDOS');

  // Estados para modales
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [creditDetailVisible, setCreditDetailVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCredit, setSelectedCredit] = useState(null); // Para el detalle del crédito completo

  const [cashAmount, setCashAmount] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);

  // --- DATOS ---
  const pendingCashOrders = useMemo(() => {
    return vendorAssignedOrders
      .filter((order) => {
        const metodo = toUpper(order.metodoPago || order.paymentMethod || '');
        const estado = toUpper(order.estadoPago || order.paymentStatus || '');
        return metodo === 'EFECTIVO' && CASH_STATES.includes(estado);
      })
      .map((order) => ({
        type: 'PEDIDO',
        id: order.id || order.code,
        pedidoId: order.id,
        code: order.code,
        clienteNombre: order.clientName || order.clienteNombre || 'Cliente asignado',
        monto: order.total ?? order.amount ?? 0,
        fechaEntrega: order.deliveryDate || order.date,
        estado: toUpper(order.estadoPago || order.paymentStatus || 'PENDIENTE_COBRO'),
        raw: order,
      }));
  }, [vendorAssignedOrders]);

  const pendingInstallments = useMemo(() => {
    return vendorAssignedCredits
      .flatMap((credit) =>
        (credit.installments || []).map((cuota) => {
          const estado = toUpper(cuota.estado || cuota.status || 'PENDIENTE');
          if (!INSTALLMENT_STATES.includes(estado)) return null;
          return {
            type: 'CUOTA',
            id: `${credit.id}-${cuota.id}`,
            creditId: credit.id,
            pedidoId: credit.orderId,
            codigoPedido: credit.orderCode,
            clienteNombre: credit.clientName || credit.clienteNombre || 'Cliente asignado',
            numeroCuota: cuota.numero || cuota.number,
            monto: cuota.amount ?? cuota.monto ?? 0,
            fechaVencimiento: cuota.dueDate || cuota.fechaVencimiento,
            estado,
            raw: cuota,
            parentCredit: credit, // Referencia al crédito padre
          };
        })
      )
      .filter(Boolean);
  }, [vendorAssignedCredits]);

  const renderList = useMemo(() => {
    return selectedTab === 'PEDIDOS' ? pendingCashOrders : pendingInstallments;
  }, [selectedTab, pendingCashOrders, pendingInstallments]);

  // --- ACCIONES ---
  const handleItemPress = (item) => {
    if (item.type === 'CUOTA') {
      // Abrir detalle del crédito completo
      setSelectedCredit(item.parentCredit);
      setCreditDetailVisible(true);
    } else {
      // Abrir modal de pago directo para pedidos
      openPaymentModal(item);
    }
  };

  const openPaymentModal = (item) => {
    setSelectedItem(item);
    setCashAmount(String(item.monto ?? 0));
    setInvoiceNumber('');
    setHasPhoto(false);
    setPaymentModalVisible(true);
  };

  const closePaymentModal = () => {
    setPaymentModalVisible(false);
    setSelectedItem(null);
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a tu cámara para tomar la foto del comprobante.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setHasPhoto(result.assets[0].uri);
    }
  };

  const handleConfirmPayment = () => {
    if (!selectedItem) return;

    // Simulación de lógica de negocio
    console.log('Cobro registrado', {
      type: selectedItem.type,
      id: selectedItem.id,
      amount: cashAmount,
      invoiceNumber,
      photoUri: hasPhoto, // Enviar URI de la foto
    });

    closePaymentModal();

    // Mostrar feedback de éxito
    setTimeout(() => {
      setSuccessModalVisible(true);
    }, 300);
  };

  // --- RENDERERS ---
  const renderTabButton = (tabKey, label) => {
    const active = selectedTab === tabKey;
    return (
      <TouchableOpacity
        key={tabKey}
        onPress={() => setSelectedTab(tabKey)}
        style={[styles.tabButton, active && styles.tabButtonActive]}
      >
        <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text>
      </TouchableOpacity>
    );
  };

  const renderPaymentModal = () => {
    if (!selectedItem) return null;
    const label = selectedItem.type === 'CUOTA' ? 'Cuota de Crédito' : 'Pedido de Contado';

    return (
      <Modal visible={paymentModalVisible} transparent animationType="slide" onRequestClose={closePaymentModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>Registrar Cobro</Text>
              <TouchableOpacity onPress={closePaymentModal}>
                <Ionicons name="close" size={24} color={colors.textMuted} />
              </TouchableOpacity>
            </View>

            <View style={styles.paymentSummary}>
              <Text style={styles.paymentSummaryLabel}>Total a cobrar</Text>
              <Text style={styles.paymentSummaryAmount}>${Number(cashAmount).toFixed(2)}</Text>
              <Text style={styles.paymentSummaryDetail}>{label} - {selectedItem.clienteNombre}</Text>
            </View>

            <Text style={styles.inputLabel}>Monto Recibido</Text>
            <TextInput
              style={styles.input}
              keyboardType="decimal-pad"
              value={cashAmount}
              onChangeText={setCashAmount}
            />

            <Text style={styles.inputLabel}>Nro. Factura / Recibo (Opcional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. 001-002-123456"
              value={invoiceNumber}
              onChangeText={setInvoiceNumber}
            />

            <TouchableOpacity
              style={[styles.photoButton, hasPhoto && styles.photoButtonSuccess]}
              onPress={takePhoto}
            >
              <Ionicons name={hasPhoto ? "checkmark-circle" : "camera-outline"} size={20} color={hasPhoto ? colors.success : colors.primary} />
              <Text style={[styles.photoButtonText, hasPhoto && { color: colors.success }]}>
                {hasPhoto ? 'Foto adjuntada correctamente' : 'Adjuntar foto del comprobante (Obligatorio en Efectivo)'}
              </Text>
            </TouchableOpacity>

            {hasPhoto && (
              <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                <Text style={{ fontSize: 12, color: colors.textLight, marginBottom: 4 }}>Vista previa:</Text>
                {/* Importar Image de react-native si no está importado, pero ya está en la línea 8 */}
                <Image source={{ uri: hasPhoto }} style={{ width: 100, height: 100, borderRadius: 8 }} />
              </View>
            )}

            <PrimaryButton
              title="Confirmar Cobro"
              onPress={handleConfirmPayment}
              style={{ marginTop: 20 }}
              disabled={!hasPhoto} // Obligatorio para el ejemplo
            />
          </View>
        </View>
      </Modal>
    );
  };

  const renderCreditDetailModal = () => {
    if (!selectedCredit) return null;

    // Calcular totales
    const total = selectedCredit.total || 0;
    const pendiente = selectedCredit.saldoPendiente || 0;
    const pagado = total - pendiente;
    const progreso = total > 0 ? (pagado / total) * 100 : 0;

    return (
      <Modal visible={creditDetailVisible} transparent animationType="slide" onRequestClose={() => setCreditDetailVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { height: '85%' }]}>
            <View style={styles.modalHeaderRow}>
              <View>
                <Text style={styles.modalTitle}>Detalle de Crédito</Text>
                <Text style={styles.modalSubtitle}>{selectedCredit.clientName}</Text>
              </View>
              <TouchableOpacity onPress={() => setCreditDetailVisible(false)} style={styles.closeIconBtn}>
                <Ionicons name="close" size={20} color={colors.textDark} />
              </TouchableOpacity>
            </View>

            <View style={styles.creditProgressCard}>
              <View style={styles.creditRow}>
                <Text style={styles.creditLabel}>Crédito Total</Text>
                <Text style={styles.creditValue}>${total.toFixed(2)}</Text>
              </View>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${progreso}%` }]} />
              </View>
              <View style={styles.creditRow}>
                <Text style={styles.creditSubLabel}>Pagado: ${pagado.toFixed(2)}</Text>
                <Text style={[styles.creditSubLabel, { color: colors.danger }]}>Pendiente: ${pendiente.toFixed(2)}</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Plan de Pagos</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {selectedCredit.installments.map((cuota, index) => {
                const isPaid = cuota.status === 'PAGADA' || cuota.status === 'Pagada';
                const isOverdue = cuota.status === 'VENCIDA';
                return (
                  <View key={index} style={styles.installmentRow}>
                    <View style={styles.installmentInfo}>
                      <Text style={styles.installmentNumber}>Cuota {cuota.number}</Text>
                      <Text style={styles.installmentDate}>{cuota.dueDate}</Text>
                    </View>
                    <View style={styles.installmentRight}>
                      <Text style={styles.installmentAmount}>${Number(cuota.amount).toFixed(2)}</Text>
                      {isPaid ? (
                        <View style={[styles.statusBadge, { backgroundColor: colors.success }]}>
                          <Text style={styles.statusText}>Pagada</Text>
                        </View>
                      ) : (
                        <TouchableOpacity
                          style={[styles.payBtn, isOverdue && { backgroundColor: colors.danger }]}
                          onPress={() => {
                            setCreditDetailVisible(false);
                            // Crear objeto item compatible con el modal de pago
                            openPaymentModal({
                              type: 'CUOTA',
                              id: `${selectedCredit.id}-${cuota.id}`,
                              monto: cuota.amount,
                              clienteNombre: selectedCredit.clientName,
                              numeroCuota: cuota.number
                            });
                          }}
                        >
                          <Text style={styles.payBtnText}>{isOverdue ? 'Vencida - Cobrar' : 'Cobrar'}</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  const renderSuccessModal = () => (
    <Modal visible={successModalVisible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.successCard}>
          <View style={styles.successIcon}>
            <Ionicons name="checkmark" size={40} color={colors.white} />
          </View>
          <Text style={styles.successTitle}>¡Cobro Registrado!</Text>
          <Text style={styles.successMessage}>El pago ha sido registrado correctamente y enviado a validación.</Text>
          <PrimaryButton title="Entendido" onPress={() => setSuccessModalVisible(false)} />
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      {/* Header con Gradiente */}
      <LinearGradient
        colors={[colors.primary, colors.primaryDark || '#8B0000']}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Cobros</Text>
            <Text style={styles.headerSubtitle}>Gestiona tu cartera y pagos</Text>
          </View>
          <View style={styles.headerIcon}>
            <Ionicons name="cash" size={32} color={colors.white} />
          </View>
        </View>
      </LinearGradient>

      <View style={styles.tabContainer}>
        <View style={styles.tabRow}>
          {renderTabButton('PEDIDOS', 'Pedidos Contado')}
          {renderTabButton('CUOTAS', 'Créditos')}
        </View>
      </View>

      <FlatList
        data={renderList}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <VendedorCobroCard
            item={item}
            onPress={() => handleItemPress(item)}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            title="Todo al día"
            subtitle={selectedTab === 'PEDIDOS' ? "No hay pedidos pendientes de cobro." : "No hay cuotas pendientes asignadas."}
            iconName="checkmark-done-circle-outline"
          />
        }
        showsVerticalScrollIndicator={false}
      />

      {renderPaymentModal()}
      {renderCreditDetailModal()}
      {renderSuccessModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerGradient: {
    paddingTop: 50,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    color: colors.white,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
    marginTop: 4,
  },
  headerIcon: {
    width: 56,
    height: 56,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.borderSoft,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonActive: {
    backgroundColor: colors.primary,
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textLight,
  },
  tabLabelActive: {
    color: colors.white,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    maxHeight: '90%',
    width: '100%', // Asegurar ancho completo
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textDark,
  },
  modalSubtitle: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 2,
  },
  closeIconBtn: {
    padding: 4,
    backgroundColor: colors.background,
    borderRadius: 50,
  },
  paymentSummary: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  paymentSummaryLabel: {
    fontSize: 12,
    color: colors.textLight,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  paymentSummaryAmount: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
    marginVertical: 4,
  },
  paymentSummaryDetail: {
    fontSize: 14,
    color: colors.textDark,
    fontWeight: '500',
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    ...globalStyles.input,
    backgroundColor: colors.background,
    borderWidth: 0,
  },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 12,
    borderStyle: 'dashed',
    marginTop: 20,
  },
  photoButtonSuccess: {
    borderColor: colors.success,
    backgroundColor: '#E8F5E9',
  },
  photoButtonText: {
    color: colors.primary,
    fontWeight: '600',
    marginLeft: 8,
  },
  // Credit Detail Styles
  creditProgressCard: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  creditRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  creditLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontWeight: '600',
  },
  creditValue: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '800',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.white,
    borderRadius: 3,
  },
  creditSubLabel: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 12,
  },
  installmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSoft,
  },
  installmentInfo: {
    flex: 1,
  },
  installmentNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
  },
  installmentDate: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },
  installmentRight: {
    alignItems: 'flex-end',
  },
  installmentAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 4,
  },
  payBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  payBtnText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '700',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  // Success Modal
  successCard: {
    backgroundColor: colors.white,
    margin: 20,
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textDark,
    marginBottom: 10,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
});

export default VendedorCobrosScreen;
