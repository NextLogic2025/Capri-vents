import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import colors from '../../theme/colors';
import LogoCafrilosa from '../../assets/images/logo-cafrilosa.png';

const VendedorProductDetailScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { product } = route.params || {};

    if (!product) {
        return (
            <View style={styles.empty}>
                <Text>No encontramos este producto.</Text>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color={colors.darkText} />
            </TouchableOpacity>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                <Image
                    source={product.image || LogoCafrilosa}
                    defaultSource={LogoCafrilosa}
                    style={styles.image}
                    resizeMode="cover"
                />
                <View style={styles.content}>
                    <View style={styles.headerRow}>
                        <View style={styles.categoryBadge}>
                            <Text style={styles.categoryText}>{product.category}</Text>
                        </View>
                        <Text style={styles.stock}>Stock: {product.stockActual}/{product.stockMax}</Text>
                    </View>

                    <Text style={styles.name}>{product.name}</Text>
                    <Text style={styles.price}>${product.price.toFixed(2)} <Text style={styles.presentation}>/ {product.presentation}</Text></Text>

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>Descripción</Text>
                    <Text style={styles.description}>{product.description || 'Producto de calidad garantizada Cafrilosa. Ideal para su negocio.'}</Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background,
    },
    image: {
        width: '100%',
        height: 350,
    },
    content: {
        padding: 24,
        flex: 1,
        backgroundColor: colors.background,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        marginTop: -32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 10,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    categoryBadge: {
        backgroundColor: colors.primary + '15', // 15% opacity
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    categoryText: {
        color: colors.primary,
        fontWeight: '700',
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    name: {
        fontSize: 28,
        fontWeight: '800',
        color: colors.darkText,
        marginBottom: 8,
        letterSpacing: -0.5,
    },
    stock: {
        fontSize: 14,
        color: colors.textLight,
        fontWeight: '500',
    },
    price: {
        fontSize: 32,
        fontWeight: '800',
        color: colors.primary,
        marginVertical: 8,
    },
    presentation: {
        fontSize: 16,
        color: colors.textLight,
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: colors.borderSoft,
        marginVertical: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.darkText,
        marginBottom: 12,
    },
    description: {
        color: colors.textSecondary,
        lineHeight: 26,
        fontSize: 16,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
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
    empty: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default VendedorProductDetailScreen;
