import React from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../theme/colors';

const { width } = Dimensions.get('window');

const DocumentSelectorModal = ({ visible, onClose, onSelectDocument }) => {
    const documents = [
        {
            id: 'terminos',
            title: 'Términos y Condiciones',
            description: 'Consulta los términos de uso de la plataforma',
            icon: 'document-text',
            color: '#FF6B6B',
            gradient: ['#FF6B6B', '#EE5A6F'],
        },
        {
            id: 'privacidad',
            title: 'Política de Privacidad',
            description: 'Conoce cómo protegemos tus datos',
            icon: 'shield-checkmark',
            color: '#4ECDC4',
            gradient: ['#4ECDC4', '#44A08D'],
        },
        {
            id: 'consentimiento',
            title: 'Consentimiento Informado',
            description: 'Información sobre el tratamiento de datos',
            icon: 'checkmark-circle',
            color: '#95E1D3',
            gradient: ['#95E1D3', '#38EF7D'],
        },
    ];

    const handleSelectDocument = (docId) => {
        onSelectDocument(docId);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.headerTitle}>Documentos Legales</Text>
                            <Text style={styles.headerSubtitle}>Selecciona un documento para ver</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={onClose}
                            activeOpacity={0.7}
                        >
                            <Ionicons name="close-circle" size={32} color={colors.textSecondary} />
                        </TouchableOpacity>
                    </View>

                    {/* Document Cards */}
                    <ScrollView
                        style={styles.scrollView}
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >
                        {documents.map((doc, index) => (
                            <TouchableOpacity
                                key={doc.id}
                                style={[styles.documentCard, index === documents.length - 1 && styles.lastCard]}
                                onPress={() => handleSelectDocument(doc.id)}
                                activeOpacity={0.8}
                            >
                                <LinearGradient
                                    colors={doc.gradient}
                                    style={styles.cardGradient}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <View style={styles.cardContent}>
                                        <View style={styles.iconContainer}>
                                            <Ionicons name={doc.icon} size={32} color={colors.white} />
                                        </View>
                                        <View style={styles.textContainer}>
                                            <Text style={styles.cardTitle}>{doc.title}</Text>
                                            <Text style={styles.cardDescription}>{doc.description}</Text>
                                        </View>
                                        <View style={styles.arrowContainer}>
                                            <Ionicons name="chevron-forward" size={24} color="rgba(255,255,255,0.8)" />
                                        </View>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={onClose}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        maxHeight: '85%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 24,
        paddingTop: 28,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderSoft,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: colors.darkText,
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 14,
        color: colors.textSecondary,
        fontWeight: '500',
    },
    closeButton: {
        padding: 4,
    },
    scrollView: {
        maxHeight: 450,
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 12,
    },
    documentCard: {
        marginBottom: 16,
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
    },
    lastCard: {
        marginBottom: 0,
    },
    cardGradient: {
        padding: 20,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 17,
        fontWeight: '800',
        color: colors.white,
        marginBottom: 4,
        letterSpacing: 0.3,
    },
    cardDescription: {
        fontSize: 13,
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: '500',
        lineHeight: 18,
    },
    arrowContainer: {
        marginLeft: 8,
    },
    footer: {
        paddingHorizontal: 24,
        paddingVertical: 20,
        borderTopWidth: 1,
        borderTopColor: colors.borderSoft,
    },
    cancelButton: {
        backgroundColor: colors.background,
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.textSecondary,
    },
});

export default DocumentSelectorModal;
