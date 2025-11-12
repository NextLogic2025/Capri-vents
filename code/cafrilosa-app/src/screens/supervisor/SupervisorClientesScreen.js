import React, { useMemo, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SellerClientCard from '../../components/vendedor/SellerClientCard';

const clients = [
  { id: 'cli-001', name: 'Supermercado El Ahorro', total: 45200, segment: 'Mayorista', frequency: 'Semanal', contactName: 'Sr. Juan Pérez', balance: 1200, status: 'activo', seller: 'Carlos Mendoza', average: 1500, creditDays: 30, notes: 'Prioridad alta' },
  { id: 'cli-002', name: 'Minimarket La Esquina', total: 19200, segment: 'Detalle', frequency: 'Quincenal', contactName: 'Sra. María López', balance: 600, status: 'activo', seller: 'Ana Torres', average: 820, creditDays: 15, notes: 'Pagos puntuales' },
  { id: 'cli-003', name: 'Tienda Don Pepe', total: 9800, segment: 'Restaurante', frequency: 'Mensual', contactName: 'Sr. Pedro Rodríguez', balance: 0, status: 'inactivo', seller: 'Roberto Gómez', average: 500, creditDays: 0, notes: 'Reactivar visita' },
];

export default function SupervisorClientesScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [term, setTerm] = useState('');
  const [filter, setFilter] = useState('Todos');

  const filtered = useMemo(() => {
    const t = term.trim().toLowerCase();
    return clients.filter(c => (filter==='Todos' || c.status === filter.toLowerCase()) && (!t || c.name.toLowerCase().includes(t)));
  }, [term, filter]);

  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top + 8 }]}> 
      <View style={styles.header}>
        <Text style={styles.title}>Clientes</Text>
        <TouchableOpacity style={styles.bell}><Ionicons name="notifications-outline" size={20} color="#F55A3C"/></TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#9CA3AF"/>
          <TextInput style={styles.input} placeholder="Buscar cliente/segmento..." placeholderTextColor="#9CA3AF" value={term} onChangeText={setTerm} />
        </View>
      </View>

      <View style={styles.kpiRow}>
        <Kpi label="Clientes" value={String(clients.length)} />
        <Kpi label="Ventas" value="$68,200" />
        <Kpi label="Por cobrar" value="$1,800" />
      </View>

      <View style={styles.filterRow}>
        {['Todos','Activos','Inactivos'].map(f => {
          const active = filter===f;
          return (
            <TouchableOpacity key={f} style={[styles.filterChip, active && styles.filterChipActive]} onPress={()=>setFilter(f)}>
              <Text style={[styles.filterText, active && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={i=>i.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <SellerClientCard
            client={item}
            onNewOrder={()=>console.log('Ver pedidos del cliente (TODO)')}
            onCall={()=>console.log('Llamar (simulado)')}
            onProfile={()=>console.log('Ver perfil de', item.name)}
          />
        )}
      />

      {/* TODO: conectar con backend aquí para stats de cartera, filtros por estado/segmento y vendedor responsable */}
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
  safeArea: { flex:1, backgroundColor:'#F7F7FB' },
  header: { flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginBottom: 12, paddingHorizontal: 16 },
  title: { fontSize:22, fontWeight:'700', color:'#111827' },
  bell: { width:42, height:42, borderRadius:21, backgroundColor:'#FFFFFF', alignItems:'center', justifyContent:'center' },
  searchRow: { paddingHorizontal:16, marginBottom: 12 },
  searchBar: { flexDirection:'row', alignItems:'center', backgroundColor:'#FFFFFF', borderRadius:18, paddingHorizontal:12, paddingVertical:8 },
  input: { flex:1, marginLeft:8, color:'#111827' },
  kpiRow: { flexDirection:'row', gap:10, paddingHorizontal:16, marginBottom: 12 },
  kpiCard: { flex:1, backgroundColor:'#FFFFFF', borderRadius:16, paddingVertical:12, alignItems:'center' },
  kpiValue: { fontSize:18, fontWeight:'700', color:'#111827' },
  kpiLabel: { fontSize:12, color:'#6B7280' },
  filterRow: { flexDirection:'row', gap:10, paddingHorizontal:16, marginBottom: 10 },
  filterChip: { flex:1, borderRadius:18, paddingVertical:10, alignItems:'center', backgroundColor:'#F3F4F6' },
  filterChipActive: { backgroundColor:'#F55A3C' },
  filterText: { color:'#6B7280', fontWeight:'600' },
  filterTextActive: { color:'#FFFFFF' },
});
