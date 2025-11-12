import React from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProfileOptionItem from "../../components/ui/ProfileOptionItem";

const vendedor = {
  initials: "CM",
  name: "Carlos Mendoza",
  email: "carlos.mendoza@cafrilosa.com",
  idCode: "VEND-2024-045",
  zone: "Zona Norte",
  salesToday: 3450,
  clientsCount: 12,
  goalPercent: 86,
};

const VendedorPerfilScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top + 8 }]}> 
      <View style={styles.header}>
        <Text style={styles.title}>Perfil</Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            navigation.reset({ index: 0, routes: [{ name: "Login" }] });
          }}
        >
          <Ionicons name="exit-outline" size={22} color="#F55A3C" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 28 }}
        showsVerticalScrollIndicator={false}
      >
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{vendedor.initials}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{vendedor.name}</Text>
          <Text style={styles.email}>{vendedor.email}</Text>
          <Text style={styles.metaText}>ID: {vendedor.idCode} • {vendedor.zone}</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Mi Cuenta</Text>
      </View>

      <ProfileOptionItem
        icon={<Ionicons name="person-outline" size={22} color="#F55A3C" />}
        title="Datos Personales"
        subtitle="Actualizar tu información"
        onPress={() => navigation.navigate("VendedorDatosPersonales")}
      />
      <ProfileOptionItem
        icon={<Ionicons name="settings-outline" size={22} color="#F97316" />}
        title="Configuraciones"
        subtitle="Notificaciones y modo oscuro"
        onPress={() => navigation.navigate("VendedorConfiguraciones")}
      />
      <ProfileOptionItem
        icon={<Ionicons name="map-outline" size={22} color="#2563EB" />}
        title="Mi Zona y Ruta"
        subtitle="Conoce tu cobertura"
        onPress={() => navigation.navigate("VendedorZonaRuta")}
      />
      <ProfileOptionItem
        icon={<Ionicons name="help-buoy-outline" size={22} color="#EF4444" />}
        title="Soporte"
        subtitle="Centro de ayuda y tickets"
        onPress={() => navigation.navigate("VendedorCentroAyuda")}
      />
      </ScrollView>
    </SafeAreaView>
  );
};

const Stat = ({ label, value }) => (
  <View style={styles.statCard}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F7F7FB", paddingHorizontal: 20 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  title: { fontSize: 24, fontWeight: "700", color: "#111827" },
  logoutButton: { width: 42, height: 42, borderRadius: 21, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center" },
  profileCard: { flexDirection: "row", backgroundColor: "#FFFFFF", borderRadius: 24, padding: 18, alignItems: "center", marginBottom: 16 },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: "#F55A3C", alignItems: "center", justifyContent: "center", marginRight: 16 },
  avatarText: { color: "#FFFFFF", fontSize: 22, fontWeight: "700" },
  name: { fontSize: 18, fontWeight: "700", color: "#111827" },
  email: { color: "#6B7280", marginTop: 2 },
  metaText: { color: "#9CA3AF", marginTop: 4 },
  sectionHeader: { marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#111827" },
});

export default VendedorPerfilScreen;
