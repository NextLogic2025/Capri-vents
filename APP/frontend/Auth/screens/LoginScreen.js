import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import LogoCafrilosa from '../../assets/images/logo-cafrilosa.png';
import { useAppContext } from '../../context/AppContext';

const demoAccounts = [
  {
    role: 'cliente',
    email: 'cliente@cafrilosa.com',
    password: '123456',
  },
  {
    role: 'vendedor',
    email: 'vendedor@cafrilosa.com',
    password: '123456',
  },
  {
    role: 'supervisor',
    email: 'supervisor@cafrilosa.com',
    password: '123456',
  },
];

const AuthInput = ({
  label,
  icon,
  value,
  onChangeText,
  placeholder,
  secure,
  showPassword,
  onTogglePassword,
  keyboardType = 'default',
  autoCapitalize = 'none',
}) => (
  <View style={styles.fieldGroup}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <View style={styles.inputWrapper}>
      <Ionicons name={icon} size={20} color={colors.muted} style={styles.inputIcon} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secure && !showPassword}
        style={styles.input}
      />
      {secure && (
        <TouchableOpacity style={styles.eyeButton} onPress={onTogglePassword}>
          <Ionicons
            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color={colors.muted}
          />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

const LoginScreen = ({ navigation }) => {
  const { login } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigateByRole = (role) => {
    const parentNav = navigation.getParent?.() || navigation;
    const target =
      role === 'vendedor'
        ? 'VendedorModulo'
        : role === 'supervisor'
        ? 'SupervisorModulo'
        : 'ClienteTabs';
    parentNav.reset({ index: 0, routes: [{ name: target }] });
  };

  const handleLogin = () => {
    setErrorMessage('');
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Ingresa tu correo corporativo y contraseña.');
      return;
    }

    // BACKEND: aquí debe ir el POST /auth/login para obtener tokens y los datos del usuario.
    const matchedAccount = demoAccounts.find(
      (account) =>
        account.email.toLowerCase() === email.trim().toLowerCase() &&
        account.password === password.trim()
    );

    if (!matchedAccount) {
      setErrorMessage('Credenciales incorrectas. Intenta nuevamente.');
      return;
    }

    login(matchedAccount.role);
    navigateByRole(matchedAccount.role);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Image source={LogoCafrilosa} style={styles.logo} />

      <View style={styles.card}>
        <Text style={styles.heading}>¡Bienvenido!</Text>
        <Text style={styles.subheading}>Ingresa a tu cuenta para continuar</Text>

        <AuthInput
          label="Correo Electrónico"
          icon="mail-outline"
          value={email}
          onChangeText={setEmail}
          placeholder="tucorreo@ejemplo.com"
          keyboardType="email-address"
        />
        <AuthInput
          label="Contraseña"
          icon="lock-closed-outline"
          value={password}
          onChangeText={setPassword}
          placeholder="Ingresa tu contraseña"
          secure
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword((prev) => !prev)}
        />

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.rememberRow}
            onPress={() => setRememberMe((prev) => !prev)}
          >
            <Checkbox
              value={rememberMe}
              onValueChange={setRememberMe}
              color={rememberMe ? colors.primary : undefined}
            />
            <Text style={styles.rememberText}>Recordarme</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>

        {!!errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

        <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
          <Text style={styles.primaryButtonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerDot}>o</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.subtleText}>¿No tienes una cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 40,
    alignItems: 'center',
  },
  logo: {
    width: 210,
    height: 120,
    resizeMode: 'contain',
  },
  slogan: {
    marginTop: 6,
    marginBottom: 24,
    fontSize: 16,
    color: colors.goldDark,
    fontWeight: '600',
    textAlign: 'center',
  },
  card: {
    width: '100%',
    // Sin fondo blanco ni sombra para parecerse más al mock
    backgroundColor: 'transparent',
    paddingTop: 8,
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.darkText,
    marginBottom: 4,
  },
  subheading: {
    color: colors.textLight,
    marginBottom: 24,
    fontSize: 14,
  },
  fieldGroup: {
    marginBottom: 18,
  },
  fieldLabel: {
    fontWeight: '700',
    color: colors.bodyText,
    marginBottom: 6,
    fontSize: 13,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: colors.white,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.darkText,
  },
  eyeButton: {
    padding: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 12,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    marginLeft: 8,
    color: colors.bodyText,
    fontSize: 13,
  },
  link: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },
  errorText: {
    color: colors.danger,
    marginBottom: 10,
    fontSize: 13,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 10,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerDot: {
    marginHorizontal: 8,
    color: colors.textMuted,
    fontSize: 12,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  subtleText: {
    color: colors.textMuted,
    marginRight: 4,
    fontSize: 13,
  },
});

export default LoginScreen;
