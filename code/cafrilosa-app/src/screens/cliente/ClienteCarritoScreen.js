import React, { useMemo, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native";
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
    productId: "p-jamon-cocido-premium",
    category: "Fiambres",
    name: "Jamon Cocido Premium",
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

const ClienteCarritoScreen = ({ navigation }) => {
  // TODO: conectar con backend aqui para sincronizar el carrito del usuario
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [couponCode, setCouponCode] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");

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
    Alert.alert("Cupon aplicado", "Validacion simulada del cupon.");
    // TODO: conectar con backend aqui para aplicar cupones reales
  };

  const handleCheckout = () => {
    Alert.alert("Compra finalizada", "Compra finalizada (simulado)");
    // TODO: conectar con backend aqui para procesar el pago y crear la orden
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
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Carrito</Text>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={20} color="#111827" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
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
          <Text style={styles.cardTitle}>?Tienes un cupon?</Text>
          <View style={styles.couponRow}>
            <TextInput
              style={styles.couponInput}
              placeholder="Codigo de cupon"
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
            return (
              <TouchableOpacity
                key={method.id}
                style={[styles.paymentOption, selected && styles.paymentOptionSelected]}
                onPress={() => setSelectedPaymentMethod(method.id)}
              >
                <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
                  {selected ? <View style={styles.radioInner} /> : null}
                </View>
                <View>
                  <Text style={[styles.paymentLabel, selected && styles.paymentLabelSelected]}>{method.label}</Text>
                  <Text style={styles.paymentDescription}>{method.description}</Text>
                </View>
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
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  notificationDot: {
    position: "absolute",
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#DC2626",
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
});

export default ClienteCarritoScreen;
