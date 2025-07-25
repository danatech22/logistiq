import Button from "@/components/Button";
import colors from "@/constants/colors";
import JostFont from "@/constants/jost-font";
import { useAuth } from "@/contexts/AuthContext";
import { moderateScale, scale, verticalScale } from "@/utils/scaling";
import { Image } from "expo-image";
import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LocationAccess = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { setAuthToken } = useAuth();

  async function getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    setAuthToken("user-new-token");
  }

  //   let text = "Waiting...";
  //   if (errorMsg) {
  //     text = errorMsg;
  //   } else if (location) {
  //     text = JSON.stringify(location);
  //   }
  return (
    <SafeAreaView style={[styles.container]}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/red-locator-icon.png")}
          contentFit="cover"
        />
      </View>
      <View style={{ marginBottom: verticalScale(60) }}>
        <Text style={[styles.title]}>Location Access is Critical</Text>

        <Text style={[styles.subtitle]}>
          Lorem ipsum dolor sit amet, consectetur adcing elit, sed do eiusmod
          tempor.
        </Text>
      </View>
      <View style={{ width: "100%" }}>
        <Button
          onPress={getCurrentLocation}
          label="Enable Location"
          theme="primary"
        />
        <Button
          label="Set Manualy"
          onPress={() => router.push("/(auth)/location-access-manual")}
          style={{
            borderWidth: 1,
            borderColor: colors.primary,
            marginTop: verticalScale(30),
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default LocationAccess;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scale(40),
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(30), // Add spacing below logo
  },
  logo: {
    width: scale(304),
    height: verticalScale(304),
  },
  title: {
    fontSize: moderateScale(24),
    fontFamily: JostFont.normal,
    marginBottom: verticalScale(5),
    textAlign: "center",
  },
  subtitle: {
    fontSize: moderateScale(16),
    fontFamily: JostFont.normal,
    color: colors.grey,

    textAlign: "center",
  },
});
