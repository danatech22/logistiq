import { useAuth } from "@/contexts/AuthContext";
import React from "react";
import { Pressable, Text, View } from "react-native";

const Account = () => {
  const { signOut } = useAuth();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "blue",
      }}
    >
      <Text>Account</Text>
      <Pressable onPress={() => signOut()}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default Account;
