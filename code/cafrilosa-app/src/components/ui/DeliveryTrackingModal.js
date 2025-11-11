import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const mapPlaceholder = require("../../assets/images/map-placeholder.png");

const DeliveryTrackingModal = ({ visible, delivery, onClose, onViewDetails, onCallDriver }) => {
  if (!delivery) {
    return null;
  }

  const { orderCode, progress = 0, etaText, driverName, driverInitials, driverPlate, address } = delivery;

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Ubicacion en Tiempo Real</Text>
          <Text style={styles.modalSubtitle}>{orderCode}</Text>
          <View style={styles.mapWrapper}>
            {/* TODO: reemplazar por mapa real (react-native-maps) */}
            <Image source={mapPlaceholder} style={styles.mapImage} />
            <View style={styles.mapTag}>
              <Text style={styles.mapTagTitle}>Conductor en ruta</Text>
              <Text style={styles.mapTagSubtitle}>Av. 10 de Agosto y Colon</Text>
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
            <TouchableOpacity
              style={styles.callButton}
              onPress={() => {
                if (onCallDriver) {
                  onCallDriver();
                }
              }}
            >
              <Ionicons name="call" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.statsRow}>
            <View style={[styles.statCard, styles.statCardSpacing]}>
              <Text style={styles.statLabel}>Progreso</Text>
              <Text style={styles.statValue}>{progress}%</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Llegada</Text>
              <Text style={styles.statValue}>{etaText}</Text>
            </View>
          </View>

          <View style={styles.addressCard}>
            <View style={styles.addressIcon}>
              <Ionicons name="location-outline" size={18} color="#DC2626" />
            </View>
            <Text style={styles.addressText}>{address}</Text>
          </View>

          <TouchableOpacity style={styles.detailsButton} onPress={onViewDetails}>
            <MaterialCommunityIcons name="file-document-outline" size={18} color="#B91C1C" />
            <Text style={styles.detailsButtonText}>Ver detalles de entrega</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 24,
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
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 18,
  },
  mapWrapper: {
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 20,
  },
  mapImage: {
    width: "100%",
    height: 200,
  },
  mapTag: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  mapTagTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
  },
  mapTagSubtitle: {
    fontSize: 12,
    color: "#4B5563",
    marginTop: 2,
  },
  driverCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },
  driverAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F87171",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
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
  callButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#22C55E",
    alignItems: "center",
    justifyContent: "center",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFF1F2",
    borderRadius: 18,
    padding: 16,
  },
  statCardSpacing: {
    marginRight: 12,
  },
  statLabel: {
    fontSize: 12,
    color: "#9F1239",
    marginBottom: 6,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#BE123C",
  },
  addressCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 18,
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
  },
  detailsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#FECACA",
    paddingVertical: 14,
    backgroundColor: "#FEF2F2",
  },
  detailsButtonText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "700",
    color: "#B91C1C",
  },
});

export default DeliveryTrackingModal;
