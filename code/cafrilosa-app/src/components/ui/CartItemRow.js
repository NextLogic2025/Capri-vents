import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const CartItemRow = ({ item, onIncrease, onDecrease, onRemove, onPress }) => {
  if (!item) {
    return null;
  }

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.mainContent} onPress={onPress} activeOpacity={0.85}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.weight}>{item.weight}</Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
          <MaterialCommunityIcons name="trash-can-outline" size={18} color="#991B1B" />
        </TouchableOpacity>
        <View style={styles.quantityControl}>
          <TouchableOpacity onPress={onDecrease}>
            <Ionicons name="remove-circle-outline" size={22} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={onIncrease}>
            <Ionicons name="add-circle-outline" size={22} color="#1F2937" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 14,
    marginBottom: 16,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 3,
  },
  mainContent: {
    flexDirection: "row",
    flex: 1,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 18,
    marginRight: 14,
  },
  info: {
    flex: 1,
    justifyContent: "space-between",
  },
  category: {
    fontSize: 12,
    color: "#9CA3AF",
    textTransform: "uppercase",
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginTop: 2,
  },
  weight: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#DC2626",
    marginTop: 6,
  },
  actions: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginLeft: 12,
  },
  removeButton: {
    padding: 6,
    borderRadius: 16,
    backgroundColor: "#FEE2E2",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
    marginHorizontal: 8,
  },
});

export default CartItemRow;
