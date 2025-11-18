import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import globalStyles from '../../theme/styles';

const PrimaryButton = ({ title, onPress, disabled, style, textStyle }) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        globalStyles.primaryButton,
        disabled && globalStyles.primaryButtonDisabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      <Text style={[globalStyles.primaryButtonText, textStyle]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.8,
  },
});

export default PrimaryButton;
