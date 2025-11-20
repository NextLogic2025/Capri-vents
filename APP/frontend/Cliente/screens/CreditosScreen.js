// frontend/Cliente/screens/CreditosScreen.js
import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../../context/AppContext';
import colors from '../../theme/colors';
import globalStyles from '../../theme/styles';
import PrimaryButton from '../components/PrimaryButton';
import ScreenHeader from '../components/ScreenHeader';

const CreditosScreen = () => {
  const navigation = useNavigation();
  const { credits = [] } = useAppContext();

  // Resumen financiero general del cliente
  // BACKEND: estos valores deberían venir calculados desde la API de créditos.
  const { totalAprobado, deudaActual, disponible, cuotasVencidas } = useMemo(() => {
    let aprobado = 0;
    let deuda = 0;
    let vencidas = 0;

    credits.forEach((credit) => {
      const limite =
        credit.limiteAprobado ??
        credit.saldoAprobado ??
        credit.total ??
        credit.montoTotal ??
        0;
      const deudaCredito =
        credit.deudaActual ??
        credit.saldoPendiente ??
        credit.saldo ??
        0;

      aprobado += Number(limite) || 0;
      deuda += Number(deudaCredito) || 0;

      const cuotas = credit.cuotas || credit.installments || [];
      cuotas.forEach((cuota) => {
        const estado = (cuota.estado || cuota.status || '').toUpperCase();
        if (estado === 'VENCIDA' || estado === 'VENCIDO') {
          vencidas += 1;
        }
      });
    });

    const disponibleCalc = Math.max(aprobado - deuda, 0);

    return {
      totalAprobado: aprobado,
      deudaActual: deuda,
      disponible: disponibleCalc,
      cuotasVencidas: vencidas,
    };
  }, [credits]);

  const formatMoney = (value) => `$${(Number(value) || 0).toFixed(2)}`;

  const getEstadoChip = (credit) => {
    const estadoBase = (credit.estado || credit.status || '').toLowerCase();

    if (estadoBase.includes('cancel') || estadoBase.includes('pag')) {
      return { label: 'Finalizado', color: '#D9F7BE', text: '#389E0D' };
    }
    if (estadoBase.includes('mora') || estadoBase.includes('venc')) {
      return { label: 'En mora', color: '#FFF1F0', text: colors.danger || '#CF1322' };
    }
    return { label: 'En curso', color: '#F9F0FF', text: '#722ED1' };
  };

  const renderCreditCard = (credit) => {
    const code = credit.code || credit.codigo || `#${credit.id}`;
    const total =
      credit.total ??
      credit.montoTotal ??
      credit.valorTotal ??
      credit.monto ??
      0;
    const cuotas = credit.cuotas || credit.installments || [];
    const pagadas = cuotas.filter((c) => {
      const estado = (c.estado || c.status || '').toUpperCase();
      return estado === 'PAGADA' || estado === 'PAGADO';
    }).length;
    const totalCuotas = cuotas.length || credit.numeroCuotas || credit.plazo || 0;
    const progress = totalCuotas ? pagadas / totalCuotas : 0;
    const estadoChip = getEstadoChip(credit);

    return (
      <View
        key={credit.id || code}
        style={styles.creditCard}
      >
        {/* Cabecera crédito */}
        <View style={styles.creditHeaderRow}>
          <View>
            <Text style={styles.creditLabel}>Crédito</Text>
            <Text style={styles.creditCode}>{code}</Text>
          </View>
          <View
            style={[
              styles.estadoChip,
              { backgroundColor: estadoChip.color },
            ]}
          >
            <Text style={[styles.estadoChipText, { color: estadoChip.text }]}>
              {estadoChip.label}
            </Text>
          </View>
        </View>

        {/* Totales */}
        <View style={styles.creditTotalsRow}>
          <Text style={styles.creditTotalLabel}>Total del crédito</Text>
          <Text style={styles.creditTotalValue}>{formatMoney(total)}</Text>
        </View>

        {/* Progreso de cuotas */}
        <View style={styles.cuotasRow}>
          <Text style={styles.cuotasText}>
            Cuotas pagadas{' '}
            <Text style={styles.cuotasStrong}>
              {pagadas} de {totalCuotas || '—'}
            </Text>
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { flex: progress || 0 }]} />
          <View style={{ flex: 1 - (progress || 0) }} />
        </View>
        <Text style={styles.progressHint}>
          {totalCuotas ? `${Math.round((progress || 0) * 100)}% completado` : 'Sin plan de cuotas'}
        </Text>

        {/* Botón Ver cuotas */}
        <PrimaryButton
          title="Ver cuotas"
          onPress={() =>
            navigation.navigate('DetalleCredito', {
              credit,
              creditId: credit.id || credit.creditId || code,
            })
          }
          style={styles.verCuotasButton}
        />
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      {/* Header rojo reutilizable */}
      <ScreenHeader
        title="Crédito"
        subtitle="Gestiona tu cuenta"
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          globalStyles.contentContainer,
          styles.contentContainer,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Resumen financiero */}
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionHeaderLeft}>
            <Ionicons name="trending-up-outline" size={18} color={colors.primary} />
            <Text style={styles.sectionTitle}>Resumen financiero</Text>
          </View>
        </View>

        <View style={styles.summaryWrapper}>
          {/* Saldo aprobado */}
          <View style={styles.summaryMainCard}>
            <Text style={styles.summaryLabel}>Saldo aprobado</Text>
            <Text style={styles.summaryMainValue}>
              {formatMoney(totalAprobado)}
            </Text>
          </View>

          {/* Disponible y deuda */}
          <View style={styles.summaryRow}>
            <View style={[styles.summarySmallCard, styles.summarySmallLeft]}>
              <Text style={styles.summarySmallLabel}>Disponible</Text>
              <Text style={[styles.summarySmallValue, { color: colors.primary }]}>
                {formatMoney(disponible)}
              </Text>
            </View>
            <View style={[styles.summarySmallCard, styles.summarySmallRight]}>
              <Text style={styles.summarySmallLabel}>Deuda actual</Text>
              <Text style={[styles.summarySmallValue, { color: colors.danger || '#CF1322' }]}>
                {formatMoney(deudaActual)}
              </Text>
            </View>
          </View>

          {/* Cuotas vencidas */}
          <View style={styles.summaryAlertCard}>
            <View style={styles.summaryAlertLeft}>
              <Ionicons name="calendar-outline" size={18} color={colors.primary} />
              <Text style={styles.summaryAlertText}>Cuotas vencidas</Text>
            </View>
            <View style={styles.summaryAlertBadge}>
              <Text style={styles.summaryAlertBadgeText}>{cuotasVencidas}</Text>
            </View>
          </View>
        </View>

        {/* Lista de créditos */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Créditos</Text>
        </View>

        {credits.length === 0 ? (
          <Text style={styles.emptyText}>
            Aún no tienes créditos registrados. Cuando se apruebe uno, lo verás aquí.
          </Text>
        ) : (
          credits.map(renderCreditCard)
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: '700',
    color: colors.darkText,
  },
  summaryWrapper: {
    marginBottom: 20,
  },
  summaryMainCard: {
    backgroundColor: '#F6FFED',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 4,
  },
  summaryMainValue: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.success || '#389E0D',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summarySmallCard: {
    flex: 1,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  summarySmallLeft: {
    backgroundColor: '#E6F7FF',
    marginRight: 8,
  },
  summarySmallRight: {
    backgroundColor: '#FFF1F0',
    marginLeft: 8,
  },
  summarySmallLabel: {
    fontSize: 12,
    color: colors.textMuted,
  },
  summarySmallValue: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: '700',
  },
  summaryAlertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFBE6',
    borderWidth: 1,
    borderColor: '#FFE58F',
  },
  summaryAlertLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  summaryAlertText: {
    marginLeft: 8,
    color: colors.darkText,
    fontWeight: '600',
  },
  summaryAlertBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryAlertBadgeText: {
    color: colors.white,
    fontWeight: '700',
  },
  creditCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.borderSoft || '#F0F0F0',
    ...globalStyles.shadow,
  },
  creditHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  creditLabel: {
    fontSize: 12,
    color: colors.textMuted,
  },
  creditCode: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.darkText,
  },
  estadoChip: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  estadoChipText: {
    fontSize: 11,
    fontWeight: '600',
  },
  creditTotalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  creditTotalLabel: {
    color: colors.textMuted,
    fontSize: 13,
  },
  creditTotalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.darkText,
  },
  cuotasRow: {
    marginTop: 10,
    marginBottom: 4,
  },
  cuotasText: {
    fontSize: 13,
    color: colors.textMuted,
  },
  cuotasStrong: {
    fontWeight: '700',
    color: colors.darkText,
  },
  progressBar: {
    flexDirection: 'row',
    height: 6,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },
  progressFill: {
    backgroundColor: colors.primary,
    borderRadius: 999,
  },
  progressHint: {
    marginTop: 4,
    fontSize: 11,
    color: colors.textMuted,
  },
  verCuotasButton: {
    marginTop: 12,
  },
  emptyText: {
    marginTop: 24,
    textAlign: 'center',
    color: colors.textMuted,
  },
});

export default CreditosScreen;
