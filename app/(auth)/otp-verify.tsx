import Button from "@/components/Button";
import colors from "@/constants/colors";
import JostFont from "@/constants/jost-font";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { moderateScale, scale, verticalScale } from "@/utils/scaling";
import { router } from "expo-router";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { SafeAreaView } from "react-native-safe-area-context";

const OTPVerify = () => {
  const { resetOnboarding } = useOnboarding();

  return (
    <SafeAreaView style={[styles.container]}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView} // Use a named style for consistency
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Pressable onPress={Keyboard.dismiss} style={styles.pressableOverlay}>
          {/* ScrollView for long forms */}
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="handled" // Allows taps on buttons/links even when keyboard is active
            showsVerticalScrollIndicator={false} // Hide scroll indicator for cleaner UI
          >
            <View style={styles.inputSection}>
              {/* Group inputs logically */}
              <Text style={styles.title}>OTP Verification</Text>
              <Text style={styles.subtitle}>
                A one time pin has been sent to
              </Text>
              <Text
                style={[styles.subtitle, { marginBottom: verticalScale(40) }]}
              >
                +234(654 **** 999)
              </Text>
              <Text
                style={[
                  styles.subtitle,
                  { marginBottom: verticalScale(20), color: "black" },
                ]}
              >
                Please enter pin below
              </Text>
              <OtpInput
                numberOfDigits={4}
                onTextChange={(text) => console.log(text)}
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button
                label="Verify OTP"
                style={{ borderWidth: 1, borderColor: colors.primary }}
                onPress={() => {
                  router.push("/#");
                }}
                // disabled={isLoading}
              />
              <Text style={[styles.resendText]}>
                Resending OTP in{" "}
                <Text style={{ color: colors.primary, fontStyle: "italic" }}>
                  50sec
                </Text>
              </Text>
              <Button
                onPress={() => resetOnboarding()}
                label="Send to Email Instead"
              />
              <Button
                onPress={() => resetOnboarding()}
                label="Reset Onboarding"
              />
              {/* Make reset button distinct */}
            </View>
          </ScrollView>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OTPVerify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: verticalScale(50),
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  pressableOverlay: {
    flex: 1, // Make sure the Pressable covers the entire area to dismiss keyboard
  },
  scrollViewContent: {
    flex: 1,
    alignItems: "center",
    paddingVertical: verticalScale(20), // Use vertical padding
    paddingHorizontal: scale(20), // Add some horizontal padding for overall content
  },
  inputSection: {
    // Renamed from inputContainer for clarity
    width: "100%", // Let it take full width of scrollViewContent
    maxWidth: scale(250), // Optional: Set a max width for large screens
  },
  title: {
    fontSize: moderateScale(24),
    fontFamily: JostFont.semiBold,
    marginBottom: verticalScale(5),
    textAlign: "center", // Ensure title is aligned left within its container
  },
  subtitle: {
    fontSize: moderateScale(16),
    fontFamily: JostFont.normal,
    color: colors.grey,
    textAlign: "center", // Ensure subtitle is aligned left within its container
  },
  buttonContainer: {
    width: "100%",
    maxWidth: scale(350), // Match the input section's max width
    marginTop: verticalScale(30), // Space above buttons
  },
  resendText: {
    fontSize: moderateScale(16),
    color: "#9B9B9B",
    textAlign: "center",
    marginTop: verticalScale(15),
    fontFamily: JostFont.medium, // Apply font consistently
  },
});
