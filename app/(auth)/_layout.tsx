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
          title: "Sign Up",
        }}
      />
      <Stack.Screen
        name="sign-up-two"
        options={{
          title: "Sign Up Two",
        }}
      />
      <Stack.Screen
        name="corporate-sign-up"
        options={{
          title: "Corporate Sign Up",
        }}
      />
      <Stack.Screen
        name="corporate-sign-up-two"
        options={{
          title: "Corporate Sign Up Two",
        }}
      />
      <Stack.Screen
        name="corporate-sign-up-three"
        options={{
          title: "Corporate Sign Up Three",
        }}
      />
      <Stack.Screen
        name="corporate-sign-up-four"
        options={{
          title: "Corporate Sign Up Four",
        }}
      />
      <Stack.Screen
        name="corporate-sign-up-five"
        options={{
          title: "Corporate Sign Up Five",
        }}
      />
      <Stack.Screen
        name="location-access"
        options={{
          title: "Location",
        }}
      />
      <Stack.Screen
        name="location-access-manual"
        options={{
          title: "Location",
        }}
      />
      <Stack.Screen
        name="otp-verify"
        options={{
          title: "OTP Verification",
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
