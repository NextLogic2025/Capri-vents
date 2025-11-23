import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Alert,
    Modal,
    TextInput,
    StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import colors from '../../theme/colors';
import PrimaryButton from '../../components/PrimaryButton';

// Mock Data para solicitudes
const MOCK_SOLICITUDES = [
    {
        id: '1',
        cliente: 'Distribuidora Los Andes',
        ruc: '1712345678001',
        fecha: '23/11/2025',
        montoSolicitado: 500.00,
        motivo: 'Ampliación de inventario para temporada navideña.',
        estado: 'PENDIENTE',
    },
    {
        id: '2',
        cliente: 'Tienda La Esquina',
        ruc: '0918273645',
        fecha: '22/11/2025',
        montoSolicitado: 250.00,
        motivo: 'Compra de estanterías nuevas.',
        estado: 'PENDIENTE',
    },
    {
        id: '3',
        cliente: 'Comercial El Sol',
        ruc: '1102938475001',
        fecha: '20/11/2025',
        montoSolicitado: 1200.00,
        motivo: 'Apertura de nueva sucursal en el centro.',
        estado: 'PENDIENTE',
    },
];

const SolicitudCard = ({ item, onPress }) => (
    <TouchableOpacity style={styles.card} onPress={onPress}>
        <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
                <Ionicons name="person" size={20} color={colors.primary} />
            </View>
            <View style={styles.cardHeaderText}>
                <Text style={styles.clienteName}>{item.cliente}</Text>
                <Text style={styles.rucText}>RUC/CI: {item.ruc}</Text>
            </View>
            <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{item.estado}</Text>
            </View>
        </View>

        <View style={styles.cardBody}>
            <View style={styles.infoRow}>
                <Text style={styles.label}>Fecha:</Text>
                <Text style={styles.value}>{item.fecha}</Text>
            </View>
            <View style={styles.infoRow}>
                <Text style={styles.label}>Monto Solicitado:</Text>
                <Text style={styles.montoValue}>${item.montoSolicitado.toFixed(2)}</Text>
            </View>
        </View>
    </TouchableOpacity>
);

