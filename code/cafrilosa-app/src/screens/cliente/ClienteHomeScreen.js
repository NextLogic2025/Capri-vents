import React from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import CategoryCard from "../../components/ui/CategoryCard";
import OfferProductCard from "../../components/ui/OfferProductCard";

const promoImage = require("../../assets/images/login-header-meat.png");
const placeholderOffer = require("../../assets/images/login-header-meat.png");

// TODO: conectar con backend aqui para cargar categorias, promociones y ofertas reales.
const categories = [
  { id: "embutidos", name: "Embutidos", count: 45, color: "#FDEDEC", icon: "restaurant-outline" },
  { id: "jamones", name: "Jamones", count: 23, color: "#FDF2FF", icon: "pizza-outline" },
  { id: "chorizos", name: "Chorizos", count: 18, color: "#FFF5EB", icon: "flame-outline" },
  { id: "promociones", name: "Promociones", count: 12, color: "#FEF9E7", icon: "pricetags-outline" },
];

const offers = [
  {
    id: "offer1",
    name: "Chorizo Premium",
    discount: 18,
    rating: 4.5,
    price: 4.5,
    oldPrice: 5.5,
    image: placeholderOffer,
    stock: "40/60",
    category: "Chorizos",
    weight: "250g",
    description: "Chorizo premium especiado con paprika y ajo fresco.",
    characteristics: ["Ideal para tapas", "Textura firme"],
  },
  {
    id: "offer2",
    name: "Jamon Serrano",
    discount: 13,
    rating: 4.8,
    price: 12.9,
    oldPrice: 14.9,
    image: placeholderOffer,
    stock: "35/50",
    category: "Jamones",
    weight: "400g",
    description: "Jamon serrano curado con sal marina.",
    characteristics: ["Curado 16 meses", "Sin gluten"],
  },
  {
    id: "offer3",
    name: "Salchicha Frankfurt",
    discount: 0,
    rating: 4.3,
    price: 3.2,
    image: placeholderOffer,
    stock: "60/80",
    category: "Embutidos",
    weight: "300g",
    description: "Salchichas tipo Frankfurt ahumadas.",
    characteristics: ["Sabor suave", "Apto para niNos"],
  },
  {
    id: "offer4",
    name: "Pack Parrillero",
    discount: 22,
    rating: 4.6,
    price: 18.5,
    oldPrice: 23.0,
    image: placeholderOffer,
    stock: "25/40",
    category: "Promociones",
    weight: "1kg",
    description: "Pack mixto con chorizos, morcillas y salchichas.",
    characteristics: ["Incluye salsa chimichurri", "Ideal para 6 personas"],
  },
];

