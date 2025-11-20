import React from 'react';
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import { useAppContext } from '../../context/AppContext';
import ScreenHeader from '../../Cliente/components/ScreenHeader';

/** Bloque de título de sección (Información personal, Seguridad, Soporte) */
const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionLabel}>{title}</Text>
    <View style={styles.sectionCard}>{children}</View>
  </View>
);

/** Ítem de menú reutilizable (ícono rojo + título + subtítulo + chevron) */
const ProfileMenuItem = ({ iconName, title, subtitle, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.8}>
    <View style={styles.menuIcon}>
      <Ionicons name={iconName} size={22} color={colors.white} />
    </View>
    <View style={styles.menuTextContainer}>
      <Text style={styles.menuTitle}>{title}</Text>
      {subtitle ? <Text style={styles.menuSubtitle}>{subtitle}</Text> : null}
    </View>
    <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
  </TouchableOpacity>
);

const VendedorPerfilScreen = () => {
  const { vendorUser, logout } = useAppContext();

  const initials = vendorUser?.name
    ?.split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const handleSupportWhatsapp = () => {
    const url = 'https://wa.me/593999999999';
    Linking.openURL(url).catch(() => {
      Alert.alert('Atención', 'No se pudo abrir WhatsApp.');
    });
  };

  const handleSupportEmail = () => {
    const url = 'mailto:soporte@cafrilosa.com';
    Linking.openURL(url).catch(() => {
      Alert.alert('Atención', 'No se pudo abrir el correo.');
    });
  };

  const handleLogout = () => {
    logout();
  };

  const handlePlaceholder = (msg) => {
    Alert.alert('Próximamente', msg);
  };

  return (
    <View style={styles.screen}>
      <ScreenHeader title="Perfil" sectionLabel="Gestiona tu cuenta" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Cabecera con avatar, nombre y datos básicos */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials || 'VD'}</Text>
          </View>
          <Text style={styles.name}>{vendorUser?.name || 'Vendedor asignado'}</Text>
          <Text style={styles.email}>{vendorUser?.email}</Text>
          <Text style={styles.zone}>
            Zona: {vendorUser?.zone || 'Sin zona asignada'}
          </Text>
        </View>

        {/* INFORMACIÓN PERSONAL */}
        <Section title="Información personal">
          <ProfileMenuItem
            iconName="person-circle-outline"
            title="Datos personales"
            subtitle="Nombre, correo y teléfono"
            onPress={() =>
              handlePlaceholder('Aquí irá la pantalla de Datos Personales del vendedor.')
            }
          />
          <ProfileMenuItem
            iconName="navigate-outline"
            title="Zona y bodega base"
            subtitle={vendorUser?.address || 'Configura tu zona de trabajo'}
            onPress={() =>
              handlePlaceholder('Aquí podrás ajustar zona y bodega base del vendedor.')
            }
          />
        </Section>

        {/* SEGURIDAD */}
        <Section title="Seguridad">
          <ProfileMenuItem
            iconName="lock-closed-outline"
            title="Contraseña"
            subtitle="Cambia tu contraseña de acceso"
            onPress={() =>
              handlePlaceholder('Aquí se gestionará el cambio de contraseña del vendedor.')
            }
          />
        </Section>

        {/* SOPORTE */}
        <Section title="Soporte">
          <ProfileMenuItem
            iconName="chatbubble-ellipses-outline"
            title="Contactar supervisor"
            subtitle="Abre una conversación en WhatsApp"
            onPress={handleSupportWhatsapp}
          />
          <ProfileMenuItem
            iconName="help-circle-outline"
            title="Soporte TI"
            subtitle="Escríbenos por correo para ayuda técnica"
            onPress={handleSupportEmail}
          />
        </Section>

        {/* BOTÓN CERRAR SESIÓN */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    paddingTop: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FFE1D8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
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
  section: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSoft,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textDark,
  },
  menuSubtitle: {
    fontSize: 13,
    color: colors.textLight,
    marginTop: 2,
  },
  logoutButton: {
    marginTop: 24,
    backgroundColor: colors.primary,
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
  },
  logoutText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
});

export default VendedorPerfilScreen;
