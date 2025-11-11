import React from "react";
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
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
            // TODO: limpiar sesión real en backend cuando se implemente auth
            navigation.reset({ index: 0, routes: [{ name: "Login" }] });
          }}
        >
          <Ionicons name="exit-outline" size={22} color="#F55A3C" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={18} color="#9CA3AF" />
        <TextInput style={styles.searchInput} placeholder="Buscar dato..." placeholderTextColor="#9CA3AF" />
      </View>

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

      <View style={styles.statsRow}>
        <Stat label="Ventas Hoy" value={`$${vendedor.salesToday.toLocaleString("es-EC")}`} />
        <Stat label="Clientes" value={`${vendedor.clientsCount}`} />
        <Stat label="Meta" value={`${vendedor.goalPercent}%`} />
      </View>

      <View style={styles.goalCard}>
        <View style={styles.goalHeader}>
          <Text style={styles.goalTitle}>Meta Mensual</Text>
          <Text style={styles.goalPercent}>{vendedor.goalPercent}%</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressBar, { width: `${vendedor.goalPercent}%` }]} />
        </View>
        <Text style={styles.goalSubtitle}>$128,450 de $150,000 · Faltan $21,550</Text>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Mi Cuenta</Text>
      </View>

      <ProfileOptionItem
        icon="person-outline"
        title="Datos Personales"
        subtitle="Actualizar tu información"
        onPress={() => console.log("Datos personales vendedor")}
      />
      <ProfileOptionItem
        icon="notifications-outline"
        title="Notificaciones"
        subtitle="Configuración de alertas"
        onPress={() => console.log("Notificaciones vendedor")}
      />
      <ProfileOptionItem
        icon="map-outline"
        title="Mi Zona y Ruta"
        subtitle="Conoce tu cobertura"
        onPress={() => console.log("Ver zona")}
      />
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
  searchBar: { flexDirection: "row", alignItems: "center", backgroundColor: "#FFFFFF", borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, marginBottom: 16 },
  searchInput: { flex: 1, marginLeft: 8, color: "#111827" },
  profileCard: { flexDirection: "row", backgroundColor: "#FFFFFF", borderRadius: 24, padding: 18, alignItems: "center", marginBottom: 16 },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: "#F55A3C", alignItems: "center", justifyContent: "center", marginRight: 16 },
  avatarText: { color: "#FFFFFF", fontSize: 22, fontWeight: "700" },
  name: { fontSize: 18, fontWeight: "700", color: "#111827" },
  email: { color: "#6B7280", marginTop: 2 },
  metaText: { color: "#9CA3AF", marginTop: 4 },
  statsRow: { flexDirection: "row", gap: 12 },
  statCard: { flex: 1, backgroundColor: "#FFFFFF", borderRadius: 18, paddingVertical: 12, alignItems: "center", marginBottom: 18 },
  statValue: { fontSize: 16, fontWeight: "700", color: "#111827" },
  statLabel: { fontSize: 12, color: "#6B7280" },
  goalCard: { backgroundColor: "#FFFFFF", borderRadius: 24, padding: 18, marginBottom: 20 },
  goalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  goalTitle: { fontSize: 15, fontWeight: "700", color: "#111827" },
  goalPercent: { fontSize: 18, fontWeight: "700", color: "#F55A3C" },
  progressTrack: { height: 12, borderRadius: 6, backgroundColor: "#F3F4F6", marginTop: 12, overflow: "hidden" },
  progressBar: { height: "100%", backgroundColor: "#F55A3C" },
  goalSubtitle: { color: "#6B7280", marginTop: 10 },
  sectionHeader: { marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#111827" },
});

export default VendedorPerfilScreen;
