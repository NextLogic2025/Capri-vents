import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UiClientCard = ({ client, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.clientName}>{client.name}</Text>
        <Ionicons name="chevron-forward" size={24} color="#C1C1C1" />
      </View>
      <View style={styles.detailsRow}>
        <Text style={styles.detailText}>Código: {client.code}</Text>
        <Text style={styles.detailText}>Última compra: {client.lastPurchase}</Text>
      </View>
      <View style={styles.detailsRow}>
        <Text style={styles.detailText}>Deuda: <Text style={styles.debtText}>{client.debt}</Text></Text>
        <Text style={styles.detailText}>Nivel: {client.level}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  debtText: {
    color: '#D9534F',
    fontWeight: 'bold',
  },
});

export default UiClientCard;
