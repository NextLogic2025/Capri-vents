import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import SupervisorOrderCard from '../components/SupervisorOrderCard';
import PrimaryButton from '../../components/PrimaryButton';
import colors from '../../theme/colors';
import { useAppContext } from '../../context/AppContext';

const STATUS_FILTERS = ['Todos', 'Sin asignar', 'En preparación', 'En ruta', 'Entregado'];

const SupervisorPedidosScreen = ({ navigation }) => {
  const { allOrders } = useAppContext();
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [zoneFilter, setZoneFilter] = useState('Todas');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [assignOrder, setAssignOrder] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);

  const zones = useMemo(() => {
    const uniqueZones = new Set(
      allOrders.map((order) => order.zone || order.zona || 'General')
    );
    return ['Todas', ...Array.from(uniqueZones)];
  }, [allOrders]);

  const vendorMocks = [
    { id: 'vend-002', name: 'Andrés Cuevas', zone: 'Loja Norte', pedidosHoy: 5 },
    { id: 'vend-003', name: 'Silvia Paredes', zone: 'Quito Sur', pedidosHoy: 3 },
    { id: 'vend-004', name: 'Daniel Mora', zone: 'Guayaquil Centro', pedidosHoy: 7 },
  ];

  const filteredOrders = useMemo(() => {
    return allOrders.filter((order) => {
      const status = (order.status || order.estadoPedido || '').toString().toLowerCase();
      const zoneValue = (order.zone || order.zona || 'General').toString();
      const isSinAsignar = !order.assignedVendorId && !order.assignedVendorName;

      const matchesStatus =
        statusFilter === 'Todos'
          ? true
          : statusFilter === 'Sin asignar'
            ? isSinAsignar
            : status.includes(statusFilter.toLowerCase());

      const matchesZone = zoneFilter === 'Todas' ? true : zoneValue === zoneFilter;

      return matchesStatus && matchesZone;
    });
  }, [allOrders, statusFilter, zoneFilter]);

  const openAssignModal = (order) => {
    setAssignOrder(order);
    setSelectedVendor(null);
  };

  const confirmAssignment = () => {
    if (!selectedVendor || !assignOrder) return;
    Alert.alert('Vendedor asignado', `Se asignará ${selectedVendor.name} a ${assignOrder.code}`, [
      {
        text: 'Aceptar',
        onPress: () => {
          // BACKEND: asignar vendedor real mediante API (orderId, vendorId).
          setAssignOrder(null);
          setSelectedVendor(null);
        },
      },
    ]);
  };

  const renderOrder = ({ item }) => (
    <SupervisorOrderCard
      order={item}
      onPress={() => navigation.navigate('SupervisorDetallePedido', { order: item })}
      onAssignVendorPress={() => openAssignModal(item)}
    />
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
            <Text style={styles.headerTitle}>Pedidos y Entregas</Text>
            <Text style={styles.headerSubtitle}>
              {filteredOrders.length} pedido{filteredOrders.length !== 1 ? 's' : ''}
              {statusFilter !== 'Todos' && ` · ${statusFilter}`}
            </Text>
          </View>
          <View style={styles.headerIcon}>
            <Ionicons name="cube" size={32} color={colors.white} />
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Filtros de Estado */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>
            <Ionicons name="funnel-outline" size={14} color={colors.textMuted} /> Estado
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {STATUS_FILTERS.map((status) => {
              const isActive = statusFilter === status;
              return (
                <TouchableOpacity
                  key={status}
                  style={[styles.filterChip, isActive && styles.filterChipActive]}
                  onPress={() => setStatusFilter(status)}
                >
                  <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                    {status}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Filtros de Zona */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>
            <Ionicons name="location-outline" size={14} color={colors.textMuted} /> Zona
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {zones.map((zone) => {
              const isActive = zoneFilter === zone;
              return (
                <TouchableOpacity
                  key={zone}
                  style={[styles.filterChip, isActive && styles.filterChipActive]}
                  onPress={() => setZoneFilter(zone)}
                >
                  <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                    {zone}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Lista de Pedidos */}
        <FlatList
          data={filteredOrders}
          keyExtractor={(item) => item.id || item.code || JSON.stringify(item)}
          renderItem={renderOrder}
          scrollEnabled={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="cube-outline" size={64} color={colors.textMuted} />
              <Text style={styles.emptyTitle}>No hay pedidos</Text>
              <Text style={styles.emptyText}>
                No se encontraron pedidos que coincidan con los filtros seleccionados.
              </Text>
            </View>
          }
        />
      </ScrollView>

      {/* MODAL: Asignar Vendedor */}
      <Modal visible={!!assignOrder} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Ionicons name="people" size={28} color={colors.primary} />
              <Text style={styles.modalTitle}>Asignar Vendedor</Text>
            </View>
            <Text style={styles.modalSubtitle}>
              Pedido: {assignOrder?.code} · Zona: {assignOrder?.zone || assignOrder?.zona || 'General'}
            </Text>

            <View style={styles.vendorList}>
              {vendorMocks.map((vendor) => {
                const isSelected = selectedVendor?.id === vendor.id;
                return (
                  <TouchableOpacity
                    key={vendor.id}
                    style={[styles.vendorRow, isSelected && styles.vendorRowSelected]}
                    onPress={() => setSelectedVendor(vendor)}
                  >
                    <View style={[
                      styles.vendorAvatar,
                      { backgroundColor: isSelected ? colors.primary : colors.primary + '20' }
                    ]}>
                      <Ionicons
                        name="person"
                        size={20}
                        color={isSelected ? colors.white : colors.primary}
                      />
                    </View>
                    <View style={styles.vendorInfo}>
                      <Text style={styles.vendorName}>{vendor.name}</Text>
                      <Text style={styles.vendorMeta}>
                        Zona {vendor.zone} · {vendor.pedidosHoy} pedidos hoy
                      </Text>
                    </View>
                    {isSelected && (
                      <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonPrimary]}
                onPress={confirmAssignment}
              >
                <Ionicons name="checkmark" size={20} color={colors.white} />
                <Text style={styles.modalButtonTextPrimary}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonSecondary]}
                onPress={() => setAssignOrder(null)}
              >
                <Text style={styles.modalButtonTextSecondary}>Cancelar</Text>
              </TouchableOpacity>
            </View>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  filterChipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  filterText: {
    fontSize: 14,
    color: colors.textDark,
    fontWeight: '600',
  },
  filterTextActive: {
    color: colors.white,
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
    gap: 12,
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.darkText,
  },
  modalSubtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 20,
    fontWeight: '600',
  },
  vendorList: {
    maxHeight: 300,
    marginBottom: 20,
  },
  vendorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.borderSoft,
    marginBottom: 12,
    backgroundColor: colors.white,
  },
  vendorRowSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '08',
  },
  vendorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  vendorInfo: {
    flex: 1,
  },
  vendorName: {
    fontWeight: '700',
    color: colors.darkText,
    fontSize: 15,
    marginBottom: 2,
  },
  vendorMeta: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '600',
  },
  detailGrid: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
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
  modalActions: {
    gap: 10,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 16,
  },
  modalButtonPrimary: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  modalButtonSecondary: {
    backgroundColor: colors.background,
    borderWidth: 1.5,
    borderColor: colors.borderSoft,
  },
  modalButtonTextPrimary: {
    color: colors.white,
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  modalButtonTextSecondary: {
    color: colors.textDark,
    fontWeight: '700',
    fontSize: 16,
  },
});

export default SupervisorPedidosScreen;
