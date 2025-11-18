import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import PrimaryButton from '../components/PrimaryButton';
import { useAppContext } from '../../context/AppContext';
import ScreenHeader from '../components/ScreenHeader';

const faqItems = [
  { question: 'Cuanto tarda la entrega?', answer: 'Los pedidos se entregan entre 24 y 48 horas segun tu ciudad.' },
  { question: 'Puedo cambiar mi direccion?', answer: 'Si, edita tus datos personales o agrega una nueva direccion en soporte.' },
  { question: 'Como funciona el credito?', answer: 'Puedes usar tu credito disponible en checkout y ver las cuotas en la pestana Credito.' },
  { question: 'Que hago si mi pago fue rechazado?', answer: 'Contacta a soporte con tu comprobante para revisarlo de inmediato.' },
  { question: 'Puedo pagar cuotas con transferencia?', answer: 'Si, las cuotas aceptan transferencia y efectivo en oficinas.' },
  { question: 'El precio incluye impuestos?', answer: 'El resumen del carrito muestra subtotal, impuesto y total detallado.' },
  { question: 'Como subo mi comprobante?', answer: 'Luego de elegir transferencia veras la opcion para adjuntar el archivo o foto.' },
  { question: 'Que pasa si no tengo saldo de credito?', answer: 'Puedes pagar con transferencia o efectivo hasta que el cupo sea renovado.' },
];

const PerfilScreen = ({ navigation }) => {
  const { user, updateUserProfile, logout, notifications, setNotifications } = useAppContext();
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [preferencesModalVisible, setPreferencesModalVisible] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  const [faqModalVisible, setFaqModalVisible] = useState(false);

  const nameParts = useMemo(() => {
    const parts = (user.name || '').split(' ');
    return {
      firstName: parts.shift() || '',
      lastName: parts.join(' '),
    };
  }, [user.name]);

  const [profileForm, setProfileForm] = useState({
    firstName: nameParts.firstName,
    lastName: nameParts.lastName,
    email: user.email || '',
    phone: user.phone || '',
    address: user.address || '',
  });
  const [passwordForm, setPasswordForm] = useState({ current: '', next: '', confirm: '' });

  const handleSaveProfile = () => {
    const formattedName = [profileForm.firstName.trim(), profileForm.lastName.trim()].filter(Boolean).join(' ');
    updateUserProfile({
      name: formattedName || user.name,
      email: profileForm.email,
      phone: profileForm.phone,
      address: profileForm.address,
    });
    setProfileModalVisible(false);
  };

  const handleChangePassword = () => {
    if (!passwordForm.next || passwordForm.next !== passwordForm.confirm) {
      Alert.alert('Verifica tu nueva contraseña');
      return;
    }
    setPasswordModalVisible(false);
    setPasswordForm({ current: '', next: '', confirm: '' });
  };

  const handleLogout = () => {
    logout();
    const parentNav = navigation.getParent?.();
    if (parentNav) {
      parentNav.reset({ index: 0, routes: [{ name: 'AuthStack' }] });
    } else {
      navigation.reset({ index: 0, routes: [{ name: 'AuthStack' }] });
    }
  };

  const toggleFaq = (index) => {
    setFaqOpen((prev) => (prev === index ? null : index));
  };

  return (
    <View style={styles.screen}>
      <ScreenHeader title="Perfil" subtitle="Gestiona tu cuenta" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{(user.name || 'C').slice(0, 1).toUpperCase()}</Text>
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>

        <Section title="Cuenta">
          <ProfileMenuItem
            icon="person-circle-outline"
            title="Datos personales"
            subtitle="Actualiza tu informacion y direccion"
            onPress={() => setProfileModalVisible(true)}
          />
        </Section>

        <Section title="Seguridad">
          <ProfileMenuItem
            icon="lock-closed-outline"
            title="Contraseña"
            subtitle="Cambia tu clave periodicamente"
            onPress={() => setPasswordModalVisible(true)}
          />
        </Section>

        <Section title="Soporte">
          <ProfileMenuItem
            icon="settings-outline"
            title="Preferencias"
            subtitle="Notificaciones y recordatorios"
            onPress={() => setPreferencesModalVisible(true)}
          />
          <ProfileMenuItem
            icon="help-circle-outline"
            title="Preguntas frecuentes"
            subtitle="Resuelve dudas comunes"
            onPress={() => setFaqModalVisible(true)}
          />
          <ProfileMenuItem
            icon="help-circle-outline"
            title="Terminos y condiciones"
            subtitle="Consulta nuestras politicas"
            onPress={() => Alert.alert('Terminos', 'Consulta los terminos en cafrilosa.com')}
          />
        </Section>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar sesion</Text>
        </TouchableOpacity>
      </ScrollView>

      <DataModal
        visible={profileModalVisible}
        onClose={() => setProfileModalVisible(false)}
        profileForm={profileForm}
        setProfileForm={setProfileForm}
        onSave={handleSaveProfile}
      />

      <PasswordModal
        visible={passwordModalVisible}
        onClose={() => setPasswordModalVisible(false)}
        passwordForm={passwordForm}
        setPasswordForm={setPasswordForm}
        onSave={handleChangePassword}
      />

      <PreferencesModal
        visible={preferencesModalVisible}
        onClose={() => setPreferencesModalVisible(false)}
        notifications={notifications}
        setNotifications={setNotifications}
      />
      <FaqModal
        visible={faqModalVisible}
        onClose={() => setFaqModalVisible(false)}
        faqOpen={faqOpen}
        toggleFaq={toggleFaq}
      />
    </View>
  );
};

