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
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={26} color={colors.darkText} />
      </TouchableOpacity>

      <Image source={LogoCafrilosa} style={styles.logo} />

      <View style={styles.form}>
        <Text style={styles.heading}>¿Olvidaste tu contraseña?</Text>
        <Text style={styles.description}>
          Ingresa tu correo electrónico y te enviaremos un código para que puedas crear
          una nueva contraseña.
        </Text>

        <Text style={styles.fieldLabel}>Correo electrónico</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="mail-outline" size={20} color={colors.muted} style={styles.inputIcon} />
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
        {!!error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
          <Text style={styles.primaryButtonText}>Enviar código</Text>
        </TouchableOpacity>

        <Text style={styles.helperText}>
          Revisa tu bandeja de entrada (y también la carpeta de spam). Usa el código para
          verificar tu identidad y restablecer tu contraseña.
        </Text>

        <TouchableOpacity onPress={handleResend}>
          <Text style={styles.helperLink}>Reenviar correo electrónico</Text>
        </TouchableOpacity>
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
    paddingTop: 32,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  logo: {
    width: 170,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 24,
  },
  form: {
    width: '100%',
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.darkText,
  },
  description: {
    color: colors.textLight,
    marginTop: 6,
    marginBottom: 24,
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
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
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
  errorText: {
    color: colors.danger,
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: colors.primaryRed,
    borderRadius: 22,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 22,
  },
  primaryButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
  helperText: {
    marginTop: 18,
    color: colors.textMuted,
    lineHeight: 20,
  },
  helperLink: {
    marginTop: 8,
    color: colors.primaryRed,
    fontWeight: '700',
  },
});

export default ForgotPasswordScreen;
