import Button from "@/components/Button";
import NigeriaPhoneInput from "@/components/PhoneInput";
import TextInput from "@/components/TextInput";
import colors from "@/constants/colors";
import JostFont from "@/constants/jost-font";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { moderateScale, scale, verticalScale } from "@/utils/scaling";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Checkbox from "expo-checkbox";
import { Link, router } from "expo-router";
import React, { useCallback, useMemo, useState } from "react"; // Import useCallback and useMemo
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

// Define options outside the component to prevent re-creation on every render
const GENDER_OPTIONS = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const SignUp = () => {
  const { resetOnboarding } = useOnboarding();

  // State variables for form inputs
  const [fullName, setFullName] = useState("");
  const [selectedGender, setSelectedGender] = useState<string | null>(null); // Renamed for clarity
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [workAddress, setWorkAddress] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // To manage loading state for button

  // Function to handle signup logic
  const handleSignUp = useCallback(async () => {
    // Basic validation
    if (!fullName || !email || !phoneNumber || !selectedGender) {
      Alert.alert(
        "Missing Information",
        "Please fill in all required fields (Full name, Email, Phone number, Gender, Date of Birth)."
      );
      return;
    }

    setIsLoading(true); // Start loading

    try {
      // Simulate API call
      console.log("Attempting to sign up with:", {
        fullName,
        selectedGender,

        phoneNumber,
        homeAddress,
        workAddress,
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
  }, [fullName, selectedGender, email, phoneNumber, homeAddress, workAddress]); // Dependencies for useCallback

  // Memoize the gender options to prevent unnecessary re-renders of CustomSelect
  const genderOptions = useMemo(() => GENDER_OPTIONS, []);

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
              <Pressable
                onPress={() => router.back()}
                style={{
                  flexDirection: "row",
                  marginLeft: scale(-8),
                  gap: scale(5),
                }}
              >
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={30}
                  color="black"
                />
                <Text style={styles.progressText}>
                  Let's go, you're almost there!
                </Text>
              </Pressable>

              <Text style={styles.headerTitle}>
                3. Business Details (optional)
              </Text>
              <Text style={styles.subtitle}>
                Regulations require you to upload your business registration
                number. Don't worry, your data will stay safe and private.
              </Text>
              <TextInput
                placeholder="Business Registration Number"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
                returnKeyType="next" // Improve keyboard navigation
                onSubmitEditing={() => Keyboard.dismiss()} // Consider focusing next input instead
              />

              <NigeriaPhoneInput
                placeholder="Mobile Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                returnKeyType="next"
                onSubmitEditing={() => Keyboard.dismiss()}
              />

              <TextInput
                placeholder="Business Address (If diffrent from Regional address)"
                value={homeAddress}
                onChangeText={setHomeAddress}
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => Keyboard.dismiss()}
              />
              <TextInput
                placeholder="Referral Code (If Applicable)"
                value={workAddress}
                onChangeText={setWorkAddress}
                autoCapitalize="words"
                returnKeyType="done" // Last input, so "done"
                onSubmitEditing={handleSignUp} // Submit form on last input
              />
            </View>
            <View
              style={{
                width: "100%",
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
                By clicking this box, i have read, understood and agreed to the
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

            <View style={styles.buttonContainer}>
              <Button
                label={isLoading ? "Signing Up..." : "Next"}
                theme="primary"
                onPress={() => {
                  router.push("/(auth)/corporate-sign-up-five"); // Navigate to next step
                }}
                // disabled={isLoading}
              />
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
  inputSection: {
    // Renamed from inputContainer for clarity
    width: "100%", // Let it take full width of scrollViewContent
    maxWidth: scale(350), // Optional: Set a max width for large screens
  },
  title: {
    fontSize: moderateScale(28),
    fontFamily: JostFont.medium,
    marginBottom: verticalScale(5),
    textAlign: "left", // Ensure title is aligned left within its container
  },
  subtitle: {
    fontSize: moderateScale(16),
    fontFamily: JostFont.normal,
    color: colors.grey,
    marginBottom: verticalScale(30),
    textAlign: "left", // Ensure subtitle is aligned left within its container
  },
  progressText: {
    fontSize: moderateScale(22),
    color: "#666",
    marginBottom: verticalScale(20),
  },
  headerTitle: {
    fontSize: moderateScale(22),
    fontFamily: JostFont.normal,
    color: colors.primary,
    marginBottom: verticalScale(10),
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
