import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import SupervisorHomeScreen from '../screens/supervisor/SupervisorHomeScreen';
import SupervisorPedidosScreen from '../screens/supervisor/SupervisorPedidosScreen';
import SupervisorEntregasScreen from '../screens/supervisor/SupervisorEntregasScreen';
import SupervisorClientesScreen from '../screens/supervisor/SupervisorClientesScreen';
import SupervisorPerfilScreen from '../screens/supervisor/SupervisorPerfilScreen';

const Tab = createBottomTabNavigator();

const renderTab = (iconName, label, IconComp = Ionicons) => ({ focused }) => (
  <View style={styles.tabItem}>
    <IconComp name={iconName} size={22} color={focused ? '#F55A3C' : '#9CA3AF'} />
    <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>{label}</Text>
  </View>
);

export default function SupervisorTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: styles.tabBar }}
    >
      <Tab.Screen name="SupervisorHome" component={SupervisorHomeScreen} options={{ tabBarIcon: renderTab('home-outline', 'Inicio') }} />
      <Tab.Screen name="SupervisorPedidos" component={SupervisorPedidosScreen} options={{ tabBarIcon: renderTab('file-tray-full-outline', 'Pedidos') }} />
      <Tab.Screen name="SupervisorEntregas" component={SupervisorEntregasScreen} options={{ tabBarIcon: renderTab('truck-delivery', 'Entregas', MaterialCommunityIcons) }} />
      <Tab.Screen name="SupervisorClientes" component={SupervisorClientesScreen} options={{ tabBarIcon: renderTab('people-outline', 'Clientes') }} />
      <Tab.Screen name="SupervisorPerfil" component={SupervisorPerfilScreen} options={{ tabBarIcon: renderTab('person-circle-outline', 'Perfil') }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0,
    height: 80,
    paddingTop: 10,
  },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 12, color: '#9CA3AF', marginTop: 2, fontWeight: '600' },
  tabLabelActive: { color: '#F55A3C' },
});
