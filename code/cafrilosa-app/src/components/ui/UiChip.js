import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UiChip = ({
  label,
  onPress,
  isSelected = false,
  leftIcon,
  style,
}) => {
  const chipStyles = [
    styles.chip,
    isSelected ? styles.chipSelected : styles.chipDefault,
    style,
  ];
  const textStyles = [
    styles.text,
    isSelected ? styles.textSelected : styles.textDefault,
  ];
  const iconColor = isSelected ? '#FFFFFF' : '#4B5563';

  return (
    <TouchableOpacity style={chipStyles} onPress={onPress} activeOpacity={0.8}>
      {leftIcon && <Ionicons name={leftIcon} size={16} color={iconColor} style={styles.icon} />}
      <Text style={textStyles}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  chipDefault: {
    backgroundColor: '#F3F4F6',
    borderColor: '#E5E7EB',
  },
  chipSelected: {
    backgroundColor: '#F55A3C',
    borderColor: '#F55A3C',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
  textDefault: {
    color: '#4B5563',
  },
  textSelected: {
    color: '#FFFFFF',
  },
  icon: {
    marginRight: 6,
  },
});

export default UiChip;
