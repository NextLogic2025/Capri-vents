import React, { useMemo, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SellerClientCard from "../../components/vendedor/SellerClientCard";

const CLIENTS_DATA = [
  {
    id: "cli-001",
    name: "Supermercado El Ahorro",
    total: 45200,
    segment: "Mayorista",
    frequency: "Semanal",
    contactName: "Sr. Juan Pérez – Gerente de Compras",
    average: 850,
    creditDays: 30,
    balance: 1200,
    notes: "Cliente VIP. Prefiere entregas antes de las 9am. Pago puntual.",
    status: "activo",
  },
  {
    id: "cli-002",
    name: "Minimarket La Esquina",
    total: 19200,
    segment: "Detalle",
    frequency: "Quincenal",
    contactName: "Sra. María López",
    average: 480,
    creditDays: 15,
    balance: 600,
    notes: "Prefiere promociones de embutidos económicos.",
    status: "activo",
  },
  {
    id: "cli-003",
    name: "Restaurant El Buen Sabor",
    total: 9800,
    segment: "Restaurante",
    frequency: "Mensual",
    contactName: "Chef Carlos Méndez",
    average: 350,
    creditDays: 0,
    balance: 0,
    notes: "Cliente inactivo desde agosto.",
    status: "inactivo",
  },
];

const VendedorClientesScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("todos");

  // TODO: conectar con backend aquí para obtener cartera real de clientes
  const filteredClients = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return CLIENTS_DATA.filter((client) => {
      const matchesFilter = filter === "todos" || client.status === filter;
      const matchesSearch =
        !term ||
        client.name.toLowerCase().includes(term) ||
        client.segment.toLowerCase().includes(term);
      return matchesFilter && matchesSearch;
    });
  }, [searchTerm, filter]);

  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top + 8 }]}> 
      <View style={styles.header}>
        <Text style={styles.title}>Clientes</Text>
        <TouchableOpacity style={styles.bellButton}>
          <Ionicons name="notifications-outline" size={20} color="#F55A3C" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar cliente..."
            placeholderTextColor="#9CA3AF"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => console.log("Agregar cliente")}> 
          <Ionicons name="add" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.kpiRow}>
        <Kpi label="Clientes" value="3" />
        <Kpi label="Total Ventas" value="$96k" />
        <Kpi label="Por Cobrar" value="$3090" />
      </View>

      <View style={styles.filterRow}>
        {[
          { key: "todos", label: "Todos (3)" },
          { key: "activo", label: "Activos (2)" },
          { key: "inactivo", label: "Inactivos (1)" },
        ].map((item) => (
          <TouchableOpacity
            key={item.key}
            style={[styles.filterChip, filter === item.key && styles.filterChipActive]}
            onPress={() => setFilter(item.key)}
          >
            <Text style={[styles.filterChipText, filter === item.key && styles.filterChipTextActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredClients}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <SellerClientCard
            client={item}
            onNewOrder={(client) => {
              const parent = navigation.getParent?.();
              if (parent) {
                parent.navigate("VendedorPedidos", { client });
              } else {
                navigation.navigate("VendedorAgregarProducto", { client });
              }
            }}
            onCall={(client) => console.log("Llamar a", client.name)}
            onProfile={(client) => console.log("Ver perfil de", client.name)}
          />
        )}
      />
    </SafeAreaView>
  );
};

const Kpi = ({ label, value }) => (
  <View style={styles.kpiCard}>
    <Text style={styles.kpiValue}>{value}</Text>
    <Text style={styles.kpiLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F7F7FB", paddingHorizontal: 20 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
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
  filterRow: { flexDirection: "row", gap: 10, marginBottom: 18 },
  filterChip: { flex: 1, borderRadius: 18, paddingVertical: 10, alignItems: "center", backgroundColor: "#F3F4F6" },
  filterChipActive: { backgroundColor: "#F55A3C" },
  filterChipText: { color: "#6B7280", fontWeight: "600" },
  filterChipTextActive: { color: "#FFFFFF" },
  listContent: { paddingBottom: 100 },
});

export default VendedorClientesScreen;
