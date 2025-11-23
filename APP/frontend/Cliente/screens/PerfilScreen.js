import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  Switch,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../theme/colors';
import globalStyles from '../../theme/styles';
import { useAppContext } from '../../context/AppContext';
import PrimaryButton from '../../components/PrimaryButton';

const PerfilScreen = ({ navigation }) => {
  const { user, logout, notifications, setNotifications } = useAppContext();
  const [prefModalVisible, setPrefModalVisible] = useState(false);

  const preferenceOptions = [
    { key: 'pedidos', label: 'Notificaciones de pedidos' },
    { key: 'productos', label: 'Lanzamientos y productos' },
    { key: 'recordatorios', label: 'Recordatorios y alertas' },
  ];

  const nameParts = useMemo(() => {
    const parts = (user?.name || '').split(' ');
    return {
      firstName: parts.shift() || '',
      lastName: parts.join(' '),
    };
  }, [user?.name]);

  const avatarInitial = (user?.name || 'C').trim().charAt(0).toUpperCase();

  const handleLogout = () => {
    if (Platform.OS === 'web') {
      logout();
      return;
    }
    Alert.alert('Cerrar sesión', '¿Deseas salir de tu cuenta?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Cerrar sesión',
        style: 'destructive',
        onPress: () => {
          logout();
        },
      },
    ]);
  };

  const goToRoot = (screenName) => {
    const parentNav = navigation.getParent?.();
    const rootNavigator = parentNav?.getParent?.() ?? parentNav;
    if (rootNavigator) {
      rootNavigator.navigate(screenName);
    } else {
      navigation.navigate(screenName);
    }
  };

  const handleTogglePreference = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      {/* Header con Gradiente */}
      <LinearGradient
        colors={[colors.primary, colors.primaryDark || '#8B0000']}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Mi Perfil</Text>
            <Text style={styles.headerSubtitle}>Gestiona tu cuenta y preferencias</Text>
          </View>
          <View style={styles.headerIcon}>
            <Ionicons name="person" size={32} color={colors.white} />
          </View>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header del Perfil */}
        <View style={styles.profileHeaderCard}>
          <View style={styles.avatarContainer}>
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>{avatarInitial}</Text>
              </View>
            )}
            <TouchableOpacity style={styles.editAvatarButton} onPress={() => goToRoot('DatosPersonales')}>
              <Ionicons name="pencil" size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{user?.name || 'Usuario Cafrilosa'}</Text>
          <Text style={styles.email}>{user?.email || 'usuario@cafrilosa.com'}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{(user?.role || 'Cliente').toUpperCase()}</Text>
          </View>
        </View>

        {/* Sección Cuenta */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Cuenta</Text>
          <View style={styles.menuCard}>
            <ProfileMenuItem
              icon="person-outline"
              title="Datos personales"
              onPress={() => goToRoot('DatosPersonales')}
              isLast={false}
            />
            <ProfileMenuItem
              icon="location-outline"
              title="Direcciones de entrega"
              onPress={() => goToRoot('Direcciones')}
              isLast={false}
            />
            <ProfileMenuItem
              icon="card-outline"
              title="Métodos de pago"
              onPress={() => goToRoot('MetodosPago')}
              isLast={true}
            />
          </View>
        </View>

        {/* Sección Seguridad */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Seguridad</Text>
          <View style={styles.menuCard}>
            <ProfileMenuItem
              icon="lock-closed-outline"
              title="Cambiar contraseña"
              onPress={() => goToRoot('CambiarContrasena')}
              isLast={true}
            />
          </View>
        </View>

        {/* Sección Ayuda y Soporte */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Ayuda y Soporte</Text>
          <View style={styles.menuCard}>
            <ProfileMenuItem
              icon="chatbubble-ellipses-outline"
              title="Soporte y Tickets"
              onPress={() => goToRoot('ClienteSoporte')}
              isLast={false}
            />
            <ProfileMenuItem
              icon="help-circle-outline"
              title="Preguntas Frecuentes"
              onPress={() => goToRoot('PreguntasFrecuentes')}
              isLast={false}
            />
            <ProfileMenuItem
              icon="document-text-outline"
              title="Términos y Condiciones"
              onPress={() =>
                Alert.alert(
                  'Términos y condiciones',
                  'Consulta los términos y políticas en cafrilosa.com'
                )
              }
              isLast={true}
            />
          </View>
        </View>

        {/* Botón cerrar sesión */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={colors.danger} style={{ marginRight: 8 }} />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Versión 2.0.1</Text>
      </ScrollView>

      {/* Modal de Preferencias */}
      <Modal visible={prefModalVisible} transparent animationType="fade">
        <View style={styles.prefOverlay}>
          <View style={styles.prefCard}>
            <Text style={styles.prefTitle}>Notificaciones</Text>
            <Text style={styles.prefSubtitle}>
              Elige qué notificaciones deseas recibir.
            </Text>
            {preferenceOptions.map((option) => (
              <View key={option.key} style={styles.prefRow}>
                <Text style={styles.prefLabel}>{option.label}</Text>
                <Switch
                  value={Boolean(notifications?.[option.key])}
                  onValueChange={() => handleTogglePreference(option.key)}
                  thumbColor={colors.white}
                  trackColor={{ true: colors.primary, false: colors.borderSoft }}
                />
              </View>
            ))}
            <PrimaryButton
              title="Listo"
              onPress={() => setPrefModalVisible(false)}
              style={styles.prefButton}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const ProfileMenuItem = ({ icon, title, onPress, isLast }) => (
  <TouchableOpacity
    style={[styles.menuItem, isLast && styles.menuItemLast]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.menuIconContainer}>
      <Ionicons name={icon} size={22} color={colors.primary} />
    </View>
    <Text style={styles.menuTitle}>{title}</Text>
    <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerGradient: {
    paddingTop: 50,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    color: colors.white,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
    marginTop: 4,
  },
  headerIcon: {
    width: 56,
    height: 56,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  profileHeaderCard: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFEBEE',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.white,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  avatarText: {
    fontSize: 40,
    color: colors.primary,
    fontWeight: '800',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.darkText,
    marginBottom: 4,
    textAlign: 'center',
  },
  email: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 12,
  },
  roleBadge: {
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  roleText: {
    color: colors.goldDark,
    fontSize: 12,
    fontWeight: '700',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.darkText,
    marginBottom: 12,
    marginLeft: 4,
  },
  menuCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSoft,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFEBEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.darkText,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFEBEE',
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  logoutText: {
    color: colors.danger,
    fontWeight: '700',
    fontSize: 16,
  },
  versionText: {
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: 12,
    marginBottom: 20,
  },
  prefOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 24,
  },
  prefCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  prefTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.darkText,
    marginBottom: 8,
    textAlign: 'center',
  },
  prefSubtitle: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 24,
    textAlign: 'center',
  },
  prefRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  prefLabel: {
    fontSize: 16,
    color: colors.darkText,
    fontWeight: '500',
    flex: 1,
    marginRight: 16,
  },
  prefButton: {
    marginTop: 12,
  },
});

export default PerfilScreen;
