import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import PrimaryButton from '../components/PrimaryButton';
import sharedStyles from '../../theme/styles';

const CreditoConfirmacionScreen = ({ route, navigation }) => {
  const orderCode = route.params?.orderCode;
  const scaleValue = useRef(new Animated.Value(0)).current;
  const fadeValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.timing(fadeValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const goToCredits = () => {
    // Navegar al stack principal y luego a la pestaña de Créditos
    navigation.navigate('ClienteTabs', { screen: 'Creditos' });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Animated.View style={[styles.iconContainer, { transform: [{ scale: scaleValue }] }]}>
          <Ionicons name="checkmark-circle" size={100} color={colors.success || '#4CAF50'} />
        </Animated.View>

        <Animated.View style={{ opacity: fadeValue, width: '100%', alignItems: 'center' }}>
          <Text style={styles.title}>¡Solicitud Exitosa!</Text>
          <Text style={styles.subtitle}>
            Tu pedido a crédito ha sido creado correctamente.
          </Text>

          {orderCode && (
            <View style={styles.codeContainer}>
              <Text style={styles.codeLabel}>Código de Pedido</Text>
              <Text style={styles.code}>{orderCode}</Text>
            </View>
          )}

          <Text style={styles.infoText}>
            Puedes ver el detalle de tus cuotas y realizar pagos desde la sección de Créditos.
          </Text>

          <PrimaryButton
            title="Ir a mis Créditos"
            onPress={goToCredits}
            style={styles.button}
          />

          <TouchableOpacity onPress={() => navigation.navigate('Inicio')} style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Volver al Inicio</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 32,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textDark,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  codeContainer: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
  },
  codeLabel: {
    fontSize: 12,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  code: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  infoText: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
  button: {
    width: '100%',
    marginBottom: 16,
  },
  secondaryButton: {
    padding: 12,
  },
  secondaryButtonText: {
    color: colors.textMuted,
    fontWeight: '600',
    fontSize: 16,
  },
});

export default CreditoConfirmacionScreen;
