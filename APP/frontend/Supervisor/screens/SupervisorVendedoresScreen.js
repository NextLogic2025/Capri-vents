import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import ScreenHeader from '../../components/ScreenHeader';

// Mock data for vendors
const MOCK_VENDORS = [
    { id: '1', name: 'Andrés Cuevas', zone: 'Loja Norte', orders: 5, status: 'Activo', phone: '0991234567' },
    { id: '2', name: 'Silvia Paredes', zone: 'Quito Sur', orders: 3, status: 'Activo', phone: '0987654321' },
    { id: '3', name: 'Daniel Mora', zone: 'Guayaquil Centro', orders: 7, status: 'Activo', phone: '0998877665' },
    { id: '4', name: 'María González', zone: 'Cuenca Este', orders: 4, status: 'Inactivo', phone: '0991122334' },
    { id: '5', name: 'Carlos Pérez', zone: 'Ambato', orders: 6, status: 'Activo', phone: '0981239876' },
];

const SupervisorVendedoresScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredVendors = MOCK_VENDORS.filter(vendor =>
        vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.zone.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderVendorItem = ({ item }) => (
        <TouchableOpacity
            style={styles.vendorCard}
            onPress={() => { /* Potential detail view in future */ }}
            activeOpacity={0.8}
        >
            <View style={styles.vendorAvatar}>
                <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
            </View>
            <View style={styles.vendorInfo}>
                <Text style={styles.vendorName}>{item.name}</Text>
                <Text style={styles.vendorZone}>{item.zone}</Text>
                <View style={styles.vendorDetailRow}>
                    <Ionicons name="cube-outline" size={14} color={colors.textLight} />
                    <Text style={styles.vendorStats}>{item.orders} pedidos activos</Text>
                </View>
            </View>
            <View style={styles.statusContainer}>
                <View style={[styles.statusBadge, { backgroundColor: item.status === 'Activo' ? '#E8F5E9' : '#FFEBEE' }]}>
                    <Text style={[styles.statusText, { color: item.status === 'Activo' ? colors.success : colors.danger }]}>
                        {item.status}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.screen}>
            <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
            <ScreenHeader title="Vendedores" subtitle="Gestión de equipo" showBack />

            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={20} color={colors.textLight} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar vendedor o zona..."
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
                data={filteredVendors}
                renderItem={renderVendorItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="people-outline" size={64} color={colors.border} />
                        <Text style={styles.emptyText}>No se encontraron vendedores</Text>
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
    vendorCard: {
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
    vendorAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.primary + '20',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    avatarText: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.primary,
    },
    vendorInfo: {
        flex: 1,
    },
    vendorName: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.textDark,
        marginBottom: 2,
    },
    vendorZone: {
        fontSize: 14,
        color: colors.primary,
        fontWeight: '600',
        marginBottom: 4,
    },
    vendorDetailRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    vendorStats: {
        fontSize: 12,
        color: colors.textLight,
        marginLeft: 4,
    },
    statusContainer: {
        alignItems: 'flex-end',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '700',
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

export default SupervisorVendedoresScreen;
