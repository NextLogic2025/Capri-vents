import React, { useMemo } from 'react';
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

  // Progreso de pago (cuotas pagadas vs totales)
  const { totalCuotas, cuotasPagadas, progreso } = useMemo(() => {
    const total = installments.length;
    const pagadas = installments.filter((cuota) => {
      const estado = (cuota.status || cuota.estado || '').toUpperCase();
      return estado === 'PAGADA' || estado === 'PAGADO';
    }).length;
    const p = total ? pagadas / total : 0;
    return { totalCuotas: total, cuotasPagadas: pagadas, progreso: p };
  }, [installments]);

  const formatMoney = (value) => `$${(Number(value) || 0).toFixed(2)}`;

  const getEstadoChip = () => {
    const base = (credit.status || credit.estado || '').toLowerCase();

    if (base.includes('cancel') || base.includes('pag')) {
      return { label: 'Finalizado', bg: '#F5F5F5', text: '#595959' };
    }
    if (base.includes('mora') || base.includes('venc')) {
      return { label: 'En mora', bg: '#FFF1F0', text: colors.danger || '#CF1322' };
    }
    return { label: 'En curso', bg: '#F9F0FF', text: '#722ED1' };
  };

  const getInstallmentChip = (cuota) => {
    const estadoBase = (cuota.status || cuota.estado || 'Pendiente').toLowerCase();

    if (estadoBase.includes('pag')) {
      return {
        label: cuota.status || 'Pagada',
        bg: '#E6FFFB',
        text: '#08979C',
      };
    }
    if (estadoBase.includes('venc')) {
      return {
        label: cuota.status || 'Vencida',
        bg: '#FFF1F0',
        text: colors.danger || '#CF1322',
      };
    }
    return {
      label: cuota.status || 'Pendiente',
      bg: '#FFFBE6',
      text: '#AD6800',
    };
  };

  const estadoChip = getEstadoChip();

  const renderInstallment = (cuota) => {
    const status = (cuota.status || cuota.estado || 'Pendiente').toLowerCase();
    const isPending =
      status.includes('pendiente') || status.includes('vencida') || status.includes('vencido');
    const chip = getInstallmentChip(cuota);

    return (
      <View key={cuota.id || cuota.numero} style={styles.installmentCard}>
        <View style={styles.installmentHeaderRow}>
          <View>
            <Text style={styles.installmentTitle}>
              Cuota {cuota.number || cuota.numero}
            </Text>
            <Text style={styles.installmentMeta}>
              Monto:{' '}
              <Text style={styles.installmentStrong}>
                {formatMoney(cuota.amount ?? cuota.monto ?? 0)}
              </Text>
            </Text>
            <Text style={styles.installmentMeta}>
              Vence:{' '}
              <Text style={styles.installmentStrong}>
                {cuota.dueDate || cuota.fechaVencimiento || '—'}
              </Text>
            </Text>
          </View>

          <View style={[styles.installmentChip, { backgroundColor: chip.bg }]}>
            <Text style={[styles.installmentChipText, { color: chip.text }]}>
              {chip.label}
            </Text>
          </View>
        </View>

        {isPending && (
          <PrimaryButton
            title="Pagar ahora"
            style={styles.payButton}
            textStyle={{ fontSize: 13 }}
            onPress={() =>
              navigation.navigate('PagoCuota', {
                creditId: credit.id,
                installmentId: cuota.id,
              })
            }
          />
        )}
      </View>
    );
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 16, paddingBottom: 160 }}
    >
      {/* Resumen del crédito */}
      <SectionCard title={`Pedido #${credit.orderCode || credit.id}`}>
        <View style={styles.summaryRow}>
          <View>
            <Text style={styles.summaryLabel}>Total</Text>
            <Text style={styles.summaryValue}>
              {formatMoney(credit.total ?? credit.montoTotal ?? 0)}
            </Text>
          </View>
          <View>
            <Text style={styles.summaryLabel}>Saldo pendiente</Text>
            <Text style={[styles.summaryValue, { color: colors.danger }]}>
              {formatMoney(saldo)}
            </Text>
          </View>
        </View>

        <View style={styles.progressHeaderRow}>
          <Text style={styles.progressLabel}>Progreso de pago</Text>
          <Text style={styles.progressPercent}>
            {Math.round((progreso || 0) * 100)}%
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { flex: progreso || 0 },
            ]}
          />
          <View style={{ flex: 1 - (progreso || 0) }} />
        </View>

        <View
          style={[
            styles.estadoChip,
            { backgroundColor: estadoChip.bg },
          ]}
        >
          <Text
            style={[
              styles.estadoChipText,
              { color: estadoChip.text },
            ]}
          >
            {estadoChip.label}
          </Text>
        </View>
      </SectionCard>

      {/* Cuotas */}
      <SectionCard title="Cuotas">
        {installments.map(renderInstallment)}
      </SectionCard>

      {/* Recordatorio inferior */}
      <View style={styles.reminderCard}>
        <Text style={styles.reminderTitle}>Recordatorio</Text>
        <Text style={styles.reminderText}>
          Puedes pagar tus cuotas antes de la fecha de vencimiento sin penalización.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 13,
    color: colors.textMuted,
  },
  summaryValue: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
  },
  progressHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 12,
    color: colors.textMuted,
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textDark,
  },
  progressBar: {
    flexDirection: 'row',
    height: 6,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
    marginBottom: 12,
  },
  progressFill: {
    backgroundColor: colors.primary,
    borderRadius: 999,
  },
  estadoChip: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    marginTop: 4,
  },
  estadoChipText: {
    fontSize: 12,
    fontWeight: '600',
  },

  installmentCard: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSoft || '#F0F0F0',
  },
  installmentHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  installmentTitle: {
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 2,
  },
  installmentMeta: {
    fontSize: 13,
    color: colors.textMuted,
  },
  installmentStrong: {
    color: colors.textDark,
    fontWeight: '600',
  },
  installmentChip: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  installmentChipText: {
    fontSize: 11,
    fontWeight: '600',
  },
  payButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
  },
  reminderCard: {
    marginTop: 16,
    borderRadius: 18,
    padding: 14,
    backgroundColor: '#E6F7FF',
  },
  reminderTitle: {
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 4,
  },
  reminderText: {
    fontSize: 13,
    color: colors.textMuted,
  },
});

export default DetalleCreditoScreen;
