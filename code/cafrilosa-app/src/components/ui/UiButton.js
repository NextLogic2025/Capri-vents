import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UiButton = ({
  title,
  onPress,
  variant = 'primary', // 'primary', 'secondary', 'ghost'
  size = 'md', // 'sm', 'md', 'lg'
  isFullWidth = false,
  rounded = false,
  disabled = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
}) => {
  const buttonStyles = [
    styles.button,
    styles[`variant_${variant}`],
    styles[`size_${size}`],
    isFullWidth && styles.fullWidth,
    rounded && styles.rounded,
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`text_variant_${variant}`],
    styles[`text_size_${size}`],
    textStyle,
  ];

  const iconColor = styles[`text_variant_${variant}`]?.color || '#FFFFFF';

  return (
    <TouchableOpacity
      style={buttonStyles}
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
    >
      {leftIcon && <Ionicons name={leftIcon} size={styles[`icon_size_${size}`]?.fontSize} color={iconColor} style={styles.icon} />}
      <Text style={textStyles}>{title}</Text>
      {rightIcon && <Ionicons name={rightIcon} size={styles[`icon_size_${size}`]?.fontSize} color={iconColor} style={styles.icon} />}
    </TouchableOpacity>
  );
};

const COLORS = {
  primary: '#F55A3C',
  secondary: '#FFFFFF',
  ghost: 'transparent',
  white: '#FFFFFF',
  dark: '#0F172A',
  gray: '#6B7280',
  lightGray: '#E0E0E0',
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  fullWidth: {
    width: '100%',
  },
  rounded: {
    borderRadius: 999,
  },
  disabled: {
    opacity: 0.6,
  },
  icon: {
    marginHorizontal: 8,
  },
  // Variants
  variant_primary: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  variant_secondary: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.lightGray,
  },
  variant_ghost: {
    backgroundColor: COLORS.ghost,
    borderColor: COLORS.ghost,
  },
  // Sizes
  size_sm: {
    height: 36,
    paddingHorizontal: 14,
  },
  size_md: {
    height: 48,
    paddingHorizontal: 20,
  },
  size_lg: {
    height: 56,
    paddingHorizontal: 24,
  },
  // Text
  text: {
    fontWeight: '600',
  },
  // Text Variants
  text_variant_primary: {
    color: COLORS.white,
  },
  text_variant_secondary: {
    color: COLORS.dark,
  },
  text_variant_ghost: {
    color: COLORS.primary,
  },
  // Text Sizes
  text_size_sm: {
    fontSize: 14,
  },
  text_size_md: {
    fontSize: 16,
  },
  text_size_lg: {
    fontSize: 18,
  },
  // Icon Sizes
  icon_size_sm: {
    fontSize: 16,
  },
  icon_size_md: {
    fontSize: 20,
  },
  icon_size_lg: {
    fontSize: 22,
  },
});

export default UiButton;
