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
    if (!selectedPlan) {
      Alert.alert('Selecciona un plan', 'Elige el plan de cuotas que prefieras.');
      return;
    }
    const order = createOrderFromCart('CREDITO', { tipo: 'credito' });
    if (!order) {
      Alert.alert('Sin productos', 'Tu carrito esta vacio.');
      return;
    }
    const installments = generateInstallments(selectedPlan);
    const credit = createCreditPlanFromOrder(order.id, { cuotas: installments });
    // BACKEND: aqui se generaria el pedido y el cronograma de cuotas en la BD.
    navigation.navigate('CreditoConfirmacion', {
      orderCode: order.code,
      creditId: credit?.id,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScreenHeader title="Credito comercial" subtitle="Elige tu plan" />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 140 }}>
        <SectionCard title="Elige tu plan">
          <Text style={{ color: colors.textLight, marginBottom: 12 }}>
            Total del pedido: ${total.toFixed(2)}
          </Text>
          {plans.map((plan) => {
            const selected = selectedPlan?.id === plan.id;
            const amount = (total / plan.dias.length).toFixed(2);
            return (
              <TouchableOpacity
                key={plan.id}
                onPress={() => setSelectedPlan(plan)}
                style={[styles.planCard, selected && styles.planCardActive]}
              >
                <View style={styles.planHeader}>
                  <Text style={styles.planTitle}>{plan.cuotas} cuota{plan.cuotas > 1 ? 's' : ''}</Text>
                  <Text style={[styles.planBadge, selected && styles.planBadgeActive]}>
                    ${amount} c/u
                  </Text>
                </View>
                <Text style={styles.planDescription}>Vence en {plan.dias.join(' y ')} dias</Text>
                <View style={styles.planInstallments}>
                  {plan.dias.map((day, idx) => (
                    <Text key={day} style={styles.installmentText}>
                      Cuota {idx + 1}: vence en {day} dias
                    </Text>
                  ))}
                </View>
              </TouchableOpacity>
            );
          })}
        </SectionCard>
      </ScrollView>
      <View style={styles.bottomBar}>
        <PrimaryButton title="Confirmar pedido con credito" onPress={handleConfirm} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  planCard: {
    borderWidth: 1,
    borderColor: colors.borderSoft,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    backgroundColor: colors.cardBackground,
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
  planBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: colors.borderSoft,
    color: colors.textLight,
    fontWeight: '600',
  },
  planBadgeActive: {
    backgroundColor: colors.primary,
    color: '#fff',
  },
  planDescription: {
    marginTop: 6,
    color: colors.textLight,
  },
  planInstallments: {
    marginTop: 8,
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
