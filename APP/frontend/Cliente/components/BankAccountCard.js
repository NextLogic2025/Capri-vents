import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import globalStyles from '../../theme/styles';
import colors from '../../theme/colors';

const BankAccountCard = ({
  bankName,
  cbu,
  alias,
  accountType,
  holder,
  onCopy,
  style,
}) => {
  return (
    <View style={[styles.card, globalStyles.shadow, style]}>
      <View style={styles.headerRow}>
        <Ionicons name="business-outline" size={22} color={colors.primaryDark} />
        <Text style={styles.bankTitle}>{bankName}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>CBU</Text>
        <View style={styles.fieldValueRow}>
          <Text style={styles.fieldValue}>{cbu}</Text>
          <TouchableOpacity
            onPress={() => onCopy && onCopy(cbu, 'CBU')}
            style={styles.copyButton}
            activeOpacity={0.7}
          >
            <Ionicons name="copy-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Alias</Text>
        <View style={styles.fieldValueRow}>
          <Text style={styles.fieldValue}>{alias}</Text>
          <TouchableOpacity
            onPress={() => onCopy && onCopy(alias, 'Alias')}
            style={styles.copyButton}
            activeOpacity={0.7}
          >
            <Ionicons name="copy-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.detailRow}>
        <View>
          <Text style={styles.detailLabel}>Tipo de Cuenta</Text>
          <Text style={styles.detailValue}>{accountType}</Text>
        </View>
        <View>
          <Text style={styles.detailLabel}>Titular</Text>
          <Text style={styles.detailValue}>{holder}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bankTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
    color: colors.textDark,
  },
  field: {
    marginBottom: 10,
  },
  fieldLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 4,
  },
  fieldValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  fieldValue: {
    flex: 1,
    fontSize: 14,
    color: colors.textDark,
  },
  copyButton: {
    paddingLeft: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  detailLabel: {
    fontSize: 12,
    color: colors.textMuted,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
  },
});

export default BankAccountCard;
