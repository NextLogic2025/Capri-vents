import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, TextInput, StatusBar, FlatList, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../../context/AppContext';
import colors from '../../theme/colors';
import SectionCard from '../../Cliente/components/SectionCard';
import PrimaryButton from '../../components/PrimaryButton';
import ScreenHeader from '../../components/ScreenHeader';

// Mock Clients Data (Duplicated for simplicity as per request)
const MOCK_CLIENTS = [
    { id: '1', name: 'Juan Pérez', business: 'Tienda El Vecino', address: 'Av. Amazonas y Naciones Unidas', phone: '0991234567' },
    { id: '2', name: 'María López', business: 'Comedor Doña Flor', address: 'Calle La Ronda 123', phone: '0987654321' },
    { id: '3', name: 'Carlos Ruiz', business: 'Licorería Don Pepe', address: 'Av. 10 de Agosto y Colón', phone: '0998877665' },
    { id: '4', name: 'Ana Gómez', business: 'Panadería La Espiga', address: 'Sector El Condado, Calle A', phone: '022345678' },
    { id: '5', name: 'Luis Torres', business: 'Minimarket Express', address: 'Villa Flora, Calle B', phone: '0991122334' },
];

const PAYMENT_METHODS = [
    { id: 'EFECTIVO', label: 'Efectivo Contra entrega', icon: 'cash-outline', description: 'Paga al recibir tu pedido' },
    { id: 'TRANSFERENCIA', label: 'Transferencia Contra entrega', icon: 'phone-portrait-outline', description: 'Sube tu comprobante después' },
];

