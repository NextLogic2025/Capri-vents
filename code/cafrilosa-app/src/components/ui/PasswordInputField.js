import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PasswordInputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  style,
  inputStyle,
  iconName = "lock-outline",
  iconColor = "#9CA3AF",
  ...rest
}) => {
  const [secure, setSecure] = useState(true);

  const toggleSecure = () => setSecure((prev) => !prev);

  return (
    <View style={[styles.container, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.inputWrapper}>
        <MaterialCommunityIcons name={iconName} size={20} color={iconColor} style={styles.icon} />
        <TextInput
          style={[styles.input, inputStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={secure}
          autoCapitalize="none"
          {...rest}
        />
        <TouchableOpacity onPress={toggleSecure} style={styles.toggleButton}>
          <MaterialCommunityIcons
            name={secure ? "eye-outline" : "eye-off-outline"}
            size={20}
            color="#E64A19"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 50,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
  },
  toggleButton: {
    paddingLeft: 12,
  },
});

export default PasswordInputField;
