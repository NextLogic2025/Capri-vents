// Simple shared state for cart and in-progress order
// TODO: Replace with backend-powered state (e.g., API + global store)

let cartItems = [];
let inProgressOrder = {
  id: 'PED-EN-CURSO',
  status: 'En preparación',
  items: [],
};

// Payment selection kept simple; real flow lives in checkout endpoints
let selectedPayment = { methodId: 'card', meta: null };

export const CartOrderState = {
  // CART
  getCartItems: () => [...cartItems],
  addToCart: (product, quantity) => {
    if (!quantity) return;
    const idx = cartItems.findIndex((i) => i.productId === product.id);
    if (idx >= 0) {
      cartItems[idx] = { ...cartItems[idx], quantity: cartItems[idx].quantity + quantity };
    } else {
      cartItems.push({
        // Stable, product-based ID prevents duplicate React keys
        id: `c-${product.id}`,
        productId: product.id,
        category: product.category,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
        weight: product.weight || undefined,
      });
    }
  },
  setCartItems: (next) => {
    cartItems = [...next];
  },
  updateCartItemQuantity: (itemId, nextQty) => {
    cartItems = cartItems.map((it) => (it.id === itemId ? { ...it, quantity: Math.max(1, nextQty) } : it));
  },
  removeFromCart: (itemId) => {
    cartItems = cartItems.filter((it) => it.id !== itemId);
  },
  clearCart: () => {
    cartItems = [];
  },

  // IN-PROGRESS ORDER
  getInProgressOrder: () => inProgressOrder,
  addToInProgressOrder: (product, quantity) => {
    if (!quantity) return;
    const idx = inProgressOrder.items.findIndex((i) => i.productId === product.id);
    if (idx >= 0) {
      inProgressOrder.items[idx] = {
        ...inProgressOrder.items[idx],
        quantity: inProgressOrder.items[idx].quantity + quantity,
      };
    } else {
      inProgressOrder.items.push({
        productId: product.id,
        category: product.category,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
        weight: product.weight || undefined,
      });
    }
  },

  // PAYMENT
  setPaymentSelection: (methodId, meta) => {
    selectedPayment = { methodId, meta: meta || null };
  },
  getPaymentSelection: () => selectedPayment,

  // CHECKOUT
  createNewOrderFromCart: () => {
    if (cartItems.length === 0) return null;
    const newOrder = {
      id: `PED-${Date.now()}`,
      status: 'En preparación',
      items: cartItems.map((c) => ({ ...c })),
      payment: { ...selectedPayment },
      createdAt: new Date().toISOString(),
    };
    // TODO: Persist order via backend
    cartItems = [];
    return newOrder;
  },
};
