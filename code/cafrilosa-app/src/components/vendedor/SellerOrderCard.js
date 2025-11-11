import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SellerOrderCard = ({ order, onPress }) => {
  if (!order) return null;
  const formattedDate = new Date(order.date).toLocaleString("es-EC", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>
      <View style={styles.headerRow}>
        <View style={styles.clientRow}>
          <View style={styles.avatar}>
            <Ionicons name="person-outline" size={18} color="#F55A3C" />
          </View>
          <View>
            <Text style={styles.clientName}>{order.client?.name}</Text>
            <Text style={styles.orderCode}>{order.id}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, getStatusBadgeStyle(order.status)]}>
          <Text style={[styles.statusText, getStatusTextStyle(order.status)]}>{order.status}</Text>
        </View>
      </View>
      <View style={styles.footerRow}>
        <View style={styles.dateRow}>
          <Ionicons name="calendar-outline" size={16} color="#6B7280" />
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>
        <Text style={styles.totalText}>${order.total.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const getStatusBadgeStyle = (status) => {
  if (status === "Entregado") return styles.statusDelivered;
  if (status === "En Camino") return styles.statusInProgress;
  return styles.statusPending;
};

const getStatusTextStyle = (status) => {
  if (status === "Entregado") return styles.statusTextDelivered;
  if (status === "En Camino") return styles.statusTextInProgress;
  return styles.statusTextPending;
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
    alignItems: "center",
  },
  clientRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#FCDAD2",
    alignItems: "center",
    justifyContent: "center",
  },
  clientName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  orderCode: {
    color: "#6B7280",
    fontSize: 13,
  },
  statusBadge: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },
  statusDelivered: {
    backgroundColor: "#DCFCE7",
  },
  statusTextDelivered: {
    color: "#15803D",
  },
  statusInProgress: {
    backgroundColor: "#E0F2FE",
  },
  statusTextInProgress: {
    color: "#0369A1",
  },
  statusPending: {
    backgroundColor: "#FEE2E2",
  },
  statusTextPending: {
    color: "#B91C1C",
  },
  footerRow: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dateText: {
    color: "#6B7280",
    fontSize: 13,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#F55A3C",
  },
});

export default SellerOrderCard;
