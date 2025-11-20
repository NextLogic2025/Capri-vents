import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import LogoCafrilosa from '../../assets/images/logo-cafrilosa.png';

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

const RegisterScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleRegister = () => {
    if (!form.name || !form.email || !form.phone || !form.password || !form.confirmPassword) {
      Alert.alert('Campos incompletos', 'Completa todos los datos para registrarte.');
      return;
    }
    if (form.password.length < 6) {
      Alert.alert('Contraseña corta', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      Alert.alert('Contraseñas distintas', 'Verifica que ambas contraseñas coincidan.');
      return;
    }
    if (!acceptTerms) {
      Alert.alert(
        'Términos',
        'Debes aceptar los términos y la política de privacidad.'
      );
      return;
    }

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
    };
    // BACKEND: el teléfono debe guardarse al crear el cliente
    // para luego mostrarlo y editarlo en la sección Perfil.
    // BACKEND: aquí se debe invocar el endpoint de registro para crear el cliente en Cafrilosa.
    console.log('Payload registro:', payload);

    Alert.alert(
      'Cuenta creada',
      'Hemos enviado tus datos al backend. Revisa tu correo para activar la cuenta.',
      [{ text: 'Ir al login', onPress: () => navigation.navigate('Login') }]
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Image source={LogoCafrilosa} style={styles.logo} />

      <View style={styles.form}>
        <Text style={styles.heading}>Crear Cuenta</Text>
        <Text style={styles.subheading}>Completa los datos para registrarte</Text>

        <AuthInput
          label="Nombre completo"
          icon="person-circle-outline"
          value={form.name}
          onChangeText={(text) => handleChange('name', text)}
          placeholder="Juan Pérez"
          autoCapitalize="words"
        />
        <AuthInput
          label="Correo electrónico"
          icon="mail-outline"
          value={form.email}
          onChangeText={(text) => handleChange('email', text)}
          placeholder="tucorreo@cafrilosa.com"
          keyboardType="email-address"
        />
        <AuthInput
          label="Teléfono"
          icon="call-outline"
          value={form.phone}
          onChangeText={(text) => handleChange('phone', text)}
          placeholder="0999999999"
          keyboardType="phone-pad"
        />
        <AuthInput
          label="Contraseña"
          icon="lock-closed-outline"
          value={form.password}
          onChangeText={(text) => handleChange('password', text)}
          placeholder="Mínimo 6 caracteres"
          secure
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword((prev) => !prev)}
        />
        <AuthInput
          label="Confirmar contraseña"
          icon="lock-closed-outline"
          value={form.confirmPassword}
          onChangeText={(text) => handleChange('confirmPassword', text)}
          placeholder="Repite tu contraseña"
          secure
          showPassword={showConfirm}
          onTogglePassword={() => setShowConfirm((prev) => !prev)}
        />

        <View style={styles.termsRow}>
          <Checkbox
            value={acceptTerms}
            onValueChange={setAcceptTerms}
            color={acceptTerms ? colors.secondaryGold : undefined}
          />
          <Text style={styles.termsText}>
            Acepto los{' '}
            <Text style={styles.termsLink}>Términos y Condiciones</Text> y la{' '}
            <Text style={styles.termsLink}>Política de Privacidad</Text>.
          </Text>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleRegister}>
          <Text style={styles.primaryButtonText}>Crear Cuenta</Text>
        </TouchableOpacity>

        <View style={styles.footerRow}>
          <Text style={styles.subtleText}>¿Ya tienes una cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Inicia sesión</Text>
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
    paddingBottom: 40,
    alignItems: 'center',
  },
  logo: {
    width: 190,
    height: 120,
    marginTop: 40,
    resizeMode: 'contain',
  },
  slogan: {
    color: colors.goldDark,
    marginTop: 4,
    marginBottom: 20,
    fontWeight: '600',
  },
  form: {
    width: '100%',
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.darkText,
  },
  subheading: {
    color: colors.textLight,
    marginBottom: 24,
    marginTop: 4,
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
    borderRadius: 20,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.darkText,
  },
  eyeButton: {
    padding: 4,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
    marginTop: 4,
  },
  termsText: {
    flex: 1,
    marginLeft: 10,
    color: colors.bodyText,
    fontSize: 13,
  },
  termsLink: {
    color: colors.primaryRed,
    fontWeight: '700',
  },
  primaryButton: {
    backgroundColor: colors.secondaryGold,
    borderRadius: 22,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: colors.darkText,
    fontWeight: '700',
    fontSize: 16,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  subtleText: {
    color: colors.textMuted,
    marginRight: 4,
  },
  link: {
    color: colors.primaryRed,
    fontWeight: '700',
  },
});

export default RegisterScreen;
