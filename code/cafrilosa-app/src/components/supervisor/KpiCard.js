import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const KpiCard = ({ icon="stats-chart", titleSmall, mainValue, metaText, trendText, trendColor = '#90A4AE' }) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={18} color="#F55A3C" />
      </View>
      <Text style={styles.titleSmall}>{titleSmall}</Text>
      <Text style={styles.mainValue}>{mainValue}</Text>
      {metaText ? <Text style={styles.metaText}>{metaText}</Text> : null}
      {!!trendText && (
        <View style={styles.trendRow}>
          <MaterialCommunityIcons name="trending-up" size={14} color={trendColor} />
          <Text style={[styles.trendText, { color: trendColor }]}>{trendText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  iconWrap: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: '#FFF1F2', alignItems: 'center', justifyContent: 'center', marginBottom: 8,
  },
  titleSmall: { color: '#6B7280', fontSize: 12 },
  mainValue: { color: '#0F172A', fontSize: 18, fontWeight: '800', marginTop: 4 },
  metaText: { color: '#6B7280', fontSize: 12, marginTop: 6 },
  trendRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  trendText: { fontWeight: '700', fontSize: 12 },
});

export default KpiCard;
