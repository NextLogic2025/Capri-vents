import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProfileOptionItem from '../../components/ui/ProfileOptionItem';

const supervisor = {
  initials: 'JS',
  name: 'Javier Suárez',
  email: 'javier.suarez@cafrilosa.com',
  idCode: 'SUP-2024-010',
  zone: 'Zona Norte',
  kpis: { ventasMes: 128450, pedidosActivos: 147, cobertura: '94%' },
  goalPercent: 86,
};

export default function SupervisorPerfilScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 12 }]} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Perfil</Text>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              // TODO: cerrar sesión real
              navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
            }}
          >
            <Ionicons name="exit-outline" size={22} color="#F55A3C" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatar}><Text style={styles.avatarText}>{supervisor.initials}</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{supervisor.name}</Text>
            <Text style={styles.email}>{supervisor.email}</Text>
            <Text style={styles.meta}>ID: {supervisor.idCode} • {supervisor.zone}</Text>
          </View>
        </View>

        <View style={styles.goalCard}>
          <Text style={styles.goalTitle}>Meta Mensual</Text>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${supervisor.goalPercent}%` }]} />
          </View>
          <Text style={styles.goalPercent}>{supervisor.goalPercent}%</Text>
        </View>

        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Mi Cuenta</Text></View>
        <ProfileOptionItem
          icon={<Ionicons name="person-outline" size={22} color="#F55A3C" />}
          title="Datos Personales"
          subtitle="Actualizar tu información"
          onPress={() => console.log('Datos personales (TODO)')}
        />
        <ProfileOptionItem
          icon={<Ionicons name="notifications-outline" size={22} color="#F97316" />}
          title="Notificaciones"
          subtitle="Preferencias de alertas"
          onPress={() => console.log('Notificaciones (TODO)')}
        />
        <ProfileOptionItem
          icon={<Ionicons name="map-outline" size={22} color="#2563EB" />}
          title="Mi Equipo y Zonas"
          subtitle="Cobertura y responsables"
          onPress={() => console.log('Equipo y zonas (TODO)')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F7FB' },
  content: { paddingHorizontal: 16, paddingBottom: 32 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  title: { fontSize: 24, fontWeight: '700', color: '#111827' },
  logoutButton: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  profileCard: { flexDirection: 'row', gap: 12, alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 22, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#FFE4E6', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#F55A3C', fontWeight: '800' },
  name: { fontSize: 16, fontWeight: '700', color: '#111827' },
  email: { color: '#6B7280', marginTop: 2 },
  meta: { color: '#6B7280', marginTop: 4, fontSize: 12 },
  goalCard: { backgroundColor: '#FFFFFF', borderRadius: 22, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  goalTitle: { color: '#111827', fontWeight: '700', marginBottom: 10 },
  progressBarBg: { height: 10, borderRadius: 6, backgroundColor: '#F3F4F6' },
  progressBarFill: { height: 10, borderRadius: 6, backgroundColor: '#F55A3C' },
  goalPercent: { color: '#F55A3C', fontWeight: '800', marginTop: 8 },
  sectionHeader: { marginTop: 6, marginBottom: 8 },
  sectionTitle: { color: '#6B7280', fontWeight: '700' },
});
