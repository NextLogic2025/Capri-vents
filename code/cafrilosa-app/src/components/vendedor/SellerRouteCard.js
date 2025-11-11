import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const SellerRouteCard = ({ route, onPressButton, onPressPhone }) => {
  if (!route) return null;

  const {
    time,
    badgeLabel,
    badgeColor,
    clientName,
    contactName,
    address,
    lastPurchaseDate,
    avgMonthly,
    summaryType,
    summaryValueText,
    buttonLabel,
    buttonColor,
    showPhoneButton,
    completed,
  } = route;

  return (
    <View style={[styles.card, { borderLeftColor: badgeColor }]}>
      <View style={styles.cardHeader}>
        <Text style={styles.time}>{time}</Text>
        <View style={[styles.badge, { backgroundColor: `${badgeColor}22` }]}>
          <Text style={[styles.badgeText, { color: badgeColor }]}>{badgeLabel}</Text>
        </View>
        {completed ? (
          <View style={styles.completedIcon}>
            <Ionicons name="checkmark-circle" size={18} color="#2E7D32" />
          </View>
        ) : null}
      </View>

      <View style={styles.clientInfo}>
        <Text style={styles.clientName}>{clientName}</Text>
        <Text style={styles.contactText}>{contactName}</Text>
        <View style={styles.addressRow}>
          <Ionicons name="location-outline" size={15} color="#6B7280" />
          <Text style={styles.addressText}>{address}</Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaBox}>
          <Text style={styles.metaLabel}>Última compra</Text>
          <Text style={styles.metaValue}>{lastPurchaseDate}</Text>
        </View>
        <View style={styles.metaBox}>
          <Text style={styles.metaLabel}>Promedio</Text>
          <Text style={styles.metaValue}>{avgMonthly}</Text>
        </View>
      </View>

      <View style={styles.summaryBox}>
        <Ionicons name="pricetag-outline" size={16} color="#1D4ED8" />
        <Text style={styles.summaryText}>
          {summaryType}: {summaryValueText || "Detalle pendiente"}
        </Text>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: buttonColor || "#2563EB" }]}
          onPress={() => {
            // TODO: conectar con backend aquí para registrar acciones del vendedor (iniciar visita, registrar pedido, registrar cobro, etc.)
            console.log("Acción principal vendedor:", buttonLabel, clientName);
            onPressButton?.(route);
          }}
        >
          <Text style={styles.primaryButtonText}>{buttonLabel}</Text>
        </TouchableOpacity>
        {showPhoneButton ? (
          <TouchableOpacity
            style={styles.phoneButton}
            onPress={() => {
              // TODO: conectar con backend aquí para disparar llamada/auditoria del vendedor
              console.log("Llamar al cliente:", contactName);
              onPressPhone?.(route);
            }}
          >
            <MaterialCommunityIcons name="phone" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  time: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginRight: 10,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  completedIcon: {
    marginLeft: "auto",
  },
  clientInfo: {
    marginBottom: 12,
  },
  clientName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  contactText: {
    fontSize: 13,
    color: "#4B5563",
    marginTop: 2,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  addressText: {
    marginLeft: 4,
    color: "#6B7280",
    fontSize: 12,
  },
  metaRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  metaBox: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    padding: 10,
  },
  metaLabel: {
    fontSize: 11,
    color: "#6B7280",
  },
  metaValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
    marginTop: 2,
  },
  summaryBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0F2FE",
    borderRadius: 16,
    padding: 10,
    marginBottom: 12,
  },
  summaryText: {
    marginLeft: 6,
    color: "#1E3A8A",
    fontSize: 13,
    flex: 1,
    fontWeight: "600",
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  primaryButton: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  phoneButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#22C55E",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SellerRouteCard;

