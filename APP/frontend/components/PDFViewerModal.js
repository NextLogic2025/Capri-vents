import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Platform,
    Dimensions,
    ScrollView,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';

const { height, width } = Dimensions.get('window');

const PDFViewerModal = ({ visible, onClose, pdfType }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Configuración de PDFs - URLs de Google Drive
    const pdfConfig = {
        terminos: {
            title: 'Términos y Condiciones',
            fileId: '1ecsKs5JjrvYvQ-FTiPpGad0tdvo1Ttt7',
        },
        privacidad: {
            title: 'Política de Privacidad',
            fileId: '1ky9rylpxSRapJYO_xPN8vlWfz4GEY1ua',
        },
        consentimiento: {
            title: 'Consentimiento Informado',
            fileId: '1zCe3kAWLLgGHif8vcjDGqyQWVMLjtnMx',
        },
    };

    const currentPDF = pdfConfig[pdfType];

    if (!currentPDF) {
        return null;
    }

    const handleLoadStart = () => {
        setLoading(true);
        setError(false);
    };

    const handleLoadEnd = () => {
        setLoading(false);
    };

    const handleError = (syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.error('Error loading PDF:', nativeEvent);
        setLoading(false);
        setError(true);
    };

    const handleClose = () => {
        setLoading(true);
        setError(false);
        onClose();
    };

    // Generar URL optimizada para visualización de PDF
    const getViewerUrl = () => {
        const fileId = currentPDF.fileId;

        if (Platform.OS === 'web') {
            // Para web, usar el visor embebido de Google Drive
            return `https://drive.google.com/file/d/${fileId}/preview`;
        } else {
            // Para móvil, usar Google Docs Viewer con URL de descarga directa
            const directUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
            return `https://docs.google.com/viewer?embedded=true&url=${encodeURIComponent(directUrl)}`;
        }
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={handleClose}
            statusBarTranslucent
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    {/* Header mejorado */}
                    <View style={styles.header}>
                        <View style={styles.headerContent}>
                            <Ionicons name="document-text" size={24} color={colors.white} style={styles.headerIcon} />
                            <Text style={styles.headerTitle} numberOfLines={1}>
                                {currentPDF.title}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={handleClose}
                            activeOpacity={0.7}
                        >
                            <Ionicons name="close-circle" size={32} color={colors.white} />
                        </TouchableOpacity>
                    </View>

                    {/* PDF Content */}
                    <View style={styles.contentContainer}>
                        {error ? (
                            <ScrollView
                                contentContainerStyle={styles.errorContainer}
                                showsVerticalScrollIndicator={false}
                            >
                                <View style={styles.errorIconContainer}>
                                    <Ionicons name="alert-circle" size={80} color={colors.danger} />
                                </View>
                                <Text style={styles.errorTitle}>No se pudo cargar el documento</Text>
                                <Text style={styles.errorText}>
                                    Verifica que el archivo esté compartido públicamente en Google Drive.
                                </Text>
                                <Text style={styles.errorSubtext}>
                                    Asegúrate de que el enlace tenga permisos de "Cualquier persona con el enlace puede ver".
                                </Text>

                                <TouchableOpacity
                                    style={styles.retryButton}
                                    onPress={() => {
                                        setError(false);
                                        setLoading(true);
                                    }}
                                    activeOpacity={0.8}
                                >
                                    <Ionicons name="refresh" size={20} color={colors.white} style={styles.buttonIcon} />
                                    <Text style={styles.retryButtonText}>Reintentar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.closeButtonSecondary}
                                    onPress={handleClose}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.closeButtonSecondaryText}>Cerrar</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        ) : (
                            <>
                                {loading && (
                                    <View style={styles.loadingContainer}>
                                        <View style={styles.loadingContent}>
                                            <ActivityIndicator size="large" color={colors.primary} />
                                            <Text style={styles.loadingText}>Cargando documento...</Text>
                                            <Text style={styles.loadingSubtext}>Por favor espera</Text>
                                        </View>
                                    </View>
                                )}
                                <WebView
                                    source={{ uri: getViewerUrl() }}
                                    style={styles.webview}
                                    onLoadStart={handleLoadStart}
                                    onLoadEnd={handleLoadEnd}
                                    onError={handleError}
                                    startInLoadingState={false}
                                    javaScriptEnabled={true}
                                    domStorageEnabled={true}
                                    scalesPageToFit={true}
                                    originWhitelist={['*']}
                                    allowFileAccess={true}
                                    allowUniversalAccessFromFileURLs={true}
                                    mixedContentMode="always"
                                />
                            </>
                        )}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        height: height * 0.96,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 20,
    },
    header: {
        backgroundColor: colors.primary,
        paddingVertical: 18,
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 8,
    },
    headerContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIcon: {
        marginRight: 12,
    },
    headerTitle: {
        fontSize: 19,
        fontWeight: '800',
        color: colors.white,
        flex: 1,
        letterSpacing: 0.3,
    },
    closeButton: {
        padding: 4,
        marginLeft: 12,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    webview: {
        flex: 1,
        backgroundColor: colors.white,
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        zIndex: 10,
    },
    loadingContent: {
        alignItems: 'center',
        padding: 32,
    },
    loadingText: {
        marginTop: 20,
        fontSize: 18,
        color: colors.darkText,
        fontWeight: '700',
    },
    loadingSubtext: {
        marginTop: 8,
        fontSize: 14,
        color: colors.textSecondary,
        fontWeight: '500',
    },
    errorContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    errorIconContainer: {
        marginBottom: 24,
        padding: 20,
        backgroundColor: '#FFE5E5',
        borderRadius: 100,
    },
    errorTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: colors.darkText,
        marginBottom: 12,
        textAlign: 'center',
    },
    errorText: {
        fontSize: 15,
        color: colors.textSecondary,
        textAlign: 'center',
        marginBottom: 12,
        lineHeight: 22,
        paddingHorizontal: 16,
    },
    errorSubtext: {
        fontSize: 13,
        color: colors.textMuted,
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 20,
        paddingHorizontal: 16,
        fontStyle: 'italic',
    },
    retryButton: {
        backgroundColor: colors.primary,
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 16,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    buttonIcon: {
        marginRight: 8,
    },
    retryButtonText: {
        color: colors.white,
        fontSize: 17,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    closeButtonSecondary: {
        paddingVertical: 14,
        paddingHorizontal: 32,
    },
    closeButtonSecondaryText: {
        color: colors.textSecondary,
        fontSize: 16,
        fontWeight: '700',
    },
});

export default PDFViewerModal;
