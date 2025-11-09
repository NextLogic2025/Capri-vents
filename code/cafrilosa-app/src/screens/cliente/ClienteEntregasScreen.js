import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DeliveryCurrentCard from "../../components/ui/DeliveryCurrentCard";
import DeliveryHistoryItem from "../../components/ui/DeliveryHistoryItem";
import DeliveryTrackingModal from "../../components/ui/DeliveryTrackingModal";
import DeliveryDetailModal from "../../components/ui/DeliveryDetailModal";

// TODO: conectar con backend aqui para obtener la entrega actual y el historial de entregas
const currentDelivery = {
  id: "ENT-2024-102",
  orderCode: "PED-2024-102",
  statusLabel: "En Camino",
  progress: 75,
  etaText: "Hoy a las 14:30",
  address: "Av. 6 de Diciembre y Naciones Unidas, Quito",
  driverName: "Roberto Vasquez",
  driverInitials: "RV",
  driverPlate: "GYE-1234",
};

const deliveryHistory = [
  {
    id: "ENT-145",
    deliveryId: "ENT-145",
    orderCode: "PED-2024-098",
    statusLabel: "Entregado",
    statusColor: "#22C55E",
    date: "05 Nov 2024",
    totalPaid: 125.75,
    driverName: "Luis Morales",
    driverInitials: "LM",
    driverPlate: "GYE-5678",
    address: "Av. 6 de Diciembre y Naciones Unidas, Quito",
    products: [
      {
        id: "p1",
        name: "Pack Parrillero Familiar",
        quantity: 2,
        totalPrice: 59.98,
        image: require("../../assets/images/offer-pack-parrillero.png"),
      },
      {
        id: "p2",
        name: "Jamon Cocido Premium",
        quantity: 3,
        totalPrice: 56.25,
        image: require("../../assets/images/offer-jamon-cocido.png"),
      },
    ],
  },
  {
    id: "ENT-132",
    deliveryId: "ENT-132",
    orderCode: "PED-2024-090",
    statusLabel: "Entregado",
    statusColor: "#22C55E",
    date: "25 Oct 2024",
    totalPaid: 86.4,
    driverName: "Roberto Vasquez",
    driverInitials: "RV",
    driverPlate: "GYE-1234",
    address: "Av. Naciones Unidas y Amazonas, Quito",
    products: [
      {
        id: "p3",
        name: "Salame Artesanal",
        quantity: 1,
        totalPrice: 24.5,
        image: require("../../assets/images/cart-salame.png"),
      },
    ],
  },
];

const ClienteEntregasScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [trackingVisible, setTrackingVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  const handleOpenTracking = () => {
    setSelectedDelivery(currentDelivery);
    setTrackingVisible(true);
    // TODO: conectar con backend aqui para actualizar en tiempo real la ubicacion del repartidor (websocket o similar)
  };

  const handleCallDriver = () => {
    console.log("Llamando al conductor...");
    // TODO: conectar con backend aqui para llamar al conductor (integracion con telefono nativo)
  };

  const filteredHistory = deliveryHistory.filter((delivery) => {
    if (!searchText) {
      return true;
    }
    const query = searchText.toLowerCase();
    return delivery.id.toLowerCase().includes(query) || delivery.orderCode.toLowerCase().includes(query);
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Entregas</Text>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={20} color="#111827" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar entregas..."
            placeholderTextColor="#9CA3AF"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <DeliveryCurrentCard delivery={currentDelivery} onCallDriver={handleCallDriver} onViewLocation={handleOpenTracking} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Historial de Entregas</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>Ver todas</Text>
          </TouchableOpacity>
        </View>

        <View>
          {filteredHistory.map((delivery) => (
            <DeliveryHistoryItem
              key={delivery.id}
              delivery={delivery}
              onPress={() => {
                setSelectedDelivery(delivery);
                setDetailVisible(true);
              }}
            />
          ))}
        </View>
      </ScrollView>

      <DeliveryTrackingModal
        visible={trackingVisible}
        delivery={selectedDelivery}
        onClose={() => setTrackingVisible(false)}
        onViewDetails={() => {
          setTrackingVisible(false);
          if (selectedDelivery) {
            setDetailVisible(true);
          }
        }}
        onCallDriver={handleCallDriver}
      />

      <DeliveryDetailModal visible={detailVisible} delivery={selectedDelivery} onClose={() => setDetailVisible(false)} onCallDriver={handleCallDriver} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  notificationDot: {
    position: "absolute",
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#DC2626",
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
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 32,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  viewAll: {
    fontSize: 13,
    fontWeight: "600",
    color: "#F97316",
  },
});

export default ClienteEntregasScreen;
