import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const routeStops = [
  {
    id: "ENT-045",
    orderCode: "PED-2024-088",
    status: "Entregada",
    statusBadgeColor: "#DCFCE7",
    time: "09:45",
    clientName: "Minimarket La Esquina",
    contactName: "Sra. María López",
    address: "Av. 6 de Diciembre y Naciones Unidas, Local 12",
    itemsCount: 8,
    total: 230.5,
    driverName: "Roberto Gómez",
    finalStatusText: "Completada",
    distance: "1.2 km",
  },
  {
    id: "ENT-046",
    orderCode: "PED-2024-089",
    status: "Pendiente",
    statusBadgeColor: "#FFF4E5",
    time: "11:00",
    clientName: "Supermercado El Ahorro",
    contactName: "Sr. Juan Pérez",
    address: "Calle Bolívar 234 y García Moreno",
    itemsCount: 12,
    total: 450.0,
    driverName: "Roberto Gómez",
    finalStatusText: "Próxima parada",
    distance: "2.3 km",
  },
  {
    id: "ENT-047",
    orderCode: "PED-2024-090",
    status: "Pendiente",
    statusBadgeColor: "#E0F2FE",
    time: "14:30",
    clientName: "Tienda Don Pepe",
    contactName: "Sr. Pedro Rodríguez",
    address: "Av. Amazonas 567",
    itemsCount: 6,
    total: 180.0,
    driverName: "Roberto Gómez",
    finalStatusText: "Pendiente",
    distance: "3.1 km",
  },
];

const VendedorMapaRutaScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState("mapa");

  // TODO: conectar con backend aquí para obtener ruta optimizada y estados en tiempo real
  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top + 8 }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#111827" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Mapa de Ruta</Text>
          <Text style={styles.headerSubtitle}>3 entregas • 5.4 km total</Text>
        </View>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={() => {
            // TODO: integrar navegación real (ej. abrir Waze)
            console.log("Comenzar navegación turn-by-turn");
          }}
        >
          <Ionicons name="navigate" size={20} color="#2563EB" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabRow}>
        {["mapa", "lista"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabButtonText, activeTab === tab && styles.tabButtonTextActive]}>
              {tab === "mapa" ? "Mapa" : "Lista"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === "mapa" ? <MapaContent /> : <ListaContent />}
    </SafeAreaView>
  );
};

const MapaContent = () => (
  <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    <View style={styles.mapCard}>
      <View style={styles.mapPlaceholder}>
        <Ionicons name="navigate-circle" size={48} color="#F55A3C" />
        <Text style={styles.mapTitle}>Mapa Interactivo de Ruta</Text>
        <Text style={styles.mapSubtitle}>Tracking en tiempo real</Text>
      </View>
      {/* TODO: reemplazar placeholder anterior con react-native-maps + ruta optimizada */}
    </View>

    <View style={styles.infoCard}>
      <Text style={styles.infoTitle}>Información de la Ruta</Text>
      <Text style={styles.infoSubtitle}>Zona Norte - Quito</Text>
      <View style={styles.infoStats}>
        <InfoChip label="5.4 km" caption="Total" />
        <InfoChip label="45 min" caption="Aprox" />
        <InfoChip label="1/3" caption="Completado" />
      </View>
    </View>

    <View style={styles.nextStopCard}>
      <View style={styles.nextStopHeader}>
        <View style={styles.stopNumber}>
          <Text style={styles.stopNumberText}>2</Text>
        </View>
        <Text style={styles.nextStopLabel}>Próxima parada</Text>
      </View>
      <Text style={styles.nextStopClient}>Supermercado El Ahorro</Text>
      <Text style={styles.nextStopAddress}>Calle Bolívar 234 y García Moreno</Text>
      <View style={styles.nextStopMeta}>
        <Text style={styles.nextStopMetaText}>Est. 11:00</Text>
        <Text style={styles.nextStopMetaText}>2.3 km</Text>
      </View>
      <TouchableOpacity
        style={styles.navigationButton}
        onPress={() => console.log("Iniciar navegación hacia próxima parada")}
      >
        <Text style={styles.navigationButtonText}>Iniciar Navegación</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
);

const ListaContent = () => (
  <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    <View style={styles.routeInfoBanner}>
      <Ionicons name="map-outline" size={18} color="#2563EB" />
      <Text style={styles.routeInfoText}>Ruta optimizada para minimizar distancia y tiempo</Text>
    </View>
    {routeStops.map((stop, index) => (
      <View key={stop.id} style={[styles.stopCard, index === 1 && styles.stopHighlighted]}>
        <View style={styles.stopHeader}>
          <View style={styles.stopNumberBadge}>
            <Text style={styles.stopNumberBadgeText}>{index + 1}</Text>
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
          <TouchableOpacity style={styles.secondaryAction} onPress={() => console.log("Ver detalles", stop.id)}>
            <Text style={styles.secondaryActionText}>Ver detalles</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.primaryAction}
            onPress={() => console.log("Ir ahora", stop.clientName)}
          >
            <Text style={styles.primaryActionText}>Ir ahora</Text>
          </TouchableOpacity>
        </View>
      </View>
    ))}
  </ScrollView>
);

