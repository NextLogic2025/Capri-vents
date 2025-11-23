import React, { useMemo } from 'react';
import { View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../../context/AppContext';
import colors from '../../theme/colors';
import CartItemCard from '../components/CartItemCard';
import PrimaryButton from '../../components/PrimaryButton';
import EmptyState from '../../components/EmptyState';

const CarritoScreen = ({ navigation }) => {
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
          title="Continuar compra"
          disabled={cart.length === 0}
          onPress={() => {
            const parentNav = navigation.getParent?.();
            (parentNav || navigation).navigate('Checkout');
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
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      {/* Header con Gradiente */}
      <LinearGradient
        colors={[colors.primary, colors.primaryDark || '#8B0000']}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Carrito</Text>
            <Text style={styles.headerSubtitle}>Tus productos listos para comprar</Text>
          </View>
          <View style={styles.headerIcon}>
            <Ionicons name="cart" size={32} color={colors.white} />
          </View>
        </View>
      </LinearGradient>

      <FlatList
        data={cart}
        keyExtractor={(item) => (item.productId || item.id || Math.random().toString())}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListEmptyComponent={
          <EmptyState
            iconName="cart-outline"
            title="Tu carrito esta vacio"
            subtitle="Explora el catalogo y agrega productos."
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
  headerGradient: {
    paddingTop: 50,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    color: colors.white,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
    marginTop: 4,
  },
  headerIcon: {
    width: 56,
    height: 56,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
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

export default CarritoScreen;
