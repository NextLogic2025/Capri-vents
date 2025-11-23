import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import colors from '../../theme/colors';
import { useAppContext } from '../../context/AppContext';
import EmptyState from '../../Cliente/components/EmptyState';

const TicketCard = ({ ticket, onPress }) => {
    const statusColors = {
        ABIERTO: colors.warning,
        CERRADO: colors.success,
        EN_PROCESO: colors.info,
    };

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.cardHeader}>
                <View style={styles.userInfo}>
                    <Ionicons name="person-circle-outline" size={32} color={colors.primary} />
                    <View style={{ marginLeft: 8 }}>
                        <Text style={styles.userName}>{ticket.user}</Text>
                        <Text style={styles.userType}>{ticket.type}</Text>
                    </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusColors[ticket.status] || colors.textLight }]}>
                    <Text style={styles.statusText}>{ticket.status}</Text>
                </View>
            </View>

            <Text style={styles.subject}>{ticket.subject}</Text>
            <Text style={styles.description} numberOfLines={2}>{ticket.description}</Text>

            <View style={styles.footer}>
                <Text style={styles.date}>{ticket.date}</Text>
                <Ionicons name="chevron-forward" size={16} color={colors.textLight} />
            </View>
        </TouchableOpacity>
    );
};

const SupervisorSoporteScreen = () => {
    const { tickets } = useAppContext();
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState('CLIENTE');

    const filteredTickets = tickets.filter(t => t.type === activeTab);

    return (
        <View style={styles.screen}>
            <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

            {/* Header */}
            <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                style={styles.headerGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.headerContent}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={colors.white} />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.headerTitle}>Gestión de Soporte</Text>
                        <Text style={styles.headerSubtitle}>Atención a reclamos</Text>
                    </View>
                </View>
            </LinearGradient>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'CLIENTE' && styles.activeTab]}
                    onPress={() => setActiveTab('CLIENTE')}
                >
                    <Text style={[styles.tabText, activeTab === 'CLIENTE' && styles.activeTabText]}>Clientes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'VENDEDOR' && styles.activeTab]}
                    onPress={() => setActiveTab('VENDEDOR')}
                >
                    <Text style={[styles.tabText, activeTab === 'VENDEDOR' && styles.activeTabText]}>Vendedores</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredTickets}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TicketCard
                        ticket={item}
                        onPress={() => navigation.navigate('SupervisorDetalleTicket', { ticket: item })}
                    />
                )}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <EmptyState
                        title="Sin tickets pendientes"
                        subtitle={`No hay reclamos de ${activeTab.toLowerCase()}s.`}
                        iconName="checkmark-circle-outline"
                    />
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
    headerGradient: {
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.white,
    },
    headerSubtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.9)',
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        padding: 4,
        margin: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.borderSoft,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 8,
    },
    activeTab: {
        backgroundColor: colors.primary,
    },
    tabText: {
        fontWeight: '600',
        color: colors.textLight,
    },
    activeTabText: {
        color: colors.white,
    },
    listContent: {
        padding: 16,
        paddingTop: 0,
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userName: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.textDark,
    },
    userType: {
        fontSize: 10,
        color: colors.textLight,
        fontWeight: '600',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusText: {
        color: colors.white,
        fontSize: 10,
        fontWeight: '700',
    },
    subject: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.textDark,
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: colors.textSecondary,
        marginBottom: 12,
        lineHeight: 20,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: colors.borderSoft,
        paddingTop: 12,
    },
    date: {
        fontSize: 12,
        color: colors.textLight,
    },
});

export default SupervisorSoporteScreen;
