import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const SellerPromotionItem = ({ promo, onPress }) => {
  if (!promo) return null;
  const fallback = require('../../assets/images/login-header-meat.png');
  const imgSrc = promo && promo.image ? promo.image : fallback;
  const title = promo?.title || 'Promoción';
  const subtitle = promo?.subtitle || '';
  const badgeText = promo?.badgeText || '';
  const badgeColor = promo?.badgeColor || '#F55A3C';
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={imgSrc} style={styles.image} />
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.title}>{title}</Text>
          {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        {!!badgeText && (
          <View style={[styles.badge, { backgroundColor: badgeColor }]}>
            <Text style={styles.badgeText}>{badgeText}</Text>
          </View>
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Aplicar</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
    height: '100%',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
  badge: {
    position: 'absolute',
    top: -20,
    right: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#F55A3C',
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
});

export default SellerPromotionItem;
