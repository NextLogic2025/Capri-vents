import React, { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../theme/colors';
import globalStyles from '../../theme/styles';
import { useAppContext } from '../../context/AppContext';
import PrimaryButton from '../../Cliente/components/PrimaryButton';
import EmptyState from '../../Cliente/components/EmptyState';
import VendedorCobroCard from '../components/VendedorCobroCard';
import ScreenHeader from '../../Cliente/components/ScreenHeader'; // ⬅️ nuevo header

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
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [cashAmount, setCashAmount] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');

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
            clienteNombre:
              credit.clientName ||
              credit.clienteNombre ||
              'Cliente asignado',
            numeroCuota: cuota.numero || cuota.number,
            monto: cuota.amount ?? cuota.monto ?? 0,
            fechaVencimiento: cuota.dueDate || cuota.fechaVencimiento,
            estado,
            raw: cuota,
          };
        })
      )
      .filter(Boolean);
  }, [vendorAssignedCredits]);

  const renderList = useMemo(() => {
    return selectedTab === 'PEDIDOS' ? pendingCashOrders : pendingInstallments;
  }, [selectedTab, pendingCashOrders, pendingInstallments]);

  const isModalAllowed = (item) => {
    if (!item) return false;
    if (item.type === 'PEDIDO') return item.estado === 'PENDIENTE_COBRO';
    if (item.type === 'CUOTA') return ['PENDIENTE', 'VENCIDA'].includes(item.estado);
    return false;
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setCashAmount(String(item.monto ?? 0));
    setInvoiceNumber('');
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const handleConfirm = () => {
    if (!selectedItem) return;
    console.log('Cobro registrado', {
      type: selectedItem.type,
      id: selectedItem.id,
      amount: cashAmount,
      invoiceNumber,
    });
    // BACKEND: aquí se debe llamar a la API para registrar el cobro y actualizar el estado.
    Alert.alert('Cobro registrado', 'El Supervisor deberá validar este pago.');
    closeModal();
  };

  const renderModal = () => {
    if (!selectedItem) return null;
    const label = selectedItem.type === 'CUOTA' ? 'Cuota' : 'Pedido';
    return (
      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Registrar cobro en efectivo</Text>
            <Text style={styles.detailLabel}>Cliente</Text>
            <Text style={styles.detailValue}>{selectedItem.clienteNombre}</Text>
            <Text style={styles.detailLabel}>Tipo</Text>
            <Text style={styles.detailValue}>
              {label} · {selectedItem.code || selectedItem.pedidoId || selectedItem.pedidoId}
            </Text>
            <Text style={styles.detailLabel}>Monto</Text>
            <TextInput
              style={styles.input}
              keyboardType="decimal-pad"
              value={cashAmount}
              onChangeText={setCashAmount}
            />
            <Text style={styles.detailLabel}>Número de factura (opcional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. F001-12345"
              value={invoiceNumber}
              onChangeText={setInvoiceNumber}
            />
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() =>
                Alert.alert('Adjuntar foto', 'Simulación // BACKEND: subir archivo')
              }
            >
              <Text style={styles.secondaryButtonText}>Adjuntar foto de factura</Text>
            </TouchableOpacity>
            <PrimaryButton
              title="Confirmar cobro"
              onPress={handleConfirm}
              style={{ marginTop: 12 }}
            />
            <TouchableOpacity onPress={closeModal} style={styles.modalCancel}>
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const renderEmpty = () => {
    const message =
      selectedTab === 'PEDIDOS'
        ? 'No tienes pedidos pendientes de cobro.'
        : 'No tienes cuotas pendientes por ahora.';
    const icon = selectedTab === 'PEDIDOS' ? 'cart-outline' : 'calendar-outline';
    return <EmptyState title="Todo al día" subtitle={message} iconName={icon} />;
  };

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

  return (
    <View style={styles.screen}>
      {/* Header reutilizando el mismo estilo de CarritoScreen */}
      <ScreenHeader
        title="Cobros y Créditos"
        subtitle="Gestiona pagos en efectivo y cuotas de tus clientes"
      />

      <View style={styles.tabRow}>
        {renderTabButton('PEDIDOS', 'Pedidos')}
        {renderTabButton('CUOTAS', 'Cuotas')}
      </View>

      <FlatList
        data={renderList}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <VendedorCobroCard
            item={item}
            onPress={() => {
              if (isModalAllowed(item)) {
                openModal(item);
              }
            }}
          />
        )}
        ListEmptyComponent={renderEmpty()}
        showsVerticalScrollIndicator={false}
      />

      {renderModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.white,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.white,
    marginTop: 2,
  },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: colors.white,
  },
  tabButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
  },
  tabLabelActive: {
    color: colors.white,
  },
  listContent: {
    padding: 16,
    paddingBottom: 120,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalCard: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
  },
  detailLabel: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 12,
  },
  detailValue: {
    fontSize: 14,
    color: colors.textDark,
    fontWeight: '600',
  },
  input: {
    ...globalStyles.input,
    marginTop: 6,
  },
  secondaryButton: {
    ...globalStyles.secondaryButton,
    marginTop: 14,
  },
  secondaryButtonText: {
    ...globalStyles.secondaryButtonText,
  },
  modalCancel: {
    marginTop: 12,
    alignItems: 'center',
  },
  modalCancelText: {
    color: colors.textLight,
    fontWeight: '600',
  },
});

export default VendedorCobrosScreen;
