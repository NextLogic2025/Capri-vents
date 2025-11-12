import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Platform, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const UiHeroHeader = ({
  gradientColors = ['#F55A3C', '#F9B233'],
  greetingText = 'Hola',
  headline = 'Bienvenido',
  subtitle,
  rightActions = [],
  children,
  style,
  contentStyle,
  fullBleed = false,
  contentPadding = 24,
}) => {
  const topPad = 24 + ((StatusBar.currentHeight || 0) + 8);
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  return (
    <View style={style}>
      <View style={fullBleed ? [styles.heroOuter, { marginLeft: 0, marginRight: 0, width: '100%' }] : null}>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[styles.gradient, { paddingTop: topPad, paddingHorizontal: contentPadding }]}
        >
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.greeting}>{greetingText}</Text>
              <Text style={styles.headline}>{headline}</Text>
              {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
            </View>
            <View style={styles.actionsRow}>
              {rightActions?.map((act, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.actionBtn}
                  onPress={act.onPress}
                  accessibilityRole="button"
                  accessibilityLabel={act.icon}
                  activeOpacity={0.9}
                >
                  <Ionicons name={act.icon} size={22} color="#B45309" />
                  {!!act.badge && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{act.badge}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </LinearGradient>
      </View>
      <View style={[styles.floatingContent, { paddingHorizontal: contentPadding }, contentStyle]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  heroOuter: {
    overflow: 'visible',
  },
  gradient: {
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingBottom: 48,
    height: 180,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: { color: '#FFEFE9', fontSize: 14, fontWeight: '600', letterSpacing: 0.2, marginBottom: 8 },
  headline: { color: '#FFFFFF', fontSize: 36, fontWeight: '800' },
  subtitle: { color: '#FFEFE9', fontSize: 16, fontWeight: '600', marginTop: 6 },
  actionsRow: { flexDirection: 'row', alignItems: 'flex-start' },
  actionBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
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
  floatingContent: {
    marginTop: -36,
    zIndex: 2,
  },
});

export default UiHeroHeader;
