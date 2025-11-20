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
} from 'react-native';
import ScreenHeader from '../../Cliente/components/ScreenHeader';
import SupervisorPaymentCard from '../components/SupervisorPaymentCard';
import SupervisorCreditCard from '../components/SupervisorCreditCard';
import PrimaryButton from '../../Cliente/components/PrimaryButton';
import globalStyles from '../../theme/styles';
import colors from '../../theme/colors';
import { useAppContext } from '../../context/AppContext';

const PAYMENT_TYPES = ['Todos', 'Transferencia', 'Efectivo'];

const SupervisorCobrosScreen = () => {
  const {
    supervisorUser,
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

  return (
    <View style={styles.screen}>
      {/* Header rojo genérico solo con el título */}
      <View style={styles.headerWrapper}>
        <ScreenHeader
          title="Cobros"
          style={styles.headerCard}
        />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          globalStyles.contentContainer,
          styles.contentContainer,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Segmento Pagos / Créditos */}
        <View style={styles.segmentRow}>
          {['pagos', 'creditos'].map((segment) => (
            <TouchableOpacity
              key={segment}
              style={[
                styles.segmentButton,
                activeSegment === segment && styles.segmentButtonActive,
              ]}
              onPress={() => setActiveSegment(segment)}
            >
              <Text
                style={[
                  styles.segmentText,
                  activeSegment === segment && styles.segmentTextActive,
                ]}
              >
                {segment === 'pagos' ? 'Pagos por validar' : 'Créditos'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeSegment === 'pagos' ? (
          <>
            {/* Filtro por tipo de pago */}
            <View style={styles.chipRow}>
              {PAYMENT_TYPES.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.chip,
                    paymentFilter === type && styles.chipActive,
                  ]}
                  onPress={() => setPaymentFilter(type)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      paymentFilter === type && styles.chipTextActive,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
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
                <Text style={styles.emptyText}>No hay pagos pendientes.</Text>
              }
              scrollEnabled={false}
            />
          </>
        ) : (
          <>
            {/* Resumen de créditos */}
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Créditos vigentes</Text>
              <Text style={styles.summaryValue}>{creditStats.totalVigentes}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Deuda vencida</Text>
              <Text style={styles.summaryValue}>
                $ {creditStats.deudaVencida.toFixed(2)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Clientes en mora</Text>
              <Text style={styles.summaryValue}>{creditStats.enMoraCount}</Text>
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
                <Text style={styles.emptyText}>No hay créditos registrados.</Text>
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
            <Text style={styles.modalTitle}>Detalle de pago</Text>
            <Text style={styles.modalSubtitle}>{selectedPayment?.pedidoId}</Text>
            <Text>Cliente: {selectedPayment?.clienteNombre}</Text>
            <Text>Método: {selectedPayment?.tipo}</Text>
            <Text>Monto: $ {(selectedPayment?.monto ?? 0).toFixed(2)}</Text>
            <Text>Fecha registro: {selectedPayment?.fechaRegistro}</Text>
            {selectedPayment?.vendedorNombre ? (
              <Text>Vendedor: {selectedPayment.vendedorNombre}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="Motivo de rechazo"
              value={rejectionReason}
              onChangeText={setRejectionReason}
              multiline
            />
            <PrimaryButton
              title="Ver comprobante"
              onPress={() => {
                // BACKEND: abrir imagen/PDF del comprobante.
                Alert.alert('Comprobante', 'Vista previa comprobante (mock).');
              }}
              style={{ marginTop: 8 }}
            />
            <PrimaryButton
              title="Aprobar pago"
              onPress={() => {
                // BACKEND: actualizar estado del pago y del pedido/crédito.
                Alert.alert('Pago aprobado', 'Se actualizará el estado del pedido/cuota.');
                setSelectedPayment(null);
                setRejectionReason('');
              }}
              style={{ marginTop: 8 }}
            />
            <PrimaryButton
              title="Rechazar pago"
              onPress={() => {
                Alert.alert(
                  'Pago rechazado',
                  `El cliente/vendedor será notificado. Motivo: ${
                    rejectionReason || 'Sin motivo'
                  }.`
                );
                setSelectedPayment(null);
                setRejectionReason('');
              }}
              style={{ marginTop: 8 }}
            />
            <PrimaryButton
              title="Cerrar"
              onPress={() => {
                setSelectedPayment(null);
                setRejectionReason('');
              }}
              style={{ marginTop: 8 }}
            />
          </View>
        </View>
      </Modal>

      {/* MODAL: Detalle de crédito */}
      <Modal visible={!!selectedCredit} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { maxHeight: '90%' }]}>
            <Text style={styles.modalTitle}>Detalle de crédito</Text>
            <Text style={styles.modalSubtitle}>
              {selectedCredit?.clientName || selectedCredit?.clienteNombre}
            </Text>
            <Text>Orden: {selectedCredit?.orderCode || selectedCredit?.id}</Text>
            <Text>
              Deuda pendiente: ${' '}
              {(
                selectedCredit?.saldoPendiente ?? selectedCredit?.total ?? 0
              ).toFixed(2)}
            </Text>
            <Text>Estado: {selectedCredit?.status}</Text>

            <Text style={{ marginTop: 12, fontWeight: '700' }}>Cuotas</Text>
            {(selectedCredit?.installments || []).map((installment) => (
              <View
                key={installment.id || installment.number}
                style={styles.installmentRow}
              >
                <View>
                  <Text style={styles.installmentTitle}>
                    Cuota #{installment.number || installment.numero}
                  </Text>
                  <Text style={styles.installmentSubtitle}>
                    {installment.status} · $
                    {(
                      installment.amount ?? installment.monto ?? 0
                    ).toFixed(2)}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    // BACKEND: marcar cuota como pagada manualmente.
                    Alert.alert('Cuota marcada', 'Registro manual de pago (mock).');
                  }}
                >
                  <Text style={styles.markLink}>Marcar como pagada</Text>
                </TouchableOpacity>
              </View>
            ))}

            <TextInput
              style={styles.input}
              placeholder="Nuevo cupo"
              keyboardType="numeric"
              value={newLimit}
              onChangeText={setNewLimit}
            />
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Comentario"
              value={comment}
              onChangeText={setComment}
              multiline
            />
            <PrimaryButton
              title="Editar cupo"
              onPress={() => {
                // BACKEND: API para actualizar cupo de crédito.
                Alert.alert('Cupo actualizado', 'Se enviará la solicitud al backend.');
              }}
            />
            <PrimaryButton
              title="Cerrar"
              onPress={() => {
                setSelectedCredit(null);
                setNewLimit('');
                setComment('');
              }}
              style={{ marginTop: 8 }}
            />
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
  headerWrapper: {
    // sin padding para que el header ocupe todo el ancho
  },
  headerCard: {
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  contentContainer: {
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  segmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  segmentButton: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 10,
    marginHorizontal: 6,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  segmentButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
  },
  segmentTextActive: {
    color: colors.white,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  chip: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: colors.white,
  },
  chipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  chipText: {
    fontSize: 13,
    color: colors.textDark,
  },
  chipTextActive: {
    color: colors.white,
  },
  emptyText: {
    color: colors.textMuted,
    textAlign: 'center',
    marginVertical: 32,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  summaryLabel: {
    color: colors.textMuted,
  },
  summaryValue: {
    color: colors.textDark,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 18,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 12,
  },
  input: {
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    color: colors.textDark,
  },
  installmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  installmentTitle: {
    fontWeight: '600',
    color: colors.textDark,
  },
  installmentSubtitle: {
    fontSize: 12,
    color: colors.textMuted,
  },
  markLink: {
    color: colors.primary,
    fontWeight: '600',
  },
});

export default SupervisorCobrosScreen;
