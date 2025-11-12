import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { VENDEDOR_TAB_BAR_STYLE } from "./tabStyles";
import VendedorHomeScreen from "../screens/vendedor/VendedorHomeScreen";
import VendedorEntregasScreen from "../screens/vendedor/VendedorEntregasScreen";
import VendedorPerfilScreen from "../screens/vendedor/VendedorPerfilScreen";
import VendedorDatosPersonalesScreen from "../screens/vendedor/VendedorDatosPersonalesScreen";
import ConfiguracionesScreen from "../screens/common/ConfiguracionesScreen";
import VendedorCatalogoProductosScreen from "../screens/vendedor/VendedorCatalogoProductosScreen";
import VendedorListaRutasScreen from "../screens/vendedor/VendedorListaRutasScreen";
import ClienteProductoDetalleScreen from "../screens/cliente/ClienteProductoDetalleScreen";
import VendedorZonaRutaScreen from "../screens/vendedor/VendedorZonaRutaScreen";
import VendedorCentroAyudaScreen from "../screens/vendedor/VendedorCentroAyudaScreen";
import VendedorTicketSoporteScreen from "../screens/vendedor/VendedorTicketSoporteScreen";

const Tab = createBottomTabNavigator();
const VendedorHomeStack = createNativeStackNavigator();
const VendedorEntregasStack = createNativeStackNavigator();
const VendedorPerfilStack = createNativeStackNavigator();

const renderTabButton = (iconName, label, IconComponent = Ionicons) => ({ focused }) => (
  <View style={styles.tabButtonWrapper}>
    {focused ? (
      <LinearGradient colors={["#FF684D", "#E64A19"]} style={styles.tabButtonActive}>
        <IconComponent name={iconName} size={22} color="#FFFFFF" />
        <Text style={styles.tabButtonLabelActive}>{label}</Text>
      </LinearGradient>
    ) : (
      <View style={styles.tabButtonInactive}>
        <IconComponent name={iconName} size={22} color="#9CA3AF" />
        <Text style={styles.tabButtonLabel}>{label}</Text>
      </View>
    )}
  </View>
);

const VendedorHomeStackScreen = () => (
  <VendedorHomeStack.Navigator screenOptions={{ headerShown: false }}>
    <VendedorHomeStack.Screen name="VendedorHomeMain" component={VendedorHomeScreen} />
    <VendedorHomeStack.Screen name="VendedorCatalogoProductos" component={VendedorCatalogoProductosScreen} />
    <VendedorHomeStack.Screen name="VendedorProductoDetalle" component={ClienteProductoDetalleScreen} />
  </VendedorHomeStack.Navigator>
);

const VendedorEntregasStackScreen = () => (
  <VendedorEntregasStack.Navigator screenOptions={{ headerShown: false }}>
    <VendedorEntregasStack.Screen name="VendedorEntregasMain" component={VendedorEntregasScreen} />
    <VendedorEntregasStack.Screen name="VendedorListaRutas" component={VendedorListaRutasScreen} />
  </VendedorEntregasStack.Navigator>
);

const VendedorPerfilStackScreen = () => (
  <VendedorPerfilStack.Navigator screenOptions={{ headerShown: false }}>
    <VendedorPerfilStack.Screen name="VendedorPerfilMain" component={VendedorPerfilScreen} />
    <VendedorPerfilStack.Screen name="VendedorDatosPersonales" component={VendedorDatosPersonalesScreen} />
    <VendedorPerfilStack.Screen name="VendedorConfiguraciones" component={ConfiguracionesScreen} />
    <VendedorPerfilStack.Screen name="VendedorZonaRuta" component={VendedorZonaRutaScreen} />
    <VendedorPerfilStack.Screen name="VendedorCentroAyuda" component={VendedorCentroAyudaScreen} />
    <VendedorPerfilStack.Screen name="VendedorTicketSoporte" component={VendedorTicketSoporteScreen} />
  </VendedorPerfilStack.Navigator>
);

const VendedorTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: VENDEDOR_TAB_BAR_STYLE,
      }}
    >
      <Tab.Screen
        name="VendedorHome"
        component={VendedorHomeStackScreen}
        options={{
          tabBarIcon: renderTabButton("home-outline", "Inicio"),
        }}
      />
      <Tab.Screen
        name="VendedorEntregas"
        component={VendedorEntregasStackScreen}
        options={{
          tabBarIcon: renderTabButton("truck-delivery", "Entregas", MaterialCommunityIcons),
        }}
      />
      <Tab.Screen
        name="VendedorPerfil"
        component={VendedorPerfilStackScreen}
        options={{
          tabBarIcon: renderTabButton("person-circle-outline", "Perfil"),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabButtonWrapper: {
    flex: 1,
    alignItems: "center",
  },
  tabButtonActive: {
    width: 70,
    alignItems: "center",
    borderRadius: 24,
    paddingVertical: 12,
    shadowColor: "#E64A19",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  tabButtonInactive: {
    alignItems: "center",
    paddingVertical: 12,
  },
  tabButtonLabel: {
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
  },
  tabButtonLabelActive: {
    color: "#FFFFFF",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "700",
  },
});

export default VendedorTabNavigator;
