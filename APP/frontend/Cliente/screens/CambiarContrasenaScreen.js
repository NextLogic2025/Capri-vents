import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import globalStyles from '../../theme/styles';
import PrimaryButton from '../components/PrimaryButton';

const CambiarContrasenaScreen = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSave = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Campos incompletos', 'Por favor completa todos los campos.');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Contraseña muy corta', 'La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('No coinciden', 'La confirmación debe ser igual a la nueva contraseña.');
      return;
    }

    Alert.alert('Contraseña actualizada', 'Se aplicará el cambio en tu cuenta (mock).');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    // BACKEND: POST /auth/cambiar-contrasena
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Cambiar contraseña</Text>
        <Text style={styles.subtitle}>
          Te recomendamos actualizar tu contraseña periódicamente para mantener tu cuenta segura.
        </Text>

        <PasswordInput
          label="Contraseña actual"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          show={showCurrent}
          onToggleShow={() => setShowCurrent((prev) => !prev)}
        />
        <PasswordInput
          label="Nueva contraseña"
          value={newPassword}
          onChangeText={setNewPassword}
          show={showNew}
          onToggleShow={() => setShowNew((prev) => !prev)}
        />
        <PasswordInput
          label="Confirmar contraseña"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          show={showConfirm}
          onToggleShow={() => setShowConfirm((prev) => !prev)}
        />

        <PrimaryButton title="Guardar cambios" onPress={handleSave} style={{ marginTop: 12 }} />

        <View style={styles.hintBox}>
          <Ionicons name="shield-checkmark-outline" size={18} color={colors.primary} />
          <Text style={styles.hintText}>
            No compartas tu contraseña con nadie. Cafrilosa nunca te la solicitará por WhatsApp ni correo electrónico.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const PasswordInput = ({ label, value, onChangeText, show, onToggleShow }) => (
  <View style={styles.fieldGroup}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <View style={styles.passwordWrapper}>
      <TextInput
        style={styles.passwordInput}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!show}
        placeholder="••••••••"
        placeholderTextColor={colors.textMuted}
      />
      <TouchableOpacity onPress={onToggleShow}>
        <Ionicons
          name={show ? 'eye-outline' : 'eye-off-outline'}
          size={20}
          color={colors.textMuted}
        />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 16,
  },
  card: {
    ...globalStyles.card,
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 10,
    color: colors.textMuted,
    fontSize: 13,
  },
  fieldGroup: {
    marginTop: 8,
  },
  fieldLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 4,
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.inputBackground,
    paddingHorizontal: 12,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
    color: colors.textDark,
  },
  hintBox: {
    marginTop: 16,
    flexDirection: 'row',
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#FFF7E6',
  },
  hintText: {
    marginLeft: 8,
    flex: 1,
    fontSize: 12,
    color: colors.textDark,
  },
});

export default CambiarContrasenaScreen;
