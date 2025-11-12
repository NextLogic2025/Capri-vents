import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UiHighlightCard = ({
  image,
  title,
  subtitle,
  buttonIcon = 'bag-outline',
  onPressButton,
  gradientOverlay = 'rgba(0,0,0,0.35)',
  containerStyle,
}) => {
  return (
    <View style={[styles.wrapper, containerStyle]}>
      <ImageBackground source={image} style={styles.card} imageStyle={styles.image}>
        <View style={[styles.overlay, { backgroundColor: gradientOverlay }]} />
        <View style={styles.content}>
          {title ? <Text style={styles.title}>{title}</Text> : null}
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {onPressButton && (
          <TouchableOpacity style={styles.fab} onPress={onPressButton} activeOpacity={0.9}>
            <Ionicons name={buttonIcon} size={22} color="#E64A19" />
          </TouchableOpacity>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { paddingHorizontal: 24, marginTop: 12 },
  card: {
    height: 150,
    borderRadius: 24,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  image: { borderRadius: 24 },
  overlay: { ...StyleSheet.absoluteFillObject },
  content: { padding: 16 },
  title: { color: '#FFFFFF', fontSize: 16, fontWeight: '800', marginBottom: 4 },
  subtitle: { color: '#F8FAFC', fontSize: 13 },
  fab: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E64A19',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
});

export default UiHighlightCard;
