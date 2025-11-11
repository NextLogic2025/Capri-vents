import React, { useMemo, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Modal } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import CartItemRow from "../../components/ui/CartItemRow";

const initialCartItems = [
  {
    id: "c1",
    productId: "p-chorizo-premium",
    category: "Embutidos",
    name: "Chorizo Parrillero Premium",
    weight: "500g",
    price: 12.99,
    quantity: 2,
    image: require("../../assets/images/cart-chorizo-premium.png"),
  },
  {
    id: "c2",
    productId: "p-salame-tandilero",
    category: "Fiambres",
    name: "Salame Tandilero",
    weight: "400g",
    price: 15.5,
    quantity: 1,
    image: require("../../assets/images/cart-salame.png"),
  },
  {
    id: "c3",
    productId: "p-jamón-cocido-premium",
    category: "Fiambres",
    name: "Jamón Cocido Premium",
    weight: "300g",
    price: 18.75,
    quantity: 1,
    image: require("../../assets/images/cart-jamon-cocido.png"),
  },
];

const paymentMethods = [
  { id: "card", label: "Tarjeta Credito/Debito", description: "Visa, Mastercard, Discover" },
  { id: "bank", label: "Transferencia Bancaria", description: "Procesamos en 24h" },
  { id: "cash", label: "Efectivo contra entrega", description: "Paga cuando recibas" },
];

const savedCards = [
  { id: "card1", type: "Credito", brand: "VISA", holder: "JUAN PEREZ", last4: "4532", expiry: "12/25" },
  { id: "card2", type: "Debito", brand: "MASTERCARD", holder: "JUAN PEREZ", last4: "8291", expiry: "08/26" },
];

const transferAccounts = [
  { id: "loja", bank: "Banco de Loja", account: "01504001588012345678", alias: "CAFRILOSA.LOJA" },
  { id: "pichincha", bank: "Banco Pichincha", account: "22001000654321098765", alias: "CAFRILOSA.PICH" },
];

