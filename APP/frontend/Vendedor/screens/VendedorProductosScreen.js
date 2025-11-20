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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import globalStyles from '../../theme/styles';
import { useAppContext } from '../../context/AppContext';
import EmptyState from '../../Cliente/components/EmptyState';
import ScreenHeader from '../../Cliente/components/ScreenHeader';
import LogoCafrilosa from '../../assets/images/logo-cafrilosa.png';

const VendedorProductosScreen = () => {
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
    <View style={styles.card}>
      <Image
        source={item.image || LogoCafrilosa}
        defaultSource={LogoCafrilosa}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.cardBody}>
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.presentation}>{item.presentation}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <View style={styles.stockRow}>
          <Ionicons
            name={item.stockActual > 0 ? 'checkmark-circle' : 'close-circle'}
            size={16}
            color={item.stockActual > 0 ? colors.success : colors.danger}
          />
          <Text style={styles.stockText}>
            Stock: {item.stockActual}/{item.stockMax}
          </Text>
        </View>
      </View>
    </View>
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
      {/* HEADER: solo título y subtítulo */}
      <ScreenHeader
        title="Productos"
        sectionLabel="Catálogo de productos"
      />

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
    marginTop: 14,
    paddingVertical: 4,
    ...globalStyles.shadow,
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
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    marginRight: 10,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontWeight: '600',
    color: colors.textDark,
  },
  chipTextActive: {
    color: colors.white,
  },
  card: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F2C3BC',
    marginBottom: 16,
    ...globalStyles.shadow,
  },
  image: {
    width: '100%',
    height: 110,
  },
  cardBody: {
    padding: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textDark,
  },
  presentation: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 3,
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
    marginTop: 6,
  },
  stockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  stockText: {
    marginLeft: 6,
    fontSize: 12,
    color: colors.textDark,
    fontWeight: '600',
  },
});

export default VendedorProductosScreen;
