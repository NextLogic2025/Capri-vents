import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import UiButton from './UiButton';

const UiProductCard = ({
  image,
  category,
  title,
  price,
  stockLabel,
  action, // { type:'primary'|'link', label, onPress }
  onPressImage,
  style,
}) => {
  return (
    <View style={[styles.card, style]}>
      <TouchableOpacity onPress={onPressImage} activeOpacity={0.85}>
        <Image source={image} style={styles.thumb} />
      </TouchableOpacity>
      <View style={styles.content}>
        {!!category && <Text style={styles.category}>{category}</Text>}
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <View style={styles.rowBetween}>
          <Text style={styles.price}>{price}</Text>
          {!!stockLabel && <Text style={styles.stock}>{stockLabel}</Text>}
        </View>
        {action?.type === 'primary' ? (
          <UiButton title={action.label} onPress={action.onPress} style={{ marginTop: 10, height: 40, borderRadius: 20 }} />
        ) : action?.type === 'link' ? (
          <TouchableOpacity onPress={action.onPress} accessibilityRole="button" style={{ marginTop: 10 }}>
            <Text style={styles.link}>{action.label}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      {/* TODO: conectar con backend aquí para catálogo y stock */}
    </View>
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
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 },
  price: { fontSize: 16, fontWeight: '800', color: '#F55A3C' },
  stock: { fontSize: 12, color: '#6B7280' },
  link: { color: '#F55A3C', fontWeight: '700', textDecorationLine: 'underline' },
});

export default UiProductCard;
