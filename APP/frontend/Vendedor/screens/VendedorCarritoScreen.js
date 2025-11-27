import React, { useMemo } from 'react';
import { View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../../context/AppContext';
import colors from '../../theme/colors';
import CartItemCard from '../../Cliente/components/CartItemCard';
import PrimaryButton from '../../components/PrimaryButton';
import EmptyState from '../../components/EmptyState';
import ScreenHeader from '../../components/ScreenHeader';

const VendedorCarritoScreen = ({ navigation }) => {
    const { cart, cartTotals, updateCartQuantity, removeFromCart } = useAppContext();

    const totalItems = useMemo(
        () => cart.reduce((sum, item) => sum + (item.quantity || 0), 0),
        [cart]
    );

    const renderItem = ({ item }) => (
        <CartItemCard
            item={item}
            onIncrease={() => updateCartQuantity(item.productId || item.id, (item.quantity || 0) + 1)}
            onDecrease={() => {
                const nextValue = (item.quantity || 0) - 1;
                if (nextValue <= 0) {
                    removeFromCart(item.productId || item.id);
                    return;
                }
                updateCartQuantity(item.productId || item.id, nextValue);
            }}
            onRemove={() => removeFromCart(item.productId || item.id)}
        />
    );

    const Summary = () => (
        <View style={styles.summaryWrapper}>
            <View style={styles.summaryCard}>
                <View style={styles.summaryRow}>
                    <FlatText text={`Subtotal (${totalItems} items)`} />
                    <FlatText text={`$${cartTotals.subtotal.toFixed(2)}`} bold />
                </View>
                <View style={styles.summaryRow}>
                    <FlatText text="Impuestos (12%)" />
                    <FlatText text={`$${cartTotals.taxes.toFixed(2)}`} bold success />
                </View>
                <View style={[styles.summaryRow, styles.totalRow]}>
                    <FlatText text="Total" bold large />
                    <FlatText text={`$${cartTotals.total.toFixed(2)}`} bold large primary />
                </View>
                <PrimaryButton
                    title="Continuar al Checkout"
                    disabled={cart.length === 0}
                    onPress={() => {
                        navigation.navigate('VendedorCheckout');
                    }}
                />
            </View>
        </View>
    );

    const listContentStyle = [
        styles.listContent,
        { paddingBottom: cart.length > 0 ? 200 : 80 },
    ];

    return (
        <View style={styles.screen}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            <ScreenHeader title="Carrito de Pedido" subtitle="Productos seleccionados" showBack />

            <FlatList
                data={cart}
                keyExtractor={(item) => (item.productId || item.id || Math.random().toString())}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                ListEmptyComponent={
                    <EmptyState
                        iconName="cart-outline"
                        title="El carrito está vacío"
                        subtitle="Agrega productos del catálogo para crear un pedido."
                    />
                }
                contentContainerStyle={listContentStyle}
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
            />
            {cart.length > 0 && <Summary />}
        </View>
    );
};

const FlatText = ({ text, bold, large, primary, success }) => (
    <Text
        style={{
            fontWeight: bold ? '700' : '500',
            color: primary ? colors.primary : success ? colors.success : colors.bodyText,
            fontSize: large ? 18 : 14,
        }}
    >
        {text}
    </Text>
);

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background,
    },
    summaryWrapper: {
        paddingHorizontal: 16,
        paddingBottom: 24,
        backgroundColor: colors.background,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 24,
    },
    summaryCard: {
        backgroundColor: colors.white,
        borderRadius: 28,
        padding: 20,
        marginTop: 12,
        borderWidth: 1,
        borderColor: colors.border,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    totalRow: {
        marginTop: 8,
        marginBottom: 16,
    },
});

export default VendedorCarritoScreen;
