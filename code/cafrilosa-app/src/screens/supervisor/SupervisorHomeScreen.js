import React from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import KpiCard from "../../components/supervisor/KpiCard";

const SupervisorHomeScreen = ({ navigation }) => {
  const kpis = [
    { id: 'ventas', icon: 'cash', mainValue: '$128,450', title: 'Ventas del Mes', meta: 'Meta: $135,000', trend: '+12.5%', trendColor: '#4CAF50' },
    { id: 'pedidosActivos', icon: 'cart-outline', mainValue: '147', title: 'Pedidos Activos', meta: 'Meta: 160', trend: '+8', trendColor: '#4CAF50' },
    { id: 'cobertura', icon: 'map-outline', mainValue: '94%', title: 'Cobertura Zonas', meta: 'Meta: 95%', trend: '+3%', trendColor: '#4CAF50' },
    { id: 'entregasHoy', icon: 'truck-outline', mainValue: '23/28', title: 'Entregas Hoy', meta: 'Meta: 28', trend: '', trendColor: '#90A4AE' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <LinearGradient colors={["#F65A3B", "#F59E0B"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.headerGradient}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.hello}>Hola, Supervisor 👋</Text>
              <Text style={styles.welcome}>Bienvenido</Text>
            </View>
            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.navigate('SupervisorPedidos')}>
                <Ionicons name="search-outline" size={18} color="#F97316" />
              </TouchableOpacity>
              <View>
                <TouchableOpacity style={styles.headerBtn}>
                  <Ionicons name="notifications-outline" size={18} color="#F97316" />
                </TouchableOpacity>
                <View style={styles.dot} />
              </View>
            </View>
          </View>

          <View style={styles.quickRow}>
            <QuickChip icon="home-outline" label="Inicio" active />
            <QuickChip icon="map-outline" label="Rutas" onPress={() => navigation.navigate('SupervisorEntregas')} />
            <QuickChip icon="people-outline" label="Equipo" onPress={() => navigation.navigate('SupervisorClientes')} />
            <QuickChip icon="file-tray-full-outline" label="Pedidos" onPress={() => navigation.navigate('SupervisorPedidos')} />
          </View>
        </LinearGradient>

        <View style={styles.kpiGrid}>
          {kpis.map((k) => (
            <View key={k.id} style={{ width: '48%' }}>
              <KpiCard icon={k.icon} titleSmall={k.title} mainValue={k.mainValue} metaText={k.meta} trendText={k.trend} trendColor={k.trendColor} />
            </View>
          ))}
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <MaterialCommunityIcons name="chart-box-outline" size={18} color="#FFFFFF" />
            <Text style={styles.summaryTitle}>Resumen del Día</Text>
          </View>
          <View style={styles.summaryRow}>
            <MiniCard label="Pedidos" value="147" />
            <MiniCard label="Entregas" value="23" />
            <MiniCard label="Vendedores" value="12" />
          </View>
          {/* TODO: conectar con backend aquí para KPIs del día, notificaciones y novedades del equipo */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const QuickChip = ({ icon, label, active, onPress }) => (
  <TouchableOpacity style={[styles.chip, active && styles.chipActive]} onPress={onPress}>
    <Ionicons name={icon} size={16} color={active ? '#FFFFFF' : '#F97316'} />
    <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
  </TouchableOpacity>
);

const MiniCard = ({ label, value }) => (
  <View style={styles.miniCard}>
    <Text style={styles.miniValue}>{value}</Text>
    <Text style={styles.miniLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F7FB' },
  headerGradient: { borderBottomLeftRadius: 28, borderBottomRightRadius: 28, padding: 16, paddingBottom: 18 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  hello: { color: '#FFE4E6', fontSize: 12 },
  welcome: { color: '#FFFFFF', fontSize: 22, fontWeight: '800' },
  actionsRow: { flexDirection: 'row', gap: 10 },
  headerBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  dot: { position: 'absolute', right: 8, top: -2, width: 12, height: 12, borderRadius: 6, backgroundColor: '#EF4444', borderWidth: 2, borderColor: '#FFF' },
  quickRow: { flexDirection: 'row', gap: 10, marginTop: 12 },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#FFF7ED', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8 },
  chipActive: { backgroundColor: 'rgba(255,255,255,0.25)' },
  chipText: { color: '#F97316', fontWeight: '700' },
  chipTextActive: { color: '#FFFFFF' },
  kpiGrid: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', paddingHorizontal: 16, marginTop: 16 },
  summaryCard: { backgroundColor: '#F55A3C', marginTop: 16, marginHorizontal: 16, borderRadius: 22, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 3 },
  summaryHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  summaryTitle: { color: '#FFFFFF', fontWeight: '800' },
  summaryRow: { flexDirection: 'row', gap: 10 },
  miniCard: { flex: 1, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 16, paddingVertical: 16, alignItems: 'center' },
  miniValue: { color: '#FFFFFF', fontWeight: '800', fontSize: 18 },
  miniLabel: { color: '#FFE4E6', marginTop: 4, fontSize: 12 },
});

export default SupervisorHomeScreen;
