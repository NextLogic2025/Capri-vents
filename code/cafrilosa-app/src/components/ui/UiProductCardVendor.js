import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const UiProductCardVendor = ({ image, category, title, price, stockLabel, onPressDetails, onPress, style }) => {
  const handlePress = onPressDetails || onPress;
  return (
    <TouchableOpacity
      style={[styles.card, style]}
      activeOpacity={0.9}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={`${title}. Ver más detalles`}
    >
      <Image source={image} style={styles.thumb} />
      <View style={styles.content}>
        {!!category && <Text style={styles.category} numberOfLines={1}>{category}</Text>}
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <Text style={styles.price} numberOfLines={1}>{price}</Text>
        {!!stockLabel && <Text style={styles.stock} numberOfLines={1}>{stockLabel}</Text>}
        <Text style={styles.link}>Ver más detalles</Text>
      </View>
      {/* TODO: conectar con backend aquí para catálogo del vendedor y navegación a detalle */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  thumb: { width: 72, height: 72, borderRadius: 12, resizeMode: 'cover' },
  content: { flex: 1, marginLeft: 12 },
  category: { fontSize: 12, color: '#6B7280' },
  title: { fontSize: 16, fontWeight: '700', color: '#1B1B1B', marginTop: 2 },
  price: { fontSize: 16, fontWeight: '800', color: '#E64A2E', marginTop: 6 },
  stock: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  link: { color: '#E64A2E', fontWeight: '700', textDecorationLine: 'underline', marginTop: 8 },
});

export default UiProductCardVendor;
