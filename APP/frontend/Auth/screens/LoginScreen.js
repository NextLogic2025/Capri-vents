import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
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
    <View style={[styles.inputWrapper, value ? styles.inputWrapperActive : null]}>
      <Ionicons
        name={icon}
        size={20}
        color={value ? colors.primary : colors.textMuted}
        style={styles.inputIcon}
      />
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
            color={colors.textMuted}
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

  const handleLogin = () => {
    setErrorMessage('');
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Ingresa tu correo corporativo y contraseña.');
      return;
    }

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
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerBackground} />

        <View style={styles.contentWrapper}>
          <View style={styles.logoContainer}>
            <Image source={LogoCafrilosa} style={styles.logo} />
          </View>

          <View style={styles.card}>
            <Text style={styles.heading}>¡Bienvenido!</Text>
            <Text style={styles.subheading}>Inicia sesión para continuar</Text>

            <AuthInput
              label="Correo Electrónico"
              icon="mail-outline"
              value={email}
              onChangeText={setEmail}
              placeholder="tucorreo@cafrilosa.com"
              keyboardType="email-address"
            />
            <AuthInput
              label="Contraseña"
              icon="lock-closed-outline"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
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
                  style={styles.checkbox}
                />
                <Text style={styles.rememberText}>Recordarme</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
              </TouchableOpacity>
            </View>

            {!!errorMessage && (
              <View style={styles.errorContainer}>
                <Ionicons name="alert-circle" size={20} color={colors.danger} />
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            )}

            <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
              <Text style={styles.primaryButtonText}>INICIAR SESIÓN</Text>
              <Ionicons name="arrow-forward" size={20} color={colors.white} />
            </TouchableOpacity>

            <View style={styles.footerRow}>
              <Text style={styles.subtleText}>¿No tienes una cuenta?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.link}>Regístrate aquí</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.versionText}>Versión 2.0.1</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 240,
    height: 140,
    resizeMode: 'contain',
    // tintColor removed to show original logo colors
  },
  slogan: {
    marginTop: 8,
    fontSize: 18,
    color: colors.gold,
    fontWeight: '700',
    fontStyle: 'italic',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  card: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.darkText,
    marginBottom: 8,
    textAlign: 'center',
  },
  subheading: {
    color: colors.textSecondary,
    marginBottom: 32,
    fontSize: 15,
    textAlign: 'center',
  },
  fieldGroup: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontWeight: '600',
    color: colors.darkText,
    marginBottom: 8,
    fontSize: 14,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: colors.borderSoft,
    backgroundColor: colors.inputBackground,
    height: 56,
  },
  inputWrapperActive: {
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.darkText,
    height: '100%',
  },
  eyeButton: {
    padding: 8,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 4,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    borderRadius: 6,
    borderColor: colors.primary,
  },
  rememberText: {
    marginLeft: 8,
    color: colors.textSecondary,
    fontSize: 14,
  },
  link: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 14,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  errorText: {
    color: colors.danger,
    marginLeft: 8,
    fontSize: 13,
    flex: 1,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 24,
  },
  primaryButtonText: {
    color: colors.white,
    fontWeight: '800',
    fontSize: 16,
    marginRight: 8,
    letterSpacing: 0.5,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtleText: {
    color: colors.textSecondary,
    marginRight: 4,
    fontSize: 14,
  },
  versionText: {
    marginTop: 40,
    color: colors.textMuted,
    fontSize: 12,
  },
});

export default LoginScreen;
