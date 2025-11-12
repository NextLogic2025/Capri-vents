import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import UiButton from './UiButton';
import UiBadge from './UiBadge';

const UiRouteStopCard = ({
  index,
  status,
  statusVariant,
  clientName,
  address,
  eta,
  distance,
  onView,
  onGo,
}) => {
  const isCompleted = status === 'Completado';

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.indexCircle, isCompleted && styles.indexCircleCompleted]}>
            <Text style={[styles.indexText, isCompleted && styles.indexTextCompleted]}>{index}</Text>
          </View>
          <Text style={styles.clientName}>{clientName}</Text>
        </View>
        <UiBadge label={status} variant={statusVariant} />
      </View>

      <View style={styles.body}>
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={16} color="#6B7280" style={styles.icon} />
          <Text style={styles.address} numberOfLines={2}>{address}</Text>
        </View>
        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={16} color="#6B7280" style={styles.icon} />
            <Text style={styles.detailText}>{eta}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="map-outline" size={16} color="#6B7280" style={styles.icon} />
            <Text style={styles.detailText}>{distance}</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <UiButton
          title="Ver Pedido"
          onPress={onView}
          variant="secondary"
          style={styles.button}
        />
        <UiButton
          title="Ir ahora"
          onPress={onGo}
          style={styles.button}
          disabled={isCompleted}
          leftIcon="navigate-circle-outline"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9FAFB',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indexCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  indexCircleCompleted: {
    backgroundColor: '#D1FAE5',
  },
  indexText: {
    fontWeight: '700',
    color: '#4B5563',
  },
  indexTextCompleted: {
    color: '#065F46',
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  body: {
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  icon: {
    marginRight: 8,
    marginTop: 2,
  },
  address: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 13,
    color: '#6B7280',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default UiRouteStopCard;
