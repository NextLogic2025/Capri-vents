const mockCredits = [
  {
    id: 'CRED-001',
    orderCode: '#000120',
    total: 210,
    status: 'En curso',
    paidInstallments: 1,
    totalInstallments: 3,
    balance: 140,
    installments: [
      { id: 'CRED-001-1', number: 1, amount: 70, dueDate: '2024-12-30', status: 'Pagada', paymentMethod: 'Transferencia' },
      { id: 'CRED-001-2', number: 2, amount: 70, dueDate: '2025-01-30', status: 'Pendiente', paymentMethod: null },
      { id: 'CRED-001-3', number: 3, amount: 70, dueDate: '2025-02-28', status: 'Pendiente', paymentMethod: null },
    ],
  },
];

export default mockCredits;
