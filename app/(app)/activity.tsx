import { useAuth } from "@/contexts/AuthContext";
import React from "react";
import { Pressable, Text, View } from "react-native";

const Activity = () => {
  const { signOut } = useAuth();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "yellow",
      }}
    >
      <Text>Activity</Text>
      <Pressable onPress={() => signOut()}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default Activity;
