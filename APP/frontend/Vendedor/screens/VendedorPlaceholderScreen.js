import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import sharedStyles from '../../theme/styles';
import { useAppContext } from '../../context/AppContext';

const VendedorPlaceholderScreen = ({ navigation }) => {
  const { logout } = useAppContext();

  const handleExit = () => {
    logout();
    navigation.reset({ index: 0, routes: [{ name: 'AuthStack' }] });
  };

  return (
    <View style={sharedStyles.centeredScreen}>
      <Text style={{ fontSize: 20, fontWeight: '700', textAlign: 'center', marginBottom: 12 }}>
        Modulo Vendedor - En construccion
      </Text>
      <Text style={{ textAlign: 'center', marginBottom: 24 }}>
        Aqui veras pedidos asignados, rutas y metas de venta.
      </Text>
      <TouchableOpacity style={sharedStyles.primaryButton} onPress={handleExit}>
        <Text style={sharedStyles.primaryButtonText}>Cerrar sesion</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VendedorPlaceholderScreen;
