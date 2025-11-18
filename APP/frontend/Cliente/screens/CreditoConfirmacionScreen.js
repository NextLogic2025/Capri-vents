import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import PrimaryButton from '../components/PrimaryButton';
import sharedStyles from '../../theme/styles';

const CreditoConfirmacionScreen = ({ route, navigation }) => {
  const orderCode = route.params?.orderCode;

  const goToCredits = () => {
    const parent = navigation.getParent?.();
    if (parent) {
      parent.navigate('Creditos');
    } else {
      navigation.navigate('Creditos');
    }
  };

  return (
    <View style={sharedStyles.centeredScreen}>
      <View style={styles.card}>
        <Ionicons name="card-outline" size={64} color={colors.primary} style={{ marginBottom: 16 }} />
        <Text style={styles.title}>Tu pedido a credito ha sido creado</Text>
        <Text style={styles.subtitle}>Podras ver tus cuotas en la seccion Credito.</Text>
        {orderCode ? <Text style={styles.code}>Codigo: {orderCode}</Text> : null}
        <PrimaryButton title="Ir a mis creditos" onPress={goToCredits} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '90%',
    backgroundColor: colors.cardBackground,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    ...sharedStyles.shadow,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 12,
  },
  code: {
    fontWeight: '700',
    marginBottom: 20,
    color: colors.primary,
  },
});

export default CreditoConfirmacionScreen;
