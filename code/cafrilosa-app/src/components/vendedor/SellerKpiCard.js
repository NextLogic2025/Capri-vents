import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SellerKpiCard = ({ title, value, subtitle, iconName = "analytics-outline", progress = 0, progressColor = "#4CAF50" }) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrapper}>
        <Ionicons name={iconName} size={20} color="#F55A3C" />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${Math.min(progress, 1) * 100}%`, backgroundColor: progressColor }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexBasis: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(245,90,60,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 4,
  },
  value: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 2,
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E5E7EB",
    marginTop: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
  },
});

export default SellerKpiCard;

