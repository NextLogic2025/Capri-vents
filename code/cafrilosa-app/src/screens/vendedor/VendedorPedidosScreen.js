import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SellerOrderCard from "../../components/vendedor/SellerOrderCard";
import SellerOrderDetailModal from "../../components/vendedor/SellerOrderDetailModal";

const STATUS_TABS = [
  { key: "todos", label: "Todos" },
  { key: "Pendiente", label: "Pendientes" },
  { key: "Aprobado", label: "Aprobados" },
  { key: "Entregado", label: "Entregados" },
];

const INITIAL_ORDERS = [
  {
    id: "PED-1245",
    client: { id: "cli-001", name: "Supermercado El Ahorro" },
    date: "2025-11-06T10:30:00Z",
    total: 245.5,
    status: "Pendiente",
    paymentMethod: "Transferencia",
    items: [
      { product: { id: "prod1", name: "Chorizo Premium", price: 12.3 }, quantity: 5 },
      { product: { id: "prod2", name: "Jamón Serrano", price: 25.5 }, quantity: 3 },
    ],
  },
  {
    id: "PED-1244",
    client: { id: "cli-002", name: "Restaurante La Estancia" },
    date: "2025-11-06T09:10:00Z",
    total: 315.75,
    status: "Aprobado",
    paymentMethod: "Efectivo",
    items: [
      { product: { id: "prod3", name: "Salchicha Frankfurt", price: 3.2 }, quantity: 40 },
    ],
  },
  {
    id: "PED-1243",
    client: { id: "cli-003", name: "Minimarket La Esquina" },
    date: "2025-11-05T16:00:00Z",
    total: 198.9,
    status: "Entregado",
    paymentMethod: "Tarjeta",
    items: [
      { product: { id: "prod4", name: "Pack Parrillero", price: 18.5 }, quantity: 4 },
      { product: { id: "prod5", name: "Salchicha Italiana", price: 5.2 }, quantity: 6 },
    ],
  },
];

const VendedorPedidosScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [detailOrder, setDetailOrder] = useState(null);
  const [detailVisible, setDetailVisible] = useState(false);

  useEffect(() => {
    if (route?.params?.newOrder) {
      const incoming = { ...route.params.newOrder, status: "Pendiente" };
      setOrders((prev) => {
        const exists = prev.some((order) => order.id === incoming.id);
        if (exists) return prev;
        return [incoming, ...prev];
      });
      navigation.setParams?.({ newOrder: undefined });
    }
  }, [route?.params?.newOrder]);

  const filteredOrders = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return orders.filter((order) => {
      const matchesFilter = statusFilter === "todos" || order.status === statusFilter;
      const matchesSearch =
        !term ||
        order.id.toLowerCase().includes(term) ||
        order.client.name.toLowerCase().includes(term);
      return matchesFilter && matchesSearch;
    });
  }, [orders, statusFilter, searchTerm]);

  const stats = useMemo(() => {
    const pending = orders.filter((o) => o.status === "Pendiente").length;
    const approved = orders.filter((o) => o.status === "Aprobado").length;
    const delivered = orders.filter((o) => o.status === "Entregado").length;
    return { pending, approved, delivered };
  }, [orders]);

  const handleAccept = (order) => {
    setOrders((prev) =>
      prev.map((item) => (item.id === order.id ? { ...item, status: "Aprobado" } : item))
    );
    // TODO: conectar con backend aquí para cambiar estado real del pedido
  };

  const handleDelivered = (order) => {
    setOrders((prev) =>
      prev.map((item) => (item.id === order.id ? { ...item, status: "Entregado" } : item))
    );
    setDetailVisible(false);
    // TODO: conectar con backend aquí para marcar pedido como entregado
  };

  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top + 8 }]}> 
      <View style={styles.header}>
        <Text style={styles.title}>Pedidos</Text>
        <TouchableOpacity style={styles.bellButton}>
          <Ionicons name="notifications-outline" size={20} color="#F55A3C" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar pedido..."
            placeholderTextColor="#9CA3AF"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => console.log("Nuevo pedido manual")}> 
          <Ionicons name="add" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsRow}>
        <Kpi label="Pendientes" value={stats.pending} color="#F97316" />
        <Kpi label="Aprobados" value={stats.approved} color="#10B981" />
        <Kpi label="Entregados" value={stats.delivered} color="#3B82F6" />
      </View>

      <View style={styles.filterRow}>
        {STATUS_TABS.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.filterChip, statusFilter === tab.key && styles.filterChipActive]}
            onPress={() => setStatusFilter(tab.key)}
          >
            <Text style={[styles.filterChipText, statusFilter === tab.key && styles.filterChipTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <SellerOrderCard
            order={item}
            onAccept={handleAccept}
            onViewDetails={(order) => {
              setDetailOrder(order);
              setDetailVisible(true);
            }}
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay pedidos con este filtro.</Text>}
      />

      <SellerOrderDetailModal
        visible={detailVisible}
        order={detailOrder}
        onClose={() => setDetailVisible(false)}
        onMarkDelivered={handleDelivered}
      />
    </SafeAreaView>
  );
};

const Kpi = ({ label, value, color }) => (
  <View style={styles.kpiCard}>
    <Text style={[styles.kpiValue, { color }]}>{value}</Text>
    <Text style={styles.kpiLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F7F7FB", paddingHorizontal: 20 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  title: { fontSize: 24, fontWeight: "700", color: "#111827" },
  bellButton: { width: 42, height: 42, borderRadius: 21, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center" },
  searchRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 16 },
  searchBar: { flex: 1, backgroundColor: "#FFFFFF", borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, flexDirection: "row", alignItems: "center" },
  searchInput: { flex: 1, marginLeft: 8, color: "#111827" },
  addButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#F55A3C", alignItems: "center", justifyContent: "center" },
  statsRow: { flexDirection: "row", gap: 12, marginBottom: 16 },
  kpiCard: { flex: 1, backgroundColor: "#FFFFFF", borderRadius: 18, paddingVertical: 12, alignItems: "center" },
  kpiValue: { fontSize: 18, fontWeight: "700" },
  kpiLabel: { fontSize: 12, color: "#6B7280" },
  filterRow: { flexDirection: "row", gap: 10, marginBottom: 16 },
  filterChip: { flex: 1, borderRadius: 18, paddingVertical: 10, alignItems: "center", backgroundColor: "#F3F4F6" },
  filterChipActive: { backgroundColor: "#F55A3C" },
  filterChipText: { color: "#6B7280", fontWeight: "600" },
  filterChipTextActive: { color: "#FFFFFF" },
  listContent: { paddingBottom: 80 },
  emptyText: { textAlign: "center", color: "#6B7280", marginTop: 40 },
});

export default VendedorPedidosScreen;
