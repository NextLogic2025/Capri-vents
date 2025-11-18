import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';

const PaymentMethodCard = ({ label, description, icon = 'card-outline', selected, disabled, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.card,
        selected && styles.cardSelected,
        disabled && styles.cardDisabled,
        pressed && !disabled && { opacity: 0.85 },
      ]}
    >
      <View style={styles.iconWrapper}>
        <Ionicons name={icon} size={22} color={selected ? colors.primary : colors.textLight} />
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>{label}</Text>
        {description ? <Text style={styles.description}>{description}</Text> : null}
      </View>
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected ? <View style={styles.radioInner} /> : null}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderSoft,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: '#FFF5F2',
  },
  cardDisabled: {
    opacity: 0.5,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
  },
  description: {
    fontSize: 13,
    color: colors.textLight,
    marginTop: 2,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
});

export default PaymentMethodCard;
