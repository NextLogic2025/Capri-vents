import React, { useEffect, useState } from "react";
import { Modal, View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import PrimaryButton from "./PrimaryButton";

const EMAIL_CODE = "12345";

const ChangeEmailModal = ({ visible, currentEmail, onClose, onEmailUpdated }) => {
  const [step, setStep] = useState(1);
  const [newEmail, setNewEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!visible) {
      setStep(1);
      setNewEmail("");
      setCode("");
      setError("");
    }
  }, [visible]);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSendCode = () => {
    if (!validateEmail(newEmail)) {
      setError("Ingresa un correo valido");
      return;
    }
    setError("");
    setStep(2);
    // TODO: conectar con backend aqui para enviar codigo de verificacion al nuevo correo
  };

  const handleConfirm = () => {
    if (code !== EMAIL_CODE) {
      setError("Codigo incorrecto");
      return;
    }
    setError("");
    if (onEmailUpdated) {
      onEmailUpdated(newEmail);
    }
    // TODO: conectar con backend aqui para validar codigo y actualizar correo en la base de datos
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Cambiar correo electronico</Text>
          {step === 1 ? (
            <>
              <Text style={styles.description}>
                Tu correo actual es: <Text style={styles.bold}>{currentEmail}</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Nuevo correo"
                placeholderTextColor="#9CA3AF"
                value={newEmail}
                onChangeText={setNewEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              {error ? <Text style={styles.error}>{error}</Text> : null}
              <PrimaryButton title="Enviar codigo" onPress={handleSendCode} />
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.description}>
                Ingresa el codigo de 5 digitos enviado a{" "}
                <Text style={styles.bold}>{newEmail}</Text>
              </Text>
              <TextInput
                style={[styles.input, styles.codeInput]}
                placeholder="Codigo"
                placeholderTextColor="#9CA3AF"
                value={code}
                onChangeText={setCode}
                maxLength={5}
                keyboardType="number-pad"
              />
              {error ? <Text style={styles.error}>{error}</Text> : null}
              <PrimaryButton title="Confirmar" onPress={handleConfirm} />
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
            </>
          )}
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
    padding: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 16,
  },
  bold: {
    fontWeight: "700",
    color: "#111827",
  },
  input: {
    backgroundColor: "#F3F4F6",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#111827",
    marginBottom: 12,
  },
  codeInput: {
    textAlign: "center",
    letterSpacing: 8,
    fontSize: 18,
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

export default ChangeEmailModal;
