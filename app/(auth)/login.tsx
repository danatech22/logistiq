import { useOnboarding } from "@/contexts/OnboardingContext";
import React from "react";
import { Pressable, Text, View } from "react-native";

const index = () => {
  const { resetOnboarding } = useOnboarding();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Text>Auth</Text>
      <Pressable onPress={() => resetOnboarding()}>
        <Text>Reset</Text>
      </Pressable>
    </View>
  );
};

export default index;
