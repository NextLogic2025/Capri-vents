import React, { useMemo, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ProductListItem from "../../components/ui/ProductListItem";

const productImage = require("../../assets/images/login-header-meat.png");

// TODO: conectar con backend aqui para cargar chorizos disponibles y stock real.
const products = [
  {
    id: "cho-1",
    category: "Chorizos",
    name: "Chorizo Parrillero Clásico 500g",
    price: 10.99,
    image: productImage,
    stock: "40/60",
    weight: "500g",
    rating: 4.7,
    reviewsCount: 90,
    description: "Chorizo clásico para parrilla con mezcla equilibrada de especias.",
    characteristics: ["Textura jugosa", "Ideal para asados"],
  },
  {
    id: "cho-2",
    category: "Chorizos",
    name: "Chorizo Picante Criollo 400g",
    price: 11.5,
    image: productImage,
    stock: "32/50",
    weight: "400g",
    rating: 4.5,
    reviewsCount: 70,
    description: "Picante criollo con ají seleccionado.",
    characteristics: ["Picor medio", "Sin conservantes"],
  },
  {
    id: "cho-3",
    category: "Chorizos",
    name: "Chorizo Parrillero Premium 600g",
    price: 13.2,
    image: productImage,
    stock: "38/55",
    weight: "600g",
    rating: 4.8,
    reviewsCount: 110,
    description: "Versión premium con alto contenido cárnico.",
    characteristics: ["80% carne", "Ahumado suave"],
  },
  {
    id: "cho-4",
    category: "Chorizos",
    name: "Chorizo Español Ahumado 450g",
    price: 12.4,
    image: productImage,
    stock: "28/40",
    weight: "450g",
    rating: 4.4,
    reviewsCount: 60,
    description: "Chorizo estilo español curado con pimentón de la Vera.",
    characteristics: ["Toque ahumado", "Tradición española"],
  },
  {
    id: "cho-5",
    category: "Chorizos",
    name: "Chorizo Criollo Tradicional 350g",
    price: 9.35,
    image: productImage,
    stock: "52/70",
    weight: "350g",
    rating: 4.3,
    reviewsCount: 55,
    description: "Receta tradicional criolla, ideal para sartenes.",
    characteristics: ["Preparación rápida", "Sabor casero"],
  },
  {
    id: "cho-6",
    category: "Chorizos",
    name: "Chorizo Parrillero BBQ 480g",
    price: 11.95,
    image: productImage,
    stock: "30/45",
    weight: "480g",
    rating: 4.5,
    reviewsCount: 68,
    description: "Chorizo con glaseado BBQ para parrillas urbanas.",
    characteristics: ["Glaseado dulce", "Listo para sellar"],
  },
  {
    id: "cho-7",
    category: "Chorizos",
    name: "Chorizo de Pavo Light 420g",
    price: 10.25,
    image: productImage,
    stock: "45/60",
    weight: "420g",
    rating: 4.2,
    reviewsCount: 47,
    description: "Opción más ligera con 70% carne de pavo.",
    characteristics: ["Bajo en grasa", "Proteína magra"],
  },
  {
    id: "cho-8",
    category: "Chorizos",
    name: "Chorizo Jalapeño Gourmet 380g",
    price: 12.9,
    image: productImage,
    stock: "24/35",
    weight: "380g",
    rating: 4.4,
    reviewsCount: 52,
    description: "Chorizo gourmet con jalapeño fresco.",
    characteristics: ["Picante balanceado", "Ideal para tacos"],
  },
  {
    id: "cho-9",
    category: "Chorizos",
    name: "Chorizo Parrillero Familiar 1kg",
    price: 19.8,
    image: productImage,
    stock: "18/30",
    weight: "1kg",
    rating: 4.6,
    reviewsCount: 88,
    description: "Pack familiar para reuniones al aire libre.",
    characteristics: ["Rinde 8 porciones", "Congelable"],
  },
  {
    id: "cho-10",
    category: "Chorizos",
    name: "Chorizo Vegetal Especiado 300g",
    price: 8.7,
    image: productImage,
    stock: "40/50",
    weight: "300g",
    rating: 4.1,
    reviewsCount: 32,
    description: "Alternativa vegetal especiada para parrillas mixtas.",
    characteristics: ["100% vegetal", "Fuente de proteína"],
  },
];

const ClienteChorizosScreen = ({ navigation }) => {
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

    console.log("Agregar chorizo al carrito:", product.name, "x", quantity, "Stock:", product.stock);
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
          <Text style={styles.headerTitle}>Chorizos</Text>
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

export default ClienteChorizosScreen;

