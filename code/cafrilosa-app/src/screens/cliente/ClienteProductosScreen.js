import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProductListItem from '../../components/ui/ProductListItem';
import { CartOrderState } from '../../state/CartOrderState';

// TODO: conectar con backend aquí para obtener catálogo real de productos (fetch paginado, filtros, búsqueda)
const ALL_PRODUCTS = [
  {
    id: 'prod1',
    name: 'Chorizo Premium',
    category: 'Embutidos',
    price: 4.5,
    image: require('../../assets/images/cart-chorizo-premium.png'),
    stock: '40/60',
  },
  {
    id: 'prod2',
    name: 'Jamón Cocido Superior',
    category: 'Jamones',
    price: 7.2,
    image: require('../../assets/images/cart-jamon-cocido.png'),
    stock: '35/50',
  },
  {
    id: 'prod3',
    name: 'Salame de Ajo',
    category: 'Embutidos',
    price: 5.1,
    image: require('../../assets/images/cart-salame.png'),
    stock: '60/80',
  },
  {
    id: 'prod4',
    name: 'Jamón Serrano',
    category: 'Jamones',
    price: 12.9,
    image: require('../../assets/images/offer-jamon-cocido.png'),
    stock: '22/40',
  },
];

const CATEGORY_FILTERS = [
  { key: 'Todos', label: 'Todos' },
  { key: 'Chorizos', label: 'Chorizos' },
  { key: 'Jamones', label: 'Jamones' },
  { key: 'Embutidos', label: 'Salchichas' },
];

const ClienteProductosScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [quantities, setQuantities] = useState({});
  const [selectDestVisible, setSelectDestVisible] = useState(false);
  const [pendingProduct, setPendingProduct] = useState(null);

  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return ALL_PRODUCTS.filter((p) => {
      const matchesSearch = !term || p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term);
      const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory || (selectedCategory === 'Chorizos' && p.name.toLowerCase().includes('choriz'));
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleViewProduct = (product) => {
    navigation.navigate('ClienteProductoDetalle', { product });
  };

  const increaseQuantity = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decreaseQuantity = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max((prev[id] || 0) - 1, 0) }));
  };

  const handleAdd = (product) => {
    const quantity = quantities[product.id] || 0;
    if (!quantity) return;
    setPendingProduct(product);
    setSelectDestVisible(true);
  };

  const finalizeAdd = (dest) => {
    if (!pendingProduct) return;
    const quantity = quantities[pendingProduct.id] || 0;
    if (dest === 'order') {
      CartOrderState.addToInProgressOrder(pendingProduct, quantity);
    } else {
      CartOrderState.addToCart(pendingProduct, quantity);
    }
    setQuantities((prev) => ({ ...prev, [pendingProduct.id]: 0 }));
    setPendingProduct(null);
    setSelectDestVisible(false);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top }]}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Productos</Text>
        <View style={styles.backButtonPlaceholder} />
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nombre o categoría..."
            placeholderTextColor="#9CA3AF"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersRow}
        >
          {CATEGORY_FILTERS.map((c) => {
            const active = selectedCategory === c.key;
            return (
              <TouchableOpacity
                key={c.key}
                style={[styles.filterChip, active ? styles.filterChipActive : null]}
                onPress={() => setSelectedCategory(c.key)}
              >
                <Text style={[styles.filterChipText, active ? styles.filterChipTextActive : null]}>
                  {c.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductListItem
            product={item}
            quantity={quantities[item.id] || 0}
            onIncrease={() => increaseQuantity(item.id)}
            onDecrease={() => decreaseQuantity(item.id)}
            onAdd={() => handleAdd(item)}
            onPress={() => handleViewProduct(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No se encontraron productos.</Text>
          </View>
        }
      />

      {/* Modal simple de selección de destino */}
      {selectDestVisible && (
        <View style={styles.destOverlay}>
          <TouchableOpacity style={styles.destBackdrop} activeOpacity={1} onPress={() => setSelectDestVisible(false)} />
          <View style={styles.destCard}>
            <Text style={styles.destTitle}>¿Dónde agregar?</Text>
            <TouchableOpacity style={styles.destButtonPrimary} onPress={() => finalizeAdd('order')}>
              <Text style={styles.destButtonPrimaryText}>Agregar al Pedido en Curso</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.destButtonSecondary} onPress={() => finalizeAdd('cart')}>
              <Text style={styles.destButtonSecondaryText}>Agregar al carrito (nuevo pedido)</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonPlaceholder: {
    width: 44,
    height: 44,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  filtersRow: {
    gap: 10,
    paddingTop: 12,
  },
  filterChip: {
    paddingHorizontal: 14,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  filterChipActive: {
    backgroundColor: '#FF684D',
    borderColor: '#FF684D',
  },
  filterChipText: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  searchInput: {
    flex: 1,
    height: 44,
    marginLeft: 8,
    fontSize: 16,
    color: '#111827',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  destOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  destBackdrop: {
    flex: 1,
  },
  destCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  destTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  destButtonPrimary: {
    backgroundColor: '#DC2626',
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  destButtonPrimaryText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  destButtonSecondary: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
  },
  destButtonSecondaryText: {
    color: '#111827',
    fontWeight: '700',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
  },
});

export default ClienteProductosScreen;