const SupervisorSolicitudesScreen = () => {
    const navigation = useNavigation();
    const [solicitudes, setSolicitudes] = useState(MOCK_SOLICITUDES);
    const [selectedSolicitud, setSelectedSolicitud] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [montoAprobado, setMontoAprobado] = useState('');

    const handleSelectSolicitud = (item) => {
        setSelectedSolicitud(item);
        setMontoAprobado(item.montoSolicitado.toString());
        setModalVisible(true);
    };

    const handleAprobar = () => {
        if (!montoAprobado || isNaN(montoAprobado)) {
            Alert.alert('Error', 'Por favor ingresa un monto válido.');
            return;
        }

        Alert.alert(
            'Confirmar Aprobación',
            `¿Estás seguro de aprobar el crédito por $${parseFloat(montoAprobado).toFixed(2)} a ${selectedSolicitud.cliente}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Aprobar',
                    onPress: () => {
                        // BACKEND: Aquí se llamaría a la API para aprobar la solicitud
                        // POST /api/solicitudes/:id/aprobar { monto: montoAprobado }

                        const nuevasSolicitudes = solicitudes.filter(s => s.id !== selectedSolicitud.id);
                        setSolicitudes(nuevasSolicitudes);
                        setModalVisible(false);
                        Alert.alert('Éxito', 'Solicitud aprobada correctamente.');
                    }
                }
            ]
        );
    };

    const handleRechazar = () => {
        Alert.alert(
            'Confirmar Rechazo',
            `¿Estás seguro de rechazar la solicitud de ${selectedSolicitud.cliente}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Rechazar',
                    style: 'destructive',
                    onPress: () => {
                        // BACKEND: Aquí se llamaría a la API para rechazar
                        // POST /api/solicitudes/:id/rechazar

                        const nuevasSolicitudes = solicitudes.filter(s => s.id !== selectedSolicitud.id);
                        setSolicitudes(nuevasSolicitudes);
                        setModalVisible(false);
                        Alert.alert('Información', 'Solicitud rechazada.');
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Header Gradiente */}
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
                        <Text style={styles.headerTitle}>Solicitudes de Crédito</Text>
                        <Text style={styles.headerSubtitle}>Gestiona los cupos de clientes</Text>
                    </View>
                </View>
            </LinearGradient>

            <View style={styles.content}>
                {solicitudes.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Ionicons name="checkmark-circle-outline" size={64} color={colors.success} />
                        <Text style={styles.emptyText}>No hay solicitudes pendientes</Text>
                    </View>
                ) : (
                    <FlatList
                        data={solicitudes}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <SolicitudCard item={item} onPress={() => handleSelectSolicitud(item)} />
                        )}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>

            {/* Modal de Detalle y Acción */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Detalle de Solicitud</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Ionicons name="close" size={24} color={colors.textMuted} />
                            </TouchableOpacity>
                        </View>

                        {selectedSolicitud && (
                            <View style={styles.modalBody}>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Cliente:</Text>
                                    <Text style={styles.detailValue}>{selectedSolicitud.cliente}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>RUC/CI:</Text>
                                    <Text style={styles.detailValue}>{selectedSolicitud.ruc}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Motivo:</Text>
                                    <Text style={styles.detailValue}>{selectedSolicitud.motivo}</Text>
                                </View>

                                <View style={styles.divider} />

                                <Text style={styles.inputLabel}>Monto Aprobado ($)</Text>
                                <TextInput
                                    style={styles.input}
                                    value={montoAprobado}
                                    onChangeText={setMontoAprobado}
                                    keyboardType="numeric"
                                    placeholder="0.00"
                                />

                                <View style={styles.actionButtons}>
                                    <TouchableOpacity
                                        style={[styles.actionButton, styles.rejectButton]}
                                        onPress={handleRechazar}
                                    >
                                        <Text style={styles.rejectButtonText}>Rechazar</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.actionButton, styles.approveButton]}
                                        onPress={handleAprobar}
                                    >
                                        <Text style={styles.approveButtonText}>Aprobar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
    content: {
        flex: 1,
        paddingTop: 20,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
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
        alignItems: 'center',
        marginBottom: 12,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF0F0',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    cardHeaderText: {
        flex: 1,
    },
    clienteName: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.darkText,
    },
    rucText: {
        fontSize: 12,
        color: colors.textMuted,
    },
    statusBadge: {
        backgroundColor: '#FFF8E1',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#F57C00',
    },
    cardBody: {
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: 12,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    label: {
        fontSize: 14,
        color: colors.textLight,
    },
    value: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.textDark,
    },
    montoValue: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.success,
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    emptyText: {
        marginTop: 16,
        fontSize: 16,
        color: colors.textMuted,
        textAlign: 'center',
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: colors.background,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        minHeight: '50%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.darkText,
    },
    detailRow: {
        marginBottom: 16,
    },
    detailLabel: {
        fontSize: 14,
        color: colors.textLight,
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 16,
        color: colors.textDark,
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: 20,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.darkText,
        marginBottom: 8,
    },
    input: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
        padding: 16,
        fontSize: 18,
        fontWeight: '600',
        color: colors.darkText,
        marginBottom: 24,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    actionButton: {
        flex: 1,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    rejectButton: {
        backgroundColor: '#FFEBEE',
        borderWidth: 1,
        borderColor: '#FFCDD2',
    },
    approveButton: {
        backgroundColor: colors.primary,
    },
    rejectButtonText: {
        color: colors.danger,
        fontWeight: '700',
        fontSize: 16,
    },
    approveButtonText: {
        color: colors.white,
        fontWeight: '700',
        fontSize: 16,
    },
});

export default SupervisorSolicitudesScreen;
