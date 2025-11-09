import React from "react";
import { View, Text, StyleSheet } from "react-native";

const OrderSummaryCard = ({ inProgressCount, completedCount }) => {
  return (
    <View style={styles.card}>
      <View style={[styles.summaryBox, styles.progressBox]}>
        <Text style={styles.summaryLabel}>En proceso</Text>
        <Text style={styles.summaryValue}>{inProgressCount} pedidos</Text>
      </View>
      <View style={[styles.summaryBox, styles.summaryBoxSpacing, styles.completedBox]}>
        <Text style={styles.summaryLabel}>Completados</Text>
        <Text style={styles.summaryValue}>{completedCount} pedidos</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  summaryBox: {
    flex: 1,
    borderRadius: 18,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  summaryBoxSpacing: {
    marginLeft: 16,
  },
  progressBox: {
    backgroundColor: "#E0F2FE",
  },
  completedBox: {
    backgroundColor: "#DCFCE7",
  },
  summaryLabel: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
});

export default OrderSummaryCard;

