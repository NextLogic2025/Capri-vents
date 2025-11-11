import React, { useMemo, useState, useCallback } from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import SellerCatalogProductItem from "../../components/vendedor/SellerCatalogProductItem";
import { VENDEDOR_CATEGORIES } from "../../constants/vendedorCategories";
import { VENDEDOR_TAB_BAR_STYLE } from "../../navigation/tabStyles";

const CATALOG_PRODUCTS = [
  {
    id: "cat-1",
    name: "Chorizo Parrillero Premium",
    code: "CHO-001",
    categoryKey: "chorizos",
    categoryLabel: "Chorizos",
    price: 12.99,
    unit: "kg",
    stockLabel: "45 kg",
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
    stockLabel: "32 kg",
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
    stockLabel: "58 kg",
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

const VendedorCatalogoProductosScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("todos");

  useFocusEffect(
    useCallback(() => {
      const parent = navigation.getParent?.();
      parent?.setOptions({ tabBarStyle: { display: "none" } });
      return () => parent?.setOptions({ tabBarStyle: VENDEDOR_TAB_BAR_STYLE });
    }, [navigation])
  );

  // TODO: conectar con backend aquí para obtener catálogo real y stock actualizado
  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return CATALOG_PRODUCTS.filter((product) => {
      const matchesCategory = activeCategory === "todos" || product.categoryKey === activeCategory;
      const matchesSearch =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.code.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

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

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={VENDEDOR_CATEGORIES}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.tabsWrapper}
        renderItem={({ item }) => {
          const active = activeCategory === item.key;
          return (
            <TouchableOpacity
              style={[styles.tabChip, active && styles.tabChipActive]}
              onPress={() => setActiveCategory(item.key)}
            >
              <Text style={[styles.tabChipText, active && styles.tabChipTextActive]}>{item.label}</Text>
            </TouchableOpacity>
          );
        }}
      />

      <Text style={styles.productCountText}>{filteredProducts.length} productos encontrados</Text>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <SellerCatalogProductItem
            product={item}
            onPressViewMore={() => {
              // TODO: conectar con backend aquí para ver detalle del producto
              console.log("Ver detalles del producto", item.name);
            }}
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No se encontraron productos.</Text>}
      />
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
  tabsWrapper: {
    paddingVertical: 16,
  },
  tabChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    marginRight: 10,
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
  productCountText: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 30,
  },
  emptyText: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 40,
  },
});

export default VendedorCatalogoProductosScreen;
