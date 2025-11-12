import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SupervisorHomeScreen from '../screens/supervisor/SupervisorHomeScreen';
import SupervisorPedidosScreen from '../screens/supervisor/SupervisorPedidosScreen';
import SupervisorEntregasScreen from '../screens/supervisor/SupervisorEntregasScreen';
import SupervisorClientesScreen from '../screens/supervisor/SupervisorClientesScreen';
import SupervisorPerfilScreen from '../screens/supervisor/SupervisorPerfilScreen';

const Tab = createBottomTabNavigator();

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

export default function SupervisorTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: styles.tabBar }}
    >
      <Tab.Screen name="SupervisorHome" component={SupervisorHomeScreen} options={{ tabBarIcon: renderTabButton('home-outline', 'Inicio') }} />
      <Tab.Screen name="SupervisorPedidos" component={SupervisorPedidosScreen} options={{ tabBarIcon: renderTabButton('file-tray-full-outline', 'Pedidos') }} />
      <Tab.Screen name="SupervisorEntregas" component={SupervisorEntregasScreen} options={{ tabBarIcon: renderTabButton('truck-delivery', 'Entregas', MaterialCommunityIcons) }} />
      <Tab.Screen name="SupervisorClientes" component={SupervisorClientesScreen} options={{ tabBarIcon: renderTabButton('people-outline', 'Clientes') }} />
      <Tab.Screen name="SupervisorPerfil" component={SupervisorPerfilScreen} options={{ tabBarIcon: renderTabButton('person-circle-outline', 'Perfil') }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 84,
    borderTopWidth: 0,
    elevation: 15,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 14,
  },
  tabButtonWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  tabButtonActive: {
    width: 70,
    alignItems: 'center',
    borderRadius: 24,
    paddingVertical: 12,
    shadowColor: '#E64A19',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  tabButtonInactive: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  tabButtonLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
  tabButtonLabelActive: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '700',
  },
});
