import React from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import ProfileOptionItem from "../../components/ui/ProfileOptionItem";

const userProfile = {
  name: "Juan Perez",
  storeName: "Supermercado El Ahorro",
  totalOrders: 12,
  points: 850,
};

// TODO: conectar con backend aqui para obtener informacion real del usuario (nombre, pedidos, puntos)

const ClientePerfilScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
    // TODO: limpiar sesion/token en backend cuando exista
  };

  const profileOptions = [
    {
      title: "Datos Personales",
      subtitle: "Edita tu informacion",
      icon: <MaterialCommunityIcons name="account-edit" size={22} color="#E64A19" />,
      route: "ClienteDatosPersonales",
    },
    {
      title: "Mis Direcciones",
      subtitle: "2 direcciones guardadas",
      icon: <MaterialCommunityIcons name="map-marker-radius" size={22} color="#E64A19" />,
      route: "ClienteDirecciones",
    },
    {
      title: "Métodos de Pago",
      subtitle: "2 métodos guardados",
      icon: <MaterialCommunityIcons name="credit-card-outline" size={22} color="#E64A19" />,
      route: "ClienteMetodosPago",
    },
    {
      title: "Historial de Pedidos",
      subtitle: "Ver todos mis pedidos",
      icon: <MaterialCommunityIcons name="clipboard-text-outline" size={22} color="#E64A19" />,
      route: "ClientePerfilHistorialPedidos",
    },
    {
      title: "Centro de Ayuda",
      subtitle: "Soporte y preguntas frecuentes",
      icon: <MaterialCommunityIcons name="lifebuoy" size={22} color="#E64A19" />,
      route: "ClienteCentroAyuda",
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 12 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Perfil</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <MaterialCommunityIcons name="logout" size={20} color="#E64A19" />
          </TouchableOpacity>
        </View>

        <LinearGradient colors={["#F65A3B", "#F97316"]} style={styles.profileCard}>
          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <Ionicons name="person-outline" size={30} color="#F97316" />
            </View>
            <View>
              <Text style={styles.profileName}>{userProfile.name}</Text>
              <Text style={styles.profileStore}>{userProfile.storeName}</Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={[styles.statBox, styles.statBoxSpacing]}>
              <Text style={styles.statLabel}>Pedidos</Text>
              <Text style={styles.statValue}>{userProfile.totalOrders}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Puntos</Text>
              <Text style={styles.statValue}>{userProfile.points}</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.options}>
          {profileOptions.map((option) => (
            <ProfileOptionItem
              key={option.title}
              icon={option.icon}
              title={option.title}
              subtitle={option.subtitle}
              onPress={() => navigation.navigate(option.route)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },
  logoutButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFF5F0",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#E64A19",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  profileCard: {
    borderRadius: 28,
    padding: 24,
    marginBottom: 24,
    shadowColor: "#F97316",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  profileStore: {
    color: "#FFE4E6",
    marginTop: 6,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statBox: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 18,
    padding: 16,
  },
  statBoxSpacing: {
    marginRight: 12,
  },
  statLabel: {
    color: "#FFE4E6",
    fontSize: 13,
  },
  statValue: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 6,
  },
  options: {
    marginTop: 10,
  },
});

export default ClientePerfilScreen;
