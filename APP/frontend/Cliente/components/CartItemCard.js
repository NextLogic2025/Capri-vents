import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import globalStyles from '../../theme/styles';
import LogoCafrilosa from '../../assets/images/logo-cafrilosa.png';

const CartItemCard = ({ item, onIncrease, onDecrease, onRemove }) => {
  if (!item) return null;
  const { name, presentation, price, quantity = 1, stockActual, stockMax, image } = item;

  return (
    <View style={[styles.card, globalStyles.shadow]}>
      <Image source={image || LogoCafrilosa} defaultSource={LogoCafrilosa} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => onRemove?.(item)}
          style={styles.trashButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="trash-outline" size={20} color={colors.danger} />
        </TouchableOpacity>
        <Text style={styles.category}>Embutidos</Text>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.presentation}>{presentation}</Text>
        <Text style={styles.stock}>Stock: {stockActual}/{stockMax}</Text>
        <View style={styles.footerRow}>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
          <View style={styles.quantityWrapper}>
            <TouchableOpacity
              onPress={() => onDecrease?.(item)}
              disabled={quantity <= 1}
              style={[styles.qtyButton, quantity <= 1 && styles.qtyButtonDisabled]}
            >
              <Ionicons name="remove" size={18} color={quantity <= 1 ? colors.muted : colors.darkText} />
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={() => onIncrease?.(item)} style={styles.qtyButton}>
              <Ionicons name="add" size={18} color={colors.darkText} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 14,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 18,
    marginRight: 12,
  },
  content: {
    flex: 1,
    paddingRight: 6,
  },
  category: {
    fontSize: 12,
    color: colors.textLight,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.darkText,
  },
  presentation: {
    fontSize: 13,
    color: colors.textLight,
  },
  stock: {
    fontSize: 12,
    color: colors.danger,
    marginTop: 4,
    marginBottom: 6,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },
  trashButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    padding: 4,
    zIndex: 10,
  },
  quantityWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  qtyButton: {
    paddingHorizontal: 6,
  },
  qtyButtonDisabled: {
    opacity: 0.4,
  },
  quantity: {
    marginHorizontal: 8,
    fontWeight: '700',
    color: colors.darkText,
  },
});

export default CartItemCard;
