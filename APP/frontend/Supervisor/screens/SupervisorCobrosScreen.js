import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  FlatList,
  TextInput,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import SupervisorPaymentCard from '../components/SupervisorPaymentCard';
import SupervisorCreditCard from '../components/SupervisorCreditCard';
import colors from '../../theme/colors';
import { useAppContext } from '../../context/AppContext';

const PAYMENT_TYPES = ['Todos', 'Transferencia', 'Efectivo'];

const SupervisorCobrosScreen = () => {
  const navigation = useNavigation();
  const {
    paymentsToValidate,
    supervisorCredits,
    credits,
  } = useAppContext();

  const [activeSegment, setActiveSegment] = useState('pagos');
  const [paymentFilter, setPaymentFilter] = useState('Todos');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedCredit, setSelectedCredit] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [newLimit, setNewLimit] = useState('');
  const [comment, setComment] = useState('');

  const filteredPayments = useMemo(() => {
    return paymentsToValidate.filter((payment) => {
      if (paymentFilter === 'Todos') return true;
      return payment.tipo?.toLowerCase() === paymentFilter.toLowerCase();
    });
  }, [paymentsToValidate, paymentFilter]);

  const creditStats = useMemo(() => {
    const totalVigentes = supervisorCredits.length;
    const deudaVencida = supervisorCredits.reduce(
      (sum, credit) => sum + (credit.deudaTotal || 0),
      0
    );
    const enMoraCount = supervisorCredits.filter((credit) => credit.enMora).length;
    return { totalVigentes, deudaVencida, enMoraCount };
  }, [supervisorCredits]);

  const openCreditDetail = (summary) => {
    const creditDetail = credits.find((item) => item.id === summary.creditId) || null;
    setSelectedCredit(creditDetail);
  };

  const currentCount = activeSegment === 'pagos' ? filteredPayments.length : creditStats.totalVigentes;

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
            <Text style={styles.headerTitle}>Cobros y Créditos</Text>
            <Text style={styles.headerSubtitle}>
              {activeSegment === 'pagos' ? `${currentCount} pago${currentCount !== 1 ? 's' : ''}` : `${currentCount} crédito${currentCount !== 1 ? 's' : ''}`}
            </Text>
          </View>
          <View style={styles.headerIcon}>
            <Ionicons name="cash" size={32} color={colors.white} />
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Segmento Pagos / Créditos */}
        <View style={styles.segmentContainer}>
          <TouchableOpacity
            style={[styles.segmentButton, activeSegment === 'pagos' && styles.segmentButtonActive]}
            onPress={() => setActiveSegment('pagos')}
          >
            <Ionicons
              name="card-outline"
              size={20}
              color={activeSegment === 'pagos' ? colors.white : colors.textMuted}
            />
            <Text style={[styles.segmentText, activeSegment === 'pagos' && styles.segmentTextActive]}>
              Pagos por validar
            </Text>
            {paymentsToValidate.length > 0 && (
              <View style={[styles.segmentBadge, activeSegment === 'pagos' && styles.segmentBadgeActive]}>
                <Text style={[styles.segmentBadgeText, activeSegment === 'pagos' && styles.segmentBadgeTextActive]}>
                  {paymentsToValidate.length}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.segmentButton, activeSegment === 'creditos' && styles.segmentButtonActive]}
            onPress={() => setActiveSegment('creditos')}
          >
            <Ionicons
              name="wallet-outline"
              size={20}
              color={activeSegment === 'creditos' ? colors.white : colors.textMuted}
            />
            <Text style={[styles.segmentText, activeSegment === 'creditos' && styles.segmentTextActive]}>
              Créditos
            </Text>
            {creditStats.enMoraCount > 0 && (
              <View style={[styles.segmentBadge, activeSegment === 'creditos' && styles.segmentBadgeActive]}>
                <Text style={[styles.segmentBadgeText, activeSegment === 'creditos' && styles.segmentBadgeTextActive]}>
                  {creditStats.enMoraCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {activeSegment === 'pagos' ? (
          <>
            {/* Filtro por tipo de pago */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>
                <Ionicons name="filter-outline" size={14} color={colors.textMuted} /> Tipo de pago
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {PAYMENT_TYPES.map((type) => {
                  const isActive = paymentFilter === type;
                  return (
                    <TouchableOpacity
                      key={type}
                      style={[styles.filterChip, isActive && styles.filterChipActive]}
                      onPress={() => setPaymentFilter(type)}
                    >
                      <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                        {type}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            <FlatList
              data={filteredPayments}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <SupervisorPaymentCard
                  payment={item}
                  onPress={() => setSelectedPayment(item)}
                />
              )}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Ionicons name="checkmark-done-circle-outline" size={64} color={colors.success} />
                  <Text style={styles.emptyTitle}>¡Todo al día!</Text>
                  <Text style={styles.emptyText}>No hay pagos pendientes de validación.</Text>
                </View>
              }
              scrollEnabled={false}
            />
          </>
        ) : (
          <>
            {/* Resumen de créditos */}
            <View style={styles.statsGrid}>
              <View style={[styles.statCard, { backgroundColor: '#E3F2FD' }]}>
                <Ionicons name="wallet" size={24} color="#1976D2" />
                <Text style={styles.statValue}>{creditStats.totalVigentes}</Text>
                <Text style={styles.statLabel}>Vigentes</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: '#FFEBEE' }]}>
                <Ionicons name="alert-circle" size={24} color={colors.danger} />
                <Text style={styles.statValue}>{creditStats.enMoraCount}</Text>
                <Text style={styles.statLabel}>En mora</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: '#FFF3E0' }]}>
                <Ionicons name="cash" size={24} color="#F57C00" />
                <Text style={styles.statValue}>${creditStats.deudaVencida.toFixed(0)}</Text>
                <Text style={styles.statLabel}>Deuda total</Text>
              </View>
            </View>

            <FlatList
              data={supervisorCredits}
              keyExtractor={(item) => item.creditId || item.clienteNombre}
              renderItem={({ item }) => (
                <SupervisorCreditCard
                  creditSummary={item}
                  onPress={() => openCreditDetail(item)}
                />
              )}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Ionicons name="happy-outline" size={64} color={colors.textMuted} />
                  <Text style={styles.emptyTitle}>Sin créditos</Text>
                  <Text style={styles.emptyText}>No hay créditos registrados en el sistema.</Text>
                </View>
              }
              scrollEnabled={false}
            />
          </>
        )}
      </ScrollView>

      {/* MODAL: Detalle de pago */}
      <Modal visible={!!selectedPayment} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Ionicons name="card" size={28} color={colors.primary} />
              <Text style={styles.modalTitle}>Validar Pago</Text>
            </View>
            <Text style={styles.modalSubtitle}>{selectedPayment?.pedidoId}</Text>

            <View style={styles.detailGrid}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Cliente</Text>
                <Text style={styles.detailValue}>{selectedPayment?.clienteNombre}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Método</Text>
                <Text style={styles.detailValue}>{selectedPayment?.tipo}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Monto</Text>
                <Text style={[styles.detailValue, styles.detailTotal]}>
                  ${(selectedPayment?.monto ?? 0).toFixed(2)}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Fecha</Text>
                <Text style={styles.detailValue}>{selectedPayment?.fechaRegistro}</Text>
              </View>
              {selectedPayment?.vendedorNombre && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Vendedor</Text>
                  <Text style={styles.detailValue}>{selectedPayment.vendedorNombre}</Text>
                </View>
              )}
            </View>

            <TextInput
              style={styles.input}
              placeholder="Motivo de rechazo (opcional)"
              value={rejectionReason}
              onChangeText={setRejectionReason}
              multiline
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: colors.white, borderWidth: 1.5, borderColor: colors.primary + '40' }]}
                onPress={() => {
                  Alert.alert('Comprobante', 'Vista previa comprobante (mock).');
                }}
              >
                <Ionicons name="document-text" size={20} color={colors.primary} />
                <Text style={[styles.modalButtonText, { color: colors.primary }]}>Ver Comprobante</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: colors.success }]}
                onPress={() => {
                  Alert.alert('Pago aprobado', 'Se actualizará el estado del pedido/cuota.');
                  setSelectedPayment(null);
                  setRejectionReason('');
                }}
              >
                <Ionicons name="checkmark-circle" size={20} color={colors.white} />
                <Text style={styles.modalButtonText}>Aprobar Pago</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: colors.danger }]}
                onPress={() => {
                  Alert.alert('Pago rechazado', `Motivo: ${rejectionReason || 'Sin motivo'}.`);
                  setSelectedPayment(null);
                  setRejectionReason('');
                }}
              >
                <Ionicons name="close-circle" size={20} color={colors.white} />
                <Text style={styles.modalButtonText}>Rechazar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: colors.background }]}
                onPress={() => {
                  setSelectedPayment(null);
                  setRejectionReason('');
                }}
              >
                <Text style={[styles.modalButtonText, { color: colors.textDark }]}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL: Detalle de crédito */}
      <Modal visible={!!selectedCredit} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { maxHeight: '90%' }]}>
            <View style={styles.modalHeader}>
              <Ionicons name="wallet" size={28} color={colors.primary} />
              <Text style={styles.modalTitle}>Detalle de Crédito</Text>
            </View>
            <Text style={styles.modalSubtitle}>
              {selectedCredit?.clientName || selectedCredit?.clienteNombre}
            </Text>

            <View style={styles.detailGrid}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Orden</Text>
                <Text style={styles.detailValue}>{selectedCredit?.orderCode || selectedCredit?.id}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Saldo pendiente</Text>
                <Text style={[styles.detailValue, styles.detailTotal]}>
                  ${(selectedCredit?.saldoPendiente ?? selectedCredit?.total ?? 0).toFixed(2)}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Estado</Text>
                <Text style={styles.detailValue}>{selectedCredit?.status}</Text>
              </View>
            </View>

            <ScrollView style={styles.installmentsScroll}>
              <Text style={styles.installmentsTitle}>Cuotas</Text>
              {(selectedCredit?.installments || []).map((installment) => (
                <View key={installment.id || installment.number} style={styles.installmentCard}>
                  <View style={styles.installmentHeader}>
                    <Text style={styles.installmentNumber}>Cuota #{installment.number || installment.numero}</Text>
                    <Text style={styles.installmentAmount}>
                      ${(installment.amount ?? installment.monto ?? 0).toFixed(2)}
                    </Text>
                  </View>
                  <Text style={styles.installmentStatus}>{installment.status}</Text>
                  <TouchableOpacity
                    style={styles.markButton}
                    onPress={() => {
                      Alert.alert('Cuota marcada', 'Registro manual de pago (mock).');
                    }}
                  >
                    <Ionicons name="checkmark" size={16} color={colors.primary} />
                    <Text style={styles.markButtonText}>Marcar pagada</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

            <View style={styles.inputGroup}>
              <TextInput
                style={styles.input}
                placeholder="Nuevo cupo de crédito"
                keyboardType="numeric"
                value={newLimit}
                onChangeText={setNewLimit}
              />
              <TextInput
                style={[styles.input, { height: 80 }]}
                placeholder="Comentario sobre el cambio"
                value={comment}
                onChangeText={setComment}
                multiline
              />
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: colors.primary }]}
                onPress={() => {
                  Alert.alert('Cupo actualizado', 'Se enviará la solicitud al backend.');
                }}
              >
                <Ionicons name="create" size={20} color={colors.white} />
                <Text style={styles.modalButtonText}>Editar Cupo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: colors.background }]}
                onPress={() => {
                  setSelectedCredit(null);
                  setNewLimit('');
                  setComment('');
                }}
              >
                <Text style={[styles.modalButtonText, { color: colors.textDark }]}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* FAB para Solicitudes */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('SupervisorSolicitudes')}
      >
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          style={styles.fabGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Ionicons name="person-add-outline" size={28} color={colors.white} />
        </LinearGradient>
      </TouchableOpacity>
    </View >
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    borderRadius: 32,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 4,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  segmentButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  segmentButtonActive: {
    backgroundColor: colors.primary,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textMuted,
    marginLeft: 6,
  },
  segmentTextActive: {
    color: colors.white,
  },
  segmentBadge: {
    marginLeft: 6,
    backgroundColor: colors.danger,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    minWidth: 22,
    alignItems: 'center',
  },
  segmentBadgeActive: {
    backgroundColor: colors.white,
  },
  segmentBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.white,
  },
  segmentBadgeTextActive: {
    color: colors.primary,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: '700',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  filterChip: {
    borderWidth: 1.5,
    borderColor: colors.borderSoft,
    borderRadius: 25,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginRight: 10,
    backgroundColor: colors.white,
  },
  filterChipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    color: colors.textDark,
    fontWeight: '600',
  },
  filterTextActive: {
    color: colors.white,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.darkText,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textDark,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    maxWidth: 280,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 24,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.darkText,
    marginLeft: 12,
  },
  modalSubtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 20,
    fontWeight: '600',
  },
  detailGrid: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSoft,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.textMuted,
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 14,
    color: colors.darkText,
    fontWeight: '700',
    maxWidth: '60%',
    textAlign: 'right',
  },
  detailTotal: {
    fontSize: 18,
    color: colors.primary,
  },
  input: {
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    color: colors.textDark,
    fontSize: 14,
  },
  inputGroup: {
    marginBottom: 12,
  },
  installmentsScroll: {
    maxHeight: 250,
    marginBottom: 16,
  },
  installmentsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.darkText,
    marginBottom: 12,
  },
  installmentCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.borderSoft,
  },
  installmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  installmentNumber: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.darkText,
  },
  installmentAmount: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary,
  },
  installmentStatus: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 8,
  },
  markButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: colors.primary + '15',
  },
  markButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
    marginLeft: 4,
  },
  modalActions: {
    marginTop: 8,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    marginBottom: 10,
  },
  modalButtonText: {
    color: colors.white,
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.5,
    marginLeft: 8,
  },
});

export default SupervisorCobrosScreen;
