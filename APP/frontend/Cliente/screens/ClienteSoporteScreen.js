import React from 'react';
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
import EmptyState from '../components/EmptyState';

const TicketCard = ({ ticket }) => {
    const statusColors = {
        ABIERTO: colors.warning,
        CERRADO: colors.success,
        EN_PROCESO: colors.info,
    };

    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.ticketId}>#{ticket.id}</Text>
                <View style={[styles.statusBadge, { backgroundColor: statusColors[ticket.status] || colors.textLight }]}>
                    <Text style={styles.statusText}>{ticket.status}</Text>
                </View>
            </View>

            <Text style={styles.subject}>{ticket.subject}</Text>
            <Text style={styles.description} numberOfLines={2}>{ticket.description}</Text>

            <View style={styles.footer}>
                <View style={styles.metaRow}>
                    <Ionicons name="calendar-outline" size={14} color={colors.textLight} />
                    <Text style={styles.metaText}>{ticket.date}</Text>
                </View>
                {ticket.orderCode && (
                    <View style={styles.metaRow}>
                        <Ionicons name="cube-outline" size={14} color={colors.textLight} />
                        <Text style={styles.metaText}>Ref: {ticket.orderCode}</Text>
                    </View>
                )}
            </View>
        </View>
    );
};

const ClienteSoporteScreen = () => {
    const { tickets } = useAppContext();
    const navigation = useNavigation();

    return (
        <View style={styles.screen}>
            <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

            {/* Header con Gradiente */}
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
                        <Text style={styles.headerTitle}>Soporte</Text>
                        <Text style={styles.headerSubtitle}>Mis tickets de ayuda</Text>
                    </View>
                </View>
            </LinearGradient>

            <FlatList
                data={tickets}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <TicketCard ticket={item} />}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <EmptyState
                        title="Sin tickets"
                        subtitle="No tienes reportes activos."
                        iconName="chatbubble-ellipses-outline"
                    />
                }
            />

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('ClienteCrearTicket')}
            >
                <Ionicons name="add" size={30} color={colors.white} />
            </TouchableOpacity>
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
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
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
    listContent: {
        padding: 16,
        paddingBottom: 100,
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
        alignItems: 'center',
        marginBottom: 8,
    },
    ticketId: {
        fontSize: 12,
        fontWeight: '700',
        color: colors.textLight,
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
        borderTopWidth: 1,
        borderTopColor: colors.borderSoft,
        paddingTop: 12,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    metaText: {
        fontSize: 12,
        color: colors.textLight,
        marginLeft: 4,
    },
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.danger,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.danger,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
});

export default ClienteSoporteScreen;
