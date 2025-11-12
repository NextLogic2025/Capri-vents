import React from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import UiSectionTitle from "../../components/ui/UiSectionTitle";
import UiStatCard from "../../components/ui/UiStatCard";
import UiPromoCard from "../../components/ui/UiPromoCard";
import UiRouteCard from "../../components/ui/UiRouteCard";
import UiHighlightCard from "../../components/ui/UiHighlightCard";
import UiHeroHeader from "../../components/ui/UiHeroHeader";
import UiRoleStatCard from "../../components/ui/UiRoleStatCard";

const headerImage = require("../../assets/images/login-header-meat.png");
const bannerImage = require("../../assets/images/offer-pack-parrillero.png");

// KPIs para grid 2x2
const kpis = [
  { id: "sales", icon: "cash", title: "Ventas Hoy", value: "$3,450", subtitle: "Meta: $4,000", progressPercent: 0.56 },
  { id: "orders", icon: "file-document-outline", title: "Pedidos", value: "12", subtitle: "De 15 planificados", progressPercent: 0.8 },
  { id: "visits", icon: "walk", title: "Visitas", value: "8/12", subtitle: "Completadas hoy", progressPercent: 8 / 12 },
  { id: "quota", icon: "trending-up", title: "Cuota Mensual", value: "86%", subtitle: "Noviembre", progressPercent: 0.86 },
  // TODO: conectar con backend aquí para KPI reales
];

const promotions = [
  { id: 'p1', title: 'Jamón Premium (15%)', subtitle: 'Compra mayor a 10kg • Hasta 10 Nov', badgeText: '15% OFF', image: headerImage },
  { id: 'p2', title: 'Pack Parrillero (2x1)', subtitle: 'En segunda unidad • Hasta 15 Nov', badgeText: '2x1', image: bannerImage },
  // TODO: backend: promos vigentes por canal/segmento
];

const routeStops = [
  { id:'r1', time:'08:30', statusBadge:'Visita + Pedido', clientName:'Supermercado El Ahorro', contactName:'Sr. Juan Pérez', address:'Av. 6 de Diciembre N34-451', orderAmount:'$450', itemsCount:15 },
  { id:'r2', time:'10:00', statusBadge:'Pedido Programado', clientName:'Minimarket La Esquina', contactName:'Sra. María López', address:'Calle Bolívar 234', orderAmount:'$230', itemsCount:8 },
  { id:'r3', time:'11:30', statusBadge:'Cobro + Visita', clientName:'Tienda Don Pepe', contactName:'Sr. Pedro Rodríguez', address:'Av. Amazonas 567', orderAmount:'$320', itemsCount:0 },
  { id:'r4', time:'14:00', statusBadge:'Presentación Nuevos Productos', clientName:'Restaurant El Buen Sabor', contactName:'Chef Carlos Méndez', address:'Calle García Moreno 890', orderAmount:'', itemsCount:0 },
  { id:'r5', time:'15:30', statusBadge:'Negociación Volumen', clientName:'Comisariato Los Andes', contactName:'Lic. Ana Torres', address:'Av. América y Naciones Unidas', orderAmount:'$800+', itemsCount:0 },
  // TODO: backend: ruta del día y estados por visita
];

const VendedorHomeScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        <UiHeroHeader
          fullBleed
          greetingText="Hola, Vendedor 👋"
          headline="Bienvenido"
          rightActions={[
            { icon: 'search-outline', onPress: () => {} },
            { icon: 'notifications-outline', badge: 1, onPress: () => { /* TODO: conectar con backend aquí - notificaciones */ } },
          ]}
        >
          <UiRoleStatCard
            variant="vendedor"
            data={{ kpiTitle: 'Ventas de Hoy', mainValue: '$3,450', trend: '+12.5%', subLabel: 'Pedidos activos: 12', rightIcon: 'bag-handle-outline' }}
            onPrimaryAction={() => { /* TODO: ir a pedidos del vendedor */ }}
          />
        </UiHeroHeader>
        <View style={styles.pagePadding}>
          {/* Sección: Estadísticas */}
          <UiSectionTitle title="Estadísticas" />
          <View style={styles.kpiGrid}>{kpis.map((item) => (
            <View key={item.id} style={styles.kpiItem}>
              <UiStatCard icon={item.icon} title={item.title} value={item.value} subtitle={item.subtitle} progressPercent={item.progressPercent} />
            </View>
          ))}</View>

          {/* Sección: Promociones para hoy */}
          <View style={{ marginTop: 16 }}>
            <UiSectionTitle title="Promociones para hoy" rightLabel="Ver todas" onPressRight={() => { /* TODO: ver todas las promociones */ }} />
            {promotions.map((promo) => (
              <UiPromoCard
                key={promo.id}
                image={promo.image}
                title={promo.title}
                subtitle={promo.subtitle}
                badgeText={promo.badgeText}
                onPress={() => { /* TODO: abrir detalle de promoción */ }}
              />
            ))}
          </View>

          {/* Banner motivacional (opcional) */}
          <UiHighlightCard
            image={bannerImage}
            title="¡Excelente trabajo, Carlos! 🥳"
            subtitle="Solo $550 más para alcanzar tu meta del día"
          />

          {/* Sección: Mi Ruta de Hoy */}
          <View style={{ marginTop: 16 }}>
            <UiSectionTitle title="Mi Ruta de Hoy" rightLabel={`2/5 visitas`} onPressRight={() => { /* TODO: abrir resumen de ruta */ }} />
            {routeStops.map((it) => (
              <UiRouteCard
                key={it.id}
                time={it.time}
                statusBadge={it.statusBadge}
                clientName={it.clientName}
                contactName={it.contactName}
                address={it.address}
                orderAmount={it.orderAmount}
                itemsCount={it.itemsCount}
                onReport={() => { /* TODO: abrir modal reporte */ }}
                onDelivered={() => { /* TODO: marcar entregado */ }}
                onCall={() => { /* TODO: llamar al contacto */ }}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      {/* Floating button to open Catalogo de Productos */}
      <TouchableOpacity
        onPress={() => navigation.navigate("VendedorCatalogoProductos")}
        style={styles.fab}
        activeOpacity={0.9}
      >
        <View style={styles.fabInner}>
          <Ionicons name="bag-outline" size={28} color="#E64A19" />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F5F5F5" },
  scrollContent: { },
  pagePadding: { paddingHorizontal: 24, marginTop: 16 },
  kpiGrid: { flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" },
  kpiItem: { width: "48%", marginBottom: 12 },
  sectionCard: { backgroundColor: "#FFF8E7", borderRadius: 24, padding: 18, marginBottom: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 1 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#111827", marginBottom: 12 },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 90,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFFFFF",
    borderWidth: 3,
    borderColor: "#E64A19",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  fabInner: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default VendedorHomeScreen;
