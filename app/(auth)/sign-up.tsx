import Button from "@/components/Button";
import CustomDatePicker from "@/components/DatePicker";
import NigeriaPhoneInput from "@/components/PhoneInput";
import CustomSelect from "@/components/Select";
import TextInput from "@/components/TextInput";
import JostFont from "@/constants/jost-font";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { moderateScale, scale, verticalScale } from "@/utils/scaling";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  const { resetOnboarding } = useOnboarding();

  // 💡 Each input needs its own state variable
  const [fullName, setFullName] = useState("");
  const [selected, setSelected] = React.useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [workAddress, setWorkAddress] = useState("");
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  return (
    <>
      <SafeAreaView style={[styles.container]}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../../assets/images/primary-logo.png")}
            contentFit="cover"
          />
        </View>
        <View style={[styles.inputContainer]}>
          <Text style={[styles.title]}>Welcome!</Text>
          <Text style={[styles.subtitle]}>Create your account</Text>

          <TextInput
            placeholder="Full name"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ width: "48%" }}>
              {/* <Pressable
                onPress={() => setShow(true)}
                style={{
                  height: verticalScale(40),
                  borderWidth: 1,
                  borderColor: "#ddd",
                  borderRadius: moderateScale(8),
                  justifyContent: "center",
                  paddingHorizontal: scale(12),
                }}
              >
                <Text style={{ color: "#333" }}>Date of Birth</Text>
              </Pressable>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  onChange={onChange}
                />
              )} */}
              <CustomDatePicker />
            </View>
            <View style={{ width: "48%" }}>
              <CustomSelect
                options={genderOptions}
                placeholder="Gender"
                onValueChange={setSelected}
                value={selected}
              />
            </View>
          </View>

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <NigeriaPhoneInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <TextInput
            placeholder="Home Address (optional)"
            value={homeAddress}
            onChangeText={setHomeAddress}
            autoCapitalize="words"
          />
          <TextInput
            placeholder="Work Address (optional)"
            value={workAddress}
            onChangeText={setWorkAddress}
            autoCapitalize="words"
          />
        </View>

        <View style={{ width: "85%" }}>
          <Button label="Continue" theme="primary" />
          <Link
            href="/(auth)/login"
            style={[
              styles.subtitle,
              {
                fontSize: moderateScale(16),
                color: "#000",
                textAlign: "center",
                marginTop: verticalScale(15),
              },
            ]}
          >
            Already have an Account? Sign In
          </Link>
          <Button onPress={() => resetOnboarding()} label="Reset" />
        </View>
      </SafeAreaView>
    </>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: scale(247),
    height: verticalScale(130),
  },
  inputContainer: {
    width: "85%",
  },
  title: {
    fontSize: moderateScale(36),
    fontFamily: JostFont.normal,
    marginBottom: verticalScale(5),
  },
  subtitle: {
    fontSize: moderateScale(22),
    fontFamily: JostFont.normal,
    color: "#3D3D3D",
    marginBottom: verticalScale(40),
  },
  // Other styles remain the same...
});

const options = [
  { label: "JavaScript", value: "js" },
  { label: "TypeScript", value: "ts" },
  { label: "Python", value: "py" },
  { label: "Java", value: "java" },
  { label: "C#", value: "csharp" },
];

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];
