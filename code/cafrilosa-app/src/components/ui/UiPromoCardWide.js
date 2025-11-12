import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import UiBadge from './UiBadge';

const UiPromoCardWide = ({ image, title, subtitle, price, badge, onPress, onPressDetails, style }) => {
  const handlePress = onPressDetails || onPress;
  return (
    <TouchableOpacity style={[styles.card, style]} activeOpacity={0.9} onPress={handlePress} accessibilityRole="button" accessibilityLabel={title}>
      <View style={styles.thumbWrap}>
        <Image source={image} style={styles.thumb} />
        {badge?.text && (
          <View style={styles.badgeOverlay}>
            <UiBadge label={badge.text} variant={badge.type === 'percent' ? 'percent' : 'deal'} />
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        {!!price && <Text style={styles.price}>{price}</Text>}
        <Text style={styles.link}>Ver más detalles</Text>
      </View>
      {/* TODO: conectar con backend aquí para promos y navegación a detalle */}
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
  thumbWrap: { position: 'relative' },
  thumb: { width: 72, height: 72, borderRadius: 12, resizeMode: 'cover' },
  badgeOverlay: { position: 'absolute', left: 4, top: 4 },
  content: { flex: 1, marginLeft: 12 },
  title: { fontSize: 16, fontWeight: '700', color: '#1B1B1B' },
  subtitle: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  price: { fontSize: 16, fontWeight: '800', color: '#E64A2E', marginTop: 6 },
  link: { color: '#E64A2E', fontWeight: '700', textDecorationLine: 'underline', marginTop: 8 },
});

export default UiPromoCardWide;