const ClienteCarritoScreen = ({ navigation }) => {
  // TODO: conectar con backend aqui para sincronizar el carrito del usuario
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [couponCode, setCouponCode] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const [selectedCardId, setSelectedCardId] = useState(savedCards[0]?.id || null);
  const [cardPickerVisible, setCardPickerVisible] = useState(false);
  const [transferModalVisible, setTransferModalVisible] = useState(false);
  const [selectedTransferAccount, setSelectedTransferAccount] = useState(transferAccounts[0]?.id || null);
  const [transferReceiptName, setTransferReceiptName] = useState("");
  const selectedCard = savedCards.find((card) => card.id === selectedCardId);
  const selectedTransferInfo = transferAccounts.find((account) => account.id === selectedTransferAccount);
  const insets = useSafeAreaInsets();

  const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0), [cartItems]);
  const totalItems = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);

  const handleIncreaseQuantity = (itemId) => {
    setCartItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item)));
  };

  const handleDecreaseQuantity = (itemId) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const nextQty = Math.max(1, item.quantity - 1);
          return { ...item, quantity: nextQty };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleApplyCoupon = () => {
    Alert.alert("Cupón aplicado", "Validación simulada del cupón.");
    // TODO: conectar con backend aqui para aplicar cupones reales
  };

  const handleCheckout = () => {
    Alert.alert("Compra finalizada", "Compra finalizada (simulado)");
    // TODO: conectar con backend aqui para procesar el pago y crear la orden
  };

  const handleSelectPaymentMethod = (methodId) => {
    setSelectedPaymentMethod(methodId);
    if (methodId === "card") {
      setCardPickerVisible(true);
    } else if (methodId === "bank") {
      setTransferModalVisible(true);
    }
  };

  const handleCardConfirm = () => {
    if (!selectedCardId) {
      Alert.alert("Selecciona una tarjeta", "Elige una tarjeta para continuar.");
      return;
    }
    setCardPickerVisible(false);
  };

  const handleAddCardFromModal = () => {
    setCardPickerVisible(false);
    navigation.navigate("ClientePerfilStack", { screen: "ClienteMetodosPago" });
  };

  const handleSelectTransferAccount = (accountId) => {
    setSelectedTransferAccount(accountId);
  };

  const handleUploadProof = () => {
    const simulatedName = `comprobante-${Date.now()}.pdf`;
    setTransferReceiptName(simulatedName);
    Alert.alert("Comprobante cargado", "Carga simulada del comprobante. Adjunta el archivo real al confirmar tu pedido.");
  };

  const handleConfirmTransfer = () => {
    if (!transferReceiptName) {
      Alert.alert("Falta comprobante", "Sube el comprobante de tu transferencia para continuar.");
      return;
    }
    setTransferModalVisible(false);
  };

  const navigateToProductDetail = (item) => {
    navigation.navigate("ClienteProductoDetalle", {
      product: {
        id: item.productId,
        name: item.name,
        category: item.category,
        price: item.price,
        weight: item.weight,
        image: item.image,
        rating: 4.6,
        reviewsCount: 82,
        description: "Detalle del producto seleccionado desde el carrito.",
        characteristics: ["Producto artesanal", "Control de calidad garantizado"],
        stock: 25,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 12 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Carrito</Text>
        </View>

        <View>
          {cartItems.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              onIncrease={() => handleIncreaseQuantity(item.id)}
              onDecrease={() => handleDecreaseQuantity(item.id)}
              onRemove={() => handleRemoveItem(item.id)}
              onPress={() => navigateToProductDetail(item)}
            />
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>¿Tienes un cupón?</Text>
          <View style={styles.couponRow}>
            <TextInput
              style={styles.couponInput}
              placeholder="Código de cupón"
              placeholderTextColor="#9CA3AF"
              value={couponCode}
              onChangeText={setCouponCode}
            />
            <TouchableOpacity style={styles.couponButton} onPress={handleApplyCoupon}>
              <Text style={styles.couponButtonText}>Aplicar</Text>
            </TouchableOpacity>
          </View>
          {/* TODO: conectar con backend aqui para aplicar cupones reales */}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Metodo de Pago</Text>
          {paymentMethods.map((method) => {
            const selected = selectedPaymentMethod === method.id;
            let helperText = method.description;
            if (method.id === "card" && selectedCard) {
              helperText = `${selectedCard.brand} **** ${selectedCard.last4} · ${selectedCard.holder}`;
            } else if (method.id === "bank") {
              helperText = transferReceiptName
                ? `Comprobante: ${transferReceiptName}`
                : `Cuenta seleccionada: ${selectedTransferInfo?.bank || "Seleccion pendiente"}`;
            }
            return (
              <TouchableOpacity
                key={method.id}
                style={[styles.paymentOption, selected && styles.paymentOptionSelected]}
                onPress={() => handleSelectPaymentMethod(method.id)}
              >
                <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
                  {selected ? <View style={styles.radioInner} /> : null}
                </View>
                <View>
                  <Text style={[styles.paymentLabel, selected && styles.paymentLabelSelected]}>{method.label}</Text>
                  <Text style={styles.paymentDescription}>{helperText}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#9CA3AF" style={{ marginLeft: "auto" }} />
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal ({totalItems} items)</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Envio</Text>
            <Text style={styles.shippingValue}>GRATIS</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryTotalLabel}>Total</Text>
            <Text style={styles.summaryTotalValue}>${subtotal.toFixed(2)}</Text>
          </View>
          {/* TODO: conectar con backend aqui para sincronizar el carrito del usuario */}
        </View>
      </ScrollView>

      <Modal visible={cardPickerVisible} transparent animationType="fade" statusBarTranslucent>
        <View style={styles.paymentModalOverlay}>
          <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setCardPickerVisible(false)} />
          <View style={styles.paymentModalCard}>
            <View style={styles.sheetHandle} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Selecciona tu tarjeta</Text>
              <TouchableOpacity onPress={() => setCardPickerVisible(false)}>
                <Ionicons name="close" size={22} color="#111827" />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 280 }}>
              {savedCards.map((card) => {
                const active = selectedCardId === card.id;
                return (
                  <TouchableOpacity
                    key={card.id}
                    style={[styles.cardOption, active && styles.cardOptionSelected]}
                    onPress={() => setSelectedCardId(card.id)}
                  >
                    <View style={styles.cardOptionRow}>
                      <Text style={styles.cardOptionBrand}>{card.brand}</Text>
                      {active ? <Ionicons name="checkmark-circle" size={18} color="#16A34A" /> : null}
                    </View>
                    <Text style={styles.cardOptionNumber}>**** {card.last4}</Text>
                    <Text style={styles.cardOptionMeta}>
                      {card.type} · {card.holder} · vence {card.expiry}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <TouchableOpacity style={styles.addCardButton} onPress={handleAddCardFromModal}>
              <Ionicons name="add-circle-outline" size={20} color="#B45309" />
              <Text style={styles.addCardText}>Agregar nueva tarjeta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalPrimaryButton} onPress={handleCardConfirm}>
              <Text style={styles.modalPrimaryText}>Usar tarjeta seleccionada</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={transferModalVisible} transparent animationType="fade" statusBarTranslucent>
        <View style={styles.paymentModalOverlay}>
          <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setTransferModalVisible(false)} />
          <View style={styles.paymentModalCard}>
            <View style={styles.sheetHandle} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Transferencia bancaria</Text>
              <TouchableOpacity onPress={() => setTransferModalVisible(false)}>
                <Ionicons name="close" size={22} color="#111827" />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalSubtitle}>Elige la cuenta destino y sube el comprobante de tu transferencia.</Text>
            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 220 }}>
              {transferAccounts.map((account) => {
                const active = selectedTransferAccount === account.id;
                return (
                  <TouchableOpacity
                    key={account.id}
                    style={[styles.transferOption, active && styles.transferOptionSelected]}
                    onPress={() => handleSelectTransferAccount(account.id)}
                  >
                    <Text style={styles.transferBank}>{account.bank}</Text>
                    <Text style={styles.transferAccount}>{account.account}</Text>
                    <Text style={styles.transferAlias}>{account.alias}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <TouchableOpacity style={styles.uploadButton} onPress={handleUploadProof}>
              <Ionicons name="cloud-upload-outline" size={18} color="#B45309" />
              <Text style={styles.uploadButtonText}>{transferReceiptName ? "Actualizar comprobante" : "Subir comprobante"}</Text>
            </TouchableOpacity>
            {transferReceiptName ? <Text style={styles.uploadHint}>{transferReceiptName}</Text> : null}
            <TouchableOpacity style={styles.modalPrimaryButton} onPress={handleConfirmTransfer}>
              <Text style={styles.modalPrimaryText}>Guardar transferencia</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
    paddingTop: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },
  couponRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  couponInput: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginRight: 12,
    fontSize: 14,
    color: "#111827",
  },
  couponButton: {
    backgroundColor: "#D9A441",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  couponButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 12,
  },
  paymentOptionSelected: {
    borderColor: "#FB923C",
    backgroundColor: "#FFF7ED",
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  radioOuterSelected: {
    borderColor: "#EA580C",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#EA580C",
  },
  paymentLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  paymentLabelSelected: {
    color: "#EA580C",
  },
  paymentDescription: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  shippingValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#16A34A",
  },
  summaryTotalLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  summaryTotalValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#DC2626",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  checkoutButton: {
    backgroundColor: "#DC2626",
    borderRadius: 26,
    paddingVertical: 16,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  paymentModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },
  modalBackdrop: {
    flex: 1,
  },
  paymentModalCard: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
  },
  sheetHandle: {
    width: 60,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#E5E7EB",
    alignSelf: "center",
    marginBottom: 12,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  modalSubtitle: {
    color: "#6B7280",
    fontSize: 13,
    marginBottom: 12,
  },
  cardOption: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
  },
  cardOptionSelected: {
    borderColor: "#FB923C",
    backgroundColor: "#FFF7ED",
  },
  cardOptionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  cardOptionBrand: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  cardOptionNumber: {
    fontSize: 16,
    fontWeight: "700",
    color: "#DC2626",
  },
  cardOptionMeta: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  addCardButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#FBBF24",
    borderRadius: 20,
    marginTop: 8,
    gap: 6,
  },
  addCardText: {
    color: "#B45309",
    fontWeight: "600",
  },
  modalPrimaryButton: {
    backgroundColor: "#DC2626",
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 14,
  },
  modalPrimaryText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  transferOption: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
  },
  transferOptionSelected: {
    borderColor: "#2563EB",
    backgroundColor: "#EFF6FF",
  },
  transferBank: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  transferAccount: {
    fontSize: 13,
    color: "#4B5563",
  },
  transferAlias: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FBBF24",
    borderRadius: 18,
    paddingVertical: 10,
    marginTop: 8,
    gap: 8,
  },
  uploadButtonText: {
    color: "#B45309",
    fontWeight: "600",
  },
  uploadHint: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 6,
  },
});

export default ClienteCarritoScreen;
