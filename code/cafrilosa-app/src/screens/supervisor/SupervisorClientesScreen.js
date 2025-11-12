import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Image } from 'react-native';
import UiSearchBar from '../../components/ui/UiSearchBar';
import UiListItem from '../../components/ui/UiListItem';

// TODO: conectar con backend aquí
const clients = [
  { id: '1', name: 'Supermercado El Ahorro', avatar: require('../../assets/images/logo-cafrilosa.png'), info: 'Último pedido hace 2 días' },
  { id: '2', name: 'Restaurante Sabor Andino', avatar: require('../../assets/images/logo-cafrilosa.png'), info: 'Cliente frecuente' },
  { id: '3', name: 'Tienda La Esquina', avatar: require('../../assets/images/logo-cafrilosa.png'), info: '10 pedidos este mes' },
  { id: '4', name: 'Hotel Plaza', avatar: require('../../assets/images/logo-cafrilosa.png'), info: 'Deuda pendiente: $250.00' },
];

const SupervisorClientesScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // TODO: conectar con backend aquí para búsqueda
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Clientes</Text>
        <UiSearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Buscar cliente..."
        />
        <FlatList
          data={filteredClients}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <UiListItem
              title={item.name}
              subtitle={item.info}
              leftAvatar={item.avatar}
              onPress={() => navigation.navigate('SupervisorClienteDetalle', { clientId: item.id })}
              style={styles.listItem}
            />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={styles.emptyText}>No se encontraron clientes.</Text>}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    paddingVertical: 20,
  },
  list: {
    paddingTop: 16,
  },
  listItem: {
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#6B7280',
  },
});

export default SupervisorClientesScreen;
