import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenHeader from '../../Cliente/components/ScreenHeader';
import SupervisorKpiCard from '../components/SupervisorKpiCard';
import SectionCard from '../../Cliente/components/SectionCard';
import PrimaryButton from '../../Cliente/components/PrimaryButton';
import colors from '../../theme/colors';
import globalStyles from '../../theme/styles';
import { useAppContext } from '../../context/AppContext';

const SupervisorInicioScreen = () => {
  const navigation = useNavigation();
  const {
    supervisorUser,
    allOrders,
    unassignedOrders,
    paymentsToValidate,
    supervisorCredits,
    stockAlerts,
    claims,
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

  return (
    <ScrollView
      style={styles.screen}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER unificado, sin padding alrededor */}
      <ScreenHeader
        greeting={`Hola, ${supervisorUser?.name || 'Supervisor'}`}
        title="Bienvenido"
        sectionLabel="Dashboard general"
      />

      {/* Contenido con padding separado */}
      <View style={styles.content}>
        <View style={styles.kpiRow}>
          <SupervisorKpiCard
            label="Pedidos nuevos hoy"
            value={pedidosNuevosHoy.toString()}
            variant="primary"
          />
          <SupervisorKpiCard
            label="Pedidos en ruta"
            value={pedidosEnRuta.toString()}
            variant="warning"
          />
        </View>

        <View style={styles.kpiRow}>
          <SupervisorKpiCard
            label="Pagos por validar"
            value={pagosPorValidar.toString()}
            variant="danger"
          />
          <SupervisorKpiCard
            label="Créditos en mora"
            value={creditosEnMora.toString()}
            variant="warning"
          />
        </View>

        <SectionCard title="Pagos por validar">
          <Text style={styles.sectionText}>
            Transferencias y cobros en efectivo esperando aprobación ({pagosPorValidar}).
          </Text>
          <PrimaryButton
            title="Ir a Cobros"
            onPress={() => navigation.navigate('Cobros')}
            style={styles.sectionButton}
          />
        </SectionCard>

        <SectionCard title="Créditos en mora">
          <Text style={styles.sectionText}>
            Clientes con saldo vencido: {creditosEnMora} · Deuda total: $
            {supervisorCredits
              .reduce((sum, item) => sum + (item.deudaTotal || 0), 0)
              .toFixed(2)}
          </Text>
          <PrimaryButton
            title="Ver créditos"
            onPress={() => navigation.navigate('Cobros')}
            style={styles.sectionButton}
          />
        </SectionCard>

        <SectionCard title="Stock crítico">
          <Text style={styles.sectionText}>
            Productos con stock bajo o próximos a vencer: {productosCriticos}
          </Text>
          <PrimaryButton
            title="Ver productos"
            onPress={() => navigation.navigate('Productos')}
            style={styles.sectionButton}
          />
        </SectionCard>

        <SectionCard title="Reclamos abiertos">
          <Text style={styles.sectionText}>
            {claims?.length || 0} reclamos activos en seguimiento.
          </Text>
          <PrimaryButton
            title="Ver reclamos"
            onPress={() => {
              // BACKEND: futura screen de reclamos para supervisor
            }}
            style={styles.sectionButton}
          />
        </SectionCard>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 120,
  },
  kpiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionText: {
    color: colors.textMuted,
    marginBottom: 12,
  },
  sectionButton: {
    marginTop: 4,
  },
});

export default SupervisorInicioScreen;
