import ProfileIcon from "@/components/tab-icons/AccountIcon";
import GridIcon from "@/components/tab-icons/ActivityIcon";
import HomeIcon from "@/components/tab-icons/HomeIcon";
import CardIcon from "@/components/tab-icons/WalletIcon";
import JostFont from "@/constants/jost-font";
import { moderateScale, verticalScale } from "@/utils/scaling";
import { Tabs } from "expo-router";
import { Platform, Text } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#087BCD", // Active color for BOTH icon and label
        tabBarInactiveTintColor: "#666", // Fallback (overridden below)
        tabBarStyle: {
          paddingBottom: verticalScale(10),
          height: Platform.OS === "android" ? 70 : 80,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0,
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
        },
        tabBarLabelStyle: {
          fontSize:
            Platform.OS === "android" ? moderateScale(12) : moderateScale(14),
          fontFamily: JostFont.medium,
          marginBottom: verticalScale(5),
        },
        tabBarIconStyle: {
          marginTop: verticalScale(5),
        },
      }}
    >
      {/* Tab 1: Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <HomeIcon
              size={24}
              color={focused ? color : "#666"} // Blue when inactive
              focused={focused}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? color : "black", // Red when inactive
                fontSize:
                  Platform.OS === "android"
                    ? moderateScale(12)
                    : moderateScale(14),
                fontFamily: JostFont.medium,
                marginBottom: verticalScale(5),
              }}
            >
              Home
            </Text>
          ),
        }}
      />

      {/* Tab 2: Wallet */}
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color, focused }) => (
            <CardIcon
              size={24}
              color={focused ? color : "#666"}
              focused={focused}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? color : "black",
                fontSize:
                  Platform.OS === "android"
                    ? moderateScale(12)
                    : moderateScale(14),
                fontFamily: JostFont.medium,
                marginBottom: verticalScale(5),
              }}
            >
              Wallet
            </Text>
          ),
        }}
      />

      {/* Tab 3: Activity */}
      <Tabs.Screen
        name="activity"
        options={{
          title: "Activity",
          tabBarIcon: ({ color, focused }) => (
            <GridIcon
              size={24}
              color={focused ? color : "#666"}
              focused={focused}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? color : "black",
                fontSize:
                  Platform.OS === "android"
                    ? moderateScale(12)
                    : moderateScale(14),
                fontFamily: JostFont.medium,
                marginBottom: verticalScale(5),
              }}
            >
              Activity
            </Text>
          ),
        }}
      />

      {/* Tab 4: Account */}
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color, focused }) => (
            <ProfileIcon
              size={24}
              color={focused ? color : "#666"}
              focused={focused}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? color : "black",
                fontSize:
                  Platform.OS === "android"
                    ? moderateScale(12)
                    : moderateScale(14),
                fontFamily: JostFont.medium,
                marginBottom: verticalScale(5),
              }}
            >
              Account
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}
