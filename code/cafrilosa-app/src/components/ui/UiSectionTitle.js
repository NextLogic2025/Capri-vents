import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const UiSectionTitle = ({ title, rightLabel, onPressRight, style, rightStyle }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      {rightLabel ? (
        <TouchableOpacity onPress={onPressRight} accessibilityRole="button" accessibilityLabel={rightLabel}>
          <Text style={[styles.rightLabel, rightStyle]}>{rightLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1B1B1B',
  },
  rightLabel: {
    fontSize: 14,
    color: '#F55A3C',
    fontWeight: '700',
  },
});

export default UiSectionTitle;
