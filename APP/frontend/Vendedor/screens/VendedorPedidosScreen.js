import React, { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../theme/colors';
import globalStyles from '../../theme/styles';
import { useAppContext } from '../../context/AppContext';
import SectionCard from '../../Cliente/components/SectionCard';
import PrimaryButton from '../../Cliente/components/PrimaryButton';
import EmptyState from '../../Cliente/components/EmptyState';
import VendedorOrderCard from '../components/VendedorOrderCard';

const FILTERS = [
  { key: 'HOY', label: 'Hoy' },
  { key: 'PENDIENTES', label: 'Pendientes' },
  { key: 'ENTREGADOS', label: 'Entregados' },
];

const formatCurrency = (value = 0) => {
  const amount = Number(value) || 0;
  return amount.toFixed(2);
};

const VendedorPedidosScreen = () => {
  const navigation = useNavigation();
  const { vendorAssignedOrders = [], vendorUser } = useAppContext();
  const [filter, setFilter] = useState('PENDIENTES');
  const todayISO = new Date().toISOString().split('T')[0];

  const filteredOrders = useMemo(() => {
    return vendorAssignedOrders.filter((order) => {
      const status = (order.status || order.estadoPedido || '').toUpperCase();
      if (filter === 'HOY') {
        return (order.date || order.fecha || '').startsWith(todayISO);
      }
      if (filter === 'PENDIENTES') {
        return status !== 'ENTREGADO' && status !== 'ENTREGADA' && status !== 'CANCELADO';
      }
      if (filter === 'ENTREGADOS') {
        return status === 'ENTREGADO' || status === 'ENTREGADA';
      }
      return true;
    });
  }, [vendorAssignedOrders, filter, todayISO]);

  const resumen = useMemo(() => {
    const total = vendorAssignedOrders.length;
    const pendientes = vendorAssignedOrders.filter((order) => {
      const status = (order.status || order.estadoPedido || '').toUpperCase();
      return status !== 'ENTREGADO' && status !== 'ENTREGADA' && status !== 'CANCELADO';
    }).length;
    const entregados = total - pendientes;
    return { total, pendientes, entregados };
  }, [vendorAssignedOrders]);

  const openDetail = (order) => {
    navigation.navigate('VendedorDetallePedido', { order });
  };

  const renderFilterChips = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterContainer}
    >
      {FILTERS.map((item) => {
        const active = filter === item.key;
        return (
          <TouchableOpacity
            key={item.key}
            style={[styles.chip, active && styles.chipActive]}
            onPress={() => setFilter(item.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.chipText, active && styles.chipTextActive]}>{item.label}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );

  const renderHeader = () => (
    <View style={styles.headerContent}>
      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>Resumen diario</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{resumen.total}</Text>
            <Text style={styles.statLabel}>Asignados</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{resumen.pendientes}</Text>
            <Text style={styles.statLabel}>Pendientes</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{resumen.entregados}</Text>
            <Text style={styles.statLabel}>Entregados</Text>
          </View>
        </View>
      </View>
      {renderFilterChips()}
    </View>
  );

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
        <View style={styles.headerContentTop}>
          <View>
            <Text style={styles.greeting}>Hola, {vendorUser?.name || 'Vendedor'}</Text>
            <Text style={styles.headerTitle}>Mis Pedidos</Text>
            {resumen.pendientes > 0 && (
              <Text style={styles.headerSubtitle}>
                {resumen.pendientes} pendiente{resumen.pendientes !== 1 ? 's' : ''}
              </Text>
            )}
          </View>
          <View style={styles.headerIcon}>
            <Ionicons name="cube" size={32} color={colors.white} />
          </View>
        </View>
      </LinearGradient>

      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id || item.code}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => <VendedorOrderCard order={item} onPress={() => openDetail(item)} />}
        ListEmptyComponent={
          <EmptyState
            title="Sin pedidos"
            subtitle="No tienes pedidos asignados con este filtro."
            iconName="clipboard-outline"
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingBottom: 120,
    paddingHorizontal: 16,
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
  headerContentTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 28,
    color: colors.white,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
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
  headerContent: {
    paddingTop: 16,
  },
  filterContainer: {
    paddingHorizontal: 4,
    paddingBottom: 8,
  },
  statsCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.borderSoft,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 4,
    fontWeight: '500',
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: colors.white,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.borderSoft,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    color: colors.textSecondary,
    fontWeight: '600',
    fontSize: 14,
  },
  chipTextActive: {
    color: colors.white,
  },
});

export default VendedorPedidosScreen;
