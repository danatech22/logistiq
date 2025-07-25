import { useAuth } from "@/contexts/AuthContext";
import React from "react";
import { Pressable, Text, View } from "react-native";

const index = () => {
  const { signOut } = useAuth();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
      }}
    >
      <Text>Home</Text>
      <Pressable onPress={() => signOut()}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default index;
