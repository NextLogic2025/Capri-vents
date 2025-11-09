import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const OfferProductCard = ({ offer, onPress, onAdd }) => {
  const { name, discount, rating, price, oldPrice, image, stock } = offer;

  return (
    <View style={styles.card}>
      {discount > 0 ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>-{discount}%</Text>
        </View>
      ) : null}
      <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
        <Image source={image} style={styles.image} />
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={14} color="#FACC15" />
          <Text style={styles.ratingText}>{rating?.toFixed(1) || "4.5"}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
          {oldPrice ? <Text style={styles.oldPrice}>${oldPrice.toFixed(2)}</Text> : null}
        </View>
        <Text style={styles.stock}>Stock: {stock}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={onAdd}>
        <Text style={styles.addButtonText}>Agregar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    position: "relative",
    marginBottom: 16,
  },
  badge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#E64A19",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    zIndex: 2,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  image: {
    width: "100%",
    height: 90,
    borderRadius: 18,
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  ratingText: {
    color: "#6B7280",
    fontSize: 13,
    marginLeft: 4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
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
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#E64A19",
    borderRadius: 22,
    paddingVertical: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});

export default OfferProductCard;

