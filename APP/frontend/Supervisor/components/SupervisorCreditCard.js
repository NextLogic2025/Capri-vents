import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import colors from '../../theme/colors';

const formatCurrency = (value) => `$ ${Number(value ?? 0).toFixed(2)}`;

const SupervisorCreditCard = ({ creditSummary = {}, onPress = () => {} }) => {
  const {
    clienteNombre = 'Cliente sin nombre',
    cupoAprobado = 0,
    saldoDisponible = 0,
    deudaTotal = 0,
    enMora = false,
  } = creditSummary;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.title}>{clienteNombre}</Text>
        {enMora && <View style={styles.moraBadge}><Text style={styles.moraText}>En mora</Text></View>}
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Cupo aprobado</Text>
          <Text style={styles.value}>{formatCurrency(cupoAprobado)}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Saldo disponible</Text>
          <Text style={styles.value}>{formatCurrency(saldoDisponible)}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Deuda total</Text>
          <Text style={styles.value}>{formatCurrency(deudaTotal)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    marginRight: 12,
  },
  label: {
    fontSize: 12,
    color: colors.textMuted,
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
  },
  moraBadge: {
    backgroundColor: colors.danger + '22',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  moraText: {
    color: colors.danger,
    fontWeight: '600',
    fontSize: 12,
  },
});

export default SupervisorCreditCard;