const ClienteHomeScreen = ({ navigation, route }) => {
  const user = route?.params?.user;
  const firstName = user?.name?.split(" ")[0] || "Cliente";

  const handleCategoryPress = (category) => {
    if (category.id === "embutidos") {
      navigation.navigate("ClienteEmbutidos");
    } else if (category.id === "jamones") {
      navigation.navigate("ClienteJamones");
    } else if (category.id === "chorizos") {
      navigation.navigate("ClienteChorizos");
    } else if (category.id === "promociones") {
      navigation.navigate("ClientePromociones");
    }
  };

  const handleOfferAdd = (offer) => {
    console.log("Agregar oferta al carrito:", offer.name);
    // TODO: conectar con backend o estado global para agregar ofertas al carrito y actualizar stock.
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerWrapper}>
          <LinearGradient colors={["#F65A3B", "#F6C453"]} style={styles.headerGradient}>
            <View style={styles.headerRow}>
              <View>
                <Text style={styles.greetingText}>Hola, {firstName} ??</Text>
                <Text style={styles.welcomeText}>Bienvenido</Text>
                <Text style={styles.storeText}>Supermercado El Ahorro</Text>
              </View>
              <View style={styles.headerActions}>
                <TouchableOpacity style={styles.roundIcon}>
                  <Ionicons name="search" size={20} color="#E64A19" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.roundIcon}>
                  <Ionicons name="notifications-outline" size={20} color="#E64A19" />
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>1</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
          <TouchableOpacity
            style={styles.membershipCard}
            activeOpacity={0.9}
            onPress={() => {
              navigation.navigate("ClienteNiveles");
              // TODO: este tap podría abrir la sección de fidelidad usando datos reales del backend
            }}
          >
            <View>
              <Text style={styles.levelText}>Tu nivel</Text>
              <Text style={styles.levelTitle}>Cliente Gold ?</Text>
              <Text style={styles.levelPoints}>1250 puntos acumulados</Text>
              <View style={styles.rewardCard}>
                <Text style={styles.rewardLabel}>Proxima recompensa</Text>
                <Text style={styles.rewardValue}>Cupon de $5 de descuento</Text>
              </View>
            </View>
            <View style={styles.giftCircle}>
              <MaterialCommunityIcons name="gift-outline" size={36} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categorias</Text>
          <TouchableOpacity onPress={() => console.log("Ver todas las categorias")}> 
            <Text style={styles.viewAll}>Ver todas</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesRow}>
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} onPress={() => handleCategoryPress(category)} />
          ))}
        </ScrollView>

        <View style={styles.promoCardWrapper}>
          <ImageBackground source={promoImage} style={styles.promoCard} imageStyle={styles.promoImage}>
            <View style={styles.promoOverlay} />
            <View style={styles.promoContent}>
              <Text style={styles.promoTitle}>Promocion Especial</Text>
              <Text style={styles.promoSubtitle}>20% OFF en Chorizos Premium</Text>
              <TouchableOpacity style={styles.promoButton}>
                <Text style={styles.promoButtonText}>Ver mas</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Ofertas Especiales</Text>
          <TouchableOpacity onPress={() => console.log("Ver todas las ofertas")}> 
            <Text style={styles.viewAll}>Ver todo &gt;</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.offersGrid}>
          {offers.map((offer) => (
            <OfferProductCard
              key={offer.id}
              offer={offer}
              onAdd={() => handleOfferAdd(offer)}
              onPress={() => navigation.navigate("ClienteProductoDetalle", { product: offer })}
            />
          ))}
        </View>
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
    paddingBottom: 32,
  },
  headerWrapper: {
    marginBottom: 24,
  },
  headerGradient: {
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 90,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  greetingText: {
    color: "#FFEFE9",
    fontSize: 14,
    marginBottom: 4,
  },
  welcomeText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
  },
  storeText: {
    color: "#FFEFE9",
    fontSize: 15,
    marginTop: 6,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  roundIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#22C55E",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },
  membershipCard: {
    backgroundColor: "#E64A19",
    borderRadius: 28,
    padding: 20,
    marginHorizontal: 24,
    marginTop: -70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  levelText: {
    color: "#FFE4D5",
    fontSize: 13,
    marginBottom: 4,
  },
  levelTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },
  levelPoints: {
    color: "#FFE4D5",
    fontSize: 14,
    marginBottom: 12,
  },
  rewardCard: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  rewardLabel: {
    color: "#FFEFE9",
    fontSize: 12,
  },
  rewardValue: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 2,
  },
  giftCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  viewAll: {
    fontSize: 14,
    color: "#E64A19",
    fontWeight: "600",
  },
  categoriesRow: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  promoCardWrapper: {
    paddingHorizontal: 24,
    marginTop: 12,
  },
  promoCard: {
    height: 180,
    borderRadius: 24,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  promoImage: {
    borderRadius: 24,
  },
  promoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  promoContent: {
    padding: 20,
  },
  promoTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  promoSubtitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 6,
  },
  promoButton: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },
  promoButtonText: {
    color: "#E64A19",
    fontWeight: "700",
  },
  offersGrid: {
    paddingHorizontal: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

export default ClienteHomeScreen;

