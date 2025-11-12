import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UiListItem = ({
  title,
  subtitle,
  leftIcon,
  leftAvatar,
  rightIcon,
  onPress,
  style,
  titleStyle,
  subtitleStyle,
  leftElement,
  rightElement,
}) => {
  const LeftComponent = () => {
    if (leftElement) return leftElement;
    if (leftAvatar) return <Image source={leftAvatar} style={styles.avatar} />;
    if (leftIcon) return <Ionicons name={leftIcon} size={24} color="#6B7280" style={styles.icon} />;
    return null;
  };

  const RightComponent = () => {
    if (rightElement) return rightElement;
    if (rightIcon) return <Ionicons name={rightIcon} size={22} color="#9CA3AF" />;
    if (onPress) return <Ionicons name="chevron-forward" size={22} color="#9CA3AF" />;
    return null;
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}
    >
      <LeftComponent />
      <View style={styles.content}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        {subtitle && <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>}
      </View>
      <RightComponent />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  content: {
    flex: 1,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  icon: {
    width: 24,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default UiListItem;
