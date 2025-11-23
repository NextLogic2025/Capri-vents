import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Alert,
    Image,
    Modal,
    FlatList,
    StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import colors from '../../theme/colors';
import PrimaryButton from '../components/PrimaryButton';
import { useAppContext } from '../../context/AppContext';

const ClienteCrearTicketScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { addTicket, orders } = useAppContext();

    // Parámetros opcionales si viene desde un pedido específico
    const initialOrder = route.params?.order || null;

    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(initialOrder);
    const [evidence, setEvidence] = useState(null);

    const [orderModalVisible, setOrderModalVisible] = useState(false);

    useEffect(() => {
        if (initialOrder) {
            setSubject(`Problema con pedido #${initialOrder.code || initialOrder.id}`);
            setSelectedOrder(initialOrder);
        }
    }, [initialOrder]);

    const handlePickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permiso denegado', 'Necesitamos acceso a la galería.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });

        if (!result.canceled) {
            setEvidence(result.assets[0].uri);
        }
    };

    const handleTakePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permiso denegado', 'Necesitamos acceso a la cámara.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });

        if (!result.canceled) {
            setEvidence(result.assets[0].uri);
        }
    };

    const handleSubmit = () => {
        if (!subject.trim() || !description.trim()) {
            Alert.alert('Campos incompletos', 'Por favor completa el asunto y la descripción.');
            return;
        }

        addTicket({
            subject,
            description,
            orderId: selectedOrder?.id,
            orderCode: selectedOrder?.code || selectedOrder?.id,
            evidence,
        });

        Alert.alert('Ticket Creado', 'Tu reporte ha sido enviado correctamente.', [
            { text: 'OK', onPress: () => navigation.goBack() }
        ]);
    };

    const renderOrderModal = () => (
        <Modal visible={orderModalVisible} animationType="slide" transparent>
            <View style={styles.modalOverlay}>
                <View style={styles.modalCard}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Seleccionar Pedido</Text>
                        <TouchableOpacity onPress={() => setOrderModalVisible(false)}>
                            <Ionicons name="close" size={24} color={colors.textDark} />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={orders} // Usamos los pedidos del cliente
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.orderItem}
                                onPress={() => {
                                    setSelectedOrder(item);
                                    setOrderModalVisible(false);
                                }}
                            >
                                <View>
                                    <Text style={styles.orderCode}>#{item.code || item.id}</Text>
                                    <Text style={styles.orderDate}>{item.date}</Text>
                                </View>
                                <Text style={styles.orderTotal}>${item.total.toFixed(2)}</Text>
                            </TouchableOpacity>
                        )}
                        ListEmptyComponent={<Text style={styles.emptyText}>No tienes pedidos recientes.</Text>}
                    />
                </View>
            </View>
        </Modal>
    );

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
                        <Text style={styles.headerTitle}>Nuevo Ticket</Text>
                        <Text style={styles.headerSubtitle}>Reportar un problema</Text>
                    </View>
                </View>
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.content}>

                {/* SELECCIÓN DE PEDIDO */}
                <Text style={styles.label}>Pedido Relacionado (Opcional)</Text>
                <TouchableOpacity
                    style={styles.selector}
                    onPress={() => setOrderModalVisible(true)}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="cube-outline" size={20} color={colors.primary} />
                        <Text style={[styles.selectorText, !selectedOrder && { color: colors.textLight }]}>
                            {selectedOrder ? `Pedido #${selectedOrder.code || selectedOrder.id}` : 'Seleccionar pedido...'}
                        </Text>
                    </View>
                    {selectedOrder ? (
                        <TouchableOpacity onPress={() => setSelectedOrder(null)}>
                            <Ionicons name="close-circle" size={20} color={colors.textLight} />
                        </TouchableOpacity>
                    ) : (
                        <Ionicons name="chevron-down" size={20} color={colors.textLight} />
                    )}
                </TouchableOpacity>

                {/* ASUNTO */}
                <Text style={styles.label}>Asunto</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ej. Producto dañado, Pedido incompleto..."
                    value={subject}
                    onChangeText={setSubject}
                />

                {/* DESCRIPCIÓN */}
                <Text style={styles.label}>Descripción Detallada</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Describe el problema con detalle..."
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                />

                {/* EVIDENCIA */}
                <Text style={styles.label}>Evidencia (Foto)</Text>
                <View style={styles.evidenceRow}>
                    <TouchableOpacity style={styles.evidenceButton} onPress={handleTakePhoto}>
                        <Ionicons name="camera" size={24} color={colors.primary} />
                        <Text style={styles.evidenceButtonText}>Cámara</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.evidenceButton} onPress={handlePickImage}>
                        <Ionicons name="images" size={24} color={colors.primary} />
                        <Text style={styles.evidenceButtonText}>Galería</Text>
                    </TouchableOpacity>
                </View>

                {evidence && (
                    <View style={styles.evidencePreview}>
                        <Image source={{ uri: evidence }} style={styles.previewImage} />
                        <TouchableOpacity
                            style={styles.removeEvidence}
                            onPress={() => setEvidence(null)}
                        >
                            <Ionicons name="close" size={16} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                )}

                <PrimaryButton
                    title="Enviar Reporte"
                    onPress={handleSubmit}
                    style={{ marginTop: 32 }}
                />

            </ScrollView>

            {renderOrderModal()}
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
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.textDark,
        marginBottom: 8,
        marginTop: 16,
    },
    input: {
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: 14,
        borderWidth: 1,
        borderColor: colors.borderSoft,
        fontSize: 15,
        color: colors.textDark,
    },
    textArea: {
        minHeight: 100,
    },
    selector: {
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: 14,
        borderWidth: 1,
        borderColor: colors.borderSoft,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectorText: {
        marginLeft: 10,
        fontSize: 15,
        color: colors.textDark,
    },
    evidenceRow: {
        flexDirection: 'row',
        gap: 12,
    },
    evidenceButton: {
        flex: 1,
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.primary,
        borderStyle: 'dashed',
    },
    evidenceButtonText: {
        color: colors.primary,
        fontWeight: '600',
        marginTop: 4,
    },
    evidencePreview: {
        marginTop: 16,
        width: 100,
        height: 100,
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
    removeEvidence: {
        position: 'absolute',
        top: 4,
        right: 4,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 10,
        padding: 4,
    },
    // Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalCard: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.textDark,
    },
    orderItem: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderSoft,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    orderCode: {
        fontWeight: '700',
        color: colors.textDark,
        fontSize: 15,
    },
    orderDate: {
        color: colors.textLight,
        fontSize: 13,
        marginTop: 2,
    },
    orderTotal: {
        fontWeight: '700',
        color: colors.primary,
        fontSize: 15,
    },
    emptyText: {
        textAlign: 'center',
        color: colors.textMuted,
        marginTop: 20,
    },
});

export default ClienteCrearTicketScreen;
