import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const VendedorZonaRutaScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  // TODO: conectar con backend para zona asignada, sectores, conteos y ruta del día
  const zona = {
    nombre: 'Zona Norte - Quito',
    sectores: ['La Carolina', 'Iñaquito', 'Jipijapa', 'Kennedy'],
    clientesActivos: 45,
    rutaHoy: ['Supermercado El Ahorro', 'Minimarket La Esquina', 'Tienda Don Pepe'],
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 10 }]} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.title}>Mi zona y rutas</Text>
          <View style={{ width: 44 }} />
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="location-outline" size={18} color="#E64A19" />
            <Text style={styles.cardHeaderText}>Zona Asignada</Text>
          </View>
          <Text style={styles.zoneName}>{zona.nombre}</Text>
          <Text style={styles.zoneSectors}>Sectores: {zona.sectores.join(', ')}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="people-outline" size={18} color="#E64A19" />
            <Text style={styles.cardHeaderText}>Clientes en mi Zona</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricValue}>{zona.clientesActivos}</Text>
            <Text style={styles.metricLabel}>Clientes Activos</Text>
          </View>
        </View>

        <View style={[styles.card, styles.routeCard]}> 
          <View style={styles.cardHeader}>
            <Ionicons name="navigate-outline" size={18} color="#2563EB" />
            <Text style={styles.cardHeaderText}>Ruta Optimizada Hoy</Text>
          </View>
          {zona.rutaHoy.map((stop, idx) => (
            <View key={stop} style={styles.stopRow}>
              <View style={styles.bullet}><Text style={styles.bulletText}>{idx + 1}</Text></View>
              <Text style={styles.stopText}>{stop}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F9FAFB' },
  content: { paddingHorizontal: 16, paddingBottom: 24 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  backButton: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.07, shadowRadius: 6, elevation: 3,
  },
  title: { fontSize: 18, fontWeight: '700', color: '#111827' },
  card: {
    backgroundColor: '#FFFFFF', borderRadius: 18, padding: 16, marginBottom: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  cardHeaderText: { fontWeight: '700', color: '#111827' },
  zoneName: { fontSize: 15, fontWeight: '700', color: '#111827' },
  zoneSectors: { marginTop: 6, color: '#6B7280' },
  metricBox: { alignSelf: 'center', backgroundColor: '#F3F4F6', paddingVertical: 16, paddingHorizontal: 22, borderRadius: 14, marginTop: 6 },
  metricValue: { fontSize: 22, fontWeight: '800', color: '#F43F5E', textAlign: 'center' },
  metricLabel: { fontSize: 12, color: '#6B7280', marginTop: 4, textAlign: 'center' },
  routeCard: { backgroundColor: '#E8F0FE' },
  stopRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10 },
  bullet: { width: 26, height: 26, borderRadius: 13, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  bulletText: { fontWeight: '700', color: '#2563EB' },
  stopText: { fontSize: 14, color: '#0F172A', fontWeight: '600' },
});

export default VendedorZonaRutaScreen;
