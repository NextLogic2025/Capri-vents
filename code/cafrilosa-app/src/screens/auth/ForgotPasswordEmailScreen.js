import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TextInputField from "../../components/ui/TextInputField";
import PrimaryButton from "../../components/ui/PrimaryButton";
import useAuthMock from "../../hooks/useAuthMock";
import { isValidEmail } from "../../utils/validations";

const ForgotPasswordEmailScreen = ({ navigation }) => {
  const { sendForgotPasswordCode } = useAuthMock();
  const [email, setEmail] = useState("");

  const handleSendCode = () => {
    if (!isValidEmail(email)) {
      // TODO: mostrar mensajes de error si el correo no es válido
      return;
    }

    sendForgotPasswordCode(email);
    // TODO: conectar con backend aquí para enviar código al correo
    navigation.navigate("ForgotPasswordCode", { email });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.topTitle}>Recuperar contraseña</Text>
        </View>

        <Text style={styles.subtitle}>
          Ingresa tu correo electrónico para enviarte un código de verificación
        </Text>

        <TextInputField
          label="Correo Electrónico"
          placeholder="tucorreo@ejemplo.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          iconName="email-outline"
        />

        <PrimaryButton title="Enviar código" onPress={handleSendCode} />
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

export default ForgotPasswordEmailScreen;
