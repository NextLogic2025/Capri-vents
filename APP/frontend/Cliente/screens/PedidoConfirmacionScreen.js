// frontend/Cliente/screens/PedidoConfirmacionScreen.js
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
      return 'Podrás pagar en efectivo al momento de la entrega.';
    case 'TARJETA':
      return 'Tu pago se ha registrado correctamente.';
    default:
      return 'Revisa el estado de tu pedido en la sección Pedidos.';
  }
};

const PedidoConfirmacionScreen = ({ route, navigation }) => {
  const { code, method } = route.params || {};
  const message = getMessageByMethod(method);

  const goToPedidos = () => {
    const parentNav = navigation.getParent?.();
    const target = parentNav || navigation;
    target.reset({
      index: 0,
      routes: [{ name: 'ClienteTabs', params: { screen: 'Pedidos' } }],
    });
  };

  return (
    <View style={styles.screen}>
      <View style={[sharedStyles.card, styles.card]}>
        <View style={styles.iconWrapper}>
          <Ionicons
            name="checkmark"
            size={40}
            color={colors.white}
          />
        </View>

        <Text style={styles.title}>¡Tu pedido ha sido creado!</Text>

        {code ? <Text style={styles.orderCode}>Código de pedido: {code}</Text> : null}

        <Text style={styles.description}>{message}</Text>

        {method === 'TRANSFERENCIA' && (
          <SectionCard
            title="Cuentas bancarias"
            style={styles.bankSection}
          >
            {bankAccounts.map((bank) => (
              <Text key={bank.account} style={styles.bankText}>
                {bank.label}: <Text style={styles.bankAccount}>{bank.account}</Text>
              </Text>
            ))}
          </SectionCard>
        )}

        <View style={styles.footerTextWrapper}>
          <Text style={styles.footerText}>
            Podrás seguir el estado de tu pedido en la pestaña <Text style={styles.footerTextStrong}>Pedidos</Text>.
          </Text>
        </View>

        <PrimaryButton
          title="Ir a mis pedidos"
          onPress={goToPedidos}
          // el botón ya usa el rojo definido en tu tema, no cambiamos color
          style={styles.primaryButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    ...sharedStyles.centeredScreen,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
  },
  card: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: 28,
    paddingHorizontal: 20,
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.darkText,
    marginBottom: 6,
  },
  orderCode: {
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    color: colors.textLight,
    marginBottom: 16,
    fontSize: 14,
  },
  bankSection: {
    width: '100%',
    marginBottom: 16,
  },
  bankText: {
    color: colors.textDark,
    marginBottom: 6,
    fontSize: 14,
  },
  bankAccount: {
    fontWeight: '700',
  },
  footerTextWrapper: {
    marginBottom: 16,
  },
  footerText: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
  },
  footerTextStrong: {
    fontWeight: '700',
    color: colors.darkText,
  },
  primaryButton: {
    alignSelf: 'stretch',
    marginTop: 4,
  },
});

export default PedidoConfirmacionScreen;
