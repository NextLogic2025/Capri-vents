import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import colors from '../../theme/colors';
import globalStyles from '../../theme/styles';
import PrimaryButton from '../components/PrimaryButton';
import ScreenHeader from '../components/ScreenHeader';
import { useAppContext } from '../../context/AppContext';

const DireccionesScreen = ({ navigation }) => {
  const { addresses, addAddress, updateAddress, setDefaultAddress } = useAppContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [form, setForm] = useState({
    label: '',
    street: '',
    number: '',
    floor: '',
    dept: '',
    city: '',
    province: '',
    zip: '',
    references: '',
  });

  const openNewAddress = () => {
    setEditingAddress(null);
    setForm({
      label: '',
      street: '',
      number: '',
      floor: '',
      dept: '',
      city: '',
      province: '',
      zip: '',
      references: '',
    });
    setModalVisible(true);
  };

  const openEditAddress = (address) => {
    setEditingAddress(address);
    setForm({
      label: address.label,
      street: address.street,
      number: address.number,
      floor: address.floor || '',
      dept: address.dept || '',
      city: address.city,
      province: address.province,
      zip: address.zip,
      references: address.references || '',
    });
    setModalVisible(true);
  };

  const handleFormChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleUseCurrentLocation = async () => {
    setLoadingLocation(true);
    try {
      // Solicitar permisos
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Necesitamos acceso a tu ubicación para autocompletar la dirección.');
        setLoadingLocation(false);
        return;
      }

      // Obtener ubicación actual
      let location = await Location.getCurrentPositionAsync({});

      // Geocodificación inversa (convertir coords a dirección)
      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (reverseGeocode.length > 0) {
        const address = reverseGeocode[0];
        setForm((prev) => ({
          ...prev,
          street: address.street || prev.street,
          number: address.streetNumber || prev.number,
          city: address.city || address.subregion || prev.city,
          province: address.region || prev.province,
          zip: address.postalCode || prev.zip,
        }));
        Alert.alert('Ubicación encontrada', 'Hemos completado los campos con tu ubicación actual.');
      }
    } catch (error) {
      console.log('Error obteniendo ubicación:', error);
      Alert.alert('Error', 'No pudimos obtener tu ubicación exacta. Por favor ingresa los datos manualmente.');
    } finally {
      setLoadingLocation(false);
    }
  };

  const handleSaveAddress = () => {
    if (!form.label.trim() || !form.street.trim() || !form.number.trim() || !form.city.trim()) {
      Alert.alert('Campos obligatorios', 'Completa al menos nombre, calle, número y ciudad.');
      return;
    }

    if (editingAddress) {
      updateAddress(editingAddress.id, form);
      Alert.alert('Dirección actualizada', 'Se actualizará en tu perfil.');
      // BACKEND: PUT /cliente/direcciones/:id
    } else {
      addAddress(form);
      Alert.alert('Dirección agregada', 'Se ha guardado tu nueva dirección.');
      // BACKEND: POST /cliente/direcciones
    }

    setModalVisible(false);
  };

  const handleSetDefault = (id) => {
    setDefaultAddress(id);
    // BACKEND: PATCH /cliente/direcciones/:id/predeterminada
  };

  return (
    <View style={styles.screen}>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <PrimaryButton
          title="+ Agregar nueva dirección"
          onPress={openNewAddress}
          style={styles.addButton}
        />

        {addresses.map((address) => (
          <TouchableOpacity
            key={address.id}
            style={[styles.addressCard, address.isDefault && styles.addressCardDefault]}
            activeOpacity={0.9}
            onPress={() => openEditAddress(address)}
          >
            <View style={styles.addressHeaderRow}>
              <View style={styles.addressTitleRow}>
                <View style={[styles.addressIconCircle, address.isDefault && styles.addressIconCircleDefault]}>
                  <Ionicons
                    name={address.isDefault ? "star" : "location"}
                    size={18}
                    color={address.isDefault ? colors.white : colors.primary}
                  />
                </View>
                <Text style={styles.addressLabel}>{address.label}</Text>
                {address.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultBadgeText}>Predeterminada</Text>
                  </View>
                )}
              </View>
              <TouchableOpacity onPress={() => openEditAddress(address)}>
                <Ionicons name="pencil-outline" size={20} color={colors.primary} />
              </TouchableOpacity>
            </View>

            <View style={styles.addressDetails}>
              <Text style={styles.addressLine}>
                {address.street} {address.number}
              </Text>
              <Text style={styles.addressLine}>
                {address.city}, {address.province}
              </Text>
              {address.zip ? <Text style={styles.addressLine}>CP: {address.zip}</Text> : null}

              {address.references ? (
                <View style={styles.referenceContainer}>
                  <Ionicons name="information-circle-outline" size={14} color={colors.textMuted} style={{ marginTop: 2, marginRight: 4 }} />
                  <Text style={styles.addressRefs} numberOfLines={2}>
                    {address.references}
                  </Text>
                </View>
              ) : null}
            </View>

            {!address.isDefault && (
              <TouchableOpacity
                style={styles.setDefaultButton}
                onPress={() => handleSetDefault(address.id)}
              >
                <Text style={styles.setDefaultText}>Usar como predeterminada</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        ))}

        {addresses.length === 0 && (
          <View style={styles.emptyContainer}>
            <Ionicons name="map-outline" size={64} color={colors.borderSoft} />
            <Text style={styles.emptyText}>
              Aún no tienes direcciones guardadas.
            </Text>
            <Text style={styles.emptySubtext}>
              Agrega tu primera dirección para agilizar tus pedidos.
            </Text>
          </View>
        )}
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingAddress ? 'Editar dirección' : 'Nueva dirección'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.textDark} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.modalScroll}>

              {!editingAddress && (
                <TouchableOpacity
                  style={styles.locationButton}
                  onPress={handleUseCurrentLocation}
                  disabled={loadingLocation}
                >
                  {loadingLocation ? (
                    <ActivityIndicator size="small" color={colors.white} />
                  ) : (
                    <>
                      <Ionicons name="locate" size={20} color={colors.white} style={{ marginRight: 8 }} />
                      <Text style={styles.locationButtonText}>Usar mi ubicación actual</Text>
                    </>
                  )}
                </TouchableOpacity>
              )}

              <LabeledInput
                label="Nombre (Ej: Casa, Trabajo)"
                value={form.label}
                onChangeText={(t) => handleFormChange('label', t)}
                placeholder="Ej: Casa"
              />

              <View style={styles.row}>
                <View style={[styles.rowItem, { flex: 2 }]}>
                  <LabeledInput
                    label="Calle"
                    value={form.street}
                    onChangeText={(t) => handleFormChange('street', t)}
                    placeholder="Av. Principal"
                  />
                </View>
                <View style={[styles.rowItem, { flex: 1 }]}>
                  <LabeledInput
                    label="Número"
                    value={form.number}
                    onChangeText={(t) => handleFormChange('number', t)}
                    placeholder="123"
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.rowItem}>
                  <LabeledInput
                    label="Piso (Opcional)"
                    value={form.floor}
                    onChangeText={(t) => handleFormChange('floor', t)}
                    placeholder="PB"
                  />
                </View>
                <View style={styles.rowItem}>
                  <LabeledInput
                    label="Depto (Opcional)"
                    value={form.dept}
                    onChangeText={(t) => handleFormChange('dept', t)}
                    placeholder="4B"
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.rowItem}>
                  <LabeledInput
                    label="Ciudad"
                    value={form.city}
                    onChangeText={(t) => handleFormChange('city', t)}
                    placeholder="Ciudad"
                  />
                </View>
                <View style={styles.rowItem}>
                  <LabeledInput
                    label="Provincia"
                    value={form.province}
                    onChangeText={(t) => handleFormChange('province', t)}
                    placeholder="Provincia"
                  />
                </View>
              </View>

              <LabeledInput
                label="Código Postal"
                value={form.zip}
                onChangeText={(t) => handleFormChange('zip', t)}
                keyboardType="numeric"
                placeholder="000000"
              />

              <LabeledInput
                label="Referencias adicionales"
                value={form.references}
                onChangeText={(t) => handleFormChange('references', t)}
                placeholder="Ej: Frente al parque, portón negro..."
                multiline
              />

              <PrimaryButton
                title={editingAddress ? 'Guardar cambios' : 'Guardar dirección'}
                onPress={handleSaveAddress}
                style={{ marginTop: 16 }}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const LabeledInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  multiline = false,
}) => (
  <View style={styles.fieldGroup}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <TextInput
      style={[styles.input, multiline && { height: 80, textAlignVertical: 'top' }]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.textMuted}
      keyboardType={keyboardType}
      multiline={multiline}
    />
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  addButton: {
    marginBottom: 20,
  },
  addressCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  addressCardDefault: {
    borderColor: colors.primary,
    backgroundColor: '#FFF5F2',
  },
  addressHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  addressTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  addressIconCircleDefault: {
    backgroundColor: colors.primary,
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
  },
  defaultBadge: {
    marginLeft: 8,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: colors.primary,
  },
  defaultBadgeText: {
    fontSize: 10,
    color: colors.white,
    fontWeight: '700',
  },
  addressDetails: {
    paddingLeft: 42,
  },
  addressLine: {
    color: colors.textDark,
    fontSize: 14,
    marginBottom: 2,
  },
  referenceContainer: {
    flexDirection: 'row',
    marginTop: 6,
    backgroundColor: 'rgba(0,0,0,0.03)',
    padding: 8,
    borderRadius: 8,
  },
  addressRefs: {
    fontSize: 13,
    color: colors.textMuted,
    fontStyle: 'italic',
    flex: 1,
  },
  setDefaultButton: {
    marginTop: 12,
    paddingLeft: 42,
  },
  setDefaultText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    opacity: 0.7,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
  },
  emptySubtext: {
    marginTop: 8,
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    height: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textDark,
  },
  modalScroll: {
    paddingBottom: 40,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary || '#4CAF50',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  locationButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowItem: {
    flex: 1,
    marginRight: 10,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.textDark,
  },
});

export default DireccionesScreen;
