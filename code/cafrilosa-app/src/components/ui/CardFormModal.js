import React, { useEffect, useState } from "react";
import { Modal, View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import PrimaryButton from "./PrimaryButton";

const defaultCard = {
  number: "",
  holder: "",
  expiry: "",
  type: "Credito",
  brand: "",
};

const CardFormModal = ({ visible, mode = "add", initialCard, onCancel, onSave }) => {
  const [form, setForm] = useState(defaultCard);
  const [error, setError] = useState("");

  useEffect(() => {
    if (visible) {
      setForm(initialCard ? { ...defaultCard, ...initialCard } : defaultCard);
      setError("");
    }
  }, [visible, initialCard]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (form.number.replace(/\s/g, "").length < 12 || !form.holder.trim() || !form.expiry.trim()) {
      setError("Completa los datos obligatorios");
      return;
    }
    setError("");
    if (onSave) {
      onSave({
        ...form,
        number: form.number.replace(/\s/g, ""),
      });
    }
    // TODO: conectar con backend aqui para guardar tarjetas, marcar como predeterminada y eliminarlas
  };

  const renderTypeButton = (label) => {
    const selected = form.type === label;
    return (
      <TouchableOpacity
        key={label}
        style={[styles.typeButton, selected && styles.typeButtonActive]}
        onPress={() => handleChange("type", label)}
      >
        <Text style={[styles.typeText, selected && styles.typeTextActive]}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>{mode === "add" ? "Agregar tarjeta" : "Editar tarjeta"}</Text>
          <View style={styles.typeRow}>{["Credito", "Debito"].map(renderTypeButton)}</View>
          <TextInput
            style={styles.input}
            placeholder="Numero de tarjeta"
            placeholderTextColor="#9CA3AF"
            keyboardType="number-pad"
            value={form.number}
            onChangeText={(text) => handleChange("number", text)}
            maxLength={19}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre del titular"
            placeholderTextColor="#9CA3AF"
            value={form.holder}
            onChangeText={(text) => handleChange("holder", text.toUpperCase())}
            autoCapitalize="characters"
          />
          <TextInput
            style={styles.input}
            placeholder="Marca o banco (VISA, Mastercard...)"
            placeholderTextColor="#9CA3AF"
            value={form.brand}
            onChangeText={(text) => handleChange("brand", text.toUpperCase())}
            autoCapitalize="characters"
          />
          <TextInput
            style={styles.input}
            placeholder="Vencimiento (MM/AA)"
            placeholderTextColor="#9CA3AF"
            value={form.expiry}
            onChangeText={(text) => handleChange("expiry", text)}
            maxLength={5}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <PrimaryButton title={mode === "add" ? "Guardar tarjeta" : "Actualizar tarjeta"} onPress={handleSubmit} />
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#F3F4F6",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#111827",
    marginBottom: 12,
  },
  error: {
    color: "#DC2626",
    marginBottom: 8,
  },
  cancelButton: {
    alignItems: "center",
    marginTop: 8,
  },
  cancelText: {
    color: "#6B7280",
    fontWeight: "600",
  },
  typeRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: "#F3F4F6",
    marginRight: 8,
    alignItems: "center",
  },
  typeButtonActive: {
    backgroundColor: "#FFE4E6",
    borderWidth: 1,
    borderColor: "#FB7185",
  },
  typeText: {
    color: "#6B7280",
    fontWeight: "600",
  },
  typeTextActive: {
    color: "#B91C1C",
  },
});

export default CardFormModal;
