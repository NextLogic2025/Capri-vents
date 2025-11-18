import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Linking,
  Alert,
} from 'react-native';
import SupervisorHeader from '../components/SupervisorHeader';
import SectionCard from '../../Cliente/components/SectionCard';
import PrimaryButton from '../../Cliente/components/PrimaryButton';
import globalStyles from '../../theme/styles';
import colors from '../../theme/colors';
import { useAppContext } from '../../context/AppContext';

const SupervisorPerfilScreen = () => {
  const {
    supervisorUser,
    updateUserProfile,
    logout,
    vendorAssignedOrders,
    credits,
  } = useAppContext();
  const [phoneModalVisible, setPhoneModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [phoneValue, setPhoneValue] = useState(supervisorUser?.phone || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const vendedoresActivos = vendorAssignedOrders.length;
  const clientesConCredito = credits.length;

  const handlePhoneSave = () => {
    updateUserProfile({ phone: phoneValue });
    setPhoneModalVisible(false);
    // BACKEND: actualizar datos del supervisor.
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }
    setPasswordModalVisible(false);
    // BACKEND: endpoint de cambio de contraseña.
    Alert.alert('Contraseña actualizada', 'Se aplicará el cambio en el backend.');
  };

  const handleLogout = () => {
    Alert.alert('Cerrar sesión', '¿Confirmas cerrar sesión?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Cerrar sesión',
        style: 'destructive',
        onPress: () => {
          // BACKEND: invalidar token si aplica.
          logout();
        },
      },
    ]);
  };

  return (
    <View style={globalStyles.screen}>
      <SupervisorHeader
        name={supervisorUser?.name}
        title="Bienvenido"
        subtitle="Perfil"
        notificationsCount={0}
        onPressNotifications={() => {
          // BACKEND: centro de notificaciones de seguridad.
        }}
      />

      <ScrollView contentContainerStyle={[globalStyles.contentContainer, { paddingTop: 8 }]} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{supervisorUser?.name?.charAt(0)}</Text>
          </View>
          <View>
            <Text style={styles.profileName}>{supervisorUser?.name}</Text>
            <Text style={styles.profileEmail}>{supervisorUser?.email}</Text>
            <Text style={styles.profileRole}>{supervisorUser?.role}</Text>
          </View>
        </View>

        <SectionCard title="Datos personales">
          <Text style={styles.cardText}>Teléfono: {supervisorUser?.phone}</Text>
          <PrimaryButton title="Editar teléfono" onPress={() => setPhoneModalVisible(true)} style={{ marginTop: 8 }} />
        </SectionCard>

        <SectionCard title="Equipo / resumen">
          <Text style={styles.cardText}>Vendedores activos: {vendedoresActivos}</Text>
          <Text style={styles.cardText}>Clientes con crédito: {clientesConCredito}</Text>
          <Text style={styles.cardText}>Pedidos bajo seguimiento: {vendorAssignedOrders.length}</Text>
        </SectionCard>

        <SectionCard title="Seguridad">
          <PrimaryButton title="Cambiar contraseña" onPress={() => setPasswordModalVisible(true)} />
        </SectionCard>

        <SectionCard title="Soporte">
          <Text style={styles.cardText}>¿Cómo aprobar un pago?</Text>
          <Text style={styles.cardText}>¿Cómo ajustar stock?</Text>
          <PrimaryButton
            title="Contactar TI"
            onPress={() => Linking.openURL('mailto:soporte@cafrilosa.com')}
            style={{ marginTop: 8 }}
          />
          <PrimaryButton
            title="WhatsApp soporte"
            onPress={() => Linking.openURL('https://wa.me/593999999999')}
            style={{ marginTop: 8 }}
          />
        </SectionCard>

        <PrimaryButton title="Cerrar sesión" onPress={handleLogout} style={styles.logoutButton} />
      </ScrollView>

      <Modal visible={phoneModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar teléfono</Text>
            <TextInput
              style={styles.input}
              value={phoneValue}
              onChangeText={setPhoneValue}
              keyboardType="phone-pad"
            />
            <PrimaryButton title="Guardar" onPress={handlePhoneSave} />
            <PrimaryButton title="Cancelar" onPress={() => setPhoneModalVisible(false)} style={{ marginTop: 8 }} />
          </View>
        </View>
      </Modal>

      <Modal visible={passwordModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cambiar contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="Contraseña actual"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Nueva contraseña"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirmar contraseña"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <PrimaryButton title="Guardar" onPress={handleChangePassword} />
            <PrimaryButton
              title="Cancelar"
              onPress={() => setPasswordModalVisible(false)}
              style={{ marginTop: 8 }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '700',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
  },
  profileEmail: {
    fontSize: 14,
    color: colors.textMuted,
  },
  profileRole: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  cardText: {
    color: colors.textMuted,
    marginBottom: 4,
  },
  logoutButton: {
    marginTop: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 18,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  input: {
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    marginBottom: 10,
  },
});

export default SupervisorPerfilScreen;
