import React from 'react';
import { ScrollView, View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ScreenHeader from '../../components/ScreenHeader';
import SupervisorKpiCard from '../components/SupervisorKpiCard';
import SectionCard from '../../components/SectionCard';
import PrimaryButton from '../../components/PrimaryButton';
import colors from '../../theme/colors';
import { useAppContext } from '../../context/AppContext';

const SupervisorInicioScreen = () => {
  const navigation = useNavigation();
  const {
    supervisorUser,
    allOrders,
    unassignedOrders,
    paymentsToValidate,
    supervisorCredits,
    tickets,
    stockAlerts,
  } = useAppContext();

  const pedidosNuevosHoy = unassignedOrders.length;
  const pedidosEnRuta = allOrders.filter((order) =>
    (order.status || order.estadoPedido || '').toLowerCase().includes('ruta')
  ).length;
  const pagosPorValidar = paymentsToValidate.length;
  const creditosEnMora = supervisorCredits.filter((credit) => credit.enMora).length;
  const productosCriticos =
    (stockAlerts.lowStock?.length || 0) +
    (stockAlerts.nearExpiration?.length || 0);

  // Calcular total deuda
  const totalDeuda = supervisorCredits
    .reduce((sum, item) => sum + (item.deudaTotal || 0), 0)
    .toFixed(2);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      {/* Header con gradiente */}
      <LinearGradient
        colors={[colors.primary, colors.primaryDark || '#8B0000']}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Hola, {supervisorUser?.name?.split(' ')[0] || 'Supervisor'}</Text>
            <Text style={styles.welcomeText}>Dashboard General</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color={colors.white} />
            {(pagosPorValidar + creditosEnMora) > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {(pagosPorValidar + creditosEnMora) > 9 ? '9+' : (pagosPorValidar + creditosEnMora)}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* KPIs Grid Mejorado */}
        <View style={styles.kpiSection}>
          <Text style={styles.sectionTitle}>Métricas Clave</Text>

          <View style={styles.kpiGrid}>
            <View style={styles.kpiRow}>
              <SupervisorKpiCard
                label="Pedidos nuevos"
                value={pedidosNuevosHoy.toString()}
                variant="primary"
                icon="cube-outline"
              />
              <SupervisorKpiCard
                label="En ruta"
                value={pedidosEnRuta.toString()}
                variant="warning"
                icon="car-outline"
              />
            </View>

            <View style={styles.kpiRow}>
              <SupervisorKpiCard
                label="Pagos pendientes"
                value={pagosPorValidar.toString()}
                variant="danger"
                icon="cash-outline"
              />
              <SupervisorKpiCard
                label="Créditos en mora"
                value={creditosEnMora.toString()}
                variant="warning"
                icon="alert-circle-outline"
              />
            </View>
          </View>
        </View>

        {/* Acciones Rápidas */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>

          {/* Card de Reclamos */}
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('SupervisorSoporte')}
            activeOpacity={0.8}
          >
            <View style={[styles.actionIconContainer, { backgroundColor: '#E3F2FD' }]}>
              <Ionicons name="chatbox-ellipses" size={28} color="#1976D2" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Reclamos Activos</Text>
              <Text style={styles.actionDescription}>
                {tickets?.filter(t => t.status !== 'CERRADO').length || 0} casos en seguimiento
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>
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
  headerGradient: {
    paddingTop: 50,
    paddingBottom: 30,
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
  greeting: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
    marginBottom: 4,
  },
  welcomeText: {
    fontSize: 28,
    color: colors.white,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  notificationButton: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.gold,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.darkText,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.darkText,
    marginBottom: 16,
  },
  kpiSection: {
    marginBottom: 32,
  },
  kpiGrid: {
    gap: 12,
  },
  kpiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  actionsSection: {
    marginBottom: 24,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.borderSoft,
  },
  actionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.darkText,
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
  },
});

export default SupervisorInicioScreen;
