import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import LogoCafrilosa from '../../assets/images/logo-cafrilosa.png';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');
    if (!email.trim()) {
      setError('Necesitamos tu correo para enviarte el código.');
      return;
    }
    // BACKEND: aquí se ejecuta la petición POST /auth/forgot-password para generar el código temporal.
    Alert.alert(
      'Revisa tu correo',
      'Enviamos un código para que puedas restablecer tu contraseña.'
    );
    navigation.goBack();
  };

  const handleResend = () => {
    if (!email.trim()) {
      setError('Ingresa tu correo para reenviar el código.');
      return;
    }
    // BACKEND: reintento de envío del correo de recuperación.
    Alert.alert(
      'Correo reenviado',
      'Si el correo existe, recibirás un nuevo código en segundos.'
    );
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
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color={colors.white} />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Image source={LogoCafrilosa} style={styles.logo} />
          </View>

          <View style={styles.card}>
            <Text style={styles.heading}>¿Olvidaste tu contraseña?</Text>
            <Text style={styles.subheading}>
              Ingresa tu correo electrónico y te enviaremos un código para restablecerla.
            </Text>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Correo electrónico</Text>
              <View style={[styles.inputWrapper, email ? styles.inputWrapperActive : null]}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={email ? colors.primary : colors.textMuted}
                  style={styles.inputIcon}
                />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="tucorreo@cafrilosa.com"
                  placeholderTextColor={colors.textMuted}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  style={styles.input}
                />
              </View>
            </View>
            {!!error && (
              <View style={styles.errorContainer}>
                <Ionicons name="alert-circle" size={20} color={colors.danger} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
              <Text style={styles.primaryButtonText}>ENVIAR CÓDIGO</Text>
              <Ionicons name="paper-plane-outline" size={20} color={colors.white} />
            </TouchableOpacity>

            <Text style={styles.helperText}>
              Revisa tu bandeja de entrada (y también la carpeta de spam).
            </Text>

            <TouchableOpacity onPress={handleResend} style={styles.resendButton}>
              <Text style={styles.helperLink}>Reenviar correo electrónico</Text>
            </TouchableOpacity>
          </View>
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
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 220,
    height: 120,
    resizeMode: 'contain',
  },
  slogan: {
    marginTop: 8,
    fontSize: 16,
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
    fontSize: 22,
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
    lineHeight: 20,
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
  helperText: {
    color: colors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 18,
  },
  resendButton: {
    alignSelf: 'center',
    padding: 8,
  },
  helperLink: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 14,
  },
});

export default ForgotPasswordScreen;
