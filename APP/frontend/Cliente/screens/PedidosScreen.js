import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppContext } from '../../context/AppContext';
import colors from '../../theme/colors';
import EmptyState from '../components/EmptyState';
import PrimaryButton from '../components/PrimaryButton';

const getBadgeStyle = (status) => {
  const normalized = (status || '').toLowerCase();
  if (normalized.includes('entregado')) {
    return { backgroundColor: '#E5F7ED', color: '#1B7F5F', label: 'Entregado', icon: 'checkmark-circle' };
  }
  if (normalized.includes('camino') || normalized.includes('curso') || normalized.includes('ruta')) {
    return { backgroundColor: '#F4ECFF', color: '#6C3CE4', label: 'En camino', icon: 'bicycle' };
  }
  if (normalized.includes('preparacion') || normalized.includes('preparación')) {
    return { backgroundColor: '#FFF7E6', color: '#FA8C16', label: 'Preparando', icon: 'cube' };
  }
  return { backgroundColor: '#FFF0F0', color: colors.primary, label: status || 'Pendiente', icon: 'time' };
};

const TAB_ITEMS = [
  { key: 'pedidos', label: 'En curso' },
  { key: 'historial', label: 'Historial' },
];

const PedidosScreen = ({ navigation }) => {
  const { orders } = useAppContext();
  const [activeTab, setActiveTab] = useState('pedidos');

  const filteredOrders = useMemo(() => {
    if (activeTab === 'historial') {
      return orders.filter((order) => (order.status || '').toLowerCase().includes('entregado') || (order.paymentStatus || '').toLowerCase().includes('pagado'));
    }
    return orders.filter((order) => !((order.status || '').toLowerCase().includes('entregado') || (order.paymentStatus || '').toLowerCase().includes('pagado')));
  }, [orders, activeTab]);

  const stats = useMemo(() => {
    const activeCount = orders.filter((o) => !(o.status || '').toLowerCase().includes('entregado')).length;
    const totalSpent = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    return { activeCount, totalSpent };
  }, [orders]);

  const openDetail = (orderId) => {
    const parentNav = navigation.getParent?.();
    (parentNav || navigation).navigate('DetallePedido', { orderId });
  };

  const renderItem = ({ item }) => {
    const badgeStyle = getBadgeStyle(item.status);

    return (
      <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={() => openDetail(item.id)}>
        <View style={styles.cardHeader}>
          <View style={styles.codeContainer}>
            <View style={styles.iconBox}>
              <Ionicons name="receipt-outline" size={20} color={colors.primary} />
            </View>
            <View>
              <Text style={styles.code}>{item.code}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          </View>
          <View style={[styles.badge, { backgroundColor: badgeStyle.backgroundColor }]}>
            <Ionicons name={badgeStyle.icon} size={12} color={badgeStyle.color} style={{ marginRight: 4 }} />
            <Text style={[styles.badgeText, { color: badgeStyle.color }]}>{badgeStyle.label}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.cardBody}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Total</Text>
            <Text style={styles.value}>${item.total.toFixed(2)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Pago</Text>
            <Text style={styles.value}>{item.paymentMethod}</Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.itemsCount}>{item.items?.length || 0} productos</Text>
          <TouchableOpacity onPress={() => openDetail(item.id)}>
            <Text style={styles.linkText}>Ver detalles</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View>
      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: '#E3F2FD' }]}>
            <Ionicons name="cube-outline" size={20} color="#1565C0" />
          </View>
          <View>
            <Text style={styles.statValue}>{stats.activeCount}</Text>
            <Text style={styles.statLabel}>En curso</Text>
          </View>
        </View>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: '#E8F5E9' }]}>
            <Ionicons name="wallet-outline" size={20} color="#2E7D32" />
          </View>
          <View>
            <Text style={styles.statValue}>${stats.totalSpent.toFixed(0)}</Text>
            <Text style={styles.statLabel}>Total compras</Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {TAB_ITEMS.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Mis Pedidos</Text>
            <Text style={styles.headerSubtitle}>Rastrea tus compras</Text>
          </View>
          <View style={styles.headerIcon}>
            <Ionicons name="list" size={32} color={colors.white} />
          </View>
        </View>
      </LinearGradient>

      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <EmptyState
            iconName="receipt-outline"
            title={activeTab === 'historial' ? 'Sin historial' : 'No hay pedidos activos'}
            subtitle={activeTab === 'historial' ? 'Tus pedidos finalizados aparecerán aquí.' : 'Realiza tu primer pedido ahora.'}
          />
        }
        showsVerticalScrollIndicator={false}
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
  listContent: {
    paddingBottom: 100,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 24,
    marginTop: 20, // Increased margin for better spacing
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.darkText,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textLight,
  },
  tabTextActive: {
    color: colors.white,
  },
  card: {
    backgroundColor: colors.white,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFEBEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  code: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.darkText,
  },
  date: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderSoft,
    marginVertical: 16,
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoRow: {
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.darkText,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 12,
  },
  itemsCount: {
    fontSize: 12,
    color: colors.textMuted,
  },
  linkText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
});

export default PedidosScreen;
