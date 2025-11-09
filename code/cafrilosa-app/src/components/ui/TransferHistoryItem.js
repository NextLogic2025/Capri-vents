import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const statusColors = {
  Pendiente: "#FCD34D",
  Validada: "#34D399",
};

const TransferHistoryItem = ({ transfer, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.orderText}>Pedido #{transfer.orderId}</Text>
        <View style={[styles.badge, { backgroundColor: `${statusColors[transfer.status]}33` }]}>
          <Text style={[styles.badgeText, { color: statusColors[transfer.status] }]}>{transfer.status}</Text>
        </View>
      </View>
      <Text style={styles.dateText}>{transfer.date}</Text>
      <Text style={styles.bankText}>Banco origen: {transfer.bankName}</Text>
      <View style={styles.footer}>
        <Text style={styles.amount}>${transfer.amount.toFixed(2)}</Text>
        <Text style={styles.link}>Ver mas</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    marginBottom: 14,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
  },
  dateText: {
    fontSize: 13,
    color: "#9CA3AF",
    marginTop: 4,
    marginBottom: 6,
  },
  bankText: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 6,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  amount: {
    fontSize: 18,
    fontWeight: "700",
    color: "#E64A19",
  },
  link: {
    fontSize: 13,
    fontWeight: "700",
    color: "#F97316",
  },
});

export default TransferHistoryItem;
