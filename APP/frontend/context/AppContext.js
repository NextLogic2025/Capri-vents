import React, { createContext, useContext, useMemo, useState } from 'react';
import productsData from '../data/products';
import mockOrders from '../data/mockOrders';
import mockCredits from '../data/mockCredits';

const TAX_RATE = 0.12;

const clientUser = {
  id: 'cli-001',
  name: 'Cliente Demo',
  email: 'cliente@demo.com',
  phone: '+593 99 000 0000',
  address: 'Av. La Prensa 123, Quito',
  tieneCredito: true,
  saldoCreditoAprobado: 8000,
  saldoCreditoDisponible: 660,
  deudaActual: 4000,
  deudaTotal: 4000,
  cuotasVencidas: 1,
};

const vendorUser = {
  id: 'vend-001',
  name: 'Vendedor Demo',
  email: 'vendedor@cafrilosa.com',
  phone: '+593 99 999 9999',
  zone: 'Loja Norte',
  address: 'Centro de Distribucion Loja Norte',
};

const supervisorUser = {
  id: 'sup-001',
  name: 'Supervisor Demo',
  email: 'supervisor@cafrilosa.com',
  phone: '+593 98 000 0000',
  role: 'Supervisor de Ventas',
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentRole, setCurrentRole] = useState(null); // BACKEND: este rol vendrá del token del usuario autenticado.
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState(mockOrders);
  const initialAddresses = [
    {
      id: 'dir-1',
      label: 'Casa',
      street: 'Av. Corrientes',
      number: '1234',
      city: 'Loja',
      province: 'Loja',
      zip: '110101',
      references: 'Portón verde, timbre 5B',
      isDefault: true,
    },
    {
      id: 'dir-2',
      label: 'Oficina',
      street: 'Av. Universitaria',
      number: '56',
      city: 'Loja',
      province: 'Loja',
      zip: '110102',
      references: 'Edificio Cafrilosa, piso 3',
      isDefault: false,
    },
  ];
  const initialCards = [
    {
      id: 'card-1',
      type: 'CRÉDITO',
      number: '**** **** **** 4532',
      holder: 'Juan Pérez',
      expiry: '12/25',
      gradient: ['#1C6CFE', '#5C5BFC'],
      defaultCard: true,
    },
    {
      id: 'card-2',
      type: 'DÉBITO',
      number: '**** **** **** 8291',
      holder: 'Juan Pérez',
      expiry: '08/26',
      gradient: ['#E53935', '#FF7043'],
      defaultCard: false,
    },
  ];
  const normalizeCredits = (list) =>
    list.map((credit) => ({
      ...credit,
      saldoPendiente: credit.saldoPendiente ?? credit.balance ?? credit.total,
      installments: credit.installments || credit.cuotas || [],
    }));

  const [credits, setCredits] = useState(normalizeCredits(mockCredits));
  const [products] = useState(productsData);
  const [addresses, setAddresses] = useState(initialAddresses);
  const defaultAddress = useMemo(
    () => addresses.find((addr) => addr.isDefault) ?? addresses[0] ?? null,
    [addresses]
  );
  const [paymentCards, setPaymentCards] = useState(initialCards);
  const defaultCard = useMemo(
    () => paymentCards.find((card) => card.defaultCard) ?? paymentCards[0] ?? null,
    [paymentCards]
  );
  const [notifications, setNotifications] = useState({ pedidos: true, creditos: true });
  const matchProduct = (item, productId) => item.id === productId || item.productId === productId;
  const addAddress = (address) => {
    setAddresses((prev) => [
      ...(prev || []),
      {
        id: `dir-${Date.now()}`,
        ...address,
        isDefault: prev.length === 0,
      },
    ]);
  };

  const updateAddress = (addressId, updates) => {
    setAddresses((prev) =>
      prev.map((addr) => (addr.id === addressId ? { ...addr, ...updates } : addr))
    );
  };

  const setDefaultAddress = (addressId) => {
    setAddresses((prev) =>
      prev.map((addr) => ({ ...addr, isDefault: addr.id === addressId }))
    );
  };

  const addPaymentCard = (card) => {
    setPaymentCards((prev) => [
      ...(prev || []).map((existing) => ({ ...existing, defaultCard: false })),
      {
        id: card.id || `card-${Date.now()}`,
        ...card,
        defaultCard: true,
      },
    ]);
  };

  const updatePaymentCard = (cardId, updates) => {
    setPaymentCards((prev) =>
      prev.map((card) => (card.id === cardId ? { ...card, ...updates } : card))
    );
  };

  const removePaymentCard = (cardId) => {
    setPaymentCards((prev) => prev.filter((card) => card.id !== cardId));
  };

  const setDefaultPaymentCard = (cardId) => {
    setPaymentCards((prev) =>
      prev.map((card) => ({ ...card, defaultCard: card.id === cardId }))
    );
  };
  const vendorAssignedOrders = useMemo(() => {
    const normalizedOrders = Array.isArray(orders) ? orders : [];
    return normalizedOrders
      .filter(() => {
        // BACKEND: filtrar pedidos asignados por assignedVendorId === vendorUser.id
        return true;
      })
      .map((order, index) => {
        const code = order.code || order.id || `PED-${index + 1}`;
        const paymentMethod = order.paymentMethod || order.metodoPago || 'Transferencia';
        const paymentStatus = order.paymentStatus || order.estadoPago || 'Pendiente';
        const status = order.status || order.estadoPedido || 'PENDIENTE_ENTREGA';
        return {
          ...order,
          code,
          assignedVendorId: order.assignedVendorId || vendorUser.id,
          clientName: order.clientName || order.clienteNombre || `Cliente ${index + 1}`,
          clientPhone: order.clientPhone || '+593 98 765 4321',
          clientAddress: order.clientAddress || order.address || 'Av. Principal y 10 de Agosto',
          paymentMethod,
          paymentStatus,
          status,
        };
      });
  }, [orders]);

  const vendorAssignedCredits = useMemo(() => {
    const normalizedCredits = Array.isArray(credits) ? credits : [];
    return normalizedCredits
      .filter(() => {
        // BACKEND: filtrar créditos que correspondan a pedidos del vendorUser
        return true;
      })
      .map((credit, index) => {
        const installments = (credit.installments || credit.cuotas || []).map((installment, position) => ({
          ...installment,
          amount: installment.amount ?? installment.monto ?? 0,
          dueDate: installment.dueDate || installment.fechaVencimiento || installment.due_date,
          status: installment.status || installment.estado || 'Pendiente',
          number: installment.number || installment.numero || position + 1,
        }));
        return {
          ...credit,
          clientName: credit.clientName || `Cliente crédito ${index + 1}`,
          orderCode: credit.orderCode || credit.code || credit.id,
          installments,
        };
      });
  }, [credits]);

  const allOrders = useMemo(() => {
    return Array.isArray(orders) ? orders : [];
  }, [orders]);

  const unassignedOrders = useMemo(() => {
    return allOrders.filter((order) => !order.assignedVendorId && !order.assignedVendorName);
  }, [allOrders]);

  const paymentsToValidate = useMemo(() => {
    // BACKEND: estos pagos se recogerán de los estados pendientes del sistema financiero.
    const orderPayments = allOrders.slice(0, 3).map((order, index) => ({
      id: order.id || `payment-order-${index}`,
      tipo: (order.paymentMethod || order.metodoPago || 'TRANSFERENCIA').toUpperCase(),
      clienteNombre: order.clientName || order.clienteNombre || `Cliente ${index + 1}`,
      pedidoId: order.code || order.id || `PED-2024-000${index + 1}`,
      monto: order.total ?? order.amount ?? order.monto ?? 0,
      fechaRegistro: order.createdAt || order.fechaCreacion || new Date().toISOString(),
      vendedorNombre: order.assignedVendorName || order.assignedVendor || 'Sin asignar',
      estado: order.paymentStatus || order.estadoPago || 'Pendiente',
      comprobante: order.paymentReceipt || `Comprobante ${index + 1}`,
    }));

    const creditPayments = credits
      .flatMap((credit) => (credit.installments || credit.cuotas || []).slice(0, 1))
      .map((installment, index) => ({
        id: installment.id || `payment-credit-${index}`,
        tipo: (installment.paymentMethod || 'TRANSFERENCIA').toUpperCase(),
        clienteNombre: installment.clientName || installment.clienteNombre || 'Cliente crédito',
        pedidoId: installment.orderCode || installment.code || `PED-2024-0${index + 4}`,
        monto: installment.amount || installment.monto || 0,
        fechaRegistro: installment.dueDate || installment.fechaVencimiento || new Date().toISOString(),
        vendedorNombre: installment.vendorName || 'Vendedor asignado',
        estado: installment.status || 'Pendiente',
        comprobante: installment.comprobante || 'Comprobante adjunto',
      }));

    return [...orderPayments, ...creditPayments];
  }, [allOrders, credits]);

  const supervisorCredits = useMemo(() => {
    // BACKEND: aquí vendrían los resúmenes de créditos de la cartera real.
    return credits.map((credit, index) => {
      const clienteNombre = credit.clientName || credit.clienteNombre || `Cliente crédito ${index + 1}`;
      const cupoAprobado = credit.creditLimit ?? credit.cupo ?? 6000;
      const deudaTotal = credit.balance ?? credit.total ?? credit.saldoPendiente ?? 0;
      const saldoDisponible = Math.max(cupoAprobado - deudaTotal, 0);
      const enMora =
        (credit.status || '')
          .toString()
          .toLowerCase()
          .includes('mora') ||
        (credit.installments || [])
          .map((installment) => (installment.status || '').toLowerCase())
          .some((status) => status.includes('vencida'));
      return {
        clienteNombre,
        cupoAprobado,
        saldoDisponible,
        deudaTotal,
        enMora,
        creditId: credit.id,
      };
    });
  }, [credits]);

  const stockAlerts = useMemo(() => {
    // BACKEND: basado en inventario y lotes con fechas de vencimiento.
    const expirationMocks = {
      'P-003': true,
      'P-005': true,
      'P-006': true,
    };
    const lowStock = products.filter((product) => {
      const threshold = (product.stockMax ?? 0) * 0.2;
      return product.stockMax && product.stockActual <= threshold;
    });
    const nearExpiration = products.filter((product) => expirationMocks[product.id]);
    return { lowStock, nearExpiration };
  }, [products]);

  const claims = useMemo(() => {
    // BACKEND: reclamos se obtendrían del sistema de tickets.
    const sampleOrders = allOrders.slice(0, 2);
    return [
      {
        id: 'claim-001',
        clienteNombre: sampleOrders[0]?.clientName || 'Cliente Alfa',
        pedidoId: sampleOrders[0]?.code || 'PED-2024-005',
        tipo: 'Producto dañado',
        estado: 'Abierto',
        fecha: '2024-11-02',
      },
      {
        id: 'claim-002',
        clienteNombre: sampleOrders[1]?.clientName || 'Cliente Beta',
        pedidoId: sampleOrders[1]?.code || 'PED-2024-008',
        tipo: 'Demora en entrega',
        estado: 'Seguimiento',
        fecha: '2024-10-30',
      },
    ];
  }, [allOrders]);

  const cartTotals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const taxes = subtotal * TAX_RATE;
    return {
      subtotal,
      taxes,
      total: subtotal + taxes,
    };
  }, [cart]);

  const addToCart = (product) => {
    // BACKEND: agregar producto al carrito del usuario autenticado en la API.
    if (!product) return;
    setCart((prev) => {
      const existing = prev.find((item) => matchProduct(item, product.id));
      const maxQty = product.stockActual ?? existing?.stockActual ?? 1;
      if (existing) {
        return prev.map((item) =>
          matchProduct(item, product.id)
            ? { ...item, quantity: Math.min(item.quantity + 1, maxQty) }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          productId: product.id,
          name: product.name,
          presentation: product.presentation,
          price: product.price,
          quantity: 1,
          stockActual: product.stockActual ?? 0,
          stockMax: product.stockMax ?? 0,
          image: product.image,
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    // BACKEND: eliminar un item del carrito en el backend.
    setCart((prev) => prev.filter((item) => !matchProduct(item, productId)));
  };

  const updateCartQuantity = (productId, newQty) => {
    // BACKEND: actualizar la cantidad de un item del carrito en la API.
    setCart((prev) =>
      prev
        .map((item) => {
          if (!matchProduct(item, productId)) return item;
          if (newQty <= 0) return null;
          const limit = item.stockActual ?? newQty;
          return { ...item, quantity: Math.min(newQty, limit) };
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    // BACKEND: limpiar carrito del usuario.
    setCart([]);
  };

  const createOrderFromCart = (metodoPago, payload = {}) => {
    // BACKEND: aqui se llamaria a POST /orders con los productos seleccionados.
    if (!cart.length) return null;
    const orderId = `ORD-${Date.now()}`;
    const code = `PED-${new Date().getFullYear()}-${String(orders.length + 1).padStart(3, '0')}`;
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const taxes = subtotal * TAX_RATE;
    const total = subtotal + taxes;

    const statusByMethod = {
      TARJETA: 'PAGADO',
      TRANSFERENCIA: 'EN_REVISION_PAGO',
      EFECTIVO: 'PENDIENTE_PREPARACION',
      CREDITO: 'PENDIENTE_PREPARACION',
    };

    const paymentStatusByMethod = {
      TARJETA: 'PAGADO',
      TRANSFERENCIA: 'TRANSFERENCIA_PENDIENTE',
      EFECTIVO: 'EFECTIVO_ENTREGA_PENDIENTE',
      CREDITO: 'CREDITO_ACTIVO',
    };

    const newOrder = {
      id: orderId,
      code,
      date: new Date().toISOString().split('T')[0],
      method: metodoPago,
      paymentMethod: metodoPago,
      paymentStatus: paymentStatusByMethod[metodoPago] || 'PENDIENTE',
      status: statusByMethod[metodoPago] || 'CREADO',
      total,
      subtotal,
      taxes,
      deliveryInfo: {
        address: payload.address || user.address,
        phone: payload.phone || user.phone,
        notes: payload.notes || '',
      },
      items: cart.map((item) => ({
        productId: item.productId || item.id,
        name: item.name,
        presentation: item.presentation,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const createCreditPlanFromOrder = (orderId, planConfig = { cuotas: [] }) => {
    // BACKEND: POST /credits para generar el plan de cuotas asociado a un pedido.
    const order = orders.find((item) => item.id === orderId);
    if (!order || !planConfig?.cuotas?.length) return null;
    const creditId = `CRED-${Date.now()}`;
    const installments = planConfig.cuotas.map((cuota, index) => ({
      id: `${creditId}-${index}`,
      number: cuota.numero || index + 1,
      amount: cuota.monto,
      dueDate: cuota.fecha,
      status: 'Pendiente',
      paymentMethod: null,
    }));

    const newCredit = {
      id: creditId,
      orderId: order.id,
      orderCode: order.code,
      total: order.total,
      saldoPendiente: order.total,
      status: 'En curso',
      installments,
    };

    setCredits((prev) => [newCredit, ...prev]);
    setUser((prev) => {
      const newDebt = (prev.deudaActual ?? prev.deudaTotal ?? 0) + order.total;
      return {
        ...prev,
        saldoCreditoDisponible: Math.max(prev.saldoCreditoDisponible - order.total, 0),
        deudaActual: newDebt,
        deudaTotal: newDebt,
      };
    });

    return newCredit;
  };

  const registerInstallmentPayment = (creditId, installmentId, metodoPago, info = {}) => {
    // BACKEND: registrar pago de cuota y adjuntar comprobante para validacion del supervisor.
    let paidAmount = 0;
    setCredits((prev) =>
      prev.map((credit) => {
        if (credit.id !== creditId) return credit;
        const installments = (credit.installments || []).map((installment) => {
          if (installment.id !== installmentId) return installment;
          let status = 'PAGO_PENDIENTE_VALIDACION';
          if (metodoPago === 'EFECTIVO') status = 'PENDIENTE_COBRO_EFECTIVO';
          if (metodoPago === 'TARJETA') {
            status = 'Pagada';
            paidAmount = installment.amount;
          }
          return {
            ...installment,
            status,
            paymentMethod: metodoPago,
            paymentInfo: info,
          };
        });
        const saldoPendiente = installments
          .filter((installment) => installment.status !== 'Pagada')
          .reduce((sum, installment) => sum + installment.amount, 0);
        return {
          ...credit,
          installments,
          saldoPendiente,
          status: saldoPendiente === 0 ? 'Cancelado' : 'En curso',
        };
      })
    );

    if (paidAmount) {
      setUser((prev) => {
        const newDebt = Math.max((prev.deudaActual ?? prev.deudaTotal ?? 0) - paidAmount, 0);
        return { ...prev, deudaActual: newDebt, deudaTotal: newDebt };
      });
    }
  };

  const updateUserProfile = (payload) => {
    // BACKEND: actualizar datos del usuario en /profile.
    setUser((prev) => ({ ...prev, ...payload }));
  };

  const login = (roleKey = 'cliente') => {
    // BACKEND: POST /auth/login para obtener tokens e informacion del usuario.
    if (roleKey === 'vendedor') {
      setUser(vendorUser);
    } else if (roleKey === 'supervisor') {
      setUser(supervisorUser);
    } else {
      setUser(clientUser);
    }
    setCurrentRole(roleKey);
    setIsLoggedIn(true);
  };

  const logout = () => {
    // BACKEND: invalidar el token de sesion.
    setIsLoggedIn(false);
    setCurrentRole(null);
    setUser(null);
    clearCart();
  };

  const payCreditInstallment = (creditId, installmentId, metodoPago) => {
    // BACKEND: compatibilidad - registrar pago de cuota.
    registerInstallmentPayment(creditId, installmentId, metodoPago);
  };

  const markInstallmentPaid = (creditId, installmentId) => {
    // BACKEND: compatibilidad - el supervisor marcaria la cuota como pagada.
    registerInstallmentPayment(creditId, installmentId, 'TARJETA');
  };

  const value = {
    products,
    user,
    setUser,
    cart,
    cartTotals,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    orders,
    allOrders,
    unassignedOrders,
    paymentsToValidate,
    setOrders,
    credits,
    supervisorCredits,
    setCredits,
    createOrderFromCart,
    createCreditPlanFromOrder,
    registerInstallmentPayment,
    payCreditInstallment,
    markInstallmentPaid,
    notifications,
    setNotifications,
    updateUserProfile,
    currentRole,
    setCurrentRole,
    vendorUser,
    vendorAssignedOrders,
    vendorAssignedCredits,
    stockAlerts,
    claims,
    supervisorUser,
    isLoggedIn,
    login,
    logout,
    addresses,
    defaultAddress,
    addAddress,
    updateAddress,
    setDefaultAddress,
    paymentCards,
    defaultCard,
    addPaymentCard,
    updatePaymentCard,
    removePaymentCard,
    setDefaultPaymentCard,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
