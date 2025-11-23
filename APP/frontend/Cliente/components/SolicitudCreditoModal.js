import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import PrimaryButton from '../../components/PrimaryButton';

const SolicitudCreditoModal = ({ visible, onClose }) => {
    const [formData, setFormData] = useState({
        tipoId: 'CEDULA',
        identificacion: '',
        razonSocial: '',
        direccion: '',
        telefono: '',
        monto: '',
        motivo: '',
    });

    const handleChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        // Validación básica
        if (!formData.identificacion || !formData.razonSocial || !formData.monto || !formData.motivo) {
            Alert.alert('Campos incompletos', 'Por favor completa todos los campos obligatorios (*).');
            return;
        }

        Alert.alert(
            'Solicitud Enviada',
            'Tu solicitud de cupo ha sido recibida correctamente. Un asesor analizará tu información y te contactará en breve.',
            [{ text: 'Entendido', onPress: onClose }]
        );
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.modalOverlay}
            >
                <View style={styles.modalContainer}>
                    {/* Header */}
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.headerTitle}>Solicitud de Cupo</Text>
                            <Text style={styles.headerSubtitle}>Formulario de crédito</Text>
                        </View>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Ionicons name="close" size={24} color={colors.textMuted} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContent}>
                        <View style={styles.infoBox}>
                            <Ionicons name="information-circle-outline" size={20} color={colors.primary} />
                            <Text style={styles.infoText}>
                                Ingresa tus datos fiscales y comerciales para evaluar tu solicitud de crédito.
                            </Text>
                        </View>

                        {/* Sección: Datos Informativos */}
                        <Text style={styles.sectionTitle}>Datos Informativos</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Tipo de Identificación</Text>
                            <View style={styles.row}>
                                <TouchableOpacity
                                    style={[styles.radioOption, formData.tipoId === 'CEDULA' && styles.radioActive]}
                                    onPress={() => handleChange('tipoId', 'CEDULA')}
                                >
                                    <Text style={[styles.radioText, formData.tipoId === 'CEDULA' && styles.radioTextActive]}>Cédula</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.radioOption, formData.tipoId === 'RUC' && styles.radioActive]}
                                    onPress={() => handleChange('tipoId', 'RUC')}
                                >
                                    <Text style={[styles.radioText, formData.tipoId === 'RUC' && styles.radioTextActive]}>RUC</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Número de Identificación *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={formData.tipoId === 'CEDULA' ? 'Ej: 1712345678' : 'Ej: 1712345678001'}
                                keyboardType="numeric"
                                value={formData.identificacion}
                                onChangeText={(text) => handleChange('identificacion', text)}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Razón Social / Nombre Completo *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nombre del titular o empresa"
                                value={formData.razonSocial}
                                onChangeText={(text) => handleChange('razonSocial', text)}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Dirección del Negocio *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Dirección exacta"
                                value={formData.direccion}
                                onChangeText={(text) => handleChange('direccion', text)}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Teléfono de Referencia</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Ej: 0991234567"
                                keyboardType="phone-pad"
                                value={formData.telefono}
                                onChangeText={(text) => handleChange('telefono', text)}
                            />
                        </View>

                        {/* Sección: Detalles de Solicitud */}
                        <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Detalle de Solicitud</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Monto Solicitado *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="$ 0.00"
                                keyboardType="numeric"
                                value={formData.monto}
                                onChangeText={(text) => handleChange('monto', text)}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Motivo / Justificación *</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Describe brevemente para qué necesitas el cupo (ej: expansión, temporada alta...)"
                                multiline
                                numberOfLines={3}
                                value={formData.motivo}
                                onChangeText={(text) => handleChange('motivo', text)}
                            />
                        </View>

                        <View style={styles.footer}>
                            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                                <Text style={styles.cancelText}>Cancelar</Text>
                            </TouchableOpacity>
                            <PrimaryButton
                                title="Enviar Solicitud"
                                onPress={handleSubmit}
                                style={styles.submitButton}
                            />
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: colors.background,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        height: '90%',
        paddingTop: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderSoft,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: colors.darkText,
    },
    headerSubtitle: {
        fontSize: 14,
        color: colors.textLight,
    },
    closeButton: {
        padding: 4,
    },
    formContent: {
        padding: 20,
        paddingBottom: 40,
    },
    infoBox: {
        flexDirection: 'row',
        backgroundColor: '#FFF0F0',
        padding: 12,
        borderRadius: 12,
        marginBottom: 20,
        alignItems: 'center',
    },
    infoText: {
        flex: 1,
        marginLeft: 10,
        fontSize: 13,
        color: colors.textDark,
        lineHeight: 18,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.primary,
        marginBottom: 16,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.textDark,
        marginBottom: 8,
    },
    input: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: colors.darkText,
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    row: {
        flexDirection: 'row',
    },
    radioOption: {
        flex: 1,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
        alignItems: 'center',
        marginRight: 8,
        backgroundColor: colors.white,
    },
    radioActive: {
        borderColor: colors.primary,
        backgroundColor: '#FFF0F0',
    },
    radioText: {
        fontWeight: '600',
        color: colors.textLight,
    },
    radioTextActive: {
        color: colors.primary,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    cancelButton: {
        flex: 1,
        paddingVertical: 16,
        alignItems: 'center',
        marginRight: 12,
    },
    cancelText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.textMuted,
    },
    submitButton: {
        flex: 2,
    },
});

export default SolicitudCreditoModal;
