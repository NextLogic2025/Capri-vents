import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import UiDeliveryCard from '../../components/ui/UiDeliveryCard';
import UiSearchBar from '../../components/ui/UiSearchBar';
import UiTabs from '../../components/ui/UiTabs';

// TODO: conectar con backend aquí
const allDeliveries = [
  { id: '1', deliveryId: 'ENT-101', orderCode: 'CF-7891', status: 'En Camino', statusVariant: 'info', time: '10:30 AM - 11:30 AM', clientName: 'Restaurante Sabor Andino', contactName: 'Maria Rojas', address: 'Av. Principal 123', itemsCount: 5, total: 280.50, driverName: 'Carlos Paz' },
  { id: '2', deliveryId: 'ENT-102', orderCode: 'CF-7890', status: 'Entregado', statusVariant: 'success', time: 'Ayer 2:15 PM', clientName: 'Tienda La Esquina', contactName: 'Juan Perez', address: 'Calle Secundaria 456', itemsCount: 3, total: 150.75, driverName: 'Luis Gomez' },
  { id: '3', deliveryId: 'ENT-103', orderCode: 'CF-7892', status: 'Pendiente', statusVariant: 'warning', time: 'Mañana 9:00 AM', clientName: 'Supermercado El Ahorro', contactName: 'Ana Garcia', address: 'Av. Comercial 789', itemsCount: 12, total: 450.00, driverName: 'Carlos Paz' },
];

const TABS = [
    { key: 'todos', title: 'Todos' },
    { key: 'Pendiente', title: 'Pendientes' },
    { key: 'En Camino', title: 'En Camino' },
    { key: 'Entregado', title: 'Entregados' },
];

const SupervisorEntregasScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('todos');

  // TODO: conectar con backend aquí para búsqueda y filtrado
  const filteredDeliveries = allDeliveries.filter(delivery => {
    const matchesSearch = delivery.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || delivery.orderCode.toLowerCase().includes(searchQuery.toLowerCase()) || delivery.driverName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'todos' || delivery.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Entregas</Text>
        <UiSearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Buscar por cliente, pedido o conductor..."
        />
        <UiTabs
            tabs={TABS}
            onTabChange={(key) => setActiveTab(key)}
            style={styles.tabs}
        />
        <FlatList
          data={filteredDeliveries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <UiDeliveryCard
              {...item}
              ctaLabel="Ver Detalles"
              onPressCTA={() => navigation.navigate('SupervisorEntregaDetalle', { deliveryId: item.deliveryId })}
            />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={styles.emptyText}>No se encontraron entregas.</Text>}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    paddingVertical: 20,
  },
  tabs: {
    marginVertical: 16,
  },
  list: {
    paddingTop: 8,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#6B7280',
  },
});

export default SupervisorEntregasScreen;