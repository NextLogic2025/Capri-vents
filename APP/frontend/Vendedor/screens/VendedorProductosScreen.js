import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import colors from '../../theme/colors';
import globalStyles from '../../theme/styles';
import { useAppContext } from '../../context/AppContext';
import EmptyState from '../../Cliente/components/EmptyState';
import ProductCard from '../../Cliente/components/ProductCard';
import LogoCafrilosa from '../../assets/images/logo-cafrilosa.png';

const VendedorProductosScreen = () => {
  const navigation = useNavigation();
  const { products = [] } = useAppContext();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todos');

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(products.map((product) => product.category).filter(Boolean))
    );
    return ['Todos', ...unique];
  }, [products]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchCategory = category === 'Todos' || product.category === category;
      const matchSearch = product.name.toLowerCase().includes(query);
      return matchCategory && matchSearch;
    });
  }, [products, search, category]);

  const renderProduct = ({ item }) => (
    <ProductCard
      product={item}
      showCartButton={false}
      onPress={(product) => navigation.navigate('VendedorProductDetail', { product })}
    />
  );

  const renderHeader = () => (
    <View style={styles.searchHeader}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color={colors.muted}
          style={{ marginHorizontal: 8 }}
        />
        <TextInput
          placeholder="Buscar por nombre..."
          placeholderTextColor={colors.muted}
          style={styles.searchInput}
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
          const active = category === cat;
          return (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => setCategory(cat)}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
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
            <Text style={styles.headerTitle}>Productos</Text>
            <Text style={styles.headerSubtitle}>Catálogo de productos</Text>
          </View>
          <View style={styles.headerIcon}>
            <Ionicons name="pricetags" size={32} color={colors.white} />
          </View>
        </View>
      </LinearGradient>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderHeader}
        renderItem={renderProduct}
        ListEmptyComponent={
          <EmptyState
            title="Sin productos"
            subtitle="Aún no hay productos que coincidan con tu búsqueda."
            iconName="pricetag-outline"
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
    paddingBottom: 120,
    paddingHorizontal: 16,
  },
  searchHeader: {
    marginBottom: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    color: colors.textDark,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  filterScroll: {
    paddingVertical: 12,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  chipText: {
    fontWeight: '600',
    color: colors.textDark,
  },
  chipTextActive: {
    color: colors.white,
  },
});

export default VendedorProductosScreen;
