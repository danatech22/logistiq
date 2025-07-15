import { Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="login"
        options={{
          title: "Sign In", // Optional: A title for debugging/dev tools
        }}
      />

      {/*
        This refers to the nested sign-up flow.
        Expo Router will look for `app/(auth)/sign-up/_layout.tsx`
        to define the internal navigation for the multi-phase sign-up.
        The `sign-up` folder itself acts as a sub-stack.
      */}
      <Stack.Screen
        name="sign-up"
        options={{
          title: "Sign Up", // Optional: A title for debugging/dev tools
        }}
      />

      {/*
        You might have other authentication-related screens here,
        for example, a dedicated forgot password screen if it's not a modal.
        If `forgot-password-modal.tsx` is a root-level modal as discussed,
        it won't be listed directly here, but screens within this stack
        can link to it.
      */}
      {/*
      <Stack.Screen
        name="forgot-password"
        options={{
          title: 'Forgot Password',
        }}
      />
      */}
    </Stack>
  );
}
