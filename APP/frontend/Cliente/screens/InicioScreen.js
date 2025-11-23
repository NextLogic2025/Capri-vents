import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../../context/AppContext';
import colors from '../../theme/colors';
import sharedStyles from '../../theme/styles';
import NotificationsModal from '../components/NotificationsModal';
import ProductCard from '../components/ProductCard';
import GlobalToast from '../../components/GlobalToast';
import LogoCafrilosa from '../../assets/images/logo-cafrilosa.png';

const InicioScreen = () => {
  const navigation = useNavigation();
  const { products, orders = [], credits = [], user } = useAppContext();

  const [category, setCategory] = useState('Todos');
  const [search, setSearch] = useState('');
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const notifications = useMemo(() => {
    const safeOrders = Array.isArray(orders) ? orders : [];
    const safeCredits = Array.isArray(credits) ? credits : [];

    const orderNotifications = safeOrders
      .filter((order) => order?.status && order.status !== 'ENTREGADO')
      .map((order, index) => {
        const reference = order?.code || order?.id || index + 1;
        return {
          id: `PED-${reference}`,
          type: 'PEDIDO',
          title: `Pedido ${reference}`,
          message: `Tu pedido está en estado ${order.status}.`,
        };
      });

    const creditNotifications = safeCredits.flatMap((credit) => {
      const cuotas = Array.isArray(credit?.cuotas) ? credit.cuotas : [];
      return cuotas
        .map((cuota, index) => {
          if (!cuota || cuota.estado === 'PAGADA') return null;
          const isOverdue = cuota.estado === 'VENCIDA';
          const creditId = credit?.id || 'CR';
          const cuotaId = cuota?.id || index + 1;
          return {
            id: `CUO-${creditId}-${cuotaId}`,
            type: 'CUOTA',
            title: isOverdue ? 'Cuota vencida' : 'Cuota pendiente',
            message: `Cuota de $${cuota.monto} del crédito ${creditId} (${cuota.estado}).`,
          };
        })
        .filter(Boolean);
    });

    return [...orderNotifications, ...creditNotifications];
  }, [orders, credits]);

  const cuotaNotifications = useMemo(
    () => notifications.filter((n) => n.type === 'CUOTA'),
    [notifications]
  );
  const hasCuotaNotifications = cuotaNotifications.length > 0;

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category))).filter(Boolean);
    return ['Todos', ...unique];
  }, [products]);

  const filtered = useMemo(() => {
    const text = search.trim().toLowerCase();
    return products.filter((product) => {
      const byCategory = category === 'Todos' || product.category === category;
      const bySearch = product.name.toLowerCase().includes(text);
      return byCategory && bySearch;
    });
  }, [category, search, products]);

  const openCredits = () => {
    const parentNav = navigation.getParent?.();
    (parentNav || navigation).navigate('Creditos');
  };

  const handleProductAdded = (product) => {
    setToastMessage(`${product.name} se añadió al carrito`);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2000);
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {/* Banner Principal */}
      <View style={styles.banner}>
        <View style={styles.bannerContent}>
          <View style={styles.userInfo}>
            <Text style={styles.greeting}>Hola, {user?.name?.split(' ')[0] || 'Cliente'}</Text>
            <Text style={styles.welcomeText}>¿Qué vas a pedir hoy?</Text>
          </View>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => setNotificationsVisible(true)}
          >
            <Ionicons name="notifications-outline" size={24} color={colors.white} />
            {notifications.length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {notifications.length > 9 ? '9+' : notifications.length}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Barra de Búsqueda Flotante */}
        <View style={styles.searchWrapper}>
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color={colors.textLight} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar productos..."
              placeholderTextColor={colors.textLight}
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>
      </View>

      {/* Alerta de Cuotas */}
      {hasCuotaNotifications && (
        <TouchableOpacity style={styles.alertBanner} onPress={openCredits} activeOpacity={0.9}>
          <View style={styles.alertIcon}>
            <Ionicons name="alert-circle" size={24} color="#D32F2F" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.alertTitle}>Atención requerida</Text>
            <Text style={styles.alertText}>Tienes cuotas pendientes de pago.</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#D32F2F" />
        </TouchableOpacity>
      )}

      {/* Categorías */}
      <View style={styles.categoriesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {categories.map((cat) => {
            const isActive = cat === category;
            return (
              <TouchableOpacity
                key={cat}
                onPress={() => setCategory(cat)}
                style={[styles.categoryChip, isActive && styles.categoryChipActive]}
              >
                <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.listColumnWrapper}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
            onAddToCart={handleProductAdded}
          />
        )}
      />

      <NotificationsModal
        visible={notificationsVisible}
        onClose={() => setNotificationsVisible(false)}
        notifications={notifications}
      />

      <GlobalToast visible={toastVisible} message={toastMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
    marginBottom: 16,
  },
  banner: {
    backgroundColor: colors.primary,
    paddingTop: 60, // Para status bar
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  bannerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  userInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
    marginBottom: 4,
  },
  welcomeText: {
    fontSize: 24,
    color: colors.white,
    fontWeight: '800',
  },
  notificationButton: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.gold,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
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
  searchWrapper: {
    position: 'absolute',
    bottom: -24,
    left: 20,
    right: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: colors.darkText,
  },
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
    marginHorizontal: 20,
    marginBottom: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  alertIcon: {
    marginRight: 12,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#D32F2F',
  },
  alertText: {
    fontSize: 12,
    color: '#B71C1C',
  },
  categoriesContainer: {
    marginTop: 8,
  },
  categoriesScroll: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: colors.white,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textLight,
  },
  categoryTextActive: {
    color: colors.white,
  },
  listContent: {
    paddingBottom: 100,
  },
  listColumnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});

export default InicioScreen;
