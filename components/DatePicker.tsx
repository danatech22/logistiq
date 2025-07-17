import { moderateScale, scale, verticalScale } from "@/utils/scaling";
import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const CustomDatePicker: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [dateOfBirth, setDateOfBirth] = useState<string>("");

  const toggleDatePicker = (): void => {
    setShowPicker(!showPicker);
  };

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
    }

    if (event.type === "set" && selectedDate) {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        setDateOfBirth(currentDate.toLocaleDateString());
      }
    }
  };

  const confirmIOSDate = (): void => {
    setDateOfBirth(date.toLocaleDateString());
    toggleDatePicker();
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleDatePicker} style={styles.input}>
        <Text style={styles.inputText}>{dateOfBirth || "Date of Birth"}</Text>
      </Pressable>

      {Platform.OS === "android" && showPicker && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={date}
          onChange={onChange}
          maximumDate={new Date()}
          textColor="black"
          themeVariant="light"
        />
      )}

      {/* iOS Modal Picker */}
      {Platform.OS === "ios" && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={showPicker}
          onRequestClose={toggleDatePicker}
        >
          <TouchableWithoutFeedback onPress={toggleDatePicker}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>

          <View style={styles.modalContent}>
            <View style={styles.pickerContainer}>
              <DateTimePicker
                mode="date"
                display="spinner"
                value={date}
                onChange={onChange}
                maximumDate={new Date()}
                textColor="black"
                themeVariant="light"
                style={styles.picker}
              />

              <View style={styles.buttonContainer}>
                <Pressable
                  style={[styles.button, styles.cancelButton]}
                  onPress={toggleDatePicker}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.confirmButton]}
                  onPress={confirmIOSDate}
                >
                  <Text style={styles.buttonText}>Confirm</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: Platform.OS === "ios" ? verticalScale(36) : verticalScale(40),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: moderateScale(12),
    backgroundColor: "#F4F4F4",
  },
  inputText: {
    fontSize: moderateScale(14),
    color: "#858383",
  },
  button: {
    height: verticalScale(40),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(50),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(20),
    backgroundColor: "#075985",
  },
  buttonText: {
    fontSize: moderateScale(14),
    fontWeight: "500",
    color: "#fff",
  },
  pickerButton: {
    paddingHorizontal: scale(10),
  },
  // iOS Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pickerContainer: {
    backgroundColor: "white",
    borderRadius: moderateScale(8),
    padding: moderateScale(20),
    width: "90%",
    maxWidth: scale(400),
  },
  picker: {
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: verticalScale(10),
  },
  cancelButton: {
    backgroundColor: "#e74c3c",
    marginRight: scale(10),
    flex: 1,
  },
  confirmButton: {
    backgroundColor: "#075985",
    marginLeft: scale(10),
    flex: 1,
  },
});

export default CustomDatePicker;
