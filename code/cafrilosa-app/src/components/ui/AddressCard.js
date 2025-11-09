import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const iconMap = {
  Casa: "home-outline",
  Trabajo: "office-building",
  Otra: "map-marker-outline",
};

const AddressCard = ({ address, onPressMenu }) => {
  const iconName = iconMap[address?.type] || "map-marker-outline";

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconWrapper}>
          <MaterialCommunityIcons name={iconName} size={22} color="#E64A19" />
        </View>
        <View style={styles.info}>
          <Text style={styles.title}>{address.name}</Text>
          {address.isDefault ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Predeterminada</Text>
            </View>
          ) : null}
        </View>
        <TouchableOpacity onPress={onPressMenu} style={styles.menuButton}>
          <MaterialCommunityIcons name="dots-vertical" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
      <Text style={styles.addressLine}>
        {address.street} {address.number} {address.floor ? `, Piso ${address.floor}` : ""}{" "}
        {address.apartment ? `, Depto ${address.apartment}` : ""}
      </Text>
      <Text style={styles.addressLine}>
        {address.city}, {address.province} {address.postalCode}
      </Text>
      {address.reference ? <Text style={styles.reference}>Referencia: {address.reference}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#FEF2F2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  badge: {
    marginTop: 4,
    alignSelf: "flex-start",
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    color: "#15803D",
    fontWeight: "600",
  },
  menuButton: {
    padding: 6,
  },
  addressLine: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 4,
  },
  reference: {
    fontSize: 13,
    color: "#9CA3AF",
  },
});

export default AddressCard;
