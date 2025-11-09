import React, { useMemo, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProductListItem from "../../components/ui/ProductListItem";

const productImage = require("../../assets/images/login-header-meat.png");

// TODO: conectar con backend aqui para cargar jamones disponibles y stock real.
const products = [
  {
    id: "jam-1",
    category: "Jamones",
    name: "Jamon Serrano Reserva 500g",
    price: 16.5,
    oldPrice: 18.0,
    image: productImage,
    stock: "28/40",
    weight: "500g",
    rating: 4.9,
    reviewsCount: 142,
    description: "Jamon serrano curado lentamente para un sabor intenso y equilibrado.",
    characteristics: ["Curado 18 meses", "Ideal para picadas"],
  },
  {
    id: "jam-2",
    category: "Jamones",
    name: "Jamon Iberico Corte Fino 300g",
    price: 22.9,
    image: productImage,
    stock: "22/30",
    weight: "300g",
    rating: 4.8,
    reviewsCount: 120,
    description: "Corte fino de jamon iberico con vetas de grasa que aportan suavidad.",
    characteristics: ["Origen EspaNa", "Corte profesional"],
  },
  {
    id: "jam-3",
    category: "Jamones",
    name: "Jamon Premium ANejo 450g",
    price: 19.75,
    image: productImage,
    stock: "35/45",
    weight: "450g",
    rating: 4.7,
    reviewsCount: 85,
    description: "Jamon aNejo con aroma ahumado y textura firme.",
    characteristics: ["Ahumado natural", "Conservacion refrigerada"],
  },
  {
    id: "jam-4",
    category: "Jamones",
    name: "Jamon Glaseado Familiar 800g",
    price: 24.1,
    image: productImage,
    stock: "18/25",
    weight: "800g",
    rating: 4.5,
    reviewsCount: 64,
    description: "Jamon glaseado ideal para celebraciones familiares.",
    characteristics: ["Listo para hornear", "Sabor dulce"],
  },
  {
    id: "jam-5",
    category: "Jamones",
    name: "Jamon Ahumado Artesanal 400g",
    price: 17.35,
    image: productImage,
    stock: "30/42",
    weight: "400g",
    rating: 4.6,
    reviewsCount: 70,
    description: "Ahumado artesanal con notas de madera de nogal.",
    characteristics: ["Proceso artesanal", "Sin conservantes"],
  },
  {
    id: "jam-6",
    category: "Jamones",
    name: "Jamon Cocido Natural 500g",
    price: 13.9,
    image: productImage,
    stock: "48/60",
    weight: "500g",
    rating: 4.4,
    reviewsCount: 58,
    description: "Jamon cocido clasico, bajo en sodio y listo para sandwiches.",
    characteristics: ["Bajo en sodio", "Sin gluten"],
  },
  {
    id: "jam-7",
    category: "Jamones",
    name: "Jamon de Pavo Light 350g",
    price: 11.8,
    image: productImage,
    stock: "40/55",
    weight: "350g",
    rating: 4.3,
    reviewsCount: 50,
    description: "Alternativa ligera con 98% carne de pavo.",
    characteristics: ["Bajo en grasa", "Ideal para dietas"],
  },
  {
    id: "jam-8",
    category: "Jamones",
    name: "Jamon Serrano Loncheado 250g",
    price: 10.75,
    image: productImage,
    stock: "45/65",
    weight: "250g",
    rating: 4.5,
    reviewsCount: 66,
    description: "Lonchas finas de jamon serrano listas para servir.",
    characteristics: ["Empaque al vacio", "Listo para tapas"],
  },
  {
    id: "jam-9",
    category: "Jamones",
    name: "Jamon Prosciutto Italiano 300g",
    price: 21.45,
    image: productImage,
    stock: "26/35",
    weight: "300g",
    rating: 4.8,
    reviewsCount: 92,
    description: "Prosciutto italiano curado con una textura sedosa.",
    characteristics: ["Curado 14 meses", "Origen Parma"],
  },
  {
    id: "jam-10",
    category: "Jamones",
    name: "Jamon Reserva Premium 1kg",
    price: 34.9,
    image: productImage,
    stock: "12/20",
    weight: "1kg",
    rating: 4.9,
    reviewsCount: 150,
    description: "Pieza completa de jamon reserva para eventos especiales.",
    characteristics: ["Curado prolongado", "Rinde para 10 porciones"],
  },
];

const ClienteJamonesScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [quantities, setQuantities] = useState({});

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
    console.log("Agregar jamon al carrito:", product.name, "x", quantity, "Stock:", product.stock);
    // TODO: conectar con backend o estado global para agregar productos al carrito y actualizar stock.
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Jamones</Text>
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
    marginTop: 12,
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

export default ClienteJamonesScreen;

