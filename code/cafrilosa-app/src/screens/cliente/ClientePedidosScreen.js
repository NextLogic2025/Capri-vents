import React, { useMemo, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import OrderSummaryCard from "../../components/ui/OrderSummaryCard";
import OrderHistoryItem from "../../components/ui/OrderHistoryItem";
import OrderDetailModal from "../../components/ui/OrderDetailModal";
import OrderProblemModal from "../../components/ui/OrderProblemModal";

const placeholderImage = require("../../assets/images/login-header-meat.png");

// TODO: conectar con backend aqui para obtener pedidos del usuario.
const orders = [
  {
    id: "PED-2024-001",
    date: "14 de enero de 2024",
    status: "En Camino",
    items: [
      {
        id: "item-1",
        name: "Chorizo Parrillero Premium",
        quantity: 2,
        unitPrice: 12.99,
        image: placeholderImage,
      },
      {
        id: "item-2",
        name: "Jamón Serrano Reserva",
        quantity: 1,
        unitPrice: 24.9,
        image: placeholderImage,
      },
    ],
    address: "Av. Principal 123, Guayaquil",
    estimatedDeliveryDate: "15/1/2024",
    subtotal: 50.88,
    shippingCost: 0,
    total: 50.88,
    paymentMethod: "Tarjeta",
    tracking: [
      { label: "Pedido Recibido", date: "14/1/2024, 18:00", completed: true },
      { label: "En Camino", date: "15/1/2024, 09:00", completed: true },
      { label: "Entregado", date: "", completed: false },
    ],
  },
  {
    id: "PED-2024-002",
    date: "9 de enero de 2024",
    status: "Entregado",
    items: [
      {
        id: "item-3",
        name: "Pack Parrillero Familiar",
        quantity: 1,
        unitPrice: 24.9,
        image: placeholderImage,
      },
    ],
    address: "Av. Principal 123, Guayaquil",
    estimatedDeliveryDate: "10/1/2024",
    subtotal: 24.9,
    shippingCost: 0,
    total: 24.9,
    paymentMethod: "Efectivo",
    tracking: [
      { label: "Pedido Recibido", date: "9/1/2024, 10:00", completed: true },
      { label: "En Camino", date: "9/1/2024, 13:00", completed: true },
      { label: "Entregado", date: "10/1/2024, 09:30", completed: true },
    ],
  },
];

const ClientePedidosScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailVisible, setDetailVisible] = useState(false);
  const [problemModalVisible, setProblemModalVisible] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);

  const inProgressCount = useMemo(() => orders.filter((order) => order.status !== "Entregado").length, []);
  const completedCount = useMemo(() => orders.filter((order) => order.status === "Entregado").length, []);

  const filteredOrders = useMemo(() => {
    if (!search.trim()) return orders;
    return orders.filter((order) => order.id.toLowerCase().includes(search.trim().toLowerCase()));
  }, [search]);

  const openOrderDetail = (order) => {
    setSelectedOrder(order);
    setDetailVisible(true);
  };

  const handleProblemPress = () => {
    setDetailVisible(false);
    setProblemModalVisible(true);
  };

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Pedidos</Text>
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

        <Text style={styles.sectionTitle}>Estado de tus pedidos</Text>
        <OrderSummaryCard inProgressCount={inProgressCount} completedCount={completedCount} />

        <Text style={[styles.sectionTitle, styles.sectionSpacing]}>Historial de Pedidos</Text>
        {filteredOrders.map((order) => (
          <OrderHistoryItem key={order.id} order={order} onPress={() => openOrderDetail(order)} />
        ))}
      </ScrollView>

      <OrderDetailModal
        visible={detailVisible}
        order={selectedOrder}
        onClose={() => setDetailVisible(false)}
        onProblemPress={handleProblemPress}
      />

      <OrderProblemModal
        visible={problemModalVisible}
        onClose={() => setProblemModalVisible(false)}
        onSelectProblem={(problemKey, problemLabel) => {
          setSelectedProblem(problemKey);
          setProblemModalVisible(false);
          setDetailVisible(false);
          if (selectedOrder) {
            navigation.navigate("ClienteTicketSoporte", {
              orderId: selectedOrder.id,
              problemKey,
              problemLabel,
            });
          }
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  sectionSpacing: {
    marginTop: 24,
  },
});

export default ClientePedidosScreen;

