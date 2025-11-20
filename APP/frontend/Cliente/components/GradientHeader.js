import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppHeaderContainer from '../../components/AppHeaderContainer';
import colors from '../../theme/colors';

const GradientHeader = ({
  name = 'Cliente',
  storeName = 'Supermercado El Ahorro',
  notificationsCount = 0,
  onNotificationsPress = () => {},
  style,
}) => {
  const { top } = useSafeAreaInsets();
  const hasNotifications = Number(notificationsCount) > 0;

  return (
    <AppHeaderContainer style={[styles.container, { paddingTop: top + 6 }, style]}>
      <View style={styles.contentRow}>
        <View>
          <Text style={styles.greeting}>Hola, {name}</Text>
          <Text style={styles.title}>Bienvenido</Text>
          <Text style={styles.store}>{storeName}</Text>
        </View>
        <TouchableOpacity style={styles.bellButton} onPress={onNotificationsPress} activeOpacity={0.8}>
          <Ionicons name="notifications-outline" size={22} color={colors.primary} />
          {hasNotifications && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{notificationsCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </AppHeaderContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 8,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greeting: {
    color: colors.white,
    fontSize: 16,
    opacity: 0.85,
  },
  title: {
    color: colors.white,
    fontSize: 26,
    fontWeight: '800',
    marginTop: 4,
  },
  store: {
    color: colors.white,
    marginTop: 6,
    fontSize: 15,
  },
  bellButton: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: '#FFECDD',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
});

export default GradientHeader;
