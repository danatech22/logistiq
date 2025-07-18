import { moderateScale, scale, verticalScale } from "@/utils/scaling";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Option = {
  label: string;
  value: string;
};

interface CustomSelectProps {
  options: Option[];
  placeholder?: string;
  onValueChange: (value: string) => void;
  value?: string | null;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  placeholder = "Select an option",
  onValueChange,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<"above" | "below">(
    "below"
  );
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const animation = useRef(new Animated.Value(0)).current;
  const componentRef = useRef<View>(null);
  const dropdownRef = useRef<View>(null);
  const windowHeight = Dimensions.get("window").height;

  useEffect(() => {
    if (value) {
      const option = options.find((opt) => opt.value === value);
      setSelectedOption(option || null);
    } else {
      setSelectedOption(null);
    }
  }, [value, options]);

  const toggleDropdown = () => {
    Keyboard.dismiss();
    if (isOpen) {
      closeDropdown();
    } else {
      componentRef.current?.measureInWindow((x, y, width, height) => {
        const spaceBelow = windowHeight - y - height - 20;
        const spaceAbove = y - 20;

        setDropdownPosition(spaceBelow > spaceAbove ? "below" : "above");
        openDropdown();
      });
    }
  };

  const openDropdown = () => {
    setIsOpen(true);
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeDropdown = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setIsOpen(false));
  };

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    onValueChange(option.value);
    closeDropdown();
  };

  const rotateAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const opacityAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const dropdownTop = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [
      dropdownPosition === "below" ? -10 : 10,
      dropdownPosition === "below" ? 0 : -150,
    ],
  });

  return (
    <View style={styles.container} ref={componentRef}>
      <TouchableOpacity
        style={styles.select}
        onPress={toggleDropdown}
        activeOpacity={0.8}
      >
        <Text style={styles.selectedText}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Animated.View style={{ transform: [{ rotate: rotateAnimation }] }}>
          <Ionicons name="chevron-down" size={20} color="#666" />
        </Animated.View>
      </TouchableOpacity>

      {isOpen && (
        // <Animated.View
        //   ref={dropdownRef}
        //   style={[
        //     styles.dropdown,
        //     {
        //       opacity: opacityAnimation,
        //       transform: [{ translateY: dropdownTop }],
        //       [dropdownPosition === "above" ? "bottom" : "top"]: "100%",
        //     },
        //   ]}
        // >
        //   <FlatList
        //     data={options}
        //     keyExtractor={(item) => item.value}
        //     renderItem={({ item }) => (
        //       <TouchableOpacity
        //         style={[
        //           styles.option,
        //           selectedOption?.value === item.value && styles.selectedOption,
        //         ]}
        //         onPress={() => handleSelect(item)}
        //       >
        //         <Text style={styles.optionText}>{item.label}</Text>
        //       </TouchableOpacity>
        //     )}
        //     ItemSeparatorComponent={() => <View style={styles.separator} />}
        //     keyboardShouldPersistTaps="always"
        //   />
        // </Animated.View>

        <Animated.View
          ref={dropdownRef}
          style={[
            styles.dropdown,
            {
              opacity: opacityAnimation,
              transform: [{ translateY: dropdownTop }],
              [dropdownPosition === "above" ? "bottom" : "top"]: "100%",
            },
          ]}
        >
          <ScrollView keyboardShouldPersistTaps="always">
            {options.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={[
                  styles.option,
                  selectedOption?.value === item.value && styles.selectedOption,
                ]}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.optionText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    zIndex: 1,
    height: verticalScale(40),
    marginBottom: verticalScale(20),
  },
  select: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: moderateScale(8),
    paddingHorizontal: scale(10),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: moderateScale(8),
    backgroundColor: "#f4f4f4",
  },
  selectedText: {
    fontSize: moderateScale(14),
    color: "#858383",
  },
  dropdown: {
    position: "absolute",
    width: "100%",
    maxHeight: verticalScale(200),
    backgroundColor: "#f4f4f4",
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 100,
  },
  option: {
    padding: moderateScale(12),
  },
  selectedOption: {
    backgroundColor: "#f0f8ff",
  },
  optionText: {
    fontSize: moderateScale(14),
    color: "#858383",
  },
  separator: {
    height: verticalScale(1),
    backgroundColor: "#eee",
  },
});

export default CustomSelect;
