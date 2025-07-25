import colors from "@/constants/colors";
import JostFont from "@/constants/jost-font";
import { moderateScale, verticalScale } from "@/utils/scaling";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";

type Props = {
  label: string;
  theme?: "primary";
  onPress?: () => void;
  style?: ViewStyle;
};

export default function Button({ label, theme, onPress, style }: Props) {
  if (theme === "primary") {
    return (
      <View style={[styles.buttonContainer]}>
        <Pressable
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={onPress}
        >
          <Text style={[styles.buttonLabel, { color: "white" }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={[styles.button, style]} onPress={onPress}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    height: verticalScale(50),
    alignItems: "center",
    justifyContent: "center",
    padding: moderateScale(3),
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonLabel: {
    color: colors.primary,
    fontSize: moderateScale(16),
    fontFamily: JostFont.medium,
  },
});
