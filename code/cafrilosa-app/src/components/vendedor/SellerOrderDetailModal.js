import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SellerOrderDetailModal = ({ visible, order, onClose, onMarkDelivered }) => {
  if (!order) return null;
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Detalle del Pedido</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={22} color="#111827" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Código</Text>
              <Text style={styles.sectionValue}>{order.id}</Text>
              <Text style={styles.sectionLabel}>Cliente</Text>
              <Text style={styles.sectionValue}>{order.client?.name}</Text>
              <Text style={styles.sectionLabel}>Fecha</Text>
              <Text style={styles.sectionValue}>
                {new Date(order.date).toLocaleString("es-EC", {
                  day: "2-digit",
                  month: "long",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
              <Text style={styles.sectionLabel}>Estado</Text>
              <Text style={styles.statusValue}>{order.status}</Text>
              <Text style={styles.sectionLabel}>Método de pago</Text>
              <Text style={styles.sectionValue}>{order.paymentMethod || "Pendiente"}</Text>
            </View>

            <TouchableOpacity style={styles.contactRow} onPress={() => console.log("Llamar a", order.client?.name)}>
              <Ionicons name="call-outline" size={18} color="#10B981" />
              <Text style={styles.contactText}>Llamar al cliente</Text>
            </TouchableOpacity>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Productos</Text>
              {order.items?.map((item) => (
                <View key={item.product.id} style={styles.productRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.productName}>{item.product.name}</Text>
                    <Text style={styles.productInfo}>
                      x{item.quantity} · ${item.product.price.toFixed(2)}
                    </Text>
                  </View>
                  <Text style={styles.productSubtotal}>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total a pagar</Text>
              <Text style={styles.totalValue}>${order.total.toFixed(2)}</Text>
            </View>

            {order.status !== "Entregado" && (
              <TouchableOpacity
                style={styles.deliveredButton}
                onPress={() => onMarkDelivered?.(order)}
              >
                <Text style={styles.deliveredButtonText}>Marcar como entregado</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.45)", justifyContent: "flex-end" },
  modalCard: { backgroundColor: "#FFFFFF", borderTopLeftRadius: 32, borderTopRightRadius: 32, paddingHorizontal: 24, paddingTop: 20, paddingBottom: 12, maxHeight: "80%" },
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  title: { fontSize: 18, fontWeight: "700", color: "#111827" },
  section: { marginBottom: 18 },
  sectionLabel: { color: "#9CA3AF", fontSize: 12, textTransform: "uppercase", marginTop: 10 },
  sectionValue: { fontSize: 16, fontWeight: "600", color: "#111827", marginTop: 4 },
  statusValue: { fontSize: 14, fontWeight: "700", color: "#F55A3C", marginTop: 4 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#111827", marginBottom: 10 },
  contactRow: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#ECFDF5", padding: 12, borderRadius: 16, marginBottom: 16 },
  contactText: { color: "#0F172A", fontWeight: "600" },
  productRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  productName: { fontSize: 15, fontWeight: "600", color: "#111827" },
  productInfo: { fontSize: 13, color: "#6B7280", marginTop: 2 },
  productSubtotal: { fontSize: 15, fontWeight: "700", color: "#111827" },
  totalRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 12, borderTopWidth: 1, borderColor: "#F3F4F6" },
  totalLabel: { fontSize: 15, color: "#6B7280" },
  totalValue: { fontSize: 20, fontWeight: "800", color: "#F55A3C" },
  deliveredButton: { backgroundColor: "#22C55E", borderRadius: 20, paddingVertical: 12, alignItems: "center", marginTop: 12 },
  deliveredButtonText: { color: "#FFFFFF", fontWeight: "700" },
});

export default SellerOrderDetailModal;
