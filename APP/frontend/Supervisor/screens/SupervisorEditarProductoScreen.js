import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
    Alert,
    StatusBar,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../theme/colors';
import ScreenHeader from '../../components/ScreenHeader';

const PRODUCT_TYPES = [
    'Embutidos',
    'Carnes Frías',
    'Quesos',
    'Ahumados',
    'Especiales',
    'Otros',
];

const SupervisorEditarProductoScreen = ({ route, navigation }) => {
    const { product } = route.params;

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        presentation: '',
        stockActual: '',
        price: '',
        description: '',
        image: null,
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                category: product.category || '',
                presentation: product.presentation || '',
                stockActual: product.stockActual?.toString() || '',
                price: product.price?.toString() || '',
                description: product.description || '',
                image: product.image?.uri || product.image || null,
            });
        }
    }, [product]);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permisos requeridos', 'Se necesitan permisos para acceder a la galería.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            setFormData(prev => ({ ...prev, image: result.assets[0].uri }));
        }
    };

    const takePicture = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permisos requeridos', 'Se necesitan permisos para acceder a la cámara.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            setFormData(prev => ({ ...prev, image: result.assets[0].uri }));
        }
    };

    const handleSave = () => {
        // Validaciones básicas
        if (!formData.name.trim()) {
            Alert.alert('Error', 'El nombre es obligatorio');
            return;
        }
        if (!formData.price || isNaN(parseFloat(formData.price))) {
            Alert.alert('Error', 'El precio debe ser un número válido');
            return;
        }

        // Simulación de guardado
        Alert.alert(
            'Producto Actualizado',
            'La información del producto ha sido actualizada correctamente.',
            [
                {
                    text: 'OK',
                    onPress: () => navigation.goBack(),
                },
            ]
        );
    };

    return (
        <View style={styles.screen}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <ScreenHeader title="Editar Producto" subtitle="Modificar detalles" showBack />

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                {/* Sección de Imagen */}
                <View style={styles.imageSection}>
                    <View style={styles.imageContainer}>
                        {formData.image ? (
                            <Image source={{ uri: formData.image }} style={styles.productImage} />
                        ) : (
                            <View style={styles.placeholderImage}>
                                <Ionicons name="image-outline" size={40} color={colors.textLight} />
                            </View>
                        )}
                        <TouchableOpacity
                            style={styles.cameraButton}
                            onPress={() => {
                                Alert.alert('Cambiar Imagen', 'Seleccione una opción', [
                                    { text: 'Galería', onPress: pickImage },
                                    { text: 'Cámara', onPress: takePicture },
                                    { text: 'Cancelar', style: 'cancel' },
                                ]);
                            }}
                        >
                            <Ionicons name="camera" size={20} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.imageHint}>Toque el icono de cámara para cambiar la imagen</Text>
                </View>

                {/* Formulario */}
                <View style={styles.formCard}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Nombre del Producto</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.name}
                            onChangeText={(text) => setFormData({ ...formData, name: text })}
                            placeholder="Ej: Jamón de Pierna"
                        />
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                            <Text style={styles.label}>Precio ($)</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.price}
                                onChangeText={(text) => setFormData({ ...formData, price: text })}
                                keyboardType="decimal-pad"
                                placeholder="0.00"
                            />
                        </View>
                        <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                            <Text style={styles.label}>Stock Actual</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.stockActual}
                                onChangeText={(text) => setFormData({ ...formData, stockActual: text })}
                                keyboardType="number-pad"
                                placeholder="0"
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Categoría</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
                            {PRODUCT_TYPES.map((type) => (
                                <TouchableOpacity
                                    key={type}
                                    style={[
                                        styles.categoryChip,
                                        formData.category === type && styles.categoryChipActive
                                    ]}
                                    onPress={() => setFormData({ ...formData, category: type })}
                                >
                                    <Text style={[
                                        styles.categoryText,
                                        formData.category === type && styles.categoryTextActive
                                    ]}>
                                        {type}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Presentación / Peso</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.presentation}
                            onChangeText={(text) => setFormData({ ...formData, presentation: text })}
                            placeholder="Ej: 500g"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Descripción</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            value={formData.description}
                            onChangeText={(text) => setFormData({ ...formData, description: text })}
                            placeholder="Descripción detallada del producto..."
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <LinearGradient
                        colors={[colors.primary, colors.primaryDark || '#8B0000']}
                        style={styles.gradientButton}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Ionicons name="save-outline" size={20} color={colors.white} />
                        <Text style={styles.saveButtonText}>Guardar Cambios</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        padding: 20,
        paddingBottom: 40,
    },
    imageSection: {
        alignItems: 'center',
        marginBottom: 24,
    },
    imageContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: colors.white,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        position: 'relative',
    },
    productImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    placeholderImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: colors.primary,
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: colors.white,
    },
    imageHint: {
        marginTop: 12,
        fontSize: 12,
        color: colors.textLight,
    },
    formCard: {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        marginBottom: 24,
    },
    inputGroup: {
        marginBottom: 16,
    },
    row: {
        flexDirection: 'row',
    },
    label: {
        fontSize: 13,
        fontWeight: '700',
        color: colors.textDark,
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: colors.borderSoft,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 15,
        color: colors.textDark,
    },
    textArea: {
        minHeight: 100,
    },
    categoryScroll: {
        flexDirection: 'row',
    },
    categoryChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        marginRight: 8,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    categoryChipActive: {
        backgroundColor: '#FFEBEE',
        borderColor: colors.primary,
    },
    categoryText: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.textLight,
    },
    categoryTextActive: {
        color: colors.primary,
    },
    saveButton: {
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    gradientButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        gap: 8,
    },
    saveButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
});

export default SupervisorEditarProductoScreen;
