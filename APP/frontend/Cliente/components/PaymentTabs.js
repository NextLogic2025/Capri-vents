import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import colors from '../../theme/colors';

const PaymentTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <Pressable
          key={tab.key}
          onPress={() => onTabChange(tab.key)}
          style={({ pressed }) => [
            styles.tab,
            activeTab === tab.key && styles.tabActive,
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}>
            {tab.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 20,
  },
  tabActive: {
    backgroundColor: colors.background,
    borderRadius: 20,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  tabLabelActive: {
    color: colors.primaryDark,
  },
  pressed: {
    opacity: 0.8,
  },
});

export default PaymentTabs;
