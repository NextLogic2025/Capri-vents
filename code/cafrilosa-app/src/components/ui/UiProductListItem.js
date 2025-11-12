import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import UiButton from './UiButton';

const UiProductListItem = ({
  image,
  name,
  code,
  category,
  price,
  stockText,
  stockColor = '#4CAF50',
  onAdd,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <Image source={image} style={styles.image} />
      <View style={styles.infoWrapper}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.name} numberOfLines={2}>{name}</Text>
        <Text style={styles.code}>{code}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
          {stockText && (
            <Text style={[styles.stock, { color: stockColor }]}>{stockText}</Text>
          )}
        </View>
      </View>
      {onAdd && (
        <UiButton
          title="Agregar"
          onPress={onAdd}
          size="sm"
          style={styles.addButton}
          leftIcon="add-circle-outline"
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginRight: 12,
  },
  infoWrapper: {
    flex: 1,
  },
  category: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  code: {
    fontSize: 12,
    color: '#9CA3AF',
    marginVertical: 2,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F55A3C',
  },
  stock: {
    fontSize: 12,
    fontWeight: '500',
  },
  addButton: {
    marginLeft: 12,
  },
});

export default UiProductListItem;
