import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ClienteTicketSoporteScreen = ({ navigation, route }) => {
  const { orderId, problemKey, problemLabel } = route.params || {};
  const [description, setDescription] = useState("");

  const handleCreateTicket = () => {
    if (!description.trim()) {
      Alert.alert("Describe el problema", "Por favor, ingresa una descripcion para continuar");
      return;
    }

    console.log("Crear ticket", { orderId, problemKey, problemLabel, description });
    // TODO: conectar con backend aqui para crear un ticket de soporte
    Alert.alert("Ticket creado", "Ticket creado exitosamente (simulado)");
    // TODO: guardar este ticket en una fuente global (contexto o backend) para verlo luego en Centro de Ayuda
    // navigation.navigate("ClientePerfilStack", { screen: "ClienteCentroAyuda" });
    navigation.navigate("ClientePedidos");
  };

  const handleAttachEvidence = () => {
    console.log("TODO: adjuntar evidencias");
    // TODO: conectar con backend aqui para adjuntar evidencias
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
        <Text style={styles.subtitle}>
          Cuéntanos qué sucedió con tu pedido y nuestro equipo te contactará lo antes posible.
        </Text>

        <View style={styles.card}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Relacionado con pedido: {orderId}</Text>
          </View>

          <Text style={styles.label}>Codigo de Pedido</Text>
          <View style={styles.inputDisabled}>
            <Text style={styles.disabledText}>{orderId}</Text>
          </View>

          <Text style={styles.label}>Asunto</Text>
          <View style={styles.inputDisabled}>
            <Text style={styles.disabledText}>{problemLabel}</Text>
          </View>

          <Text style={styles.label}>Descripcion</Text>
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
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 24,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  backPlaceholder: {
    width: 44,
    height: 44,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    color: "#6B7280",
    marginBottom: 20,
    lineHeight: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
  },
  badge: {
    backgroundColor: "#E0F2FE",
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 18,
  },
  badgeText: {
    color: "#0F172A",
    fontWeight: "600",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },
  inputDisabled: {
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  disabledText: {
    color: "#6B7280",
  },
  textArea: {
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    padding: 14,
    height: 140,
    textAlignVertical: "top",
    color: "#111827",
    marginBottom: 16,
  },
  evidenceButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F28B82",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  submitButton: {
    backgroundColor: "#E64A19",
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: "center",
  },
  submitText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default ClienteTicketSoporteScreen;

