import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SellerClientCard = ({ client, onNewOrder, onCall, onProfile }) => {
  if (!client) return null;
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.clientInfo}>
          <View style={styles.iconWrapper}>
            <Ionicons name="storefront-outline" size={20} color="#F55A3C" />
          </View>
          <View>
            <Text style={styles.name}>{client.name}</Text>
            <Text style={styles.contact}>{client.contactName}</Text>
          </View>
        </View>
        <Text style={styles.totalText}>${client.total.toLocaleString("es-EC")}</Text>
      </View>

      <View style={styles.badgeRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{client.segment}</Text>
        </View>
        <View style={styles.badgeSoft}>
          <Text style={styles.badgeSoftText}>{client.frequency}</Text>
        </View>
      </View>

      <View style={styles.metricsRow}>
        <Metric label="Promedio" value={`$${client.average}`} />
        <Metric label="Crédito" value={`${client.creditDays} días`} />
        <Metric label="Saldo" value={`$${client.balance}`} />
      </View>

      <View style={styles.noteBox}>
        <Ionicons name="information-circle-outline" size={16} color="#2563EB" />
        <Text style={styles.noteText}>{client.notes}</Text>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => onProfile?.(client)}>
          <Text style={styles.secondaryButtonText}>Ver Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryButton} onPress={() => onNewOrder?.(client)}>
          <Text style={styles.primaryButtonText}>Nuevo Pedido</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.callButton} onPress={() => onCall?.(client)}>
          <Ionicons name="call-outline" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Metric = ({ label, value }) => (
  <View style={styles.metricCard}>
    <Text style={styles.metricLabel}>{label}</Text>
    <Text style={styles.metricValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  clientInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFE6E0",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  contact: {
    color: "#6B7280",
    fontSize: 13,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#F55A3C",
  },
  badgeRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  badge: {
    backgroundColor: "#EDE9FE",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 14,
  },
  badgeText: {
    color: "#6D28D9",
    fontWeight: "700",
    fontSize: 12,
  },
  badgeSoft: {
    backgroundColor: "#F0FDFA",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  badgeSoftText: {
    color: "#0D9488",
    fontWeight: "600",
    fontSize: 12,
  },
  metricsRow: {
    flexDirection: "row",
    marginTop: 14,
    gap: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    paddingVertical: 10,
    alignItems: "center",
  },
  metricLabel: {
    fontSize: 12,
    color: "#6B7280",
  },
  metricValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
    marginTop: 4,
  },
  noteBox: {
    flexDirection: "row",
    gap: 6,
    backgroundColor: "#EFF6FF",
    padding: 12,
    borderRadius: 16,
    marginTop: 14,
  },
  noteText: {
    flex: 1,
    color: "#1D4ED8",
    fontSize: 13,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 16,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingVertical: 10,
    borderRadius: 18,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#111827",
    fontWeight: "600",
  },
  primaryButton: {
    flex: 1,
    backgroundColor: "#F55A3C",
    paddingVertical: 10,
    borderRadius: 18,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  callButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#22C55E",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SellerClientCard;
