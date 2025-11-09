import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const DeliveryCurrentCard = ({ delivery, onCallDriver, onViewLocation }) => {
  if (!delivery) {
    return null;
  }

  const {
    orderCode,
    statusLabel,
    progress = 0,
    etaText,
    address,
    driverName,
    driverInitials,
    driverPlate,
  } = delivery;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Tu pedido esta en camino</Text>
          <Text style={styles.orderCode}>{orderCode}</Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusBadgeText}>{statusLabel}</Text>
        </View>
      </View>

      <View style={styles.progressHeader}>
        <Text style={styles.sectionLabel}>Progreso de entrega</Text>
        <Text style={styles.sectionValue}>{progress}%</Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      <View style={styles.etaCard}>
        <View style={styles.etaIcon}>
          <Ionicons name="time-outline" size={18} color="#1E3A8A" />
        </View>
        <View>
          <Text style={styles.etaLabel}>Llegada estimada</Text>
          <Text style={styles.etaValue}>{etaText}</Text>
        </View>
      </View>

      <View style={styles.addressCard}>
        <View style={styles.addressIcon}>
          <Ionicons name="location-outline" size={18} color="#0F172A" />
        </View>
        <Text style={styles.addressText}>{address}</Text>
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
          style={styles.driverCallButton}
          onPress={() => {
            if (onCallDriver) {
              onCallDriver();
            }
          }}
        >
          <Ionicons name="call" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.locationButton}
        onPress={() => {
          if (onViewLocation) {
            onViewLocation();
          }
        }}
      >
        <MaterialCommunityIcons name="map-marker-distance" size={20} color="#FFFFFF" />
        <Text style={styles.locationButtonText}>Ver ubicacion en tiempo real</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E0E7FF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  orderCode: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  statusBadge: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusBadgeText: {
    color: "#1E40AF",
    fontWeight: "600",
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  sectionLabel: {
    fontSize: 13,
    color: "#475467",
    fontWeight: "600",
  },
  sectionValue: {
    fontSize: 13,
    color: "#111827",
    fontWeight: "700",
  },
  progressTrack: {
    height: 8,
    borderRadius: 12,
    backgroundColor: "#E5E7EB",
    overflow: "hidden",
    marginBottom: 18,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#2563EB",
    borderRadius: 12,
  },
  etaCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF2FF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
  },
  etaIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#DBE4FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  etaLabel: {
    fontSize: 12,
    color: "#475467",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  etaValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1D4ED8",
    marginTop: 4,
  },
  addressCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
  },
  addressIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#EEF2FF",
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
  driverCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    marginBottom: 20,
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
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#22C55E",
    alignItems: "center",
    justifyContent: "center",
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DC2626",
    borderRadius: 24,
    paddingVertical: 14,
  },
  locationButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 8,
  },
});

export default DeliveryCurrentCard;
