import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import globalStyles from '../../theme/styles';
import PrimaryButton from '../components/PrimaryButton';
import { useAppContext } from '../../context/AppContext';

const DireccionesScreen = () => {
  const { addresses, addAddress, updateAddress, setDefaultAddress } = useAppContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
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

  const handleSaveAddress = () => {
    if (!form.label.trim() || !form.street.trim() || !form.number.trim() || !form.city.trim()) {
      Alert.alert('Campos obligatorios', 'Completa al menos nombre, calle, número y ciudad.');
      return;
    }

    if (editingAddress) {
      updateAddress(editingAddress.id, form);
      Alert.alert('Dirección actualizada', 'Se actualizará en tu perfil (mock).');
      // BACKEND: PUT /cliente/direcciones/:id
    } else {
      addAddress(form);
      Alert.alert('Dirección agregada', 'Se enviará al backend para guardarla (mock).');
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
        <PrimaryButton title="+ Agregar dirección" onPress={openNewAddress} style={styles.addButton} />

        {addresses.map((address) => (
          <TouchableOpacity
            key={address.id}
            style={styles.addressCard}
            activeOpacity={0.9}
            onPress={() => openEditAddress(address)}
          >
            <View style={styles.addressHeaderRow}>
              <View style={styles.addressTitleRow}>
                <View style={styles.addressIconCircle}>
                  <Ionicons name="home-outline" size={18} color={colors.primary} />
                </View>
                <Text style={styles.addressLabel}>{address.label}</Text>
                {address.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultBadgeText}>Predeterminada</Text>
                  </View>
                )}
              </View>
              <Ionicons name="ellipsis-horizontal" size={18} color={colors.textMuted} />
            </View>
            <Text style={styles.addressLine}>
              {address.street} {address.number}
            </Text>
            <Text style={styles.addressLine}>
              {address.city}, {address.province} · CP {address.zip}
            </Text>
            {address.references ? (
              <Text style={styles.addressRefs} numberOfLines={2}>
                {address.references}
              </Text>
            ) : null}
            {!address.isDefault && (
              <TouchableOpacity
                style={styles.setDefaultButton}
                onPress={() => handleSetDefault(address.id)}
              >
                <Text style={styles.setDefaultText}>Marcar como predeterminada</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        ))}

        {addresses.length === 0 && (
          <Text style={styles.emptyText}>
            Aún no tienes direcciones guardadas. Agrega tu primera dirección para agilizar tus pedidos.
          </Text>
        )}
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingAddress ? 'Editar dirección' : 'Agregar dirección'}
            </Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              <LabeledInput
                label="Nombre de la dirección *"
                value={form.label}
                onChangeText={(t) => handleFormChange('label', t)}
                placeholder="Casa, Oficina, etc."
              />
              <View style={styles.row}>
                <View style={styles.rowItem}>
                  <LabeledInput
                    label="Calle *"
                    value={form.street}
                    onChangeText={(t) => handleFormChange('street', t)}
                    placeholder="Av. Principal"
                  />
                </View>
                <View style={styles.rowItem}>
                  <LabeledInput
                    label="Número *"
                    value={form.number}
                    onChangeText={(t) => handleFormChange('number', t)}
                    placeholder="123"
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.rowItem}>
                  <LabeledInput
                    label="Piso"
                    value={form.floor}
                    onChangeText={(t) => handleFormChange('floor', t)}
                    placeholder="5"
                  />
                </View>
                <View style={styles.rowItem}>
                  <LabeledInput
                    label="Depto/Of"
                    value={form.dept}
                    onChangeText={(t) => handleFormChange('dept', t)}
                    placeholder="B"
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.rowItem}>
                  <LabeledInput
                    label="Ciudad *"
                    value={form.city}
                    onChangeText={(t) => handleFormChange('city', t)}
                    placeholder="Loja"
                  />
                </View>
                <View style={styles.rowItem}>
                  <LabeledInput
                    label="Provincia *"
                    value={form.province}
                    onChangeText={(t) => handleFormChange('province', t)}
                    placeholder="Loja"
                  />
                </View>
              </View>
              <LabeledInput
                label="Código postal *"
                value={form.zip}
                onChangeText={(t) => handleFormChange('zip', t)}
                keyboardType="numeric"
                placeholder="110101"
              />
              <LabeledInput
                label="Referencias (opcional)"
                value={form.references}
                onChangeText={(t) => handleFormChange('references', t)}
                placeholder="Ej: Portón verde, timbre 5B..."
                multiline
              />
              <PrimaryButton
                title={editingAddress ? 'Actualizar' : 'Agregar'}
                onPress={handleSaveAddress}
                style={{ marginTop: 8 }}
              />
              <TouchableOpacity style={styles.modalCancel} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalCancelText}>Cancelar</Text>
              </TouchableOpacity>
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
    paddingBottom: 32,
  },
  addButton: {
    marginBottom: 16,
  },
  addressCard: {
    ...globalStyles.card,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
  },
  addressHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  addressTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFE9E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  addressLabel: {
    fontWeight: '700',
    color: colors.textDark,
  },
  defaultBadge: {
    marginLeft: 6,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: '#E6FFFB',
  },
  defaultBadgeText: {
    fontSize: 11,
    color: '#08979C',
    fontWeight: '600',
  },
  addressLine: {
    color: colors.textMuted,
    fontSize: 13,
  },
  addressRefs: {
    marginTop: 4,
    fontSize: 12,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
  setDefaultButton: {
    marginTop: 8,
  },
  setDefaultText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  emptyText: {
    marginTop: 16,
    textAlign: 'center',
    color: colors.textMuted,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 18,
    maxHeight: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: colors.textDark,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowItem: {
    flex: 1,
    marginRight: 8,
  },
  fieldGroup: {
    marginBottom: 10,
  },
  fieldLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 4,
  },
  input: {
    ...globalStyles.input,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  modalCancel: {
    marginTop: 10,
    alignItems: 'center',
  },
  modalCancelText: {
    color: colors.textMuted,
    fontWeight: '600',
  },
});

export default DireccionesScreen;
