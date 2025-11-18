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
} from 'react-native';
import SupervisorHeader from '../components/SupervisorHeader';
import SupervisorOrderCard from '../components/SupervisorOrderCard';
import PrimaryButton from '../../Cliente/components/PrimaryButton';
import globalStyles from '../../theme/styles';
import colors from '../../theme/colors';
import { useAppContext } from '../../context/AppContext';

const STATUS_FILTERS = ['Todos', 'Sin asignar', 'En preparación', 'En ruta', 'Entregado'];

const SupervisorPedidosScreen = () => {
  const { supervisorUser, allOrders } = useAppContext();
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
      onPress={() => setSelectedOrder(item)}
      onAssignVendorPress={() => openAssignModal(item)}
    />
  );

  return (
    <View style={globalStyles.screen}>
      <SupervisorHeader
        name={supervisorUser?.name}
        title="Bienvenido"
        subtitle="Pedidos & Entregas"
        notificationsCount={0}
        onPressNotifications={() => {
          // BACKEND: mostrar alertas logísticas o notificaciones prioritarias
        }}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[globalStyles.contentContainer, { paddingTop: 8 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.filterSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {STATUS_FILTERS.map((status) => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.filterChip,
                  statusFilter === status && styles.filterChipActive,
                ]}
                onPress={() => setStatusFilter(status)}
              >
                <Text
                  style={[
                    styles.filterText,
                    statusFilter === status && styles.filterTextActive,
                  ]}
                >
                  {status}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
            {zones.map((zone) => (
              <TouchableOpacity
                key={zone}
                style={[
                  styles.filterChip,
                  zoneFilter === zone && styles.filterChipActive,
                ]}
                onPress={() => setZoneFilter(zone)}
              >
                <Text
                  style={[
                    styles.filterText,
                    zoneFilter === zone && styles.filterTextActive,
                  ]}
                >
                  {zone}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <FlatList
          data={filteredOrders}
          keyExtractor={(item) => item.id || item.code || JSON.stringify(item)}
          renderItem={renderOrder}
          scrollEnabled={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No hay pedidos que coincidan con los filtros.</Text>
          }
        />
      </ScrollView>

      <Modal visible={!!assignOrder} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Asignar vendedor</Text>
            <Text style={styles.modalSubtitle}>
              Zona: {assignOrder?.zone || assignOrder?.zona || 'General'}
            </Text>
            {vendorMocks.map((vendor) => (
              <TouchableOpacity
                key={vendor.id}
                style={[
                  styles.vendorRow,
                  selectedVendor?.id === vendor.id && styles.vendorRowSelected,
                ]}
                onPress={() => setSelectedVendor(vendor)}
              >
                <View>
                  <Text style={styles.vendorName}>{vendor.name}</Text>
                  <Text style={styles.vendorMeta}>
                    Zona {vendor.zone} · {vendor.pedidosHoy} pedidos hoy
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
            <PrimaryButton title="Confirmar asignación" onPress={confirmAssignment} />
            <PrimaryButton
              title="Cerrar"
              onPress={() => setAssignOrder(null)}
              style={{ marginTop: 8 }}
            />
          </View>
        </View>
      </Modal>

      <Modal visible={!!selectedOrder} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalle del pedido</Text>
            <Text style={styles.modalSubtitle}>{selectedOrder?.code}</Text>
            <Text>N° Cliente: {selectedOrder?.clientName || selectedOrder?.clienteNombre}</Text>
            <Text>Zona: {selectedOrder?.zone || selectedOrder?.zona}</Text>
            <Text>
              Vendedor: {selectedOrder?.assignedVendorName || selectedOrder?.assignedVendor || 'Sin asignar'}
            </Text>
            <Text>Método pago: {selectedOrder?.paymentMethod || selectedOrder?.metodoPago}</Text>
            <Text>Total: $ {(selectedOrder?.total ?? selectedOrder?.amount ?? 0).toFixed(2)}</Text>
            <Text>Estado: {selectedOrder?.status || selectedOrder?.estadoPedido}</Text>
            <View style={{ marginTop: 12 }}>
              <PrimaryButton
                title="Actualizar estado logística"
                onPress={() => {
                  // BACKEND: actualizar estado logístico del pedido
                  Alert.alert('Actualizado', 'Estado actualizado en el backend (mock).');
                }}
              />
              <PrimaryButton
                title="Cerrar"
                onPress={() => setSelectedOrder(null)}
                style={{ marginTop: 8 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  filterSection: {
    marginBottom: 14,
  },
  filterChip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginRight: 10,
  },
  filterChipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    color: colors.textDark,
  },
  filterTextActive: {
    color: colors.white,
  },
  emptyText: {
    marginTop: 20,
    color: colors.textMuted,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 18,
    maxHeight: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 12,
  },
  vendorRow: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 8,
  },
  vendorRowSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '11',
  },
  vendorName: {
    fontWeight: '700',
    color: colors.textDark,
  },
  vendorMeta: {
    fontSize: 12,
    color: colors.textMuted,
  },
});

export default SupervisorPedidosScreen;
