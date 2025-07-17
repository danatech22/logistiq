import Button from "@/components/Button";
import PasswordInput from "@/components/PasswordInput";
import TextInput from "@/components/TextInput";
import colors from "@/constants/colors";

import JostFont from "@/constants/jost-font";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { moderateScale, scale, verticalScale } from "@/utils/scaling";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  const { resetOnboarding } = useOnboarding();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
          <Text style={[styles.title]}>Welcome Back!</Text>
          <Text style={[styles.subtitle]}>Log into your account</Text>

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <PasswordInput
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
          />
          <Text
            style={[
              styles.subtitle,
              { fontSize: moderateScale(16), color: "#00", textAlign: "right" },
            ]}
          >
            Forgot Password?
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Button label="Login" theme="primary" />
          <Link
            href="/(auth)/sign-up"
            style={[
              styles.subtitle,
              {
                fontSize: moderateScale(16),
                color: "#00",
                textAlign: "center",
                marginTop: verticalScale(15),
              },
            ]}
          >
            Don’t have an Account? Sign Up
          </Link>
          <Button onPress={() => resetOnboarding()} label="Reset" />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Login;

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
  circleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: verticalScale(40),
  },
  smallCircle: {
    width: scale(8),
    height: scale(8),
    borderRadius: moderateScale(4),
    backgroundColor: colors.grey,
    marginHorizontal: moderateScale(5),
  },
  largeCircle: {
    width: scale(12),
    height: scale(12),
    borderRadius: moderateScale(6),
    backgroundColor: colors.primary,
    marginHorizontal: moderateScale(5),
  },
  radioCircleOuter: {
    width: scale(20),
    height: scale(20),
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(2),
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  radioCircleInner: {
    width: scale(10),
    height: scale(10),
    borderRadius: moderateScale(5),
    backgroundColor: "#D9D9D9",
  },
  link: {
    backgroundColor: "red",
  },
});