const DataModal = ({ visible, onClose, profileForm, setProfileForm, onSave }) => (
  <Modal visible={visible} transparent animationType="slide">
    <View style={styles.modalOverlay}>
      <SafeAreaView style={styles.modalSheet}>
        <View style={styles.modalHeader}>
          <TouchableOpacity style={styles.modalBack} onPress={onClose}>
            <Ionicons name="chevron-back" size={22} color={colors.darkText} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Datos personales</Text>
        </View>
        <ScrollView contentContainerStyle={styles.modalScroll}>
          <View style={styles.modalAvatar}>
            <Ionicons name="camera-outline" size={20} color={colors.primary} />
          </View>
          <Text style={styles.modalSectionTitle}>Informacion basica</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Nombre"
            value={profileForm.firstName}
            onChangeText={(text) => setProfileForm((prev) => ({ ...prev, firstName: text }))}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Apellido"
            value={profileForm.lastName}
            onChangeText={(text) => setProfileForm((prev) => ({ ...prev, lastName: text }))}
          />
          <Text style={styles.modalSectionTitle}>Contacto</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Correo electronico"
            value={profileForm.email}
            onChangeText={(text) => setProfileForm((prev) => ({ ...prev, email: text }))}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Telefono"
            value={profileForm.phone}
            onChangeText={(text) => setProfileForm((prev) => ({ ...prev, phone: text }))}
          />
          <TextInput
            style={[styles.modalInput, { height: 60 }]}
            placeholder="Direccion principal"
            value={profileForm.address}
            onChangeText={(text) => setProfileForm((prev) => ({ ...prev, address: text }))}
            multiline
          />
          <PrimaryButton title="Guardar cambios" onPress={onSave} style={{ marginTop: 12 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  </Modal>
);

const PasswordModal = ({ visible, onClose, passwordForm, setPasswordForm, onSave }) => (
  <Modal visible={visible} transparent animationType="slide">
    <View style={styles.modalOverlay}>
      <SafeAreaView style={styles.modalSheet}>
        <View style={styles.modalHeader}>
          <TouchableOpacity style={styles.modalBack} onPress={onClose}>
            <Ionicons name="chevron-back" size={22} color={colors.darkText} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Cambiar contraseña</Text>
        </View>
        <ScrollView contentContainerStyle={styles.modalScroll}>
          <TextInput
            style={styles.modalInput}
            placeholder="contraseña actual"
            secureTextEntry
            value={passwordForm.current}
            onChangeText={(text) => setPasswordForm((prev) => ({ ...prev, current: text }))}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Nueva contraseña"
            secureTextEntry
            value={passwordForm.next}
            onChangeText={(text) => setPasswordForm((prev) => ({ ...prev, next: text }))}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Confirmar contraseña"
            secureTextEntry
            value={passwordForm.confirm}
            onChangeText={(text) => setPasswordForm((prev) => ({ ...prev, confirm: text }))}
          />
          <PrimaryButton title="Guardar cambios" onPress={onSave} style={{ marginTop: 12 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  </Modal>
);

const PreferencesModal = ({ visible, onClose, notifications, setNotifications }) => (
  <Modal visible={visible} transparent animationType="slide">
    <View style={styles.modalOverlay}>
      <SafeAreaView style={styles.modalSheet}>
        <View style={styles.modalHeader}>
          <TouchableOpacity style={styles.modalBack} onPress={onClose}>
            <Ionicons name="chevron-back" size={22} color={colors.darkText} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Preferencias</Text>
        </View>
        <View style={styles.preferenceRow}>
          <View>
            <Text style={styles.prefLabel}>Notificaciones de pedidos</Text>
            <Text style={styles.prefHint}>Avisos de estados y entregas</Text>
          </View>
          <Switch
            value={notifications.pedidos}
            onValueChange={(value) => setNotifications((prev) => ({ ...prev, pedidos: value }))}
            trackColor={{ true: '#F7B0A4' }}
            thumbColor={notifications.pedidos ? colors.primary : '#f4f3f4'}
          />
        </View>
        <View style={styles.preferenceRow}>
          <View>
            <Text style={styles.prefLabel}>Alertas de creditos/cuotas</Text>
            <Text style={styles.prefHint}>Recordatorios de pagos pendientes</Text>
          </View>
          <Switch
            value={notifications.creditos}
            onValueChange={(value) => setNotifications((prev) => ({ ...prev, creditos: value }))}
            trackColor={{ true: '#F7B0A4' }}
            thumbColor={notifications.creditos ? colors.primary : '#f4f3f4'}
          />
        </View>
      </SafeAreaView>
    </View>
  </Modal>
);

const FaqModal = ({ visible, onClose, faqOpen, toggleFaq }) => (
  <Modal visible={visible} transparent animationType="slide">
    <View style={styles.modalOverlay}>
      <SafeAreaView style={styles.modalSheet}>
        <View style={styles.modalHeader}>
          <TouchableOpacity style={styles.modalBack} onPress={onClose}>
            <Ionicons name="chevron-back" size={22} color={colors.darkText} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Preguntas frecuentes</Text>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
          {faqItems.map((item, index) => {
            const open = faqOpen === index;
            return (
              <View key={item.question} style={styles.faqItem}>
                <TouchableOpacity style={styles.faqRow} onPress={() => toggleFaq(index)}>
                  <View style={styles.faqRowLeft}>
                    <Ionicons name="help-buoy-outline" size={18} color={colors.primary} />
                    <Text style={styles.faqQuestion}>{item.question}</Text>
                  </View>
                  <Ionicons
                    name={open ? 'chevron-up' : 'chevron-down'}
                    size={18}
                    color={colors.textLight}
                  />
                </TouchableOpacity>
                {open && <Text style={styles.faqAnswer}>{item.answer}</Text>}
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  </Modal>
);

const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionLabel}>{title}</Text>
    <View style={styles.sectionCard}>{children}</View>
  </View>
);

const ProfileMenuItem = ({ icon, title, subtitle, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuIcon}>
      <Ionicons name={icon} size={20} color={colors.white} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.menuTitle}>{title}</Text>
      <Text style={styles.menuSubtitle}>{subtitle}</Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color={colors.textLight} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 160,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#FFE4DE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    color: colors.primary,
    fontWeight: '800',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.darkText,
  },
  email: {
    color: colors.textLight,
  },
  section: {
    marginBottom: 18,
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textLight,
    marginBottom: 8,
  },
  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuTitle: {
    fontWeight: '700',
    color: colors.darkText,
  },
  menuSubtitle: {
    color: colors.textLight,
    fontSize: 13,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  faqRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  faqRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  faqQuestion: {
    fontWeight: '700',
    color: colors.darkText,
    marginLeft: 8,
    flex: 1,
  },
  faqAnswer: {
    marginTop: 8,
    color: colors.textLight,
    lineHeight: 20,
  },
  logoutButton: {
    backgroundColor: colors.primary,
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
  },
  logoutText: {
    color: colors.white,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    maxHeight: '94%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalBack: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.inputBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.darkText,
  },
  modalScroll: {
    paddingBottom: 40,
  },
  modalAvatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.inputBackground,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalSectionTitle: {
    fontWeight: '700',
    color: colors.textLight,
    marginBottom: 6,
  },
  modalInput: {
    backgroundColor: colors.inputBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    color: colors.darkText,
  },
  preferenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  prefLabel: {
    fontWeight: '700',
    color: colors.darkText,
  },
  prefHint: {
    color: colors.textLight,
    fontSize: 12,
  },
});

export default PerfilScreen;
