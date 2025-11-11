import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const SellerCatalogProductItem = ({ product, onPressViewMore }) => {
  if (!product) return null;

  return (
    <View style={styles.card}>
      <Image source={product.image} style={styles.productImage} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.code}>Código: {product.code}</Text>
        <View style={styles.chipsRow}>
          <View style={[styles.chip, styles.categoryChip]}>
            <Text style={styles.chipText}>{product.categoryLabel}</Text>
          </View>
          <View style={[styles.chip, styles.stockChip]}>
            <Text style={styles.chipText}>Stock: {product.stockLabel}</Text>
          </View>
        </View>
        <View style={styles.footerRow}>
          <View style={styles.priceRow}>
            <Text style={styles.priceValue}>${product.price.toFixed(2)}</Text>
            <Text style={styles.priceUnit}> / {product.unit}</Text>
          </View>
          <TouchableOpacity style={styles.viewMoreButton} onPress={onPressViewMore}>
            <Text style={styles.viewMoreText}>Ver más</Text>
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
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  productImage: {
    width: 84,
    height: 84,
    borderRadius: 18,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  code: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },
  chipsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
    flexWrap: "wrap",
  },
  chip: {
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  categoryChip: {
    backgroundColor: "#E0F2FE",
  },
  stockChip: {
    backgroundColor: "#ECFDF5",
  },
  chipText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#0F172A",
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 4,
  },
  priceValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#F55A3C",
  },
  priceUnit: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 2,
  },
  viewMoreButton: {
    backgroundColor: "#F55A3C",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  viewMoreText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },
});

export default SellerCatalogProductItem;
