import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const DeliveryCard = ({ delivery, onPrimaryAction }) => {
  if (!delivery) return null;
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.deliveryCode}>{delivery.id}</Text>
          <View style={[styles.badge, { backgroundColor: delivery.statusBadgeColor || "#E5E7EB" }]}>
            <Text style={styles.badgeText}>{delivery.status}</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <Ionicons name="time-outline" size={16} color="#6B7280" />
          <Text style={styles.timeText}>{delivery.time}</Text>
        </View>
      </View>

      <Text style={styles.orderCode}>{delivery.orderCode}</Text>
      <Text style={styles.clientName}>{delivery.clientName}</Text>
      <Text style={styles.contactName}>{delivery.contactName}</Text>

      <View style={styles.addressBox}>
        <Ionicons name="location-outline" size={16} color="#2563EB" />
        <Text style={styles.addressText}>{delivery.address}</Text>
      </View>

      <View style={styles.footerRow}>
        <View style={styles.metrics}>
          <Text style={styles.metricText}>
            {delivery.itemsCount} items · ${delivery.total?.toFixed(2)}
          </Text>
          <View style={styles.driverRow}>
            <MaterialCommunityIcons name="truck-delivery-outline" size={18} color="#F97316" />
            <Text style={styles.driverText}>{delivery.driverName}</Text>
          </View>
        </View>
        {renderFinalStatus(delivery, onPrimaryAction)}
      </View>
    </View>
  );
};

const renderFinalStatus = (delivery, onPrimaryAction) => {
  if (delivery.finalStatusText === "Confirmar entrega") {
    return (
      <TouchableOpacity style={styles.primaryButton} onPress={() => onPrimaryAction?.(delivery)}>
        <Text style={styles.primaryButtonText}>Confirmar entrega</Text>
      </TouchableOpacity>
    );
  }
  if (delivery.finalStatusText === "En bodega") {
    return (
      <View style={[styles.statusChip, { backgroundColor: "#FEE2E2" }]}>
        <Text style={{ color: "#B91C1C", fontWeight: "700" }}>En bodega</Text>
      </View>
    );
  }
  return (
    <View style={[styles.statusChip, { backgroundColor: "#DCFCE7" }]}>
      <Text style={{ color: "#15803D", fontWeight: "700" }}>{delivery.finalStatusText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  deliveryCode: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
  badge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginTop: 4,
  },
  badgeText: {
    fontSize: 11,
    color: "#111827",
    fontWeight: "600",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  timeText: {
    color: "#6B7280",
    fontWeight: "600",
  },
  orderCode: {
    color: "#F55A3C",
    fontWeight: "700",
    marginBottom: 6,
  },
  clientName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  contactName: {
    color: "#6B7280",
    marginBottom: 10,
  },
  addressBox: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#F1F5F9",
    padding: 10,
    borderRadius: 16,
    marginBottom: 12,
  },
  addressText: {
    flex: 1,
    color: "#1F2937",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  metrics: {
    flex: 1,
  },
  metricText: {
    color: "#4B5563",
    fontSize: 13,
  },
  driverRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },
  driverText: {
    color: "#4B5563",
    fontWeight: "600",
  },
  primaryButton: {
    backgroundColor: "#F55A3C",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },
  statusChip: {
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});

export default DeliveryCard;
