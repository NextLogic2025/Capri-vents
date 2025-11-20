import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import globalStyles from '../../theme/styles';
import { useAppContext } from '../../context/AppContext';
import LogoCafrilosa from '../../assets/images/logo-cafrilosa.png';
import PrimaryButton from '../components/PrimaryButton';

const DatosPersonalesScreen = () => {
  const { clientUser } = useAppContext() || {};

  const [firstNameInitial, lastNameInitial] = useMemo(() => {
    const fullName = clientUser?.name || '';
    const parts = fullName.trim().split(' ');
    if (!parts.length) return ['', ''];
    if (parts.length === 1) return [parts[0], ''];
    return [parts.slice(0, -1).join(' '), parts[parts.length - 1]];
  }, [clientUser?.name]);

  const [firstName, setFirstName] = useState(firstNameInitial);
  const [lastName, setLastName] = useState(lastNameInitial);
  const [email, setEmail] = useState(clientUser?.email || 'cliente@cafrilosa.com');
  const [phone, setPhone] = useState(clientUser?.phone || '+593 99 123 4567');

  const handleChangePhoto = () => {
    Alert.alert('Foto de perfil', 'Aquí se abriría el selector de imágenes (mock).');
  };

  const handleSave = () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      Alert.alert('Campos incompletos', 'Revisa nombre, apellido y correo.');
      return;
    }

    Alert.alert('Perfil actualizado', 'Tus datos se han guardado correctamente (mock).');
    // BACKEND: llamar PUT /cliente/perfil con los datos actualizados
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.avatarContainer}>
        <Image
          source={clientUser?.avatar ? { uri: clientUser.avatar } : LogoCafrilosa}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.cameraButton} onPress={handleChangePhoto}>
          <Ionicons name="camera" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.sectionHeaderRow}>
        <Ionicons name="person-outline" size={18} color={colors.primary} />
        <Text style={styles.sectionHeaderText}>Datos personales</Text>
      </View>

      <View style={styles.card}>
        <LabeledInput
          label="Nombre"
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Nombre"
        />
        <LabeledInput
          label="Apellido"
          value={lastName}
          onChangeText={setLastName}
          placeholder="Apellido"
        />
      </View>

      <View style={[styles.sectionHeaderRow, { marginTop: 20 }]}>
        <Ionicons name="mail-outline" size={18} color={colors.primary} />
        <Text style={styles.sectionHeaderText}>Información de contacto</Text>
      </View>

      <View style={styles.card}>
        <LabeledInput
          label="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="tucorreo@ejemplo.com"
        />
        <LabeledInput
          label="Teléfono"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholder="+593 99 123 4567"
        />
      </View>

      <PrimaryButton title="Guardar cambios" onPress={handleSave} style={styles.saveButton} />
    </ScrollView>
  );
};

const LabeledInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
}) => (
  <View style={styles.fieldGroup}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.textMuted}
      keyboardType={keyboardType}
    />
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: colors.white,
    backgroundColor: colors.cardBackground || colors.white,
  },
  cameraButton: {
    position: 'absolute',
    right: 28,
    bottom: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  sectionHeaderText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '700',
    color: colors.textDark,
  },
  card: {
    ...globalStyles.card,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  fieldGroup: {
    marginBottom: 12,
  },
  fieldLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 4,
  },
  input: {
    ...globalStyles.input,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  saveButton: {
    marginTop: 24,
  },
});

export default DatosPersonalesScreen;
