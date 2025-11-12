import React, { useMemo, useState, useCallback } from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import UiSectionTitle from "../../components/ui/UiSectionTitle";
import UiProductCardVendor from "../../components/ui/UiProductCardVendor";
import UiPromoCardWide from "../../components/ui/UiPromoCardWide";
import UiSearchBar from "../../components/ui/UiSearchBar";
import UiTabs from "../../components/ui/UiTabs";

const CATALOG_PRODUCTS = [
  {
    id: "cat-1",
    name: "Chorizo Parrillero Premium",
    code: "CHO-001",
    categoryKey: "chorizos",
    categoryLabel: "Chorizos",
    price: 12.99,
    unit: "kg",
    stockLabel: "40/60",
    image: require("../../assets/images/cart-chorizo-premium.png"),
  },
  {
    id: "cat-2",
    name: "Jamón Serrano Reserva",
    code: "JAM-001",
    categoryKey: "jamones",
    categoryLabel: "Jamones",
    price: 24.9,
    unit: "kg",
    stockLabel: "32/64",
    image: require("../../assets/images/cart-jamon-cocido.png"),
  },
  {
    id: "cat-3",
    name: "Salchicha Frankfurt",
    code: "SAL-001",
    categoryKey: "salchichas",
    categoryLabel: "Salchichas",
    price: 6.5,
    unit: "kg",
    stockLabel: "58/100",
    image: require("../../assets/images/cart-salame.png"),
  },
  {
    id: "cat-4",
    name: "Pack Parrillero Familiar",
    code: "PROMO-005",
    categoryKey: "embutidos",
    categoryLabel: "Embutidos",
    price: 18.75,
    unit: "pack",
    stockLabel: "20 packs",
    image: require("../../assets/images/offer-pack-parrillero.png"),
  },
];

// TODO: conectar con backend aquí para promociones vigentes por canal/vendedor.
const PROMOS_DATA = [
  {
    id: 'PR-1',
    title: 'Jamón Serrano Reserva',
    subtitle: '2x1 en segunda unidad • Hasta 10 Nov',
    image: require('../../assets/images/offer-jamon-cocido.png'),
    price: '$12.90',
    badge: { type: 'deal', text: '2x1' },
    productId: 'JAM-001',
  },
  {
    id: 'PR-2',
    title: 'Chorizo Premium',
    subtitle: '-50% en pack familiar',
    image: require('../../assets/images/offer-pack-parrillero.png'),
    price: '$4.50',
    badge: { type: 'percent', text: '-50%' },
    productId: 'CHO-001',
  },
];

const TABS = [
  { key: 'productos', title: 'Productos' },
  { key: 'promos', title: 'Promociones' },
];

const VendedorCatalogoProductosScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState('productos');

  useFocusEffect(
    useCallback(() => {
      const parent = navigation.getParent?.();
      if (parent?.setOptions) {
        parent.setOptions({ tabBarStyle: { display: "none" } });
        return () => parent.setOptions({ tabBarStyle: undefined });
      }
    }, [navigation])
  );

  // TODO: conectar con backend aquí para obtener catálogo real y stock actualizado
  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return CATALOG_PRODUCTS;
    return CATALOG_PRODUCTS.filter((product) =>
        product.name.toLowerCase().includes(term) ||
        product.code.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  const filteredPromos = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return PROMOS_DATA;
    return PROMOS_DATA.filter((p) => p.title.toLowerCase().includes(term));
  }, [searchTerm]);

  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top + 8 }]}> 
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Catálogo de Productos</Text>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={() => {
            // TODO: conectar con backend aquí para filtros avanzados
            console.log("Abrir filtros del catálogo");
          }}
        >
          <Ionicons name="options-outline" size={22} color="#111827" />
        </TouchableOpacity>
      </View>

      <UiSectionTitle title="Catálogo" />

      <UiSearchBar
        placeholder="Buscar en productos o promos..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={{ marginBottom: 12 }}
      />

      <UiTabs tabs={TABS} initialTab={activeTab} activeKey={activeTab} onTabChange={(key) => setActiveTab(key)} style={{ marginBottom: 12 }} />

      {activeTab === 'productos' ? (
        <>
          <Text style={styles.productCountText}>{filteredProducts.length} productos encontrados</Text>
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <UiProductCardVendor
                image={item.image}
                category={item.categoryLabel}
                title={item.name}
                price={`$${item.price}`}
                stockLabel={`Stock: ${item.stockLabel}`}
                onPressDetails={() => {
                  // TODO: navegación a detalle de producto por ID
                  navigation.navigate('VendedorProductoDetalle', {
                    product: {
                      id: item.id,
                      name: item.name,
                      category: item.categoryLabel,
                      price: item.price,
                      image: item.image,
                      rating: 4.6,
                      reviewsCount: 80,
                      description: 'Detalle de catálogo del vendedor.',
                      characteristics: ['Unidad: ' + item.unit, 'Código: ' + item.code],
                      stock: item.stockLabel,
                    },
                  });
                }}
              />
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>No se encontraron productos.</Text>}
          />
        </>
      ) : (
        <>
          <UiSectionTitle title="Promociones" rightLabel="Ver todas" />
          <Text style={styles.productCountText}>{filteredPromos.length} promociones encontradas</Text>
          <FlatList
            data={filteredPromos}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <UiPromoCardWide
                image={item.image}
                title={item.title}
                subtitle={item.subtitle}
                price={item.price}
                badge={item.badge}
                onPressDetails={() => {
                  // TODO: backend: promos vigentes para vendedor y navegación a detalle
                  navigation.navigate('VendedorProductoDetalle', {
                    product: {
                      id: item.productId,
                      name: item.title,
                      category: 'Promoción',
                      price: item.price,
                      image: item.image,
                      rating: 4.6,
                      reviewsCount: 80,
                      description: 'Detalle de promoción.',
                      characteristics: ['Código: ' + (item.productId || 'PR-REF')],
                      stock: '',
                    },
                  });
                }}
              />
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>No se encontraron promociones.</Text>}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: "#111827",
  },
  tabsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    marginBottom: 8,
  },
  tabItem: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 18,
    borderWidth: 1,
  },
  tabItemActive: {
    backgroundColor: '#F55A3C',
    borderColor: '#F55A3C',
  },
  tabItemInactive: {
    backgroundColor: '#fff',
    borderColor: '#E0E0E0',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#fff',
  },
  tabTextInactive: {
    color: '#777',
  },
  productCountText: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 30,
    paddingVertical: 12,
  },
  emptyText: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 40,
  },
});

export default VendedorCatalogoProductosScreen;