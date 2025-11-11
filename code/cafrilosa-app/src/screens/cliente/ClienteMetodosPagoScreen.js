import React, { useMemo, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert, Modal } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import CardFormModal from "../../components/ui/CardFormModal";
import TransferHistoryItem from "../../components/ui/TransferHistoryItem";
import TransferDetailModal from "../../components/ui/TransferDetailModal";
import PrimaryButton from "../../components/ui/PrimaryButton";

const initialCards = [
  {
    id: "card1",
    type: "Credito",
    brand: "VISA",
    number: "4532453245324532",
    holder: "JUAN PEREZ",
    expiry: "12/25",
    isDefault: true,
  },
  {
    id: "card2",
    type: "Debito",
    brand: "MASTERCARD",
    number: "8291829182918291",
    holder: "JUAN PEREZ",
    expiry: "08/26",
    isDefault: false,
  },
];

const transferHistory = [
  {
    id: "tr1",
    orderId: "3860",
    date: "02 feb 2025",
    amount: 152.4,
    status: "Pendiente",
    bankName: "Banco Pichincha",
    productsCount: 3,
    operationNumber: "OP-99811",
    time: "15:32",
    destinationBank: "Banco Nacion - Cafrilosa Carnes",
    destinationCbu: "0110599540000012345678",
    destinationAlias: "CAFRILOSA.CARNES",
  },
  {
    id: "tr2",
    orderId: "3701",
    date: "25 ene 2025",
    amount: 96.5,
    status: "Validada",
    bankName: "Banco Guayaquil",
    productsCount: 2,
    operationNumber: "OP-99740",
    time: "11:05",
    destinationBank: "Banco Nacion - Cafrilosa Carnes",
    destinationCbu: "0110599540000012345678",
    destinationAlias: "CAFRILOSA.CARNES",
  },
];

const cafrilosaAccounts = [
  {
    id: "acc1",
    bank: "Banco de Loja",
    accountNumber: "01504001588012345678",
    alias: "CAFRILOSA.LOJA",
    type: "Cuenta corriente empresarial",
    holder: "Inversiones Cafrilosa Cia. Ltda.",
    swift: "BJLOECEQXXX",
  },
  {
    id: "acc2",
    bank: "Banco Pichincha",
    accountNumber: "22001000654321098765",
    alias: "CAFRILOSA.PICH",
    type: "Cuenta de ahorros empresarial",
    holder: "Inversiones Cafrilosa Cia. Ltda.",
    swift: "PICHECEQ",
  },
];

const ClienteMetodosPagoScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("tarjetas");
  const [cards, setCards] = useState(initialCards);
  const [cardFormVisible, setCardFormVisible] = useState(false);
  const [cardFormMode, setCardFormMode] = useState("add");
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardMenu, setCardMenu] = useState(null);

  const [transferModalVisible, setTransferModalVisible] = useState(false);
  const [selectedTransfer, setSelectedTransfer] = useState(null);
  const insets = useSafeAreaInsets();

  // TODO: conectar con backend aqui para gestionar metodos de pago (tarjetas, transferencias, cuentas bancarias)

  const defaultCardId = useMemo(() => cards.find((card) => card.isDefault)?.id, [cards]);

  const maskNumber = (number) => `**** **** **** ${number.slice(-4)}`;

  const openAddCard = () => {
    setCardFormMode("add");
    setSelectedCard(null);
    setCardFormVisible(true);
  };

  const openEditCard = (card) => {
    setCardFormMode("edit");
    setSelectedCard(card);
    setCardFormVisible(true);
    setCardMenu(null);
  };

  const handleSaveCard = (cardData) => {
    if (cardFormMode === "add") {
      setCards((prev) => [
        ...prev,
        {
          ...cardData,
          id: `card-${Date.now()}`,
          isDefault: prev.length === 0,
        },
      ]);
    } else if (selectedCard) {
      setCards((prev) => prev.map((card) => (card.id === selectedCard.id ? { ...card, ...cardData } : card)));
    }
    setCardFormVisible(false);
  };

  const setDefaultCard = (card) => {
    setCards((prev) => prev.map((item) => ({ ...item, isDefault: item.id === card.id })));
    setCardMenu(null);
  };

  const deleteCard = (card) => {
    Alert.alert("Eliminar tarjeta", "Esta accion no se puede deshacer", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => {
          setCards((prev) => prev.filter((item) => item.id !== card.id));
          setCardMenu(null);
        },
      },
    ]);
  };

  const renderTabButton = (key, label) => {
    const active = activeTab === key;
    return (
      <TouchableOpacity key={key} style={[styles.tabButton, active && styles.tabButtonActive]} onPress={() => setActiveTab(key)}>
        <Text style={[styles.tabButtonText, active && styles.tabButtonTextActive]}>{label}</Text>
      </TouchableOpacity>
    );
  };

  const renderCard = (card) => (
    <View key={card.id} style={[styles.paymentCard, card.isDefault && styles.paymentCardDefault]}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardType}>{card.type.toUpperCase()}</Text>
        {card.isDefault ? (
          <View style={styles.cardBadge}>
            <Ionicons name="checkmark-circle" size={16} color="#16A34A" />
            <Text style={styles.cardBadgeText}>Predeterminada</Text>
          </View>
        ) : (
          <TouchableOpacity onPress={() => setCardMenu(card)}>
            <MaterialCommunityIcons name="dots-vertical" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.cardNumberRow}>
        <MaterialCommunityIcons name="credit-card-chip-outline" size={32} color="#FFFFFF" />
        <Text style={styles.cardNumber}>{maskNumber(card.number)}</Text>
      </View>
      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.cardLabel}>Titular</Text>
          <Text style={styles.cardValue}>{card.holder}</Text>
        </View>
        <View>
          <Text style={styles.cardLabel}>Vencimiento</Text>
          <Text style={styles.cardValue}>{card.expiry}</Text>
        </View>
      </View>
    </View>
  );

  const renderTransfersTab = () => (
    <View>
      <Text style={styles.sectionTitle}>Mis transferencias</Text>
      {transferHistory.map((transfer) => (
        <TransferHistoryItem
          key={transfer.id}
          transfer={transfer}
          onPress={() => {
            setSelectedTransfer(transfer);
            setTransferModalVisible(true);
          }}
        />
      ))}
    </View>
  );

  const renderAccountsTab = () => (
    <View>
      <View style={styles.accountsHero}>
        <Text style={styles.accountsHeroTitle}>Cuentas bancarias de Cafrilosa</Text>
        <Text style={styles.accountsHeroSubtitle}>Transfiere a cualquiera de estas cuentas</Text>
      </View>
      {cafrilosaAccounts.map((account) => (
        <View key={account.id} style={styles.accountCard}>
          <Text style={styles.accountBank}>{account.bank}</Text>
          <View style={styles.accountRow}>
            <Text style={styles.accountLabel}>Cuenta / CCI</Text>
            <View style={styles.copyRow}>
              <Text style={styles.accountValue}>{account.accountNumber}</Text>
              <Ionicons name="copy-outline" size={16} color="#E64A19" />
            </View>
          </View>
          <View style={styles.accountRow}>
            <Text style={styles.accountLabel}>Alias</Text>
            <Text style={styles.accountValue}>{account.alias}</Text>
          </View>
          <View style={styles.accountRow}>
            <Text style={styles.accountLabel}>Tipo</Text>
            <Text style={styles.accountValue}>{account.type}</Text>
          </View>
          <View style={styles.accountRow}>
            <Text style={styles.accountLabel}>Titular</Text>
            <Text style={styles.accountValue}>{account.holder}</Text>
          </View>
          {account.swift ? (
            <View style={styles.accountRow}>
              <Text style={styles.accountLabel}>Swift / BIC</Text>
              <Text style={styles.accountValue}>{account.swift}</Text>
            </View>
          ) : null}
        </View>
      ))}
      <View style={styles.infoBox}>
        <Ionicons name="information-circle-outline" size={18} color="#1D4ED8" />
        <Text style={styles.infoText}>Envianos tu comprobante y referencia del pedido para acelerar la validacion.</Text>
      </View>
    </View>
  );

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
          <Text style={styles.title}>Métodos de pago</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.tabs}>
          {renderTabButton("tarjetas", "Tarjetas")}
          {renderTabButton("transferencias", "Transferencias")}
          {renderTabButton("cuentas", "Cuentas Cafrilosa")}
        </View>

        {activeTab === "tarjetas" && (
          <View>
            <PrimaryButton title="+ Agregar tarjeta" onPress={openAddCard} />
            {cards.map(renderCard)}
          </View>
        )}

        {activeTab === "transferencias" && renderTransfersTab()}
        {activeTab === "cuentas" && renderAccountsTab()}
      </ScrollView>

      <CardFormModal
        visible={cardFormVisible}
        mode={cardFormMode}
        initialCard={selectedCard}
        onCancel={() => setCardFormVisible(false)}
        onSave={handleSaveCard}
      />

      <TransferDetailModal visible={transferModalVisible} transfer={selectedTransfer} onClose={() => setTransferModalVisible(false)} />

      <Modal visible={!!cardMenu} transparent animationType="fade" statusBarTranslucent>
        <View style={styles.menuOverlay}>
          <View style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem} onPress={() => setDefaultCard(cardMenu)}>
              <Text style={styles.menuText}>Establecer como predeterminada</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => openEditCard(cardMenu)}>
              <Text style={styles.menuText}>Editar tarjeta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => deleteCard(cardMenu)}>
              <Text style={[styles.menuText, styles.menuDelete]}>Eliminar tarjeta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuCancel} onPress={() => setCardMenu(null)}>
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
    paddingBottom: 60,
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
  tabs: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 6,
    marginBottom: 24,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  tabButton: {
    flex: 1,
    borderRadius: 22,
    paddingVertical: 10,
    alignItems: "center",
  },
  tabButtonActive: {
    backgroundColor: "#FFE4E6",
  },
  tabButtonText: {
    fontWeight: "600",
    color: "#6B7280",
    fontSize: 12,
  },
  tabButtonTextActive: {
    color: "#B91C1C",
  },
  paymentCard: {
    borderRadius: 28,
    padding: 20,
    marginBottom: 16,
    backgroundColor: "#4C1D95",
    shadowColor: "#4C1D95",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 4,
  },
  paymentCardDefault: {
    backgroundColor: "#DC2626",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  cardType: {
    color: "#FFFFFF",
    fontSize: 13,
    letterSpacing: 1.2,
  },
  cardBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    gap: 6,
  },
  cardBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  cardNumberRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 20,
  },
  cardNumber: {
    color: "#FFFFFF",
    fontSize: 20,
    letterSpacing: 4,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
  },
  cardValue: {
    color: "#FFFFFF",
    fontWeight: "700",
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },
  accountsHero: {
    backgroundColor: "#F97316",
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
  },
  accountsHeroTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  accountsHeroSubtitle: {
    color: "#FFE4E6",
  },
  accountCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    marginBottom: 14,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  accountBank: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },
  accountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  accountLabel: {
    color: "#6B7280",
  },
  accountValue: {
    fontWeight: "600",
    color: "#111827",
  },
  copyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoBox: {
    backgroundColor: "#DBEAFE",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoText: {
    color: "#1D4ED8",
    fontSize: 13,
    flex: 1,
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

export default ClienteMetodosPagoScreen;

