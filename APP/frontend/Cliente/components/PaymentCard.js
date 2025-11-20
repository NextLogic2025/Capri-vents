import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import globalStyles from '../../theme/styles';
import colors from '../../theme/colors';

const PaymentCard = ({
  type,
  number,
  holder,
  expiry,
  gradientColors = [colors.primaryDark, colors.primary],
  defaultCard,
  style,
  onEdit,
  onDelete,
}) => {
  return (
    <LinearGradient colors={gradientColors} style={[styles.card, globalStyles.shadow, style]}>
      <View style={styles.header}>
        <Text style={styles.type}>{type}</Text>
        <Ionicons name="card-outline" size={24} color="rgba(255,255,255,0.9)" />
      </View>
      {defaultCard && (
        <View style={styles.defaultBadge}>
          <Text style={styles.defaultBadgeText}>Predeterminada</Text>
        </View>
      )}
      <Text style={styles.number}>{number}</Text>
      <View style={styles.footerRow}>
        <View>
          <Text style={styles.label}>Titular</Text>
          <Text style={styles.value}>{holder}</Text>
        </View>
        <View>
          <Text style={styles.label}>Válido hasta</Text>
          <Text style={styles.value}>{expiry}</Text>
        </View>
      </View>
      {onEdit || onDelete ? (
        <View style={styles.actionsRow}>
          {onEdit && (
            <TouchableOpacity
              style={[styles.actionButton, styles.firstActionButton]}
              onPress={onEdit}
              activeOpacity={0.7}
            >
              <Ionicons name="create-outline" size={16} color={colors.white} />
              <Text style={styles.actionLabel}>Editar</Text>
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity style={styles.actionButton} onPress={onDelete} activeOpacity={0.7}>
              <Ionicons name="trash-outline" size={16} color={colors.white} />
              <Text style={styles.actionLabel}>Eliminar</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : null}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    minHeight: 160,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  type: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.95)',
    letterSpacing: 1,
  },
  defaultBadge: {
    marginTop: 8,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  defaultBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  number: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 2,
    marginTop: 16,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  label: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  actionsRow: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginLeft: 12,
  },
  firstActionButton: {
    marginLeft: 0,
  },
  actionLabel: {
    marginLeft: 6,
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
});

export default PaymentCard;
