const mockOrders = [
  {
    id: 'ORD-001',
    code: '#000123',
    date: '2025-01-15',
    total: 85.4,
    status: 'En preparación',
    paymentMethod: 'Transferencia',
    paymentStatus: 'Pendiente de validación',
    items: [
      { productId: 'P-001', name: 'Salchicha Viena Premium', presentation: '500 g', quantity: 10, price: 4.5 },
      { productId: 'P-003', name: 'Chorizo Parrillero', presentation: '700 g', quantity: 5, price: 7.25 },
    ],
    notes: 'Entregar antes de las 9h00',
  },
  {
    id: 'ORD-002',
    code: '#000124',
    date: '2025-02-02',
    total: 132.1,
    status: 'En ruta',
    paymentMethod: 'Efectivo',
    paymentStatus: 'Entrega pendiente',
    items: [
      { productId: 'P-002', name: 'Jamón de Pierna Ahumado', presentation: '1 kg', quantity: 6, price: 11.9 },
      { productId: 'P-005', name: 'Mortadela Artesanal', presentation: '1.2 kg', quantity: 3, price: 8.4 },
    ],
    notes: 'Cliente desea llamada previa',
  },
];

export default mockOrders;
