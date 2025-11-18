import React from 'react';
import { View, Text } from 'react-native';
import globalStyles from '../../theme/styles';

const SectionCard = ({ title, children, style }) => {
  return (
    <View style={[globalStyles.sectionCard, style]}>
      {title ? <Text style={globalStyles.sectionTitle}>{title}</Text> : null}
      {children}
    </View>
  );
};

export default SectionCard;
