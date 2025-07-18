import Button from "@/components/Button";
import CustomDatePicker from "@/components/DatePicker";
import NigeriaPhoneInput from "@/components/PhoneInput";
import CustomSelect from "@/components/Select";
import TextInput from "@/components/TextInput";
import colors from "@/constants/colors";
import JostFont from "@/constants/jost-font";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { moderateScale, scale, verticalScale } from "@/utils/scaling";
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
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined); // Initialize as undefined
  const [isLoading, setIsLoading] = useState(false); // To manage loading state for button

  // Memoize date change handler to prevent unnecessary re-renders of CustomDatePicker
  const handleDateChange = useCallback((event: any, selectedDate?: Date) => {
    // Check if selectedDate is defined before setting
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  }, []); // Empty dependency array means this function is created once

  // Function to handle signup logic
  const handleSignUp = useCallback(async () => {
    // Basic validation
    if (
      !fullName ||
      !email ||
      !phoneNumber ||
      !selectedGender ||
      !dateOfBirth
    ) {
      Alert.alert(
        "Missing Information",
        "Please fill in all required fields (Full name, Email, Phone number, Gender, Date of Birth)."
      );
      return;
    }

    // Add more robust validation for email and phone number if needed
    // Example: simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    // You might want to validate phone number format based on NigeriaPhoneInput's output

    setIsLoading(true); // Start loading

    try {
      // Simulate API call
      console.log("Attempting to sign up with:", {
        fullName,
        selectedGender,
        email,
        phoneNumber,
        homeAddress,
        workAddress,
        dateOfBirth: dateOfBirth?.toISOString().split("T")[0], // Format date for API
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
  }, [
    fullName,
    selectedGender,
    email,
    phoneNumber,
    homeAddress,
    workAddress,
    dateOfBirth,
  ]); // Dependencies for useCallback

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
              <Text style={styles.title}>Welcome User,</Text>
              <Text style={styles.subtitle}>
                Please provide the necessary documents to set up your account
              </Text>
              <Text style={styles.headertitle}>
                1. Contact Person Information
              </Text>
              <TextInput
                placeholder="Full name"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
                returnKeyType="next" // Improve keyboard navigation
                onSubmitEditing={() => Keyboard.dismiss()} // Consider focusing next input instead
              />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => Keyboard.dismiss()}
              />
              <NigeriaPhoneInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                returnKeyType="next"
                onSubmitEditing={() => Keyboard.dismiss()}
              />
              <TextInput
                placeholder="Position In Company"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
                returnKeyType="next" // Improve keyboard navigation
                onSubmitEditing={() => Keyboard.dismiss()} // Consider focusing next input instead
              />
              <View style={styles.rowInputs}>
                <View style={styles.rowInputHalf}>
                  <CustomDatePicker
                  // date={dateOfBirth} // Pass state to DatePicker
                  // onChange={handleDateChange} // Pass the memoized handler
                  // placeholder="Date of Birth" // Add a placeholder for clarity
                  />
                </View>
                <View style={styles.rowInputHalf}>
                  <CustomSelect
                    options={genderOptions}
                    placeholder="Gender"
                    onValueChange={setSelectedGender} // Use selectedGender
                    value={selectedGender}
                  />
                </View>
              </View>

              <TextInput
                placeholder="Home Address (optional)"
                value={homeAddress}
                onChangeText={setHomeAddress}
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => Keyboard.dismiss()}
              />
              <TextInput
                placeholder="Work Address (optional)"
                value={workAddress}
                onChangeText={setWorkAddress}
                autoCapitalize="words"
                returnKeyType="done" // Last input, so "done"
                onSubmitEditing={handleSignUp} // Submit form on last input
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button
                label={isLoading ? "Signing Up..." : "Continue"}
                theme="primary"
                onPress={() => {
                  router.push("/(auth)/sign-up-two"); // Navigate to next step
                }}
                // disabled={isLoading}
              />
              <Link href="/(auth)/login" style={styles.signInLink}>
                Already have an Account? Sign In
              </Link>
              <Button
                onPress={() => resetOnboarding()}
                label="Reset Onboarding"
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
    marginBottom: verticalScale(20),
    textAlign: "left", // Ensure subtitle is aligned left within its container
  },
  headertitle: {
    fontSize: moderateScale(22),
    fontFamily: JostFont.normal,
    color: colors.primary,
    marginBottom: verticalScale(20),
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
