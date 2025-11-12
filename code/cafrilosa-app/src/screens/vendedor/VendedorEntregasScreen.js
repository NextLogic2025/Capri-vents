import React, { useMemo, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DeliveryCard from "../../components/vendedor/DeliveryCard";

const deliveries = [
  {
    id: "ENT-045",
    orderCode: "PED-2024-088",
    status: "Entregada",
    statusBadgeColor: "#4CAF50",
    time: "09:45",
    clientName: "Minimarket La Esquina",
    contactName: "Sra. María López",
    address: "Av. 6 de Diciembre y Naciones Unidas, Local 12",
    itemsCount: 8,
    total: 230.5,
    driverName: "Roberto Gómez",
    finalStatusText: "Completada",
  },
  {
    id: "ENT-046",
    orderCode: "PED-2024-089",
    status: "Por entregar",
    statusBadgeColor: "#FFC107",
    time: "11:00",
    clientName: "Supermercado El Ahorro",
    contactName: "Sr. Juan Pérez",
    address: "Calle Bolívar 234 y García Moreno",
    itemsCount: 12,
    total: 450.0,
    driverName: "Roberto Gómez",
    finalStatusText: "Confirmar entrega",
  },
  {
    id: "ENT-047",
    orderCode: "PED-2024-090",
    status: "En preparación",
    statusBadgeColor: "#2196F3",
    time: "14:30",
    clientName: "Tienda Don Pepe",
    contactName: "Sr. Pedro Rodríguez",
    address: "Av. Amazonas 567",
    itemsCount: 6,
    total: 180.0,
    driverName: "Roberto Gómez",
    finalStatusText: "En bodega",
  },
];

const VendedorEntregasScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDeliveries = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return deliveries;
    return deliveries.filter(
      (delivery) =>
        delivery.id.toLowerCase().includes(term) ||
        delivery.clientName.toLowerCase().includes(term) ||
        delivery.orderCode.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top + 8 }]}> 
      <View style={styles.header}>
        <Text style={styles.title}>Entregas</Text>
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
        <TouchableOpacity style={styles.addButton} onPress={() => console.log("Nueva programación")}> 
          <Ionicons name="add" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.kpiRow}>
        <KpiCard label="Total Hoy" value="3" />
        <KpiCard label="Entregadas" value="1" />
        <KpiCard label="Pendientes" value="1" />
      </View>

      <View style={styles.routeCard}>
        <View>
          <Text style={styles.routeTitle}>Ruta del Día</Text>
          <Text style={styles.routeSubtitle}>Zona Norte • 3 entregas programadas</Text>
        </View>
        <TouchableOpacity
          style={styles.routeButton}
          onPress={() => navigation.navigate("VendedorListaRutas")}
        >
          <Ionicons name="list-outline" size={18} color="#2563EB" />
          <Text style={styles.routeButtonText}>Lista de rutas</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredDeliveries}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <DeliveryCard
            delivery={item}
            onPrimaryAction={(delivery) => {
              console.log("Confirmar entrega", delivery.id);
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};

const KpiCard = ({ label, value }) => (
  <View style={styles.kpiCard}>
    <Text style={styles.kpiValue}>{value}</Text>
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
  kpiRow: { flexDirection: "row", gap: 12, marginBottom: 18 },
  kpiCard: { flex: 1, backgroundColor: "#FFFFFF", borderRadius: 18, paddingVertical: 12, alignItems: "center" },
  kpiValue: { fontSize: 18, fontWeight: "700", color: "#111827" },
  kpiLabel: { fontSize: 12, color: "#6B7280" },
  routeCard: { backgroundColor: "#E0F2FE", borderRadius: 24, padding: 18, marginBottom: 18 },
  routeTitle: { fontSize: 16, fontWeight: "700", color: "#0F172A" },
  routeSubtitle: { color: "#2563EB", marginTop: 4 },
  routeButton: { marginTop: 14, backgroundColor: "#FFFFFF", borderRadius: 18, flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 10, gap: 8 },
  routeButtonText: { color: "#2563EB", fontWeight: "700" },
  listContent: { paddingBottom: 80 },
});

export default VendedorEntregasScreen;
