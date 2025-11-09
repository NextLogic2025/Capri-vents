import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProductListItem = ({ product, quantity, onIncrease, onDecrease, onAdd, onPress }) => {
  const { category, name, price, oldPrice, image, stock } = product;

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.topRow} activeOpacity={0.9} onPress={onPress}>
        <Image source={image} style={styles.image} />
        <View style={styles.infoWrapper}>
          <Text style={styles.category}>{category}</Text>
          <Text style={styles.name} numberOfLines={2}>
            {name}
          </Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>${price.toFixed(2)}</Text>
            {oldPrice ? <Text style={styles.oldPrice}>${oldPrice.toFixed(2)}</Text> : null}
          </View>
          <Text style={styles.stock}>Stock: {stock}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.bottomRow}>
        <View style={styles.quantityBox}>
          <TouchableOpacity onPress={onDecrease}>
            <Ionicons name="remove-circle-outline" size={24} color="#E64A19" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={onIncrease}>
            <Ionicons name="add-circle-outline" size={24} color="#E64A19" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={onAdd}>
          <Text style={styles.addButtonText}>Agregar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  topRow: {
    flexDirection: "row",
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 16,
    marginRight: 16,
  },
  infoWrapper: {
    flex: 1,
  },
  category: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#E64A19",
  },
  oldPrice: {
    fontSize: 14,
    color: "#9CA3AF",
    textDecorationLine: "line-through",
    marginLeft: 8,
  },
  stock: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  quantityBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F8",
    borderRadius: 22,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginHorizontal: 10,
  },
  addButton: {
    backgroundColor: "#F28B82",
    borderRadius: 22,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});

export default ProductListItem;

