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
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import LogoCafrilosa from '../../assets/images/logo-cafrilosa.png';
import { useWebLayout, useResponsive } from '../../hooks';
import AuthBackground from '../../components/AuthBackground';
import PDFViewerModal from '../../components/PDFViewerModal';

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

const RegisterScreen = ({ navigation }) => {
  const { containerStyle } = useWebLayout(500);
  const { isDesktop } = useResponsive();

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
  const [showPDFModal, setShowPDFModal] = useState(false);
  const [currentPDF, setCurrentPDF] = useState(null);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const openPDF = (pdfType) => {
    setCurrentPDF(pdfType);
    setShowPDFModal(true);
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
    console.log('Payload registro:', payload);

    Alert.alert(
      'Cuenta creada',
      'Hemos enviado tus datos al backend. Revisa tu correo para activar la cuenta.',
      [{ text: 'Ir al login', onPress: () => navigation.navigate('Login') }]
    );
  };

  return (
    <AuthBackground>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={[
            styles.container,
            isDesktop && styles.containerWeb
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[
            styles.headerBackground,
            isDesktop && styles.headerBackgroundWeb
          ]} />

          <View style={[styles.contentWrapper, containerStyle]}>
            <View style={styles.logoContainer}>
              <Image source={LogoCafrilosa} style={styles.logo} />
            </View>

            <View style={[
              styles.card,
              isDesktop && styles.cardWeb
            ]}>
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
                  color={acceptTerms ? colors.primary : undefined}
                  style={styles.checkbox}
                />
                <Text style={styles.termsText}>
                  Acepto los{' '}
                  <Text
                    style={styles.termsLink}
                    onPress={() => openPDF('terminos')}
                  >
                    Términos y Condiciones
                  </Text>{' '}y la{' '}
                  <Text
                    style={styles.termsLink}
                    onPress={() => openPDF('privacidad')}
                  >
                    Política de Privacidad
                  </Text>.
                </Text>
              </View>

              <TouchableOpacity style={styles.primaryButton} onPress={handleRegister}>
                <Text style={styles.primaryButtonText}>CREAR CUENTA</Text>
                <Ionicons name="arrow-forward" size={20} color={colors.white} />
              </TouchableOpacity>

              <View style={styles.footerRow}>
                <Text style={styles.subtleText}>¿Ya tienes una cuenta?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.link}>Inicia sesión</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <PDFViewerModal
        visible={showPDFModal}
        onClose={() => setShowPDFModal(false)}
        pdfType={currentPDF}
      />
    </AuthBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
  },
  containerWeb: {
    backgroundColor: '#f0f0f0',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '35%',
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerBackgroundWeb: {
    height: '30%',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 40,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 200,
    height: 110,
    resizeMode: 'contain',
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
  cardWeb: {
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.15,
    shadowRadius: 30,
    elevation: 15,
    padding: 32,
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.darkText,
    marginBottom: 8,
    textAlign: 'center',
  },
  subheading: {
    color: colors.textSecondary,
    marginBottom: 24,
    fontSize: 14,
    textAlign: 'center',
  },
  fieldGroup: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontWeight: '600',
    color: colors.darkText,
    marginBottom: 6,
    fontSize: 13,
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
    height: 52,
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
    fontSize: 15,
    color: colors.darkText,
    height: '100%',
  },
  eyeButton: {
    padding: 8,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    marginTop: 8,
  },
  checkbox: {
    marginTop: 2,
    borderRadius: 6,
    borderColor: colors.primary,
  },
  termsText: {
    flex: 1,
    marginLeft: 10,
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  termsLink: {
    color: colors.primary,
    fontWeight: '700',
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
  link: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 14,
  },
});

export default RegisterScreen;
