import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const CheckboxField = ({ checked, onToggle, label, labelStyle, style }) => {
  const renderLabel = () => {
    if (typeof label === 'string') {
      return <Text style={[styles.label, labelStyle]}>{label}</Text>;
    }

    return <View style={styles.customLabel}>{label}</View>;
  };

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onToggle} activeOpacity={0.8}>
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked ? <View style={styles.checkboxInner} /> : null}
      </View>
      {renderLabel()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#9CA3AF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#E64A19',
    borderColor: '#E64A19',
  },
  checkboxInner: {
    width: 8,
    height: 8,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
  },
  label: {
    fontSize: 14,
    color: '#4B5563',
  },
  customLabel: {
    flex: 1,
  },
});

export default CheckboxField;

