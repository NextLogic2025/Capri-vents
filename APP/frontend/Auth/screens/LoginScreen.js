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
          <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={20} color={colors.muted} />
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
      role === 'vendedor' ? 'VendedorModulo' : role === 'supervisor' ? 'SupervisorModulo' : 'ClienteTabs';
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
        account.email.toLowerCase() === email.trim().toLowerCase() && account.password === password.trim()
    );

    if (!matchedAccount) {
      setErrorMessage('Credenciales incorrectas. Intenta nuevamente.');
      return;
    }

    login(matchedAccount.role);
    navigateByRole(matchedAccount.role);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={LogoCafrilosa} style={styles.logo} />

      <View style={styles.card}>
        <Text style={styles.heading}>¡Bienvenido!</Text>
        <Text style={styles.subheading}>Ingresa a tu cuenta para continuar</Text>

        <AuthInput
          label="Correo electrónico"
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
          placeholder="Ingresa tu contraseña"
          secure
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword((prev) => !prev)}
        />

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.rememberRow} onPress={() => setRememberMe((prev) => !prev)}>
            <Checkbox value={rememberMe} onValueChange={setRememberMe} color={colors.primaryRed} />
            <Text style={styles.rememberText}>Recordarme</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>

        {!!errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

        <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
          <Text style={styles.primaryButtonText}>Iniciar sesión</Text>
        </TouchableOpacity>

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerDot}>•</Text>
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
    paddingBottom: 48,
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 110,
    marginTop: 48,
    resizeMode: 'contain',
  },
  slogan: {
    color: colors.goldDark,
    marginTop: 8,
    marginBottom: 12,
    fontWeight: '600',
  },
  card: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 28,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.darkText,
  },
  subheading: {
    color: colors.textLight,
    marginBottom: 24,
  },
  fieldGroup: {
    marginBottom: 18,
  },
  fieldLabel: {
    fontWeight: '700',
    color: colors.bodyText,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.inputBackground,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.darkText,
  },
  eyeButton: {
    padding: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    marginLeft: 8,
    color: colors.bodyText,
  },
  link: {
    color: colors.primaryRed,
    fontWeight: '700',
  },
  errorText: {
    color: colors.danger,
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: colors.primaryRed,
    borderRadius: 22,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  primaryButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
  backendNote: {
    marginTop: 16,
    color: colors.textMuted,
    fontSize: 13,
  },
  demoNoteContainer: {
    marginTop: 10,
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    padding: 12,
  },
  demoNoteLabel: {
    fontSize: 12,
    color: colors.textMuted,
  },
  demoNote: {
    fontWeight: '600',
    color: colors.bodyText,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 12,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerDot: {
    marginHorizontal: 8,
    color: colors.textMuted,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  subtleText: {
    color: colors.textMuted,
    marginRight: 4,
  },
});

export default LoginScreen;
