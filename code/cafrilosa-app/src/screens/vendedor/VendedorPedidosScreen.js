import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, TextInput, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SellerOrderCard from "../../components/vendedor/SellerOrderCard";
import SellerOrderDetailModal from "../../components/vendedor/SellerOrderDetailModal";

// TODO: conectar con backend aquí para obtener pedidos reales del vendedor
const INITIAL_ORDERS = [
  {
    id: "PED-2024-001",
    client: { id: "cli-001", name: "Supermercado El Ahorro" },
    date: "2024-11-10T10:30:00Z",
    total: 508.8,
    status: "En Camino",
    items: [
      { product: { id: "prod1", name: "Chorizo Premium", price: 12.3 }, quantity: 10 },
      { product: { id: "prod2", name: "Jamón Serrano", price: 25.5 }, quantity: 8 },
    ],
  },
  {
    id: "PED-2024-002",
    client: { id: "cli-002", name: "Minimarket La Esquina" },
    date: "2024-11-09T15:15:00Z",
    total: 230.5,
    status: "Entregado",
    items: [
      { product: { id: "prod3", name: "Salchicha Frankfurt", price: 3.2 }, quantity: 20 },
      { product: { id: "prod4", name: "Pack Parrillero", price: 18.5 }, quantity: 5 },
    ],
  },
];

const VendedorPedidosScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderModalVisible, setOrderModalVisible] = useState(false);

  useEffect(() => {
    if (route?.params?.newOrder) {
      const incoming = route.params.newOrder;
      setOrders((prev) => {
        const exists = prev.some((item) => item.id === incoming.id);
        if (exists) return prev;
        return [incoming, ...prev];
      });
      navigation.setParams?.({ newOrder: undefined });
    }
  }, [route?.params?.newOrder]);

  const filteredOrders = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return orders;
    return orders.filter(
      (order) =>
        order.id.toLowerCase().includes(term) ||
        order.client.name.toLowerCase().includes(term) ||
        order.status.toLowerCase().includes(term)
    );
  }, [orders, searchTerm]);

  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top + 8 }]}> 
      <View style={styles.header}>
        <Text style={styles.title}>Pedidos</Text>
      </View>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar pedido..."
          placeholderTextColor="#9CA3AF"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>

      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <SellerOrderCard
            order={item}
            onPress={() => {
              setSelectedOrder(item);
              setOrderModalVisible(true);
            }}
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay pedidos registrados.</Text>}
      />

      <SellerOrderDetailModal
        visible={orderModalVisible}
        order={selectedOrder}
        onClose={() => setOrderModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  searchBar: {
    marginHorizontal: 20,
    backgroundColor: "#F3F4F6",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 16,
  },
  searchInput: {
    fontSize: 14,
    color: "#111827",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  emptyText: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 40,
  },
});

export default VendedorPedidosScreen;
