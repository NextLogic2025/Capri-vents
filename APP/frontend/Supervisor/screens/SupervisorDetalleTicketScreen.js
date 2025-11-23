import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
    Image,
    StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import colors from '../../theme/colors';
import PrimaryButton from '../../components/PrimaryButton';
import { useAppContext } from '../../context/AppContext';

const SupervisorDetalleTicketScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { ticket } = route.params;
    const { updateTicketStatus } = useAppContext();

    const [status, setStatus] = useState(ticket.status);
    const [response, setResponse] = useState(ticket.response || '');

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
    };

    const handleSave = () => {
        Alert.alert(
            'Confirmar Cambios',
            `¿Deseas actualizar el estado a ${status} y guardar la respuesta?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Guardar',
                    onPress: () => {
                        updateTicketStatus(ticket.id, status, response);
                        Alert.alert('Éxito', 'Ticket actualizado correctamente.', [
                            { text: 'OK', onPress: () => navigation.goBack() }
                        ]);
                    }
                }
            ]
        );
    };

    const statusColors = {
        ABIERTO: colors.warning,
        CERRADO: colors.success,
        EN_PROCESO: colors.info,
    };

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
                        <Text style={styles.headerTitle}>Detalle del Ticket</Text>
                        <Text style={styles.headerSubtitle}>{ticket.id}</Text>
                    </View>
                </View>
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.content}>

                {/* Info Usuario */}
                <View style={styles.sectionCard}>
                    <View style={styles.row}>
                        <Ionicons name="person" size={20} color={colors.primary} />
                        <Text style={styles.sectionTitle}>Información del Usuario</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Nombre:</Text>
                        <Text style={styles.value}>{ticket.user}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Tipo:</Text>
                        <Text style={styles.value}>{ticket.type}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Fecha:</Text>
                        <Text style={styles.value}>{ticket.date}</Text>
                    </View>
                </View>

                {/* Info Ticket */}
                <View style={styles.sectionCard}>
                    <View style={styles.row}>
                        <Ionicons name="document-text" size={20} color={colors.primary} />
                        <Text style={styles.sectionTitle}>Detalle del Reporte</Text>
                    </View>

                    <Text style={styles.subject}>{ticket.subject}</Text>
                    <Text style={styles.description}>{ticket.description}</Text>

                    {ticket.orderCode && (
                        <View style={styles.orderRef}>
                            <Ionicons name="cube-outline" size={16} color={colors.textLight} />
                            <Text style={styles.orderRefText}>Pedido Relacionado: {ticket.orderCode}</Text>
                        </View>
                    )}

                    {ticket.evidence && (
                        <View style={styles.evidenceContainer}>
                            <Text style={styles.label}>Evidencia Adjunta:</Text>
                            <Image source={{ uri: ticket.evidence }} style={styles.evidenceImage} />
                        </View>
                    )}
                </View>

                {/* Gestión */}
                <View style={styles.sectionCard}>
                    <View style={styles.row}>
                        <Ionicons name="settings" size={20} color={colors.primary} />
                        <Text style={styles.sectionTitle}>Gestión del Ticket</Text>
                    </View>

                    <Text style={styles.label}>Estado Actual</Text>
                    <View style={styles.statusContainer}>
                        {['ABIERTO', 'EN_PROCESO', 'CERRADO'].map((s) => (
                            <TouchableOpacity
                                key={s}
                                style={[
                                    styles.statusOption,
                                    status === s && { backgroundColor: statusColors[s] || colors.primary },
                                    status !== s && { borderColor: statusColors[s] || colors.border, borderWidth: 1 }
                                ]}
                                onPress={() => handleStatusChange(s)}
                            >
                                <Text style={[
                                    styles.statusOptionText,
                                    status === s ? { color: colors.white } : { color: colors.textLight }
                                ]}>
                                    {s.replace('_', ' ')}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={[styles.label, { marginTop: 16 }]}>Respuesta / Comentario</Text>
                    <TextInput
                        style={styles.textArea}
                        placeholder="Escribe una respuesta para el usuario..."
                        multiline
                        numberOfLines={4}
                        value={response}
                        onChangeText={setResponse}
                        textAlignVertical="top"
                    />
                </View>

                <PrimaryButton
                    title="Guardar Cambios"
                    onPress={handleSave}
                    style={styles.saveButton}
                />

            </ScrollView>
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
    content: {
        padding: 20,
    },
    sectionCard: {
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
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.darkText,
        marginLeft: 8,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    label: {
        fontSize: 14,
        color: colors.textLight,
        fontWeight: '600',
    },
    value: {
        fontSize: 14,
        color: colors.textDark,
        fontWeight: '500',
    },
    subject: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.textDark,
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: colors.textSecondary,
        lineHeight: 20,
        marginBottom: 12,
    },
    orderRef: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background,
        padding: 8,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    orderRefText: {
        fontSize: 12,
        color: colors.textLight,
        marginLeft: 6,
    },
    evidenceContainer: {
        marginTop: 12,
    },
    evidenceImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginTop: 8,
        resizeMode: 'cover',
    },
    statusContainer: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 8,
    },
    statusOption: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusOptionText: {
        fontSize: 12,
        fontWeight: '700',
    },
    textArea: {
        backgroundColor: colors.background,
        borderRadius: 8,
        padding: 12,
        borderWidth: 1,
        borderColor: colors.borderSoft,
        marginTop: 8,
        minHeight: 100,
    },
    saveButton: {
        marginTop: 8,
        marginBottom: 40,
    },
});

export default SupervisorDetalleTicketScreen;
