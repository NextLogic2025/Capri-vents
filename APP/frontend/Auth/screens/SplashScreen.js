import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, StatusBar } from 'react-native';
import colors from '../../theme/colors';
import LogoCafrilosa from '../../assets/images/logo-cafrilosa.png';
import { useAppContext } from '../../context/AppContext';

const SplashScreen = ({ navigation }) => {
  const logoAnim = useRef(new Animated.Value(0)).current;
  const { isLoggedIn, currentRole } = useAppContext();

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(logoAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(logoAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();

    const timeout = setTimeout(() => {
      // BACKEND: aqui podrias verificar token de sesion en AsyncStorage o llamar a un endpoint para auto-login.
      if (isLoggedIn) {
        const target =
          currentRole === 'vendedor'
            ? 'VendedorModulo'
            : currentRole === 'supervisor'
            ? 'SupervisorModulo'
            : 'ClienteTabs';
        navigation.reset({ index: 0, routes: [{ name: target }] });
      } else {
        navigation.replace('AuthStack');
      }
    }, 2500);

    return () => clearTimeout(timeout);
  }, [isLoggedIn, currentRole, logoAnim, navigation]);

  const scale = logoAnim.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1.05] });
  const opacity = logoAnim.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primaryRed} />
      <Animated.Image source={LogoCafrilosa} style={[styles.logo, { transform: [{ scale }], opacity }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryRed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 220,
    height: 140,
  },
  slogan: {
    marginTop: 16,
    fontSize: 20,
    color: colors.gold,
    fontWeight: '600',
    letterSpacing: 1.2,
  },
});

export default SplashScreen;