const VendedorCheckoutScreen = ({ navigation }) => {
    const { cart, cartTotals, createOrderFromCart } = useAppContext();
    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [notes, setNotes] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    // Client Selection Modal
    const [modalVisible, setModalVisible] = useState(false);
    const [clientSearch, setClientSearch] = useState('');

    const filteredClients = useMemo(() => {
        const query = clientSearch.toLowerCase();
        return MOCK_CLIENTS.filter(c =>
            c.name.toLowerCase().includes(query) ||
            c.business.toLowerCase().includes(query)
        );
    }, [clientSearch]);

    const handleSelectClient = (client) => {
        setSelectedClient(client);
        setSelectedAddress(client.address);
        setPhoneNumber(client.phone);
        setModalVisible(false);
    };

    const handleConfirmOrder = () => {
        if (!selectedClient) {
            Alert.alert('Falta cliente', 'Por favor selecciona un cliente para el pedido.');
            return;
        }
        if (!selectedAddress) {
            Alert.alert('Falta dirección', 'Por favor ingresa una dirección de entrega.');
            return;
        }
        if (!phoneNumber) {
            Alert.alert('Falta teléfono', 'Por favor ingresa un número de contacto.');
            return;
        }
        if (!selectedPayment) {
            Alert.alert('Método de pago', 'Selecciona cómo desea pagar el cliente.');
            return;
        }

        if (selectedPayment === 'CREDITO') {
            // For vendor, maybe skip plan selection or implement a simplified version?
            // For now, let's just create the order as PENDING/CREDIT without plan selection screen to keep it simple as requested "datos quemados"
            // Or if the user wants the EXACT flow, we might need to mock that screen too.
            // Let's assume direct order creation for now, or redirect to a mock credit success.
            // But the prompt said "sigue el flujo", so maybe I should just create the order.
        }

        // Crear orden
        const orderData = {
            address: selectedAddress,
            notes,
            phone: phoneNumber,
            clientName: selectedClient.name, // Pass client name
            clientId: selectedClient.id,
        };

        const order = createOrderFromCart(selectedPayment, orderData);
        if (order) {
            // Navigate to success or back to orders
            Alert.alert(
                'Pedido Creado',
                `El pedido ${order.code} para ${selectedClient.name} ha sido creado exitosamente.`,
                [
                    { text: 'OK', onPress: () => navigation.navigate('Pedidos') }
                ]
            );
        }
    };

    if (cart.length === 0) {
        return (
            <View style={[styles.screen, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: colors.textLight }}>El carrito está vacío</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
                    <Text style={{ color: colors.primary, fontWeight: 'bold' }}>Volver al catálogo</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
            <ScreenHeader title="Checkout Vendedor" subtitle="Crear pedido para cliente" showBack />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Selección de Cliente */}
                <SectionCard title="Cliente">
                    {selectedClient ? (
                        <View>
                            <View style={styles.selectedClientContainer}>
                                <View>
                                    <Text style={styles.clientName}>{selectedClient.name}</Text>
                                    <Text style={styles.clientBusiness}>{selectedClient.business}</Text>
                                </View>
                                <TouchableOpacity onPress={() => setModalVisible(true)}>
                                    <Text style={styles.changeClientText}>Cambiar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        <TouchableOpacity style={styles.selectClientButton} onPress={() => setModalVisible(true)}>
                            <Ionicons name="person-add-outline" size={24} color={colors.primary} />
                            <Text style={styles.selectClientText}>Seleccionar Cliente</Text>
                        </TouchableOpacity>
                    )}
                </SectionCard>

                {/* Dirección de Entrega */}
                <SectionCard title="Información de Entrega">
                    <View style={styles.addressContainer}>
                        <Ionicons name="location-outline" size={24} color={colors.primary} style={styles.addressIcon} />
                        <TextInput
                            style={styles.addressInput}
                            placeholder="Dirección de entrega"
                            value={selectedAddress}
                            onChangeText={setSelectedAddress}
                            multiline
                        />
                    </View>

                    <View style={styles.phoneContainer}>
                        <Ionicons name="call-outline" size={20} color={colors.textMuted} style={styles.inputIcon} />
                        <TextInput
                            style={styles.phoneInput}
                            placeholder="Teléfono de contacto"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            keyboardType="phone-pad"
                        />
                    </View>

                    <TextInput
                        style={styles.notesInput}
                        placeholder="Notas adicionales (opcional)"
                        value={notes}
                        onChangeText={setNotes}
                    />
                </SectionCard>

                {/* Resumen del Pedido */}
                <SectionCard title="Resumen del pedido">
                    {cart.map((item) => (
                        <View key={item.id} style={styles.cartItem}>
                            <View style={styles.cartItemInfo}>
                                <Text style={styles.cartItemName}>{item.name}</Text>
                                <Text style={styles.cartItemQuantity}>x{item.quantity}</Text>
                            </View>
                            <Text style={styles.cartItemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                        </View>
                    ))}
                    <View style={styles.divider} />
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total a pagar</Text>
                        <Text style={styles.totalValue}>${cartTotals.total.toFixed(2)}</Text>
                    </View>
                </SectionCard>

                {/* Método de Pago */}
                <SectionCard title="Método de pago">
                    {PAYMENT_METHODS.map((method) => {
                        const isSelected = selectedPayment === method.id;
                        return (
                            <View key={method.id}>
                                <TouchableOpacity
                                    style={[styles.paymentOption, isSelected && styles.paymentOptionSelected]}
                                    onPress={() => setSelectedPayment(method.id)}
                                    activeOpacity={0.8}
                                >
                                    <View style={[styles.paymentIconContainer, isSelected && styles.paymentIconSelected]}>
                                        <Ionicons
                                            name={method.icon}
                                            size={24}
                                            color={isSelected ? colors.white : colors.textLight}
                                        />
                                    </View>
                                    <View style={styles.paymentInfo}>
                                        <Text style={[styles.paymentLabel, isSelected && styles.paymentLabelSelected]}>
                                            {method.label}
                                        </Text>
                                        <Text style={styles.paymentDescription}>{method.description}</Text>
                                    </View>
                                    <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                                        {isSelected && <View style={styles.radioDot} />}
                                    </View>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </SectionCard>

            </ScrollView>

            {/* Barra Inferior */}
            <View style={styles.bottomBar}>
                <View style={styles.bottomTotal}>
                    <Text style={styles.bottomTotalLabel}>Total</Text>
                    <Text style={styles.bottomTotalValue}>${cartTotals.total.toFixed(2)}</Text>
                </View>
                <PrimaryButton
                    title="Confirmar Pedido"
                    onPress={handleConfirmOrder}
                    style={styles.confirmButton}
                />
            </View>

            {/* Modal de Selección de Cliente */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Seleccionar Cliente</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Ionicons name="close" size={24} color={colors.textDark} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.searchContainer}>
                            <Ionicons name="search" size={20} color={colors.textLight} />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Buscar cliente..."
                                value={clientSearch}
                                onChangeText={setClientSearch}
                            />
                        </View>

                        <FlatList
                            data={filteredClients}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.clientItem} onPress={() => handleSelectClient(item)}>
                                    <View style={styles.clientAvatar}>
                                        <Text style={styles.clientInitials}>{item.name.substring(0, 2).toUpperCase()}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.clientItemName}>{item.name}</Text>
                                        <Text style={styles.clientItemBusiness}>{item.business}</Text>
                                    </View>
                                    <Ionicons name="chevron-forward" size={20} color={colors.textLight} style={{ marginLeft: 'auto' }} />
                                </TouchableOpacity>
                            )}
                            ItemSeparatorComponent={() => <View style={styles.separator} />}
                        />
                    </View>
                </View>
            </Modal>

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
        paddingBottom: 120,
    },
    selectClientButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 12,
        borderStyle: 'dashed',
        backgroundColor: '#F0F7FF',
    },
    selectClientText: {
        marginLeft: 8,
        color: colors.primary,
        fontWeight: '600',
        fontSize: 16,
    },
    selectedClientContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    clientName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.textDark,
    },
    clientBusiness: {
        fontSize: 14,
        color: colors.textLight,
    },
    changeClientText: {
        color: colors.primary,
        fontWeight: '600',
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
    },
    addressIcon: {
        marginRight: 12,
    },
    addressInput: {
        flex: 1,
        fontSize: 14,
        color: colors.darkText,
    },
    phoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        paddingHorizontal: 12,
        marginBottom: 12,
    },
    inputIcon: {
        marginRight: 10,
    },
    phoneInput: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 14,
        color: colors.darkText,
    },
    notesInput: {
        fontSize: 14,
        color: colors.darkText,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderSoft,
        paddingVertical: 8,
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    cartItemInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cartItemName: {
        fontSize: 14,
        color: colors.textDark,
        marginRight: 8,
    },
    cartItemQuantity: {
        fontSize: 12,
        color: colors.textLight,
        fontWeight: '700',
    },
    cartItemPrice: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.textDark,
    },
    divider: {
        height: 1,
        backgroundColor: colors.borderSoft,
        marginVertical: 12,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.textDark,
    },
    totalValue: {
        fontSize: 20,
        fontWeight: '800',
        color: colors.primary,
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.borderSoft,
        marginBottom: 12,
        backgroundColor: colors.white,
    },
    paymentOptionSelected: {
        borderColor: colors.primary,
        backgroundColor: '#FFF5F2',
    },
    paymentIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    paymentIconSelected: {
        backgroundColor: colors.primary,
    },
    paymentInfo: {
        flex: 1,
    },
    paymentLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.textDark,
    },
    paymentLabelSelected: {
        color: colors.primary,
    },
    paymentDescription: {
        fontSize: 12,
        color: colors.textLight,
        marginTop: 2,
    },
    radioCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: colors.borderSoft,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioCircleSelected: {
        borderColor: colors.primary,
    },
    radioDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: colors.primary,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.white,
        padding: 20,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bottomTotal: {
        flex: 1,
    },
    bottomTotalLabel: {
        fontSize: 12,
        color: colors.textLight,
    },
    bottomTotalValue: {
        fontSize: 24,
        fontWeight: '800',
        color: colors.textDark,
    },
    confirmButton: {
        flex: 1.5,
        marginLeft: 20,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        height: '80%',
        padding: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.textDark,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 16,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
        color: colors.textDark,
    },
    clientItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    clientAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.primary + '20',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    clientInitials: {
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 16,
    },
    clientItemName: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.textDark,
    },
    clientItemBusiness: {
        fontSize: 14,
        color: colors.textLight,
    },
    separator: {
        height: 1,
        backgroundColor: colors.borderSoft,
    },
});

export default VendedorCheckoutScreen;
