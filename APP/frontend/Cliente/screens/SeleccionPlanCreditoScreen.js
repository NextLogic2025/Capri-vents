import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import colors from '../../theme/colors';
import sharedStyles from '../../theme/styles';
import SectionCard from '../components/SectionCard';
import PrimaryButton from '../components/PrimaryButton';
import ScreenHeader from '../components/ScreenHeader';
import { useAppContext } from '../../context/AppContext';

const plansConfig = [
  { id: 'PLAN-1', cuotas: 1, dias: [30] },
  { id: 'PLAN-2', cuotas: 2, dias: [30, 60] },
  { id: 'PLAN-3', cuotas: 3, dias: [30, 60, 90] },
];

const SeleccionPlanCreditoScreen = ({ route, navigation }) => {
  const totalParam = route.params?.total || 0;
  const { cartTotals, createOrderFromCart, createCreditPlanFromOrder } = useAppContext();
  const total = totalParam || cartTotals.total;
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = useMemo(() => plansConfig, []);

  const formatMoney = (value) => `$${(Number(value) || 0).toFixed(2)}`;

  const generateInstallments = (plan) => {
    const amount = parseFloat((total / plan.dias.length).toFixed(2));
    return plan.dias.map((days, index) => {
      const date = new Date();
      date.setDate(date.getDate() + days);
      const dueDate = date.toISOString().split('T')[0];
      return {
        numero: index + 1,
        monto: amount,
        dueDate: dueDate,
      };
    });
  };

  const handleConfirm = () => {
    console.log('🟢 [DEBUG] handleConfirm iniciado');
    if (!selectedPlan) {
      Alert.alert('Selecciona un plan', 'Elige el plan de cuotas que prefieras.');
      return;
    }
    console.log('🟢 [DEBUG] Creando orden con método CREDITO');
    const order = createOrderFromCart('CREDITO', { tipo: 'credito' });
    console.log('🟢 [DEBUG] Orden creada:', order);
    if (!order) {
      Alert.alert('Sin productos', 'Tu carrito esta vacio.');
      return;
    }
    const installments = generateInstallments(selectedPlan);
    console.log('🟢 [DEBUG] Cuotas generadas:', installments);
    // Pasamos el objeto order completo
    const credit = createCreditPlanFromOrder(order, { cuotas: installments });
    console.log('🟢 [DEBUG] Crédito retornado:', credit);
    // BACKEND: aqui se generaria el pedido y el cronograma de cuotas en la BD.
    navigation.navigate('CreditoConfirmacion', {
      orderCode: order.code,
      creditId: credit?.id,
    });
  };

  return (
    <View style={styles.screen}>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <SectionCard title="Selecciona tu plan">
          <Text style={styles.sectionDescription}>
            Divide tu compra en cuotas fijas y mantén tus pagos bajo control.
          </Text>

          <View style={styles.totalRow}>
            <View>
              <Text style={styles.totalLabel}>Total del pedido</Text>
              <Text style={styles.totalHint}>Este monto se distribuirá entre tus cuotas.</Text>
            </View>
            <Text style={styles.totalValue}>{formatMoney(total)}</Text>
          </View>

          {plans.map((plan) => {
            const selected = selectedPlan?.id === plan.id;
            const amount = (total / plan.dias.length).toFixed(2);

            return (
              <TouchableOpacity
                key={plan.id}
                onPress={() => setSelectedPlan(plan)}
                activeOpacity={0.9}
                style={[
                  styles.planCard,
                  selected && styles.planCardActive,
                ]}
              >
                <View style={styles.planHeader}>
                  <View>
                    <Text style={styles.planTitle}>
                      {plan.cuotas} cuota{plan.cuotas > 1 ? 's' : ''}
                    </Text>
                    <Text style={styles.planSubtitle}>
                      Vence en {plan.dias.join(' y ')} días
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.planBadgeWrapper,
                      selected && styles.planBadgeWrapperActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.planBadgeText,
                        selected && styles.planBadgeTextActive,
                      ]}
                    >
                      {formatMoney(amount)} c/u
                    </Text>
                  </View>
                </View>

                <View style={styles.planInstallments}>
                  {plan.dias.map((day, idx) => (
                    <View key={day} style={styles.installmentRow}>
                      <View style={styles.installmentDot} />
                      <Text style={styles.installmentText}>
                        Cuota {idx + 1}: vence en {day} días
                      </Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            );
          })}
        </SectionCard>
      </ScrollView>

      <View style={styles.bottomBar}>
        <PrimaryButton
          title="Confirmar pedido con crédito"
          onPress={handleConfirm}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerWrapper: {
    // el ScreenHeader ya maneja paddings y color de fondo
  },
  headerCard: {
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 140,
  },
  sectionDescription: {
    color: colors.textLight,
    marginBottom: 14,
    fontSize: 13,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 18,
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textDark,
  },
  totalHint: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
  },
  planCard: {
    borderWidth: 1,
    borderColor: colors.borderSoft,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    backgroundColor: colors.cardBackground,
    ...sharedStyles.shadow,
  },
  planCardActive: {
    borderColor: colors.primary,
    backgroundColor: '#FFF5F2',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
  },
  planSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: colors.textLight,
  },
  planBadgeWrapper: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: colors.borderSoft,
  },
  planBadgeWrapperActive: {
    backgroundColor: colors.primary,
  },
  planBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textLight,
  },
  planBadgeTextActive: {
    color: colors.white,
  },
  planInstallments: {
    marginTop: 10,
  },
  installmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  installmentDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginRight: 8,
  },
  installmentText: {
    color: colors.textLight,
    fontSize: 13,
  },
  bottomBar: {
    padding: 16,
    backgroundColor: colors.cardBackground,
    borderTopWidth: 1,
    borderTopColor: colors.borderSoft,
  },
});

export default SeleccionPlanCreditoScreen;
