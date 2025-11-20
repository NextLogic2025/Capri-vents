// frontend/components/GlobalToast.js
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';

const GlobalToast = ({ visible, message }) => {
  const translateY = useRef(new Animated.Value(80)).current; // entra desde abajo
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 80,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, translateY, opacity]);

  if (!visible && opacity.__getValue() === 0) {
    return null;
  }

  return (
    <View pointerEvents="none" style={styles.overlay}>
      <Animated.View
        style={[
          styles.toastContainer,
          {
            opacity,
            transform: [{ translateY }],
          },
        ]}
      >
        <View style={styles.iconWrapper}>
          <Ionicons name="checkmark" size={20} color={colors.white} />
        </View>
        <Text style={styles.toastText} numberOfLines={2}>
          {message}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    // IMPORTANTE: abajo cerca del Tab Navigation
    bottom: 90, // si la quieres aún más pegada al tab, baja a 70–80
    alignItems: 'center',
    zIndex: 999,
    elevation: 999,
  },
  toastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1BAA5A',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    maxWidth: '92%',
  },
  iconWrapper: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  toastText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default GlobalToast;
