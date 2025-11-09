import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const statusColors = {
  Pendiente: "#F97316",
  Validada: "#16A34A",
};

const TransferDetailModal = ({ visible, transfer, onClose }) => {
  if (!transfer) {
    return null;
  }

  const statusColor = statusColors[transfer.status] || "#6B7280";

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Detalle de transferencia</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={22} color="#111827" />
            </TouchableOpacity>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: `${statusColor}1A` }]}>
            <Text style={[styles.statusText, { color: statusColor }]}>Transferencia {transfer.status}</Text>
          </View>
          <Text style={styles.description}>
            Este pago se encuentra en estado {transfer.status.toLowerCase()}. Te notificaremos cuando se valide.
          </Text>

          <Text style={styles.sectionTitle}>Pedido asociado</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Pedido</Text>
            <Text style={styles.value}>#{transfer.orderId}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Productos</Text>
            <Text style={styles.value}>{transfer.productsCount} productos</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Monto</Text>
            <Text style={styles.amount}>${transfer.amount.toFixed(2)}</Text>
          </View>

          <Text style={styles.sectionTitle}>Datos de la transferencia</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Operacion</Text>
            <View style={styles.copyRow}>
              <Text style={styles.value}>{transfer.operationNumber}</Text>
              <Ionicons name="copy-outline" size={16} color="#E64A19" />
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Fecha</Text>
            <Text style={styles.value}>{transfer.date}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Hora</Text>
            <Text style={styles.value}>{transfer.time}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Banco origen</Text>
            <Text style={styles.value}>{transfer.bankName}</Text>
          </View>

          <Text style={styles.sectionTitle}>Cuenta destino Cafrilosa</Text>
          <View style={styles.destinationCard}>
            <Text style={styles.destinationLabel}>{transfer.destinationBank}</Text>
            <View style={styles.copyRow}>
              <Text style={styles.destinationValue}>{transfer.destinationCbu}</Text>
              <Ionicons name="copy-outline" size={16} color="#E64A19" />
            </View>
            <Text style={styles.destinationLabel}>Alias: {transfer.destinationAlias}</Text>
          </View>

          <View style={styles.noticeBox}>
            <Ionicons name="time-outline" size={18} color="#92400E" />
            <Text style={styles.noticeText}>
              Tiempo de validacion 24-48h habiles. Guarda tu comprobante hasta confirmar el abono.
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    maxHeight: "90%",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  statusBadge: {
    marginTop: 12,
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontWeight: "700",
  },
  description: {
    fontSize: 14,
    color: "#4B5563",
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginTop: 20,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    color: "#6B7280",
  },
  value: {
    fontWeight: "600",
    color: "#111827",
  },
  amount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#E64A19",
  },
  copyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  destinationCard: {
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    padding: 14,
  },
  destinationLabel: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 6,
  },
  destinationValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  noticeBox: {
    marginTop: 18,
    backgroundColor: "#FEF3C7",
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  noticeText: {
    color: "#92400E",
    flex: 1,
    fontSize: 13,
  },
});

export default TransferDetailModal;
