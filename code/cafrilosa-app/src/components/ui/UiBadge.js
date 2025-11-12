import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UiBadge = ({
  label,
  variant = 'success', // 'success', 'warning', 'info', 'danger', 'deal', 'percent'
  style,
  textStyle,
}) => {
  return (
    <View style={[styles.badge, styles[`variant_${variant}`], style]}>
      <Text style={[styles.text, styles[`text_variant_${variant}`], textStyle]}>{label}</Text>
    </View>
  );
};

const COLORS = {
  success: '#22C55E',
  warning: '#B26A00',
  info: '#1565C0',
  danger: '#F44336',
  success_bg: '#EAFCEF',
  warning_bg: '#FFF4E5',
  info_bg: '#E6F2FF',
  danger_bg: 'rgba(244, 67, 54, 0.1)',
  deal: '#FF9800',
  deal_bg: 'rgba(255,152,0,0.12)',
  percent: '#E53935',
  percent_bg: 'rgba(229,57,53,0.12)'
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  // Variants
  variant_success: {
    backgroundColor: COLORS.success_bg,
  },
  variant_warning: {
    backgroundColor: COLORS.warning_bg,
  },
  variant_info: {
    backgroundColor: COLORS.info_bg,
  },
  variant_danger: {
    backgroundColor: COLORS.danger_bg,
  },
  variant_deal: {
    backgroundColor: COLORS.deal_bg,
  },
  variant_percent: {
    backgroundColor: COLORS.percent_bg,
  },
  // Text Variants
  text_variant_success: {
    color: COLORS.success,
  },
  text_variant_warning: {
    color: COLORS.warning,
  },
  text_variant_info: {
    color: COLORS.info,
  },
  text_variant_danger: {
    color: COLORS.danger,
  },
  text_variant_deal: {
    color: COLORS.deal,
  },
  text_variant_percent: {
    color: COLORS.percent,
  },
});

export default UiBadge;
