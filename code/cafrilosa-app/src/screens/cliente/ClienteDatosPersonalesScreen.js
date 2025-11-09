import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import EditTextFieldModal from "../../components/ui/EditTextFieldModal";
import ChangeEmailModal from "../../components/ui/ChangeEmailModal";
import ChangePasswordModal from "../../components/ui/ChangePasswordModal";

const ClienteDatosPersonalesScreen = ({ navigation }) => {
  const [personalData, setPersonalData] = useState({
    fullName: "Juan Perez",
    email: "juan.perez@ejemplo.com",
    phone: "+593 99 999 9999",
    password: "********",
  });
  // TODO: conectar con backend aqui para obtener y actualizar datos personales reales

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editFieldKey, setEditFieldKey] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editLabel, setEditLabel] = useState("");

  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);

  const openEditField = (fieldKey, label) => {
    setEditFieldKey(fieldKey);
    setEditLabel(label);
    setEditValue(personalData[fieldKey]);
    setEditModalVisible(true);
  };

  const handleSaveField = () => {
    if (!editFieldKey) return;
    setPersonalData((prev) => ({ ...prev, [editFieldKey]: editValue }));
    setEditModalVisible(false);
    // TODO: conectar con backend aqui para actualizar datos personales
  };

  const handleEmailUpdated = (newEmail) => {
    setPersonalData((prev) => ({ ...prev, email: newEmail }));
  };

  const renderRow = (label, value, onEdit, iconName = "account-outline") => (
    <View style={styles.dataCard} key={label}>
      <View style={styles.dataInfo}>
        <Text style={styles.dataLabel}>{label}</Text>
        <Text style={styles.dataValue}>{value}</Text>
      </View>
      <TouchableOpacity style={styles.editButton} onPress={onEdit}>
        <MaterialCommunityIcons name={iconName} size={18} color="#E64A19" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.title}>Datos personales</Text>
          <View style={styles.placeholder} />
        </View>

        {renderRow("Nombre completo", personalData.fullName, () => openEditField("fullName", "nombre completo"), "account-edit")}
        {renderRow("Correo electronico", personalData.email, () => setEmailModalVisible(true), "email-edit-outline")}
        {renderRow("Telefono", personalData.phone, () => openEditField("phone", "telefono"), "phone")}
        {renderRow("Contrasena", personalData.password, () => setPasswordModalVisible(true), "lock")}
      </ScrollView>

      <EditTextFieldModal
        visible={editModalVisible}
        title={`Editar ${editLabel}`}
        label={`Nuevo ${editLabel}`}
        value={editValue}
        onChangeText={setEditValue}
        onCancel={() => setEditModalVisible(false)}
        onSave={handleSaveField}
      />

      <ChangeEmailModal
        visible={emailModalVisible}
        currentEmail={personalData.email}
        onClose={() => setEmailModalVisible(false)}
        onEmailUpdated={(newEmail) => {
          handleEmailUpdated(newEmail);
          setEmailModalVisible(false);
        }}
      />

      <ChangePasswordModal
        visible={passwordModalVisible}
        onClose={() => setPasswordModalVisible(false)}
        onPasswordChanged={() => console.log("Contrasena cambiada")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  placeholder: {
    width: 44,
    height: 44,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  dataCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  dataInfo: {
    flex: 1,
  },
  dataLabel: {
    fontSize: 13,
    color: "#9CA3AF",
    textTransform: "uppercase",
  },
  dataValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginTop: 4,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FEF2F2",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ClienteDatosPersonalesScreen;
