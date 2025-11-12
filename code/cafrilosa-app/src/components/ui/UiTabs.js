import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const UiTabs = ({
  tabs,
  initialTab,
  activeKey,
  onTabChange,
  style,
}) => {
  const [activeIndex, setActiveIndex] = useState(initialTab ? tabs.findIndex(t => t.key === initialTab) : 0);

  useEffect(() => {
    if (activeKey) {
      const idx = tabs.findIndex(t => t.key === activeKey);
      if (idx >= 0 && idx !== activeIndex) {
        setActiveIndex(idx);
      }
    }
  }, [activeKey, tabs]);

  const handlePress = (index) => {
    setActiveIndex(index);
    if (onTabChange) {
      onTabChange(tabs[index].key, index);
    }
  };

  const renderItem = ({ item, index }) => {
    const isActive = index === activeIndex;
    return (
      <TouchableOpacity
        onPress={() => handlePress(index)}
        style={[styles.tabItem, isActive && styles.tabItemActive]}
        activeOpacity={0.9}
      >
        <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const smallTabs = tabs.length <= 3;

  return (
    <View style={[styles.container, style]}>
      {smallTabs ? (
        <View style={[styles.inlineRow]}>
          {tabs.map((t, idx) => {
            const isActive = idx === activeIndex;
            return (
              <TouchableOpacity
                key={t.key}
                onPress={() => handlePress(idx)}
                style={[styles.tabItem, isActive && styles.tabItemActive, { flex: 1 }]}
                activeOpacity={0.9}
              >
                <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{t.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : (
        <FlatList
          data={tabs}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          horizontal
          scrollEnabled={tabs.length > 3}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    padding: 4,
    height: 48,
  },
  inlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  listContent: {
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 16,
    height: '100%',
    marginHorizontal: 4,
  },
  tabItemActive: {
    backgroundColor: '#E64A2E',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
});

export default UiTabs;
