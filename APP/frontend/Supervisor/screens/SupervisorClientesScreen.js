import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import ScreenHeader from '../../components/ScreenHeader';
import { useAppContext } from '../../context/AppContext';

// Mock data for clients - In a real app this would come from the context or API
const MOCK_CLIENTS = [
    { id: '1', name: 'Juan Pérez', business: 'Tienda La Esquina', address: 'Av. Principal 123', phone: '0991234567', lastOrder: '2025-11-20' },
    { id: '2', name: 'María López', business: 'Minimarket El Sol', address: 'Calle 5ta y 10 de Agosto', phone: '0987654321', lastOrder: '2025-11-22' },
    { id: '3', name: 'Carlos Ruiz', business: 'Comisariato Central', address: 'Av. Quito 456', phone: '0998877665', lastOrder: '2025-11-15' },
    { id: '4', name: 'Ana Torres', business: 'Despensa Anita', address: 'Barrio Las Peñas', phone: '0991122334', lastOrder: '2025-11-25' },
    { id: '5', name: 'Luis Gomez', business: 'Supermercado Gomez', address: 'Av. Amazonas 789', phone: '0981239876', lastOrder: '2025-11-18' },
];

const SupervisorClientesScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredClients = MOCK_CLIENTS.filter(client =>
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.business.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderClientItem = ({ item }) => (
        <TouchableOpacity
            style={styles.clientCard}
            // For now, we can navigate to VendedorDetalleCliente if we want to reuse it, 
            // or just show the list as requested. The user said "ver los clientes con su info y su historial".
            // Reusing VendedorDetalleCliente seems efficient if it's generic enough.
            // Let's assume we can reuse it or create a SupervisorDetalleCliente later if needed.
            // For now I'll point to VendedorDetalleCliente but I need to make sure it's registered in Supervisor stack.
            // Actually, better to just show the list for now or assume a detail screen exists.
            // Given the user request "ver los clientes con su info y su historial", I should probably link to a detail view.
            // I'll check if VendedorDetalleCliente is reusable. It is in Vendedor folder.
            // I'll register it in App.js for Supervisor as well or just import it.
            // Let's use 'SupervisorDetalleCliente' route and I will register it in App.js pointing to the same component or a new one.
            // To be safe and quick, I'll point to 'VendedorDetalleCliente' if I can register it for Supervisor, 
            // but usually stacks are separate.
            // I'll create a SupervisorDetalleClienteScreen that just imports VendedorDetalleClienteScreen to avoid duplication?
            // Or just copy it.
            // For this step, I'll just navigate to 'SupervisorDetalleCliente' and I'll make sure to register it.
            onPress={() => navigation.navigate('SupervisorDetalleCliente', { client: item })}
        >
            <View style={styles.clientAvatar}>
                <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
            </View>
            <View style={styles.clientInfo}>
                <Text style={styles.clientName}>{item.name}</Text>
                <Text style={styles.clientBusiness}>{item.business}</Text>
                <View style={styles.clientDetailRow}>
                    <Ionicons name="location-outline" size={14} color={colors.textLight} />
                    <Text style={styles.clientAddress} numberOfLines={1}>{item.address}</Text>
                </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.screen}>
            <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
            <ScreenHeader title="Clientes" subtitle="Cartera de clientes global" showBack />

            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={20} color={colors.textLight} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar cliente o negocio..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholderTextColor={colors.textLight}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Ionicons name="close-circle" size={20} color={colors.textLight} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <FlatList
                data={filteredClients}
                renderItem={renderClientItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="people-outline" size={64} color={colors.border} />
                        <Text style={styles.emptyText}>No se encontraron clientes</Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background,
    },
    searchContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        marginTop: 16,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderSoft,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 48,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: colors.textDark,
    },
    listContent: {
        padding: 16,
        paddingBottom: 100,
    },
    clientCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    clientAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.primary + '20', // 20% opacity
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    avatarText: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.primary,
    },
    clientInfo: {
        flex: 1,
    },
    clientName: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.textDark,
        marginBottom: 2,
    },
    clientBusiness: {
        fontSize: 14,
        color: colors.primary,
        fontWeight: '600',
        marginBottom: 4,
    },
    clientDetailRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    clientAddress: {
        fontSize: 12,
        color: colors.textLight,
        marginLeft: 4,
        flex: 1,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60,
    },
    emptyText: {
        marginTop: 16,
        fontSize: 16,
        color: colors.textLight,
    },
});

export default SupervisorClientesScreen;
