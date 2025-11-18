const products = [
  {
    id: 'P-001',
    name: 'Salchicha Viena Premium',
    description: 'Salchicha tipo viena ideal para desayunos.',
    category: 'Salchichas',
    presentation: '500 g',
    price: 4.5,
    // Foto de salchichas a la plancha (queda perfecta para este producto)
    image: {
      uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    },
    stockActual: 55,
    stockMax: 80,
  },
  {
    id: 'P-002',
    name: 'Jamon de Pierna Ahumado',
    description: 'Jamon jugoso con notas ahumadas.',
    category: 'Jamones',
    presentation: '1 kg',
    price: 11.9,
    // Foto de jamón / carne curada
    image: {
      uri: 'https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&w=600&q=60',
    },
    stockActual: 30,
    stockMax: 60,
  },
  {
    id: 'P-003',
    name: 'Chorizo Parrillero',
    description: 'Chorizos especiados para parrilla.',
    category: 'Chorizos',
    presentation: '700 g',
    price: 7.25,
    // Foto de chorizos/parrilla (queda full para el parrillero)
    image: {
      uri: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=800&q=80',
    },
    stockActual: 0,
    stockMax: 50,
  },
  {
    id: 'P-004',
    name: 'Jamon de Pavo Light',
    description: 'Bajo en sodio, ideal para sandwiches.',
    category: 'Jamones',
    presentation: '400 g',
    price: 5.75,
    // Foto de lonjas de jamón / sandwich
    image: {
      uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&w=600&q=60',
    },
    stockActual: 25,
    stockMax: 50,
  },
  {
    id: 'P-005',
    name: 'Mortadela Artesanal',
    description: 'Receta tradicional con especias.',
    category: 'Embutidos',
    presentation: '1.2 kg',
    price: 8.4,
    // Tabla de charcutería / embutidos variados
    image: {
      uri: 'https://images.unsplash.com/photo-1447078806655-40579c2520d6?auto=format&w=600&q=60',
    },
    stockActual: 62,
    stockMax: 90,
  },
  {
    id: 'P-006',
    name: 'Tocino Ahumado',
    description: 'Cortes gruesos con sabor intenso.',
    category: 'Cortes',
    presentation: '500 g',
    price: 6.8,
    // Foto de tocino / carne ahumada
    image: {
      uri: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&w=600&q=60',
    },
    stockActual: 12,
    stockMax: 40,
  },
];

export default products;
