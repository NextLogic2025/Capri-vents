import React, { useMemo, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ProductListItem from "../../components/ui/ProductListItem";

const productImage = require("../../assets/images/offer-pack-parrillero.png");

// TODO: conectar con backend aqui para cargar productos de embutidos y stock en tiempo real.
const products = [
  {
    id: "emb-1",
    category: "Embutidos",
    name: "Chorizo Parrillero Premium 500g",
    price: 12.99,
    oldPrice: 14.5,
    image: productImage,
    stock: "40/60",
    weight: "500g",
    rating: 4.8,
    reviewsCount: 124,
    description:
      "Nuestro chorizo parrillero premium esta elaborado con cortes seleccionados y especias naturales que realzan su sabor.",
    characteristics: ["Sin conservantes artificiales", "Ideal para parrillas"],
  },
  {
    id: "emb-2",
    category: "Embutidos",
    name: "Chorizo Español Tradicional 400g",
    price: 14.5,
    image: productImage,
    stock: "32/50",
    weight: "400g",
    rating: 4.6,
    reviewsCount: 98,
    description: "Receta clasica española con ahumado natural y especias mediterraneas.",
    characteristics: ["Curado lentamente", "Toque ahumado"],
  },
  {
    id: "emb-3",
    category: "Embutidos",
    name: "Salchicha Frankfurt Premium 500g",
    price: 8.75,
    image: productImage,
    stock: "60/80",
    weight: "500g",
    rating: 4.5,
    reviewsCount: 75,
    description: "Salchichas estilo Frankfurt con textura suave y sabor ahumado perfecto para hot dogs gourmet.",
    characteristics: ["Ahumado natural", "Textura suave"],
  },
  {
    id: "emb-4",
    category: "Embutidos",
    name: "Morcilla Casera Seleccion 450g",
    price: 10.25,
    image: productImage,
    stock: "24/40",
    weight: "450g",
    rating: 4.4,
    reviewsCount: 54,
    description: "Morcilla tradicional con especias aromaticas y arroz selecto.",
    characteristics: ["Receta casera", "Perfecta para hornear"],
  },
  {
    id: "emb-5",
    category: "Embutidos",
    name: "Longaniza Artesanal Ahumada 420g",
    price: 11.35,
    image: productImage,
    stock: "50/70",
    weight: "420g",
    rating: 4.7,
    reviewsCount: 83,
    description: "Longaniza elaborada artesanalmente y ahumada con maderas seleccionadas.",
    characteristics: ["Ahumado natural", "Textura firme"],
  },
  {
    id: "emb-6",
    category: "Embutidos",
    name: "Salchicha Italiana Picante 480g",
    price: 13.1,
    image: productImage,
    stock: "38/60",
    weight: "480g",
    rating: 4.5,
    reviewsCount: 64,
    description: "Salchicha estilo italiano con un toque picante equilibrado.",
    characteristics: ["Picor moderado", "Ideal para pastas"],
  },
  {
    id: "emb-7",
    category: "Embutidos",
    name: "Chistorra Navarra Gourmet 300g",
    price: 9.6,
    image: productImage,
    stock: "44/55",
    weight: "300g",
    rating: 4.6,
    reviewsCount: 57,
    description: "Chistorra navarra de sabor intenso para tapas y asados.",
    characteristics: ["Sazonado tradicional", "Listo para sarten"],
  },
  {
    id: "emb-8",
    category: "Embutidos",
    name: "Butifarra Blanca Tradicional 520g",
    price: 12.2,
    image: productImage,
    stock: "30/45",
    weight: "520g",
    rating: 4.3,
    reviewsCount: 48,
    description: "Butifarra blanca ideal para guisos y parrillas mediterraneas.",
    characteristics: ["Sin colorantes", "Suave y jugosa"],
  },
  {
    id: "emb-9",
    category: "Embutidos",
    name: "Salami Curado Reserva 350g",
    price: 15.95,
    image: productImage,
    stock: "28/40",
    weight: "350g",
    rating: 4.9,
    reviewsCount: 110,
    description: "Salami reserva curado por 90 dias para un sabor profundo.",
    characteristics: ["Curado prolongado", "Ideal para tablas"],
  },
  {
    id: "emb-10",
    category: "Embutidos",
    name: "Fuet Catalan Premium 250g",
    price: 7.8,
    image: productImage,
    stock: "62/80",
    weight: "250g",
    rating: 4.4,
    reviewsCount: 70,
    description: "Fuet catalan de textura firme y sabor suave.",
    characteristics: ["Tradición catalana", "Listo para picar"],
  },
];

const ClienteEmbutidosScreen = ({ navigation }) => {
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

    console.log("Agregar al carrito:", product.name, "x", quantity, "Stock disponible:", product.stock);
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
          <Text style={styles.headerTitle}>Embutidos</Text>
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

export default ClienteEmbutidosScreen;
