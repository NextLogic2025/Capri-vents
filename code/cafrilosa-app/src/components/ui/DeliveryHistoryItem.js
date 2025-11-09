import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const DeliveryHistoryItem = ({ delivery, onPress }) => {
  if (!delivery) {
    return null;
  }

  const { id, statusLabel, orderCode, date, totalPaid } = delivery;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.header}>
        <Text style={styles.deliveryCode}>{id}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusBadgeText}>{statusLabel}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View>
          <Text style={styles.orderText}>Pedido: {orderCode}</Text>
          <Text style={styles.dateText}>{date}</Text>
        </View>
        <Text style={styles.totalText}>${totalPaid.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  deliveryCode: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  statusBadge: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusBadgeText: {
    color: "#15803D",
    fontWeight: "600",
    fontSize: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  orderText: {
    fontSize: 13,
    color: "#4B5563",
    marginBottom: 4,
  },
  dateText: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#DC2626",
  },
});

export default DeliveryHistoryItem;
