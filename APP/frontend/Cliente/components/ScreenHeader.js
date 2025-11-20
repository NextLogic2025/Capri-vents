import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppHeaderContainer from '../../components/AppHeaderContainer';
import colors from '../../theme/colors';

const ScreenHeader = ({
  title,
  subtitle,
  icon,
  onIconPress,
  style,
  greeting,
  sectionLabel,
  notificationsCount = 0,
}) => {
  const { top } = useSafeAreaInsets();
  const infoLabel = sectionLabel || subtitle;
  const badgeCount = Number(notificationsCount);

  return (
    <AppHeaderContainer style={[styles.container, { paddingTop: top + 14 }, style]}>
      <View style={styles.contentRow}>
        <View>
          {greeting ? <Text style={styles.greeting}>{greeting}</Text> : null}
          <Text style={styles.title}>{title}</Text>
          {infoLabel ? (
            <Text style={styles.sectionLabel}>{infoLabel}</Text>
          ) : null}
        </View>
        {icon ? (
          <TouchableOpacity onPress={onIconPress} style={styles.iconButton} activeOpacity={0.8}>
            <Ionicons name={icon} size={22} color={colors.primaryDark} />
            {badgeCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>
                  {badgeCount > 9 ? '9+' : badgeCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ) : null}
      </View>
    </AppHeaderContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 18,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
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
  iconButton: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
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
