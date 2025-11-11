import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const problems = [
  {
    key: "bad_product",
    title: "Producto en Mal Estado",
    description: "El producto llegó dañado o sin refrigeración adecuada",
  },
  {
    key: "wrong_quantity",
    title: "Error en Cantidades",
    description: "Faltaron productos o llegaron cantidades incorrectas",
  },
  {
    key: "other",
    title: "Otro Problema",
    description: "Describe tu situacion al equipo de soporte",
  },
];

const OrderProblemModal = ({ visible, onClose, onSelectProblem }) => {
  return (
    <Modal visible={visible} animationType="fade" transparent statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <Text style={styles.title}>?Que problema tuviste con tu pedido?</Text>
          {problems.map((problem) => (
            <TouchableOpacity
              key={problem.key}
              style={styles.problemCard}
              onPress={() => onSelectProblem(problem.key, problem.title)}
            >
              <Text style={styles.problemTitle}>{problem.title}</Text>
              <Text style={styles.problemDescription}>{problem.description}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    width: "100%",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },
  problemCard: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#F9FAFB",
  },
  problemTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  problemDescription: {
    fontSize: 13,
    color: "#6B7280",
  },
  cancelButton: {
    borderRadius: 18,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    marginTop: 4,
  },
  cancelText: {
    fontWeight: "600",
    color: "#111827",
  },
});

export default OrderProblemModal;
