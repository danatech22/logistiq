// TextInput.tsx
import { moderateScale, verticalScale } from "@/utils/scaling";
import React from "react";
import {
  TextInput as RNTextInput,
  StyleSheet,
  Text,
  TextInputProps,
  View,
} from "react-native";

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

const TextInput: React.FC<CustomTextInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  autoCapitalize = "sentences",
  error,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <RNTextInput
        style={[styles.input, error ? styles.errorInput : null]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        placeholderTextColor="#999"
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(20),
  },
  label: {
    fontSize: moderateScale(16),
    fontWeight: "500",
    marginBottom: verticalScale(8),
    color: "#333",
  },
  input: {
    height: verticalScale(40),
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(12),
    fontSize: moderateScale(16),
    backgroundColor: "#F4F4F4",
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: moderateScale(12),
    marginTop: verticalScale(4),
  },
});

export default TextInput;
