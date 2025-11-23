import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  StatusBar,
  Image,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../theme/colors';
import { useAppContext } from '../../context/AppContext';
import PrimaryButton from '../../components/PrimaryButton';

const SupervisorPerfilScreen = ({ navigation }) => {
  const {
    supervisorUser,
    logout,
    allOrders,
    supervisorCredits,
    products,
  } = useAppContext();

  const [teamModalVisible, setTeamModalVisible] = useState(false);
  const [summaryModalVisible, setSummaryModalVisible] = useState(false);

  // Estadísticas del supervisor
  const stats = useMemo(() => {
    const totalVendors = 5; // Mock: vendedores activos
    const totalClients = supervisorCredits.length;
    const totalOrders = allOrders.length;
    const totalProducts = products.length;
    const lowStockCount = products.filter(p => p.stockActual < p.stockMin).length;

    return {
      totalVendors,
      totalClients,
      totalOrders,
      lowStockCount,
    };
  }, [allOrders, supervisorCredits, products]);

  const avatarInitial = (supervisorUser?.name || 'S').trim().charAt(0).toUpperCase();

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
        style={styles.scrollView}
      >
        {/* Header del Perfil */}
        <View style={styles.profileHeaderCard}>
          <View style={styles.avatarContainer}>
            {supervisorUser?.avatar ? (
              <Image source={{ uri: supervisorUser.avatar }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>{avatarInitial}</Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.editAvatarButton}
              onPress={() => goToRoot('DatosPersonales')}
            >
              <Ionicons name="pencil" size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{supervisorUser?.name || 'Supervisor Cafrilosa'}</Text>
          <Text style={styles.email}>{supervisorUser?.email || 'supervisor@cafrilosa.com'}</Text>
          <View style={styles.roleBadge}>
            <Ionicons name="shield-checkmark" size={14} color={colors.primary} />
            <Text style={styles.roleText}>SUPERVISOR</Text>
          </View>
        </View>

        {/* Sección Cuenta */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Cuenta</Text>
          <View style={styles.menuCard}>
            <ProfileMenuItem
              icon="person-outline"
              title="Datos personales"
              subtitle="Edita tu información personal"
              onPress={() => goToRoot('DatosPersonales')}
              isLast={false}
            />
            <ProfileMenuItem
              icon="people-outline"
              title="Mi Equipo"
              subtitle={`${stats.totalVendors} vendedores activos`}
              onPress={() => setTeamModalVisible(true)}
              isLast={true}
            />
          </View>
        </View>

        {/* Sección Resumen */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Gestión</Text>
          <View style={styles.menuCard}>
            <ProfileMenuItem
              icon="stats-chart-outline"
              title="Resumen General"
              subtitle={`${stats.totalOrders} pedidos · ${stats.totalClients} clientes`}
              onPress={() => setSummaryModalVisible(true)}
              isLast={false}
            />
            <ProfileMenuItem
              icon="notifications-outline"
              title="Alertas y Notificaciones"
              subtitle={stats.lowStockCount > 0 ? `${stats.lowStockCount} productos bajo stock` : 'Todo OK'}
              onPress={() => Alert.alert('Alertas', 'Configuración de alertas próximamente')}
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
              subtitle="Actualiza tu contraseña de acceso"
              onPress={() => goToRoot('CambiarContrasena')}
              isLast={true}
            />
          </View>
        </View>

        {/* Sección Soporte */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Soporte y Legal</Text>
          <View style={styles.menuCard}>
            <ProfileMenuItem
              icon="help-circle-outline"
              title="Ayuda y soporte"
              subtitle="Preguntas frecuentes y contacto"
              onPress={() => Alert.alert('Soporte', 'Contacta a soporte@cafrilosa.com')}
              isLast={false}
            />
            <ProfileMenuItem
              icon="document-text-outline"
              title="Términos y condiciones"
              subtitle="Políticas de uso"
              onPress={() => Alert.alert('Términos', 'Consulta cafrilosa.com/terminos')}
              isLast={true}
            />
          </View>
        </View>

        {/* Botón cerrar sesión */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={colors.danger} />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Versión 2.0.1 • Supervisor</Text>
      </ScrollView>

      {/* Modal: Mi Equipo */}
      <Modal visible={teamModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Ionicons name="people" size={28} color={colors.primary} />
              <Text style={styles.modalTitle}>Mi Equipo</Text>
            </View>
            <Text style={styles.modalSubtitle}>Vendedores a tu cargo</Text>

            {/* Lista de vendedores (mock) */}
            <View style={styles.teamList}>
              {[
                { id: 1, name: 'Andrés Cuevas', zone: 'Loja Norte', orders: 5 },
                { id: 2, name: 'Silvia Paredes', zone: 'Quito Sur', orders: 3 },
                { id: 3, name: 'Daniel Mora', zone: 'Guayaquil Centro', orders: 7 },
                { id: 4, name: 'María González', zone: 'Cuenca Este', orders: 4 },
                { id: 5, name: 'Carlos Pérez', zone: 'Ambato', orders: 6 },
              ].map((vendor) => (
                <View key={vendor.id} style={styles.teamCard}>
                  <View style={styles.vendorAvatar}>
                    <Ionicons name="person" size={20} color={colors.primary} />
                  </View>
                  <View style={styles.vendorInfo}>
                    <Text style={styles.vendorName}>{vendor.name}</Text>
                    <Text style={styles.vendorMeta}>
                      {vendor.zone} · {vendor.orders} pedidos activos
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
                </View>
              ))}
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: colors.background }]}
                onPress={() => setTeamModalVisible(false)}
              >
                <Text style={[styles.modalButtonText, { color: colors.textDark }]}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal: Resumen General */}
      <Modal visible={summaryModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Ionicons name="stats-chart" size={28} color={colors.primary} />
              <Text style={styles.modalTitle}>Resumen General</Text>
            </View>
            <Text style={styles.modalSubtitle}>Estadísticas de tu gestión</Text>

            <View style={styles.statsGrid}>
              <View style={[styles.statCard, { backgroundColor: '#E3F2FD' }]}>
                <Ionicons name="cube" size={28} color="#1976D2" />
                <Text style={styles.statValue}>{stats.totalOrders}</Text>
                <Text style={styles.statLabel}>Pedidos</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: '#E8F5E9' }]}>
                <Ionicons name="people" size={28} color="#43A047" />
                <Text style={styles.statValue}>{stats.totalClients}</Text>
                <Text style={styles.statLabel}>Clientes</Text>
              </View>
            </View>

            <View style={styles.statsGrid}>
              <View style={[styles.statCard, { backgroundColor: '#FFF3E0' }]}>
                <Ionicons name="pricetags" size={28} color="#F57C00" />
                <Text style={styles.statValue}>{stats.totalProducts}</Text>
                <Text style={styles.statLabel}>Productos</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: '#FFEBEE' }]}>
                <Ionicons name="person-add" size={28} color={colors.primary} />
                <Text style={styles.statValue}>{stats.totalVendors}</Text>
                <Text style={styles.statLabel}>Vendedores</Text>
              </View>
            </View>

            {stats.lowStockCount > 0 && (
              <View style={styles.alertBox}>
                <Ionicons name="warning" size={20} color={colors.warning} />
                <Text style={styles.alertText}>
                  {stats.lowStockCount} producto{stats.lowStockCount > 1 ? 's' : ''} con stock bajo
                </Text>
              </View>
            )}

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: colors.background }]}
                onPress={() => setSummaryModalVisible(false)}
              >
                <Text style={[styles.modalButtonText, { color: colors.textDark }]}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const ProfileMenuItem = ({ icon, title, subtitle, onPress, isLast }) => (
  <TouchableOpacity
    style={[styles.menuItem, isLast && styles.menuItemLast]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.menuIconContainer}>
      <Ionicons name={icon} size={22} color={colors.primary} />
    </View>
    <View style={styles.menuTextContainer}>
      <Text style={styles.menuTitle}>{title}</Text>
      {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
    </View>
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
  scrollView: {
    flex: 1,
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  roleText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 24,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.darkText,
    marginLeft: 12,
  },
  modalSubtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 20,
    fontWeight: '600',
  },
  teamList: {
    marginBottom: 16,
  },
  teamCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: colors.background,
    marginBottom: 10,
  },
  vendorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  vendorInfo: {
    flex: 1,
  },
  vendorName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.darkText,
  },
  vendorMeta: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 16,
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.darkText,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '600',
  },
  alertBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  alertText: {
    fontSize: 14,
    color: colors.warning,
    fontWeight: '600',
    marginLeft: 8,
    flex: 1,
  },
  modalActions: {
    marginTop: 8,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    marginBottom: 10,
  },
  modalButtonText: {
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

export default SupervisorPerfilScreen;
