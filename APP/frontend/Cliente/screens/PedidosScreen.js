// frontend/Cliente/screens/PedidosScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppContext } from '../../context/AppContext';
import colors from '../../theme/colors';
import EmptyState from '../components/EmptyState';
import ScreenHeader from '../components/ScreenHeader';

const getBadgeStyle = (status) => {
  const normalized = (status || '').toLowerCase();
  if (normalized.includes('entregado')) {
    return { backgroundColor: '#E5F7ED', color: '#1B7F5F', label: 'Entregado' };
  }
  if (normalized.includes('camino') || normalized.includes('curso') || normalized.includes('ruta')) {
    return { backgroundColor: '#F4ECFF', color: '#6C3CE4', label: 'En curso' };
  }
  if (normalized.includes('preparacion') || normalized.includes('preparación')) {
    return { backgroundColor: '#FFF7E6', color: '#FA8C16', label: 'En preparación' };
  }
  return { backgroundColor: '#FFF0F0', color: colors.primary, label: status || 'Pendiente' };
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
      <View style={styles.cardWrapper}>
        <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={() => openDetail(item.id)}>
          {/* Encabezado: código, fecha y chip de estado */}
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.code}>{item.code}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: badgeStyle.backgroundColor }]}>
              <Ionicons
                name="time-outline"
                size={14}
                color={badgeStyle.color}
                style={{ marginRight: 4 }}
              />
              <Text style={[styles.badgeText, { color: badgeStyle.color }]}>
                {badgeStyle.label}
              </Text>
            </View>
          </View>

          {/* Línea separadora suave (no barra de progreso) */}
          <View style={styles.separator} />

          {/* Método de pago */}
          <View style={[styles.rowBetween, { marginTop: 8 }]}>
            <View style={styles.rowLeft}>
              <Ionicons
                name="card-outline"
                size={16}
                color={colors.textLight}
                style={{ marginRight: 6 }}
              />
              <Text style={styles.meta}>Método de pago</Text>
            </View>
            <Text style={styles.value}>{item.paymentMethod}</Text>
          </View>

          {/* Total */}
          <View style={[styles.rowBetween, { marginTop: 4 }]}>
            <Text style={styles.meta}>Total</Text>
            <Text style={styles.total}>${item.total.toFixed(2)}</Text>
          </View>

          {/* Botón inferior con gradiente */}
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.detailsButtonWrapper}
            onPress={() => openDetail(item.id)}
          >
            <LinearGradient
              colors={[colors.primary, '#FF7A00']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.detailsButton}
            >
              <Text style={styles.detailsButtonText}>Ver detalles completos</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.white} />
            </LinearGradient>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <ScreenHeader title="Pedidos" subtitle="Tus pedidos recientes" />
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyState
            iconName="cube-outline"
            title="No tienes pedidos todavía"
            subtitle="Realiza tu primer pedido desde el catálogo."
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
  cardWrapper: {
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.borderSoft || colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  code: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.darkText,
  },
  date: {
    marginTop: 2,
    color: colors.textLight,
    fontSize: 13,
  },
  meta: {
    color: colors.textLight,
    fontSize: 13,
  },
  value: {
    color: colors.darkText,
    fontWeight: '600',
    fontSize: 14,
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
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  separator: {
    marginTop: 10,
    marginBottom: 8,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.borderSoft || '#EDEDED',
  },
  detailsButtonWrapper: {
    marginTop: 14,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    paddingVertical: 12,
  },
  detailsButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 14,
    marginRight: 6,
  },
});

export default PedidosScreen;
