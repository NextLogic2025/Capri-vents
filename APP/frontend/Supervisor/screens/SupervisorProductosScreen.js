import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';
import SupervisorHeader from '../components/SupervisorHeader';
import SupervisorProductCard from '../components/SupervisorProductCard';
import PrimaryButton from '../../Cliente/components/PrimaryButton';
import globalStyles from '../../theme/styles';
import colors from '../../theme/colors';
import { useAppContext } from '../../context/AppContext';

const QUICK_FILTERS = ['Todos', 'Bajo stock', 'Pronto a vencer'];

const SupervisorProductosScreen = () => {
  const { supervisorUser, products, stockAlerts } = useAppContext();
  const [categoryFilter, setCategoryFilter] = useState('Todas');
  const [quickFilter, setQuickFilter] = useState('Todos');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [priceInput, setPriceInput] = useState('');
  const [stockInput, setStockInput] = useState('');

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((product) => product.category)));
    return ['Todas', ...unique];
  }, [products]);

  const lowStockIds = useMemo(
    () => new Set((stockAlerts.lowStock || []).map((product) => product.id)),
    [stockAlerts.lowStock]
  );
  const nearExpirationIds = useMemo(
    () => new Set((stockAlerts.nearExpiration || []).map((product) => product.id)),
    [stockAlerts.nearExpiration]
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = categoryFilter === 'Todas' || product.category === categoryFilter;
      const matchesQuick =
        quickFilter === 'Todos' ||
        (quickFilter === 'Bajo stock' && lowStockIds.has(product.id)) ||
        (quickFilter === 'Pronto a vencer' && nearExpirationIds.has(product.id));
      return matchesCategory && matchesQuick;
    });
  }, [products, categoryFilter, quickFilter, lowStockIds, nearExpirationIds]);

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setPriceInput(product.price?.toString() || '');
    setStockInput(product.stockActual?.toString() || '');
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    setPriceInput('');
    setStockInput('');
  };

  return (
    <View style={globalStyles.screen}>
      <SupervisorHeader
        name={supervisorUser?.name}
        title="Bienvenido"
        subtitle="Productos & Stock"
        notificationsCount={0}
        onPressNotifications={() => {
          // BACKEND: mostrar alertas o comunicados del inventario.
        }}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[globalStyles.contentContainer, { paddingTop: 8 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.filterRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.filterChip,
                  categoryFilter === category && styles.filterChipActive,
                ]}
                onPress={() => setCategoryFilter(category)}
              >
                <Text
                  style={[
                    styles.filterText,
                    categoryFilter === category && styles.filterTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={[styles.filterRow, { marginTop: 8 }]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {QUICK_FILTERS.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterChip,
                  quickFilter === filter && styles.filterChipActive,
                ]}
                onPress={() => setQuickFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterText,
                    quickFilter === filter && styles.filterTextActive,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Alertas de stock</Text>
        </View>
        {stockAlerts.lowStock?.map((product) => (
          <SupervisorProductCard
            key={product.id}
            product={product}
            lowStock
            onPress={() => openProductModal(product)}
          />
        ))}
        {stockAlerts.nearExpiration?.map((product) => (
          <SupervisorProductCard
            key={`${product.id}-exp`}
            product={product}
            nearExpiration
            onPress={() => openProductModal(product)}
          />
        ))}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Todos los productos</Text>
        </View>
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SupervisorProductCard
              product={item}
              lowStock={lowStockIds.has(item.id)}
              nearExpiration={nearExpirationIds.has(item.id)}
              onPress={() => openProductModal(item)}
            />
          )}
          scrollEnabled={false}
          ListEmptyComponent={<Text style={styles.emptyText}>No hay productos disponibles.</Text>}
        />
      </ScrollView>

      <Modal visible={!!selectedProduct} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedProduct?.name}</Text>
            <Text style={styles.modalSubtitle}>{selectedProduct?.category}</Text>
            <Text>Presentación: {selectedProduct?.presentation}</Text>
            <Text>Precio: $ {(selectedProduct?.price ?? 0).toFixed(2)}</Text>
            <Text>
              Stock: {selectedProduct?.stockActual ?? 0} / {selectedProduct?.stockMax ?? 0}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Editar precio"
              keyboardType="numeric"
              value={priceInput}
              onChangeText={setPriceInput}
            />
            <PrimaryButton
              title="Editar precio"
              onPress={() => {
                // BACKEND: actualizar precio del producto.
                Alert.alert('Precio guardado', 'Se sincronizará con el catálogo.');
              }}
            />

            <TextInput
              style={[styles.input, { marginTop: 10 }]}
              placeholder="Ajustar stock"
              keyboardType="numeric"
              value={stockInput}
              onChangeText={setStockInput}
            />
            <PrimaryButton
              title="Ajustar stock"
              onPress={() => {
                // BACKEND: registrar movimiento de inventario.
                Alert.alert('Stock ajustado', 'Movimiento registrado (mock).');
              }}
              style={{ marginTop: 8 }}
            />

            <PrimaryButton
              title="Activar / Inactivar producto"
              onPress={() => {
                // BACKEND: cambiar flag de activo para el producto.
                Alert.alert('Estado actualizado', 'Se cambiará el estado del producto.');
              }}
              style={{ marginTop: 8 }}
            />

            <PrimaryButton title="Cerrar" onPress={closeProductModal} style={{ marginTop: 8 }} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  filterRow: {
    marginBottom: 4,
  },
  filterChip: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 10,
  },
  filterChipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  filterText: {
    color: colors.textDark,
    fontWeight: '600',
  },
  filterTextActive: {
    color: colors.white,
  },
  sectionHeader: {
    marginTop: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textMuted,
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 18,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  modalSubtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.borderSoft,
  },
});

export default SupervisorProductosScreen;
