import React, { useState } from 'react';
import {
  Alert,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../theme/colors';
import globalStyles from '../../theme/styles';
import { useAppContext } from '../../context/AppContext';
import SectionCard from '../../Cliente/components/SectionCard';
import PrimaryButton from '../../Cliente/components/PrimaryButton';
import VendedorHeader from '../components/VendedorHeader';

const VendedorPerfilScreen = () => {
  const { vendorUser, logout } = useAppContext();
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [editingPhone, setEditingPhone] = useState(false);
  const [phone, setPhone] = useState(vendorUser?.phone || '');

  const initials = vendorUser?.name
    ?.split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const handleSavePhone = () => {
    // BACKEND: PUT /vendor/profile para guardar telefono
    Alert.alert('Perfil actualizado', 'Telefono actualizado correctamente.');
    setEditingPhone(false);
  };

  const handlePasswordChange = () => {
    if (!newPassword || newPassword !== confirmPassword) {
      Alert.alert('Error', 'La nueva contrasena no coincide.');
      return;
    }
    // BACKEND: POST /vendor/change-password
    Alert.alert('Contrasena actualizada', 'Se envio la solicitud de cambio de contrasena.');
    setPasswordModalVisible(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSupportWhatsapp = () => {
    const url = 'https://wa.me/593999999999';
    Linking.openURL(url).catch(() => {
      Alert.alert('Atencion', 'No se pudo abrir WhatsApp.');
    });
  };

  const handleSupportEmail = () => {
    const url = 'mailto:soporte@cafrilosa.com';
    Linking.openURL(url).catch(() => {
      Alert.alert('Atencion', 'No se pudo abrir el correo.');
    });
  };

  const handleLogout = () => {
    logout();
  };

  const renderPasswordModal = () => (
    <Modal
      visible={passwordModalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setPasswordModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Cambiar contrasena</Text>
          <Text style={styles.detailLabel}>Contrasena actual</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
          <Text style={styles.detailLabel}>Nueva contrasena</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <Text style={styles.detailLabel}>Confirmar contrasena</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <PrimaryButton title="Actualizar" onPress={handlePasswordChange} style={{ marginTop: 14 }} />
          <TouchableOpacity onPress={() => setPasswordModalVisible(false)} style={styles.modalCancel}>
            <Text style={styles.modalCancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.screen}>
      <VendedorHeader
        name={vendorUser?.name}
        title="Bienvenido"
        subtitle="Perfil"
        notificationsCount={0}
        onPressNotifications={() => {}}
        style={styles.header}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials || 'VD'}</Text>
          </View>
          <Text style={styles.name}>{vendorUser?.name}</Text>
          <Text style={styles.email}>{vendorUser?.email}</Text>
          <Text style={styles.zone}>Zona asignada: {vendorUser?.zone || 'Sin zona'}</Text>
        </View>

        <SectionCard title="Datos personales">
          <View style={styles.infoRow}>
            <View>
              <Text style={styles.infoLabel}>Telefono</Text>
              {editingPhone ? (
                <TextInput style={styles.inlineInput} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
              ) : (
                <Text style={styles.infoValue}>{phone}</Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.linkButton}
              onPress={editingPhone ? handleSavePhone : () => setEditingPhone(true)}
            >
              <Text style={styles.linkButtonText}>{editingPhone ? 'Guardar' : 'Editar'}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.infoLabel}>Correo</Text>
          <Text style={styles.infoValue}>{vendorUser?.email}</Text>
          <Text style={styles.infoLabel}>Bodega base</Text>
          <Text style={styles.infoValue}>{vendorUser?.address}</Text>
        </SectionCard>

        <SectionCard title="Seguridad">
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => setPasswordModalVisible(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.menuTitle}>Cambiar contrasena</Text>
            <Text style={styles.menuSubtitle}>Actualiza tu contrasena periodicamente.</Text>
          </TouchableOpacity>
        </SectionCard>

        <SectionCard title="Soporte">
          <Text style={styles.infoLabel}>Canales disponibles</Text>
          <View style={styles.supportRow}>
            <TouchableOpacity style={styles.secondaryButton} onPress={handleSupportWhatsapp}>
              <Text style={styles.secondaryButtonText}>Contactar supervisor</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={handleSupportEmail}>
              <Text style={styles.secondaryButtonText}>Correo soporte</Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.menuSubtitle, { marginTop: 12 }]}>
            Tambien puedes revisar las FAQs en la intranet. // BACKEND: cargar contenido dinamico.
          </Text>
        </SectionCard>

        <PrimaryButton title="Cerrar sesion" onPress={handleLogout} style={styles.logoutButton} />
      </ScrollView>
      {renderPasswordModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    marginBottom: 12,
  },
  content: {
    padding: 16,
    paddingBottom: 120,
  },
  headerCard: {
    ...globalStyles.card,
    alignItems: 'center',
  },
  avatar: {
    width: 82,
    height: 82,
    borderRadius: 30,
    backgroundColor: '#FFE1D8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textDark,
  },
  email: {
    color: colors.textLight,
    marginTop: 4,
  },
  zone: {
    marginTop: 6,
    color: colors.textDark,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 10,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textDark,
  },
  menuItem: {
    paddingVertical: 6,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textDark,
  },
  menuSubtitle: {
    fontSize: 13,
    color: colors.textLight,
  },
  supportRow: {
    marginTop: 12,
  },
  secondaryButton: {
    ...globalStyles.secondaryButton,
    marginBottom: 10,
  },
  secondaryButtonText: {
    ...globalStyles.secondaryButtonText,
  },
  logoutButton: {
    marginTop: 18,
  },
  linkButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: '#FFE1D8',
  },
  linkButtonText: {
    color: colors.primary,
    fontWeight: '700',
  },
  inlineInput: {
    ...globalStyles.input,
    width: 180,
    marginTop: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  modalCard: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 10,
  },
  input: {
    ...globalStyles.input,
    marginTop: 6,
  },
  modalCancel: {
    marginTop: 12,
    alignItems: 'center',
  },
  modalCancelText: {
    color: colors.textLight,
    fontWeight: '600',
  },
});

export default VendedorPerfilScreen;
