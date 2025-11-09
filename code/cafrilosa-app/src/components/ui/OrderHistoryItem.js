import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const STATUS_COLORS = {
  "En Camino": "#F3E8FF",
  Entregado: "#DCFCE7",
  Pendiente: "#FFE4E6",
};

const OrderHistoryItem = ({ order, onPress }) => {
  const { id, date, status, items, address, estimatedDeliveryDate, total } = order;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.orderId}>{id}</Text>
        <View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[status] || "#E5E7EB" }]}>
          <Ionicons name="car-outline" size={14} color="#6B21A8" />
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>
      <Text style={styles.date}>{date}</Text>

      {items.map((item) => (
        <View key={item.id} style={styles.itemRow}>
          <Image source={item.image} style={styles.itemImage} />
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDetails}>Cantidad: {item.quantity}</Text>
          </View>
          <Text style={styles.itemPrice}>${(item.quantity * item.unitPrice).toFixed(2)}</Text>
        </View>
      ))}

      <View style={styles.metaRow}>
        <Ionicons name="location-outline" size={16} color="#9CA3AF" />
        <Text style={styles.metaText}>{address}</Text>
      </View>
      <View style={styles.metaRow}>
        <Ionicons name="calendar-outline" size={16} color="#9CA3AF" />
        <Text style={styles.metaText}>Entrega estimada: {estimatedDeliveryDate}</Text>
      </View>

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
      </View>

      <TouchableOpacity style={styles.detailButton} onPress={onPress}>
        <Text style={styles.detailButtonText}>Ver detalles completos &gt;</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderId: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusText: {
    color: "#6B21A8",
    fontWeight: "600",
    fontSize: 13,
    marginLeft: 4,
  },
  date: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  itemImage: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  itemDetails: {
    fontSize: 13,
    color: "#6B7280",
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: "700",
    color: "#E64A19",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  metaText: {
    fontSize: 13,
    color: "#6B7280",
    marginLeft: 6,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#6B7280",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#E64A19",
  },
  detailButton: {
    marginTop: 12,
  },
  detailButtonText: {
    color: "#E11D48",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default OrderHistoryItem;

