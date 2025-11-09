import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ClienteProductoDetalleScreen = ({ navigation, route }) => {
  const product = route?.params?.product;

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return null;
  }

  const {
    category,
    name,
    price,
    oldPrice,
    image,
    rating = 4.8,
    reviewsCount = 124,
    weight = "500g",
    description = "Producto premium seleccionado cuidadosamente para ofrecer el mejor sabor.",
    characteristics = ["Sin conservantes artificiales", "Producto 100% argentino"],
    stock,
  } = product;

  const handleAdd = () => {
    console.log("Agregar detalle producto al carrito", product.name, quantity);
    // TODO: conectar con backend o contexto para agregar al carrito y actualizar stock.
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.imageWrapper}>
          <Image source={image} style={styles.image} />
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color="#111827" />
          </TouchableOpacity>
          <View style={styles.rightButtons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="heart-outline" size={20} color="#111827" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="share-outline" size={20} color="#111827" />
            </TouchableOpacity>
          </View>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryTagText}>{category}</Text>
          </View>
        </View>

        <View style={styles.contentWrapper}>
          <Text style={styles.productName}>{name}</Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={18} color="#FACC15" />
            <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
            <Text style={styles.reviewText}>({reviewsCount} reseNas)</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.mainPrice}>${price.toFixed(2)}</Text>
            <Text style={styles.weight}> / {weight}</Text>
            {oldPrice ? <Text style={styles.detailOldPrice}>${oldPrice.toFixed(2)}</Text> : null}
          </View>
          <Text style={styles.stockText}>Stock disponible: {stock}</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descripcion</Text>
            <Text style={styles.sectionText}>{description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Caracteristicas</Text>
            {characteristics.map((item, index) => (
              <View key={index} style={styles.featureRow}>
                <View style={styles.featureBullet} />
                <Text style={styles.featureText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.quantityBox}>
          <TouchableOpacity onPress={() => setQuantity((prev) => Math.max(prev - 1, 1))}>
            <Ionicons name="remove-circle-outline" size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={() => setQuantity((prev) => prev + 1)}>
            <Ionicons name="add-circle-outline" size={24} color="#111827" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.bottomButton} onPress={handleAdd}>
          <Text style={styles.bottomButtonText}>Agregar ${price.toFixed(2)}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingBottom: 120,
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 260,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  rightButtons: {
    position: "absolute",
    top: 20,
    right: 20,
    flexDirection: "row",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  categoryTag: {
    position: "absolute",
    top: 24,
    left: 20,
    backgroundColor: "#E64A19",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 60,
  },
  categoryTagText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  contentWrapper: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  productName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  reviewText: {
    fontSize: 13,
    color: "#6B7280",
    marginLeft: 6,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  mainPrice: {
    fontSize: 26,
    fontWeight: "700",
    color: "#E64A19",
  },
  weight: {
    fontSize: 16,
    color: "#6B7280",
    marginLeft: 6,
  },
  detailOldPrice: {
    fontSize: 16,
    color: "#9CA3AF",
    textDecorationLine: "line-through",
    marginLeft: 10,
  },
  stockText: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 8,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  featureBullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#22C55E",
    marginRight: 10,
  },
  featureText: {
    fontSize: 14,
    color: "#374151",
  },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  quantityBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 22,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginHorizontal: 10,
  },
  bottomButton: {
    flex: 1,
    marginLeft: 12,
    backgroundColor: "#E64A19",
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: "center",
  },
  bottomButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default ClienteProductoDetalleScreen;

