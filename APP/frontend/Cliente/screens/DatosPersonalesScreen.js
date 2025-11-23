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
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import colors from '../../theme/colors';
import globalStyles from '../../theme/styles';
import { useAppContext } from '../../context/AppContext';
import PrimaryButton from '../../components/PrimaryButton';

const DatosPersonalesScreen = ({ navigation }) => {
  const { user } = useAppContext() || {};

  const [firstNameInitial, lastNameInitial] = useMemo(() => {
    const fullName = user?.name || '';
    const parts = fullName.trim().split(' ');
    if (!parts.length) return ['', ''];
    if (parts.length === 1) return [parts[0], ''];
    return [parts.slice(0, -1).join(' '), parts[parts.length - 1]];
  }, [user?.name]);

  const [firstName, setFirstName] = useState(firstNameInitial);
  const [lastName, setLastName] = useState(lastNameInitial);
  const [email, setEmail] = useState(user?.email || 'usuario@cafrilosa.com');
  const [phone, setPhone] = useState(user?.phone || '+593 99 123 4567');

  const [avatar, setAvatar] = useState(user?.avatar || null);

  const avatarInitial = (firstName || 'U').charAt(0).toUpperCase();

  const handleChangePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a tu cámara para tomar la foto.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      Alert.alert('Campos incompletos', 'Revisa nombre, apellido y correo.');
      return;
    }

    Alert.alert('Perfil actualizado', 'Tus datos se han guardado correctamente (mock).');
    navigation.goBack();
    // BACKEND: llamar PUT /cliente/perfil con los datos actualizados
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <View style={styles.avatarWrapper}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>{avatarInitial}</Text>
              </View>
            )}
            <TouchableOpacity style={styles.cameraButton} onPress={handleChangePhoto}>
              <Ionicons name="camera" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerTitle}>Edita tu perfil</Text>
          <Text style={styles.headerSubtitle}>Mantén tus datos actualizados</Text>
        </View>

        <View style={styles.formCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="person-circle-outline" size={22} color={colors.primary} />
            <Text style={styles.sectionTitle}>Información Personal</Text>
          </View>

          <LabeledInput
            label="Nombre"
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Tu nombre"
            icon="text-outline"
          />
          <LabeledInput
            label="Apellido"
            value={lastName}
            onChangeText={setLastName}
            placeholder="Tu apellido"
            icon="text-outline"
          />

          <View style={[styles.sectionHeader, { marginTop: 24 }]}>
            <Ionicons name="call-outline" size={22} color={colors.primary} />
            <Text style={styles.sectionTitle}>Contacto</Text>
          </View>

          <LabeledInput
            label="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="tucorreo@ejemplo.com"
            icon="mail-outline"
          />
          <LabeledInput
            label="Teléfono"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholder="+593 99 123 4567"
            icon="call-outline"
          />
        </View>

        <View style={styles.footer}>
          <PrimaryButton title="GUARDAR CAMBIOS" onPress={handleSave} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const LabeledInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  icon,
}) => (
  <View style={styles.fieldGroup}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <View style={styles.inputWrapper}>
      {icon && <Ionicons name={icon} size={20} color={colors.textMuted} style={{ marginRight: 10 }} />}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        keyboardType={keyboardType}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: colors.white,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 24,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: colors.background,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFEBEE',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.background,
  },
  avatarText: {
    fontSize: 48,
    color: colors.primary,
    fontWeight: '800',
  },
  cameraButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.white,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.darkText,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textLight,
  },
  formCard: {
    paddingHorizontal: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.darkText,
    marginLeft: 8,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    paddingHorizontal: 16,
    height: 56,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.darkText,
    height: '100%',
  },
  footer: {
    paddingHorizontal: 24,
    marginTop: 32,
  },
});

export default DatosPersonalesScreen;
