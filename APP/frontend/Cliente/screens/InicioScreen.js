// frontend/Cliente/screens/InicioScreen.js
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../../context/AppContext';
import colors from '../../theme/colors';
import sharedStyles from '../../theme/styles';
import NotificationsModal from '../components/NotificationsModal';
import ProductCard from '../components/ProductCard';
import ScreenHeader from '../components/ScreenHeader';
import GlobalToast from '../../components/GlobalToast'; // 👈 usamos el nuevo toast

const InicioScreen = () => {
  const navigation = useNavigation();
  const { products, orders = [], credits = [] } = useAppContext();

  const [category, setCategory] = useState('Todos');
  const [search, setSearch] = useState('');
  const [notificationsVisible, setNotificationsVisible] = useState(false);

  // estado del toast
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

  const searchContainerStyle = sharedStyles.searchContainer || styles.searchContainer;
  const searchInputStyle = sharedStyles.searchInput || styles.searchInput;

  const openCredits = () => {
    const parentNav = navigation.getParent?.();
    (parentNav || navigation).navigate('Creditos');
  };

  // cuando un producto se agrega al carrito
  const handleProductAdded = (product) => {
    setToastMessage(`${product.name} se añadió al carrito`);
    setToastVisible(true);

    // ocultar automáticamente después de 2 segundos
    setTimeout(() => {
      setToastVisible(false);
    }, 2000);
  };

  const renderHeader = () => (
    <View>
      {/* HEADER ROJO DE BORDE A BORDE */}
      <View style={styles.headerCardWrapper}>
        <ScreenHeader
          greeting="Hola Cliente"
          title="Bienvenido"
          sectionLabel="Supermercado El Ahorro"
          icon="notifications-outline"
          notificationsCount={notifications.length}
          onIconPress={() => setNotificationsVisible(true)}
          style={styles.headerCard}
        />
        {/* TODO BACKEND: reemplazar greeting/store por datos reales */}
      </View>

      <View style={styles.headerContent}>
        {hasCuotaNotifications && (
          <View style={styles.reminderBanner}>
            <Text style={styles.reminderTitle}>Tienes cuotas por pagar</Text>
            <Text style={styles.reminderText}>
              Revisa tus créditos y mantente al día con tus pagos.
            </Text>
            <TouchableOpacity style={styles.reminderButton} onPress={openCredits}>
              <Text style={styles.reminderButtonText}>Ver cuotas</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={searchContainerStyle}>
          <Ionicons
            name="search-outline"
            size={20}
            color={colors.muted}
            style={{ marginHorizontal: 8 }}
          />
          <TextInput
            style={[searchInputStyle, { flex: 1 }]}
            placeholder="Buscar productos..."
            placeholderTextColor={colors.muted}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {categories.map((cat) => {
            const active = cat === category;
            return (
              <TouchableOpacity
                key={cat}
                onPress={() => setCategory(cat)}
                style={[styles.filterChip, active && styles.filterChipActive]}
              >
                <Ionicons
                  name="ellipse"
                  size={8}
                  color={active ? colors.white : colors.primary}
                  style={styles.filterDot}
                />
                <Text style={[styles.filterText, active && styles.filterTextActive]}>
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
      <FlatList
        style={styles.flatList}
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
            onAddToCart={handleProductAdded} // 👈 dispara el toast
          />
        )}
      />

      <NotificationsModal
        visible={notificationsVisible}
        onClose={() => setNotificationsVisible(false)}
        notifications={notifications}
      />

      {/* Toast global para “producto añadido” */}
      <GlobalToast visible={toastVisible} message={toastMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flatList: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingBottom: 160,
    paddingHorizontal: 16,
    paddingTop: 0,
  },
  // el header ignora el padding horizontal de la lista para ir de borde a borde
  headerCardWrapper: {
    marginHorizontal: -16,
  },
  headerCard: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    paddingTop: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    ...(sharedStyles.shadow || {}), // 👈 sombra segura
    paddingVertical: 4,
    marginBottom: 12,
    marginHorizontal: 16,
  },
  searchInput: {
    fontSize: 16,
    color: colors.darkText,
    paddingVertical: 10,
    paddingRight: 16,
  },
  filterScroll: {
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    marginRight: 10,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterDot: {
    marginRight: 6,
  },
  filterText: {
    color: colors.bodyText,
    fontWeight: '600',
  },
  filterTextActive: {
    color: colors.white,
  },
  reminderBanner: {
    backgroundColor: '#FFF2CC',
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    marginTop: 8,
  },
  reminderTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textDark,
  },
  reminderText: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 4,
  },
  reminderButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: colors.primary,
  },
  reminderButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default InicioScreen;
