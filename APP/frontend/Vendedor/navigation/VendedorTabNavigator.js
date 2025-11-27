import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import VendedorPedidosScreen from '../screens/VendedorPedidosScreen';
import VendedorCobrosScreen from '../screens/VendedorCobrosScreen';
import VendedorProductosScreen from '../screens/VendedorProductosScreen';
import VendedorPerfilScreen from '../screens/VendedorPerfilScreen';
import VendedorClientesScreen from '../screens/VendedorClientesScreen';

const Tab = createBottomTabNavigator();

const TAB_ITEMS = {
  Pedidos: { icon: 'list-outline', label: 'Pedidos' },
  Clientes: { icon: 'people-outline', label: 'Clientes' },
  CobrosCreditos: { icon: 'wallet-outline', label: 'Cartera' },
  Productos: { icon: 'pricetags-outline', label: 'Productos' },
  PerfilVendedor: { icon: 'person-circle-outline', label: 'Perfil' },
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

const VendedorTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Pedidos"
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
      <Tab.Screen name="Pedidos" component={VendedorPedidosScreen} />
      <Tab.Screen name="Clientes" component={VendedorClientesScreen} />
      <Tab.Screen
        name="CobrosCreditos"
        component={VendedorCobrosScreen}
        options={{ tabBarLabel: 'Cartera' }}
      />
      <Tab.Screen name="Productos" component={VendedorProductosScreen} />
      <Tab.Screen name="PerfilVendedor" component={VendedorPerfilScreen} options={{ title: 'Perfil' }} />
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

export default VendedorTabNavigator;
