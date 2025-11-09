import React, { useEffect, useState } from "react";
import { Modal, View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import PasswordInputField from "./PasswordInputField";
import PrimaryButton from "./PrimaryButton";

const ChangePasswordModal = ({ visible, onClose, onPasswordChanged }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!visible) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setError("");
    }
  }, [visible]);

  const handleSave = () => {
    if (!currentPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }
    if (newPassword.length < 6) {
      setError("La nueva contrasena debe tener al menos 6 caracteres");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Las contrasenas no coinciden");
      return;
    }
    setError("");
    // TODO: conectar con backend aqui para validar contrasena actual y guardar la nueva contrasena
    if (onPasswordChanged) {
      onPasswordChanged();
    }
    Alert.alert("Contrasena actualizada", "Cambio realizado exitosamente (simulado)");
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Cambiar contrasena</Text>
          <PasswordInputField
            label="Contrasena actual"
            placeholder="Ingresa tu contrasena"
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
          <PasswordInputField
            label="Nueva contrasena"
            placeholder="Minimo 6 caracteres"
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <PasswordInputField
            label="Confirmar contrasena"
            placeholder="Repite la nueva contrasena"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <PrimaryButton title="Guardar" onPress={handleSave} />
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
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
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
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
});

export default ChangePasswordModal;
