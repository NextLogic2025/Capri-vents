import React, { useMemo, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DeliveryCard from '../../components/vendedor/DeliveryCard';

const deliveries = [
  { id: 'ENT-301', orderCode: 'PED-2024-140', status: 'Por entregar', statusBadgeColor: '#FFC107', time: '10:00', clientName: 'Comisariato Los Andes', contactName: 'Lic. Ana Torres', address: 'Av. América y Naciones Unidas', itemsCount: 12, total: 640.50, driverName: 'Luis Morales', finalStatusText: 'Por entregar' },
  { id: 'ENT-302', orderCode: 'PED-2024-141', status: 'Entregada', statusBadgeColor: '#4CAF50', time: '11:30', clientName: 'Minimarket La Esquina', contactName: 'Sra. María López', address: 'Calle Bolívar 234', itemsCount: 6, total: 180.00, driverName: 'Roberto Gómez', finalStatusText: 'Completada' },
];

export default function SupervisorEntregasScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [term, setTerm] = useState('');

  const filtered = useMemo(() => {
    const t = term.trim().toLowerCase();
    if (!t) return deliveries;
    return deliveries.filter(d => d.id.toLowerCase().includes(t) || d.orderCode.toLowerCase().includes(t) || d.clientName.toLowerCase().includes(t));
  }, [term]);

  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top + 8 }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Entregas</Text>
        <TouchableOpacity style={styles.bell}><Ionicons name="notifications-outline" size={20} color="#F55A3C"/></TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#9CA3AF"/>
          <TextInput style={styles.input} placeholder="Buscar entrega/pedido..." placeholderTextColor="#9CA3AF" value={term} onChangeText={setTerm} />
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={() => console.log('Ver mapa de ruta')}>
          <Ionicons name="map-outline" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.kpiRow}>
        <Kpi label="Total Hoy" value="2" />
        <Kpi label="Entregadas" value="1" />
        <Kpi label="Pendientes" value="1" />
      </View>

      <View style={styles.routeCard}>
        <View>
          <Text style={styles.routeTitle}>Ruta del Día</Text>
          <Text style={styles.routeSub}>Zona Norte • 3 entregas programadas</Text>
        </View>
        <TouchableOpacity style={styles.routeBtn} onPress={() => console.log('Ver mapa de ruta')}>
          <Ionicons name="navigate-outline" size={18} color="#2563EB" />
          <Text style={styles.routeBtnText}>Ver mapa de ruta</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(i)=>i.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={{ paddingHorizontal: 16 }}>
            <DeliveryCard delivery={item} onPrimaryAction={(d)=>console.log('Acción', d.id)} />
          </View>
        )}
      />

      {/* TODO: conectar con backend aquí para tracking de entregas por ruta/conductor */}
    </SafeAreaView>
  );
}

const Kpi = ({ label, value }) => (
  <View style={styles.kpiCard}>
    <Text style={styles.kpiValue}>{value}</Text>
    <Text style={styles.kpiLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: { flex:1, backgroundColor:'#F7F7FB', paddingHorizontal: 16 },
  header: { flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginBottom: 12 },
  title: { fontSize:22, fontWeight:'700', color:'#111827' },
  bell: { width:42, height:42, borderRadius:21, backgroundColor:'#FFFFFF', alignItems:'center', justifyContent:'center' },
  searchRow: { flexDirection:'row', alignItems:'center', gap:10, marginBottom: 14 },
  searchBar: { flex:1, backgroundColor:'#FFFFFF', borderRadius: 18, paddingHorizontal:12, paddingVertical:8, flexDirection:'row', alignItems:'center' },
  input: { flex:1, marginLeft:8, color:'#111827' },
  addBtn: { width:44, height:44, borderRadius:22, backgroundColor:'#F55A3C', alignItems:'center', justifyContent:'center' },
  kpiRow: { flexDirection:'row', gap:10, marginBottom: 12 },
  kpiCard: { flex:1, backgroundColor:'#FFFFFF', borderRadius:16, paddingVertical: 12, alignItems:'center' },
  kpiValue: { fontSize:18, fontWeight:'700', color:'#111827' },
  kpiLabel: { fontSize:12, color:'#6B7280' },
  routeCard: { backgroundColor:'#E0F2FE', borderRadius:20, padding: 16, marginBottom: 12 },
  routeTitle: { color:'#0F172A', fontWeight:'800' },
  routeSub: { color:'#2563EB', marginTop:4 },
  routeBtn: { marginTop:10, backgroundColor:'#FFFFFF', borderRadius:16, flexDirection:'row', alignItems:'center', justifyContent:'center', paddingVertical:10, gap:8 },
  routeBtnText: { color:'#2563EB', fontWeight:'700' },
});
