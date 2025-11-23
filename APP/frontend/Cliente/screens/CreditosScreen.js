// frontend/Cliente/screens/CreditosScreen.js
import React, { useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../../context/AppContext';
import colors from '../../theme/colors';
import globalStyles from '../../theme/styles';
import PrimaryButton from '../components/PrimaryButton';
// import ScreenHeader from '../components/ScreenHeader'; // Removed unused
import SolicitudCreditoModal from '../components/SolicitudCreditoModal';

const CreditosScreen = () => {
  const navigation = useNavigation();

  // --- CONEXIÓN CON BACKEND ---
  // Los datos de créditos y usuario se obtienen del estado global (AppContext).
  // Estos datos son cargados desde la API (endpoints /api/creditos y /api/auth/me)
  // al iniciar la sesión o mediante la función refreshUserData.
  const { credits = [], user } = useAppContext();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log('CreditosScreen mounted');
  }, []);

  // Usamos los valores del usuario que se actualizan en tiempo real en el Context
  const totalAprobado = user?.saldoCreditoAprobado || 0;
  const deudaActual = user?.deudaActual || 0;
  const disponible = user?.saldoCreditoDisponible || 0;

  const cuotasVencidas = useMemo(() => {
    let vencidas = 0;
    credits.forEach((credit) => {
      const cuotas = credit.cuotas || credit.installments || [];
      cuotas.forEach((cuota) => {
        const estado = (cuota.estado || cuota.status || '').toUpperCase();
        if (estado === 'VENCIDA' || estado === 'VENCIDO') {
          vencidas += 1;
        }
      });
    });
    return vencidas;
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
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      {/* Header con Gradiente */}
      <LinearGradient
        colors={[colors.primary, colors.primaryDark || '#8B0000']}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Crédito</Text>
            <Text style={styles.headerSubtitle}>Gestiona tu cuenta</Text>
          </View>
          <View style={styles.headerIcon}>
            <Ionicons name="wallet" size={32} color={colors.white} />
          </View>
        </View>
      </LinearGradient>

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

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTag}>Resumen financiero</Text>
          <View style={styles.summaryMainCard}>
            <Text style={styles.summaryLabel}>Cupo Total</Text>
            <Text style={styles.summaryMainValue}>
              {formatMoney(totalAprobado)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <View style={[styles.summarySmallCard, styles.summarySmallLeft]}>
              <Text style={styles.summarySmallLabel}>Cupo Disponible</Text>
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

      {/* FAB - Botón Flotante para Solicitud */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => setModalVisible(true)}
      >
        <LinearGradient
          colors={[colors.primary, colors.primaryDark || '#8B0000']}
          style={styles.fabGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Ionicons name="wallet-outline" size={28} color={colors.white} />
        </LinearGradient>
      </TouchableOpacity>

      {/* Modal de Solicitud */}
      <SolicitudCreditoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerGradient: {
    paddingTop: 50,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    color: colors.white,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
    marginTop: 4,
  },
  headerIcon: {
    width: 56,
    height: 56,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
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
  summaryCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    ...globalStyles.shadow,
  },
  summaryTag: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    color: colors.primary,
    marginBottom: 12,
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
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    borderRadius: 32, // Fix square background shadow
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CreditosScreen;
