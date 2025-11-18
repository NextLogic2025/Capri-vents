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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../../theme/colors';
import globalStyles from '../../theme/styles';
import { useAppContext } from '../../context/AppContext';
import SectionCard from '../../Cliente/components/SectionCard';
import PrimaryButton from '../../Cliente/components/PrimaryButton';
import EmptyState from '../../Cliente/components/EmptyState';
import VendedorOrderCard from '../components/VendedorOrderCard';
import VendedorHeader from '../components/VendedorHeader';

const FILTERS = [
  { key: 'HOY', label: 'Hoy' },
  { key: 'PENDIENTES', label: 'Pendientes' },
  { key: 'ENTREGADOS', label: 'Entregados' },
];

const formatCurrency = (value = 0) => {
  const amount = Number(value) || 0;
  return amount.toFixed(2);
};

const VendedorPedidosScreen = () => {
  const navigation = useNavigation();
  const { vendorAssignedOrders = [], vendorUser } = useAppContext();
  const [filter, setFilter] = useState('PENDIENTES');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailVisible, setDetailVisible] = useState(false);
  const [cashModalVisible, setCashModalVisible] = useState(false);
  const [cashAmount, setCashAmount] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const todayISO = new Date().toISOString().split('T')[0];

  const filteredOrders = useMemo(() => {
    return vendorAssignedOrders.filter((order) => {
      const status = (order.status || order.estadoPedido || '').toUpperCase();
      if (filter === 'HOY') {
        return (order.date || order.fecha || '').startsWith(todayISO);
      }
      if (filter === 'PENDIENTES') {
        return status !== 'ENTREGADO' && status !== 'ENTREGADA';
      }
      if (filter === 'ENTREGADOS') {
        return status === 'ENTREGADO' || status === 'ENTREGADA';
      }
      return true;
    });
  }, [vendorAssignedOrders, filter, todayISO]);

  const resumen = useMemo(() => {
    const total = vendorAssignedOrders.length;
    const pendientes = vendorAssignedOrders.filter((order) => {
      const status = (order.status || order.estadoPedido || '').toUpperCase();
      return status !== 'ENTREGADO' && status !== 'ENTREGADA';
    }).length;
    const entregados = total - pendientes;
    return { total, pendientes, entregados };
  }, [vendorAssignedOrders]);

  const openDetail = (order) => {
    setSelectedOrder(order);
    setDetailVisible(true);
    setCashAmount(formatCurrency(order?.total));
    setInvoiceNumber('');
  };

  const closeDetail = () => {
    setDetailVisible(false);
    setSelectedOrder(null);
  };

  const openCashModal = () => {
    if (!selectedOrder) return;
    setCashAmount(formatCurrency(selectedOrder.total));
    setCashModalVisible(true);
  };

  const closeCashModal = () => setCashModalVisible(false);

  const handleViewReceipt = () => {
    // BACKEND: aqui se abriria la imagen del comprobante de transferencia.
    Alert.alert('Comprobante', 'Se mostraria el comprobante cargado por el cliente.');
  };

  const handleUploadInvoice = () => {
    // BACKEND: aqui se subiria la foto o archivo de la factura.
    Alert.alert('Subir factura', 'Se simula carga de imagen. // BACKEND: subir archivo');
  };

  const handleConfirmCash = () => {
    if (!selectedOrder) return;
    // BACKEND: registrar cobro en efectivo y actualizar estados del pedido.
    console.log('Registrar cobro en efectivo', {
      orderId: selectedOrder.id,
      amount: cashAmount,
      invoiceNumber,
    });
    Alert.alert('Cobro registrado', 'Se registro el cobro en efectivo.');
    setCashModalVisible(false);
    setDetailVisible(false);
    setSelectedOrder(null);
  };

  const goToCredits = () => {
    // BACKEND: podria navegar al detalle del plan en otra pantalla
    navigation.navigate('CobrosCreditos');
    setDetailVisible(false);
  };

  const renderFilterChips = () => (
    <View style={styles.filterRow}>
      {FILTERS.map((item) => {
        const active = filter === item.key;
        return (
          <TouchableOpacity
            key={item.key}
            style={[styles.chip, active && styles.chipActive]}
            onPress={() => setFilter(item.key)}
          >
            <Text style={[styles.chipText, active && styles.chipTextActive]}>{item.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContent}>
      <SectionCard title="Resumen diario">
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{resumen.total}</Text>
            <Text style={styles.statLabel}>Asignados</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{resumen.pendientes}</Text>
            <Text style={styles.statLabel}>Pendientes</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{resumen.entregados}</Text>
            <Text style={styles.statLabel}>Entregados</Text>
          </View>
        </View>
        {renderFilterChips()}
      </SectionCard>
    </View>
  );

  const renderOrderDetail = () => {
    if (!selectedOrder) return null;
    const paymentMethod = (selectedOrder.paymentMethod || '').toUpperCase();
    const isCash = paymentMethod === 'EFECTIVO';
    const isTransfer = paymentMethod.includes('TRANSFER');
    const isCredit = paymentMethod.includes('CREDITO');

    return (
      <Modal visible={detailVisible} animationType="slide" transparent onRequestClose={closeDetail}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedOrder.code || selectedOrder.id}</Text>
              <TouchableOpacity onPress={closeDetail} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>x</Text>
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <SectionCard title="Cliente">
                <Text style={styles.detailLabel}>Nombre</Text>
                <Text style={styles.detailValue}>{selectedOrder.clientName}</Text>
                <Text style={styles.detailLabel}>Telefono</Text>
                <Text style={styles.detailValue}>{selectedOrder.clientPhone}</Text>
                <Text style={styles.detailLabel}>Direccion</Text>
                <Text style={styles.detailValue}>{selectedOrder.clientAddress}</Text>
              </SectionCard>
              <SectionCard title="Productos">
                {Array.isArray(selectedOrder.items) &&
                  selectedOrder.items.map((item) => (
                    <View style={styles.productRow} key={item.productId || item.name}>
                      <View>
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.productMeta}>
                          {item.presentation}  -  {item.quantity} uds
                        </Text>
                      </View>
                      <Text style={styles.productAmount}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </Text>
                    </View>
                  ))}
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalValue}>${formatCurrency(selectedOrder.total)}</Text>
                </View>
              </SectionCard>
              <SectionCard title="Pago & estado">
                <Text style={styles.detailLabel}>Metodo de pago</Text>
                <Text style={styles.detailValue}>{selectedOrder.paymentMethod}</Text>
                <Text style={styles.detailLabel}>Estado del pedido</Text>
                <Text style={styles.detailValue}>{selectedOrder.status}</Text>
                <Text style={styles.detailLabel}>Estado del pago</Text>
                <Text style={styles.detailValue}>{selectedOrder.paymentStatus}</Text>
                {isTransfer && (
                  <PrimaryButton
                    title="Ver comprobante"
                    style={styles.modalButton}
                    onPress={handleViewReceipt}
                  />
                )}
                {isCash && (
                  <PrimaryButton
                    title="Registrar cobro en efectivo"
                    style={styles.modalButton}
                    onPress={openCashModal}
                  />
                )}
                {isCredit && (
                  <TouchableOpacity style={styles.secondaryButton} onPress={goToCredits}>
                    <Text style={styles.secondaryButtonText}>Ver plan de cuotas</Text>
                  </TouchableOpacity>
                )}
              </SectionCard>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  const renderCashModal = () => {
    if (!selectedOrder) return null;
    return (
      <Modal
        visible={cashModalVisible}
        animationType="fade"
        transparent
        onRequestClose={closeCashModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.cashModalCard}>
            <Text style={styles.modalTitle}>Registrar cobro en efectivo</Text>
            <Text style={styles.detailLabel}>Monto recibido</Text>
            <TextInput
              keyboardType="decimal-pad"
              style={styles.input}
              value={cashAmount}
              onChangeText={setCashAmount}
            />
            <Text style={styles.detailLabel}>Numero de factura</Text>
            <TextInput
              placeholder="Ej. F001-12345"
              style={styles.input}
              value={invoiceNumber}
              onChangeText={setInvoiceNumber}
            />
            <TouchableOpacity style={styles.secondaryButton} onPress={handleUploadInvoice}>
              <Text style={styles.secondaryButtonText}>Subir foto de factura</Text>
            </TouchableOpacity>
            <PrimaryButton title="Confirmar" onPress={handleConfirmCash} style={{ marginTop: 12 }} />
            <TouchableOpacity onPress={closeCashModal} style={styles.modalCancel}>
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.screen}>
      <VendedorHeader
        name={vendorUser?.name}
        subtitle="Pedidos"
        notificationsCount={resumen.pendientes}
      />
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id || item.code}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => <VendedorOrderCard order={item} onPress={() => openDetail(item)} />}
        ListEmptyComponent={
          <EmptyState
            title="Sin pedidos"
            subtitle="No tienes pedidos asignados con este filtro."
            iconName="clipboard-outline"
          />
        }
      />
      {renderOrderDetail()}
      {renderCashModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingBottom: 120,
    paddingHorizontal: 16,
  },
  headerContent: {
    paddingTop: 16,
  },
  gradientHeader: {
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textDark,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 4,
  },
  filterRow: {
    flexDirection: 'row',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    color: colors.textDark,
    fontWeight: '600',
  },
  chipTextActive: {
    color: colors.white,
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
    maxHeight: '90%',
    backgroundColor: colors.white,
    borderRadius: 26,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 14,
    backgroundColor: colors.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: colors.textDark,
    fontWeight: '700',
  },
  detailLabel: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 8,
  },
  detailValue: {
    fontSize: 14,
    color: colors.textDark,
    fontWeight: '600',
    marginTop: 2,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  productName: {
    fontWeight: '600',
    color: colors.textDark,
  },
  productMeta: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },
  productAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textDark,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textDark,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  modalButton: {
    marginTop: 12,
  },
  secondaryButton: {
    ...globalStyles.secondaryButton,
    marginTop: 12,
  },
  secondaryButtonText: {
    ...globalStyles.secondaryButtonText,
  },
  cashModalCard: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 22,
    padding: 20,
  },
  input: {
    ...globalStyles.input,
    marginTop: 6,
  },
  modalCancel: {
    marginTop: 10,
    alignItems: 'center',
  },
  modalCancelText: {
    color: colors.textLight,
    fontWeight: '600',
  },
});

export default VendedorPedidosScreen;
