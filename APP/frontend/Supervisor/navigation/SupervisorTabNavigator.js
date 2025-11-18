import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import SupervisorInicioScreen from '../screens/SupervisorInicioScreen';
import SupervisorPedidosScreen from '../screens/SupervisorPedidosScreen';
import SupervisorCobrosScreen from '../screens/SupervisorCobrosScreen';
import SupervisorProductosScreen from '../screens/SupervisorProductosScreen';
import SupervisorPerfilScreen from '../screens/SupervisorPerfilScreen';

const Tab = createBottomTabNavigator();

const TAB_ITEMS = {
  Inicio: { icon: 'home-outline', label: 'Inicio' },
  Pedidos: { icon: 'cube-outline', label: 'Pedidos' },
  Cobros: { icon: 'cash-outline', label: 'Cobros' },
  Productos: { icon: 'pricetags-outline', label: 'Productos' },
  Perfil: { icon: 'person-circle-outline', label: 'Perfil' },
};

const TabIcon = ({ icon, label, focused }) => (
  <View style={styles.tabItem}>
    <View style={[styles.iconPill, focused && styles.iconPillActive]}>
      <Ionicons name={icon} size={22} color={focused ? colors.white : colors.tabInactive} />
    </View>
    <Text style={[styles.tabLabel, focused && styles.tabLabelActive]} numberOfLines={1}>
      {label}
    </Text>
  </View>
);

const SupervisorTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      sceneContainerStyle={{ backgroundColor: colors.background }}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarIcon: ({ focused }) => {
          const tabInfo = TAB_ITEMS[route.name] || { icon: 'ellipse', label: route.name };
          return <TabIcon icon={tabInfo.icon} label={tabInfo.label} focused={focused} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={SupervisorInicioScreen} />
      <Tab.Screen name="Pedidos" component={SupervisorPedidosScreen} />
      <Tab.Screen name="Cobros" component={SupervisorCobrosScreen} />
      <Tab.Screen name="Productos" component={SupervisorProductosScreen} />
      <Tab.Screen name="Perfil" component={SupervisorPerfilScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.white,
    borderTopWidth: 0,
    height: 88,
    paddingTop: 6,
    paddingBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -2 },
    elevation: 10,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
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
    shadowOpacity: 0.27,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  tabLabel: {
    fontSize: 12,
    color: colors.tabInactive,
    marginTop: 6,
    fontWeight: '600',
  },
  tabLabelActive: {
    color: colors.primary,
  },
});

export default SupervisorTabNavigator;
