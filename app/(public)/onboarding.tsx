import Button from "@/components/Button";
import colors from "@/constants/colors";

import JostFont from "@/constants/jost-font";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { moderateScale, scale, verticalScale } from "@/utils/scaling";
import { Image } from "expo-image";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const pagerRef = useRef<PagerView>(null);
  const { completeOnboarding } = useOnboarding();

  const scrollToPage = (pageIndex: number) => {
    pagerRef.current?.setPage(pageIndex);
  };

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={[styles.container, { backgroundColor: "white" }]}>
        <PagerView
          ref={pagerRef}
          style={styles.container}
          initialPage={0}
          overdrag={true}
        >
          <View style={styles.page} key="1">
            <View style={styles.skipContainer}>
              <Button
                onPress={() => {
                  scrollToPage(2);
                }}
                label="Skip"
              />
            </View>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require("../../assets/images/onboarding-screen-1.png")}
                contentFit="cover"
              />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>Safe Delivery</Text>
              <Text style={styles.subtitle}>
                Getting your orders to you on safely and on time with our
                reliable user-friendly app, you request a ride your choice, you
                get your package in minutes.
              </Text>
              <View style={styles.circleContainer}>
                <View style={styles.largeCircle} />
                <View style={styles.smallCircle} />
              </View>
              <View>
                <Button
                  onPress={() => scrollToPage(1)}
                  label="Next"
                  theme="primary"
                />
              </View>
            </View>
          </View>
          <View style={styles.page} key="2">
            <View style={styles.skipContainer}>
              <Button
                onPress={() => {
                  scrollToPage(2);
                }}
                label="Skip"
              />
            </View>
            <View
              style={[
                styles.imageContainer,
                { paddingLeft: moderateScale(20) },
              ]}
            >
              <Image
                style={styles.image}
                source={require("../../assets/images/onboarding-screen-2.png")}
                contentFit="cover"
              />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>Live Location</Text>
              <Text style={styles.subtitle}>
                Keep an eye on your shipment with our live tracking features.
                Transparency and peace of mind, guaranteed, making sure your
                goods arrive on time
              </Text>
              <View style={styles.circleContainer}>
                <View style={styles.smallCircle} />
                <View style={styles.largeCircle} />
              </View>
              <View>
                <Button
                  onPress={() => {
                    scrollToPage(2);
                  }}
                  label="Get Started"
                  theme="primary"
                />
                <Button
                  onPress={async () => {
                    await completeOnboarding();
                    router.replace("/(auth)/login");
                  }}
                  label="Log in"
                />
              </View>
            </View>
          </View>
          <View style={styles.page} key="3">
            <View
              style={[
                styles.imageContainer,
                // { paddingLeft: moderateScale(20) },
              ]}
            >
              <Image
                style={styles.image}
                source={require("../../assets/images/onboarding-screen-3.png")}
                contentFit="cover"
              />
            </View>
            <View style={[styles.infoContainer]}>
              <Text
                style={[
                  styles.title,
                  { fontSize: moderateScale(36), textAlign: "left" },
                ]}
              >
                Sign up as:
              </Text>
              <Pressable
                onPress={async () => {
                  await completeOnboarding();
                  router.replace("/(auth)/sign-up");
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: verticalScale(20),
                  }}
                >
                  <View style={styles.radioCircleOuter}>
                    <View style={styles.radioCircleInner} />
                  </View>
                  <Text
                    style={[
                      styles.subtitle,
                      {
                        color: "black",
                        textAlign: "left",
                        marginHorizontal: moderateScale(14),
                      },
                    ]}
                  >
                    Personal Account
                  </Text>
                </View>
              </Pressable>
              <Pressable
                onPress={async () => {
                  await completeOnboarding();
                  router.push("/(auth)/corporate-sign-up");
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={styles.radioCircleOuter}>
                    <View style={styles.radioCircleInner} />
                  </View>
                  <Text
                    style={[
                      styles.subtitle,
                      {
                        color: "black",
                        textAlign: "left",
                        marginHorizontal: moderateScale(14),
                      },
                    ]}
                  >
                    Cooperate Account
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </PagerView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffF",
    position: "relative",
  },
  skipContainer: {
    position: "absolute",
    top: moderateScale(0),
    right: moderateScale(-40),
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: scale(261),
    height: verticalScale(260),
    borderRadius: 18,
  },
  infoContainer: {
    flex: 1,
    width: "80%",
  },
  title: {
    fontSize: moderateScale(24),
    fontFamily: JostFont.normal,
    textAlign: "center",
    marginBottom: verticalScale(8),
  },
  subtitle: {
    fontSize: moderateScale(16),
    fontFamily: JostFont.normal,
    textAlign: "center",
    color: colors.grey,
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
