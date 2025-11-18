import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import globalStyles from '../../theme/styles';
import { useAppContext } from '../../context/AppContext';
import LogoCafrilosa from '../../assets/images/logo-cafrilosa.png';

const ProductCard = ({ product, onAddToCart, onPress }) => {
  const { addToCart } = useAppContext();
  const { id, name, presentation, price, stockActual = 0, stockMax = 0, image } = product;

  const isSoldOut = stockActual === 0;

  const handleAdd = () => {
    if (isSoldOut) return;
    addToCart(product);
    onAddToCart && onAddToCart(product);
  };

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={() => onPress && onPress(product)}>
      <Image
        source={image || LogoCafrilosa}
        defaultSource={LogoCafrilosa}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
        <Text style={styles.presentation}>{presentation}</Text>
        <Text style={styles.stock}>Stock: {stockActual}/{stockMax}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
          <TouchableOpacity
            style={[styles.cartButton, isSoldOut && styles.cartButtonDisabled]}
            disabled={isSoldOut}
            onPress={handleAdd}
          >
            <Ionicons
              name="cart-outline"
              size={18}
              color={isSoldOut ? colors.muted : colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#F2C3BC',
    marginBottom: 16,
    overflow: 'hidden',
    ...globalStyles.shadow,
  },
  image: {
    width: '100%',
    height: 120,
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.darkText,
    minHeight: 38,
  },
  presentation: {
    fontSize: 13,
    color: colors.textLight,
    marginTop: 2,
  },
  stock: {
    fontSize: 12,
    color: colors.danger,
    marginTop: 6,
  },
  footer: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  cartButton: {
    width: 42,
    height: 42,
    borderRadius: 16,
    backgroundColor: '#FFF4F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartButtonDisabled: {
    backgroundColor: colors.borderSoft,
  },
});

export default ProductCard;
