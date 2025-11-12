import React, { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PROBLEM_TYPES = [
  { key: 'entrega', label: 'Problema con Entrega' },
  { key: 'cliente', label: 'Cliente con Problema' },
  { key: 'ruta', label: 'Problema con Ruta/Pedido' },
];

const randomCaseCode = () => {
  const rand = Math.floor(Math.random() * 9000) + 1000; // 4 dígitos
  return `CASO-${new Date().getFullYear()}-${rand}`;
};

export default function VendedorTicketSoporteScreen({ navigation, route }) {
  const { orderId, problemType: initProblemType, problemLabel: initProblemLabel } = route.params || {};
  const [caseCode] = useState(randomCaseCode());
  const [problemType, setProblemType] = useState(initProblemType || PROBLEM_TYPES[0].key);
  const [description, setDescription] = useState('');

  const selectedLabel = useMemo(() => PROBLEM_TYPES.find(p => p.key === problemType)?.label || '' , [problemType]);

  const handleAttachEvidence = () => {
    // TODO: integrar picker de archivos/imagenes
    Alert.alert('Evidencia', 'Adjuntar evidencia (simulado)');
  };

  const handleCreateTicket = () => {
    if (!description.trim()) {
      Alert.alert('Describe el problema', 'Por favor ingresa una descripción.');
      return;
    }
    const payload = { caseCode, orderId, problemType, problemLabel: selectedLabel, description };
    console.log('Vendedor crea ticket', payload);
    Alert.alert('Ticket creado', `${caseCode} creado (simulado)`);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nuevo Ticket de Soporte</Text>
          <View style={styles.backPlaceholder} />
        </View>

        <Text style={styles.subtitle}>Describe el inconveniente para que el equipo de soporte pueda ayudarte.</Text>

        <View style={styles.card}>
          <View style={styles.badge}><Text style={styles.badgeText}>{caseCode}</Text></View>

          <Text style={styles.label}>Tipo del problema</Text>
          {initProblemType ? (
            <View style={styles.inputDisabled}><Text style={styles.disabledText}>{initProblemLabel || selectedLabel}</Text></View>
          ) : (
            <View style={styles.chipsRow}>
              {PROBLEM_TYPES.map((t) => {
                const active = t.key === problemType;
                return (
                  <TouchableOpacity key={t.key} style={[styles.chip, active && styles.chipActive]} onPress={() => setProblemType(t.key)}>
                    <Text style={[styles.chipText, active && styles.chipTextActive]}>{t.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {!!orderId && (
            <>
              <Text style={styles.label}>Código de Pedido</Text>
              <View style={styles.inputDisabled}><Text style={styles.disabledText}>{orderId}</Text></View>
            </>
          )}

          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={styles.textArea}
            multiline
            placeholder="Describe detalladamente el problema"
            placeholderTextColor="#9CA3AF"
            value={description}
            onChangeText={setDescription}
          />

          <Text style={styles.label}>Evidencias</Text>
          <TouchableOpacity style={styles.evidenceButton} onPress={handleAttachEvidence}>
            <Ionicons name="cloud-upload-outline" size={20} color="#E64A19" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitButton} onPress={handleCreateTicket}>
            <Text style={styles.submitText}>Crear Ticket</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F9FAFB' },
  content: { paddingHorizontal: 24, paddingBottom: 40, paddingTop: 40 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  backButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 3 },
  backPlaceholder: { width: 44, height: 44 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },
  subtitle: { color: '#6B7280', marginBottom: 20, lineHeight: 20 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 4 },
  badge: { backgroundColor: '#E0F2FE', borderRadius: 14, paddingVertical: 8, paddingHorizontal: 12, marginBottom: 18 },
  badgeText: { color: '#0F172A', fontWeight: '700' },
  label: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 6, marginTop: 6 },
  inputDisabled: { backgroundColor: '#F3F4F6', borderRadius: 16, paddingVertical: 12, paddingHorizontal: 14, marginBottom: 12 },
  disabledText: { color: '#6B7280' },
  textArea: { backgroundColor: '#F3F4F6', borderRadius: 16, padding: 14, height: 140, textAlignVertical: 'top', color: '#111827', marginBottom: 16 },
  evidenceButton: { width: 48, height: 48, borderRadius: 16, borderWidth: 1, borderColor: '#F28B82', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  submitButton: { backgroundColor: '#E64A19', borderRadius: 24, paddingVertical: 14, alignItems: 'center' },
  submitText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
});
