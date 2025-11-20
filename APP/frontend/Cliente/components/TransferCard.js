import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import globalStyles from '../../theme/styles';
import colors from '../../theme/colors';

const statusStyles = {
  Pendiente: {
    backgroundColor: 'rgba(241, 196, 15, 0.15)',
    textColor: colors.warning,
  },
  Validada: {
    backgroundColor: 'rgba(39, 174, 96, 0.12)',
    textColor: colors.success,
  },
};

const TransferCard = ({ title, status, amount, date, reference, bank, onViewMore }) => {
  const variant = statusStyles[status] || statusStyles.Pendiente;
  return (
    <View style={[styles.card, globalStyles.shadow]}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.amount}>${amount}</Text>
      </View>
      <View style={styles.statusRow}>
        <View style={[styles.chip, { backgroundColor: variant.backgroundColor }]}>
          <Text style={[styles.chipText, { color: variant.textColor }]}>{status}</Text>
        </View>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Referencia</Text>
        <Text style={styles.detailValue}>{reference}</Text>
      </View>
      <Text style={styles.detailSub}>{bank}</Text>
      <TouchableOpacity onPress={onViewMore} style={styles.moreAction} activeOpacity={0.7}>
        <Text style={styles.moreText}>Ver más</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    backgroundColor: colors.surface,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primaryRed,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  chip: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
    color: colors.textMuted,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  detailLabel: {
    fontSize: 12,
    color: colors.textMuted,
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textDark,
  },
  detailSub: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 12,
  },
  moreAction: {
    alignSelf: 'flex-end',
  },
  moreText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primaryRed,
  },
});

export default TransferCard;
