import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AddressCard from "../../components/ui/AddressCard";
import AddressFormModal from "../../components/ui/AddressFormModal";

const initialAddresses = [
  {
    id: "addr1",
    type: "Casa",
    isDefault: true,
    name: "Casa",
    street: "Av. Corrientes",
    number: "1234",
    floor: "5",
    apartment: "B",
    city: "Buenos Aires",
    province: "CABA",
    postalCode: "1043",
    reference: "Porton verde, timbre 5B",
  },
  {
    id: "addr2",
    type: "Trabajo",
    isDefault: false,
    name: "Oficina",
    street: "Av. Santa Fe 3050",
    number: "Piso 10 Depto 1005",
    floor: "",
    apartment: "",
    city: "Buenos Aires",
    province: "CABA",
    postalCode: "1425",
    reference: "",
  },
];

const ClienteDireccionesScreen = ({ navigation }) => {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [formVisible, setFormVisible] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [menuAddress, setMenuAddress] = useState(null);

  // TODO: conectar con backend aqui para gestionar direcciones (crear, editar, eliminar, marcar predeterminada)

  const openAdd = () => {
    setFormMode("add");
    setSelectedAddress(null);
    setFormVisible(true);
  };

  const openEdit = (address) => {
    setFormMode("edit");
    setSelectedAddress(address);
    setFormVisible(true);
    setMenuAddress(null);
  };

  const handleSaveAddress = (data) => {
    if (formMode === "add") {
      setAddresses((prev) => [...prev, { ...data, id: `addr-${Date.now()}`, isDefault: prev.length === 0 }]);
    } else if (selectedAddress) {
      setAddresses((prev) => prev.map((item) => (item.id === selectedAddress.id ? { ...item, ...data } : item)));
    }
    setFormVisible(false);
  };

  const handleDeleteAddress = () => {
    if (!menuAddress) return;
    Alert.alert("Eliminar dirección", "Esta accion no se puede deshacer", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => {
          setAddresses((prev) => prev.filter((item) => item.id !== menuAddress.id));
          setMenuAddress(null);
        },
      },
    ]);
  };

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 12 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.title}>Mis direcciones</Text>
          <View style={styles.placeholder} />
        </View>

        <TouchableOpacity style={styles.addButton} onPress={openAdd}>
          <Text style={styles.addButtonText}>+ Agregar direccion</Text>
        </TouchableOpacity>

        {addresses.map((address) => (
          <AddressCard key={address.id} address={address} onPressMenu={() => setMenuAddress(address)} />
        ))}
      </ScrollView>

      <AddressFormModal
        visible={formVisible}
        mode={formMode}
        initialAddress={selectedAddress}
        onCancel={() => setFormVisible(false)}
        onSave={handleSaveAddress}
      />

      <Modal visible={!!menuAddress} transparent animationType="fade" statusBarTranslucent>
        <View style={styles.menuOverlay}>
          <View style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem} onPress={() => openEdit(menuAddress)}>
              <Text style={styles.menuText}>Editar direccion</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleDeleteAddress}>
              <Text style={[styles.menuText, styles.menuDelete]}>Eliminar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuCancel} onPress={() => setMenuAddress(null)}>
              <Text style={styles.menuCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginBottom: 20,
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
  addButton: {
    backgroundColor: "#F97316",
    borderRadius: 22,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#F97316",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  menuCard: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
  },
  menuItem: {
    paddingVertical: 14,
  },
  menuText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  menuDelete: {
    color: "#DC2626",
  },
  menuCancel: {
    marginTop: 8,
    paddingVertical: 12,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  menuCancelText: {
    color: "#6B7280",
    fontWeight: "600",
  },
});

export default ClienteDireccionesScreen;
