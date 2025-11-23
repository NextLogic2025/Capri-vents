import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    Image,
    Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import colors from '../../theme/colors';
import globalStyles from '../../theme/styles';
import ScreenHeader from '../../Cliente/components/ScreenHeader';
import PrimaryButton from '../../Cliente/components/PrimaryButton';
import { useAppContext } from '../../context/AppContext';

const STATUS_CONFIG = {
    PENDIENTE: { label: 'Pendiente', color: colors.warning, icon: 'time-outline', next: 'EN_PREPARACION', actionLabel: 'Iniciar Preparación' },
    EN_PREPARACION: { label: 'En Preparación', color: colors.info, icon: 'cube-outline', next: 'EN_RUTA', actionLabel: 'Enviar a Ruta' },
    EN_RUTA: { label: 'En Ruta', color: colors.primary, icon: 'bicycle-outline', next: 'ENTREGADO', actionLabel: 'Confirmar Entrega' },
    ENTREGADO: { label: 'Entregado', color: colors.success, icon: 'checkmark-circle-outline', next: null, actionLabel: null },
    CANCELADO: { label: 'Cancelado', color: colors.danger, icon: 'close-circle-outline', next: null, actionLabel: null },
};

const formatCurrency = (value) => {
    return `$${Number(value || 0).toFixed(2)}`;
};

const VendedorDetallePedidoScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { order } = route.params || {};
    const { setOrders } = useAppContext(); // Necesitamos actualizar el estado global

    const [currentOrder, setCurrentOrder] = useState(order);
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    if (!currentOrder) return null;

    const statusKey = (currentOrder.status || 'PENDIENTE').toUpperCase();
    const statusConfig = STATUS_CONFIG[statusKey] || STATUS_CONFIG.PENDIENTE;
    const nextStatus = statusConfig.next;

    const handleStatusChange = () => {
        if (!nextStatus) return;

        Alert.alert(
            'Actualizar Estado',
            `¿Cambiar estado a "${STATUS_CONFIG[nextStatus].label}"?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Confirmar',
                    onPress: () => {
                        // Actualizar estado local y global (simulado)
                        const updatedOrder = { ...currentOrder, status: nextStatus };
                        setCurrentOrder(updatedOrder);

                        // Actualizar en AppContext
                        setOrders(prevOrders =>
                            prevOrders.map(o => o.id === updatedOrder.id ? updatedOrder : o)
                        );

                        setSuccessMessage(`Pedido marcado como ${STATUS_CONFIG[nextStatus].label}`);
                        setSuccessModalVisible(true);
                    },
                },
            ]
        );
    };

    const handleReportProblem = () => {
        navigation.navigate('VendedorCrearTicket', { order: currentOrder });
    };

    const renderSuccessModal = () => (
        <Modal visible={successModalVisible} transparent animationType="fade">
            <View style={styles.modalOverlay}>
                <View style={styles.successCard}>
                    <View style={styles.successIcon}>
                        <Ionicons name="checkmark" size={40} color={colors.white} />
                    </View>
                    <Text style={styles.successTitle}>¡Actualizado!</Text>
                    <Text style={styles.successMessage}>{successMessage}</Text>
                    <PrimaryButton title="Aceptar" onPress={() => setSuccessModalVisible(false)} style={{ width: '100%' }} />
                </View>
            </View>
        </Modal>
    );

    return (
        <View style={styles.screen}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color={colors.darkText} />
            </TouchableOpacity>

            <ScreenHeader
                title="Detalle del Pedido"
                subtitle={`Orden #${currentOrder.code || currentOrder.id}`}
            />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* ESTADO ACTUAL */}
                <View style={styles.statusCard}>
                    <View style={[styles.statusIconContainer, { backgroundColor: statusConfig.color }]}>
                        <Ionicons name={statusConfig.icon} size={32} color={colors.white} />
                    </View>
                    <View style={styles.statusTextContainer}>
                        <Text style={styles.statusLabel}>Estado Actual</Text>
                        <Text style={[styles.statusValue, { color: statusConfig.color }]}>{statusConfig.label}</Text>
                    </View>
                </View>

                {/* INFORMACIÓN DEL CLIENTE */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Información del Cliente</Text>
                    <View style={styles.infoCard}>
                        <View style={styles.infoRow}>
                            <Ionicons name="person-outline" size={20} color={colors.primary} />
                            <Text style={styles.infoText}>{currentOrder.clientName}</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.infoRow}>
                            <Ionicons name="call-outline" size={20} color={colors.primary} />
                            <Text style={styles.infoText}>{currentOrder.clientPhone}</Text>
                        </View>
                        <View style={styles.divider} />
                        <TouchableOpacity
                            style={styles.infoRow}
                            onPress={() => {
                                if (currentOrder.clientAddressDetail) {
                                    Alert.alert('Detalle de Dirección', currentOrder.clientAddressDetail);
                                }
                            }}
                        >
                            <Ionicons name="location-outline" size={20} color={colors.primary} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.infoText}>{currentOrder.clientAddress}</Text>
                                {currentOrder.clientAddressDetail && (
                                    <Text style={styles.infoSubText}>Ver más detalles...</Text>
                                )}
                            </View>
                            <Ionicons name="chevron-forward" size={16} color={colors.textLight} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* PRODUCTOS */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Productos</Text>
                    <View style={styles.productsCard}>
                        {currentOrder.items?.map((item, index) => (
                            <View key={index} style={styles.productItem}>
                                <View style={styles.productInfo}>
                                    <Text style={styles.productName}>{item.name}</Text>
                                    <Text style={styles.productMeta}>{item.presentation} x {item.quantity}</Text>
                                </View>
                                <Text style={styles.productPrice}>{formatCurrency(item.price * item.quantity)}</Text>
                            </View>
                        ))}
                        <View style={styles.totalContainer}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalValue}>{formatCurrency(currentOrder.total)}</Text>
                        </View>
                    </View>
                </View>

                {/* PAGO */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Información de Pago</Text>
                    <View style={styles.infoCard}>
                        <View style={styles.infoRow}>
                            <Text style={styles.paymentLabel}>Método:</Text>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={styles.paymentValue}>{currentOrder.paymentMethod}</Text>
                                {currentOrder.paymentMethod === 'TRANSFERENCIA' && (
                                    <TouchableOpacity onPress={() => Alert.alert('Comprobante', 'Mostrando imagen del comprobante...')}>
                                        <Text style={{ color: colors.primary, fontSize: 12, fontWeight: '600' }}>Ver Comprobante</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.infoRow}>
                            <Text style={styles.paymentLabel}>Estado:</Text>
                            <View style={[styles.paymentBadge, { backgroundColor: currentOrder.paymentStatus === 'PAGADO' ? colors.success : colors.warning }]}>
                                <Text style={styles.paymentBadgeText}>{currentOrder.paymentStatus}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Espacio extra para el bottom bar */}
                <View style={{ height: 100 }} />
            </ScrollView>

            {/* BOTTOM ACTION BAR */}
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.reportButton} onPress={handleReportProblem}>
                    <Ionicons name="alert-circle-outline" size={24} color={colors.danger} />
                    <Text style={styles.reportButtonText}>Reportar</Text>
                </TouchableOpacity>

                {nextStatus && (
                    <TouchableOpacity style={[styles.actionButton, { backgroundColor: STATUS_CONFIG[nextStatus].color }]} onPress={handleStatusChange}>
                        <Text style={styles.actionButtonText}>{statusConfig.actionLabel}</Text>
                        <Ionicons name="arrow-forward" size={20} color={colors.white} style={{ marginLeft: 8 }} />
                    </TouchableOpacity>
                )}
            </View>

            {renderSuccessModal()}
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 120, // Espacio para el bottom bar
    },
    statusCard: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 16,
        alignItems: 'center',
        marginBottom: 24,
        borderWidth: 1,
        borderColor: colors.borderSoft,
        // Eliminada sombra "fea"
    },
    statusIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    statusTextContainer: {
        flex: 1,
    },
    statusLabel: {
        fontSize: 12,
        color: colors.textLight,
        textTransform: 'uppercase',
        fontWeight: '600',
        marginBottom: 4,
    },
    statusValue: {
        fontSize: 20,
        fontWeight: '800',
    },
    sectionContainer: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.textDark,
        marginBottom: 12,
        marginLeft: 4,
    },
    infoCard: {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    infoText: {
        marginLeft: 12,
        fontSize: 15,
        color: colors.textDark,
        fontWeight: '500',
    },
    infoSubText: {
        marginLeft: 12,
        fontSize: 12,
        color: colors.primary,
        marginTop: 2,
    },
    divider: {
        height: 1,
        backgroundColor: colors.borderSoft,
        marginVertical: 4,
    },
    productsCard: {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
    },
    productItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderSoft,
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.textDark,
    },
    productMeta: {
        fontSize: 13,
        color: colors.textLight,
        marginTop: 2,
    },
    productPrice: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.textDark,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
        paddingTop: 8,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.textDark,
    },
    totalValue: {
        fontSize: 22,
        fontWeight: '800',
        color: colors.primary,
    },
    paymentLabel: {
        fontSize: 14,
        color: colors.textLight,
        fontWeight: '500',
        width: 80,
    },
    paymentValue: {
        fontSize: 15,
        color: colors.textDark,
        fontWeight: '600',
    },
    paymentBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    paymentBadgeText: {
        color: colors.white,
        fontSize: 12,
        fontWeight: '700',
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.white,
        flexDirection: 'row',
        padding: 16,
        paddingBottom: 32,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 20,
        alignItems: 'center',
    },
    reportButton: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        marginRight: 12,
    },
    reportButtonText: {
        fontSize: 10,
        color: colors.danger,
        fontWeight: '600',
        marginTop: 4,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        height: 56,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    actionButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '700',
    },
    // Success Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    successCard: {
        backgroundColor: colors.white,
        width: '80%',
        borderRadius: 24,
        padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 10,
    },
    successIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.success,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    successTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: colors.textDark,
        marginBottom: 10,
        textAlign: 'center',
    },
    successMessage: {
        fontSize: 14,
        color: colors.textLight,
        textAlign: 'center',
        marginBottom: 24,
    },
    backButton: {
        position: 'absolute',
        top: 60,
        right: 20,
        zIndex: 100,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
    },
});

export default VendedorDetallePedidoScreen;
