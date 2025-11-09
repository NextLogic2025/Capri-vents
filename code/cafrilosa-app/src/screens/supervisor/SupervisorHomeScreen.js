import React from "react";
import { SafeAreaView, View, Text, StyleSheet, Image } from "react-native";

const logo = require("../../assets/images/logo-cafrilosa.png");

const SupervisorHomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Panel Supervisor de Ventas</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.message}>
          Aquí irá el dashboard del supervisor (datos quemados o desde backend en el futuro).
        </Text>
        {/* TODO: conectar con backend aquí para cargar datos de ventas, pedidos, etc. del supervisor. */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  message: {
    fontSize: 16,
    color: "#4B5563",
    textAlign: "center",
  },
});

export default SupervisorHomeScreen;
