import Button from "@/components/Button";
import PasswordInput from "@/components/PasswordInput";
import TextInput from "@/components/TextInput";
import colors from "@/constants/colors";
import JostFont from "@/constants/jost-font";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { moderateScale, scale, verticalScale } from "@/utils/scaling";
import Checkbox from "expo-checkbox";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React, { useCallback, useState } from "react"; // Import useCallback and useMemo
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  const { resetOnboarding } = useOnboarding();

  // State variables for form inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // To manage loading state for button

  // Function to handle signup logic
  const handleSignUp = useCallback(async () => {
    // Basic validation
    if (!username || !password || !confirmPassword) {
      Alert.alert(
        "Missing Information",
        "Please fill in all required fields (user name, password, confirm password,"
      );
      return;
    }

    setIsLoading(true); // Start loading

    try {
      // Simulate API call
      console.log("Attempting to sign up with:", {
        username,

        password,
        confirmPassword,
      });

      // Replace with actual API call (e.g., fetch, axios)
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network request

      Alert.alert("Sign Up Successful!", "Your account has been created.");
      // Navigate to next screen or login
      // router.push('/(auth)/login'); // Example using expo-router
    } catch (error) {
      console.error("Sign up error:", error);
      Alert.alert(
        "Sign Up Failed",
        "An error occurred during sign up. Please try again."
      );
    } finally {
      setIsLoading(false); // End loading
    }
  }, [username, password, confirmPassword]); // Dependencies for useCallback

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
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={require("../../assets/images/primary-logo.png")}
                contentFit="cover"
              />
            </View>
            <View style={styles.inputSection}>
              {/* Group inputs logically */}
              <Text style={styles.title}>Welcome!</Text>
              <Text style={styles.subtitle}>Create your account</Text>
              <TextInput
                placeholder="Create a Unique Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="words"
                returnKeyType="next" // Improve keyboard navigation
                onSubmitEditing={() => Keyboard.dismiss()} // Consider focusing next input instead
              />
              <PasswordInput
                placeholder="Create a Password"
                value={password}
                onChangeText={setPassword}
                keyboardType="default"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => Keyboard.dismiss()}
              />
              <PasswordInput
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                keyboardType="default"
                autoCapitalize="none"
                onSubmitEditing={() => Keyboard.dismiss()}
              />
              <View
                style={{
                  width: "90%",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: verticalScale(10),
                }}
              >
                <Checkbox
                  //   style={{ margin: scale(8) }}
                  value={isChecked}
                  onValueChange={setChecked}
                  color={isChecked ? colors.primary : undefined}
                />
                <Text style={styles.termsText}>
                  By clicking this box, i have read, understood and agreed to
                  the
                  <Link
                    style={{
                      color: colors.primary,
                      fontFamily: JostFont.medium,
                      textDecorationLine: "underline",
                    }}
                    href="/#"
                  >
                    {" "}
                    terms and conditions
                  </Link>{" "}
                  of FalconEx
                </Text>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                label={isLoading ? "Signing Up..." : "Sign Up"}
                theme="primary"
                onPress={handleSignUp}
                // disabled={isLoading}
              />
              <Link href="/(auth)/login" style={styles.signInLink}>
                Already have an Account? Sign In
              </Link>
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

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  pressableOverlay: {
    flex: 1, // Make sure the Pressable covers the entire area to dismiss keyboard
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: verticalScale(20), // Use vertical padding
    paddingHorizontal: scale(20), // Add some horizontal padding for overall content
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(30), // Add spacing below logo
  },
  logo: {
    width: scale(247),
    height: verticalScale(130),
  },
  inputSection: {
    // Renamed from inputContainer for clarity
    width: "100%", // Let it take full width of scrollViewContent
    maxWidth: scale(350), // Optional: Set a max width for large screens
  },
  title: {
    fontSize: moderateScale(36),
    fontFamily: JostFont.normal,
    marginBottom: verticalScale(5),
    textAlign: "left", // Ensure title is aligned left within its container
  },
  subtitle: {
    fontSize: moderateScale(22),
    fontFamily: JostFont.normal,
    color: "#3D3D3D",
    marginBottom: verticalScale(40),
    textAlign: "left", // Ensure subtitle is aligned left within its container
  },
  rowInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(10), // Add spacing between this row and next input
  },
  rowInputHalf: {
    width: "48%", // Maintain 48% width for each input in the row
  },
  termsText: {
    fontSize: moderateScale(14),
    fontFamily: JostFont.light,
    fontStyle: "italic",
    color: "#686868",
    marginLeft: scale(10), // Add some space between checkbox and text
    // marginBottom: verticalScale(40),
  },
  buttonContainer: {
    width: "100%",
    maxWidth: scale(350), // Match the input section's max width
    marginTop: verticalScale(30), // Space above buttons
  },
  signInLink: {
    fontSize: moderateScale(16),
    color: "#000",
    textAlign: "center",
    marginTop: verticalScale(15),
    fontFamily: JostFont.normal, // Apply font consistently
  },
});
