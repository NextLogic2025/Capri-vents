import React, { useMemo, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ProductListItem from "../../components/ui/ProductListItem";

const productImage = require("../../assets/images/login-header-meat.png");

// TODO: conectar con backend aqui para cargar promociones dinamicas y stock.
const products = [
  {
    id: "pro-1",
    category: "Promociones",
    name: "Pack Parrillero Familiar 1.5kg",
    price: 24.9,
    oldPrice: 29.9,
    image: productImage,
    stock: "20/30",
    weight: "1.5kg",
    rating: 4.7,
    reviewsCount: 120,
    description: "Pack parrillero con seleccion de chorizos, morcillas y salchichas.",
    characteristics: ["Incluye 3 variedades", "Ideal para 6 personas"],
  },
  {
    id: "pro-2",
    category: "Promociones",
    name: "Combo Jamones Premium 800g",
    price: 18.75,
    image: productImage,
    stock: "18/25",
    weight: "800g",
    rating: 4.6,
    reviewsCount: 88,
    description: "Combo de jamón serrano e iberico listo para picadas.",
    characteristics: ["Incluye 2 tipos", "Empaque al vacio"],
  },
  {
    id: "pro-3",
    category: "Promociones",
    name: "Kit Desayuno Embutidos 600g",
    price: 12.5,
    image: productImage,
    stock: "32/45",
    weight: "600g",
    rating: 4.4,
    reviewsCount: 60,
    description: "Kit para desayunos con salchichas y jamón cocido.",
    characteristics: ["Incluye salsa", "Listo para calentar"],
  },
  {
    id: "pro-4",
    category: "Promociones",
    name: "Duo Chorizos Picantes 900g",
    price: 16.4,
    image: productImage,
    stock: "26/40",
    weight: "900g",
    rating: 4.5,
    reviewsCount: 72,
    description: "Duo de chorizos picantes y ahumados para amantes del sabor intenso.",
    characteristics: ["Dos niveles de picante", "Incluye receta"],
  },
  {
    id: "pro-5",
    category: "Promociones",
    name: "Pack Fiesta Queso + Jamón 1kg",
    price: 21.3,
    image: productImage,
    stock: "22/32",
    weight: "1kg",
    rating: 4.6,
    reviewsCount: 65,
    description: "Pack mixto de quesos y jamones para celebraciones.",
    characteristics: ["Listo para servir", "Incluye pinchos"],
  },
  {
    id: "pro-6",
    category: "Promociones",
    name: "Combo Light Pavo & Pollo 700g",
    price: 14.8,
    image: productImage,
    stock: "30/45",
    weight: "700g",
    rating: 4.2,
    reviewsCount: 48,
    description: "Combo bajo en grasa con embutidos de pavo y pollo.",
    characteristics: ["Menos de 5% grasa", "Sin gluten"],
  },
  {
    id: "pro-7",
    category: "Promociones",
    name: "Pack Degustacion Gourmet 900g",
    price: 27.9,
    image: productImage,
    stock: "16/25",
    weight: "900g",
    rating: 4.9,
    reviewsCount: 95,
    description: "Seleccion gourmet de embutidos premium.",
    characteristics: ["Incluye folleto maridaje", "Produccion limitada"],
  },
  {
    id: "pro-8",
    category: "Promociones",
    name: "Combo Kids Mini Salchichas 500g",
    price: 9.6,
    image: productImage,
    stock: "40/60",
    weight: "500g",
    rating: 4.3,
    reviewsCount: 40,
    description: "Mini salchichas pensadas para loncheras infantiles.",
    characteristics: ["Sin picante", "Incluye stickers"],
  },
  {
    id: "pro-9",
    category: "Promociones",
    name: "Pack Parrilla Express 1kg",
    price: 19.95,
    image: productImage,
    stock: "28/38",
    weight: "1kg",
    rating: 4.5,
    reviewsCount: 78,
    description: "Pack express para parrillas rapidas.",
    characteristics: ["Coccion 15 minutos", "Incluye salsa chimichurri"],
  },
  {
    id: "pro-10",
    category: "Promociones",
    name: "Combo Deluxe Jamón + Queso 1kg",
    price: 29.5,
    image: productImage,
    stock: "14/22",
    weight: "1kg",
    rating: 4.8,
    reviewsCount: 88,
    description: "Combo deluxe con jamones curados y quesos añejos.",
    characteristics: ["Incluye tabla reutilizable", "Ideal para regalos"],
  },
];

const ClientePromocionesScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [quantities, setQuantities] = useState({});
  const insets = useSafeAreaInsets();

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;
    return products.filter((product) =>
      product.name.toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [search]);

  const increaseQuantity = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decreaseQuantity = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max((prev[id] || 0) - 1, 0) }));
  };

  const handleAdd = (product) => {
    const quantity = quantities[product.id] || 0;
    if (quantity === 0) {
      Alert.alert("Selecciona una cantidad", "Agrega al menos 1 unidad para continuar");
      return;
    }
    console.log("Agregar promocion al carrito:", product.name, "x", quantity, "Stock:", product.stock);
    // TODO: conectar con backend o estado global para agregar productos al carrito y actualizar stock.
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 12 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Promociones</Text>
          <View style={styles.backButtonPlaceholder} />
        </View>

        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={18} color="#9CA3AF" />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar productos..."
              placeholderTextColor="#9CA3AF"
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={18} color="#4B5563" />
          </TouchableOpacity>
        </View>

        {filteredProducts.map((product) => (
          <ProductListItem
            key={product.id}
            product={product}
            quantity={quantities[product.id] || 0}
            onIncrease={() => increaseQuantity(product.id)}
            onDecrease={() => decreaseQuantity(product.id)}
            onAdd={() => handleAdd(product)}
            onPress={() => navigation.navigate("ClienteProductoDetalle", { product })}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonPlaceholder: {
    width: 44,
    height: 44,
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#111827",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 22,
    paddingHorizontal: 14,
    height: 46,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#111827",
  },
  filterButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
});

export default ClientePromocionesScreen;

