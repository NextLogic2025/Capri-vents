import React, { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import SupportTicketItem from '../../components/ui/SupportTicketItem';
import OrderProblemModal from '../../components/ui/OrderProblemModal';

const tickets = [
  { id: 'CASO-2025-201', type: 'Reclamo', priority: 'Alta', title: 'Cliente no estaba presente', description: 'No se pudo entregar el pedido por ausencia del cliente.', status: 'Abierto', createdAt: '11 nov 2025', repliesCount: 0 },
  { id: 'CASO-2025-202', type: 'Consulta', priority: 'Media', title: 'Duda sobre ruta óptima', description: '¿Cuál es el mejor orden para visitar clientes mañana?', status: 'En Proceso', createdAt: '10 nov 2025', repliesCount: 1 },
];

const statusFilters = ['Todos', 'Abierto', 'En Proceso', 'Resuelto'];

export default function VendedorCentroAyudaScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [createVisible, setCreateVisible] = useState(false);
  const insets = useSafeAreaInsets();

  const counters = useMemo(() => {
    const total = tickets.length;
    const abiertos = tickets.filter((t) => t.status === 'Abierto').length;
    const proceso = tickets.filter((t) => t.status === 'En Proceso').length;
    const resueltos = tickets.filter((t) => t.status === 'Resuelto').length;
    return { total, abiertos, proceso, resueltos };
  }, []);

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesFilter = activeFilter === 'Todos' ? true : ticket.status === activeFilter;
      const matchesSearch = ticket.title.toLowerCase().includes(search.toLowerCase()) || ticket.id.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [search, activeFilter]);

  const handleContact = (type) => {
    Alert.alert(`Contacto ${type}`, 'Acción simulada');
  };

  const openCreateModal = () => {
    setCreateVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 12 }]} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.title}>Soporte</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.contactRow}>
          <TouchableOpacity style={[styles.contactButton, styles.contactButtonFlex]} onPress={() => handleContact('Llamada')}>
            <Ionicons name="call-outline" size={20} color="#FFFFFF" />
            <Text style={styles.contactText}>Llamar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.contactButton, styles.contactButtonFlex]} onPress={() => handleContact('Email')}>
            <Ionicons name="mail-outline" size={20} color="#FFFFFF" />
            <Text style={styles.contactText}>Email</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.contactButton, styles.contactButtonFlex]} onPress={() => handleContact('WhatsApp')}>
            <Ionicons name="logo-whatsapp" size={20} color="#FFFFFF" />
            <Text style={styles.contactText}>WhatsApp</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar casos..."
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}><Text style={styles.summaryLabel}>Total</Text><Text style={styles.summaryValue}>{counters.total}</Text></View>
          <View style={styles.summaryCard}><Text style={styles.summaryLabel}>Abiertos</Text><Text style={styles.summaryValue}>{counters.abiertos}</Text></View>
          <View style={styles.summaryCard}><Text style={styles.summaryLabel}>En proceso</Text><Text style={styles.summaryValue}>{counters.proceso}</Text></View>
          <View style={styles.summaryCard}><Text style={styles.summaryLabel}>Resueltos</Text><Text style={styles.summaryValue}>{counters.resueltos}</Text></View>
        </View>

        <View style={styles.filterRow}>
          {statusFilters.map((filter) => {
            const active = activeFilter === filter;
            return (
              <TouchableOpacity key={filter} style={[styles.filterChip, active && styles.filterChipActive]} onPress={() => setActiveFilter(filter)}>
                <Text style={[styles.filterText, active && styles.filterTextActive]}>{filter}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {filteredTickets.map((ticket) => (
          <SupportTicketItem key={ticket.id} ticket={ticket} onPress={() => Alert.alert(ticket.title, 'Detalle simulado')} />
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={openCreateModal}>
        <MaterialCommunityIcons name="plus" size={26} color="#FFFFFF" />
      </TouchableOpacity>
      <OrderProblemModal
        visible={createVisible}
        onClose={() => setCreateVisible(false)}
        problems={[
          { key: 'entrega', title: 'Problema con Entrega', description: 'Incidente durante la entrega' },
          { key: 'cliente', title: 'Cliente con Problema', description: 'Conflicto o incidencia con el cliente' },
          { key: 'ruta', title: 'Problema con Ruta/Pedido', description: 'Ruta, secuencia o pedido con inconveniente' },
        ]}
        onSelectProblem={(problemKey, problemLabel) => {
          setCreateVisible(false);
          navigation.navigate('VendedorTicketSoporte', { problemType: problemKey, problemLabel });
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F9FAFB' },
  content: { paddingHorizontal: 24, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  backButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 3 },
  placeholder: { width: 44, height: 44 },
  title: { fontSize: 18, fontWeight: '700', color: '#111827' },
  contactRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  contactButton: { flexDirection: 'row', gap: 6, alignItems: 'center', backgroundColor: '#E64A19', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 10 },
  contactButtonFlex: { flex: 1, justifyContent: 'center' },
  contactText: { color: '#FFFFFF', fontWeight: '700' },
  searchBar: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#FFFFFF', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  searchInput: { flex: 1 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 14 },
  summaryCard: { backgroundColor: '#FFFFFF', borderRadius: 16, paddingVertical: 12, paddingHorizontal: 16, alignItems: 'center', flex: 1, marginHorizontal: 4 },
  summaryLabel: { color: '#6B7280', fontSize: 12 },
  summaryValue: { color: '#111827', fontSize: 18, fontWeight: '800', marginTop: 6 },
  filterRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  filterChip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F3F4F6' },
  filterChipActive: { backgroundColor: '#FFE4E6' },
  filterText: { color: '#6B7280', fontWeight: '600' },
  filterTextActive: { color: '#F43F5E' },
  fab: { position: 'absolute', right: 20, bottom: 24, backgroundColor: '#E64A19', width: 54, height: 54, borderRadius: 27, alignItems: 'center', justifyContent: 'center', elevation: 6 },
  
});
