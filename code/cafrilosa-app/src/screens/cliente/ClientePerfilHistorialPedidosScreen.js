import React, { useMemo, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import OrderHistoryItem from "../../components/ui/OrderHistoryItem";
import OrderDetailModal from "../../components/ui/OrderDetailModal";

const orders = [
  {
    id: "PED-2024-001",
    date: "14 de enero de 2024",
    status: "En Camino",
    items: [
      { id: "item-1", name: "Chorizo Parrillero Premium", quantity: 2, unitPrice: 12.99 },
      { id: "item-2", name: "Jamon Serrano Reserva", quantity: 1, unitPrice: 24.9 },
    ],
    address: "Av. Principal 123, Guayaquil",
    estimatedDeliveryDate: "15/1/2024",
    subtotal: 50.88,
    shippingCost: 0,
    total: 50.88,
    paymentMethod: "Tarjeta",
    tracking: [
      { label: "Pedido recibido", date: "14/1/2024, 18:00", completed: true },
      { label: "En camino", date: "15/1/2024, 09:00", completed: true },
      { label: "Entregado", date: "", completed: false },
    ],
  },
  {
    id: "PED-2024-002",
    date: "9 de enero de 2024",
    status: "Entregado",
    items: [{ id: "item-3", name: "Pack Parrillero Familiar", quantity: 1, unitPrice: 24.9 }],
    address: "Av. Principal 123, Guayaquil",
    estimatedDeliveryDate: "10/1/2024",
    subtotal: 24.9,
    shippingCost: 0,
    total: 24.9,
    paymentMethod: "Efectivo",
    tracking: [
      { label: "Pedido recibido", date: "9/1/2024, 10:00", completed: true },
      { label: "En camino", date: "9/1/2024, 13:00", completed: true },
      { label: "Entregado", date: "10/1/2024, 09:30", completed: true },
    ],
  },
];

const ClientePerfilHistorialPedidosScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailVisible, setDetailVisible] = useState(false);
  // TODO: conectar con backend aqui para obtener el historial completo de pedidos

  const filteredOrders = useMemo(() => {
    if (!search.trim()) return orders;
    return orders.filter((order) => order.id.toLowerCase().includes(search.trim().toLowerCase()));
  }, [search]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.title}>Historial de pedidos</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar pedidos..."
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {filteredOrders.map((order) => (
          <OrderHistoryItem
            key={order.id}
            order={order}
            onPress={() => {
              setSelectedOrder(order);
              setDetailVisible(true);
            }}
          />
        ))}
      </ScrollView>

      <OrderDetailModal visible={detailVisible} order={selectedOrder} onClose={() => setDetailVisible(false)} onProblemPress={() => {}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  placeholder: {
    width: 44,
    height: 44,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#111827",
  },
});

export default ClientePerfilHistorialPedidosScreen;
