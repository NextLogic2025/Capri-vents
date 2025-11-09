import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CategoryCard = ({ category, onPress }) => {
  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: category.color }]} onPress={onPress}>
      <View style={styles.iconWrapper}>
        <Ionicons name={category.icon} size={20} color="#E64A19" />
      </View>
      <Text style={styles.name}>{category.name}</Text>
      <Text style={styles.count}>{category.count} productos</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 140,
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  count: {
    fontSize: 13,
    color: "#6B7280",
  },
});

export default CategoryCard;

