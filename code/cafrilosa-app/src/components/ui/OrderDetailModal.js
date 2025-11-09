import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const OrderDetailModal = ({ visible, order, onClose, onProblemPress }) => {
  if (!order) {
    return null;
  }

  const { id, items, subtotal, shippingCost, total, address, estimatedDeliveryDate, paymentMethod, tracking } = order;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <View style={styles.headerRow}>
            <Text style={styles.modalTitle}>Detalle del Pedido</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#111827" />
            </TouchableOpacity>
          </View>
          <Text style={styles.orderId}>{id}</Text>

          <TouchableOpacity style={styles.problemButton} onPress={onProblemPress}>
            <Ionicons name="alert-circle-outline" size={20} color="#FFFFFF" />
            <Text style={styles.problemButtonText}>?Tuviste algUn problema con este pedido?</Text>
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionTitle}>Productos Ordenados</Text>
            {items.map((item) => (
              <View key={item.id} style={styles.detailItem}>
                <Text style={styles.detailItemName}>{item.name}</Text>
                <Text style={styles.detailItemInfo}>
                  Cantidad: {item.quantity} unidades ? Precio unitario: ${item.unitPrice.toFixed(2)}
                </Text>
                <Text style={styles.detailItemTotal}>${(item.quantity * item.unitPrice).toFixed(2)}</Text>
              </View>
            ))}

            <View style={styles.totalBox}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Subtotal</Text>
                <Text style={styles.totalValue}>${subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Envio</Text>
                <Text style={styles.totalValue}>{shippingCost === 0 ? "GRATIS" : `$${shippingCost.toFixed(2)}`}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabelStrong}>Total</Text>
                <Text style={styles.totalValueStrong}>${total.toFixed(2)}</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Informacion de Entrega</Text>
            <View style={styles.metaRow}>
              <Ionicons name="location-outline" size={18} color="#6B7280" />
              <Text style={styles.metaText}>{address}</Text>
            </View>
            <View style={styles.metaRow}>
              <Ionicons name="calendar-outline" size={18} color="#6B7280" />
              <Text style={styles.metaText}>Entrega estimada: {estimatedDeliveryDate}</Text>
            </View>
            <View style={styles.metaRow}>
              <Ionicons name="card-outline" size={18} color="#6B7280" />
              <Text style={styles.metaText}>Metodo de pago: {paymentMethod}</Text>
            </View>

            <Text style={styles.sectionTitle}>Seguimiento del Pedido</Text>
            {tracking.map((step) => (
              <View key={step.label} style={styles.trackingRow}>
                <View
                  style={[styles.trackingIndicator, step.completed && styles.trackingIndicatorCompleted]}
                />
                <View style={styles.trackingInfo}>
                  <Text style={styles.trackingLabel}>{step.label}</Text>
                  <Text style={styles.trackingDate}>{step.date || "Pendiente"}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
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
  modalCard: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    maxHeight: "90%",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  orderId: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 12,
  },
  problemButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EF4444",
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  problemButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginTop: 16,
    marginBottom: 10,
  },
  detailItem: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
  },
  detailItemName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  detailItemInfo: {
    fontSize: 13,
    color: "#6B7280",
  },
  detailItemTotal: {
    fontSize: 15,
    fontWeight: "700",
    color: "#E64A19",
    marginTop: 6,
  },
  totalBox: {
    backgroundColor: "#F9FAFB",
    borderRadius: 24,
    padding: 16,
    marginTop: 6,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  totalLabel: {
    color: "#6B7280",
  },
  totalValue: {
    color: "#111827",
    fontWeight: "600",
  },
  totalLabelStrong: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  totalValueStrong: {
    fontSize: 18,
    fontWeight: "700",
    color: "#E64A19",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  metaText: {
    fontSize: 13,
    color: "#6B7280",
    marginLeft: 8,
  },
  trackingRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  trackingIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    marginTop: 4,
  },
  trackingIndicatorCompleted: {
    borderColor: "#22C55E",
    backgroundColor: "#22C55E",
  },
  trackingInfo: {
    marginLeft: 12,
  },
  trackingLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  trackingDate: {
    fontSize: 12,
    color: "#6B7280",
  },
});

export default OrderDetailModal;

