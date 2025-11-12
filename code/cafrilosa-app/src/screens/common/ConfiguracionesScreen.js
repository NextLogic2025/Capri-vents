import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';

const Row = ({ icon, title, right, onPress }) => (
  <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.85}>
    <View style={styles.rowLeft}>
      <View style={styles.rowIcon}>{icon}</View>
      <Text style={styles.rowTitle}>{title}</Text>
    </View>
    {right}
  </TouchableOpacity>
);

export default function ConfiguracionesScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { isDark, toggleTheme, colors } = useTheme();
  const [pushEnabled, setPushEnabled] = useState(false);

  const requestPushPermission = async () => {
    // TODO: integrar expo-notifications; por ahora simulamos
    Alert.alert('Notificaciones', pushEnabled ? 'Notificaciones desactivadas' : 'Notificaciones activadas');
    setPushEnabled(!pushEnabled);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}> 
      <View style={[styles.header, { paddingTop: insets.top + 4 }]}> 
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Configuraciones</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { backgroundColor: colors.card }]}> 
          <Row
            icon={<Ionicons name="notifications-outline" size={20} color="#E64A19" />}
            title="Notificaciones Push"
            right={<Switch value={pushEnabled} onValueChange={requestPushPermission} />}
          />
          <View style={styles.divider} />
          <Row
            icon={<Ionicons name="moon-outline" size={20} color="#E64A19" />}
            title="Modo Oscuro"
            right={<Switch value={isDark} onValueChange={toggleTheme} />}
          />
        </View>

        <View style={[styles.card, { backgroundColor: colors.card }]}> 
          <Row
            icon={<Ionicons name="language-outline" size={20} color="#E64A19" />}
            title="Idioma"
            right={<Text style={styles.rightText}>Español</Text>}
            onPress={() => Alert.alert('Idioma', 'Próximamente')}
          />
          <View style={styles.divider} />
          <Row
            icon={<Ionicons name="lock-closed-outline" size={20} color="#E64A19" />}
            title="Privacidad y Seguridad"
            right={<Ionicons name="chevron-forward" size={18} color="#9CA3AF" />}
            onPress={() => Alert.alert('Privacidad', 'Próximamente')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.04)'
  },
  title: { fontSize: 18, fontWeight: '700' },
  card: {
    borderRadius: 16,
    padding: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 12 },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  rowIcon: {
    width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF1F2'
  },
  rowTitle: { fontSize: 15, fontWeight: '600' },
  rightText: { color: '#6B7280' },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginHorizontal: 8 },
});
