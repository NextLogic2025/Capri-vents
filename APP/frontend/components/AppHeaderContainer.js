import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../theme/colors';

const AppHeaderContainer = ({ children, style, backgroundColor }) => {
  const headerColor = backgroundColor || colors.primary;

  return (
    <View style={[styles.container, { backgroundColor: headerColor }, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
});

export default AppHeaderContainer;
