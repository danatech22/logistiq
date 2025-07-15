// NigeriaPhoneInput.tsx
import { moderateScale } from "@/utils/scaling";
import React from "react";
import { StyleSheet, TextInputProps, View } from "react-native";
import TextInput from "./TextInput"; // Your base TextInput component

interface NigeriaPhoneInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

const NigeriaPhoneInput: React.FC<NigeriaPhoneInputProps> = ({
  label,
  placeholder = "e.g. 08012345678",
  value,
  onChangeText,
  error,
  ...props
}) => {
  const handleTextChange = (text: string) => {
    onChangeText?.(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={handleTextChange}
        keyboardType="phone-pad"
        maxLength={11}
        error={error}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginBottom: verticalScale(16),
  },
  countryCode: {
    fontSize: moderateScale(16),
    color: "#333",
    marginRight: 8,
  },
});

export default NigeriaPhoneInput;
