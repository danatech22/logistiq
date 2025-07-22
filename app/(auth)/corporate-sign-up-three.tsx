import Button from "@/components/Button";
import colors from "@/constants/colors";
import JostFont from "@/constants/jost-font";
import { moderateScale, scale, verticalScale } from "@/utils/scaling";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
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

const UploadLogo = () => {
  const [logo, setLogo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setLogo(result.assets[0].uri);
    }
  };

  const handleContinue = () => {
    // if (!logo) {
    //   Alert.alert(
    //     "Logo Required",
    //     "Regulations require you to upload your business logo."
    //   );
    //   return;
    // }
    router.push("/(auth)/corporate-sign-up-four"); // Replace with your next screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Pressable
          onPress={() => Keyboard.dismiss()}
          style={styles.pressableOverlay}
        >
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.contentContainer}>
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

              <Text style={styles.headerTitle}>2. Upload Logo (optional)</Text>
              <Text style={styles.subtitle}>
                Regulations require you to upload your business logo. Don't
                worry, your data will stay safe and private.
              </Text>

              <View style={styles.uploadContainer}>
                {logo ? (
                  <Pressable onPress={pickImage}>
                    <Image source={{ uri: logo }} style={styles.logoPreview} />
                  </Pressable>
                ) : (
                  <Pressable onPress={pickImage}>
                    <View style={styles.uploadPlaceholder}>
                      <Feather name="upload" size={34} color="black" />
                      <Text style={styles.uploadText}>Upload Logo</Text>
                    </View>
                  </Pressable>
                )}
              </View>
              <Button
                label="Next"
                theme="primary"
                onPress={handleContinue}
                // isLoading={isLoading}
              />
            </View>
          </ScrollView>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  pressableOverlay: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(20),
  },
  contentContainer: {
    flex: 1,
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
  subtitle: {
    fontSize: moderateScale(16),
    color: "#666",
    marginBottom: verticalScale(40),
    lineHeight: moderateScale(22),
  },
  uploadContainer: {
    alignItems: "center",
    marginBottom: verticalScale(40),
  },
  logoPreview: {
    width: scale(278),
    height: scale(175),
    borderRadius: 8,
    marginBottom: verticalScale(20),
  },
  uploadPlaceholder: {
    width: scale(278),
    height: verticalScale(175),
    borderRadius: 8,
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
    borderColor: "#686868",
    borderWidth: 1,
    borderStyle: "dashed",
    alignItems: "center",
    marginBottom: verticalScale(20),
  },
  uploadText: {
    color: "#999",
    fontSize: moderateScale(14),
    marginTop: verticalScale(20),
  },
  buttonGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadButton: {
    backgroundColor: "#007AFF",
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(20),
    borderRadius: 8,
  },
  uploadButtonText: {
    color: "white",
    fontSize: moderateScale(16),
    fontWeight: "500",
  },
  orText: {
    marginHorizontal: scale(10),
    color: "#666",
    fontSize: moderateScale(16),
  },
  browseButton: {
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(20),
  },
  browseButtonText: {
    color: "#007AFF",
    fontSize: moderateScale(16),
    fontWeight: "500",
  },
  bottomContainer: {
    marginBottom: verticalScale(30),
  },
});

export default UploadLogo;
