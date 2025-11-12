import React, { useCallback, useRef, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, ImageBackground, Modal } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import CategoryCard from "../../components/ui/CategoryCard";
import OfferProductCard from "../../components/ui/OfferProductCard";
import UiHeroHeader from "../../components/ui/UiHeroHeader";
import UiRoleStatCard from "../../components/ui/UiRoleStatCard";

const promoImage = require("../../assets/images/login-header-meat.png");
const placeholderOffer = require("../../assets/images/login-header-meat.png");

// TODO: conectar con backend aqui para cargar categorias, promociones y ofertas reales.
const categories = [
  { id: "productos", name: "Productos", count: 86, color: "#E0F2FE", icon: "cube-outline" },
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
    name: "Jamón Serrano",
    discount: 13,
    rating: 4.8,
    price: 12.9,
    oldPrice: 14.9,
    image: placeholderOffer,
    stock: "35/50",
    category: "Jamones",
    weight: "400g",
    description: "Jamón serrano curado con sal marina.",
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
    characteristics: ["Sabor suave", "Apto para niños"],
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

const announcements = [
  {
    id: "ann-order-1",
    type: "order",
    title: "Pedido #3860 recibido",
    description: "Confirmamos la recepción del pedido, estamos preparando tus productos.",
    meta: "Hace 5 min",
    isNew: true,
    icon: "cart-outline",
  },
  {
    id: "ann-order-2",
    type: "order",
    title: "Pedido #3792 en camino",
    description: "Nuestro repartidor salió hacia tu dirección, seguimiento actualizado.",
    meta: "Hoy, 09:45",
    isNew: true,
    icon: "bicycle-outline",
  },
  {
    id: "ann-order-3",
    type: "order",
    title: "Pedido #3726 entregado",
    description: "Gracias por comprar en Cafrilosa, esperamos tu calificación.",
    meta: "Ayer",
    isNew: false,
    icon: "checkmark-circle-outline",
  },
  {
    id: "ann-promo-1",
    type: "promo",
    title: "Promo de temporada",
    description: "2x1 en Jamones Reserva durante este fin de semana.",
    meta: "Válido hasta el domingo",
    isNew: true,
    icon: "pricetags-outline",
  },
  {
    id: "ann-promo-2",
    type: "promo",
    title: "Nuevos combos parrilleros",
    description: "Chorizos + embutidos premium con 20% OFF al comprar desde la app.",
    meta: "Explora en Promociones",
    isNew: false,
    icon: "flame-outline",
  },
];

const ClienteHomeScreen = ({ navigation, route }) => {
  const user = route?.params?.user;
  const firstName = user?.name?.split(" ")[0] || "Cliente";
  const insets = useSafeAreaInsets();
  const scrollRef = useRef(null);
  const [announcementsVisible, setAnnouncementsVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({ y: 0, animated: false });
      });
    }, [])
  );

  const newAnnouncementsCount = announcements.filter((item) => item.isNew).length;

  const handleCategoryPress = (category) => {
    if (category.id === "productos") {
      navigation.navigate("ClienteProductos");
    } else if (category.id === "promociones") {
      navigation.navigate("ClientePromociones");
    }
  };

  const handleOfferAdd = (offer) => {
    console.log("Agregar oferta al carrito:", offer.name);
    // TODO: conectar con backend o estado global para agregar ofertas al carrito y actualizar stock.
  };

  const handleAnnouncementPress = (announcement) => {
    setAnnouncementsVisible(false);
    if (announcement.type === "promo") {
      navigation.navigate("ClientePromociones");
    } else {
      navigation.navigate("ClientePedidos");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView ref={scrollRef} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerWrapper}>
          <UiHeroHeader
            greetingText={`Hola, ${firstName} 👋`}
            headline="Bienvenido"
            subtitle="Cafrilosa Online"
            rightActions={[{ icon: 'megaphone-outline', badge: newAnnouncementsCount, onPress: () => setAnnouncementsVisible(true) }]}
          >
            <UiRoleStatCard
              variant="cliente"
              data={{ levelLabel: 'Cliente Gold', points: 1250, nextRewardLabel: 'Cupón de $5 de descuento', rightIcon: 'gift-outline' }}
              onPrimaryAction={() => {
                navigation.navigate("ClienteNiveles");
              }}
            />
          </UiHeroHeader>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categorías</Text>
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
              <Text style={styles.promoTitle}>Promoción Especial</Text>
              <Text style={styles.promoSubtitle}>20% OFF en Chorizos Premium</Text>
              <TouchableOpacity style={styles.promoButton}>
                <Text style={styles.promoButtonText}>Ver más</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Ofertas Especiales</Text>
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
      <Modal visible={announcementsVisible} transparent animationType="fade" statusBarTranslucent>
        <View style={styles.announcementOverlay}>
          <TouchableOpacity style={styles.announcementBackdrop} activeOpacity={1} onPress={() => setAnnouncementsVisible(false)} />
          <View style={styles.announcementCard}>
            <View style={styles.announcementHeader}>
              <Text style={styles.announcementTitleModal}>Centro de anuncios</Text>
              <TouchableOpacity onPress={() => setAnnouncementsVisible(false)}>
                <Ionicons name="close" size={22} color="#111827" />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {announcements.map((item) => (
                <TouchableOpacity key={item.id} style={styles.announcementItem} onPress={() => handleAnnouncementPress(item)} activeOpacity={0.8}>
                  <View style={[styles.announcementIcon, item.type === "promo" ? styles.announcementIconPromo : styles.announcementIconOrder]}>
                    <Ionicons name={item.icon} size={18} color={item.type === "promo" ? "#B45309" : "#2563EB"} />
                  </View>
                  <View style={styles.announcementInfo}>
                    <View style={styles.announcementRow}>
                      <Text style={styles.announcementItemTitle}>{item.title}</Text>
                      {item.isNew && <Text style={styles.announcementPill}>Nuevo</Text>}
                    </View>
                    <Text style={styles.announcementDescription}>{item.description}</Text>
                    <Text style={styles.announcementMeta}>{item.meta}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  announcementOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },
  announcementBackdrop: {
    flex: 1,
  },
  announcementCard: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 12,
    maxHeight: "75%",
  },
  announcementHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  announcementTitleModal: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  announcementItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    gap: 12,
  },
  announcementIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  announcementIconOrder: {
    backgroundColor: "#DBEAFE",
  },
  announcementIconPromo: {
    backgroundColor: "#FEF3C7",
  },
  announcementInfo: {
    flex: 1,
  },
  announcementRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  announcementItemTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  announcementPill: {
    fontSize: 11,
    fontWeight: "600",
    color: "#92400E",
    backgroundColor: "#FFEDD5",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  announcementDescription: {
    color: "#4B5563",
    fontSize: 13,
    marginBottom: 4,
  },
  announcementMeta: {
    color: "#9CA3AF",
    fontSize: 12,
  },
});

export default ClienteHomeScreen;


