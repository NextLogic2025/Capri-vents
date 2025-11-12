import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/auth/SplashScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import ForgotPasswordEmailScreen from "../screens/auth/ForgotPasswordEmailScreen";
import ForgotPasswordCodeScreen from "../screens/auth/ForgotPasswordCodeScreen";
import ForgotPasswordResetScreen from "../screens/auth/ForgotPasswordResetScreen";
import ClienteTabNavigator from "./ClienteTabNavigator";
import VendedorTabNavigator from "./VendedorTabNavigator";
import SupervisorTabNavigator from "./SupervisorTabNavigator";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPasswordEmail" component={ForgotPasswordEmailScreen} />
      <Stack.Screen name="ForgotPasswordCode" component={ForgotPasswordCodeScreen} />
      <Stack.Screen name="ForgotPasswordReset" component={ForgotPasswordResetScreen} />
      <Stack.Screen name="ClienteTabs" component={ClienteTabNavigator} />
      <Stack.Screen
        name="VendedorTabs"
        component={VendedorTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="SupervisorTabs" component={SupervisorTabNavigator} />
    </Stack.Navigator>
  );
}

