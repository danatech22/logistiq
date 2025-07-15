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
import { useEffect } from "react";

import { Stack } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
    if (interLoaded || interError || jostLoaded || jostError) {
      SplashScreen.hideAsync();
    }
  }, [interLoaded, interError, jostLoaded, jostError]);

  if ((!interLoaded && !interError) || (!jostLoaded && !jostError)) {
    return null;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "transparent" },
      }}
    />
  );
}
