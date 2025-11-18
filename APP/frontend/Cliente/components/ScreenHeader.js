import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../../theme/colors';

const ScreenHeader = ({
  title,
  subtitle,
  icon,
  onIconPress,
  rounded = true,
  style,
  greeting,
  sectionLabel,
  notificationsCount = 0,
}) => {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        rounded ? styles.rounded : styles.flat,
        { paddingTop: top + 14 },
        style,
      ]}
    >
      <View>
        {greeting ? <Text style={styles.greeting}>{greeting}</Text> : null}
        <Text style={styles.title}>{title}</Text>
        {sectionLabel ? (
          <Text style={styles.sectionLabel}>{sectionLabel}</Text>
        ) : subtitle ? (
          <Text style={styles.subtitle}>{subtitle}</Text>
        ) : null}
      </View>
      {icon ? (
        <TouchableOpacity onPress={onIconPress} style={styles.iconButton} activeOpacity={0.8}>
          <Ionicons name={icon} size={22} color={colors.primaryDark} />
          {notificationsCount > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>
                {notificationsCount > 9 ? '9+' : notificationsCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    borderRadius: 28,
    paddingVertical: 18,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  rounded: {
    borderRadius: 28,
  },
  flat: {
    borderRadius: 0,
  },
  greeting: {
    color: colors.white,
    fontSize: 14,
    marginBottom: 2,
  },
  title: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '800',
  },
  sectionLabel: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
  subtitle: {
    color: colors.white,
    opacity: 0.9,
    marginTop: 4,
  },
  iconButton: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  notificationBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
});

export default ScreenHeader;
