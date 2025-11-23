import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../../context/AppContext';
import colors from '../../theme/colors';
import sharedStyles from '../../theme/styles';
import SectionCard from '../components/SectionCard';
import ScreenHeader from '../components/ScreenHeader';

const DetalleCreditoScreen = ({ route, navigation }) => {
  const { creditId } = route.params || {};
  const { credits } = useAppContext();
  const credit = credits.find((item) => item.id === creditId);

  if (!credit) {
    return (
      <View style={styles.centeredScreen}>
        <Text>No encontramos el credito.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: colors.primary, marginTop: 10 }}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const installments = credit.installments || credit.cuotas || [];
  const total = Number(credit.total) || 0;
  const saldoPendiente = Number(credit.saldoPendiente) || 0;

  // Progreso de pago basado en montos
  const progress = useMemo(() => {
    if (total === 0) return 0;
    const paid = total - saldoPendiente;
    return paid / total;
  }, [total, saldoPendiente]);

  const handlePayInstallment = (cuota) => {
    navigation.navigate('PagoCuota', {
      creditId: credit.id,
      installmentId: cuota.id || cuota.numero, // Fallback to numero if id is missing
    });
  };

  return (
    <View style={styles.screen}>
      <ScreenHeader title="Detalle de Crédito" subtitle={`Ref: ${credit.id}`} showBack />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Resumen de Saldo */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Saldo Pendiente</Text>
          <Text style={styles.summaryValue}>${saldoPendiente.toFixed(2)}</Text>

          <View style={styles.progressContainer}>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
            </View>
            <View style={styles.progressLabels}>
              <Text style={styles.progressText}>Pagado: ${(total - saldoPendiente).toFixed(2)}</Text>
              <Text style={styles.progressText}>Total: ${total.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Lista de Cuotas */}
        <SectionCard title="Plan de Pagos">
          {installments.map((cuota, index) => {
            const status = (cuota.status || cuota.estado || 'Pendiente').toUpperCase();
            const isPaid = status === 'PAGADA' || status === 'PAGADO';
            const isOverdue = status === 'VENCIDA' || status === 'VENCIDO';
            const monto = Number(cuota.monto) || 0;

            return (
              <View key={index} style={styles.installmentRow}>
                <View style={styles.installmentInfo}>
                  <View style={[
                    styles.installmentIcon,
                    isPaid ? styles.iconPaid : (isOverdue ? styles.iconOverdue : styles.iconPending)
                  ]}>
                    <Ionicons
                      name={isPaid ? "checkmark" : "calendar-outline"}
                      size={16}
                      color={isPaid ? colors.white : (isOverdue ? colors.white : colors.primary)}
                    />
                  </View>
                  <View>
                    <Text style={styles.installmentTitle}>Cuota {cuota.numero}</Text>
                    <Text style={styles.installmentDate}>Vence: {cuota.dueDate}</Text>
                  </View>
                </View>

                <View style={styles.installmentRight}>
                  <Text style={styles.installmentAmount}>${monto.toFixed(2)}</Text>
                  {isPaid ? (
                    <Text style={styles.statusPaid}>Pagada</Text>
                  ) : (
                    <TouchableOpacity
                      style={styles.payButton}
                      onPress={() => handlePayInstallment(cuota)}
                    >
                      <Text style={styles.payButtonText}>Pagar</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          })}
        </SectionCard>

        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={24} color={colors.primary} />
          <Text style={styles.infoText}>
            Recuerda pagar tus cuotas a tiempo para mantener un buen historial crediticio y acceder a mayores beneficios.
          </Text>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centeredScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  summaryCard: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    marginTop: 30, // Added top margin
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  summaryLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  summaryValue: {
    color: colors.white,
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 24,
  },
  progressContainer: {
    width: '100%',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.gold,
    borderRadius: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontWeight: '500',
  },
  installmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSoft,
  },
  installmentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  installmentIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconPaid: {
    backgroundColor: '#4CAF50',
  },
  iconPending: {
    backgroundColor: '#FFF0F0',
  },
  iconOverdue: {
    backgroundColor: '#F44336',
  },
  installmentTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.darkText,
  },
  installmentDate: {
    fontSize: 12,
    color: colors.textLight,
  },
  installmentRight: {
    alignItems: 'flex-end',
  },
  installmentAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.darkText,
    marginBottom: 4,
  },
  statusPaid: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4CAF50',
  },
  payButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  payButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    padding: 16,
    borderRadius: 16,
    marginTop: 8,
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 13,
    color: '#1565C0',
    lineHeight: 18,
  },
});

export default DetalleCreditoScreen;
