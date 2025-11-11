import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PrimaryButton from "../../components/ui/PrimaryButton";
import useAuthMock from "../../hooks/useAuthMock";
import { isValidCode5Digits } from "../../utils/validations";

const ForgotPasswordCodeScreen = ({ navigation, route }) => {
  const { verifyForgotPasswordCode } = useAuthMock();
  const [code, setCode] = useState("");
  const email = route?.params?.email || "";

  const handleValidateCode = () => {
    if (!isValidCode5Digits(code)) {
      // TODO: mostrar mensaje de error si el código no es válido
      return;
    }

    verifyForgotPasswordCode(email, code);
    // TODO: conectar con backend aquí para validar el código
    navigation.navigate("ForgotPasswordReset", { email });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.topTitle}>Ingresa el código</Text>
        </View>
        <Text style={styles.subtitle}>Revisa tu correo. Hemos enviado un código de 5 dígitos</Text>

        <TextInput
          style={styles.codeInput}
          value={code}
          onChangeText={setCode}
          placeholder="00000"
          placeholderTextColor="#9CA3AF"
          keyboardType="number-pad"
          maxLength={5}
          textAlign="center"
        />

        <PrimaryButton title="Validar código" onPress={handleValidateCode} />
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
  codeInput: {
    width: 160,
    alignSelf: "center",
    height: 64,
    borderRadius: 32,
    backgroundColor: "#F3F4F6",
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: 12,
    color: "#111827",
    marginBottom: 24,
  },
});

export default ForgotPasswordCodeScreen;
