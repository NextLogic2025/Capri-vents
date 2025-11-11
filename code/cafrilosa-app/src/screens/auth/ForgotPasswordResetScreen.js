import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PasswordInputField from "../../components/ui/PasswordInputField";
import PrimaryButton from "../../components/ui/PrimaryButton";
import useAuthMock from "../../hooks/useAuthMock";
import { isValidPassword } from "../../utils/validations";

const ForgotPasswordResetScreen = ({ navigation, route }) => {
  const { resetPassword } = useAuthMock();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const email = route?.params?.email || "";

  const handleSavePassword = () => {
    if (!isValidPassword(newPassword) || newPassword !== confirmPassword) {
      // TODO: mostrar mensajes de error si las contraseñas no coinciden o no cumplen reglas
      return;
    }

    resetPassword(email, newPassword);
    // TODO: conectar con backend aquí para guardar la nueva contraseña
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.topTitle}>Nueva contraseña</Text>
        </View>
        <Text style={styles.subtitle}>Ingresa tu nueva contraseña</Text>

        <PasswordInputField
          label="Nueva contraseña"
          placeholder="********"
          value={newPassword}
          onChangeText={setNewPassword}
          iconName="lock-reset"
        />
        <PasswordInputField
          label="Confirmar contraseña"
          placeholder="********"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          iconName="lock-check-outline"
        />

        <PrimaryButton title="Guardar contraseña" onPress={handleSavePassword} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 32,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  topTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 24,
  },
});

export default ForgotPasswordResetScreen;
