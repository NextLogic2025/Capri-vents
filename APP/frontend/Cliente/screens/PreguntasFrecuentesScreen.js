import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import globalStyles from '../../theme/styles';

const FAQS = [
  {
    id: '1',
    question: '¿Cómo hago mi primer pedido en la app?',
    answer:
      'Explora los productos en la pestaña Inicio, agrégalos al carrito y luego sigue los pasos del proceso de pago. Podrás elegir dirección, método de pago y confirmar tu pedido.',
  },
  {
    id: '2',
    question: '¿Qué es el crédito Cafrilosa?',
    answer:
      'Es una línea de crédito para clientes autorizados que permite pagar en cuotas sus compras. En la sección Crédito puedes revisar tu saldo, cuotas pendientes y fechas de vencimiento.',
  },
  {
    id: '3',
    question: '¿Cuáles son los métodos de pago disponibles?',
    answer:
      'Actualmente puedes pagar con transferencia bancaria, efectivo contra entrega (en zonas habilitadas) y, próximamente, tarjetas registradas en la app.',
  },
  {
    id: '4',
    question: '¿Cómo actualizo mis datos personales o mis direcciones?',
    answer:
      'Desde la pestaña Perfil, ingresa a Datos personales para modificar tu información básica, o a Direcciones para agregar, editar y marcar tu dirección predeterminada.',
  },
  {
    id: '5',
    question: '¿Qué hago si tengo un problema con mi pedido?',
    answer:
      'Puedes comunicarte con nuestro equipo de soporte desde la sección Perfil → Soporte, o mediante los canales oficiales indicados en la app (WhatsApp y correo de atención).',
  },
];

const PreguntasFrecuentesScreen = () => {
  const [openId, setOpenId] = useState(FAQS[0]?.id ?? null);

  const toggleItem = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerBox}>
        <Ionicons name="help-circle-outline" size={22} color={colors.primary} />
        <View style={{ marginLeft: 8, flex: 1 }}>
          <Text style={styles.headerTitle}>Preguntas frecuentes</Text>
          <Text style={styles.headerSubtitle}>
            Encuentra respuestas rápidas sobre la app de Cafrilosa y tus pedidos.
          </Text>
        </View>
      </View>

      {FAQS.map((item) => {
        const isOpen = item.id === openId;
        return (
          <View key={item.id} style={styles.faqCard}>
            <TouchableOpacity
              style={styles.faqHeader}
              activeOpacity={0.8}
              onPress={() => toggleItem(item.id)}
            >
              <Text style={styles.faqQuestion}>{item.question}</Text>
              <Ionicons
                name={isOpen ? 'chevron-up-outline' : 'chevron-down-outline'}
                size={18}
                color={colors.textMuted}
              />
            </TouchableOpacity>
            {isOpen && (
              <View style={styles.faqBody}>
                <Text style={styles.faqAnswer}>{item.answer}</Text>
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerBox: {
    ...globalStyles.card,
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
  },
  headerSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: colors.textMuted,
  },
  faqCard: {
    ...globalStyles.card,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 10,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  faqQuestion: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
  },
  faqBody: {
    marginTop: 6,
  },
  faqAnswer: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
  },
});

export default PreguntasFrecuentesScreen;
