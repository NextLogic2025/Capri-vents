import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import colors from './frontend/theme/colors';
import { AppProvider, useAppContext } from './frontend/context/AppContext';
import VendedorTabNavigator from './frontend/Vendedor/navigation/VendedorTabNavigator';
import VendedorDetallePedidoScreen from './frontend/Vendedor/screens/VendedorDetallePedidoScreen';
import VendedorProductDetailScreen from './frontend/Vendedor/screens/VendedorProductDetailScreen';
import VendedorSoporteScreen from './frontend/Vendedor/screens/VendedorSoporteScreen';
import VendedorCrearTicketScreen from './frontend/Vendedor/screens/VendedorCrearTicketScreen';

// Auth screens
import SplashScreen from './frontend/Auth/screens/SplashScreen';
import LoginScreen from './frontend/Auth/screens/LoginScreen';
import RegisterScreen from './frontend/Auth/screens/RegisterScreen';
import ForgotPasswordScreen from './frontend/Auth/screens/ForgotPasswordScreen';

// Cliente tabs
import InicioScreen from './frontend/Cliente/screens/InicioScreen';
import CarritoScreen from './frontend/Cliente/screens/CarritoScreen';
import PedidosScreen from './frontend/Cliente/screens/PedidosScreen';
import CreditosScreen from './frontend/Cliente/screens/CreditosScreen';
import PerfilScreen from './frontend/Cliente/screens/PerfilScreen';
import ClienteSoporteScreen from './frontend/Cliente/screens/ClienteSoporteScreen';
import ClienteCrearTicketScreen from './frontend/Cliente/screens/ClienteCrearTicketScreen';
import SupervisorProductosScreen from './frontend/Supervisor/screens/SupervisorProductosScreen';
import SupervisorPerfilScreen from './frontend/Supervisor/screens/SupervisorPerfilScreen';
import SupervisorSolicitudesScreen from './frontend/Supervisor/screens/SupervisorSolicitudesScreen';
import SupervisorSoporteScreen from './frontend/Supervisor/screens/SupervisorSoporteScreen';
import SupervisorDetalleTicketScreen from './frontend/Supervisor/screens/SupervisorDetalleTicketScreen';
import ProductDetailScreen from './frontend/Cliente/screens/ProductDetailScreen';

// Flujo cliente adicional
import CheckoutScreen from './frontend/Cliente/screens/CheckoutScreen';
import SeleccionPlanCreditoScreen from './frontend/Cliente/screens/SeleccionPlanCreditoScreen';
import DetallePedidoScreen from './frontend/Cliente/screens/DetallePedidoScreen';
import DetalleCreditoScreen from './frontend/Cliente/screens/DetalleCreditoScreen';
import PagoCuotaScreen from './frontend/Cliente/screens/PagoCuotaScreen';
import PedidoConfirmacionScreen from './frontend/Cliente/screens/PedidoConfirmacionScreen';
import CreditoConfirmacionScreen from './frontend/Cliente/screens/CreditoConfirmacionScreen';
import MetodosPagoScreen from './frontend/Cliente/screens/MetodosPagoScreen';
import DatosPersonalesScreen from './frontend/Cliente/screens/DatosPersonalesScreen';
import DireccionesScreen from './frontend/Cliente/screens/DireccionesScreen';
import CambiarContrasenaScreen from './frontend/Cliente/screens/CambiarContrasenaScreen';
import PreguntasFrecuentesScreen from './frontend/Cliente/screens/PreguntasFrecuentesScreen';
import SupervisorTabNavigator from './frontend/Supervisor/navigation/SupervisorTabNavigator';

const RootStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TAB_ITEMS = {
  Inicio: { icon: 'home-outline', label: 'Inicio' },
  Carrito: { icon: 'cart-outline', label: 'Carrito' },
  Pedidos: { icon: 'cube-outline', label: 'Pedidos' },
  Creditos: { icon: 'card-outline', label: 'Credito' },
  Perfil: { icon: 'person-outline', label: 'Perfil' },
};

const TabIcon = ({ icon, label, focused }) => (
  <View style={styles.tabItem}>
    <View style={[styles.iconPill, focused && styles.iconPillActive]}>
      <Ionicons
        name={icon}
        size={20}
        color={focused ? colors.white : colors.tabInactive}
      />
    </View>
    <Text style={[styles.tabLabel, focused && styles.tabLabelActive]} numberOfLines={1}>
      {label}
    </Text>
  </View>
);

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
  },
};

const AuthStackNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </AuthStack.Navigator>
);

