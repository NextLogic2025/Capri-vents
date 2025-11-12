import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const InProgressOrderCard = ({ order, onAddItems, onShowDetails }) => {
  const { id, date, status, items, total } = order;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.orderId}>{id}</Text>
        <View style={styles.statusBadge}>
          <Ionicons name="time-outline" size={14} color="#D97706" />
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>
      <Text style={styles.date}>{date}</Text>

      <View style={styles.itemsPreview}>
        {items.slice(0, 2).map((item) => (
          <Image key={item.id} source={item.image} style={styles.itemImage} />
        ))}
        {items.length > 2 && <View style={styles.moreItemsIndicator}>
            <Text style={styles.moreItemsText}>+{items.length - 2}</Text>
        </View>}
      </View>

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total Actual</Text>
        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
      </View>

      <View style={styles.addItemsContainer}>
        <Ionicons name="information-circle-outline" size={20} color="#4B5563" />
        <Text style={styles.addItemsText}>
          ¿Olvidaste algo? Todavía puedes agregar más productos a tu pedido.
        </Text>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.addItemsButton} onPress={onAddItems}>
          <Ionicons name="add-circle-outline" size={20} color="#FFFFFF" />
          <Text style={styles.addItemsButtonText}>Agregar Productos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.detailsButton} onPress={onShowDetails}>
          <Text style={styles.detailsButtonText}>Ver Detalles</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFBEB",
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#FBBF24",
    shadowColor: "#FBBF24",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  orderId: {
    fontSize: 18,
    fontWeight: "800",
    color: "#92400E",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF3C7",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  statusText: {
    color: "#D97706",
    fontWeight: "700",
    fontSize: 13,
    marginLeft: 6,
  },
  date: {
    fontSize: 14,
    color: "#B45309",
    marginBottom: 16,
  },
  itemsPreview: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    marginLeft: -8,
  },
  moreItemsIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FDE68A",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -8,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  moreItemsText: {
    color: "#92400E",
    fontWeight: "700",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#FDE68A",
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#92400E",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#C2410C",
  },
  addItemsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF9C3",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  addItemsText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#78350F",
    lineHeight: 20,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addItemsButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EA580C",
    borderRadius: 16,
    paddingVertical: 12,
    marginRight: 8,
  },
  addItemsButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
    marginLeft: 8,
  },
  detailsButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#FDBA74",
  },
  detailsButtonText: {
    color: "#C2410C",
    fontWeight: "700",
    fontSize: 15,
  },
});

export default InProgressOrderCard;
