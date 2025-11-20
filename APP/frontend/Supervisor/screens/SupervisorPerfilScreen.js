import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../Cliente/components/ScreenHeader';
import colors from '../../theme/colors';
import { useAppContext } from '../../context/AppContext';

/** Sección con título + tarjeta contenedora */
const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionLabel}>{title}</Text>
    <View style={styles.sectionCard}>{children}</View>
  </View>
);

/** Fila reutilizable de menú (icono rojo + título + subtítulo + chevron) */
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

const SupervisorPerfilScreen = () => {
  const {
    supervisorUser,
    logout,
    vendorAssignedOrders = [],
    credits = [],
  } = useAppContext();

  const vendedoresActivos = vendorAssignedOrders.length;
  const clientesConCredito = credits.length;

  const initials = supervisorUser?.name
    ?.split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const handleSupportEmail = () => {
    Linking.openURL('mailto:soporte@cafrilosa.com').catch(() => {
      Alert.alert('Atención', 'No se pudo abrir el correo.');
    });
  };

  const handleSupportWhatsapp = () => {
    Linking.openURL('https://wa.me/593999999999').catch(() => {
      Alert.alert('Atención', 'No se pudo abrir WhatsApp.');
    });
  };

  const handlePlaceholder = (msg) => {
    Alert.alert('Próximamente', msg);
  };

  const handleLogout = () => {
    Alert.alert('Cerrar sesión', '¿Confirmas cerrar sesión?', [
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

  return (
    <View style={styles.screen}>
      <ScreenHeader title="Perfil" sectionLabel="Gestiona tu cuenta" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header con avatar y datos básicos */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials || 'S'}</Text>
          </View>
          <Text style={styles.name}>{supervisorUser?.name || 'Supervisor'}</Text>
          <Text style={styles.email}>{supervisorUser?.email}</Text>
          <Text style={styles.role}>{supervisorUser?.role || 'Supervisor'}</Text>
        </View>

        {/* INFORMACIÓN PERSONAL */}
        <Section title="Información personal">
          <ProfileMenuItem
            iconName="person-circle-outline"
            title="Datos personales"
            subtitle={`Teléfono: ${supervisorUser?.phone || 'Sin registrar'}`}
            onPress={() =>
              handlePlaceholder('Aquí irá la pantalla de datos personales del supervisor.')
            }
          />
          <ProfileMenuItem
            iconName="people-outline"
            title="Equipo y resumen"
            subtitle={`Vendedores activos: ${vendedoresActivos} · Clientes con crédito: ${clientesConCredito}`}
            onPress={() =>
              handlePlaceholder('Aquí verás el resumen detallado de tu equipo y clientes.')
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
              handlePlaceholder('Aquí se configurará el cambio de contraseña.')
            }
          />
        </Section>

        {/* SOPORTE */}
        <Section title="Soporte">
          <ProfileMenuItem
            iconName="mail-outline"
            title="Contactar TI"
            subtitle="Envíanos un correo para soporte técnico"
            onPress={handleSupportEmail}
          />
          <ProfileMenuItem
            iconName="logo-whatsapp"
            title="WhatsApp soporte"
            subtitle="Chatea con soporte o tu contacto TI"
            onPress={handleSupportWhatsapp}
          />
        </Section>

        {/* CERRAR SESIÓN */}
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
  role: {
    marginTop: 6,
    color: colors.primary,
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

export default SupervisorPerfilScreen;
