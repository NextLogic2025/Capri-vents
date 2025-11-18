import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppContext } from '../../context/AppContext';
import colors from '../../theme/colors';
import EmptyState from '../components/EmptyState';
import ScreenHeader from '../components/ScreenHeader';

const CreditosScreen = ({ navigation }) => {
  const { credits, user } = useAppContext();

  const resumenCuotasVencidas = useMemo(() => {
    return credits.reduce((sum, credit) => {
      const pendientes = (credit.installments || credit.cuotas || []).filter((cuota) =>
        typeof cuota.status === 'string' ? cuota.status.toLowerCase().includes('vencida') : false
      );
      return sum + pendientes.length;
    }, user.cuotasVencidas || 0);
  }, [credits, user.cuotasVencidas]);

  const renderCreditCard = (credit) => {
    const installments = credit.installments || credit.cuotas || [];
    const totalInstallments = installments.length || credit.totalInstallments || 0;
    const paidInstallments = installments.filter((item) => (item.status || '').toLowerCase() === 'pagada').length;
    const badgeStyle = credit.status === 'Cancelado' ? styles.badgeGray : styles.badgePurple;

    return (
      <View key={credit.id} style={styles.creditCard}>
        <View style={styles.creditHeader}>
          <View>
            <Text style={styles.creditCode}>{credit.orderCode || credit.id}</Text>
            {credit.createdAt ? <Text style={styles.creditDate}>{credit.createdAt}</Text> : null}
          </View>
          <View style={[styles.statusBadge, badgeStyle]}>
            <Text style={styles.statusText}>{credit.status || 'En curso'}</Text>
          </View>
        </View>
        <View style={styles.creditRow}>
          <Text style={styles.meta}>Total del credito</Text>
          <Text style={styles.value}>${credit.total?.toFixed(2) || '0.00'}</Text>
        </View>
        <View style={styles.creditRow}>
          <Text style={styles.meta}>Cuotas pagadas</Text>
          <Text style={styles.valueAccent}>
            {paidInstallments} de {totalInstallments}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate('DetalleCredito', { creditId: credit.id })}
        >
          <Text style={styles.linkText}>Ver cuotas</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <ScreenHeader title="Credito" subtitle="Controla tus planes y cuotas" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.summaryCard}>
          <SummaryRow label="Saldo aprobado" value={`$${user.saldoCreditoAprobado?.toFixed(2)}`} />
          <SummaryRow label="Saldo disponible" value={`$${user.saldoCreditoDisponible?.toFixed(2)}`} />
          <SummaryRow label="Deuda actual" value={`$${user.deudaActual?.toFixed(2)}`} />
          <SummaryRow
            label="Cuotas vencidas"
            value={resumenCuotasVencidas}
            valueStyle={{ color: resumenCuotasVencidas > 0 ? colors.danger : colors.darkText }}
          />
        </View>

        {credits.length === 0 ? (
          <EmptyState
            iconName="card-outline"
            title="No tienes creditos activos"
            subtitle="Cuando pagues a credito, veras tus planes aqui."
          />
        ) : (
          credits.map(renderCreditCard)
        )}
      </ScrollView>
    </View>
  );
};

const SummaryRow = ({ label, value, valueStyle }) => (
  <View style={styles.summaryRow}>
    <Text style={styles.meta}>{label}</Text>
    <Text style={[styles.value, valueStyle]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 160,
  },
  summaryCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  meta: {
    color: colors.textLight,
  },
  value: {
    fontWeight: '700',
    color: colors.darkText,
  },
  valueAccent: {
    color: colors.primary,
    fontWeight: '700',
  },
  creditCard: {
    backgroundColor: colors.white,
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  creditHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  creditCode: {
    fontWeight: '700',
    color: colors.darkText,
  },
  creditDate: {
    color: colors.textLight,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgePurple: {
    backgroundColor: '#F4ECFF',
  },
  badgeGray: {
    backgroundColor: '#E5E5ED',
  },
  statusText: {
    color: colors.darkText,
    fontWeight: '600',
  },
  creditRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  linkButton: {
    marginTop: 10,
  },
  linkText: {
    color: colors.primary,
    fontWeight: '600',
  },
});

export default CreditosScreen;
