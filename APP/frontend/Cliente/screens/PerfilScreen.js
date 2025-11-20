import React, { useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import { useAppContext } from '../../context/AppContext';
import ScreenHeader from '../components/ScreenHeader';

const PerfilScreen = ({ navigation }) => {
  const { user, logout } = useAppContext();

  const nameParts = useMemo(() => {
    const parts = (user?.name || '').split(' ');
    return {
      firstName: parts.shift() || '',
      lastName: parts.join(' '),
    };
  }, [user?.name]);

  const avatarInitial = (user?.name || 'C').trim().charAt(0).toUpperCase();

  const handleLogout = () => {
    Alert.alert('Cerrar sesión', '¿Deseas salir de tu cuenta?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Cerrar sesión',
        style: 'destructive',
        onPress: () => {
          logout();
          const parentNav = navigation.getParent?.();
          if (parentNav) {
            parentNav.reset({ index: 0, routes: [{ name: 'AuthStack' }] });
          } else {
            navigation.reset({ index: 0, routes: [{ name: 'AuthStack' }] });
          }
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

  return (
    <View style={styles.screen}>
      <ScreenHeader title="Perfil" subtitle="Gestiona tu cuenta" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Avatar + nombre */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{avatarInitial}</Text>
          </View>
          <Text style={styles.name}>{user?.name || `${nameParts.firstName} ${nameParts.lastName}`}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        {/* Sección Cuenta */}
        <Section title="Cuenta">
          <ProfileMenuItem
            icon="person-circle-outline"
            title="Datos personales"
            subtitle="Actualiza tu información"
            onPress={() => goToRoot('DatosPersonales')}
          />
        </Section>

        {/* Sección Información */}
        <Section title="Información">
          <ProfileMenuItem
            icon="location-outline"
            title="Direcciones"
            subtitle="Administra tus direcciones de entrega"
            onPress={() => goToRoot('Direcciones')}
          />
          <ProfileMenuItem
            icon="card-outline"
            title="Métodos de pago"
            subtitle="Agrega o administra tus métodos de pago"
            onPress={() => goToRoot('MetodosPago')}
          />
        </Section>

        {/* Sección Seguridad */}
        <Section title="Seguridad">
          <ProfileMenuItem
            icon="lock-closed-outline"
            title="Contraseña"
            subtitle="Cambia tu contraseña periódicamente"
            onPress={() => goToRoot('CambiarContrasena')}
          />
        </Section>

        {/* Sección Soporte */}
        <Section title="Soporte">
          <ProfileMenuItem
            icon="options-outline"
            title="Preferencias"
            subtitle="Notificaciones y recordatorios"
            onPress={() =>
              Alert.alert('Preferencias', 'Aquí podrás configurar tus preferencias.')
            }
          />
          <ProfileMenuItem
            icon="help-circle-outline"
            title="Preguntas frecuentes"
            subtitle="Resuelve dudas comunes"
            onPress={() => goToRoot('PreguntasFrecuentes')}
          />
          <ProfileMenuItem
            icon="document-text-outline"
            title="Términos y condiciones"
            subtitle="Consulta nuestras políticas"
            onPress={() =>
              Alert.alert(
                'Términos y condiciones',
                'Consulta los términos y políticas en cafrilosa.com'
              )
            }
          />
        </Section>

        {/* Botón cerrar sesión */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionLabel}>{title}</Text>
    <View style={styles.sectionCard}>{children}</View>
  </View>
);

const ProfileMenuItem = ({ icon, title, subtitle, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.8}>
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
  logoutButton: {
    backgroundColor: colors.primary,
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  logoutText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
});

export default PerfilScreen;