const InfoChip = ({ label, caption }) => (
  <View style={styles.infoChip}>
    <Text style={styles.infoChipValue}>{label}</Text>
    <Text style={styles.infoChipCaption}>{caption}</Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8FAFC", paddingHorizontal: 20 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  headerIcon: { width: 42, height: 42, borderRadius: 21, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#111827" },
  headerSubtitle: { color: "#6B7280", fontSize: 12 },
  tabRow: { flexDirection: "row", backgroundColor: "#F3F4F6", padding: 4, borderRadius: 18, marginBottom: 16 },
  tabButton: { flex: 1, paddingVertical: 8, borderRadius: 14, alignItems: "center" },
  tabButtonActive: { backgroundColor: "#FFFFFF" },
  tabButtonText: { color: "#6B7280", fontWeight: "600" },
  tabButtonTextActive: { color: "#F55A3C" },
  content: { paddingBottom: 40 },
  mapCard: { borderRadius: 24, overflow: "hidden", backgroundColor: "#E0F2FE", marginBottom: 18 },
  mapPlaceholder: { height: 200, alignItems: "center", justifyContent: "center", gap: 8 },
  mapTitle: { fontSize: 16, fontWeight: "700", color: "#0F172A" },
  mapSubtitle: { color: "#2563EB" },
  infoCard: { backgroundColor: "#FFFFFF", borderRadius: 24, padding: 18, marginBottom: 18 },
  infoTitle: { fontSize: 15, fontWeight: "700", color: "#111827" },
  infoSubtitle: { color: "#6B7280", marginTop: 4 },
  infoStats: { flexDirection: "row", marginTop: 12, gap: 12 },
  infoChip: { flex: 1, backgroundColor: "#F8FAFC", borderRadius: 16, paddingVertical: 12, alignItems: "center" },
  infoChipValue: { fontSize: 16, fontWeight: "700", color: "#111827" },
  infoChipCaption: { fontSize: 12, color: "#6B7280", marginTop: 2 },
  nextStopCard: { backgroundColor: "#FFFBEB", borderRadius: 24, padding: 18 },
  nextStopHeader: { flexDirection: "row", alignItems: "center", gap: 10 },
  stopNumber: { width: 34, height: 34, borderRadius: 17, backgroundColor: "#F59E0B", alignItems: "center", justifyContent: "center" },
  stopNumberText: { color: "#FFFFFF", fontWeight: "700" },
  nextStopLabel: { color: "#92400E", fontWeight: "700" },
  nextStopClient: { fontSize: 16, fontWeight: "700", color: "#111827", marginTop: 12 },
  nextStopAddress: { color: "#6B7280", marginTop: 4 },
  nextStopMeta: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  nextStopMetaText: { color: "#475569", fontWeight: "600" },
  navigationButton: { marginTop: 16, backgroundColor: "#2563EB", borderRadius: 20, paddingVertical: 12, alignItems: "center" },
  navigationButtonText: { color: "#FFFFFF", fontWeight: "700" },
  routeInfoBanner: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#EFF6FF", borderRadius: 16, padding: 12, marginBottom: 16 },
  routeInfoText: { color: "#1D4ED8", fontSize: 13 },
  stopCard: { backgroundColor: "#FFFFFF", borderRadius: 24, padding: 16, marginBottom: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 6, elevation: 2 },
  stopHighlighted: { borderWidth: 2, borderColor: "#FCD34D" },
  stopHeader: { flexDirection: "row", alignItems: "center", gap: 12 },
  stopNumberBadge: { width: 34, height: 34, borderRadius: 17, backgroundColor: "#E5E7EB", alignItems: "center", justifyContent: "center" },
  stopNumberBadgeText: { fontWeight: "700", color: "#111827" },
  stopClient: { fontSize: 16, fontWeight: "700", color: "#111827" },
  stopStatus: { color: "#6B7280" },
  stopAddress: { color: "#6B7280", marginTop: 8 },
  stopMetaRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  stopMetaText: { color: "#9CA3AF", fontSize: 13 },
  stopActionsRow: { flexDirection: "row", gap: 10, marginTop: 14 },
  secondaryAction: { flex: 1, borderRadius: 16, borderWidth: 1, borderColor: "#E5E7EB", paddingVertical: 10, alignItems: "center" },
  secondaryActionText: { color: "#111827", fontWeight: "600" },
  primaryAction: { flex: 1, borderRadius: 16, backgroundColor: "#2563EB", paddingVertical: 10, alignItems: "center" },
  primaryActionText: { color: "#FFFFFF", fontWeight: "700" },
});

export default VendedorMapaRutaScreen;
