import React from 'react';
import { View, Text, ScrollView, Linking, StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import sharedStyles from '../../theme/styles';
import SectionCard from '../components/SectionCard';
import PrimaryButton from '../components/PrimaryButton';

const faqs = [
  { question: 'Como veo mis pedidos?', answer: 'Ingresa en la tab Pedidos para ver el historial completo.' },
  { question: 'Que metodos de pago aceptan?', answer: 'Tarjeta, transferencia bancaria, efectivo y credito comercial.' },
  { question: 'Puedo editar mis datos?', answer: 'Desde Perfil puedes actualizar informacion personal y preferencias.' },
  { question: 'Como reporto un problema?', answer: 'Escribenos por WhatsApp o correo y te ayudaremos.' },
];

const SupportScreen = () => {
  const openWhatsapp = () => Linking.openURL('https://wa.me/593999999999');
  const openEmail = () => Linking.openURL('mailto:soporte@cafrilosa.com');
  // BACKEND: si en el futuro hay sistema de tickets, aqui se podria abrir un formulario.

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 16, paddingBottom: 160 }}>
      <Text style={styles.title}>Soporte</Text>
      <SectionCard title="Preguntas frecuentes">
        {faqs.map((faq) => (
          <View key={faq.question} style={styles.faqItem}>
            <Text style={styles.faqQuestion}>{faq.question}</Text>
            <Text style={styles.faqAnswer}>{faq.answer}</Text>
          </View>
        ))}
      </SectionCard>

      <SectionCard title="Contactanos">
        <Text style={styles.contactText}>WhatsApp: +593 99 999 9999</Text>
        <Text style={styles.contactText}>Correo: soporte@cafrilosa.com</Text>
        <PrimaryButton title="Escribir por WhatsApp" onPress={openWhatsapp} style={{ marginTop: 12 }} />
        <PrimaryButton title="Enviar correo" onPress={openEmail} style={{ marginTop: 12 }} />
      </SectionCard>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 12,
  },
  faqItem: {
    marginBottom: 12,
  },
  faqQuestion: {
    fontWeight: '700',
    color: colors.textDark,
  },
  faqAnswer: {
    color: colors.textLight,
    marginTop: 4,
  },
  contactText: {
    color: colors.textDark,
    marginTop: 6,
  },
});

export default SupportScreen;
