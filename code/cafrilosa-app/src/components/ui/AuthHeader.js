import React from "react";
import { View, Image, TouchableOpacity, StyleSheet, ImageBackground, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const headerMeat = require("../../assets/images/login-header-meat.png");
const logo = require("../../assets/images/logo-cafrilosa.png");

const AuthHeader = ({
  showBackButton = false,
  onBackPress,
  title = "Cafrilosa",
  subtitle = "Carnes & Embutidos desde 1965",
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ImageBackground source={headerMeat} style={styles.headerImage} imageStyle={styles.headerImageStyle}>
        <View style={styles.overlay} />
      </ImageBackground>
      {showBackButton ? (
        <TouchableOpacity style={[styles.backButton, { top: insets.top + 16 }]} onPress={onBackPress}>
          <MaterialCommunityIcons name="arrow-left" size={22} color="#111827" />
        </TouchableOpacity>
      ) : null}
      <View style={styles.cardWrapper}>
        <View style={styles.logoCard}>
          <View style={styles.logoBadge}>
            <Image source={logo} style={styles.logoImage} resizeMode="contain" />
          </View>
          <Text style={styles.brandTitle}>{title}</Text>
          {subtitle ? <Text style={styles.brandSubtitle}>{subtitle}</Text> : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
  headerImage: {
    width: "100%",
    height: 210,
  },
  headerImageStyle: {
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  cardWrapper: {
    alignItems: "center",
    marginTop: -70,
    marginBottom: 12,
  },
  logoCard: {
    width: "90%",
    borderRadius: 32,
    backgroundColor: "#FFFFFF",
    paddingVertical: 24,
    paddingHorizontal: 24,
    alignItems: "center",
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 18,
  },
  logoBadge: {
    width: 96,
    height: 96,
    borderRadius: 24,
    backgroundColor: "#FDF2EC",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  logoImage: {
    width: 76,
    height: 52,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  brandSubtitle: {
    fontSize: 15,
    color: "#6B7280",
    marginTop: 6,
  },
  backButton: {
    position: "absolute",
    left: 20,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#FFFFFF",
    zIndex: 4,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AuthHeader;

