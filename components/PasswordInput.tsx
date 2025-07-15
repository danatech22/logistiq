// PasswordInput.tsx
import { scale } from "@/utils/scaling";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import TextInput from "./TextInput";

interface PasswordInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.passwordContainer}>
      <TextInput
        label={label}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!isPasswordVisible}
        error={error}
        {...props}
      />
      <TouchableOpacity
        style={styles.eyeIcon}
        onPress={togglePasswordVisibility}
      >
        <MaterialIcons
          name={isPasswordVisible ? "visibility" : "visibility-off"}
          size={24}
          color="#666"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  passwordContainer: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: scale(12),
    top: "20%",
    transform: [{ translateY: "-20%" }],
  },
});

export default PasswordInput;
