import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import UiKpiCard from '../../components/ui/KpiCard';
import { Ionicons } from '@expo/vector-icons';
import UiHeroHeader from '../../components/ui/UiHeroHeader';
import UiRoleStatCard from '../../components/ui/UiRoleStatCard';
import UiSummaryCard from '../../components/ui/UiSummaryCard';

// TODO: conectar con backend aquí para KPIs del supervisor
const kpiData = [
  {
    id: 'ventas-mes',
    icon: 'cash-outline',
    title: 'Ventas del Mes',
    value: '$128,450',
    subtitle: 'Meta: $135,000',
    progress: 128450 / 135000,
    progressColor: '#E64A2E',
    trend: '+12.5%',
    trendColor: '#16A34A',
    iconBgColor: '#FFF1EB',
    iconColor: '#E64A2E',
  },
  {
    id: 'pedidos-activos',
    icon: 'cart-outline',
    title: 'Pedidos Activos',
    value: '147',
    subtitle: 'Meta: 160',
    progress: 147 / 160,
    progressColor: '#F59E0B',
    trend: '+8',
    trendColor: '#16A34A',
    iconBgColor: '#FFF7E6',
    iconColor: '#F59E0B',
  },
  {
    id: 'cobertura-zonas',
    icon: 'location-outline',
    title: 'Cobertura Zonas',
    value: '94%',
    subtitle: 'Meta: 95%',
    progress: 0.94,
    progressColor: '#22C55E',
    trend: '+3%',
    trendColor: '#16A34A',
    iconBgColor: '#ECFDF5',
    iconColor: '#22C55E',
  },
  {
    id: 'entregas-hoy',
    icon: 'bus-outline',
    title: 'Entregas Hoy',
    value: '23/28',
    subtitle: 'Meta: 28',
    progress: 23 / 28,
    progressColor: '#3B82F6',
    trend: undefined,
    iconBgColor: '#EAF2FF',
    iconColor: '#3B82F6',
  },
];

const SupervisorHomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <UiHeroHeader
          fullBleed
          greetingText="Hola, Supervisor 👋"
          headline="Bienvenido"
          rightActions={[
            { icon: 'search-outline', onPress: () => {} },
            { icon: 'notifications-outline', badge: 3, onPress: () => { /* TODO: notificaciones supervisor */ } },
          ]}
        >
          <UiRoleStatCard
            variant="supervisor"
            data={{ kpiTitle: 'Ventas del Mes', mainValue: '$128,450', goalText: 'Meta: $135,000', progressPercent: 86, rightIcon: 'analytics-outline' }}
            onPrimaryAction={() => { /* TODO: navegar a dashboard de ventas o reporte */ }}
          />
        </UiHeroHeader>

        <View style={styles.pagePadding}>
          <Text style={styles.sectionTitle}>Rendimiento del Día</Text>
          <View style={styles.kpiGrid}>
            {kpiData.map((kpi) => (
              <View key={kpi.id} style={styles.kpiCardContainer}>
                <UiKpiCard
                  icon={kpi.icon}
                  title={kpi.title}
                  value={kpi.value}
                  subtitle={kpi.subtitle}
                  progress={kpi.progress}
                  progressColor={kpi.progressColor}
                  trend={kpi.trend}
                  trendColor={kpi.trendColor}
                  iconBgColor={kpi.iconBgColor}
                  iconColor={kpi.iconColor}
                />
              </View>
            ))}
          </View>

          <UiSummaryCard
            title="Resumen del Día"
            items={[
              { value: '147', label: 'Pedidos' },
              { value: '23', label: 'Entregas' },
              { value: '12', label: 'Vendedores' },
            ]}
            style={{ marginTop: 12 }}
          />
          {/* TODO: conectar con backend aquí para KPIs y resumen del día */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  pagePadding: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginTop: 16,
    marginBottom: 12,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  kpiCardContainer: {
    width: '50%',
    paddingHorizontal: 6,
    marginBottom: 12,
  },
});

export default SupervisorHomeScreen;