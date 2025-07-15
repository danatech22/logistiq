import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

interface OnboardingContextType {
  onboardingCompleted: boolean;
  isLoadingOnboarding: boolean;
  completeOnboarding: () => Promise<void>;
  resetOnboarding: () => Promise<void>;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export function OnboardingProvider({ children }: PropsWithChildren) {
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [isLoadingOnboarding, setIsLoadingOnboarding] = useState(true);

  useEffect(() => {
    const loadOnboardingStatus = async () => {
      try {
        const status = await AsyncStorage.getItem("onboardingCompleted");
        if (status === "true") {
          setOnboardingCompleted(true);
        }
      } catch (error) {
        console.error(
          "Failed to load onboarding status from AsyncStorage",
          error
        );
      } finally {
        setIsLoadingOnboarding(false);
      }
    };

    loadOnboardingStatus();
  }, []);

  const completeOnboarding = async () => {
    setIsLoadingOnboarding(true);
    try {
      await AsyncStorage.setItem("onboardingCompleted", "true");
      setOnboardingCompleted(true);
    } catch (error) {
      console.error("Failed to complete onboarding:", error);
    } finally {
      setIsLoadingOnboarding(false);
    }
  };

  const resetOnboarding = async () => {
    setIsLoadingOnboarding(true);
    try {
      await AsyncStorage.removeItem("onboardingCompleted");
      setOnboardingCompleted(false);

      router.replace("/(public)/onboarding");
    } catch (error) {
      console.error("Failed to reset onboarding:", error);
    } finally {
      setIsLoadingOnboarding(false);
    }
  };

  const value = {
    onboardingCompleted,
    isLoadingOnboarding,
    completeOnboarding,
    resetOnboarding,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};
