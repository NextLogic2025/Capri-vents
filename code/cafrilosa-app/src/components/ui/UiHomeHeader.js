import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const UiHomeHeader = ({
  topPadding = 28,
  gradientColors = ['#F65A3B', '#F6C453'],
  greeting = 'Hola',
  name,
  title = 'Bienvenido',
  subtitle,
  rightIcon = 'notifications-outline',
  rightIconColor = '#B45309',
  badgeCount = 0,
  onPressRight,
}) => {
  return (
    <LinearGradient colors={gradientColors} style={[styles.headerGradient, { paddingTop: topPadding }]}>
      <View style={styles.headerRow}>
        <View style={styles.greetingBlock}>
          <Text style={styles.greetingText}>{greeting}{name ? `, ${name} 👋` : ' 👋'}</Text>
          <Text style={styles.welcomeText}>{title}</Text>
          {subtitle ? <Text style={styles.storeText}>{subtitle}</Text> : null}
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.roundIcon} onPress={onPressRight} activeOpacity={0.9}>
            <Ionicons name={rightIcon} size={20} color={rightIconColor} />
            {badgeCount > 0 && (
              <View style={[styles.badge]}> 
                <Text style={styles.badgeText}>{badgeCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  headerGradient: {
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingHorizontal: 24,
    paddingBottom: 90,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greetingBlock: { flex: 1 },
  greetingText: { color: '#FFEFE9', fontSize: 14, marginBottom: 8 },
  welcomeText: { color: '#FFFFFF', fontSize: 28, fontWeight: '700' },
  storeText: { color: '#FFEFE9', fontSize: 15, marginTop: 6 },
  headerActions: { flexDirection: 'row', alignItems: 'flex-start' },
  roundIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 6,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
});

export default UiHomeHeader;
