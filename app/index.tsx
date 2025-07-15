import Button from "@/components/Button";
import colors from "@/constants/colors";
import JostFont from "@/constants/jost-font";
import { moderateScale, scale, verticalScale } from "@/utils/scaling";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";

export default function Index() {
  return (
    <>
      {/* <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: JostFont.black, color: colors.primary }}>
          Jost Black
        </Text>
        <Text style={{ fontFamily: JostFont.extraBold }}>Jost ExtaBold</Text>
        <Text style={{ fontFamily: JostFont.bold }}>Jost Bold</Text>
        <Text style={{ fontFamily: JostFont.semiBold }}>Jost SemiBold</Text>
        <Text style={{ fontFamily: JostFont.medium }}>Jost Medium</Text>
        <Text style={{ fontFamily: JostFont.normal }}>Jost Regular</Text>
        <Text style={{ fontFamily: JostFont.light }}>Jost Light</Text>
        <Text style={{ fontFamily: JostFont.extraLight }}>Jost ExtraLight</Text>
        <Text style={{ fontFamily: JostFont.thin }}>Jost Thin</Text>
      </View> */}
      {/* <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.avatar} />
          <Text style={styles.title}>User Name</Text>
          <Text style={styles.subtitle}>Software Developer</Text>
        </View>
      </View> */}
      <StatusBar style="dark" />
      <PagerView style={styles.container} initialPage={0}>
        <View style={styles.page} key="1">
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require("../assets/images/onboarding-screen-1.png")}
              contentFit="cover"
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>Safe Delivery</Text>
            <Text style={styles.subtitle}>
              Getting your orders to you on safely and on time with our reliable
              user-friendly app, you request a ride your choice, you get your
              package in minutes.
            </Text>
            <View style={styles.circleContainer}>
              <View style={styles.largeCircle} />
              <View style={styles.smallCircle} />
            </View>
            <View>
              <Button label="Next" theme="primary" />
            </View>
          </View>
        </View>
        <View style={styles.page} key="2">
          <View
            style={[styles.imageContainer, { paddingLeft: moderateScale(20) }]}
          >
            <Image
              style={styles.image}
              source={require("../assets/images/onboarding-screen-2.png")}
              contentFit="cover"
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>Live Location</Text>
            <Text style={styles.subtitle}>
              Keep an eye on your shipment with our live tracking features.
              Transparency and peace of mind, guaranteed, making sure your goods
              arrive on time
            </Text>
            <View style={styles.circleContainer}>
              <View style={styles.smallCircle} />
              <View style={styles.largeCircle} />
            </View>
            <View>
              <Button label="Get Started" theme="primary" />
              <Button label="Log in" />
            </View>
          </View>
        </View>
        <View style={styles.page} key="3">
          <Text>Third page</Text>
        </View>
      </PagerView>
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

  // container: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  card: {
    width: scale(350),
    height: verticalScale(180),
    padding: moderateScale(20),
    backgroundColor: "#FFFFFF",
    borderRadius: moderateScale(15),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: verticalScale(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: moderateScale(3.84),
    elevation: 5,
    marginVertical: verticalScale(10),
  },
  avatar: {
    width: scale(80),
    height: scale(80),
    borderRadius: moderateScale(40),
    backgroundColor: "#E0E0E0",
    marginBottom: verticalScale(12),
  },
  cardTitle: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
    color: "#333",
  },
  cardSubtitle: {
    fontSize: moderateScale(14),
    color: "gray",
    marginTop: verticalScale(4),
  },
});
