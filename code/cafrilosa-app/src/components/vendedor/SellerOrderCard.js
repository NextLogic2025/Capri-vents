import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SellerOrderCard = ({ order, onAccept, onViewDetails }) => {
  if (!order) return null;
  const formattedDate = new Date(order.date).toLocaleDateString("es-EC", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const formattedTime = new Date(order.date).toLocaleTimeString("es-EC", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const isPending = order.status === "Pendiente";

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.orderCode}>{order.id}</Text>
          <Text style={styles.clientName}>{order.client?.name}</Text>
        </View>
        <View style={[styles.statusBadge, getStatusBadgeStyle(order.status)]}>
          <Text style={[styles.statusText, getStatusTextStyle(order.status)]}>{order.status}</Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <Meta icon="calendar-outline" label={`${formattedDate} · ${formattedTime}`} />
        <Meta icon="cube-outline" label={`${order.items?.length || 0} productos`} />
        <Meta icon="card-outline" label={order.paymentMethod || "Pendiente"} />
      </View>

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>${order.total.toFixed(2)}</Text>
      </View>

      <View style={styles.actionsRow}>
        {isPending ? (
          <TouchableOpacity style={styles.acceptButton} onPress={() => onAccept?.(order)}>
            <Text style={styles.acceptButtonText}>Aceptar Pedido</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.acceptedBadge}>
            <Ionicons name="checkmark-circle" color="#22C55E" size={18} />
            <Text style={styles.acceptedText}>Pedido aprobado</Text>
          </View>
        )}
        <TouchableOpacity style={styles.detailButton} onPress={() => onViewDetails?.(order)}>
          <Text style={styles.detailText}>Ver detalles</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Meta = ({ icon, label }) => (
  <View style={styles.metaItem}>
    <Ionicons name={icon} size={15} color="#6B7280" />
    <Text style={styles.metaText}>{label}</Text>
  </View>
);

const getStatusBadgeStyle = (status) => {
  if (status === "Entregado") return styles.statusDelivered;
  if (status === "Aprobado") return styles.statusApproved;
  return styles.statusPending;
};

const getStatusTextStyle = (status) => {
  if (status === "Entregado") return styles.statusTextDelivered;
  if (status === "Aprobado") return styles.statusTextApproved;
  return styles.statusTextPending;
};

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
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  orderCode: { fontSize: 14, fontWeight: "700", color: "#F55A3C" },
  clientName: { fontSize: 16, fontWeight: "700", color: "#111827", marginTop: 4 },
  statusBadge: { borderRadius: 16, paddingHorizontal: 12, paddingVertical: 4 },
  statusText: { fontSize: 12, fontWeight: "700" },
  statusDelivered: { backgroundColor: "#DCFCE7" },
  statusApproved: { backgroundColor: "#E0F2FE" },
  statusPending: { backgroundColor: "#FEE2E2" },
  statusTextDelivered: { color: "#15803D" },
  statusTextApproved: { color: "#0369A1" },
  statusTextPending: { color: "#B91C1C" },
  metaRow: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 14 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  metaText: { color: "#6B7280", fontSize: 12 },
  totalRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 16 },
  totalLabel: { color: "#6B7280", fontSize: 13 },
  totalValue: { fontSize: 20, fontWeight: "800", color: "#F55A3C" },
  actionsRow: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 18 },
  acceptButton: { flex: 1, backgroundColor: "#F55A3C", borderRadius: 18, paddingVertical: 10, alignItems: "center" },
  acceptButtonText: { color: "#FFFFFF", fontWeight: "700" },
  detailButton: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 18, borderWidth: 1, borderColor: "#F55A3C" },
  detailText: { color: "#F55A3C", fontWeight: "700" },
  acceptedBadge: { flex: 1, flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#ECFDF5", borderRadius: 18, paddingVertical: 10, paddingHorizontal: 12 },
  acceptedText: { color: "#15803D", fontWeight: "700" },
});

export default SellerOrderCard;