const ClienteTabsNavigator = () => {
  const { credits } = useAppContext();
  const pendingInstallments = credits.reduce(
    (sum, credit) =>
      sum + credit.installments.filter((installment) => installment.status !== 'Pagada').length,
    0
  );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused }) => {
          const tabInfo = TAB_ITEMS[route.name] ?? { icon: 'ellipse', label: route.name };
          return <TabIcon icon={tabInfo.icon} label={tabInfo.label} focused={focused} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={InicioScreen} />
      <Tab.Screen name="Carrito" component={CarritoScreen} />
      <Tab.Screen name="Pedidos" component={PedidosScreen} />
      <Tab.Screen
        name="Creditos"
        component={CreditosScreen}
        options={{ tabBarBadge: pendingInstallments > 0 ? pendingInstallments : undefined, tabBarBadgeStyle: { backgroundColor: colors.danger } }}
      />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { isLoggedIn, currentRole, sessionVersion } = useAppContext();
  const normalizedRole = (currentRole || "").toLowerCase();
  const navigatorKey = `${isLoggedIn ? "app" : "auth"}-${normalizedRole || "guest"}-${sessionVersion}`;

  React.useEffect(() => {
    console.log('[NAV] render', { isLoggedIn, currentRole, sessionVersion, navigatorKey });
  }, [isLoggedIn, currentRole, sessionVersion, navigatorKey]);
  // BACKEND: el rol se definira despues de que el usuario se autentique, segun el perfil devuelto por la API (cliente, vendedor o supervisor).

  if (!isLoggedIn) {
    return (
      <NavigationContainer key={navigatorKey} theme={navTheme} independent={true}>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Splash" component={SplashScreen} />
          <RootStack.Screen name="AuthStack" component={AuthStackNavigator} />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }

  if (normalizedRole === "supervisor") {
    return (
      <NavigationContainer key={navigatorKey} theme={navTheme} independent={true}>
        <RootStack.Navigator>
          <RootStack.Screen name="SupervisorModulo" component={SupervisorTabNavigator} options={{ headerShown: false }} />
          <RootStack.Screen
            name="SupervisorSolicitudes"
            component={SupervisorSolicitudesScreen}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="SupervisorSoporte"
            component={SupervisorSoporteScreen}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="SupervisorDetalleTicket"
            component={SupervisorDetalleTicketScreen}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="DatosPersonales"
            component={DatosPersonalesScreen}
            options={{ title: "Datos personales" }}
          />
          <RootStack.Screen
            name="CambiarContrasena"
            component={CambiarContrasenaScreen}
            options={{ title: "Cambiar contrasena" }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }

  if (normalizedRole === "vendedor") {
    return (
      <NavigationContainer key={navigatorKey} theme={navTheme} independent={true}>
        <RootStack.Navigator>
          <RootStack.Screen name="VendedorModulo" component={VendedorTabNavigator} options={{ headerShown: false }} />
          <RootStack.Screen name="VendedorDetallePedido" component={VendedorDetallePedidoScreen} options={{ headerShown: false }} />
          <RootStack.Screen name="VendedorProductDetail" component={VendedorProductDetailScreen} options={{ headerShown: false }} />
          <RootStack.Screen
            name="DatosPersonales"
            component={DatosPersonalesScreen}
            options={{ title: "Datos personales" }}
          />
          <RootStack.Screen
            name="CambiarContrasena"
            component={CambiarContrasenaScreen}
            options={{ title: "Cambiar contrasena" }}
          />
          <RootStack.Screen name="VendedorSoporte" component={VendedorSoporteScreen} options={{ headerShown: false }} />
          <RootStack.Screen name="VendedorCrearTicket" component={VendedorCrearTicketScreen} options={{ headerShown: false }} />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer key={navigatorKey} theme={navTheme} independent={true}>
      <RootStack.Navigator initialRouteName="ClienteTabs" screenOptions={{ headerTintColor: colors.darkText }}>
        <RootStack.Screen name="ClienteTabs" component={ClienteTabsNavigator} options={{ headerShown: false }} />
        <RootStack.Screen name="Checkout" component={CheckoutScreen} options={{ headerShown: false }} />
        <RootStack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ headerShown: false }} />
        <RootStack.Screen name="SeleccionPlanCredito" component={SeleccionPlanCreditoScreen} options={{ title: "Plan de credito" }} />
        <RootStack.Screen name="DetallePedido" component={DetallePedidoScreen} options={{ headerShown: false }} />
        <RootStack.Screen name="DetalleCredito" component={DetalleCreditoScreen} options={{ headerShown: false }} />
        <RootStack.Screen name="PagoCuota" component={PagoCuotaScreen} options={{ headerShown: false }} />
        <RootStack.Screen name="PedidoConfirmacion" component={PedidoConfirmacionScreen} options={{ headerShown: false }} />
        <RootStack.Screen name="CreditoConfirmacion" component={CreditoConfirmacionScreen} options={{ headerShown: false }} />
        <RootStack.Screen
          name="MetodosPago"
          component={MetodosPagoScreen}
          options={{ title: "Metodos de pago" }}
        />
        <RootStack.Screen
          name="DatosPersonales"
          component={DatosPersonalesScreen}
          options={{ title: "Datos personales" }}
        />
        <RootStack.Screen
          name="Direcciones"
          component={DireccionesScreen}
          options={{ title: "Direcciones" }}
        />
        <RootStack.Screen
          name="CambiarContrasena"
          component={CambiarContrasenaScreen}
          options={{ title: "Cambiar contrasena" }}
        />
        <RootStack.Screen
          name="PreguntasFrecuentes"
          component={PreguntasFrecuentesScreen}
          options={{ title: "Preguntas frecuentes" }}
        />
        <RootStack.Screen name="ClienteSoporte" component={ClienteSoporteScreen} options={{ headerShown: false }} />
        <RootStack.Screen name="ClienteCrearTicket" component={ClienteCrearTicketScreen} options={{ headerShown: false }} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};


export default function App() {
  return (
    <AppProvider>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.white,
    borderTopWidth: 0,
    height: 90,
    paddingTop: 6,
    paddingBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    elevation: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconPill: {
    width: 48,
    height: 48,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  iconPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.tabInactive,
    marginTop: 6,
    textAlign: 'center',
  },
  tabLabelActive: {
    color: colors.primary,
  },
});
