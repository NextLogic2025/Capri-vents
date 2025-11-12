import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const SellerProductListItem = ({ product, onAdd }) => {
  if (!product) return null;
  const fallback = require("../../assets/images/login-header-meat.png");
  const imgSrc = (product && product.image) ? product.image : fallback;

  return (
    <View style={styles.card}>
      <Image source={imgSrc} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.meta}>
          {product.code} - {product.categoryLabel}
        </Text>
        <Text style={styles.price}></Text>
        <View style={styles.statusRow}>
          <View style={[styles.stockBadge, { borderColor: product.stockColor }]}>
            <Text style={[styles.stockText, { color: product.stockColor }]}>{product.stockText}</Text>
          </View>
          {product.stockQuantity ? (
            <Text style={styles.stockQuantity}>Stock: {product.stockQuantity}</Text>
          ) : null}
        </View>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          // TODO: conectar con backend aqui para agregar el producto al pedido actual del vendedor
          onAdd?.();
        }}
      >
        <Text style={styles.addButtonText}>Agregar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 18,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  meta: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#E11D48",
    marginTop: 6,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 8,
  },
  stockBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  stockText: {
    fontSize: 11,
    fontWeight: "600",
  },
  stockQuantity: {
    fontSize: 12,
    color: "#6B7280",
  },
  addButton: {
    backgroundColor: "#F55A3C",
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginLeft: 12,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});

export default SellerProductListItem;

