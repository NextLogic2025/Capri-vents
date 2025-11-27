import React from 'react';
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../theme/colors';
import { useAppContext } from '../../context/AppContext';
import DocumentSelectorModal from '../../components/DocumentSelectorModal';
import PDFViewerModal from '../../components/PDFViewerModal';

/** Ítem de menú reutilizable (ícono rojo + título + subtítulo + chevron) */
const ProfileMenuItem = ({ iconName, title, subtitle, onPress, isLast }) => (
  <TouchableOpacity
    style={[styles.menuItem, isLast && styles.menuItemLast]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.menuIconContainer}>
      <Ionicons name={iconName} size={22} color={colors.primary} />
    </View>
    <View style={styles.menuTextContainer}>
      <Text style={styles.menuTitle}>{title}</Text>
      {subtitle ? <Text style={styles.menuSubtitle}>{subtitle}</Text> : null}
    </View>
    <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
  </TouchableOpacity>
);

const VendedorPerfilScreen = ({ navigation }) => {
  const { vendorUser, logout } = useAppContext();
  const [docSelectorVisible, setDocSelectorVisible] = React.useState(false);
  const [pdfModalVisible, setPdfModalVisible] = React.useState(false);
  const [selectedDocument, setSelectedDocument] = React.useState(null);

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

  const handlePlaceholder = (msg) => {
    Alert.alert('Próximamente', msg);
  };

  const handleSelectDocument = (docId) => {
    setSelectedDocument(docId);
    setPdfModalVisible(true);
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
            <Text style={styles.headerTitle}>Perfil</Text>
            <Text style={styles.headerSubtitle}>Gestiona tu cuenta</Text>
          </View>
          <View style={styles.headerIcon}>
            <Ionicons name="person" size={32} color={colors.white} />
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header del Perfil - Estilo Profesional */}
        <View style={styles.profileHeaderCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>{initials || 'VD'}</Text>
            </View>
            <TouchableOpacity
              style={styles.editAvatarButton}
              onPress={() => navigation.navigate('DatosPersonales')}
            >
              <Ionicons name="pencil" size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{vendorUser?.name || 'Vendedor Cafrilosa'}</Text>
          <Text style={styles.email}>{vendorUser?.email || 'vendedor@cafrilosa.com'}</Text>
          <View style={styles.roleBadge}>
            <Ionicons name="briefcase" size={14} color={colors.primary} />
            <Text style={styles.roleText}>VENDEDOR</Text>
          </View>
          {vendorUser?.zone && (
            <View style={styles.zoneBadge}>
              <Ionicons name="location" size={12} color={colors.textMuted} />
              <Text style={styles.zoneText}>{vendorUser.zone}</Text>
            </View>
          )}
        </View>

        {/* INFORMACIÓN PERSONAL */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Cuenta</Text>
          <View style={styles.menuCard}>
            <ProfileMenuItem
              iconName="person-outline"
              title="Datos personales"
              subtitle="Nombre, correo y teléfono"
              onPress={() => navigation.navigate('DatosPersonales')}
              isLast={false}
            />
            <ProfileMenuItem
              iconName="map-outline"
              title="Zona Asignada"
              subtitle={vendorUser?.zone || 'Norte - Sector 4'}
              onPress={() => handlePlaceholder('Detalles de la zona: Cobertura de 5km a la redonda.')}
              isLast={true}
            />
          </View>
        </View>

        {/* SEGURIDAD */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Seguridad</Text>
          <View style={styles.menuCard}>
            <ProfileMenuItem
              iconName="lock-closed-outline"
              title="Cambiar contraseña"
              subtitle="Actualiza tu contraseña de acceso"
              onPress={() => navigation.navigate('CambiarContrasena')}
              isLast={true}
            />
          </View>
        </View>

        {/* SOPORTE */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Soporte y Legal</Text>
          <View style={styles.menuCard}>
            <ProfileMenuItem
              iconName="chatbubble-ellipses-outline"
              title="Contactar supervisor"
              subtitle="Abre una conversación en WhatsApp"
              onPress={handleSupportWhatsapp}
              isLast={false}
            />
            <ProfileMenuItem
              iconName="ticket-outline"
              title="Soporte TI"
              subtitle="Reportar problemas y ver estado"
              onPress={() => navigation.navigate('VendedorSoporte')}
              isLast={false}
            />
            <ProfileMenuItem
              iconName="document-text-outline"
              title="Documentos Legales"
              subtitle="Términos, privacidad y consentimiento"
              onPress={() => setDocSelectorVisible(true)}
              isLast={true}
            />
          </View>
        </View>

        {/* BOTÓN CERRAR SESIÓN */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={colors.danger} />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Versión 2.0.1 • Vendedor</Text>
      </ScrollView>

      {/* Modal de Selector de Documentos */}
      <DocumentSelectorModal
        visible={docSelectorVisible}
        onClose={() => setDocSelectorVisible(false)}
        onSelectDocument={handleSelectDocument}
      />

      {/* Modal de Visualización de PDF */}
      <PDFViewerModal
        visible={pdfModalVisible}
        onClose={() => setPdfModalVisible(false)}
        pdfType={selectedDocument}
      />
    </View>
  );
};

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
    paddingTop: 20,
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 8,
  },
  roleText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
  zoneBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  zoneText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 4,
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
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.darkText,
  },
  menuSubtitle: {
    fontSize: 13,
    color: colors.textLight,
    marginTop: 2,
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
    marginLeft: 8,
  },
  versionText: {
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: 12,
    marginBottom: 20,
  },
});

export default VendedorPerfilScreen;
