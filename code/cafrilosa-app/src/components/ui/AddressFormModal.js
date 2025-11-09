import React, { useEffect, useState } from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";
import PrimaryButton from "./PrimaryButton";

const typeOptions = [
  { label: "Casa", value: "Casa" },
  { label: "Trabajo", value: "Trabajo" },
  { label: "Otra", value: "Otra" },
];

const defaultAddress = {
  type: "Casa",
  name: "",
  street: "",
  number: "",
  floor: "",
  apartment: "",
  city: "",
  province: "",
  postalCode: "",
  reference: "",
};

const AddressFormModal = ({ visible, mode = "add", initialAddress, onCancel, onSave }) => {
  const [form, setForm] = useState(defaultAddress);
  const [error, setError] = useState("");

  useEffect(() => {
    if (visible) {
      setForm(initialAddress ? { ...defaultAddress, ...initialAddress } : defaultAddress);
      setError("");
    }
  }, [visible, initialAddress]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.street.trim() || !form.city.trim() || !form.province.trim() || !form.postalCode.trim()) {
      setError("Completa todos los campos obligatorios");
      return;
    }
    setError("");
    if (onSave) {
      onSave(form);
    }
    // TODO: conectar con backend aqui para guardar/actualizar direcciones del usuario
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>{mode === "add" ? "Agregar direccion" : "Editar direccion"}</Text>
          <View style={styles.typeRow}>
            {typeOptions.map((option) => {
              const selected = form.type === option.value;
              return (
                <TouchableOpacity
                  key={option.value}
                  style={[styles.typeButton, selected && styles.typeButtonActive]}
                  onPress={() => handleChange("type", option.value)}
                >
                  <Text style={[styles.typeText, selected && styles.typeTextActive]}>{option.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TextInput
              style={styles.input}
              placeholder="Nombre de la direccion *"
              placeholderTextColor="#9CA3AF"
              value={form.name}
              onChangeText={(text) => handleChange("name", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Calle *"
              placeholderTextColor="#9CA3AF"
              value={form.street}
              onChangeText={(text) => handleChange("street", text)}
            />
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.rowInput]}
                placeholder="Numero"
                placeholderTextColor="#9CA3AF"
                value={form.number}
                onChangeText={(text) => handleChange("number", text)}
              />
              <TextInput
                style={[styles.input, styles.rowInput]}
                placeholder="Piso"
                placeholderTextColor="#9CA3AF"
                value={form.floor}
                onChangeText={(text) => handleChange("floor", text)}
              />
              <TextInput
                style={[styles.input, styles.rowInput]}
                placeholder="Depto"
                placeholderTextColor="#9CA3AF"
                value={form.apartment}
                onChangeText={(text) => handleChange("apartment", text)}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Ciudad *"
              placeholderTextColor="#9CA3AF"
              value={form.city}
              onChangeText={(text) => handleChange("city", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Provincia *"
              placeholderTextColor="#9CA3AF"
              value={form.province}
              onChangeText={(text) => handleChange("province", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Codigo postal *"
              placeholderTextColor="#9CA3AF"
              value={form.postalCode}
              onChangeText={(text) => handleChange("postalCode", text)}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Referencias"
              placeholderTextColor="#9CA3AF"
              value={form.reference}
              onChangeText={(text) => handleChange("reference", text)}
              multiline
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <View style={styles.footerActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <PrimaryButton title={mode === "add" ? "Guardar" : "Actualizar"} onPress={handleSubmit} style={styles.saveButton} />
            </View>
          </ScrollView>
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
    maxHeight: "90%",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },
  typeRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: "#F3F4F6",
    marginHorizontal: 4,
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
  input: {
    backgroundColor: "#F3F4F6",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#111827",
    marginBottom: 12,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
    marginRight: 8,
  },
  error: {
    color: "#DC2626",
    marginBottom: 8,
  },
  footerActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  cancelText: {
    color: "#6B7280",
    fontWeight: "600",
  },
  saveButton: {
    flex: 1,
    marginVertical: 0,
    marginLeft: 12,
  },
});

export default AddressFormModal;
