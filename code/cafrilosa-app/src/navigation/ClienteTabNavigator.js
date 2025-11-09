import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ClienteHomeScreen from "../screens/cliente/ClienteHomeScreen";
import ClienteEmbutidosScreen from "../screens/cliente/ClienteEmbutidosScreen";
import ClienteJamonesScreen from "../screens/cliente/ClienteJamonesScreen";
import ClienteChorizosScreen from "../screens/cliente/ClienteChorizosScreen";
import ClientePromocionesScreen from "../screens/cliente/ClientePromocionesScreen";
import ClienteProductoDetalleScreen from "../screens/cliente/ClienteProductoDetalleScreen";
import ClientePedidosScreen from "../screens/cliente/ClientePedidosScreen";
import ClienteTicketSoporteScreen from "../screens/cliente/ClienteTicketSoporteScreen";
import ClienteEntregasScreen from "../screens/cliente/ClienteEntregasScreen";
import ClienteCarritoScreen from "../screens/cliente/ClienteCarritoScreen";
import ClientePerfilScreen from "../screens/cliente/ClientePerfilScreen";
import ClienteDatosPersonalesScreen from "../screens/cliente/ClienteDatosPersonalesScreen";
import ClienteDireccionesScreen from "../screens/cliente/ClienteDireccionesScreen";
import ClienteMetodosPagoScreen from "../screens/cliente/ClienteMetodosPagoScreen";
import ClientePerfilHistorialPedidosScreen from "../screens/cliente/ClientePerfilHistorialPedidosScreen";
import ClienteCentroAyudaScreen from "../screens/cliente/ClienteCentroAyudaScreen";
import ClienteNivelesScreen from "../screens/cliente/ClienteNivelesScreen";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const PedidosStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

const ClienteHomeStackScreen = ({ route }) => {
  const user = route?.params?.user;

  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="ClienteHome" component={ClienteHomeScreen} initialParams={{ user }} />
      <HomeStack.Screen name="ClienteEmbutidos" component={ClienteEmbutidosScreen} />
      <HomeStack.Screen name="ClienteJamones" component={ClienteJamonesScreen} />
      <HomeStack.Screen name="ClienteChorizos" component={ClienteChorizosScreen} />
      <HomeStack.Screen name="ClientePromociones" component={ClientePromocionesScreen} />
      <HomeStack.Screen name="ClienteProductoDetalle" component={ClienteProductoDetalleScreen} />
      <HomeStack.Screen name="ClienteNiveles" component={ClienteNivelesScreen} />
    </HomeStack.Navigator>
  );
};

const ClientePedidosStackScreen = () => {
  return (
    <PedidosStack.Navigator screenOptions={{ headerShown: false }}>
      <PedidosStack.Screen name="ClientePedidos" component={ClientePedidosScreen} />
      <PedidosStack.Screen name="ClienteTicketSoporte" component={ClienteTicketSoporteScreen} />
    </PedidosStack.Navigator>
  );
};

const ClienteProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ClientePerfil" component={ClientePerfilScreen} />
      <ProfileStack.Screen name="ClienteDatosPersonales" component={ClienteDatosPersonalesScreen} />
      <ProfileStack.Screen name="ClienteDirecciones" component={ClienteDireccionesScreen} />
      <ProfileStack.Screen name="ClienteMetodosPago" component={ClienteMetodosPagoScreen} />
      <ProfileStack.Screen
        name="ClientePerfilHistorialPedidos"
        component={ClientePerfilHistorialPedidosScreen}
      />
      <ProfileStack.Screen name="ClienteCentroAyuda" component={ClienteCentroAyudaScreen} />
      <ProfileStack.Screen name="ClienteTicketSoporte" component={ClienteTicketSoporteScreen} />
    </ProfileStack.Navigator>
  );
};

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

const ClienteTabNavigator = ({ route }) => {
  const user = route?.params?.user;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="ClienteHomeStack"
        component={ClienteHomeStackScreen}
        initialParams={{ user }}
        options={{ tabBarIcon: renderTabButton("home-outline", "Inicio") }}
      />
      <Tab.Screen
        name="ClientePedidosStack"
        component={ClientePedidosStackScreen}
        options={{ tabBarIcon: renderTabButton("cube-outline", "Pedidos") }}
      />
      <Tab.Screen
        name="ClienteEntregas"
        component={ClienteEntregasScreen}
        options={{ tabBarIcon: renderTabButton("truck-delivery", "Entregas", MaterialCommunityIcons) }}
      />
      <Tab.Screen
        name="ClienteCarrito"
        component={ClienteCarritoScreen}
        options={{ tabBarIcon: renderTabButton("cart-outline", "Carrito") }}
      />
      <Tab.Screen
        name="ClientePerfilStack"
        component={ClienteProfileStackScreen}
        options={{ tabBarIcon: renderTabButton("person-circle-outline", "Perfil") }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 84,
    borderTopWidth: 0,
    elevation: 15,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 14,
  },
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

export default ClienteTabNavigator;

