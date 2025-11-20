// frontend/components/ToastMessage.js
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';

const TYPE_STYLES = {
  success: {
    icon: 'checkmark-circle',
    bg: '#1E9E63',
  },
  info: {
    icon: 'information-circle',
    bg: '#2563EB',
  },
  error: {
    icon: 'close-circle',
    bg: '#DC2626',
  },
};

const ToastMessage = ({
  visible,
  message,
  type = 'success',
  icon,
  duration = 2000,
  onHide,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (!visible) return;

    // animación de entrada
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      // animación de salida
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 20,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onHide && onHide();
      });
    }, duration);

    return () => clearTimeout(timer);
  }, [visible, duration, onHide, opacity, translateY]);

  if (!visible) return null;

  const typeConfig = TYPE_STYLES[type] || TYPE_STYLES.success;
  const usedIcon = icon || typeConfig.icon;

  return (
    <View pointerEvents="none" style={styles.wrapper}>
      <Animated.View
        style={[
          styles.toast,
          { backgroundColor: typeConfig.bg },
          { opacity, transform: [{ translateY }] },
        ]}
      >
        <Ionicons name={usedIcon} size={20} color={colors.white} style={{ marginRight: 8 }} />
        <Text style={styles.message} numberOfLines={2}>
          {message}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 90, // queda sobre la tab bar
    alignItems: 'center',
    zIndex: 50,
  },
  toast: {
    maxWidth: '90%',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  message: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '600',
  },
});

export default ToastMessage;
