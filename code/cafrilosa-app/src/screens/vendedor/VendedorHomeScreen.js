import React from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SellerKpiCard from "../../components/vendedor/SellerKpiCard";
import SellerPromotionItem from "../../components/vendedor/SellerPromotionItem";
import SellerRouteCard from "../../components/vendedor/SellerRouteCard";

const headerImage = require("../../assets/images/login-header-meat.png");
const bannerImage = require("../../assets/images/offer-pack-parrillero.png");

const kpis = [
  { id: "sales", title: "Ventas Hoy", value: "$3,450", subtitle: "Meta: $4,000", progress: 3450 / 4000, iconName: "cash", progressColor: "#4CAF50" },
  { id: "orders", title: "Pedidos", value: "12", subtitle: "De 15 planificados", progress: 12 / 15, iconName: "document-text-outline", progressColor: "#FFC107" },
  { id: "visits", title: "Visitas", value: "8/12", subtitle: "Completadas hoy", progress: 8 / 12, iconName: "walk-outline", progressColor: "#2196F3" },
  { id: "quota", title: "Cuota Mensual", value: "86%", subtitle: "Noviembre", progress: 0.86, iconName: "trending-up-outline", progressColor: "#F44336" },
];

const promotions = [
  { id: "promo1", title: "Jamón Premium (15%)", description: "Compra mayor a 10kg · Hasta 10 Nov", image: headerImage },
  { id: "promo2", title: "Pack Parrillero (2x1)", description: "En segunda unidad · Hasta 15 Nov", image: bannerImage },
];

const todayRoutes = [
  {
    id: "route1",
    time: "08:30",
    badgeLabel: "Visita + Pedido",
    badgeColor: "#2E7D32",
    clientName: "Supermercado El Ahorro",
    contactName: "Sr. Juan Pérez",
    address: "Av. 6 de Diciembre N34-451",
    lastPurchaseDate: "Oct 2024",
    avgMonthly: "$420/mes",
    summaryType: "Pedido",
    summaryValueText: "$450 · 15 productos",
    buttonLabel: "Ver Detalle",
    buttonColor: "#43A047",
    showPhoneButton: true,
    completed: true,
  },
  {
    id: "route2",
    time: "10:00",
    badgeLabel: "Pedido Programado",
    badgeColor: "#66BB6A",
    clientName: "Minimarket La Esquina",
    contactName: "Sra. María López",
    address: "Calle Bolívar 234",
    lastPurchaseDate: "30 Oct 2024",
    avgMonthly: "$180/mes",
    summaryType: "Pedido",
    summaryValueText: "$230 · 8 productos",
    buttonLabel: "Ver Detalle",
    buttonColor: "#43A047",
    showPhoneButton: false,
    completed: true,
  },
  {
    id: "route3",
    time: "11:30",
    badgeLabel: "Cobro + Visita",
    badgeColor: "#2196F3",
    clientName: "Tienda Don Pepe",
    contactName: "Sr. Pedro Rodríguez",
    address: "Av. Amazonas 567",
    lastPurchaseDate: "25 Oct 2024",
    avgMonthly: "$290/mes",
    summaryType: "Cobro",
    summaryValueText: "$320",
    buttonLabel: "Continuar Visita",
    buttonColor: "#1E88E5",
    showPhoneButton: false,
    completed: false,
  },
];

const VendedorHomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const completedVisits = todayRoutes.filter((route) => route.completed).length;

  const goToPedidosTab = () => {
    const parent = navigation.getParent?.();
    if (parent) parent.navigate("VendedorPedidos");
    else navigation.navigate("VendedorPedidos");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 12 }]} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={["#F55A3C", "#F9C846"]} style={styles.headerGradient}>
          <View style={styles.headerTopRow}>
            <View>
              <Text style={styles.greeting}>Hola, Vendedor 👋</Text>
              <Text style={styles.headerTitle}>Bienvenido</Text>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.circleButton}>
                <Ionicons name="notifications-outline" size={20} color="#F55A3C" />
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationText}>1</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.kpiGrid}>{kpis.map((item) => (<SellerKpiCard key={item.id} {...item} />))}</View>
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Promociones para hoy</Text>
          {promotions.map((promo) => (
            <SellerPromotionItem key={promo.id} {...promo} />
          ))}
        </View>

        <ImageBackground source={bannerImage} style={styles.banner} imageStyle={styles.bannerImage}>
          <View style={styles.bannerOverlay} />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>¡Excelente trabajo, Carlos!</Text>
            <Text style={styles.bannerSubtitle}>Solo $550 más para alcanzar tu meta del día</Text>
          </View>
        </ImageBackground>

        <View style={styles.sectionCard}>
          <View style={styles.routeHeaderRow}>
            <View style={styles.routeHeaderLeft}>
              <Ionicons name="navigate" size={18} color="#F55A3C" />
              <Text style={styles.routeTitle}>Ruta del día</Text>
            </View>
            <Text style={styles.routeCount}>
              {completedVisits}/{todayRoutes.length} visitas
            </Text>
          </View>
          {todayRoutes.map((route) => (
            <SellerRouteCard key={route.id} route={route} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F5F5F5" },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 32 },
  headerGradient: { borderRadius: 32, padding: 20, marginBottom: 20 },
  headerTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  greeting: { color: "#FFEFE9", fontSize: 14, marginBottom: 4 },
  headerTitle: { color: "#FFFFFF", fontSize: 26, fontWeight: "700" },
  headerActions: { flexDirection: "row", alignItems: "center", gap: 10 },
  circleButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(255,255,255,0.85)", alignItems: "center", justifyContent: "center", position: "relative" },
  notificationBadge: { position: "absolute", top: 6, right: 6, backgroundColor: "#F55A3C", width: 16, height: 16, borderRadius: 8, alignItems: "center", justifyContent: "center" },
  notificationText: { color: "#FFFFFF", fontSize: 10, fontWeight: "700" },
  kpiGrid: { flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" },
  sectionCard: { backgroundColor: "#FFF8E7", borderRadius: 24, padding: 18, marginBottom: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 1 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#111827", marginBottom: 12 },
  banner: { height: 150, borderRadius: 32, overflow: "hidden", marginVertical: 20 },
  bannerImage: { borderRadius: 32 },
  bannerOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.35)" },
  bannerContent: { padding: 20 },
  bannerTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },
  bannerSubtitle: { color: "#F8FAFC", fontSize: 14, marginTop: 4 },
  routeHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  routeHeaderLeft: { flexDirection: "row", alignItems: "center", gap: 6 },
  routeTitle: { fontSize: 16, fontWeight: "700", color: "#111827" },
  routeCount: { fontSize: 13, color: "#6B7280" },
});

export default VendedorHomeScreen;
