import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import sharedStyles from '../../theme/styles';
import SectionCard from '../components/SectionCard';
import PrimaryButton from '../components/PrimaryButton';

const bankAccounts = [
  { label: 'Banco Pichincha', account: '1234567890' },
  { label: 'Banco Guayaquil', account: '9876543210' },
];

const getMessageByMethod = (method) => {
  switch (method) {
    case 'TRANSFERENCIA':
      return 'Recuerda realizar la transferencia y subir el comprobante para validar tu pago.';
    case 'EFECTIVO':
      return 'Podras pagar en efectivo al momento de la entrega.';
    case 'TARJETA':
      return 'Tu pago se ha registrado correctamente.';
    default:
      return 'Revisa el estado de tu pedido en la seccion Pedidos.';
  }
};

const PedidoConfirmacionScreen = ({ route, navigation }) => {
  const { code, method } = route.params || {};
  const message = getMessageByMethod(method);

  const goToPedidos = () => {
    const parentNav = navigation.getParent?.();
    const target = parentNav || navigation;
    target.reset({ index: 0, routes: [{ name: 'ClienteTabs', params: { screen: 'Pedidos' } }] });
  };

  return (
    <View style={sharedStyles.centeredScreen}>
      <View style={[sharedStyles.card, styles.card]}>
        <Ionicons name="checkmark-circle-outline" size={72} color={colors.primary} style={{ marginBottom: 12 }} />
        <Text style={styles.title}>Tu pedido ha sido creado</Text>
        {code ? <Text style={styles.orderCode}>Codigo: {code}</Text> : null}
        <Text style={styles.description}>{message}</Text>
        {method === 'TRANSFERENCIA' && (
          <SectionCard title="Cuentas bancarias" style={{ width: '100%', marginBottom: 16 }}>
            {bankAccounts.map((bank) => (
              <Text key={bank.account} style={styles.bankText}>
                {bank.label}: {bank.account}
              </Text>
            ))}
          </SectionCard>
        )}
        <PrimaryButton title="Ir a mis pedidos" onPress={goToPedidos} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    width: '90%',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  orderCode: {
    fontWeight: '700',
    color: colors.primary,
    marginVertical: 8,
  },
  description: {
    textAlign: 'center',
    color: colors.textLight,
    marginBottom: 12,
  },
  bankText: {
    color: colors.textDark,
    marginBottom: 6,
  },
});

export default PedidoConfirmacionScreen;
