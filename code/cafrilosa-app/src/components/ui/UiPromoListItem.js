import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import UiBadge from './UiBadge';

const UiPromoListItem = ({
  image,
  title,
  subtitle,
  badgeText,
  badgeVariant = 'info',
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <ImageBackground source={image} style={styles.card} imageStyle={styles.image}>
        <View style={styles.overlay} />
        {badgeText && (
          <UiBadge
            label={badgeText}
            variant={badgeVariant}
            style={styles.badge}
          />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 16,
  },
  image: {
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  badge: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  textContainer: {
    alignSelf: 'flex-start',
    position: 'absolute',
    bottom: 16,
    left: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default UiPromoListItem;
