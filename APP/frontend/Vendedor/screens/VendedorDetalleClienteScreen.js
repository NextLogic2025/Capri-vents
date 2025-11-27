import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import ScreenHeader from '../../components/ScreenHeader';
import SectionCard from '../../components/SectionCard';

// Mock data for order history
const MOCK_HISTORY = [
    { id: 'ORD-001', date: '2025-11-25', total: '45.50', status: 'Entregado', items: 3 },
    { id: 'ORD-002', date: '2025-11-18', total: '120.00', status: 'Entregado', items: 8 },
    { id: 'ORD-003', date: '2025-11-10', total: '32.75', status: 'Cancelado', items: 2 },
    { id: 'ORD-004', date: '2025-11-01', total: '85.20', status: 'Entregado', items: 5 },
];

const VendedorDetalleClienteScreen = ({ route, navigation }) => {
    const { client } = route.params;

    const getStatusColor = (status) => {
        switch (status) {
            case 'Entregado': return colors.success;
            case 'Pendiente': return colors.warning;
            case 'Cancelado': return colors.danger;
            default: return colors.textLight;
        }
    };

    return (
        <View style={styles.screen}>
            <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
            <ScreenHeader title="Detalle del Cliente" showBack />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Client Profile Header */}
                <View style={styles.profileHeader}>
                    <View style={styles.avatarLarge}>
                        <Text style={styles.avatarTextLarge}>{client.name.charAt(0)}</Text>
                    </View>
                    <Text style={styles.profileName}>{client.name}</Text>
                    <Text style={styles.profileBusiness}>{client.business}</Text>
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>12</Text>
                            <Text style={styles.statLabel}>Pedidos</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>$450</Text>
                            <Text style={styles.statLabel}>Total</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>Activo</Text>
                            <Text style={styles.statLabel}>Estado</Text>
                        </View>
                    </View>
                </View>

                {/* Contact Info */}
                <SectionCard title="Información de Contacto">
                    <View style={styles.infoRow}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="call-outline" size={20} color={colors.primary} />
                        </View>
                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>Teléfono</Text>
                            <Text style={styles.infoValue}>{client.phone}</Text>
                        </View>
                        <TouchableOpacity style={styles.actionButton}>
                            <Ionicons name="call" size={18} color={colors.white} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.infoRow}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="location-outline" size={20} color={colors.primary} />
                        </View>
                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>Dirección</Text>
                            <Text style={styles.infoValue}>{client.address}</Text>
                        </View>
                        <TouchableOpacity style={styles.actionButton}>
                            <Ionicons name="map" size={18} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                </SectionCard>

                {/* Order History */}
                <SectionCard title="Historial de Pedidos">
                    {MOCK_HISTORY.map((order, index) => (
                        <View key={order.id}>
                            <TouchableOpacity style={styles.historyItem}>
                                <View style={styles.historyIcon}>
                                    <Ionicons name="receipt-outline" size={24} color={colors.textLight} />
                                </View>
                                <View style={styles.historyInfo}>
                                    <Text style={styles.historyId}>{order.id}</Text>
                                    <Text style={styles.historyDate}>{order.date} • {order.items} items</Text>
                                </View>
                                <View style={styles.historyRight}>
                                    <Text style={styles.historyTotal}>${order.total}</Text>
                                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '20' }]}>
                                        <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
                                            {order.status}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            {index < MOCK_HISTORY.length - 1 && <View style={styles.divider} />}
                        </View>
                    ))}
                </SectionCard>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 24,
        marginTop: 8,
    },
    avatarLarge: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    avatarTextLarge: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.white,
    },
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.textDark,
        marginBottom: 4,
    },
    profileBusiness: {
        fontSize: 16,
        color: colors.textLight,
        marginBottom: 16,
    },
    statsRow: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 16,
        width: '100%',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.textDark,
    },
    statLabel: {
        fontSize: 12,
        color: colors.textLight,
        marginTop: 4,
    },
    statDivider: {
        width: 1,
        height: '100%',
        backgroundColor: colors.borderSoft,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.primary + '10',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 12,
        color: colors.textLight,
        marginBottom: 2,
    },
    infoValue: {
        fontSize: 16,
        color: colors.textDark,
        fontWeight: '500',
    },
    actionButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    divider: {
        height: 1,
        backgroundColor: colors.borderSoft,
        marginVertical: 12,
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
    },
    historyIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    historyInfo: {
        flex: 1,
    },
    historyId: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.textDark,
    },
    historyDate: {
        fontSize: 12,
        color: colors.textLight,
        marginTop: 2,
    },
    historyRight: {
        alignItems: 'flex-end',
    },
    historyTotal: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.textDark,
        marginBottom: 4,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    statusText: {
        fontSize: 10,
        fontWeight: '700',
    },
});

export default VendedorDetalleClienteScreen;
