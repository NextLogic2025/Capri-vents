import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";
import AuthHeader from "../../components/ui/AuthHeader";
import TextInputField from "../../components/ui/TextInputField";
import PasswordInputField from "../../components/ui/PasswordInputField";
import CheckboxField from "../../components/ui/CheckboxField";
import PrimaryButton from "../../components/ui/PrimaryButton";
import useAuthMock from "../../hooks/useAuthMock";
import { isValidEmail, isValidPassword } from "../../utils/validations";

const RegisterScreen = ({ navigation }) => {
  const { register } = useAuthMock();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleRegister = () => {
    if (!fullName || !email || !password || !confirmPassword) {
      // TODO: mostrar errores en texto rojo debajo de los campos si algo falla
      return;
    }

    if (!isValidEmail(email) || !isValidPassword(password) || password !== confirmPassword || !acceptTerms) {
      // TODO: mostrar errores en texto rojo debajo de los campos si algo falla
      return;
    }

    register({ fullName, email, password });
    // TODO: conectar con backend aquí para registrar usuario
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <AuthHeader showBackButton onBackPress={() => navigation.goBack()} />
        <View style={styles.content}>
          <Text style={styles.title}>Crear Cuenta</Text>
          <Text style={styles.subtitle}>Completa los datos para registrarte</Text>

          <TextInputField
            label="Nombre Completo"
            placeholder="Juan Pérez"
            value={fullName}
            onChangeText={setFullName}
            iconName="account-outline"
          />
          <TextInputField
            label="Correo Electrónico"
            placeholder="tucorreo@ejemplo.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            iconName="email-outline"
          />
          <PasswordInputField
            label="Contraseña"
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChangeText={setPassword}
            iconName="lock-outline"
          />
          <PasswordInputField
            label="Confirmar Contraseña"
            placeholder="Repite tu contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            iconName="lock-check-outline"
          />

          <CheckboxField
            checked={acceptTerms}
            onToggle={() => setAcceptTerms((prev) => !prev)}
            label={
              <Text style={styles.checkboxText}>
                Acepto los <Text style={styles.checkboxLink}>Términos y Condiciones</Text> y la <Text style={styles.checkboxLink}>Política de Privacidad</Text>.
              </Text>
            }
            style={styles.checkbox}
          />

          <PrimaryButton title="Crear Cuenta" onPress={handleRegister} style={styles.goldButton} />
        </View>
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
    paddingBottom: 40,
  },
  content: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 24,
  },
  checkbox: {
    marginTop: 8,
  },
  checkboxText: {
    fontSize: 14,
    color: "#4B5563",
  },
  checkboxLink: {
    fontSize: 14,
    color: "#E64A19",
    fontWeight: "600",
  },
  goldButton: {
    backgroundColor: "#D9A441",
    marginTop: 16,
  },
});

export default RegisterScreen;
