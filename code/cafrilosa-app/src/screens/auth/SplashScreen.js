import React, { useEffect, useRef } from "react";
import { View, Text, Image, ImageBackground, StyleSheet, Animated, Easing } from "react-native";
import { useNavigation } from "@react-navigation/native";

const splashBg = require("../../assets/images/splash-bg.png");
const logo = require("../../assets/images/logo-cafrilosa.png");

const SplashScreen = () => {
  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(0.6)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const dotsAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        delay: 400,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(dotsAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(dotsAnim, { toValue: 0, duration: 1200, useNativeDriver: true }),
      ])
    ).start();

    const timeout = setTimeout(() => {
      navigation.replace("Login");
    }, 3500);

    return () => clearTimeout(timeout);
  }, [navigation, scaleAnim, fadeAnim, dotsAnim]);

  const dotOpacity = (offset) =>
    dotsAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [offset === 1 ? 0.6 : 0.3, offset === 1 ? 1 : 0.5],
    });

  return (
    <View style={styles.container}>
      <ImageBackground source={splashBg} style={styles.background} resizeMode="cover">
        <View style={styles.overlay} />
        <View style={styles.contentWrapper}>
          <Animated.View style={[styles.logoCircle, { transform: [{ scale: scaleAnim }] }]}> 
            <Image source={logo} style={styles.logo} resizeMode="contain" />
          </Animated.View>
          <Animated.View style={{ opacity: fadeAnim, alignItems: "center" }}>
            <Text style={styles.title}>Cafrilosa</Text>
            <Text style={styles.subtitle}>Carnes & Embutidos desde 1965</Text>
            <Text style={styles.tagline}>...Alimentando tu vida</Text>
          </Animated.View>
          <View style={styles.dotsContainer}>
            <Animated.View style={[styles.dot, { opacity: dotOpacity(0) }]} />
            <Animated.View style={[styles.dot, styles.dotActive, { opacity: dotOpacity(1) }]} />
            <Animated.View style={[styles.dot, { opacity: dotOpacity(0) }]} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(230, 74, 25, 0.85)",
  },
  contentWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  logoCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#FFE4D5",
    marginBottom: 4,
  },
  tagline: {
    fontSize: 15,
    color: "#FFE4D5",
    fontStyle: "italic",
  },
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 6,
  },
  dotActive: {
    width: 10,
    height: 10,
  },
});

export default SplashScreen;
