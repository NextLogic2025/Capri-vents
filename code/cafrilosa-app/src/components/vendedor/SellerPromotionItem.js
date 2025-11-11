import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const SellerPromotionItem = ({ promo }) => {
  if (!promo) return null;

  return (
    <View style={styles.item}>
      <Image source={promo.image} style={styles.image} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.title}>{promo.title}</Text>
        <Text style={styles.description}>{promo.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF6E0",
    borderRadius: 18,
    padding: 12,
    marginBottom: 12,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: "#4B5563",
  },
});

export default SellerPromotionItem;

