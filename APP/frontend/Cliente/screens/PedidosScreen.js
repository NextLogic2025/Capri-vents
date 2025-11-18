import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../../context/AppContext';
import colors from '../../theme/colors';
import EmptyState from '../components/EmptyState';
import ScreenHeader from '../components/ScreenHeader';

const getBadgeStyle = (status) => {
  const normalized = (status || '').toLowerCase();
  if (normalized.includes('entregado')) {
    return { backgroundColor: '#E5F7ED', color: '#1B7F5F', label: 'Entregado' };
  }
  if (normalized.includes('camino') || normalized.includes('curso')) {
    return { backgroundColor: '#F4ECFF', color: '#6C3CE4', label: 'En curso' };
  }
  return { backgroundColor: '#FFF0F0', color: colors.primary, label: status };
};

const PedidosScreen = ({ navigation }) => {
  const { orders } = useAppContext();

  const openDetail = (orderId) => {
    const parentNav = navigation.getParent?.();
    (parentNav || navigation).navigate('DetallePedido', { orderId });
  };

  const renderItem = ({ item }) => {
    const badgeStyle = getBadgeStyle(item.status);
    return (
      <TouchableOpacity style={styles.card} onPress={() => openDetail(item.id)}>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.code}>{item.code}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: badgeStyle.backgroundColor }]}>
            <Ionicons name="cube-outline" size={14} color={badgeStyle.color} style={{ marginRight: 4 }} />
            <Text style={{ color: badgeStyle.color, fontWeight: '600' }}>{badgeStyle.label}</Text>
          </View>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.meta}>Metodo de pago</Text>
          <Text style={styles.value}>{item.paymentMethod}</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.meta}>Total</Text>
          <Text style={styles.total}>${item.total.toFixed(2)}</Text>
        </View>
        <View style={styles.linkRow}>
          <Text style={styles.link}>Ver detalles completos</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.primary} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      <ScreenHeader title="Pedidos" />
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyState
            iconName="cube-outline"
            title="No tienes pedidos todavia"
            subtitle="Realiza tu primer pedido desde el catalogo."
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
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 120,
    paddingTop: 16,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  code: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.darkText,
  },
  date: {
    color: colors.textLight,
  },
  meta: {
    color: colors.textLight,
  },
  value: {
    color: colors.darkText,
    fontWeight: '600',
  },
  total: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 18,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  link: {
    color: colors.primary,
    fontWeight: '600',
    marginRight: 4,
  },
});

export default PedidosScreen;
