import React, { useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SellerProductListItem from "../../components/vendedor/SellerProductListItem";
import ClientSelectModal from "../../components/vendedor/ClientSelectModal";
import { VENDEDOR_CATEGORIES } from "../../constants/vendedorCategories";

// TODO: conectar con backend aquí para obtener clientes asignados al vendedor
const CLIENTS_DATA = [
  {
    id: "cli-001",
    name: "Supermercado El Ahorro",
    address: "Av. 6 de Diciembre 123",
    type: "Supermercado",
  },
  {
    id: "cli-002",
    name: "Minimarket La Esquina",
    address: "Calle Bolívar 234",
    type: "Minimarket",
  },
  {
    id: "cli-003",
    name: "Restaurant El Buen Sabor",
    address: "Calle García Moreno 890",
    type: "Restaurante",
  },
  {
    id: "cli-004",
    name: "Comisariato Los Andes",
    address: "Av. América y Naciones Unidas",
    type: "Comisariato",
  },
];

// TODO: conectar con backend aquí para cargar productos disponibles (stock, precios)
const PRODUCTS_DATA = [
  {
    id: "prod1",
    name: "Chorizo Premium",
    code: "CHO-001",
    categoryKey: "chorizos",
    categoryLabel: "Chorizos",
    price: 4.5,
    image: require("../../assets/images/cart-chorizo-premium.png"),
    stockStatus: "disponible",
    stockText: "Disponible",
    stockColor: "#2E7D32",
    stockQuantity: "40/60",
  },
  {
    id: "prod2",
    name: "Jamón Serrano",
    code: "JAM-001",
    categoryKey: "jamones",
    categoryLabel: "Jamones",
    price: 12.9,
    image: require("../../assets/images/offer-jamon-cocido.png"),
    stockStatus: "disponible",
    stockText: "Disponible",
    stockColor: "#2E7D32",
    stockQuantity: "35/50",
  },
  {
    id: "prod3",
    name: "Salchicha Frankfurt",
    code: "SAL-001",
    categoryKey: "salchichas",
    categoryLabel: "Salchichas",
    price: 3.2,
    image: require("../../assets/images/cart-salame.png"),
    stockStatus: "limitado",
    stockText: "Limitado",
    stockColor: "#F9A825",
    stockQuantity: "22/40",
  },
  {
    id: "prod4",
    name: "Pack Parrillero",
    code: "PROMO-002",
    categoryKey: "embutidos",
    categoryLabel: "Promociones",
    price: 18.5,
    image: require("../../assets/images/offer-pack-parrillero.png"),
    stockStatus: "disponible",
    stockText: "Disponible",
    stockColor: "#2E7D32",
    stockQuantity: "25/40",
  },
  {
    id: "prod5",
    name: "Salchicha Italiana",
    code: "SAL-200",
    categoryKey: "salchichas",
    categoryLabel: "Salchichas",
    price: 5.2,
    image: require("../../assets/images/login-header-meat.png"),
    stockStatus: "limitado",
    stockText: "Limitado",
    stockColor: "#F59E0B",
  },
];

const VendedorAgregarProductoScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("todos");
  const [selectedClient, setSelectedClient] = useState(CLIENTS_DATA[0]);
  const [clientModalVisible, setClientModalVisible] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products] = useState(PRODUCTS_DATA);

  useEffect(() => {
    if (route?.params?.client) {
      setSelectedClient(route.params.client);
      navigation.setParams?.({ client: undefined });
    }
  }, [route?.params?.client]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === "todos" || p.categoryKey === activeCategory;
      const term = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !term ||
        p.name.toLowerCase().includes(term) ||
        p.code.toLowerCase().includes(term) ||
        p.categoryLabel.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchTerm]);

  const orderTotal = useMemo(
    () => selectedProducts.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [selectedProducts]
  );

  const handleAddProduct = (product) => {
    setSelectedProducts((prev) => {
      const existing = prev.find((p) => p.product.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.product.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    // TODO: conectar con backend aquí para sincronizar productos agregados al pedido temporal
  };

  const handleConfirmOrder = () => {
    if (!selectedClient) {
      Alert.alert("Selecciona un cliente", "Debes elegir un cliente antes de continuar.");
      return;
    }
    if (!selectedProducts.length) {
      Alert.alert("Sin productos", "Agrega al menos un producto al pedido.");
      return;
    }

    const parentNav = navigation.getParent?.();
    const newOrder = {
      id: `PED-${Math.floor(Math.random() * 900 + 100)}`,
      client: selectedClient,
      date: new Date().toISOString(),
      items: selectedProducts,
      total: orderTotal,
      status: "Pendiente",
      paymentMethod: "Transferencia",
    };

    parentNav?.navigate("VendedorPedidos", { newOrder }) ??
      navigation.navigate("VendedorPedidos", { newOrder });
    setSelectedProducts([]);
    // TODO: conectar con backend aquí para crear el pedido real y obtener el ID definitivo
  };

  const renderHeader = () => (
    <View style={styles.headerWrapper}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Agregar Producto</Text>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            // TODO: conectar con backend aquí para filtros avanzados
            console.log("Abrir filtros avanzados");
          }}
        >
          <Ionicons name="options-outline" size={22} color="#111827" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={18} color="#9CA3AF" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar productos..."
          placeholderTextColor="#9CA3AF"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabs}>
        {VENDEDOR_CATEGORIES.map((category) => {
          const active = activeCategory === category.key;
          return (
            <TouchableOpacity
              key={category.key}
              style={[styles.tabChip, active && styles.tabChipActive]}
              onPress={() => setActiveCategory(category.key)}
            >
              <Text style={[styles.tabChipText, active && styles.tabChipTextActive]}>{category.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <TouchableOpacity
        style={styles.selectedClientCard}
        activeOpacity={0.9}
        onPress={() => setClientModalVisible(true)}
      >
        <View>
          <Text style={styles.selectedClientLabel}>Cliente seleccionado</Text>
          <Text style={styles.selectedClientName}>{selectedClient.name}</Text>
          <Text style={styles.selectedClientAddress}>{selectedClient.address}</Text>
        </View>
        <Text style={styles.changeClientText}>Cambiar</Text>
      </TouchableOpacity>

      <Text style={styles.listTitle}>Productos disponibles</Text>
    </View>
  );

  const renderSummary = () => {
    if (!selectedProducts.length) return <View style={{ height: 40 }} />;
    return (
      <View style={styles.summaryCard}>
        <View>
          <Text style={styles.summaryTitle}>{selectedProducts.length} productos seleccionados</Text>
          <Text style={styles.summarySubtitle}>Total estimado ${orderTotal.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.summaryButton} onPress={handleConfirmOrder}>
          <Text style={styles.summaryButtonText}>Confirmar pedido</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SellerProductListItem
            product={item}
            onAdd={() => handleAddProduct(item)}
          />
        )}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderSummary}
        contentContainerStyle={[styles.listContent, { paddingTop: insets.top + 12 }]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.emptyText}>No se encontraron productos.</Text>}
      />
      <ClientSelectModal
        visible={clientModalVisible}
        clients={CLIENTS_DATA}
        selectedClientId={selectedClient.id}
        onClose={() => setClientModalVisible(false)}
        onSelect={(client) => {
          setSelectedClient(client);
          // TODO: conectar con backend aquí para vincular el cliente al pedido actual en progreso
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  headerWrapper: {
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: "#111827",
  },
  tabs: {
    marginTop: 16,
  },
  selectedClientCard: {
    marginTop: 18,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedClientLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    textTransform: "uppercase",
  },
  selectedClientName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginTop: 4,
  },
  selectedClientAddress: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },
  changeClientText: {
    color: "#F55A3C",
    fontWeight: "600",
  },
  tabChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginRight: 10,
    backgroundColor: "#FFFFFF",
  },
  tabChipActive: {
    backgroundColor: "#F55A3C",
    borderColor: "#F55A3C",
  },
  tabChipText: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "600",
  },
  tabChipTextActive: {
    color: "#FFFFFF",
  },
  listTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 40,
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  summarySubtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },
  summaryButton: {
    backgroundColor: "#F55A3C",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
  },
  summaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});

export default VendedorAgregarProductoScreen;
