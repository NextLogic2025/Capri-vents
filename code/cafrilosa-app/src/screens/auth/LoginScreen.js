import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AuthHeader from "../../components/ui/AuthHeader";
import TextInputField from "../../components/ui/TextInputField";
import PasswordInputField from "../../components/ui/PasswordInputField";
import CheckboxField from "../../components/ui/CheckboxField";
import PrimaryButton from "../../components/ui/PrimaryButton";
import useAuthMock from "../../hooks/useAuthMock";
import { isValidEmail } from "../../utils/validations";

const LoginScreen = ({ navigation }) => {
  const { login } = useAuthMock();
  const [email, setEmail] = useState("cliente@cafrilosa.com");
  const [password, setPassword] = useState("cliente123");
  const [remember, setRemember] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Ingresa correo y contraseña");
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage("Correo inválido");
      return;
    }

    setLoading(true);
    const result = login(email, password);
    // TODO: aquí, cuando exista backend real, reemplazar este login quemado por una llamada a la API.

    if (!result.success) {
      setErrorMessage(result.message);
      setLoading(false);
      return;
    }

    const { user } = result;
    setLoading(false);

    if (user.role === "cliente") {
      navigation.reset({
        index: 0,
        routes: [{ name: "ClienteTabs", params: { user } }],
      });
    } else if (user.role === "vendedor") {
      navigation.reset({
        index: 0,
        routes: [{ name: "VendedorTabs" }],
      });
    } else if (user.role === "supervisor") {
      navigation.reset({
        index: 0,
        routes: [{ name: "SupervisorHome" }],
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <AuthHeader />
        <View style={styles.content}>
          <Text style={styles.title}>¡Bienvenido!</Text>
          <Text style={styles.subtitle}>Ingresa a tu cuenta para continuar</Text>

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
            placeholder="********"
            value={password}
            onChangeText={setPassword}
            iconName="lock-outline"
          />

          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          <View style={styles.row}>
            <CheckboxField
              checked={remember}
              onToggle={() => setRemember((prev) => !prev)}
              label="Recordarme"
            />
            <TouchableOpacity onPress={() => navigation.navigate("ForgotPasswordEmail")}>
              <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
          </View>

          <PrimaryButton
            title={loading ? "Ingresando..." : "Iniciar Sesión"}
            onPress={handleLogin}
            disabled={loading}
          />

          <View style={styles.separator}>
            <View style={styles.line} />
            <View style={styles.dot} />
            <View style={styles.line} />
          </View>

          <View style={styles.footerTextWrapper}>
            <Text style={styles.footerText}>¿No tienes una cuenta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.registerText}>Regístrate</Text>
            </TouchableOpacity>
          </View>
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
    paddingBottom: 32,
  },
  content: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    marginBottom: 24,
  },
  errorText: {
    color: "#DC2626",
    fontSize: 13,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  forgotText: {
    fontSize: 13,
    color: "#E64A19",
    fontWeight: "600",
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#D1D5DB",
    marginHorizontal: 10,
  },
  footerTextWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  footerText: {
    color: "#6B7280",
    marginRight: 4,
  },
  registerText: {
    color: "#E64A19",
    fontWeight: "600",
  },
});

export default LoginScreen;
