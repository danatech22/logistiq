import {
  Inter_900Black,
  useFonts as useInterFonts,
} from "@expo-google-fonts/inter";
import {
  Jost_100Thin,
  Jost_200ExtraLight,
  Jost_300Light,
  Jost_400Regular,
  Jost_500Medium,
  Jost_600SemiBold,
  Jost_700Bold,
  Jost_800ExtraBold,
  Jost_900Black,
  useFonts as useJostFonts,
} from "@expo-google-fonts/jost";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import {
  OnboardingProvider,
  useOnboarding,
} from "@/contexts/OnboardingContext";
import { Stack } from "expo-router";
import { Text, View } from "react-native";

SplashScreen.preventAutoHideAsync();

function RootLayoutContent() {
  const { onboardingCompleted, isLoadingOnboarding } = useOnboarding();
  const [isAppReady, setIsAppReady] = useState(false);
  const { userToken } = useAuth();
  let userName = userToken;

  const [interLoaded, interError] = useInterFonts({
    Inter_900Black,
  });

  const [jostLoaded, jostError] = useJostFonts({
    Jost_900Black,
    Jost_800ExtraBold,
    Jost_700Bold,
    Jost_600SemiBold,
    Jost_500Medium,
    Jost_400Regular,
    Jost_300Light,
    Jost_200ExtraLight,
    Jost_100Thin,
  });

  useEffect(() => {
    if (!isLoadingOnboarding) {
      SplashScreen.hideAsync();
      setIsAppReady(true);
    }
  }, [isLoadingOnboarding]);

  useEffect(() => {
    if (interLoaded || interError || jostLoaded || jostError) {
      SplashScreen.hideAsync();
    }
  }, [interLoaded, interError, jostLoaded, jostError]);

  if (!isAppReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading app...</Text>
      </View>
    );
  }

  if ((!interLoaded && !interError) || (!jostLoaded && !jostError)) {
    return null;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Protected routes for onboarding */}
      <Stack.Protected guard={!onboardingCompleted}>
        <Stack.Screen name="(public)/onboarding" />
      </Stack.Protected>

      <Stack.Protected guard={onboardingCompleted && userName == null}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
      {/* <Stack.Protected guard={onboardingCompleted && userToken == null}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected> */}

      {/* <Stack.Protected guard={onboardingCompleted && userToken != null}>
        <Stack.Screen name="(app)" />
      </Stack.Protected> */}
      <Stack.Protected guard={onboardingCompleted && userName != null}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>

      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <OnboardingProvider>
      <AuthProvider>
        <RootLayoutContent />
      </AuthProvider>
    </OnboardingProvider>
  );
}
