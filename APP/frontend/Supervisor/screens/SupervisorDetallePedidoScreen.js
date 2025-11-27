import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import ScreenHeader from '../../components/ScreenHeader';
import SectionCard from '../../components/SectionCard';

const SupervisorDetallePedidoScreen = ({ route, navigation }) => {
    const { order } = route.params;

    const renderProductItem = ({ item }) => (
        <View style={styles.productItem}>
            <View style={styles.productIcon}>
                <Ionicons name="cube-outline" size={20} color={colors.primary} />
            </View>
            <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productVariant}>{item.presentation || 'Unidad'}</Text>
            </View>
            <View style={styles.productRight}>
                <Text style={styles.productQuantity}>x{item.quantity}</Text>
                <Text style={styles.productPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.screen}>
            <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
            <ScreenHeader title="Detalle del Pedido" subtitle={order.code} showBack />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Status Card */}
                <View style={styles.statusCard}>
                    <View style={styles.statusHeader}>
                        <Text style={styles.statusLabel}>Estado Actual</Text>
                        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status).bg }]}>
                            <Ionicons name={getStatusColor(order.status).icon} size={16} color={getStatusColor(order.status).color} />
                            <Text style={[styles.statusText, { color: getStatusColor(order.status).color }]}>
                                {order.status || 'Pendiente'}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.dateRow}>
                        <Ionicons name="calendar-outline" size={16} color={colors.textLight} />
                        <Text style={styles.dateText}>{order.date || order.createdAt}</Text>
                    </View>
                </View>

                {/* Client Info */}
                <SectionCard title="Información del Cliente">
                    <View style={styles.infoRow}>
                        <Ionicons name="person-outline" size={20} color={colors.primary} style={styles.infoIcon} />
                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>Cliente</Text>
                            <Text style={styles.infoValue}>{order.clientName || order.clienteNombre || 'N/A'}</Text>
                        </View>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.infoRow}>
                        <Ionicons name="location-outline" size={20} color={colors.primary} style={styles.infoIcon} />
                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>Dirección de Entrega</Text>
                            <Text style={styles.infoValue}>
                                {order.deliveryInfo?.address || order.address || 'Dirección no especificada'}
                            </Text>
                        </View>
                    </View>
                    {order.deliveryInfo?.phone && (
                        <>
                            <View style={styles.divider} />
                            <View style={styles.infoRow}>
                                <Ionicons name="call-outline" size={20} color={colors.primary} style={styles.infoIcon} />
                                <View style={styles.infoContent}>
                                    <Text style={styles.infoLabel}>Teléfono</Text>
                                    <Text style={styles.infoValue}>{order.deliveryInfo.phone}</Text>
                                </View>
                            </View>
                        </>
                    )}
                </SectionCard>

                {/* Products List */}
                <SectionCard title="Productos">
                    {order.items && order.items.length > 0 ? (
                        order.items.map((item, index) => (
                            <View key={index}>
                                {renderProductItem({ item })}
                                {index < order.items.length - 1 && <View style={styles.divider} />}
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noItemsText}>No hay productos registrados en este pedido.</Text>
                    )}
                </SectionCard>

                {/* Payment Info */}
                <SectionCard title="Pago">
                    <View style={styles.paymentRow}>
                        <Text style={styles.paymentLabel}>Subtotal</Text>
                        <Text style={styles.paymentValue}>${(order.subtotal || 0).toFixed(2)}</Text>
                    </View>
                    <View style={styles.paymentRow}>
                        <Text style={styles.paymentLabel}>Impuestos</Text>
                        <Text style={styles.paymentValue}>${(order.taxes || 0).toFixed(2)}</Text>
                    </View>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>${(order.total || 0).toFixed(2)}</Text>
                    </View>
                    <View style={styles.methodRow}>
                        <Text style={styles.methodLabel}>Método de Pago:</Text>
                        <Text style={styles.methodValue}>{order.paymentMethod || 'No especificado'}</Text>
                    </View>
                </SectionCard>

            </ScrollView>
        </View>
    );
};

const getStatusColor = (status) => {
    const s = (status || '').toLowerCase();
    if (s.includes('entregado')) return { color: colors.success, bg: '#E8F5E9', icon: 'checkmark-circle' };
    if (s.includes('ruta')) return { color: colors.warning, bg: '#FFF3E0', icon: 'car-outline' };
    if (s.includes('cancelado')) return { color: colors.danger, bg: '#FFEBEE', icon: 'close-circle' };
    return { color: colors.primary, bg: '#E3F2FD', icon: 'time-outline' };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 40,
    },
    statusCard: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    statusHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    statusLabel: {
        fontSize: 14,
        color: colors.textLight,
        fontWeight: '600',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 4,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '700',
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    dateText: {
        fontSize: 14,
        color: colors.textDark,
        fontWeight: '500',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 8,
    },
    infoIcon: {
        marginTop: 2,
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
        fontSize: 15,
        color: colors.textDark,
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: colors.borderSoft,
        marginVertical: 8,
    },
    productItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    productIcon: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.textDark,
    },
    productVariant: {
        fontSize: 12,
        color: colors.textLight,
    },
    productRight: {
        alignItems: 'flex-end',
    },
    productQuantity: {
        fontSize: 12,
        color: colors.textLight,
        marginBottom: 2,
    },
    productPrice: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.textDark,
    },
    noItemsText: {
        textAlign: 'center',
        color: colors.textLight,
        fontStyle: 'italic',
        paddingVertical: 10,
    },
    paymentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    paymentLabel: {
        fontSize: 14,
        color: colors.textLight,
    },
    paymentValue: {
        fontSize: 14,
        color: colors.textDark,
        fontWeight: '500',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: colors.borderSoft,
        marginBottom: 12,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.textDark,
    },
    totalValue: {
        fontSize: 18,
        fontWeight: '800',
        color: colors.primary,
    },
    methodRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 6,
    },
    methodLabel: {
        fontSize: 12,
        color: colors.textLight,
    },
    methodValue: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.textDark,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
});

export default SupervisorDetallePedidoScreen;
