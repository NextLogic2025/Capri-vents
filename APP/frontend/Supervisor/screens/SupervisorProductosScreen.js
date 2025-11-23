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
  StatusBar,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import SupervisorProductCard from '../components/SupervisorProductCard';
import colors from '../../theme/colors';
import { useAppContext } from '../../context/AppContext';

const QUICK_FILTERS = ['Todos', 'Bajo stock', 'Pronto a vencer'];

const PRODUCT_TYPES = [
  'Embutidos',
  'Carnes Frías',
  'Quesos',
  'Ahumados',
  'Especiales',
  'Otros',
];

const SupervisorProductosScreen = () => {
  const { products, stockAlerts } = useAppContext();

  // Filters
  const [categoryFilter, setCategoryFilter] = useState('Todas');
  const [quickFilter, setQuickFilter] = useState('Todos');

  // Product modal (edit)
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [priceInput, setPriceInput] = useState('');
  const [stockInput, setStockInput] = useState('');

  // Create product modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    type: '',
    weight: '',
    stock: '',
    price: '',
    image: null,
  });

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

  const openCreateModal = () => {
    setNewProduct({
      name: '',
      type: '',
      weight: '',
      stock: '',
      price: '',
      image: null,
    });
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
  };

  const pickImage = async () => {
    // Solicitar permisos
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permisos requeridos', 'Se necesitan permisos para acceder a la galería.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setNewProduct((prev) => ({ ...prev, image: result.assets[0].uri }));
    }
  };

  const takePicture = async () => {
    // Solicitar permisos de cámara
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permisos requeridos', 'Se necesitan permisos para acceder a la cámara.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setNewProduct((prev) => ({ ...prev, image: result.assets[0].uri }));
    }
  };

  const handleCreateProduct = () => {
    // Validaciones
    if (!newProduct.name.trim()) {
      Alert.alert('Error', 'El nombre del producto es obligatorio');
      return;
    }
    if (!newProduct.type) {
      Alert.alert('Error', 'Debe seleccionar un tipo de producto');
      return;
    }
    if (!newProduct.weight.trim()) {
      Alert.alert('Error', 'El peso es obligatorio');
      return;
    }
    if (!newProduct.stock.trim() || isNaN(parseInt(newProduct.stock))) {
      Alert.alert('Error', 'El stock debe ser un número válido');
      return;
    }
    if (!newProduct.price.trim() || isNaN(parseFloat(newProduct.price))) {
      Alert.alert('Error', 'El precio debe ser un número válido');
      return;
    }

    // BACKEND: Aquí se enviaría a la API para crear el producto
    Alert.alert(
      'Producto creado',
      `Producto "${newProduct.name}" creado exitosamente.\n\nSe sincronizará con el catálogo.`,
      [{ text: 'OK', onPress: closeCreateModal }]
    );
  };

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
            <Text style={styles.headerTitle}>Productos & Stock</Text>
            <Text style={styles.headerSubtitle}>
              {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
            </Text>
          </View>
          <View style={styles.headerIcon}>
            <Ionicons name="pricetags" size={32} color={colors.white} />
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Filtros de Categoría */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>
            <Ionicons name="grid-outline" size={14} color={colors.textMuted} /> Categoría
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => {
              const isActive = categoryFilter === category;
              return (
                <TouchableOpacity
                  key={category}
                  style={[styles.filterChip, isActive && styles.filterChipActive]}
                  onPress={() => setCategoryFilter(category)}
                >
                  <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Filtros Rápidos */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>
            <Ionicons name="flash-outline" size={14} color={colors.textMuted} /> Filtro rápido
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {QUICK_FILTERS.map((filter) => {
              const isActive = quickFilter === filter;
              return (
                <TouchableOpacity
                  key={filter}
                  style={[styles.filterChip, isActive && styles.filterChipActive]}
                  onPress={() => setQuickFilter(filter)}
                >
                  <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                    {filter}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Alertas de Stock */}
        {(stockAlerts.lowStock?.length > 0 || stockAlerts.nearExpiration?.length > 0) && (
          <>
            <View style={styles.sectionHeader}>
              <Ionicons name="warning" size={20} color={colors.danger} />
              <Text style={styles.sectionTitle}>Alertas de Stock</Text>
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
          </>
        )}

        {/* Todos los Productos */}
        <View style={styles.sectionHeader}>
          <Ionicons name="list" size={20} color={colors.primary} />
          <Text style={styles.sectionTitle}>Todos los Productos</Text>
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
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="apps-outline" size={64} color={colors.textMuted} />
              <Text style={styles.emptyTitle}>Sin productos</Text>
              <Text style={styles.emptyText}>No hay productos que coincidan con los filtros.</Text>
            </View>
          }
        />
      </ScrollView>

      {/* Botón FAB para Agregar Producto */}
      <TouchableOpacity style={styles.fab} onPress={openCreateModal}>
        <Ionicons name="add" size={30} color={colors.white} />
      </TouchableOpacity>

      {/* MODAL: Editar Producto */}
      <Modal visible={!!selectedProduct} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Ionicons name="create" size={28} color={colors.primary} />
              <Text style={styles.modalTitle}>Editar Producto</Text>
            </View>
            <Text style={styles.modalSubtitle}>{selectedProduct?.name}</Text>

            <View style={styles.detailGrid}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Categoría</Text>
                <Text style={styles.detailValue}>{selectedProduct?.category}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Presentación</Text>
                <Text style={styles.detailValue}>{selectedProduct?.presentation}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Stock actual</Text>
                <Text style={styles.detailValue}>
                  {selectedProduct?.stockActual} / {selectedProduct?.stockMax}
                </Text>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Precio</Text>
              <TextInput
                style={styles.input}
                placeholder="Nuevo precio"
                keyboardType="decimal-pad"
                value={priceInput}
                onChangeText={setPriceInput}
              />

              <Text style={styles.inputLabel}>Ajustar Stock</Text>
              <TextInput
                style={styles.input}
                placeholder="Cantidad de stock"
                keyboardType="number-pad"
                value={stockInput}
                onChangeText={setStockInput}
              />
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: colors.primary }]}
                onPress={() => {
                  Alert.alert('Cambios guardados', 'El producto se ha actualizado.');
                  closeProductModal();
                }}
              >
                <Ionicons name="save" size={20} color={colors.white} />
                <Text style={styles.modalButtonText}>Guardar Cambios</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: colors.background }]}
                onPress={closeProductModal}
              >
                <Text style={[styles.modalButtonText, { color: colors.textDark }]}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL: Crear Nuevo Producto */}
      <Modal visible={showCreateModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <ScrollView contentContainerStyle={styles.modalScrollContent}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Ionicons name="add-circle" size={28} color={colors.primary} />
                <Text style={styles.modalTitle}>Nuevo Producto</Text>
              </View>
              <Text style={styles.modalSubtitle}>Complete la información del producto</Text>

              {/* Imagen del Producto */}
              <View style={styles.imageSection}>
                <Text style={styles.inputLabel}>Imagen del Producto</Text>
                {newProduct.image ? (
                  <View style={styles.imagePreviewContainer}>
                    <Image source={{ uri: newProduct.image }} style={styles.imagePreview} />
                    <TouchableOpacity
                      style={styles.removeImageButton}
                      onPress={() => setNewProduct((prev) => ({ ...prev, image: null }))}
                    >
                      <Ionicons name="close-circle" size={24} color={colors.danger} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.imagePickerRow}>
                    <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
                      <Ionicons name="images" size={30} color={colors.primary} />
                      <Text style={styles.imagePickerText}>Galería</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imagePickerButton} onPress={takePicture}>
                      <Ionicons name="camera" size={30} color={colors.primary} />
                      <Text style={styles.imagePickerText}>Cámara</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nombre del Producto *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ej: Jamón de Pierna"
                  value={newProduct.name}
                  onChangeText={(text) => setNewProduct((prev) => ({ ...prev, name: text }))}
                />

                <Text style={styles.inputLabel}>Tipo de Producto *</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeSelector}>
                  {PRODUCT_TYPES.map((type) => {
                    const isSelected = newProduct.type === type;
                    return (
                      <TouchableOpacity
                        key={type}
                        style={[styles.typeChip, isSelected && styles.typeChipActive]}
                        onPress={() => setNewProduct((prev) => ({ ...prev, type }))}
                      >
                        <Text style={[styles.typeChipText, isSelected && styles.typeChipTextActive]}>
                          {type}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>

                <Text style={styles.inputLabel}>Peso/Presentación *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ej: 500g, 1kg, 2.5kg"
                  value={newProduct.weight}
                  onChangeText={(text) => setNewProduct((prev) => ({ ...prev, weight: text }))}
                />

                <Text style={styles.inputLabel}>Stock Inicial *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Cantidad en unidades"
                  keyboardType="number-pad"
                  value={newProduct.stock}
                  onChangeText={(text) => setNewProduct((prev) => ({ ...prev, stock: text }))}
                />

                <Text style={styles.inputLabel}>Precio Unitario ($) *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0.00"
                  keyboardType="decimal-pad"
                  value={newProduct.price}
                  onChangeText={(text) => setNewProduct((prev) => ({ ...prev, price: text }))}
                />
              </View>

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: colors.success || colors.primary }]}
                  onPress={handleCreateProduct}
                >
                  <Ionicons name="checkmark-circle" size={20} color={colors.white} />
                  <Text style={styles.modalButtonText}>Crear Producto</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: colors.background }]}
                  onPress={closeCreateModal}
                >
                  <Text style={[styles.modalButtonText, { color: colors.textDark }]}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: '700',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  filterChip: {
    borderWidth: 1.5,
    borderColor: colors.borderSoft,
    borderRadius: 25,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginRight: 10,
    backgroundColor: colors.white,
  },
  filterChipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    color: colors.textDark,
    fontWeight: '600',
  },
  filterTextActive: {
    color: colors.white,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
    marginLeft: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textDark,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    maxWidth: 280,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 90,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
  },
  modalScrollContent: {
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.darkText,
    marginLeft: 12,
  },
  modalSubtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 20,
    fontWeight: '600',
  },
  detailGrid: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSoft,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.textMuted,
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 14,
    color: colors.darkText,
    fontWeight: '700',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.darkText,
    marginBottom: 8,
    marginTop: 8,
  },
  input: {
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    color: colors.textDark,
    fontSize: 14,
  },
  imageSection: {
    marginBottom: 16,
  },
  imagePickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imagePickerButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.borderSoft,
    borderStyle: 'dashed',
    marginHorizontal: 6,
  },
  imagePickerText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  imagePreviewContainer: {
    position: 'relative',
    alignSelf: 'center',
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 12,
    backgroundColor: colors.background,
  },
  removeImageButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: colors.white,
    borderRadius: 12,
  },
  typeSelector: {
    marginBottom: 8,
  },
  typeChip: {
    borderWidth: 1.5,
    borderColor: colors.borderSoft,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: colors.white,
  },
  typeChipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  typeChipText: {
    fontSize: 13,
    color: colors.textDark,
    fontWeight: '600',
  },
  typeChipTextActive: {
    color: colors.white,
  },
  modalActions: {
    marginTop: 8,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    marginBottom: 10,
  },
  modalButtonText: {
    color: colors.white,
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.5,
    marginLeft: 8,
  },
});

export default SupervisorProductosScreen;
