import React, { useMemo, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import SupportTicketItem from "../../components/ui/SupportTicketItem";

const tickets = [
  {
    id: "CASO-2025-001",
    type: "Reclamo",
    priority: "Alta",
    title: "Producto en mal estado",
    description: "Recibí un paquete de chorizo parrillero que llegó con mal olor...",
    status: "En Proceso",
    createdAt: "24 de ene de 2025",
    repliesCount: 1,
  },
  {
    id: "CASO-2025-002",
    type: "Consulta",
    priority: "Media",
    title: "Consulta sobre productos sin TACC",
    description: "¿Tienen productos certificados sin TACC?",
    status: "Abierto",
    createdAt: "27 de ene de 2025",
    repliesCount: 2,
  },
  {
    id: "CASO-2025-003",
    type: "Devolución",
    priority: "Alta",
    title: "Solicitud de devolución",
    description: "Pedido incompleto, faltan 2 productos que solicité en mi orden...",
    status: "Resuelto",
    createdAt: "30 de ene de 2025",
    repliesCount: 3,
  },
];

const statusFilters = ["Todos", "Abierto", "En Proceso", "Resuelto"];

const ClienteCentroAyudaScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");
  // TODO: conectar con backend aqui para crear y listar tickets de soporte

  const counters = useMemo(() => {
    const total = tickets.length;
    const abiertos = tickets.filter((t) => t.status === "Abierto").length;
    const proceso = tickets.filter((t) => t.status === "En Proceso").length;
    const resueltos = tickets.filter((t) => t.status === "Resuelto").length;
    return { total, abiertos, proceso, resueltos };
  }, []);

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesFilter = activeFilter === "Todos" ? true : ticket.status === activeFilter;
      const matchesSearch = ticket.title.toLowerCase().includes(search.toLowerCase()) || ticket.id.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [search, activeFilter]);

  const handleContact = (type) => {
    Alert.alert(`Contacto ${type}`, "Accion simulada");
    // TODO: conectar con backend o deep links aqui para abrir llamada, email o WhatsApp
  };

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 12 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.title}>Soporte</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.contactRow}>
          <TouchableOpacity style={styles.contactButton} onPress={() => handleContact("Llamada")}>
            <Ionicons name="call-outline" size={20} color="#FFFFFF" />
            <Text style={styles.contactText}>Llamar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactButton} onPress={() => handleContact("Email")}>
            <Ionicons name="mail-outline" size={20} color="#FFFFFF" />
            <Text style={styles.contactText}>Email</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactButton} onPress={() => handleContact("WhatsApp")}>
            <Ionicons name="logo-whatsapp" size={20} color="#FFFFFF" />
            <Text style={styles.contactText}>WhatsApp</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar casos..."
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total</Text>
            <Text style={styles.summaryValue}>{counters.total}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Abiertos</Text>
            <Text style={styles.summaryValue}>{counters.abiertos}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>En proceso</Text>
            <Text style={styles.summaryValue}>{counters.proceso}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Resueltos</Text>
            <Text style={styles.summaryValue}>{counters.resueltos}</Text>
          </View>
        </View>

        <View style={styles.filterRow}>
          {statusFilters.map((filter) => {
            const active = activeFilter === filter;
            return (
              <TouchableOpacity key={filter} style={[styles.filterChip, active && styles.filterChipActive]} onPress={() => setActiveFilter(filter)}>
                <Text style={[styles.filterText, active && styles.filterTextActive]}>{filter}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {filteredTickets.map((ticket) => (
          <SupportTicketItem key={ticket.id} ticket={ticket} onPress={() => Alert.alert(ticket.title, "Detalle simulado")} />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          navigation.navigate("ClienteTicketSoporte");
          // TODO: guardar este ticket en una fuente global (contexto o backend) para verlo luego en Centro de Ayuda
        }}
      >
        <MaterialCommunityIcons name="plus" size={26} color="#FFFFFF" />
      </TouchableOpacity>
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
    paddingBottom: 80,
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
  contactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  contactButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E64A19",
    borderRadius: 18,
    paddingVertical: 12,
    marginHorizontal: 4,
    gap: 6,
  },
  contactText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: "#111827",
  },
  summaryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    alignItems: "center",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  summaryLabel: {
    color: "#6B7280",
    fontSize: 12,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginTop: 6,
  },
  filterRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: "#FFE4E6",
    borderColor: "#F97316",
  },
  filterText: {
    color: "#6B7280",
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#B91C1C",
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#F97316",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#F97316",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 5,
  },
});

export default ClienteCentroAyudaScreen;
