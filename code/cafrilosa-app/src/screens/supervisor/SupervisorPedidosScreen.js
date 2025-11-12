import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import UiOrderCard from '../../components/ui/UiOrderCard';
import UiSearchBar from '../../components/ui/UiSearchBar';
import UiTabs from '../../components/ui/UiTabs';

// TODO: conectar con backend aquí
const allOrders = [
  { id: '1', orderId: 'CF-7892', clientName: 'Supermercado El Ahorro', date: 'hace 15 minutos', total: 450.00, status: 'Pendiente', statusVariant: 'warning' },
  { id: '2', orderId: 'CF-7891', clientName: 'Restaurante Sabor Andino', date: 'hace 1 hora', total: 280.50, status: 'En Camino', statusVariant: 'info' },
  { id: '3', orderId: 'CF-7890', clientName: 'Tienda La Esquina', date: 'ayer', total: 150.75, status: 'Entregado', statusVariant: 'success' },
  { id: '4', orderId: 'CF-7889', clientName: 'Hotel Plaza', date: 'ayer', total: 850.00, status: 'Cancelado', statusVariant: 'danger' },
  { id: '5', orderId: 'CF-7888', clientName: 'Supermercado El Ahorro', date: 'hace 2 días', total: 320.00, status: 'Entregado', statusVariant: 'success' },
];

const TABS = [
    { key: 'todos', title: 'Todos' },
    { key: 'Pendiente', title: 'Pendientes' },
    { key: 'En Camino', title: 'En Camino' },
    { key: 'Entregado', title: 'Entregados' },
];

const SupervisorPedidosScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('todos');

  // TODO: conectar con backend aquí para búsqueda y filtrado
  const filteredOrders = allOrders.filter(order => {
    const matchesSearch = order.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || order.orderId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'todos' || order.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Pedidos</Text>
        <UiSearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Buscar por cliente o N° de pedido..."
        />
        <UiTabs
            tabs={TABS}
            onTabChange={(key) => setActiveTab(key)}
            style={styles.tabs}
        />
        <FlatList
          data={filteredOrders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <UiOrderCard
              {...item}
              onPress={() => navigation.navigate('SupervisorPedidoDetalle', { orderId: item.orderId })}
            />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={styles.emptyText}>No se encontraron pedidos.</Text>}
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

export default SupervisorPedidosScreen;