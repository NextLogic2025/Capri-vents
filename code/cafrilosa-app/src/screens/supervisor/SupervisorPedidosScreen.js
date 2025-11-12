import React, { useMemo, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SellerOrderCard from '../../components/vendedor/SellerOrderCard';

const ORDERS = [
  { id: 'PED-2024-101', client: { name: 'Supermercado El Ahorro' }, date: '2024-11-10T10:45:00Z', total: 250.75, status: 'En Proceso', seller: 'Carlos Mendoza', items: [{id:'1',name:'Chorizo',quantity:2,unitPrice:12.5}] },
  { id: 'PED-2024-102', client: { name: 'Minimarket La Esquina' }, date: '2024-11-10T09:20:00Z', total: 180.20, status: 'Entregado', seller: 'Roberto Gómez', items: [{id:'2',name:'Jamón',quantity:1,unitPrice:10}] },
  { id: 'PED-2024-103', client: { name: 'Tienda Don Pepe' }, date: '2024-11-10T12:30:00Z', total: 320.00, status: 'Pendiente', seller: 'Ana Torres', items: [{id:'3',name:'Salame',quantity:5,unitPrice:8}] },
];

export default function SupervisorPedidosScreen() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('Todos');
  const [detailOrder, setDetailOrder] = useState(null);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return ORDERS.filter(o => (status==='Todos' || o.status===status) && (!term || o.id.toLowerCase().includes(term) || o.client.name.toLowerCase().includes(term)));
  }, [search, status]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}><Text style={styles.title}>Pedidos</Text></View>
      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#9CA3AF" />
          <TextInput style={styles.searchInput} placeholder="Buscar pedido/cliente..." placeholderTextColor="#9CA3AF" value={search} onChangeText={setSearch} />
        </View>
      </View>

      <View style={styles.filterRow}>
        {['Todos','En Proceso','Entregado','Pendiente'].map(f => {
          const active = status===f;
          return (
            <TouchableOpacity key={f} style={[styles.filterChip, active && styles.filterChipActive]} onPress={()=>setStatus(f)}>
              <Text style={[styles.filterText, active && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item=>item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        renderItem={({item}) => (
          <SellerOrderCard order={item} onViewDetails={setDetailOrder} />
        )}
        showsVerticalScrollIndicator={false}
      />

      <Modal visible={!!detailOrder} transparent animationType="slide" onRequestClose={()=>setDetailOrder(null)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Detalle del Pedido</Text>
              <TouchableOpacity onPress={()=>setDetailOrder(null)}><Ionicons name="close" size={22} color="#111827"/></TouchableOpacity>
            </View>
            {detailOrder && (
              <>
                <Text style={styles.modalSubtitle}>{detailOrder.id} • {detailOrder.client.name}</Text>
                <Text style={styles.modalMeta}>Vendedor: {detailOrder.seller}</Text>
                <Text style={styles.modalMeta}>Estado: {detailOrder.status}</Text>
                <Text style={[styles.modalMeta,{ marginTop:8, fontWeight:'700'}]}>Items</Text>
                {detailOrder.items?.map(it => (
                  <View key={it.id} style={styles.itemRow}>
                    <Text style={{flex:1}}>{it.name}</Text>
                    <Text style={{width:70, textAlign:'right'}}>x{it.quantity}</Text>
                    <Text style={{width:80, textAlign:'right'}}>${(it.quantity*it.unitPrice).toFixed(2)}</Text>
                  </View>
                ))}
                <View style={styles.totalRow}><Text style={styles.totalLabel}>Total</Text><Text style={styles.totalValue}>${detailOrder.total.toFixed(2)}</Text></View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* TODO: conectar con backend aquí para listar/f filtrar pedidos por zona, fecha, vendedor y estado */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex:1, backgroundColor:'#F7F7FB', paddingTop: 12 },
  header: { paddingHorizontal:16, marginBottom: 10 },
  title: { fontSize:22, fontWeight:'700', color:'#111827' },
  searchRow: { paddingHorizontal:16, marginBottom:12 },
  searchBar: { flexDirection:'row', alignItems:'center', backgroundColor:'#FFFFFF', borderRadius:18, paddingHorizontal:12, paddingVertical:8 },
  searchInput: { flex:1, marginLeft:8, color:'#111827' },
  filterRow: { flexDirection:'row', gap:10, paddingHorizontal:16, marginBottom: 10 },
  filterChip: { paddingHorizontal:12, paddingVertical:8, borderRadius:18, backgroundColor:'#F3F4F6' },
  filterChipActive: { backgroundColor:'#F55A3C' },
  filterText: { color:'#6B7280', fontWeight:'600' },
  filterTextActive: { color:'#FFFFFF' },
  modalOverlay: { flex:1, backgroundColor:'rgba(0,0,0,0.45)', justifyContent:'flex-end' },
  modalCard: { backgroundColor:'#FFFFFF', borderTopLeftRadius:20, borderTopRightRadius:20, padding:16 },
  modalHeader: { flexDirection:'row', alignItems:'center', justifyContent:'space-between' },
  modalTitle: { fontSize:16, fontWeight:'700', color:'#111827' },
  modalSubtitle: { marginTop:6, color:'#111827', fontWeight:'700' },
  modalMeta: { color:'#6B7280', marginTop:4 },
  itemRow: { flexDirection:'row', alignItems:'center', paddingVertical:6 },
  totalRow: { flexDirection:'row', justifyContent:'space-between', marginTop:10, borderTopWidth:1, borderTopColor:'#E5E7EB', paddingTop:8 },
  totalLabel: { color:'#6B7280' },
  totalValue: { color:'#F55A3C', fontWeight:'800' },
});
