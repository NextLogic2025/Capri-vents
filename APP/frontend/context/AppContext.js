import React, { createContext, useContext, useMemo, useState } from 'react';
import productsData from '../data/products';
import mockOrders from '../data/mockOrders';
import mockCredits from '../data/mockCredits';

// --- MOCK DATA EXTENDIDA PARA VENDEDOR ---
const today = new Date().toISOString().split('T')[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

const extendedMockOrders = [
  // 1. Pedido de HOY - Pendiente
  {
    id: 'ORD-001',
    code: 'ORD-001',
    clientName: 'Juan Pérez',
    clientPhone: '0991234567',
    clientAddress: 'Av. Amazonas y Naciones Unidas',
    clientAddressDetail: 'Edificio La Previsora, Piso 5, Oficina 502. Referencia: Frente al parque La Carolina.',
    date: today,
    status: 'PENDIENTE',
    paymentStatus: 'PENDIENTE',
    paymentMethod: 'EFECTIVO',
    total: 45.50,
    items: [
      { name: 'Salchicha Viena', presentation: 'Paquete 500g', quantity: 10, price: 2.50 },
      { name: 'Chorizo Parrillero', presentation: 'Paquete 1kg', quantity: 1, price: 20.50 },
    ],
  },
  // 2. Pedido de HOY - En Preparación
  {
    id: 'ORD-002',
    code: 'ORD-002',
    clientName: 'María López',
    clientPhone: '0987654321',
    clientAddress: 'Calle La Ronda 123',
    clientAddressDetail: 'Casa de dos pisos color blanco, puerta de madera. Referencia: Junto a la panadería "El Trigo".',
    date: today,
    status: 'EN_PREPARACION',
    paymentStatus: 'PENDIENTE',
    paymentMethod: 'TRANSFERENCIA',
    total: 120.00,
    items: [
      { name: 'Jamón Espalda', presentation: 'Bloque 2kg', quantity: 5, price: 12.00 },
      { name: 'Mortadela Boloña', presentation: 'Barra 1kg', quantity: 6, price: 10.00 },
    ],
  },
  // 3. Pedido de HOY - En Ruta
  {
    id: 'ORD-003',
    code: 'ORD-003',
    clientName: 'Tienda El Vecino',
    clientPhone: '0998877665',
    clientAddress: 'Sector El Condado, Calle A',
    clientAddressDetail: 'Manzana 4, Villa 12. Referencia: Detrás del colegio Einstein.',
    date: today,
    status: 'EN_RUTA',
    paymentStatus: 'PENDIENTE',
    paymentMethod: 'EFECTIVO',
    total: 15.75,
    items: [
      { name: 'Salchicha Cocktail', presentation: 'Paquete 250g', quantity: 15, price: 1.05 },
    ],
  },
  // 4. Pedido de AYER - Entregado
  {
    id: 'ORD-004',
    code: 'ORD-004',
    clientName: 'Restaurante Sabor Latino',
    clientPhone: '022345678',
    clientAddress: 'Av. 10 de Agosto y Colón',
    clientAddressDetail: 'Local esquinero con letrero rojo. Referencia: Parada del Trolebús Colón.',
    date: yesterday,
    status: 'ENTREGADO',
    paymentStatus: 'PAGADO',
    paymentMethod: 'EFECTIVO',
    total: 250.00,
    items: [
      { name: 'Chuleta Ahumada', presentation: 'Kg', quantity: 20, price: 8.00 },
      { name: 'Tocino Ahumado', presentation: 'Paquete 500g', quantity: 18, price: 5.00 },
    ],
  },
  // 5. Pedido de AYER - Cancelado
  {
    id: 'ORD-005',
    code: 'ORD-005',
    clientName: 'Carlos Ruiz',
    clientPhone: '0991122334',
    clientAddress: 'Carcelén Industrial',
    clientAddressDetail: 'Galpón 3, Bodega 5. Referencia: Entrada principal del parque industrial.',
    date: yesterday,
    status: 'CANCELADO',
    paymentStatus: 'ANULADO',
    paymentMethod: 'CREDITO',
    total: 80.00,
    items: [
      { name: 'Salchichón Cervecero', presentation: 'Barra 500g', quantity: 40, price: 2.00 },
    ],
  },
  // 6. Pedido PENDIENTE (Fecha anterior)
  {
    id: 'ORD-006',
    code: 'ORD-006',
    clientName: 'Panadería La Espiga',
    clientPhone: '0982233445',
    clientAddress: 'Villa Flora, Calle B',
    clientAddressDetail: 'Local comercial #4. Referencia: Frente a la farmacia Fybeca.',
    date: '2023-10-20',
    status: 'PENDIENTE',
    paymentStatus: 'PENDIENTE',
    paymentMethod: 'CREDITO',
    total: 300.50,
    items: [
      { name: 'Jamón de Pollo', presentation: 'Bloque 2kg', quantity: 15, price: 12.00 },
      { name: 'Queso de Chancho', presentation: 'Barra 1kg', quantity: 10, price: 12.05 },
    ],
  },
  // 7. Pedido EN RUTA (Urgente)
  {
    id: 'ORD-007',
    code: 'ORD-007',
    clientName: 'Minimarket Express',
    clientPhone: '0995566778',
    clientAddress: 'Cumbayá, Plaza Central',
    clientAddressDetail: 'Centro Comercial Plaza Cumbayá, Local 12. Referencia: Junto al banco Pichincha.',
    date: today,
    status: 'EN_RUTA',
    paymentStatus: 'PENDIENTE',
    paymentMethod: 'TRANSFERENCIA',
    total: 500.00,
    items: [
      { name: 'Salami Italiano', presentation: 'Barra 2kg', quantity: 10, price: 25.00 },
      { name: 'Pepperoni', presentation: 'Paquete 1kg', quantity: 10, price: 25.00 },
    ],
  },
  // 8. Pedido ENTREGADO (Pago pendiente validación)
  {
    id: 'ORD-008',
    code: 'ORD-008',
    clientName: 'Licorería Don Pepe',
    clientPhone: '0989988776',
    clientAddress: 'La Mariscal, Foch y Reina Victoria',
    clientAddressDetail: 'Edificio Foch, Planta Baja. Referencia: Zona rosa.',
    date: yesterday,
    status: 'ENTREGADO',
    paymentStatus: 'PAGO_PENDIENTE_VALIDACION',
    paymentMethod: 'TRANSFERENCIA',
    total: 150.00,
    items: [
      { name: 'Chorizo Español', presentation: 'Paquete 500g', quantity: 15, price: 10.00 },
    ],
  },
  // 9. Pedido EN PREPARACIÓN (Crédito)
  {
    id: 'ORD-009',
    code: 'ORD-009',
    clientName: 'Comedor Doña Flor',
    clientPhone: '0994433221',
    clientAddress: 'Mercado Central, Puesto 45',
    clientAddressDetail: 'Sección de Comidas, Puesto #45. Referencia: Entrada por la calle Pichincha.',
    date: today,
    status: 'EN_PREPARACION',
    paymentStatus: 'PENDIENTE',
    paymentMethod: 'CREDITO',
    total: 65.25,
    items: [
      { name: 'Longaniza', presentation: 'Paquete 1kg', quantity: 5, price: 8.00 },
      { name: 'Morcilla', presentation: 'Paquete 500g', quantity: 10, price: 2.52 },
    ],
  },
];

const extendedMockCredits = [
  ...mockCredits,
  {
    id: 'cred-vend-001',
    orderId: 'ORD-009',
    orderCode: 'ORD-009',
    clientName: 'Comedor Doña Flor',
    total: 65.25,
    saldoPendiente: 65.25,
    status: 'En curso',
    installments: [
      { id: 'inst-1', number: 1, amount: 32.62, dueDate: '2024-11-30', status: 'PENDIENTE' },
      { id: 'inst-2', number: 2, amount: 32.63, dueDate: '2024-12-15', status: 'PENDIENTE' },
    ],
  },
  {
    id: 'cred-vend-002',
    orderId: 'ORD-006',
    orderCode: 'ORD-006',
    clientName: 'Panadería La Espiga',
    total: 300.50,
    saldoPendiente: 150.25,
    status: 'En curso',
    installments: [
      { id: 'inst-old-1', number: 1, amount: 150.25, dueDate: '2023-11-15', status: 'VENCIDA' },
      { id: 'inst-old-2', number: 2, amount: 150.25, dueDate: '2023-12-15', status: 'PENDIENTE' },
    ],
  },
];

// --- MOCK DATA TICKETS ---
const mockTickets = [
  {
    id: 'TICK-001',
    type: 'CLIENTE',
    user: 'Juan Pérez',
    subject: 'Producto dañado en entrega',
    description: 'El cliente reporta que el paquete de salchichas llegó abierto.',
    orderId: 'ORD-004',
    orderCode: 'ORD-004',
    status: 'ABIERTO',
    date: '2024-11-20',
    evidence: null,
  },
  {
    id: 'TICK-002',
    type: 'CLIENTE',
    user: 'María López',
    subject: 'Solicitud de cambio de fecha',
    description: 'El cliente pide recibir el pedido mañana por la tarde.',
    orderId: 'ORD-007',
    orderCode: 'ORD-007',
    status: 'CERRADO',
    date: '2024-11-18',
    evidence: null,
  },
  {
    id: 'TICK-003',
    type: 'VENDEDOR',
    user: 'Vendedor Demo',
    subject: 'Cliente no estaba en domicilio',
    description: 'Se intentó entregar el pedido #ORD-009 pero no hubo respuesta.',
    orderId: 'ORD-009',
    orderCode: 'ORD-009',
    status: 'EN_PROCESO',
    date: '2024-11-22',
    evidence: null,
  },
  {
    id: 'TICK-004',
    type: 'VENDEDOR',
    user: 'Vendedor Demo',
    subject: 'Error en facturación',
    description: 'La factura salió con el RUC incorrecto, solicito anulación.',
    orderId: 'ORD-012',
    orderCode: 'ORD-012',
    status: 'ABIERTO',
    date: '2024-11-23',
    evidence: null,
  },
];

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
  const [sessionVersion, setSessionVersion] = useState(0); // Fuerza remonte de navegacion en login/logout.
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState(extendedMockOrders);
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

  const [credits, setCredits] = useState(normalizeCredits(extendedMockCredits));
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
  const [notifications, setNotifications] = useState({
    pedidos: true,
    productos: true,
    recordatorios: true,
    creditos: true,
  });

  // Soporte Tickets
  const [tickets, setTickets] = useState(mockTickets);

  const addTicket = (ticketData) => {
    const newTicket = {
      id: `TICK-${Date.now()}`,
      status: 'ABIERTO',
      date: new Date().toISOString().split('T')[0],
      type: currentRole === 'vendedor' ? 'VENDEDOR' : 'CLIENTE', // Auto-detectar tipo
      user: user?.name || 'Usuario',
      ...ticketData,
    };
    setTickets((prev) => [newTicket, ...prev]);
    return newTicket;
  };

  const updateTicketStatus = (ticketId, newStatus, response) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId ? { ...t, status: newStatus, response } : t
      )
    );
  };

  const normalizeKey = (value = '') =>
    value
      .toString()
      .trim()
      .toUpperCase()
      .replace(/\s+/g, '_');
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
        const status = order.status || order.estadoPedido || 'Pendiente entrega';

        return {
          ...order,
          code,
          assignedVendorId: order.assignedVendorId || vendorUser.id,
          assignedVendorName: order.assignedVendorName || vendorUser.name,
          clientName: order.clientName || order.clienteNombre || `Cliente ${index + 1}`,
          clientPhone: order.clientPhone || '+593 98 765 4321',
          clientAddress: order.clientAddress || order.address || 'Av. Principal y 10 de Agosto',
          sector: order.sector || order.zone || 'Zona Norte',
          paymentMethod,
          paymentMethodKey: normalizeKey(paymentMethod),
          paymentStatus,
          paymentStatusKey: normalizeKey(paymentStatus),
          status,
          statusKey: normalizeKey(status),
        };
      });
  }, [orders]);

  const vendorAssignedCredits = useMemo(() => {
    const normalizedCredits = Array.isArray(credits) ? credits : [];
    return normalizedCredits
      .filter(() => {
        // BACKEND: filtrar creditos que correspondan a pedidos del vendorUser
        return true;
      })
      .map((credit, index) => {
        const installments = (credit.installments || credit.cuotas || []).map((installment, position) => {
          const status = installment.status || installment.estado || 'Pendiente';
          return {
            ...installment,
            amount: installment.amount ?? installment.monto ?? 0,
            dueDate: installment.dueDate || installment.fechaVencimiento || installment.due_date,
            status,
            statusKey: normalizeKey(status),
            number: installment.number || installment.numero || position + 1,
          };
        });
        const creditStatus = credit.status || 'En curso';
        return {
          ...credit,
          clientName: credit.clientName || credit.clienteNombre || `Cliente credito ${index + 1}`,
          orderCode: credit.orderCode || credit.code || credit.id,
          statusKey: normalizeKey(creditStatus),
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
      paymentStatus: paymentStatusByMethod[metodoPago] || 'PENDIENTE',
      status: statusByMethod[metodoPago] || 'CREADO',
      total,
      subtotal,
      taxes,
      clientName: payload.clientName || user.name,
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

  const createCreditPlanFromOrder = (order, planConfig = { cuotas: [] }) => {
    // BACKEND: POST /credits para generar el plan de cuotas asociado a un pedido.
    // Recibimos el objeto order completo para evitar problemas de estado asíncrono
    console.log('🔵 [DEBUG] createCreditPlanFromOrder llamado con:', { order, planConfig });

    if (!order || !planConfig?.cuotas?.length) {
      console.log('❌ [DEBUG] createCreditPlanFromOrder retornó null - orden o cuotas inválidas');
      return null;
    }

    const creditId = `CRED-${Date.now()}`;
    const installments = planConfig.cuotas.map((cuota, index) => ({
      id: `${creditId}-${index}`,
      number: cuota.numero || index + 1,
      amount: cuota.monto,
      dueDate: cuota.fecha || cuota.dueDate, // Asegurar que tomamos la fecha correcta
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
      // Campos adicionales para visualización correcta
      fechaInicio: new Date().toISOString(),
      plazo: `${planConfig.cuotas.length} meses`,
      nextPaymentDate: installments[0].dueDate,
    };

    console.log('✅ [DEBUG] Nuevo crédito creado:', newCredit);

    setCredits((prev) => {
      console.log('📝 [DEBUG] Credits ANTES:', prev);
      const updated = [newCredit, ...prev];
      console.log('📝 [DEBUG] Credits DESPUÉS:', updated);
      return updated;
    });

    // Actualizar saldo y deuda del usuario
    setUser((prev) => {
      const currentDebt = prev.deudaActual ?? prev.deudaTotal ?? 0;
      const newDebt = currentDebt + order.total;
      const currentAvailable = prev.saldoCreditoDisponible ?? 0;
      console.log('💰 [DEBUG] User ANTES - Disponible:', currentAvailable, 'Deuda:', currentDebt);
      // El disponible disminuye, la deuda aumenta
      const updatedUser = {
        ...prev,
        saldoCreditoDisponible: Math.max(currentAvailable - order.total, 0),
        deudaActual: newDebt,
        deudaTotal: newDebt,
      };
      console.log('💰 [DEBUG] User DESPUÉS - Disponible:', updatedUser.saldoCreditoDisponible, 'Deuda:', updatedUser.deudaActual);
      return updatedUser;
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
    console.log('[AUTH] login llamado', roleKey);
    if (roleKey === 'vendedor') {
      setUser(vendorUser);
    } else if (roleKey === 'supervisor') {
      setUser(supervisorUser);
    } else {
      setUser(clientUser);
    }
    setSessionVersion(Date.now());
    setCurrentRole(roleKey);
    setIsLoggedIn(true);
  };

  const logout = () => {
    // BACKEND: invalidar el token de sesion.
    console.log('[AUTH] logout ejecutado - limpiando estado');
    setSessionVersion(Date.now());
    setCart([]);
    setOrders(extendedMockOrders);
    setCredits(normalizeCredits(extendedMockCredits));
    setAddresses(initialAddresses);
    setPaymentCards(initialCards);
    setNotifications({
      pedidos: true,
      productos: true,
      recordatorios: true,
      creditos: true,
    });
    setTickets(mockTickets);
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
    sessionVersion,
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
    // Soporte
    tickets,
    addTicket,
    updateTicketStatus,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);

