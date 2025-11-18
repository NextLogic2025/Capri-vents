import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAppContext } from '../../context/AppContext';
import colors from '../../theme/colors';
import sharedStyles from '../../theme/styles';
import SectionCard from '../components/SectionCard';
import PrimaryButton from '../components/PrimaryButton';

const DetalleCreditoScreen = ({ route, navigation }) => {
  const { creditId } = route.params || {};
  const { credits } = useAppContext();
  const credit = credits.find((item) => item.id === creditId);

  if (!credit) {
    return (
      <View style={sharedStyles.centeredScreen}>
        <Text>No encontramos el credito.</Text>
      </View>
    );
  }

  const installments = credit.installments || credit.cuotas || [];
  const saldo = credit.saldoPendiente ?? credit.balance ?? 0;

  const renderInstallment = (cuota) => {
    const status = (cuota.status || 'Pendiente').toLowerCase();
    const isPending = status.includes('pendiente') || status.includes('vencida');
    return (
      <View key={cuota.id || cuota.numero} style={styles.installmentRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.installmentTitle}>Cuota {cuota.number || cuota.numero}</Text>
          <Text>Monto: ${cuota.amount?.toFixed(2) || cuota.monto?.toFixed(2)}</Text>
          <Text>Vence: {cuota.dueDate || cuota.fechaVencimiento}</Text>
          <Text>Estado: {cuota.status || 'Pendiente'}</Text>
        </View>
        {isPending && (
          <PrimaryButton
            title="Pagar ahora"
            style={styles.payButton}
            textStyle={{ fontSize: 12 }}
            onPress={() => navigation.navigate('PagoCuota', { creditId: credit.id, installmentId: cuota.id })}
          />
        )}
      </View>
    );
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 16, paddingBottom: 160 }}>
      <SectionCard title={`Pedido ${credit.orderCode || credit.id}`}>
        <Text>Total: ${credit.total?.toFixed(2)}</Text>
        <Text>Saldo pendiente: ${saldo.toFixed(2)}</Text>
        <View style={[styles.statusBadge, credit.status === 'Cancelado' ? styles.badgeGray : styles.badgeGreen]}>
          <Text style={styles.statusText}>{credit.status || 'En curso'}</Text>
        </View>
      </SectionCard>

      <SectionCard title="Cuotas">
        {installments.map(renderInstallment)}
      </SectionCard>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  statusBadge: {
    alignSelf: 'flex-start',
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeGreen: {
    backgroundColor: '#E5F7ED',
  },
  badgeGray: {
    backgroundColor: '#E5E5ED',
  },
  statusText: {
    color: colors.textDark,
    fontWeight: '600',
  },
  installmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  installmentTitle: {
    fontWeight: '700',
    color: colors.textDark,
  },
  payButton: {
    width: 110,
    marginLeft: 12,
    paddingVertical: 10,
  },
});

export default DetalleCreditoScreen;
