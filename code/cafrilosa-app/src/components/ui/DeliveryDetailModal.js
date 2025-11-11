import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DeliveryDetailModal = ({ visible, delivery, onClose, onCallDriver }) => {
  if (!delivery) {
    return null;
  }

  const {
    id,
    deliveryId = id,
    statusLabel,
    statusColor = "#22C55E",
    date,
    orderCode,
    driverName,
    driverInitials,
    driverPlate,
    address,
    products = [],
    totalPaid = 0,
  } = delivery;

  const handleCallDriver = () => {
    if (onCallDriver) {
      onCallDriver();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={22} color="#111827" />
          </TouchableOpacity>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.modalScrollContent}>
            <View style={styles.header}>
              <View>
                <Text style={styles.deliveryCode}>{deliveryId}</Text>
                <Text style={styles.headerSubtitle}>{orderCode}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: `${statusColor}1A` }]}>
                <Text style={[styles.statusBadgeText, { color: statusColor }]}>{statusLabel}</Text>
              </View>
            </View>

            <Text style={styles.modalTitle}>Detalles de Entrega</Text>

            <View style={styles.infoRow}>
              <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>Fecha</Text>
                <Text style={styles.infoValue}>{date}</Text>
              </View>
              <View style={[styles.infoCard, styles.infoCardSpacing]}>
                <Text style={styles.infoLabel}>Pedido</Text>
                <Text style={styles.infoValue}>{orderCode}</Text>
              </View>
            </View>

            <View style={styles.driverCard}>
              <View style={styles.driverAvatar}>
                <Text style={styles.driverAvatarText}>{driverInitials}</Text>
              </View>
              <View style={styles.driverInfo}>
                <Text style={styles.driverName}>{driverName}</Text>
                <Text style={styles.driverPlate}>{driverPlate}</Text>
              </View>
              <TouchableOpacity style={styles.driverCallButton} onPress={handleCallDriver}>
                <Ionicons name="call" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.addressCard}>
              <View style={styles.addressIcon}>
                <Ionicons name="location-outline" size={18} color="#B91C1C" />
              </View>
              <Text style={styles.addressText}>{address}</Text>
            </View>

            <Text style={styles.sectionTitle}>Productos Entregados</Text>
            <View style={styles.productsList}>
              {products.map((product) => (
                <View key={product.id} style={styles.productCard}>
                  <Image source={product.image} style={styles.productImage} />
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productQty}>Cantidad: {product.quantity}</Text>
                  </View>
                  <Text style={styles.productTotal}>${product.totalPrice.toFixed(2)}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          <View style={styles.totalBar}>
            <Text style={styles.totalLabel}>Total pagado</Text>
            <Text style={styles.totalValue}>${totalPaid.toFixed(2)}</Text>
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
  container: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    maxHeight: "90%",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 12,
  },
  deliveryCode: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 18,
  },
  statusBadgeText: {
    fontWeight: "700",
    fontSize: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  infoCard: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 18,
    padding: 16,
  },
  infoCardSpacing: {
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 6,
    textTransform: "uppercase",
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  driverCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    padding: 16,
    backgroundColor: "#FFF1F2",
    marginBottom: 16,
  },
  driverAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#F87171",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  driverAvatarText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  driverPlate: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
  driverCallButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#22C55E",
    alignItems: "center",
    justifyContent: "center",
  },
  addressCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 18,
    backgroundColor: "#F3F4F6",
    padding: 16,
    marginBottom: 16,
  },
  addressIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FEE2E2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  addressText: {
    flex: 1,
    fontSize: 14,
    color: "#1F2937",
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  productsList: {
    marginBottom: 20,
  },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    marginBottom: 12,
  },
  productImage: {
    width: 56,
    height: 56,
    borderRadius: 12,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
  productQty: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  productTotal: {
    fontSize: 15,
    fontWeight: "700",
    color: "#DC2626",
  },
  totalBar: {
    marginTop: 12,
    backgroundColor: "#DC2626",
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  totalLabel: {
    color: "#FFE4E6",
    fontSize: 15,
    fontWeight: "600",
  },
  totalValue: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  modalScrollContent: {
    paddingBottom: 24,
  },
});

export default DeliveryDetailModal;
