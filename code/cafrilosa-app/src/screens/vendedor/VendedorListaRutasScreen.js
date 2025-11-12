import React from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const routeStops = [
  {
    id: "ENT-045",
    clientName: "Minimarket La Esquina",
    status: "Entregada",
    address: "Av. 6 de Diciembre y Naciones Unidas, Local 12",
    time: "09:45",
    distance: "1.2 km",
  },
  {
    id: "ENT-046",
    clientName: "Supermercado El Ahorro",
    status: "Pendiente",
    address: "Calle Bolívar 234 y García Moreno",
    time: "11:00",
    distance: "2.3 km",
  },
  {
    id: "ENT-047",
    clientName: "Tienda Don Pepe",
    status: "Pendiente",
    address: "Av. Amazonas 567",
    time: "14:30",
    distance: "3.1 km",
  },
];

const VendedorListaRutasScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top + 8 }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#111827" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Lista de Rutas</Text>
          <Text style={styles.headerSubtitle}>3 entregas • 5.4 km total</Text>
        </View>
        <View style={{ width: 42 }} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={styles.routeInfoBanner}>
          <Ionicons name="map-outline" size={18} color="#2563EB" />
          <Text style={styles.routeInfoText}>Ruta optimizada para minimizar distancia y tiempo</Text>
        </View>
        {routeStops.map((stop, index) => (
          <View key={stop.id} style={[styles.stopCard, index === 1 && styles.stopHighlighted]}>
            <View style={styles.stopHeader}>
              <View style={styles.stopNumber}>
                <Text style={styles.stopNumberText}>{index + 1}</Text>
              </View>
              <View>
                <Text style={styles.stopClient}>{stop.clientName}</Text>
                <Text style={styles.stopStatus}>{stop.status}</Text>
              </View>
            </View>
            <Text style={styles.stopAddress}>{stop.address}</Text>
            <View style={styles.stopMetaRow}>
              <Text style={styles.stopMetaText}>{stop.time}</Text>
              <Text style={styles.stopMetaText}>{stop.distance}</Text>
            </View>
            <View style={styles.stopActionsRow}>
              <TouchableOpacity style={styles.secondaryButton} onPress={() => console.log("Ver detalles", stop.id)}>
                <Text style={styles.secondaryButtonText}>Ver detalles</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.primaryButton} onPress={() => console.log("Ir ahora", stop.id)}>
                <Ionicons name="navigate" size={16} color="#FFFFFF" />
                <Text style={styles.primaryButtonText}>Ir ahora</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8FAFC", paddingHorizontal: 20 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 18 },
  headerIcon: { width: 42, height: 42, borderRadius: 21, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center" },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#111827" },
  headerSubtitle: { color: "#6B7280", fontSize: 12 },
  routeInfoBanner: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#EFF6FF", borderRadius: 16, padding: 12, marginBottom: 16 },
  routeInfoText: { color: "#1D4ED8", fontSize: 13 },
  stopCard: { backgroundColor: "#FFFFFF", borderRadius: 24, padding: 16, marginBottom: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  stopHighlighted: { borderWidth: 2, borderColor: "#FCD34D" },
  stopHeader: { flexDirection: "row", alignItems: "center", gap: 12 },
  stopNumber: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#E5E7EB", alignItems: "center", justifyContent: "center" },
  stopNumberText: { fontWeight: "700", color: "#111827" },
  stopClient: { fontSize: 16, fontWeight: "700", color: "#111827" },
  stopStatus: { color: "#6B7280" },
  stopAddress: { color: "#6B7280", marginTop: 10 },
  stopMetaRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  stopMetaText: { color: "#94A3B8", fontSize: 13 },
  stopActionsRow: { flexDirection: "row", gap: 10, marginTop: 14 },
  secondaryButton: { flex: 1, borderRadius: 16, borderWidth: 1, borderColor: "#E5E7EB", paddingVertical: 10, alignItems: "center" },
  secondaryButtonText: { color: "#111827", fontWeight: "600" },
  primaryButton: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, borderRadius: 16, backgroundColor: "#2563EB", paddingVertical: 10 },
  primaryButtonText: { color: "#FFFFFF", fontWeight: "700" },
});

export default VendedorListaRutasScreen;
