import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import UiBadge from './UiBadge';

const UiPromoCard = ({ image, title, subtitle, badgeText, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.card, style]} activeOpacity={0.9} onPress={onPress} accessibilityRole="button" accessibilityLabel={title}>
      <Image source={image} style={styles.thumb} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        {!!badgeText && (
          <View style={styles.badgeWrap}>
            <UiBadge label={badgeText} color="warning" />
          </View>
        )}
      </View>
      {/* TODO: conectar con backend aquí para promociones vigentes */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7E8',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#FFE0B2',
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  thumb: { width: 48, height: 48, borderRadius: 12, marginRight: 12, resizeMode: 'cover' },
  content: { flex: 1 },
  title: { fontSize: 16, fontWeight: '700', color: '#1B1B1B' },
  subtitle: { fontSize: 12, color: '#6B7280', marginTop: 4 },
  badgeWrap: { marginTop: 8 },
});

export default UiPromoCard;
