import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UiProgressBar = ({
  progress = 0,
  height = 8,
  color = '#F55A3C',
  backgroundColor = '#E5E7EB',
  showPercentage = false,
  style,
}) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.track, { height, backgroundColor }]}>
        <View
          style={[
            styles.bar,
            {
              width: `${clampedProgress}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>
      {showPercentage && (
        <Text style={styles.percentageText}>{`${clampedProgress.toFixed(0)}%`}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  track: {
    flex: 1,
    borderRadius: 999,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 999,
  },
  percentageText: {
    marginLeft: 8,
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
  },
});

export default UiProgressBar;
