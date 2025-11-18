import React from 'react';
import { Modal, View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import PrimaryButton from './PrimaryButton';

const NotificationItem = ({ item }) => {
  const isOrder = item.type === 'PEDIDO';
  const iconName = isOrder ? 'cube-outline' : 'card-outline';
  const iconColor = isOrder ? colors.primary : colors.secondaryGold;

  return (
    <View style={styles.notificationItem}>
      <View style={[styles.iconWrapper, { backgroundColor: `${iconColor}22` }]}>
        <Ionicons name={iconName} size={20} color={iconColor} />
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        {!!item.date && <Text style={styles.notificationDate}>{item.date}</Text>}
      </View>
    </View>
  );
};

const NotificationsModal = ({ visible, onClose, notifications = [] }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Notificaciones</Text>
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name="close-circle" size={24} color={colors.muted} />
            </TouchableOpacity>
          </View>

          {notifications.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="notifications-off-outline" size={36} color={colors.muted} />
              <Text style={styles.emptyText}>No tienes notificaciones por ahora.</Text>
            </View>
          ) : (
            <FlatList
              data={notifications}
              keyExtractor={(item, index) => item.id?.toString?.() || `notification-${index}`}
              renderItem={({ item }) => <NotificationItem item={item} />}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            />
          )}

          <PrimaryButton title="Cerrar" onPress={onClose} style={styles.closeButton} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    padding: 16,
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 20,
    maxHeight: '85%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.darkText,
  },
  listContent: {
    paddingBottom: 8,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontWeight: '700',
    color: colors.darkText,
    marginBottom: 2,
  },
  notificationMessage: {
    color: colors.bodyText,
    fontSize: 14,
  },
  notificationDate: {
    marginTop: 4,
    fontSize: 12,
    color: colors.textMuted,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    marginTop: 12,
    color: colors.textMuted,
  },
  closeButton: {
    marginTop: 16,
  },
});

export default NotificationsModal;
